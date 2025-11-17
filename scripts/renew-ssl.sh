#!/bin/bash

# Script để gia hạn chứng chỉ SSL Let's Encrypt

DOMAIN="autobotchungkhoan.pro.vn"
EMAIL="admin@${DOMAIN}"  # Thay đổi email của bạn

echo "🔐 Đang kiểm tra và gia hạn chứng chỉ SSL cho ${DOMAIN}..."

# Tạo thư mục nếu chưa tồn tại
mkdir -p ./certbot/conf
mkdir -p ./certbot/www

# Kiểm tra xem chứng chỉ đã tồn tại chưa
if [ -d "./certbot/conf/live/${DOMAIN}" ]; then
    echo "✅ Chứng chỉ đã tồn tại. Đang kiểm tra ngày hết hạn..."
    
    # Gia hạn chứng chỉ (Let's Encrypt tự động kiểm tra và gia hạn nếu cần)
    docker-compose run --rm certbot renew
    
    echo "✅ Hoàn tất gia hạn chứng chỉ"
    echo "🔄 Đang reload nginx để áp dụng chứng chỉ mới..."
    docker-compose exec nginx nginx -s reload
else
    echo "❌ Chứng chỉ chưa tồn tại. Đang tạo chứng chỉ mới..."
    
    # Khởi động nginx với HTTP (port 80) để xác thực
    docker-compose up -d nginx
    
    # Tạo chứng chỉ mới
    docker-compose run --rm certbot certonly \
        --webroot \
        --webroot-path=/var/www/certbot \
        --email ${EMAIL} \
        --agree-tos \
        --no-eff-email \
        -d ${DOMAIN}
    
    # Reload nginx để áp dụng SSL
    docker-compose exec nginx nginx -s reload
    
    echo "✅ Đã tạo chứng chỉ mới"
fi

echo "✅ Hoàn tất!"
