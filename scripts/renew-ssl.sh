#!/bin/bash

# Script để gia hạn chứng chỉ SSL Let's Encrypt
DOMAIN="autobotchungkhoan.pro.vn"

echo "🔐 Đang kiểm tra và gia hạn chứng chỉ SSL cho ${DOMAIN}..."

# 1. Gia hạn chứng chỉ - Certbot sẽ chỉ thực sự gia hạn nếu chứng chỉ gần hết hạn (< 30 ngày)
docker-compose run --rm certbot renew --quiet

if [ $? -eq 0 ]; then
    echo "✅ Quá trình kiểm tra/gia hạn hoàn tất."
    # 2. Luôn reload Nginx để đảm bảo nếu có chứng chỉ mới thì nó sẽ được áp dụng
    echo "🔄 Đang reload nginx..."
    docker-compose exec nginx nginx -s reload
else
    echo "❌ Có lỗi xảy ra trong quá trình gia hạn."
    exit 1
fi

echo "✅ Hoàn tất!"
