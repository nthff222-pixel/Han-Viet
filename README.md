# 🌸 VH Seller — Trợ lý hội thoại Việt–Hàn

Trợ lý AI hỗ trợ tiểu thương Việt Nam bán mỹ phẩm trả lời khách hàng Hàn Quốc qua Instagram/DM — có thể cài đặt như app điện thoại.

---

## 🚀 DEPLOY LÊN RENDER.COM (miễn phí, có link chia sẻ)

### Bước 1: Đẩy code lên GitHub
```bash
git init
git add .
git commit -m "first commit"
# Tạo repo trên github.com rồi:
git remote add origin https://github.com/TÊN_BẠN/vh-seller.git
git push -u origin main
```

### Bước 2: Tạo Web Service trên Render
1. Vào https://render.com → Sign up miễn phí
2. Bấm **New → Web Service**
3. Kết nối GitHub repo vừa tạo
4. Cấu hình:
   - **Build Command**: `npm install`
   - **Start Command**: `npm start`
   - **Environment**: `Node`

### Bước 3: Thêm API Key (quan trọng!)
Trong Render dashboard → **Environment** → thêm biến:
```
ANTHROPIC_API_KEY = sk-ant-xxxxxxxx...
```

### Bước 4: Deploy!
Bấm **Create Web Service** → đợi ~2 phút → Render cấp link dạng:
`https://vh-seller-xxxx.onrender.com`

**Chia sẻ link này cho tiểu thương khác dùng được ngay, không cần cài gì!**

---

## 📱 CÀI NHƯ APP ĐIỆN THOẠI (PWA)

### Android (Chrome):
1. Mở link trên Chrome
2. Bấm menu ⋮ → **"Thêm vào màn hình chính"**
3. App xuất hiện trên màn hình như app thật

### iPhone (Safari):
1. Mở link trên Safari
2. Bấm nút chia sẻ ⎙ → **"Thêm vào màn hình chính"**
3. Bấm **Thêm**

---

## 💻 CHẠY THỬ TRÊN MÁY TÍNH

```bash
# Cài dependencies
npm install

# Tạo file .env
cp .env.example .env
# Mở .env và điền ANTHROPIC_API_KEY của bạn

# Chạy server
npm start
# → Mở http://localhost:3000
```

---

## 📦 CẤU TRÚC DỰ ÁN

```
viet-han-app/
├── backend/
│   └── server.js       ← Express server + API proxy bảo mật
├── frontend/
│   └── public/
│       ├── index.html  ← Web app (PWA-ready)
│       └── manifest.json
├── package.json
├── .env.example
└── README.md
```

---

## 🛡️ BẢO MẬT

- API key **chỉ lưu trên server**, không bao giờ lộ ra frontend
- Mọi request từ user đều đi qua `/api/chat` → server → Anthropic
- Người dùng không thể thấy hay lấy API key

---

## 📋 TÍNH NĂNG

- 💬 Chat AI trả lời tiếng Hàn tự nhiên + dịch tiếng Việt cho seller
- 📚 Kho 46+ mẫu câu, 11 danh mục (Giá, Ship, Mỹ phẩm, Đổi trả...)
- 🔍 Tìm kiếm và lọc theo danh mục
- 🏷️ Hiển thị nguồn câu đã dùng (RAG transparent)
- 📱 Cài được như app trên điện thoại (PWA)
- 🖥️ Layout tự động: 1 cột (mobile) / 2 cột (desktop)

---

*Xây dựng phục vụ đề tài NCKH về học tiếng Hàn trong TMĐT xuyên biên giới.*
