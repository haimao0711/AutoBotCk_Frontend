# 🔐 Hướng dẫn xử lý lỗi SSL Certificate

## ❌ Lỗi: `ERR_CERT_DATE_INVALID` - "Your connection is not private"

### Nguyên nhân

-   Chứng chỉ SSL (Let's Encrypt) đã hết hạn (thời hạn 90 ngày)
-   Chứng chỉ chưa được tạo hoặc cấu hình sai
-   Thời gian trên server không đúng

### 🔧 Giải pháp

#### **Cách 1: Gia hạn chứng chỉ tự động (Khuyến nghị)**

1. **Cấp quyền thực thi cho script:**

```bash
chmod +x scripts/renew-ssl.sh
chmod +x scripts/init-ssl.sh
```

2. **Gia hạn chứng chỉ:**

```bash
./scripts/renew-ssl.sh
```

#### **Cách 2: Khởi tạo lại chứng chỉ (Nếu chứng chỉ chưa tồn tại hoặc bị lỗi)**

1. **Chỉnh sửa email trong script:**

    - Mở file `scripts/init-ssl.sh`
    - Thay đổi dòng: `EMAIL="admin@${DOMAIN}"` thành email của bạn

2. **Chạy script khởi tạo:**

```bash
./scripts/init-ssl.sh
```

#### **Cách 3: Gia hạn thủ công**

```bash
# Kiểm tra thư mục certbot
ls -la ./certbot/conf/live/autobotchungkhoan.pro.vn/

# Gia hạn chứng chỉ
docker-compose run --rm certbot renew

# Reload nginx
docker-compose exec nginx nginx -s reload
```

#### **Cách 4: Kiểm tra và sửa lỗi thời gian server**

```bash
# Kiểm tra thời gian server
date

# Nếu thời gian sai, cập nhật (Ubuntu/Debian):
sudo timedatectl set-ntp true
sudo timedatectl set-timezone Asia/Ho_Chi_Minh
```

### ⚙️ Cấu hình tự động gia hạn

Script `docker-compose.yml` đã được cấu hình để tự động gia hạn chứng chỉ mỗi 12 giờ. Certbot container sẽ chạy liên tục và tự động gia hạn khi cần.

### 📋 Kiểm tra trạng thái chứng chỉ

```bash
# Kiểm tra ngày hết hạn
docker-compose run --rm certbot certificates

# Kiểm tra logs
docker-compose logs certbot
```

### ⚠️ Lưu ý quan trọng

1. **Domain phải trỏ đúng IP server** - Kiểm tra DNS:

    ```bash
    nslookup autobotchungkhoan.pro.vn
    ```

2. **Port 80 và 443 phải mở** - Kiểm tra firewall:

    ```bash
    sudo ufw status
    sudo ufw allow 80/tcp
    sudo ufw allow 443/tcp
    ```

3. **Thư mục certbot phải có quyền đúng:**
    ```bash
    sudo chown -R $USER:$USER ./certbot
    ```

### 🚀 Sau khi gia hạn thành công

1. Reload lại nginx:

    ```bash
    docker-compose restart nginx
    ```

2. Kiểm tra website:

    ```bash
    curl -I https://autobotchungkhoan.pro.vn
    ```

3. Hoặc truy cập trình duyệt và kiểm tra chứng chỉ SSL

### 📞 Nếu vẫn còn lỗi

1. Kiểm tra logs:

    ```bash
    docker-compose logs nginx
    docker-compose logs certbot
    ```

2. Kiểm tra nginx config:

    ```bash
    docker-compose exec nginx nginx -t
    ```

3. Xóa và tạo lại chứng chỉ (cẩn thận - chỉ làm khi cần):
    ```bash
    sudo rm -rf ./certbot/conf/live/autobotchungkhoan.pro.vn
    ./scripts/init-ssl.sh
    ```
