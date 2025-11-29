# Hướng dẫn Xuất PDF từng Frame - Karaoke Thủ Đô

## 📋 Mục lục
1. [Phương pháp 1: Sử dụng Browser (Đơn giản nhất)](#phương-pháp-1-sử-dụng-browser)
2. [Phương pháp 2: Sử dụng Extension](#phương-pháp-2-sử-dụng-extension)
3. [Phương pháp 3: Sử dụng Code (Tự động)](#phương-pháp-3-sử-dụng-code)
4. [Phương pháp 4: Screenshot Tool](#phương-pháp-4-screenshot-tool)
5. [Danh sách các Frame cần export](#danh-sách-các-frame)

---

## Phương pháp 1: Sử dụng Browser (Đơn giản nhất)

### **A. Với Chrome/Edge:**

#### **Bước 1: Mở DevTools**
- Nhấn `F12` hoặc `Ctrl + Shift + I` (Windows/Linux)
- Nhấn `Cmd + Option + I` (Mac)

#### **Bước 2: Chọn Device Mode**
- Nhấn biểu tượng điện thoại/tablet (Toggle device toolbar) hoặc `Ctrl + Shift + M`
- Chọn kích thước:
  - **Mobile:** 375x667 (iPhone SE) hoặc 390x844 (iPhone 12 Pro)
  - **Desktop:** 1920x1080 hoặc 1440x900

#### **Bước 3: Navigate đến Frame cần export**
- Đăng nhập với các role khác nhau:
  - Admin: email `admin@karaoke.vn` / password `admin123`
  - Manager: email `manager@karaoke.vn` / password `manager123`
  - Staff: email `staff@karaoke.vn` / password `staff123`
  - Customer: email `customer@karaoke.vn` / password `customer123`

#### **Bước 4: Export PDF**
- Nhấn `Ctrl + P` (Windows/Linux) hoặc `Cmd + P` (Mac)
- Trong cửa sổ Print:
  - **Destination:** Chọn "Save as PDF"
  - **Layout:** Portrait (dọc) cho mobile, Landscape (ngang) cho desktop
  - **Scale:** 100%
  - **Margins:** None
  - **Background graphics:** ✅ Bật
  - **Headers and footers:** ❌ Tắt
- Nhấn **Save** và đặt tên file theo format: `Frame_[TênMàn]_[Role]_[Device].pdf`
  - Ví dụ: `Frame_Dashboard_Admin_Desktop.pdf`

---

## Phương pháp 2: Sử dụng Extension

### **A. GoFullPage (Recommended)**

#### **Bước 1: Cài đặt Extension**
1. Mở Chrome Web Store
2. Tìm "GoFullPage - Full Page Screen Capture"
3. Click "Add to Chrome"

#### **Bước 2: Capture màn hình**
1. Navigate đến frame cần export
2. Click vào icon GoFullPage trên toolbar
3. Đợi extension capture toàn bộ trang (bao gồm scroll)
4. Click "Download" để tải về dạng PNG hoặc PDF

### **B. Awesome Screenshot**

#### **Bước 1: Cài đặt**
1. Chrome Web Store → "Awesome Screenshot & Screen Recorder"
2. Add to Chrome

#### **Bước 2: Sử dụng**
1. Click icon Awesome Screenshot
2. Chọn "Capture entire page" hoặc "Capture visible part"
3. Edit nếu cần (thêm annotation)
4. Download as PNG/PDF

---

## Phương pháp 3: Sử dụng Code (Tự động)

Tôi sẽ tạo một component helper để bạn có thể export PDF trực tiếp từ app.

### **Tính năng:**
- Button "Export PDF" trên mỗi màn hình
- Tự động capture toàn bộ màn hình
- Đặt tên file tự động theo màn hình hiện tại
- Support cả mobile và desktop layout

### **Cách sử dụng:**
1. Tôi sẽ tạo component `ExportPDFButton`
2. Thêm button vào các dashboard
3. Click để export PDF ngay lập tức

**Bạn có muốn tôi implement tính năng này không?**

---

## Phương pháp 4: Screenshot Tool

### **A. Windows Snipping Tool / Snip & Sketch**

#### **Bước 1:**
- Nhấn `Windows + Shift + S`
- Chọn vùng cần capture
- Paste vào Paint hoặc Word
- Save as PDF

### **B. macOS Screenshot**

#### **Bước 1:**
- Nhấn `Cmd + Shift + 3` (toàn màn hình)
- Hoặc `Cmd + Shift + 4` (chọn vùng)
- Screenshot tự động lưu vào Desktop
- Sử dụng Preview để convert sang PDF

### **C. Third-party Tools:**
- **Lightshot:** https://app.prntscr.com/
- **ShareX (Windows):** https://getsharex.com/
- **Skitch (Mac):** https://evernote.com/products/skitch

---

## Danh sách các Frame cần export

### **🏠 Public Screens (Không cần đăng nhập)**
- [ ] `Frame_01_Home_Guest_Mobile.pdf`
- [ ] `Frame_01_Home_Guest_Desktop.pdf`
- [ ] `Frame_02_Login_Guest_Mobile.pdf`
- [ ] `Frame_02_Login_Guest_Desktop.pdf`
- [ ] `Frame_03_Signup_Guest_Mobile.pdf`
- [ ] `Frame_03_Signup_Guest_Desktop.pdf`

### **📱 Booking Flow (Guest/Customer)**
- [ ] `Frame_04_BookingStart_Customer_Mobile.pdf`
- [ ] `Frame_04_BookingStart_Customer_Desktop.pdf`
- [ ] `Frame_05_RoomSelection_Customer_Mobile.pdf`
- [ ] `Frame_05_RoomSelection_Customer_Desktop.pdf`
- [ ] `Frame_06_TimeSlot_Customer_Mobile.pdf`
- [ ] `Frame_06_TimeSlot_Customer_Desktop.pdf`
- [ ] `Frame_07_Confirmation_Customer_Mobile.pdf`
- [ ] `Frame_07_Confirmation_Customer_Desktop.pdf`
- [ ] `Frame_08_Success_Customer_Mobile.pdf`
- [ ] `Frame_08_Success_Customer_Desktop.pdf`

### **👤 Customer Dashboard**
- [ ] `Frame_09_Dashboard_Customer_Mobile.pdf`
- [ ] `Frame_09_Dashboard_Customer_Desktop.pdf`
- [ ] `Frame_10_Profile_Customer_Mobile.pdf`
- [ ] `Frame_10_Profile_Customer_Desktop.pdf`
- [ ] `Frame_11_BookingHistory_Customer_Mobile.pdf`
- [ ] `Frame_11_BookingHistory_Customer_Desktop.pdf`
- [ ] `Frame_12_Promotions_Customer_Mobile.pdf`
- [ ] `Frame_12_Promotions_Customer_Desktop.pdf`

### **👨‍💼 Staff Dashboard**
- [ ] `Frame_13_Dashboard_Staff_Mobile.pdf`
- [ ] `Frame_13_Dashboard_Staff_Desktop.pdf`
- [ ] `Frame_14_RoomOrders_Staff_Mobile.pdf`
- [ ] `Frame_14_RoomOrders_Staff_Desktop.pdf`
- [ ] `Frame_15_RoomOrderDetail_Staff_Mobile.pdf`
- [ ] `Frame_15_RoomOrderDetail_Staff_Desktop.pdf`
- [ ] `Frame_16_Attendance_Staff_Mobile.pdf`
- [ ] `Frame_16_Attendance_Staff_Desktop.pdf`
- [ ] `Frame_17_Schedule_Staff_Mobile.pdf`
- [ ] `Frame_17_Schedule_Staff_Desktop.pdf`

### **👔 Manager Dashboard**
- [ ] `Frame_18_Dashboard_Manager_Mobile.pdf`
- [ ] `Frame_18_Dashboard_Manager_Desktop.pdf`
- [ ] `Frame_19_Menu_Manager_Mobile.pdf`
- [ ] `Frame_19_Menu_Manager_Desktop.pdf`
- [ ] `Frame_20_RoomManagement_Manager_Mobile.pdf`
- [ ] `Frame_20_RoomManagement_Manager_Desktop.pdf`
- [ ] `Frame_21_OrderManagement_Manager_Mobile.pdf`
- [ ] `Frame_21_OrderManagement_Manager_Desktop.pdf`
- [ ] `Frame_22_StaffManagement_Manager_Mobile.pdf`
- [ ] `Frame_22_StaffManagement_Manager_Desktop.pdf`
- [ ] `Frame_23_ServiceManagement_Manager_Mobile.pdf`
- [ ] `Frame_23_ServiceManagement_Manager_Desktop.pdf`
- [ ] `Frame_24_RevenueReport_Manager_Mobile.pdf`
- [ ] `Frame_24_RevenueReport_Manager_Desktop.pdf`
- [ ] `Frame_25_Promotions_Manager_Mobile.pdf`
- [ ] `Frame_25_Promotions_Manager_Desktop.pdf`

### **⚙️ Admin Dashboard**
- [ ] `Frame_26_Dashboard_Admin_Mobile.pdf`
- [ ] `Frame_26_Dashboard_Admin_Desktop.pdf`
- [ ] `Frame_27_Menu_Admin_Mobile.pdf`
- [ ] `Frame_27_Menu_Admin_Desktop.pdf`
- [ ] `Frame_28_UserManagement_Admin_Mobile.pdf`
- [ ] `Frame_28_UserManagement_Admin_Desktop.pdf`
- [ ] `Frame_29_BranchManagement_Admin_Mobile.pdf`
- [ ] `Frame_29_BranchManagement_Admin_Desktop.pdf`
- [ ] `Frame_30_StaffManagement_Admin_Mobile.pdf`
- [ ] `Frame_30_StaffManagement_Admin_Desktop.pdf`
- [ ] `Frame_31_ServiceManagement_Admin_Mobile.pdf`
- [ ] `Frame_31_ServiceManagement_Admin_Desktop.pdf`
- [ ] `Frame_32_SystemConfig_Admin_Mobile.pdf`
- [ ] `Frame_32_SystemConfig_Admin_Desktop.pdf`
- [ ] `Frame_33_Monitoring_Admin_Mobile.pdf`
- [ ] `Frame_33_Monitoring_Admin_Desktop.pdf`
- [ ] `Frame_34_Notifications_Admin_Mobile.pdf`
- [ ] `Frame_34_Notifications_Admin_Desktop.pdf`

### **📄 Detail Screens**
- [ ] `Frame_35_BranchDetail_Mobile.pdf`
- [ ] `Frame_35_BranchDetail_Desktop.pdf`
- [ ] `Frame_36_RoomDetail_Mobile.pdf`
- [ ] `Frame_36_RoomDetail_Desktop.pdf`
- [ ] `Frame_37_ServiceDetail_Mobile.pdf`
- [ ] `Frame_37_ServiceDetail_Desktop.pdf`

---

## ✅ Checklist Export

### **Trước khi export:**
- [ ] Đảm bảo app đang chạy local (localhost:3000)
- [ ] Clear browser cache để có màu sắc chính xác
- [ ] Đóng tất cả notification/popup
- [ ] Check responsive mode (mobile/desktop)
- [ ] Scroll to top của màn hình

### **Trong quá trình export:**
- [ ] Đặt tên file theo format đã định
- [ ] Kiểm tra orientation (Portrait/Landscape)
- [ ] Đảm bảo background graphics được bật
- [ ] Check scale = 100%
- [ ] Verify margins = None

### **Sau khi export:**
- [ ] Mở PDF kiểm tra quality
- [ ] Check text có bị blur không
- [ ] Verify màu sắc chính xác
- [ ] Organize files vào folders theo role

---

## 📁 Cấu trúc Folder đề xuất

```
PDF_Exports/
├── 01_Public/
│   ├── Mobile/
│   │   ├── Frame_01_Home_Guest_Mobile.pdf
│   │   ├── Frame_02_Login_Guest_Mobile.pdf
│   │   └── Frame_03_Signup_Guest_Mobile.pdf
│   └── Desktop/
│       ├── Frame_01_Home_Guest_Desktop.pdf
│       ├── Frame_02_Login_Guest_Desktop.pdf
│       └── Frame_03_Signup_Guest_Desktop.pdf
├── 02_Customer/
│   ├── Mobile/
│   └── Desktop/
├── 03_Staff/
│   ├── Mobile/
│   └── Desktop/
├── 04_Manager/
│   ├── Mobile/
│   └── Desktop/
└── 05_Admin/
    ├── Mobile/
    └── Desktop/
```

---

## 💡 Tips & Best Practices

### **1. Đảm bảo Consistency:**
- Export tất cả frames trong 1 session
- Sử dụng cùng 1 browser
- Giữ nguyên zoom level
- Đồng nhất viewport size

### **2. Quality:**
- Export ở resolution cao nhất
- Disable browser extensions ngoại trừ export tool
- Check font rendering
- Verify neon effects render correctly

### **3. Organization:**
- Đặt tên file có system
- Group theo role/feature
- Maintain checklist
- Version control nếu cần

### **4. Mobile vs Desktop:**
- **Mobile viewport:** 375x667 hoặc 390x844
- **Desktop viewport:** 1920x1080 hoặc 1440x900
- Always export BOTH versions
- Compare side-by-side

---

## 🚀 Quick Start Script (Recommended)

### **Workflow nhanh nhất:**

1. **Setup:**
   ```
   - Mở app: http://localhost:3000
   - Mở DevTools (F12)
   - Toggle device mode (Ctrl+Shift+M)
   ```

2. **Mobile Export:**
   ```
   - Chọn iPhone 12 Pro (390x844)
   - Navigate qua từng màn hình
   - Ctrl+P → Save as PDF
   - Tên file: Frame_[Số]_[Tên]_[Role]_Mobile.pdf
   ```

3. **Desktop Export:**
   ```
   - Chọn Responsive (1440x900)
   - Navigate qua từng màn hình
   - Ctrl+P → Save as PDF
   - Tên file: Frame_[Số]_[Tên]_[Role]_Desktop.pdf
   ```

---

## ❓ Troubleshooting

### **Problem 1: Màu sắc không chính xác**
**Solution:**
- Bật "Background graphics" trong Print settings
- Check CSS color-scheme
- Clear browser cache

### **Problem 2: Text bị blur**
**Solution:**
- Increase print scale to 100%
- Use "Save as PDF" thay vì virtual printer
- Export ở resolution cao hơn

### **Problem 3: Neon effects không hiển thị**
**Solution:**
- Đảm bảo "Background graphics" được bật
- Check box-shadow và text-shadow render
- Thử browser khác (Chrome recommended)

### **Problem 4: Layout bị break**
**Solution:**
- Check viewport size chính xác
- Verify responsive breakpoints
- Reload page trước khi export

---

## 🎯 Lựa chọn phương pháp phù hợp

| Phương pháp | Thời gian | Quality | Effort | Recommended for |
|-------------|-----------|---------|--------|-----------------|
| Browser Print | ⚡ Nhanh | ⭐⭐⭐⭐ | ✅ Dễ | Hầu hết cases |
| Extension | ⚡⚡ Trung bình | ⭐⭐⭐⭐⭐ | ✅ Dễ | Full page scroll |
| Code Export | ⚡⚡⚡ Tự động | ⭐⭐⭐⭐ | 🔧 Setup | Batch export |
| Screenshot | ⚡ Nhanh | ⭐⭐⭐ | ✅ Dễ | Quick preview |

**Recommendation:** Sử dụng **Browser Print** cho majority, **GoFullPage Extension** cho pages có scroll dài.

---

## 📞 Support

Nếu bạn cần:
- ✅ Tôi tạo component auto-export PDF
- ✅ Script để batch export tất cả frames
- ✅ Custom viewport sizes
- ✅ Automation với Playwright/Puppeteer

Hãy cho tôi biết bạn muốn implement phương pháp nào! 🚀
