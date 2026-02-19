#!/bin/bash

# Script để khởi tạo chứng chỉ SSL lần đầu
# Cấu hình
DOMAIN="autobotchungkhoan.pro.vn"
EMAIL="admin@autobotchungkhoan.pro.vn"

echo "🔐 Đang khởi tạo chứng chỉ SSL cho ${DOMAIN}..."

# Tạo thư mục
mkdir -p ./certbot/conf
mkdir -p ./certbot/www

# Kiểm tra xem chứng chỉ đã tồn tại chưa
if [ -d "./certbot/conf/live/${DOMAIN}" ]; then
    read -p "⚠️  Chứng chỉ đã tồn tại cho ${DOMAIN}. Bạn có muốn tạo lại không? (y/N) " -n 1 -r
    echo
    if [[ ! $REPLY =~ ^[Yy]$ ]]; then
        echo "⏭  Bỏ qua việc khởi tạo."
        exit 0
    fi
fi

# Chạy Nginx nếu chưa chạy (cần cho xác thực webroot)
echo "🚀 Đảm bảo Nginx đang chạy..."
docker-compose up -d nginx

# Tạo chứng chỉ mới
echo "📝 Đang gửi yêu cầu tạo chứng chỉ SSL cho ${DOMAIN}..."
docker-compose run --rm certbot certonly \
    --webroot \
    --webroot-path=/var/www/certbot \
    --email ${EMAIL} \
    --agree-tos \
    --no-eff-email \
    --non-interactive \
    --keep-until-expiring \
    -d ${DOMAIN}

if [ $? -eq 0 ]; then
    echo "✅ Tạo chứng chỉ thành công!"
    echo "🔄 Đang reload Nginx để áp dụng SSL..."
    docker-compose exec nginx nginx -s reload
    echo "✅ Hoàn tất! Website đã được cấu hình với SSL tại https://${DOMAIN}"
else
    echo "❌ Lỗi khi tạo chứng chỉ. Vui lòng kiểm tra:"
    echo "   1. Domain ${DOMAIN} đã trỏ về đúng IP server chưa."
    echo "   2. Port 80 và 443 trên server có đang mở không."
    echo "   3. Firewall có chặn truy cập từ Let's Encrypt không."
    exit 1
fi
