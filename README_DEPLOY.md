# 🚀 Hướng dẫn Deploy Tự Động

## ✨ Sau khi push code lên server, chỉ cần chạy 1 lệnh:

```bash
chmod +x deploy.sh && ./deploy.sh
```

Script sẽ tự động:

1. ✅ Build Docker image mới
2. ✅ Dừng và khởi động lại container
3. ✅ Tự động setup SSL (tạo mới hoặc gia hạn nếu cần)
4. ✅ Khởi động nginx và certbot
5. ✅ Kiểm tra trạng thái

## 📋 Setup lần đầu (chỉ cần làm 1 lần)

### 1. Cấp quyền cho scripts:

```bash
chmod +x deploy.sh
chmod +x setup-ssl-auto.sh
```

### 2. Tạo file `.env.production`:

```bash
cp .env.example .env.production
# Sau đó chỉnh sửa các biến môi trường cần thiết
```

### 3. Chỉnh email trong `setup-ssl-auto.sh` (nếu cần):

Mở file `setup-ssl-auto.sh` và thay đổi:

```bash
EMAIL="your-email@domain.com"
```

### 4. Chạy deploy:

```bash
./deploy.sh
```

## 🔄 Deploy lần sau (chỉ cần chạy deploy.sh)

Sau mỗi lần push code:

```bash
./deploy.sh
```

## 🔐 SSL Tự Động

-   ✅ **Tự động tạo** chứng chỉ khi deploy lần đầu
-   ✅ **Tự động gia hạn** mỗi 12 giờ (certbot container tự động chạy)
-   ✅ **Không cần can thiệp** thủ công

## 🛠️ Troubleshooting

### Nếu lỗi SSL lần đầu:

```bash
# Chạy riêng script setup SSL
./setup-ssl-auto.sh
```

### Nếu nginx không khởi động:

```bash
# Kiểm tra logs
docker-compose logs nginx

# Test config nginx
docker-compose exec nginx nginx -t
```

### Xem logs:

```bash
# Tất cả services
docker-compose logs -f

# Chỉ frontend
docker-compose logs -f stock-cms-client

# Chỉ nginx
docker-compose logs -f nginx

# Chỉ certbot
docker-compose logs -f certbot
```

### Kiểm tra trạng thái:

```bash
docker-compose ps
```

## 📝 Lưu ý

1. **Domain phải trỏ đúng IP server** trước khi deploy
2. **Port 80 và 443 phải mở** trên firewall
3. **File `.env.production` phải tồn tại** trước khi deploy
4. **Network `autobotck_backend` phải tồn tại** (cho backend API)

## 🔒 Bảo mật

-   Chứng chỉ SSL được lưu trong `./certbot/conf/` (không commit vào git)
-   Certbot tự động gia hạn trước khi hết hạn
-   Nginx tự động reload khi chứng chỉ được gia hạn

## 📞 Hỗ trợ

Nếu gặp vấn đề, kiểm tra:

1. DNS: `nslookup autobotchungkhoan.pro.vn`
2. Firewall: `sudo ufw status`
3. Logs: `docker-compose logs`
