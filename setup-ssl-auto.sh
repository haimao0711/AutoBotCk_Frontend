#!/bin/bash

# Script tự động setup SSL - Chỉ cần chạy một lần sau khi push code

DOMAIN="autobotchungkhoan.pro.vn"
EMAIL="admin@${DOMAIN}"  # Thay đổi email nếu cần

# Không exit ngay khi lỗi, để có thể xử lý graceful
set +e

echo "🚀 Bắt đầu setup SSL tự động cho ${DOMAIN}..."
echo ""

# Tạo thư mục certbot
mkdir -p ./certbot/conf
mkdir -p ./certbot/www
chmod -R 755 ./certbot

# Kiểm tra domain đã trỏ đúng chưa
echo "🔍 Kiểm tra DNS..."
DOMAIN_IP=$(dig +short ${DOMAIN} | tail -n1)
SERVER_IP=$(curl -s ifconfig.me || curl -s ipinfo.io/ip || echo "unknown")

if [ "$DOMAIN_IP" != "" ] && [ "$DOMAIN_IP" != "unknown" ]; then
    echo "   Domain IP: ${DOMAIN_IP}"
    echo "   Server IP: ${SERVER_IP}"
    if [ "$DOMAIN_IP" != "$SERVER_IP" ] && [ "$SERVER_IP" != "unknown" ]; then
        echo "⚠️  Cảnh báo: Domain có thể chưa trỏ đúng IP server!"
    fi
else
    echo "⚠️  Không thể kiểm tra DNS"
fi

echo ""

# Kiểm tra chứng chỉ đã tồn tại
if [ -d "./certbot/conf/live/${DOMAIN}" ] && [ -f "./certbot/conf/live/${DOMAIN}/fullchain.pem" ]; then
    echo "✅ Chứng chỉ đã tồn tại"
    echo "🔄 Đang kiểm tra và gia hạn nếu cần..."
    
    # Gia hạn chứng chỉ
    docker-compose run --rm certbot renew --quiet || true
    
    echo "✅ Hoàn tất!"
else
    echo "📝 Chứng chỉ chưa tồn tại, đang tạo mới..."
    
    # Dừng nginx nếu đang chạy (để tránh conflict port 80)
    docker-compose stop nginx 2>/dev/null || true
    
    # Khởi động nginx HTTP để certbot xác thực
    echo "🚀 Khởi động nginx (HTTP)..."
    docker-compose up -d nginx
    
    # Đợi nginx sẵn sàng
    echo "⏳ Đợi nginx khởi động..."
    sleep 10
    
    # Tạo chứng chỉ mới
    echo "📝 Đang tạo chứng chỉ SSL..."
    if docker-compose run --rm certbot certonly \
        --webroot \
        --webroot-path=/var/www/certbot \
        --email ${EMAIL} \
        --agree-tos \
        --no-eff-email \
        --force-renewal \
        -d ${DOMAIN}; then
        
        echo "✅ Tạo chứng chỉ thành công!"
    else
        echo "❌ Lỗi khi tạo chứng chỉ!"
        echo ""
        echo "💡 Kiểm tra:"
        echo "   1. Domain ${DOMAIN} đã trỏ đúng IP server?"
        echo "   2. Port 80 đã mở chưa?"
        echo "   3. Email ${EMAIL} có đúng không?"
        echo ""
        echo "🔄 Reload nginx..."
        docker-compose restart nginx || true
        # Không exit 1 để deploy vẫn có thể tiếp tục
        return 1
    fi
fi

# Reload nginx để áp dụng SSL
echo "🔄 Reload nginx để áp dụng SSL..."
docker-compose restart nginx

echo ""
echo "✅ Hoàn tất setup SSL!"
echo ""
echo "🌐 Kiểm tra website: https://${DOMAIN}"
