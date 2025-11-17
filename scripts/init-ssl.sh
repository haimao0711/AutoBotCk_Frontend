#!/bin/bash

# Script để khởi tạo chứng chỉ SSL lần đầu

DOMAIN="autobotchungkhoan.pro.vn"
EMAIL="admin@${DOMAIN}"  # Thay đổi email của bạn

echo "🔐 Đang khởi tạo chứng chỉ SSL cho ${DOMAIN}..."

# Tạo thư mục
mkdir -p ./certbot/conf
mkdir -p ./certbot/www

# Dừng nginx nếu đang chạy
docker-compose down nginx 2>/dev/null || true

# Khởi động nginx với HTTP (port 80) để certbot xác thực
echo "🚀 Khởi động nginx (HTTP) để xác thực domain..."
docker-compose up -d nginx

# Đợi nginx khởi động
sleep 5

# Tạo chứng chỉ mới
echo "📝 Đang tạo chứng chỉ SSL..."
docker-compose run --rm certbot certonly \
    --webroot \
    --webroot-path=/var/www/certbot \
    --email ${EMAIL} \
    --agree-tos \
    --no-eff-email \
    --force-renewal \
    -d ${DOMAIN}

if [ $? -eq 0 ]; then
    echo "✅ Tạo chứng chỉ thành công!"
    echo "🔄 Đang reload nginx với SSL..."
    docker-compose down nginx
    docker-compose up -d nginx
    echo "✅ Hoàn tất! Website đã được cấu hình với SSL."
else
    echo "❌ Lỗi khi tạo chứng chỉ. Vui lòng kiểm tra:"
    echo "   - Domain ${DOMAIN} đã trỏ về đúng IP server chưa"
    echo "   - Port 80 và 443 đã mở chưa"
    echo "   - Email ${EMAIL} có đúng không"
fi
