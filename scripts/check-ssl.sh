#!/bin/bash

# Script kiểm tra trạng thái chứng chỉ SSL

DOMAIN="autobotchungkhoan.pro.vn"

echo "🔍 Đang kiểm tra trạng thái chứng chỉ SSL cho ${DOMAIN}..."
echo ""

# Kiểm tra thư mục certbot
if [ ! -d "./certbot/conf/live/${DOMAIN}" ]; then
    echo "❌ Chứng chỉ chưa được tạo!"
    echo "   Chạy: ./scripts/init-ssl.sh để tạo chứng chỉ mới"
    exit 1
fi

echo "📁 Đường dẫn chứng chỉ: ./certbot/conf/live/${DOMAIN}/"
echo ""

# Kiểm tra file chứng chỉ
if [ -f "./certbot/conf/live/${DOMAIN}/fullchain.pem" ]; then
    echo "✅ File fullchain.pem: Tồn tại"
    
    # Kiểm tra ngày hết hạn
    echo ""
    echo "📅 Thông tin chứng chỉ:"
    docker-compose run --rm certbot certificates 2>/dev/null || \
    openssl x509 -in "./certbot/conf/live/${DOMAIN}/fullchain.pem" -noout -dates -subject 2>/dev/null || \
    echo "   (Không thể đọc thông tin chứng chỉ)"
    
    # Kiểm tra ngày hết hạn bằng openssl (nếu có)
    if command -v openssl &> /dev/null; then
        EXPIRY_DATE=$(openssl x509 -in "./certbot/conf/live/${DOMAIN}/fullchain.pem" -noout -enddate 2>/dev/null | cut -d= -f2)
        if [ ! -z "$EXPIRY_DATE" ]; then
            EXPIRY_EPOCH=$(date -d "$EXPIRY_DATE" +%s 2>/dev/null || echo "0")
            NOW_EPOCH=$(date +%s)
            DAYS_LEFT=$(( ($EXPIRY_EPOCH - $NOW_EPOCH) / 86400 ))
            
            echo ""
            if [ $DAYS_LEFT -lt 0 ]; then
                echo "❌ Chứng chỉ đã hết hạn! (${DAYS_LEFT} ngày)"
                echo "   Chạy: ./scripts/renew-ssl.sh để gia hạn"
            elif [ $DAYS_LEFT -lt 30 ]; then
                echo "⚠️  Chứng chỉ sắp hết hạn trong ${DAYS_LEFT} ngày"
                echo "   Chạy: ./scripts/renew-ssl.sh để gia hạn"
            else
                echo "✅ Chứng chỉ còn hiệu lực trong ${DAYS_LEFT} ngày"
            fi
        fi
    fi
else
    echo "❌ File fullchain.pem: Không tồn tại"
fi

echo ""

# Kiểm tra nginx
echo "🌐 Kiểm tra nginx:"
if docker-compose ps nginx | grep -q "Up"; then
    echo "✅ Nginx đang chạy"
    
    # Test cấu hình nginx
    echo ""
    echo "🔧 Kiểm tra cấu hình nginx:"
    docker-compose exec nginx nginx -t 2>&1 | grep -q "successful" && echo "✅ Cấu hình hợp lệ" || echo "❌ Cấu hình có lỗi"
else
    echo "❌ Nginx không chạy"
    echo "   Chạy: docker-compose up -d nginx"
fi

echo ""
echo "✅ Kiểm tra hoàn tất!"
