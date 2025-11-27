#!/bin/bash

# Script kiểm tra điều kiện cần thiết trước khi deploy

DOMAIN="autobotchungkhoan.pro.vn"

echo "🔍 Đang kiểm tra điều kiện deploy cho ${DOMAIN}..."
echo ""

ERRORS=0
WARNINGS=0

# ============================================
# 1. KIỂM TRA DNS (Domain trỏ đúng IP chưa)
# ============================================
echo "📡 1. Kiểm tra DNS..."

# Lấy IP của domain
DOMAIN_IP=$(dig +short ${DOMAIN} A 2>/dev/null | tail -n1 | grep -E '^[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}$' || echo "")

# Lấy IP thực của server
SERVER_IP=$(curl -s --connect-timeout 5 ifconfig.me 2>/dev/null || curl -s --connect-timeout 5 ifconfig.io 2>/dev/null || curl -s --connect-timeout 5 ipinfo.io/ip 2>/dev/null || echo "")

if [ -z "$DOMAIN_IP" ]; then
    echo "   ❌ Không thể lấy IP của domain ${DOMAIN}"
    echo "      Kiểm tra: Domain có đúng không? DNS đã propagate chưa?"
    ERRORS=$((ERRORS + 1))
elif [ -z "$SERVER_IP" ]; then
    echo "   ⚠️  Không thể lấy IP server (kiểm tra internet)"
    echo "   ✅ Domain IP: ${DOMAIN_IP}"
    WARNINGS=$((WARNINGS + 1))
else
    echo "   Domain IP: ${DOMAIN_IP}"
    echo "   Server IP: ${SERVER_IP}"
    
    if [ "$DOMAIN_IP" == "$SERVER_IP" ]; then
        echo "   ✅ Domain đã trỏ đúng IP server!"
    else
        echo "   ❌ Domain CHƯA trỏ đúng IP server!"
        echo "      Domain IP (${DOMAIN_IP}) khác Server IP (${SERVER_IP})"
        echo "      Hãy cập nhật DNS record cho ${DOMAIN} trỏ về ${SERVER_IP}"
        ERRORS=$((ERRORS + 1))
    fi
fi

echo ""

# ============================================
# 2. KIỂM TRA PORT 80 (HTTP)
# ============================================
echo "🔌 2. Kiểm tra Port 80 (HTTP)..."

# Kiểm tra port 80 có đang listen không
if command -v netstat &> /dev/null; then
    if netstat -tuln 2>/dev/null | grep -q ":80 "; then
        echo "   ✅ Port 80 đang mở và có service listen"
    else
        echo "   ⚠️  Port 80 chưa có service nào listen (có thể đang dùng Docker)"
    fi
elif command -v ss &> /dev/null; then
    if ss -tuln 2>/dev/null | grep -q ":80 "; then
        echo "   ✅ Port 80 đang mở và có service listen"
    else
        echo "   ⚠️  Port 80 chưa có service nào listen (có thể đang dùng Docker)"
    fi
else
    echo "   ⚠️  Không thể kiểm tra port (thiếu netstat/ss)"
fi

# Test từ bên ngoài bằng curl
HTTP_TEST=$(curl -s -o /dev/null -w "%{http_code}" --connect-timeout 5 http://${DOMAIN} 2>/dev/null || echo "000")

if [ "$HTTP_TEST" == "000" ]; then
    echo "   ❌ Không thể kết nối đến http://${DOMAIN} (port 80)"
    echo "      Kiểm tra: Firewall đã mở port 80 chưa? Nginx đã chạy chưa?"
    ERRORS=$((ERRORS + 1))
elif [ "$HTTP_TEST" == "301" ] || [ "$HTTP_TEST" == "302" ] || [ "$HTTP_TEST" == "200" ]; then
    echo "   ✅ Port 80 đang hoạt động (HTTP code: ${HTTP_TEST})"
else
    echo "   ⚠️  Port 80 có phản hồi nhưng HTTP code: ${HTTP_TEST}"
fi

echo ""

# ============================================
# 3. KIỂM TRA PORT 443 (HTTPS)
# ============================================
echo "🔒 3. Kiểm tra Port 443 (HTTPS)..."

# Kiểm tra port 443 có đang listen không
if command -v netstat &> /dev/null; then
    if netstat -tuln 2>/dev/null | grep -q ":443 "; then
        echo "   ✅ Port 443 đang mở và có service listen"
    else
        echo "   ⚠️  Port 443 chưa có service nào listen (có thể chưa setup SSL)"
    fi
elif command -v ss &> /dev/null; then
    if ss -tuln 2>/dev/null | grep -q ":443 "; then
        echo "   ✅ Port 443 đang mở và có service listen"
    else
        echo "   ⚠️  Port 443 chưa có service nào listen (có thể chưa setup SSL)"
    fi
else
    echo "   ⚠️  Không thể kiểm tra port (thiếu netstat/ss)"
fi

# Test từ bên ngoài bằng curl (bỏ qua SSL verification để kiểm tra port)
HTTPS_TEST=$(curl -s -o /dev/null -w "%{http_code}" --connect-timeout 5 -k https://${DOMAIN} 2>/dev/null || echo "000")

if [ "$HTTPS_TEST" == "000" ]; then
    echo "   ⚠️  Không thể kết nối đến https://${DOMAIN} (port 443)"
    echo "      Có thể là chưa setup SSL hoặc firewall chưa mở port 443"
    WARNINGS=$((WARNINGS + 1))
elif [ "$HTTPS_TEST" == "200" ] || [ "$HTTPS_TEST" == "301" ] || [ "$HTTPS_TEST" == "302" ]; then
    echo "   ✅ Port 443 đang hoạt động (HTTP code: ${HTTPS_TEST})"
else
    echo "   ⚠️  Port 443 có phản hồi nhưng HTTP code: ${HTTPS_TEST}"
fi

echo ""

# ============================================
# 4. KIỂM TRA FIREWALL (nếu có ufw)
# ============================================
echo "🔥 4. Kiểm tra Firewall..."

if command -v ufw &> /dev/null; then
    UFW_STATUS=$(sudo ufw status 2>/dev/null | head -n1 || echo "")
    if echo "$UFW_STATUS" | grep -qi "active"; then
        echo "   ⚠️  UFW Firewall đang ACTIVE"
        
        # Kiểm tra port 80 và 443 có mở không
        if sudo ufw status 2>/dev/null | grep -q "80/tcp"; then
            echo "   ✅ Port 80 đã được mở trong UFW"
        else
            echo "   ❌ Port 80 CHƯA được mở trong UFW"
            echo "      Chạy: sudo ufw allow 80/tcp"
            ERRORS=$((ERRORS + 1))
        fi
        
        if sudo ufw status 2>/dev/null | grep -q "443/tcp"; then
            echo "   ✅ Port 443 đã được mở trong UFW"
        else
            echo "   ❌ Port 443 CHƯA được mở trong UFW"
            echo "      Chạy: sudo ufw allow 443/tcp"
            ERRORS=$((ERRORS + 1))
        fi
    else
        echo "   ℹ️  UFW Firewall không active hoặc không được cấu hình"
    fi
elif command -v firewall-cmd &> /dev/null; then
    echo "   ℹ️  Đang sử dụng firewalld (CentOS/RHEL)"
    echo "      Kiểm tra thủ công: firewall-cmd --list-ports"
else
    echo "   ℹ️  Không phát hiện firewall tool (có thể đang dùng iptables trực tiếp)"
fi

echo ""

# ============================================
# 5. KIỂM TRA DOCKER
# ============================================
echo "🐳 5. Kiểm tra Docker..."

if command -v docker &> /dev/null; then
    if docker ps &> /dev/null; then
        echo "   ✅ Docker đã cài đặt và đang chạy"
    else
        echo "   ❌ Docker chưa chạy hoặc user chưa có quyền"
        echo "      Chạy: sudo usermod -aG docker $USER và đăng nhập lại"
        ERRORS=$((ERRORS + 1))
    fi
else
    echo "   ❌ Docker chưa được cài đặt"
    ERRORS=$((ERRORS + 1))
fi

if command -v docker-compose &> /dev/null || docker compose version &> /dev/null; then
    echo "   ✅ Docker Compose đã cài đặt"
else
    echo "   ❌ Docker Compose chưa được cài đặt"
    ERRORS=$((ERRORS + 1))
fi

echo ""

# ============================================
# 6. KIỂM TRA FILE .env.production
# ============================================
echo "📄 6. Kiểm tra file .env.production..."

if [ -f ".env.production" ]; then
    echo "   ✅ File .env.production tồn tại"
else
    echo "   ❌ File .env.production KHÔNG tồn tại"
    echo "      Tạo file .env.production trước khi deploy"
    ERRORS=$((ERRORS + 1))
fi

echo ""

# ============================================
# TỔNG KẾT
# ============================================
echo "═══════════════════════════════════════════════════════════"
echo "📊 TỔNG KẾT:"
echo "═══════════════════════════════════════════════════════════"

if [ $ERRORS -eq 0 ] && [ $WARNINGS -eq 0 ]; then
    echo "✅ Tất cả điều kiện đã sẵn sàng! Có thể deploy ngay."
    echo ""
    echo "🚀 Chạy: ./deploy.sh"
    exit 0
elif [ $ERRORS -eq 0 ]; then
    echo "⚠️  Có ${WARNINGS} cảnh báo nhưng vẫn có thể deploy"
    echo "   Xem các cảnh báo phía trên để biết chi tiết"
    echo ""
    echo "🚀 Có thể chạy: ./deploy.sh"
    exit 0
else
    echo "❌ Có ${ERRORS} lỗi cần sửa trước khi deploy!"
    echo "   Vui lòng xử lý các lỗi phía trên trước"
    echo ""
    exit 1
fi

