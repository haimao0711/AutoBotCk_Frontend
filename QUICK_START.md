# ⚡ Quick Start - Deploy Tự Động

## 🎯 Sau khi push code lên server, chỉ cần chạy:

```bash
chmod +x deploy.sh && ./deploy.sh
```

**Xong!** Script sẽ tự động xử lý tất cả:
- ✅ Build Docker image
- ✅ Deploy container mới  
- ✅ Tự động setup/gia hạn SSL
- ✅ Khởi động nginx và certbot

## 📝 Setup lần đầu (chỉ 1 lần):

1. **Cấp quyền:**
```bash
chmod +x deploy.sh setup-ssl-auto.sh
```

2. **Tạo file `.env.production`** (nếu chưa có)

3. **Chỉnh email** trong `setup-ssl-auto.sh` (dòng 5) nếu cần

4. **Chạy deploy:**
```bash
./deploy.sh
```

## 🔄 Deploy lần sau:

Chỉ cần:
```bash
./deploy.sh
```

## ✅ Kết quả:

Website sẽ tự động có SSL tại: **https://autobotchungkhoan.pro.vn**

SSL sẽ **tự động gia hạn** mỗi 12 giờ, không cần làm gì thêm!

---
 Đảm bảo domain đã trỏ đúng IP server và port 80/443 đã mở trước khi deploy
**Lưu ý:**.
