#!/bin/bash

# Script deploy tự động - Chỉ cần chạy script này sau khi push code

# Chỉ exit khi lỗi build hoặc start container
set -e

echo "🚀 Bắt đầu deploy..."
echo ""

# Kiểm tra điều kiện cần thiết (DNS, Port, Firewall)
if [ -f "./scripts/check-prerequisites.sh" ]; then
    echo "🔍 Đang kiểm tra điều kiện deploy..."
    chmod +x ./scripts/check-prerequisites.sh 2>/dev/null || true
    if ! ./scripts/check-prerequisites.sh; then
        echo ""
        echo "❌ Kiểm tra không đạt! Vui lòng sửa các lỗi trên trước khi deploy."
        echo "   Hoặc chạy riêng: ./scripts/check-prerequisites.sh để xem chi tiết"
        exit 1
    fi
    echo ""
fi

# Kiểm tra file .env.production
if [ ! -f ".env.production" ]; then
    echo "❌ Không tìm thấy file .env.production"
    echo "   Vui lòng tạo file .env.production trước khi deploy"
    exit 1
fi

# Build Docker image
echo "📦 Đang build Docker image..."
docker-compose build stock-cms-client

# Dừng container cũ
echo "🛑 Dừng container cũ..."
docker-compose stop stock-cms-client || true
docker-compose rm -f stock-cms-client || true

# Khởi động container mới
echo "🚀 Khởi động container mới..."
docker-compose up -d stock-cms-client

# Setup SSL (tự động kiểm tra và tạo nếu cần)
echo "🔐 Kiểm tra và setup SSL..."
if [ -f "./setup-ssl-auto.sh" ]; then
    chmod +x ./setup-ssl-auto.sh 2>/dev/null || true
    ./setup-ssl-auto.sh || {
        echo "⚠️  Lỗi setup SSL, nhưng deploy vẫn tiếp tục..."
        echo "   Bạn có thể chạy riêng: ./setup-ssl-auto.sh"
    }
else
    echo "⚠️  Không tìm thấy setup-ssl-auto.sh"
fi

# Khởi động nginx và certbot
echo "🌐 Khởi động nginx và certbot..."
docker-compose up -d nginx certbot

# Kiểm tra trạng thái
echo ""
echo "✅ Deploy hoàn tất!"
echo ""
echo "📊 Trạng thái containers:"
docker-compose ps

echo ""
echo "🌐 Website: https://autobotchungkhoan.pro.vn"
echo ""
echo "💡 Để xem logs: docker-compose logs -f"
