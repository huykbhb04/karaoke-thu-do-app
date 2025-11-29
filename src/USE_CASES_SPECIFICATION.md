# ĐẶC TẢ USE CASES - HỆ THỐNG KARAOKE THỦ ĐÔ

**Phiên bản:** 1.0  
**Ngày:** 03/11/2025  
**Người soạn:** System Analyst  
**Dự án:** Ứng dụng quản lý Karaoke Thủ Đô

---

## MỤC LỤC

1. [Use Cases Công khai (UC-PUB-001 đến UC-PUB-010)](#1-use-cases-công-khai)
2. [Use Cases Nhân viên (UC-STF-001 đến UC-STF-011)](#2-use-cases-nhân-viên-staff)
3. [Use Cases Khách hàng (UC-CUS-001 đến UC-CUS-020)](#3-use-cases-khách-hàng-customer)
4. [Use Cases Quản lý (UC-MGR-001 đến UC-MGR-024)](#4-use-cases-quản-lý-manager)
5. [Use Cases Admin (UC-ADM-001 đến UC-ADM-023)](#5-use-cases-admin)

---

# 1. USE CASES CÔNG KHAI

## UC-PUB-001: Xem trang chủ với hero banner

**Mã UC:** UC-PUB-001  
**Tác nhân chính:** Khách truy cập (Guest)  
**Mô tả:** Khách truy cập xem trang chủ của hệ thống với hero banner, thông tin tổng quan về Karaoke Thủ Đô

### Điều kiện tiên quyết:
- Khách truy cập mở ứng dụng web/mobile
- Kết nối internet ổn định

### Luồng chính:
1. Khách truy cập truy cập URL của ứng dụng
2. Hệ thống hiển thị navbar với logo và nút đăng nhập/đăng ký
3. Hệ thống hiển thị hero banner với:
   - Hình ảnh nền karaoke sang trọng
   - Tiêu đề "Trải nghiệm âm nhạc đỉnh cao"
   - Nút "Đặt phòng ngay" và "Xem dịch vụ"
   - Thống kê: 3 cơ sở, 45 phòng, 10+ năm kinh nghiệm
4. Khách truy cập cuộn xuống xem các section tiếp theo
5. Use case kết thúc

### Ngoại lệ:
- **E1:** Lỗi kết nối mạng
  - Hệ thống hiển thị loading screen hoặc thông báo lỗi
  - Đề xuất kiểm tra lại kết nối
- **E2:** Hình ảnh không tải được
  - Hệ thống hiển thị placeholder image
  - Vẫn cho phép xem nội dung văn bản

### Luồng thay thế:
- **A1:** Khách truy cập click "Đặt phòng ngay"
  - Chuyển sang UC-PUB-009 (Đăng nhập) nếu chưa đăng nhập
  - Hoặc chuyển sang booking flow nếu đã đăng nhập
- **A2:** Khách truy cập click menu
  - Mở mobile menu dropdown với các section links

### Hậu điều kiện:
- Trang chủ được hiển thị đầy đủ
- Khách truy cập có thể điều hướng đến các section khác

---

## UC-PUB-002: Xem danh sách 3 cơ sở tại Hà Nội

**Mã UC:** UC-PUB-002  
**Tác nhân chính:** Khách truy cập (Guest)  
**Mô tả:** Khách truy cập xem thông tin tổng quan về 3 cơ sở karaoke tại Hà Nội

### Điều kiện tiên quyết:
- Khách truy cập đang ở trang chủ
- Đã cuộn đến section "Về chúng tôi"

### Luồng chính:
1. Khách truy cập cuộn đến section "Giới thiệu Karaoke Thủ Đô"
2. Hệ thống hiển thị danh sách 3 cơ sở:
   - Cơ sở 1: Trần Duy Hưng (15 phòng)
   - Cơ sở 2: Nguyễn Huệ (12 phòng)
   - Cơ sở 3: Láng Hạ (18 phòng)
3. Mỗi cơ sở hiển thị:
   - Tên và địa chỉ đầy đủ
   - Số điện thoại
   - Giờ mở cửa (10:00 - 02:00)
   - Số lượng phòng
4. Khách truy cập xem thông tin các cơ sở
5. Use case kết thúc

### Ngoại lệ:
- **E1:** Dữ liệu cơ sở không tải được
  - Hiển thị thông báo "Đang tải thông tin..."
  - Retry tự động sau 3s

### Luồng thay thế:
- **A1:** Khách truy cập click vào 1 cơ sở
  - Chuyển sang UC-PUB-003 (Xem chi tiết cơ sở)

### Hậu điều kiện:
- Khách truy cập nắm được thông tin 3 cơ sở
- Có thể click để xem chi tiết từng cơ sở

---

## UC-PUB-003: Xem chi tiết cơ sở

**Mã UC:** UC-PUB-003  
**Tác nhân chính:** Khách truy cập (Guest)  
**Mô tả:** Khách truy cập xem thông tin chi tiết về một cơ sở cụ thể

### Điều kiện tiên quyết:
- Khách truy cập đã click vào một cơ sở từ danh sách

### Luồng chính:
1. Khách truy cập click vào card cơ sở
2. Hệ thống chuyển sang màn hình chi tiết cơ sở
3. Hệ thống hiển thị:
   - Header với nút quay lại
   - Hình ảnh cơ sở
   - Tên cơ sở
   - Địa chỉ chi tiết với icon bản đồ
   - Số điện thoại
   - Giờ mở cửa
   - Số lượng phòng
   - Tiện ích (WiFi, Parking, Bar...)
   - Map/Direction (nếu có)
4. Khách truy cập xem thông tin chi tiết
5. Use case kết thúc

### Ngoại lệ:
- **E1:** Dữ liệu chi tiết không tải được
  - Hiển thị thông báo lỗi
  - Cho phép quay lại trang trước

### Luồng thay thế:
- **A1:** Khách truy cập click nút "Đặt phòng tại cơ sở này"
  - Chuyển sang flow đặt phòng với cơ sở được pre-select
- **A2:** Khách truy cập click số điện thoại
  - Mở ứng dụng điện thoại để gọi
- **A3:** Khách truy cập click địa chỉ
  - Mở ứng dụng bản đồ với địa chỉ

### Hậu điều kiện:
- Khách truy cập có đầy đủ thông tin về cơ sở
- Có thể gọi điện hoặc đặt phòng trực tiếp

---

## UC-PUB-004: Xem showcase 4 loại phòng karaoke

**Mã UC:** UC-PUB-004  
**Tác nhân chính:** Khách truy cập (Guest)  
**Mô tả:** Khách truy cập xem giới thiệu 4 loại phòng karaoke với hình ảnh và thông tin cơ bản

### Điều kiện tiên quyết:
- Khách truy cập đang ở trang chủ
- Đã cuộn đến section "Phòng hát"

### Luồng chính:
1. Khách truy cập cuộn đến section "Đa dạng phòng hát"
2. Hệ thống hiển thị grid 2x2 với 4 loại phòng:
   - **Phòng VIP 01:** 15-20 người, 450.000đ/giờ, rating 4.9⭐
   - **Phòng Family 02:** 8-10 người, 280.000đ/giờ, rating 4.7⭐
   - **Phòng Couple 03:** 2-4 người, 250.000đ/giờ, rating 4.8⭐
   - **Phòng Party 04:** 20-30 người, 600.000đ/giờ, rating 5.0⭐
3. Mỗi card phòng hiển thị:
   - Hình ảnh đại diện
   - Tên phòng
   - Sức chứa
   - Giá/giờ
   - Rating
   - 2 tiện nghi nổi bật
   - Nút "Đặt"
4. Khách truy cập xem tổng quan các loại phòng
5. Use case kết thúc

### Ngoại lệ:
- **E1:** Hình ảnh phòng không tải được
  - Hiển thị placeholder với icon microphone
  - Vẫn hiển thị đầy đủ thông tin văn bản

### Luồng thay thế:
- **A1:** Khách truy cập click vào card phòng
  - Chuyển sang UC-PUB-005 (Xem chi tiết phòng)
- **A2:** Khách truy cập click nút "Đặt"
  - Nếu chưa đăng nhập: chuyển sang UC-PUB-009
  - Nếu đã đăng nhập: chuyển sang booking flow

### Hậu điều kiện:
- Khách truy cập biết được các loại phòng có sẵn
- Có thể so sánh giá và sức chứa
- Có thể click để xem chi tiết hoặc đặt phòng

---

## UC-PUB-005: Xem chi tiết phòng

**Mã UC:** UC-PUB-005  
**Tác nhân chính:** Khách truy cập (Guest)  
**Mô tả:** Khách truy cập xem thông tin chi tiết về một phòng karaoke cụ thể

### Điều kiện tiên quyết:
- Khách truy cập đã click vào một phòng từ showcase

### Luồng chính:
1. Khách truy cập click vào card phòng
2. Hệ thống chuyển sang màn hình chi tiết phòng
3. Hệ thống hiển thị:
   - Header với nút quay lại
   - Gallery hình ảnh phòng (swipeable)
   - Tên phòng và loại
   - Rating chi tiết với số lượng đánh giá
   - Giá/giờ và các mức giá theo giờ
   - Sức chứa
   - Danh sách đầy đủ tiện nghi:
     - Âm thanh (Dàn âm thanh 5.1/Bose/JBL...)
     - Ánh sáng (LED RGB, đèn sân khấu...)
     - Nội thất (Sofa cao cấp, bàn VIP...)
     - Tiện ích (Mini Bar, điều hòa, TV...)
   - Mô tả chi tiết
   - Các cơ sở có phòng này
   - Đánh giá từ khách hàng
   - Nút "Đặt phòng ngay"
4. Khách truy cập xem chi tiết và scroll
5. Use case kết thúc

### Ngoại lệ:
- **E1:** Dữ liệu phòng không đầy đủ
  - Hiển thị thông tin có sẵn
  - Thông báo "Một số thông tin đang được cập nhật"

### Luồng thay thế:
- **A1:** Khách truy cập swipe gallery
  - Hiển thị các hình ảnh khác của phòng
- **A2:** Khách truy cập click "Đặt phòng ngay"
  - Chuyển sang flow đăng nhập hoặc đặt phòng
- **A3:** Khách truy cập click vào một cơ sở
  - Chuyển sang UC-PUB-003 với cơ sở đó

### Hậu điều kiện:
- Khách truy cập có đầy đủ thông tin về phòng
- Có thể quyết định đặt phòng
- Có thể xem các cơ sở có phòng này

---

## UC-PUB-006: Xem danh sách dịch vụ kèm theo

**Mã UC:** UC-PUB-006  
**Tác nhân chính:** Khách truy cập (Guest)  
**Mô tả:** Khách truy cập xem các dịch vụ kèm theo như đồ uống, snack, trang trí...

### Điều kiện tiên quyết:
- Khách truy cập đang ở trang chủ
- Đã cuộn đến section "Dịch vụ"

### Luồng chính:
1. Khách truy cập cuộn đến section "Dịch vụ đẳng cấp"
2. Hệ thống hiển thị grid 2x2 với 4 loại dịch vụ:
   - 🍹 **Đồ uống cao cấp:** Menu đa dạng (nước ngọt, bia, rượu, cocktail) - Từ 30.000đ
   - 🍿 **Snack & Trái cây:** Snack nhập khẩu, hoa quả tươi - Từ 50.000đ
   - 🎂 **Phục vụ sinh nhật:** Bánh kem, trang trí, bóng bay - 500.000đ
   - 🎉 **Trang trí sự kiện:** Setup theo chủ đề, backdrop - Từ 800.000đ
3. Mỗi card dịch vụ hiển thị:
   - Icon/Emoji đại diện
   - Tên dịch vụ
   - Mô tả ngắn
   - Giá
4. Khách truy cập xem các dịch vụ có sẵn
5. Use case kết thúc

### Ngoại lệ:
- **E1:** Danh sách dịch vụ trống
  - Hiển thị "Đang cập nhật dịch vụ mới"

### Luồng thay thế:
- **A1:** Khách truy cập click vào một dịch vụ
  - Chuyển sang UC-PUB-007 (Xem chi tiết dịch vụ)

### Hậu điều kiện:
- Khách truy cập biết các dịch vụ kèm theo có sẵn
- Có thể click để xem chi tiết từng dịch vụ

---

## UC-PUB-007: Xem chi tiết dịch vụ

**Mã UC:** UC-PUB-007  
**Tác nhân chính:** Khách truy cập (Guest)  
**Mô tả:** Khách truy cập xem thông tin chi tiết về một dịch vụ cụ thể

### Điều kiện tiên quyết:
- Khách truy cập đã click vào một dịch vụ từ danh sách

### Luồng chính:
1. Khách truy cập click vào card dịch vụ
2. Hệ thống chuyển sang màn hình chi tiết dịch vụ
3. Hệ thống hiển thị:
   - Header với nút quay lại
   - Icon/Hình ảnh dịch vụ lớn
   - Tên dịch vụ
   - Mô tả chi tiết
   - Bảng giá chi tiết (nếu có nhiều mức)
   - Menu chi tiết (đối với đồ uống/snack)
   - Hình ảnh minh họa
   - Package combo (nếu có)
   - Điều kiện áp dụng
   - Thời gian phục vụ
4. Khách truy cập xem chi tiết dịch vụ
5. Use case kết thúc

### Ngoại lệ:
- **E1:** Dữ liệu dịch vụ không đầy đủ
  - Hiển thị thông tin cơ bản
  - Gợi ý liên hệ để biết thêm chi tiết

### Luồng thay thế:
- **A1:** Khách truy cập muốn đặt dịch vụ này
  - Thông báo "Vui lòng đặt phòng trước để chọn dịch vụ kèm theo"
  - Chuyển sang flow đặt phòng

### Hậu điều kiện:
- Khách truy cập hiểu rõ về dịch vụ
- Có thông tin đầy đủ để quyết định

---

## UC-PUB-008: Xem thông tin liên hệ & mạng xã hội

**Mã UC:** UC-PUB-008  
**Tác nhân chính:** Khách truy cập (Guest)  
**Mô tả:** Khách truy cập xem thông tin liên hệ và kết nối mạng xã hội của Karaoke Thủ Đô

### Điều kiện tiên quyết:
- Khách truy cập đang ở trang chủ
- Đã cuộn đến footer section

### Luồng chính:
1. Khách truy cập cuộn xuống footer/contact section
2. Hệ thống hiển thị thông tin liên hệ:
   - **Hotline:** 1900-xxxx
   - **Email:** info@karaoketd.vn
   - **Giờ mở cửa:** 10:00 - 02:00 hàng ngày
3. Hệ thống hiển thị social media links:
   - Facebook icon với link
   - Instagram icon với link
   - TikTok/Music icon với link
   - Thông báo "Theo dõi để nhận ưu đãi mới nhất!"
4. Hiển thị copyright: "© 2025 Karaoke Thủ Đô"
5. Khách truy cập xem thông tin
6. Use case kết thúc

### Ngoại lệ:
- Không có ngoại lệ đặc biệt (thông tin tĩnh)

### Luồng thay thế:
- **A1:** Khách truy cập click số hotline
  - Mở ứng dụng điện thoại để gọi
- **A2:** Khách truy cập click email
  - Mở ứng dụng email với địa chỉ được điền sẵn
- **A3:** Khách truy cập click social media icon
  - Mở trang mạng xã hội tương ứng trong browser/app

### Hậu điều kiện:
- Khách truy cập có thông tin liên hệ đầy đủ
- Có thể liên hệ hoặc follow social media

---

## UC-PUB-009: Đăng nhập hệ thống

**Mã UC:** UC-PUB-009  
**Tác nhân chính:** Người dùng chưa xác thực  
**Mô tả:** Người dùng đăng nhập vào hệ thống với email và mật khẩu

### Điều kiện tiên quyết:
- Người dùng đã có tài khoản trong hệ thống
- Người dùng đang ở màn hình chưa đăng nhập

### Luồng chính:
1. Người dùng click nút "Đăng nhập" trên navbar hoặc từ màn hình yêu cầu đăng nhập
2. Hệ thống hiển thị màn hình đăng nhập với:
   - Header với nút quay lại
   - Trường nhập Email
   - Trường nhập Mật khẩu
   - Link "Quên mật khẩu?"
   - Nút "🔐 Đăng nhập"
   - Link "Chưa có tài khoản? Đăng ký ngay"
   - Divider "hoặc"
   - Nút "Tiếp tục với Google"
3. Người dùng nhập email
4. Người dùng nhập mật khẩu
5. Người dùng click nút "Đăng nhập"
6. Hệ thống hiển thị màn hình chọn vai trò (Demo mode):
   - 👔 Đăng nhập với vai trò Nhân viên
   - 💼 Đăng nhập với vai trò Quản lý
   - 👤 Đăng nhập với vai trò Khách hàng
   - 🔧 Đăng nhập với vai trò Admin
7. Người dùng chọn vai trò
8. Hệ thống xác thực thông tin
9. Hệ thống chuyển đến dashboard tương ứng với vai trò
10. Use case kết thúc thành công

### Ngoại lệ:
- **E1:** Email hoặc mật khẩu để trống
  - Hiển thị lỗi validation "Vui lòng điền đầy đủ thông tin"
  - Yêu cầu nhập lại
- **E2:** Email sai định dạng
  - Hiển thị lỗi "Email không đúng định dạng"
- **E3:** Email hoặc mật khẩu không đúng (trong production)
  - Hiển thị "Email hoặc mật khẩu không chính xác"
  - Giữ lại email đã nhập
  - Clear password field
- **E4:** Tài khoản bị khóa
  - Hiển thị "Tài khoản đã bị khóa. Vui lòng liên hệ admin"
- **E5:** Lỗi kết nối server
  - Hiển thị "Lỗi kết nối. Vui lòng thử lại"

### Luồng thay thế:
- **A1:** Người dùng click "Quên mật khẩu?"
  - Hiển thị thông báo "Chức năng đang phát triển"
  - (Production: Chuyển sang flow reset password)
- **A2:** Người dùng click "Đăng ký ngay"
  - Chuyển sang UC-PUB-010 (Đăng ký tài khoản)
- **A3:** Người dùng click "Tiếp tục với Google"
  - Hiển thị "Đăng nhập Google - Chức năng demo"
  - (Production: Mở OAuth flow của Google)
- **A4:** Người dùng click nút quay lại từ màn hình chọn vai trò
  - Quay lại màn hình đăng nhập

### Hậu điều kiện:
- **Thành công:**
  - Người dùng được xác thực
  - Session được tạo
  - Chuyển đến dashboard của vai trò đã chọn
  - Navbar hiển thị trạng thái đã đăng nhập
- **Thất bại:**
  - Người dùng vẫn ở màn hình đăng nhập
  - Không có session được tạo

---

## UC-PUB-010: Đăng ký tài khoản mới

**Mã UC:** UC-PUB-010  
**Tác nhân chính:** Khách truy cập  
**Mô tả:** Khách truy cập đăng ký tài khoản mới với vai trò mặc định là Khách hàng

### Điều kiện tiên quyết:
- Khách truy cập chưa có tài khoản
- Đang ở màn hình đăng ký hoặc được chuyển từ đăng nhập

### Luồng chính:
1. Khách truy cập click "Đăng ký ngay" từ navbar hoặc màn hình đăng nhập
2. Hệ thống hiển thị màn hình đăng ký với:
   - Header với nút quay lại
   - Trường nhập "Họ và tên"
   - Trường nhập "Email"
   - Trường nhập "Mật khẩu"
   - Nút "✨ Đăng ký"
   - Link "Đã có tài khoản? Đăng nhập"
   - Divider "hoặc"
   - Nút "Tiếp tục với Google"
3. Khách truy cập nhập họ tên
4. Khách truy cập nhập email
5. Khách truy cập nhập mật khẩu
6. Khách truy cập click "Đăng ký"
7. Hệ thống validate dữ liệu:
   - Kiểm tra tất cả trường đã điền
   - Kiểm tra email đúng định dạng
   - Kiểm tra mật khẩu đủ mạnh (nếu có rule)
   - Kiểm tra email chưa tồn tại trong hệ thống
8. Hệ thống tạo tài khoản mới với vai trò "customer"
9. Hệ thống tự động đăng nhập người dùng
10. Hệ thống chuyển đến Customer Dashboard
11. Use case kết thúc thành công

### Ngoại lệ:
- **E1:** Có trường để trống
  - Hiển thị lỗi "Vui lòng điền đầy đủ thông tin"
  - Highlight các trường còn thiếu
- **E2:** Email sai định dạng
  - Hiển thị "Email không đúng định dạng"
  - Focus vào trường email
- **E3:** Email đã tồn tại
  - Hiển thị "Email đã được đăng ký"
  - Gợi ý "Đã có tài khoản? Đăng nhập ngay"
- **E4:** Mật khẩu quá yếu (nếu có rule)
  - Hiển thị "Mật khẩu phải có ít nhất 8 ký tự, bao gồm chữ hoa, chữ thường và số"
- **E5:** Lỗi kết nối server
  - Hiển thị "Không thể đăng ký. Vui lòng thử lại sau"

### Luồng thay thế:
- **A1:** Khách truy cập click "Đăng nhập"
  - Chuyển sang UC-PUB-009 (Đăng nhập)
- **A2:** Khách truy cập click "Tiếp tục với Google"
  - Hiển thị "Đăng nhập Google - Chức năng demo"
  - (Production: Mở OAuth flow, tạo tài khoản với Google)
- **A3:** Khách truy cập click nút quay lại
  - Quay lại màn hình trước (home hoặc login)

### Hậu điều kiện:
- **Thành công:**
  - Tài khoản mới được tạo trong database
  - Vai trò mặc định: "customer"
  - Người dùng được tự động đăng nhập
  - Chuyển đến Customer Dashboard
  - Email welcome được gửi (nếu có tích hợp email)
- **Thất bại:**
  - Không có tài khoản mới được tạo
  - Người dùng vẫn ở màn hình đăng ký

---

# 2. USE CASES NHÂN VIÊN (STAFF)

## UC-STF-001: Xem dashboard nhân viên với thông tin ca làm việc

**Mã UC:** UC-STF-001  
**Tác nhân chính:** Nhân viên  
**Mô tả:** Nhân viên xem dashboard tổng quan với thông tin ca làm việc hiện tại

### Điều kiện tiên quyết:
- Nhân viên đã đăng nhập với vai trò "staff"
- Có quyền truy cập Staff Dashboard

### Luồng chính:
1. Nhân viên đăng nhập thành công với vai trò "staff"
2. Hệ thống chuyển đến Staff Dashboard (tab home)
3. Hệ thống hiển thị:
   - **Header gradient với:**
     - Lời chào "Xin chào, [Tên nhân viên]"
     - Avatar nhân viên
   - **2 Stats Cards:**
     - Ca làm hôm nay: 08:00 - 16:00
     - Giờ làm tuần này: 32 giờ
   - **Menu chính (grid 2x2):**
     - 🕐 Chấm công
     - 📅 Lịch làm việc
     - 🛒 Order phòng hát
     - 👤 Thông tin cá nhân
   - **Thông báo mới:**
     - Thông báo về lịch làm việc tuần sau
4. Nhân viên xem thông tin tổng quan
5. Use case kết thúc

### Ngoại lệ:
- **E1:** Không load được thông tin ca làm việc
  - Hiển thị "Đang tải thông tin ca..."
  - Retry sau 3s
- **E2:** Không có ca làm việc hôm nay
  - Hiển thị "Không có ca làm việc hôm nay"

### Luồng thay thế:
- **A1:** Nhân viên click vào một menu item
  - Chuyển sang use case tương ứng (UC-STF-004 đến UC-STF-011)
- **A2:** Nhân viên click thông báo
  - Hiển thị chi tiết thông báo

### Hậu điều kiện:
- Dashboard được hiển thị đầy đủ
- Nhân viên nắm được thông tin ca làm việc
- Có thể truy cập các chức năng khác

---

## UC-STF-002: Xem thống kê giờ làm việc tuần

**Mã UC:** UC-STF-002  
**Tác nhân chính:** Nhân viên  
**Mô tả:** Nhân viên xem tổng số giờ đã làm việc trong tuần hiện tại

### Điều kiện tiên quyết:
- Nhân viên đã đăng nhập
- Đang ở Staff Dashboard

### Luồng chính:
1. Nhân viên xem stats card "Giờ làm tuần này"
2. Hệ thống tính tổng số giờ từ các ca đã chấm công trong tuần
3. Hệ thống hiển thị: "32 giờ" (ví dụ)
4. Nhân viên xem thông tin
5. Use case kết thúc

### Ngoại lệ:
- **E1:** Chưa có dữ liệu chấm công tuần này
  - Hiển thị "0 giờ"

### Luồng thay thế:
- **A1:** Nhân viên muốn xem chi tiết
  - Click vào card → Chuyển sang tab lịch sử chấm công

### Hậu điều kiện:
- Nhân viên biết tổng giờ làm việc tuần này

---

## UC-STF-003: Xem thông báo mới

**Mã UC:** UC-STF-003  
**Tác nhân chính:** Nhân viên  
**Mô tả:** Nhân viên xem các thông báo mới từ quản lý/hệ thống

### Điều kiện tiên quyết:
- Nhân viên đã đăng nhập
- Đang ở Staff Dashboard

### Luồng chính:
1. Nhân viên cuộn xuống section "Thông báo mới"
2. Hệ thống hiển thị danh sách thông báo:
   - Icon chuông
   - Tiêu đề thông báo
   - Nội dung ngắn gọn
   - Thời gian (vd: "2 giờ trước")
3. Nhân viên đọc thông báo
4. Use case kết thúc

### Ngoại lệ:
- **E1:** Không có thông báo mới
  - Hiển thị "Không có thông báo mới"

### Luồng thay thế:
- **A1:** Nhân viên click vào thông báo
  - Hiển thị dialog với nội dung đầy đủ
  - Đánh dấu đã đọc
- **A2:** Nhân viên click icon bell ở bottom nav
  - Chuyển sang trang danh sách tất cả thông báo

### Hậu điều kiện:
- Nhân viên nắm được thông tin mới
- Thông báo được đánh dấu đã xem (nếu có click)

---

## UC-STF-004: Chấm công bắt đầu ca làm việc

**Mã UC:** UC-STF-004  
**Tác nhân chính:** Nhân viên  
**Mô tả:** Nhân viên chấm công bắt đầu ca làm việc của mình

### Điều kiện tiên quyết:
- Nhân viên đã đăng nhập
- Có ca làm việc trong hôm nay
- Chưa bắt đầu chấm công ca hiện tại

### Luồng chính:
1. Nhân viên click vào menu "Chấm công" từ dashboard
2. Hệ thống chuyển sang màn hình chấm công
3. Hệ thống hiển thị:
   - Thời gian hiện tại: 14:32
   - Ngày: Thứ Hai, 13/10/2025
   - Trạng thái: "Chưa chấm công"
   - Badge: "Chờ bắt đầu" (màu xám)
   - Nút "▶ Bắt đầu ca" (màu vàng)
4. Nhân viên click nút "▶ Bắt đầu ca"
5. Hệ thống xác nhận:
   - Hiển thị dialog "Bắt đầu ca làm việc?"
   - Hiển thị giờ bắt đầu dự kiến
6. Nhân viên xác nhận
7. Hệ thống ghi nhận:
   - Thời gian bắt đầu ca: 08:15 AM (thực tế)
   - Cập nhật trạng thái: "Đang làm việc"
   - Badge: "Hoạt động" (màu xanh)
   - Nút đổi thành "⏹ Kết thúc ca" (màu đỏ)
8. Hệ thống hiển thị toast "✓ Đã chấm công bắt đầu ca"
9. Use case kết thúc thành công

### Ngoại lệ:
- **E1:** Không phải giờ làm việc
  - Hiển thị "Chưa đến giờ bắt đầu ca"
  - Không cho phép chấm công
- **E2:** Đã chấm công rồi
  - Hiển thị "Bạn đã chấm công bắt đầu ca lúc [giờ]"
- **E3:** Lỗi lưu dữ liệu
  - Hiển thị toast lỗi "Không thể chấm công. Vui lòng thử lại"
  - Quay lại trạng thái ban đầu

### Luồng thay thế:
- **A1:** Nhân viên không xác nhận
  - Đóng dialog
  - Không ghi nhận chấm công
- **A2:** Chấm công muộn (sau giờ quy định)
  - Hiển thị cảnh báo "Bạn đang chấm công muộn [X] phút"
  - Vẫn cho phép chấm công
  - Ghi nhận thời gian thực tế và trạng thái "Muộn"

### Hậu điều kiện:
- **Thành công:**
  - Dữ liệu chấm công bắt đầu ca được lưu
  - Trạng thái đổi thành "Đang làm việc"
  - Thời gian bắt đầu được ghi nhận
  - Nút đổi thành "Kết thúc ca"
- **Thất bại:**
  - Không có dữ liệu được lưu
  - Trạng thái không đổi

---

## UC-STF-005: Chấm công kết thúc ca làm việc

**Mã UC:** UC-STF-005  
**Tác nhân chính:** Nhân viên  
**Mô tả:** Nhân viên chấm công kết thúc ca làm việc

### Điều kiện tiên quyết:
- Nhân viên đã chấm công bắt đầu ca
- Trạng thái hiện tại: "Đang làm việc"

### Luồng chính:
1. Nhân viên vào màn hình chấm công (đang trạng thái "Đang làm việc")
2. Hệ thống hiển thị:
   - Trạng thái: "Đang làm việc"
   - Badge: "Hoạt động" (màu xanh)
   - Thời gian bắt đầu: 08:15 AM
   - Đã làm việc: 7 giờ 45 phút (tính realtime)
   - Nút "⏹ Kết thúc ca" (màu đỏ)
3. Nhân viên click nút "⏹ Kết thúc ca"
4. Hệ thống hiển thị dialog xác nhận:
   - "Kết thúc ca làm việc?"
   - Giờ bắt đầu: 08:15
   - Giờ kết thúc: 16:00 (dự kiến) / 16:05 (thực tế)
   - Tổng giờ làm: 7 giờ 50 phút
5. Nhân viên xác nhận
6. Hệ thống ghi nhận:
   - Thời gian kết thúc: 16:05 PM
   - Tổng số giờ làm việc: 7h50p
   - Cập nhật trạng thái: "Đã kết thúc ca"
7. Hệ thống thêm vào lịch sử chấm công
8. Hệ thống hiển thị toast "✓ Đã chấm công kết thúc ca"
9. Nút đổi về "▶ Bắt đầu ca" (disabled nếu không có ca tiếp theo)
10. Use case kết thúc thành công

### Ngoại lệ:
- **E1:** Chưa đủ thời gian làm tối thiểu
  - Hiển thị cảnh báo "Ca làm chưa đủ [X] giờ quy định"
  - Hỏi có chắc chắn muốn kết thúc không
- **E2:** Lỗi lưu dữ liệu
  - Hiển thị lỗi "Không thể kết thúc ca. Vui lòng thử lại"

### Luồng thay thế:
- **A1:** Nhân viên hủy xác nhận
  - Đóng dialog
  - Vẫn ở trạng thái "Đang làm việc"
- **A2:** Kết thúc sớm (trước giờ quy định)
  - Hiển thị cảnh báo "Bạn đang kết thúc ca sớm [X] phút"
  - Yêu cầu xác nhận lần 2
  - Ghi nhận trạng thái "Về sớm"
- **A3:** Kết thúc muộn (sau giờ quy định)
  - Ghi nhận giờ làm thêm
  - Hiển thị "Bạn đã làm thêm [X] phút"

### Hậu điều kiện:
- **Thành công:**
  - Dữ liệu chấm công kết thúc được lưu
  - Tổng giờ làm việc được tính
  - Record được thêm vào lịch sử
  - Trạng thái đổi về "Chưa chấm công"
  - Cập nhật tổng giờ làm tuần
- **Thất bại:**
  - Vẫn ở trạng thái "Đang làm việc"

---

## UC-STF-006: Xem lịch sử chấm công

**Mã UC:** UC-STF-006  
**Tác nhân chính:** Nhân viên  
**Mô tả:** Nhân viên xem lịch sử các lần chấm công đã thực hiện

### Điều kiện tiên quyết:
- Nhân viên đã đăng nhập
- Đang ở màn hình chấm công

### Luồng chính:
1. Nhân viên cuộn xuống section "Lịch sử chấm công"
2. Hệ thống hiển thị danh sách các record chấm công:
   - **Ngày:** 12/10/2025
     - Giờ vào: 08:00
     - Giờ ra: 16:00
     - Tổng: 8h
     - Badge: "Đúng giờ"
   - **Ngày:** 11/10/2025
     - Giờ vào: 16:00
     - Giờ ra: 00:00
     - Tổng: 8h
   - (Danh sách từ mới đến cũ)
3. Nhân viên xem lịch sử
4. Use case kết thúc

### Ngoại lệ:
- **E1:** Chưa có lịch sử chấm công
  - Hiển thị "Chưa có dữ liệu chấm công"

### Luồng thay thế:
- **A1:** Nhân viên click vào một record
  - Hiển thị chi tiết (location check-in, notes...)
- **A2:** Nhân viên muốn export
  - Click nút export → Tải file Excel/PDF

### Hậu điều kiện:
- Nhân viên xem được lịch sử chấm công

---

## UC-STF-007: Xem lịch làm việc tuần/tháng

**Mã UC:** UC-STF-007  
**Tác nhân chính:** Nhân viên  
**Mô tả:** Nhân viên xem lịch làm việc được phân công cho tuần/tháng

### Điều kiện tiên quyết:
- Nhân viên đã đăng nhập
- Click vào menu "Lịch làm việc"

### Luồng chính:
1. Nhân viên click "Lịch làm việc" từ dashboard
2. Hệ thống chuyển sang màn hình lịch làm việc
3. Hệ thống hiển thị:
   - Header: "Lịch làm việc - Tuần 42 - Tháng 10/2025"
   - Nút quay lại
4. Hệ thống hiển thị danh sách ca làm việc:
   - **13/10/2025 (T2):**
     - Ca: 08:00 - 16:00
     - Trạng thái: "Đã xác nhận" (badge xanh)
   - **14/10/2025 (T3):**
     - Ca: 16:00 - 24:00
     - Trạng thái: "Đã xác nhận" (badge xanh)
   - **15/10/2025 (T4):**
     - Ca: 08:00 - 16:00
     - Trạng thái: "Chờ duyệt" (badge vàng)
   - **16/10/2025 (T5):**
     - Off
     - Trạng thái: "Nghỉ" (badge xám)
5. Nhân viên xem lịch
6. Use case kết thúc

### Ngoại lệ:
- **E1:** Chưa có lịch được phân công
  - Hiển thị "Chưa có lịch làm việc"
  - Gợi ý "Liên hệ quản lý để được phân ca"

### Luồng thay thế:
- **A1:** Nhân viên click vào một ca làm việc
  - Hiển thị chi tiết ca (địa điểm, ghi chú...)
- **A2:** Nhân viên muốn xem tuần khác
  - Swipe left/right hoặc chọn tuần từ dropdown

### Hậu điều kiện:
- Nhân viên biết lịch làm việc của mình
- Có thể lên kế hoạch cá nhân

---

## UC-STF-008: Đăng ký đổi ca làm việc

**Mã UC:** UC-STF-008  
**Tác nhân chính:** Nhân viên  
**Mô tả:** Nhân viên gửi yêu cầu đổi ca làm việc

### Điều kiện tiên quyết:
- Nhân viên đã đăng nhập
- Đang ở màn hình lịch làm việc
- Có ca làm việc đã được phân công

### Luồng chính:
1. Nhân viên click nút "Đăng ký đổi ca" ở cuối danh sách lịch
2. Hệ thống hiển thị form đổi ca:
   - Dropdown chọn ca muốn đổi
   - Dropdown chọn ca muốn nhận
   - Hoặc: Dropdown chọn nhân viên muốn đổi
   - Textarea lý do đổi ca
   - Nút "Gửi yêu cầu"
3. Nhân viên chọn ca muốn đổi
4. Nhân viên chọn ca muốn nhận hoặc người muốn đổi
5. Nhân viên nhập lý do
6. Nhân viên click "Gửi yêu cầu"
7. Hệ thống validate:
   - Kiểm tra ca có thể đổi
   - Kiểm tra lý do đã nhập
8. Hệ thống tạo yêu cầu đổi ca
9. Hệ thống gửi thông báo cho quản lý
10. Hệ thống hiển thị toast "✓ Đã gửi yêu cầu đổi ca"
11. Trạng thái ca đổi thành "Chờ duyệt đổi ca"
12. Use case kết thúc thành công

### Ngoại lệ:
- **E1:** Không nhập lý do
  - Hiển thị lỗi "Vui lòng nhập lý do đổi ca"
- **E2:** Ca đã quá gần (< 24h)
  - Hiển thị "Không thể đổi ca trong vòng 24h"
- **E3:** Đã gửi yêu cầu đổi ca này rồi
  - Hiển thị "Yêu cầu đang chờ duyệt"

### Luồng thay thế:
- **A1:** Nhân viên hủy
  - Đóng form
  - Không gửi yêu cầu

### Hậu điều kiện:
- **Thành công:**
  - Yêu cầu đổi ca được tạo
  - Quản lý nhận được thông báo
  - Nhân viên theo dõi được trạng thái yêu cầu
- **Thất bại:**
  - Không có yêu cầu nào được tạo

---

## UC-STF-009: Xem danh sách tất cả phòng theo trạng thái

**Mã UC:** UC-STF-009  
**Tác nhân chính:** Nhân viên  
**Mô tả:** Nhân viên xem danh sách tất cả phòng với trạng thái realtime

### Điều kiện tiên quyết:
- Nhân viên đã đăng nhập
- Click vào menu "Order phòng hát"

### Luồng chính:
1. Nhân viên click "Order phòng hát" từ dashboard
2. Hệ thống chuyển sang màn hình quản lý phòng
3. Hệ thống hiển thị header với stats overview:
   - Trống: 12 phòng (màu xanh)
   - Đang dùng: 5 phòng (màu đỏ)
   - Dọn dẹp: 1 phòng (màu xanh dương)
   - Bảo trì: 1 phòng (màu vàng)
4. Hệ thống hiển thị filter tabs:
   - Tất cả (19)
   - VIP (6)
   - Family (12)
   - Couple (8)
   - Party (4)
5. Hệ thống hiển thị grid 2 cột với danh sách phòng:
   - **VIP-01 (Tầng 1):**
     - Badge: "Trống" (xanh)
     - Status: "Sẵn sàng" với dot xanh nhấp nháy
   - **VIP-02 (Tầng 1):**
     - Badge: "Đang dùng" (đỏ)
     - Khách: Nguyễn Văn A
     - Giờ: ⏰ 14:00 - 17:00
   - (Tiếp tục với các phòng khác...)
6. Nhân viên xem danh sách phòng
7. Use case kết thúc

### Ngoại lệ:
- **E1:** Lỗi load dữ liệu phòng
  - Hiển thị "Đang tải danh sách phòng..."
  - Retry sau 3s

### Luồng thay thế:
- **A1:** Nhân viên click vào một phòng đang dùng
  - Chuyển sang UC-STF-011 (Xem chi tiết order)
- **A2:** Nhân viên chọn filter tab
  - Hiển thị chỉ phòng của loại đó

### Hậu điều kiện:
- Nhân viên thấy tổng quan tất cả phòng
- Biết phòng nào trống/đang dùng/bảo trì

---

## UC-STF-010: Lọc phòng theo loại

**Mã UC:** UC-STF-010  
**Tác nhân chính:** Nhân viên  
**Mô tả:** Nhân viên lọc danh sách phòng theo loại (VIP/Family/Couple/Party)

### Điều kiện tiên quyết:
- Nhân viên đang ở màn hình quản lý phòng
- Có danh sách phòng hiển thị

### Luồng chính:
1. Nhân viên xem filter tabs ở trên danh sách
2. Nhân viên click vào tab loại phòng (ví dụ: "VIP (6)")
3. Hệ thống filter danh sách:
   - Chỉ hiển thị 6 phòng VIP
   - Ẩn các phòng loại khác
4. Tab được chọn đổi màu highlight
5. Stats overview vẫn giữ nguyên (tổng thể)
6. Use case kết thúc

### Ngoại lệ:
- **E1:** Loại phòng không có phòng nào
  - Hiển thị "Không có phòng [loại] nào"

### Luồng thay thế:
- **A1:** Nhân viên click tab "Tất cả"
  - Hiển thị lại toàn bộ phòng

### Hậu điều kiện:
- Danh sách được filter
- Nhân viên dễ tìm phòng cần quản lý

---

## UC-STF-011: Xem chi tiết order phòng đang sử dụng

**Mã UC:** UC-STF-011  
**Tác nhân chính:** Nhân viên  
**Mô tả:** Nhân viên xem chi tiết order của phòng đang có khách sử dụng

### Điều kiện tiên quyết:
- Nhân viên đang ở màn hình quản lý phòng
- Có phòng đang ở trạng thái "Đang dùng"

### Luồng chính:
1. Nhân viên click vào card phòng có trạng thái "Đang dùng"
2. Hệ thống chuyển sang màn hình chi tiết order
3. Hệ thống hiển thị:
   - **Header:**
     - Tên phòng: VIP-02
     - Trạng thái: Đang phục vụ (badge xanh)
     - Nút quay lại
   - **Thông tin booking:**
     - Booking code: #BK123456
     - Khách hàng: Nguyễn Văn A
     - Số điện thoại: 0901234567
     - Check-in: 14:00
     - Check-out dự kiến: 17:00
     - Thời gian còn lại: 45 phút (countdown)
   - **Danh sách order:**
     - 2x Heineken - 50.000đ
     - 1x Cocktail - 80.000đ
     - 1x Snack - 25.000đ
     - Tổng: 155.000đ
   - **Nút actions:**
     - "Thêm order" (primary)
     - "Thanh toán" (success)
     - "Gia hạn phòng"
4. Nhân viên xem thông tin
5. Use case kết thúc

### Ngoại lệ:
- **E1:** Không load được thông tin order
  - Hiển thị "Lỗi tải dữ liệu"
  - Nút "Thử lại"

### Luồng thay thế:
- **A1:** Nhân viên click "Thêm order"
  - Mở menu dịch vụ
  - Cho phép chọn thêm món
  - Cập nhật danh sách order
- **A2:** Nhân viên click "Thanh toán"
  - Mở màn hình thanh toán
  - Hiển thị tổng tiền (phòng + dịch vụ)
  - Cho phép chọn phương thức thanh toán
- **A3:** Nhân viên click "Gia hạn phòng"
  - Hiển thị dialog chọn thời gian gia hạn
  - Tính phí gia hạn
  - Cập nhật check-out dự kiến

### Hậu điều kiện:
- Nhân viên nắm được tình trạng phòng
- Có thể phục vụ khách hàng tốt hơn
- Có thể thêm order hoặc thanh toán

---

# 3. USE CASES KHÁCH HÀNG (CUSTOMER)

## UC-CUS-001: Xem dashboard khách hàng

**Mã UC:** UC-CUS-001  
**Tác nhân chính:** Khách hàng  
**Mô tả:** Khách hàng xem dashboard với thông tin tài khoản và các tính năng chính

### Điều kiện tiên quyết:
- Khách hàng đã đăng nhập với vai trò "customer"

### Luồng chính:
1. Khách hàng đăng nhập thành công
2. Hệ thống chuyển đến Customer Dashboard
3. Hệ thống hiển thị:
   - **Header gradient:**
     - "Chào mừng, [Tên khách hàng]"
     - Badge VIP Member với điểm: 1,250
     - Avatar
   - **Search bar:** "Tìm phòng / cơ sở..."
   - **Ưu đãi đặc biệt (carousel):**
     - Banner giảm 30% cuối tuần
     - Banner Happy Hour 14h-17h
   - **Quick Actions (grid 2 cột):**
     - 📅 Đặt phòng
     - ✨ Dịch vụ
   - **Phòng nổi bật:**
     - List 4 phòng featured với hình, giá, rating
5. Khách hàng xem dashboard
6. Use case kết thúc

### Ngoại lệ:
- **E1:** Lỗi load dữ liệu khách hàng
  - Hiển thị thông tin cơ bản
  - Retry tải điểm và ưu đãi

### Luồng thay thế:
- **A1:** Khách hàng click search bar
  - Focus vào search
  - Hiển thị gợi ý tìm kiếm
- **A2:** Khách hàng click banner ưu đãi
  - Chuyển sang UC-CUS-014 (Xem chi tiết ưu đãi)
- **A3:** Khách hàng click "Đặt phòng"
  - Chuyển sang UC-CUS-005 (Bắt đầu flow đặt phòng)

### Hậu điều kiện:
- Dashboard hiển thị đầy đủ
- Khách hàng có thể truy cập các tính năng

---

## UC-CUS-002: Xem thông tin tài khoản VIP Member

**Mã UC:** UC-CUS-002  
**Tác nhân chính:** Khách hàng  
**Mô tả:** Khách hàng xem thông tin hạng thành viên và quyền lợi

### Điều kiện tiên quyết:
- Khách hàng đã đăng nhập
- Có tài khoản VIP Member

### Luồng chính:
1. Khách hàng click vào badge "⭐ VIP Member" hoặc vào tab Profile
2. Hệ thống hiển thị thông tin VIP:
   - Hạng hiện tại: VIP Member (Gold badge)
   - Điểm tích lũy: 1,250 điểm
   - Quyền lợi:
     - Giảm 10% tất cả booking
     - Tích điểm x2
     - Ưu tiên đặt phòng
     - Sinh nhật miễn phí trang trí
   - Điều kiện duy trì: Booking tối thiểu 5 lần/tháng
   - Progress bar đến hạng tiếp theo
3. Khách hàng xem thông tin
4. Use case kết thúc

### Ngoại lệ:
- **E1:** Khách hàng không phải VIP
  - Hiển thị thông tin thành viên thường
  - Gợi ý nâng cấp VIP

### Luồng thay thế:
- **A1:** Khách hàng click "Xem quyền lợi chi tiết"
  - Hiển thị bảng so sánh các hạng

### Hậu điều kiện:
- Khách hàng hiểu về quyền lợi VIP

---

## UC-CUS-003: Xem điểm tích lũy

**Mã UC:** UC-CUS-003  
**Tác nhân chính:** Khách hàng  
**Mô tả:** Khách hàng xem số điểm tích lũy và lịch sử tích điểm

### Điều kiện tiên quyết:
- Khách hàng đã đăng nhập
- Vào tab "Ưu đãi"

### Luồng chính:
1. Khách hàng click tab "Ưu đãi" ở bottom nav
2. Hệ thống hiển thị card điểm tích lũy:
   - Điểm hiện có: 1,250 điểm
   - Số voucher: 3 mã
3. Cuộn xuống xem lịch sử tích điểm:
   - **+100 điểm** - Booking #BK123456 - 10/10/2025
   - **+50 điểm** - Check-in đúng giờ - 05/10/2025
   - **-200 điểm** - Đổi voucher HAPPY20 - 01/10/2025
4. Khách hàng xem lịch sử
5. Use case kết thúc

### Ngoại lệ:
- **E1:** Chưa có điểm
  - Hiển thị "0 điểm"
  - Gợi ý "Đặt phòng ngay để tích điểm"

### Luồng thay thế:
- **A1:** Khách hàng click "Đổi điểm"
  - Hiển thị catalog voucher có thể đổi

### Hậu điều kiện:
- Khách hàng biết số điểm hiện có

---

## UC-CUS-004: Tìm kiếm phòng/cơ sở

**Mã UC:** UC-CUS-004  
**Tác nhân chính:** Khách hàng  
**Mô tả:** Khách hàng tìm kiếm phòng hoặc cơ sở theo từ khóa

### Điều kiện tiên quyết:
- Khách hàng đang ở Customer Dashboard

### Luồng chính:
1. Khách hàng click vào search bar
2. Hệ thống hiển thị:
   - Keyboard focus vào search
   - Icon X để clear
   - Lịch sử tìm kiếm gần đây
   - Gợi ý phổ biến: "VIP", "Couple", "Trần Duy Hưng"
3. Khách hàng nhập từ khóa (ví dụ: "VIP")
4. Hệ thống tìm kiếm realtime và hiển thị kết quả:
   - **Phòng:**
     - Phòng VIP 01 - Trần Duy Hưng - 450k/giờ
     - Phòng VIP 02 - Nguyễn Huệ - 450k/giờ
   - **Cơ sở:**
     - (nếu match)
5. Khách hàng xem kết quả
6. Use case kết thúc

### Ngoại lệ:
- **E1:** Không tìm thấy kết quả
  - Hiển thị "Không tìm thấy '[từ khóa]'"
  - Gợi ý "Thử từ khóa khác"

### Luồng thay thế:
- **A1:** Khách hàng click vào một kết quả
  - Chuyển sang trang chi tiết phòng/cơ sở
- **A2:** Khách hàng clear search
  - Quay lại dashboard

### Hậu điều kiện:
- Khách hàng tìm được phòng/cơ sở cần tìm

---

## UC-CUS-005: Bắt đầu flow đặt phòng

**Mã UC:** UC-CUS-005  
**Tác nhân chính:** Khách hàng  
**Mô tả:** Khách hàng bắt đầu quy trình đặt phòng karaoke

### Điều kiện tiên quyết:
- Khách hàng đã đăng nhập
- Click vào "Đặt phòng" hoặc nút "Đặt" ở phòng nào đó

### Luồng chính:
1. Khách hàng click "Đặt phòng" từ dashboard
2. Hệ thống chuyển sang màn hình Booking Flow
3. Hệ thống hiển thị:
   - Header với nút quay lại
   - Tiêu đề: "Đặt phòng karaoke"
   - Info banner: "Chọn loại phòng → Xem danh sách → Chọn khung giờ"
   - Grid 4 loại phòng (vertical cards)
4. Chuyển sang UC-CUS-006
5. Use case kết thúc

### Ngoại lệ:
- **E1:** Khách hàng chưa đăng nhập
  - Hiển thị "Vui lòng đăng nhập để đặt phòng"
  - Chuyển sang màn hình đăng nhập

### Luồng thay thế:
- **A1:** Khách hàng quay lại
  - Confirm "Hủy đặt phòng?"
  - Quay về dashboard

### Hậu điều kiện:
- Màn hình chọn loại phòng được hiển thị

---

## UC-CUS-006: Chọn loại phòng

**Mã UC:** UC-CUS-006  
**Tác nhân chính:** Khách hàng  
**Mô tả:** Khách hàng chọn loại phòng muốn đặt (VIP/Family/Couple/Party)

### Điều kiện tiên quyết:
- Đang ở màn hình Booking Flow (bước 1)

### Luồng chính:
1. Hệ thống hiển thị 4 loại phòng với thông tin:
   - **Phòng VIP:**
     - Hình ảnh
     - Sức chứa: 15-20 người
     - Giá: 450k - 600k/giờ
     - Features: Dàn âm thanh cao cấp, LED RGB, Mini Bar, Sofa sang trọng
     - Tổng số phòng: 6
     - Còn trống: 4 phòng
   - (Tương tự cho Family, Couple, Party)
2. Khách hàng xem và so sánh các loại
3. Khách hàng click vào một loại phòng (ví dụ: Phòng VIP)
4. Card được highlight
5. Nút "Tiếp tục" được enable
6. Khách hàng click "Tiếp tục"
7. Hệ thống lưu lựa chọn và chuyển sang UC-CUS-007
8. Use case kết thúc thành công

### Ngoại lệ:
- **E1:** Loại phòng không còn phòng trống
  - Card hiển thị "Hết phòng" (disabled)
  - Không cho phép chọn

### Luồng thay thế:
- **A1:** Khách hàng click vào hình ảnh
  - Mở gallery xem ảnh chi tiết
- **A2:** Khách hàng click "Xem chi tiết"
  - Mở bottom sheet với thông tin đầy đủ

### Hậu điều kiện:
- Loại phòng được chọn
- Chuyển sang bước 2: Chọn phòng cụ thể

---

## UC-CUS-007: Chọn phòng cụ thể từ danh sách phòng trống

**Mã UC:** UC-CUS-007  
**Tác nhân chính:** Khách hàng  
**Mô tả:** Khách hàng chọn một phòng cụ thể từ danh sách phòng còn trống

### Điều kiện tiên quyết:
- Đã chọn loại phòng ở bước trước
- Đang ở màn hình Room Selection

### Luồng chính:
1. Hệ thống hiển thị danh sách phòng thuộc loại đã chọn:
   - Header: "Chọn phòng VIP" (ví dụ)
   - Breadcrumb: Loại phòng → Chọn phòng → Chọn giờ
2. Hệ thống hiển thị list phòng còn trống:
   - **Phòng VIP 01:**
     - Cơ sở: Trần Duy Hưng
     - Tầng: 1
     - Sức chứa: 15-20 người
     - Giá: 450.000đ/giờ
     - Tiện nghi: 4K TV 85", Dolby Atmos, Ghế massage...
     - Trạng thái: Sẵn sàng (badge xanh)
     - Rating: 4.9⭐
   - **Phòng VIP 03:**
     - (Tương tự)
   - (Chỉ hiển thị phòng available)
3. Khách hàng xem và so sánh các phòng
4. Khách hàng click chọn một phòng
5. Card được highlight
6. Bottom bar hiển thị phòng đã chọn và giá
7. Khách hàng click "Tiếp tục"
8. Hệ thống lưu phòng đã chọn
9. Chuyển sang UC-CUS-008
10. Use case kết thúc thành công

### Ngoại lệ:
- **E1:** Tất cả phòng đều được đặt
  - Hiển thị "Tất cả phòng VIP hiện đang được đặt"
  - Gợi ý chọn loại phòng khác hoặc chọn giờ khác

### Luồng thay thế:
- **A1:** Khách hàng click "Xem chi tiết"
  - Mở bottom sheet với gallery, tiện nghi đầy đủ
- **A2:** Khách hàng filter theo cơ sở
  - Hiển thị dropdown chọn cơ sở
  - Filter list phòng
- **A3:** Khách hàng quay lại
  - Quay về chọn loại phòng

### Hậu điều kiện:
- Phòng cụ thể được chọn
- Chuyển sang bước 3: Chọn khung giờ

---

## UC-CUS-008: Chọn khung giờ đặt phòng

**Mã UC:** UC-CUS-008  
**Tác nhân chính:** Khách hàng  
**Mô tả:** Khách hàng chọn ngày và khung giờ để đặt phòng

### Điều kiện tiên quyết:
- Đã chọn phòng cụ thể
- Đang ở màn hình Time Slot Selection

### Luồng chính:
1. Hệ thống hiển thị:
   - Header: "Chọn thời gian"
   - Breadcrumb: Loại → Phòng → Chọn giờ → Xác nhận
   - Thông tin phòng đã chọn (sticky top)
2. Hệ thống hiển thị date picker:
   - Calendar để chọn ngày
   - Chỉ cho phép chọn từ hôm nay trở đi
   - Highlight ngày có slot trống
3. Khách hàng chọn ngày (ví dụ: 15/11/2025)
4. Hệ thống tải và hiển thị time slots trong ngày:
   - **Buổi sáng (10:00 - 12:00):**
     - Slot 10:00-13:00 (3h) - 1,350,000đ (available)
     - Slot 11:00-14:00 (3h) - 1,350,000đ (available)
   - **Buổi chiều (14:00 - 17:00):**
     - Slot 14:00-17:00 (3h) - 1,350,000đ (booked)
     - Slot 15:00-18:00 (3h) - 1,350,000đ (available)
   - **Buổi tối (18:00 - 24:00):**
     - Slot 18:00-21:00 (3h) - 1,350,000đ (available)
     - Slot 19:00-22:00 (3h) - 1,350,000đ (available)
   - (Slots đã đặt hiển thị disabled)
5. Khách hàng chọn một time slot (ví dụ: 18:00-21:00)
6. Slot được highlight
7. Bottom bar hiển thị tổng tiền
8. Khách hàng click "Tiếp tục"
9. Hệ thống lưu thời gian đã chọn
10. Chuyển sang UC-CUS-009
11. Use case kết thúc thành công

### Ngoại lệ:
- **E1:** Ngày được chọn không có slot trống
  - Hiển thị "Tất cả slot trong ngày này đã được đặt"
  - Gợi ý chọn ngày khác
- **E2:** Slot vừa được đặt (race condition)
  - Hiển thị "Slot này vừa được đặt. Vui lòng chọn slot khác"
  - Refresh danh sách slots

### Luồng thay thế:
- **A1:** Khách hàng muốn chọn giờ tùy chỉnh
  - Click "Chọn giờ khác"
  - Hiển thị time picker
  - Validate giờ hợp lệ (trong giờ mở cửa)
- **A2:** Khách hàng chọn ngày khác
  - Load lại time slots
- **A3:** Khách hàng quay lại
  - Quay về chọn phòng

### Hậu điều kiện:
- Ngày và giờ được chọn
- Chuyển sang bước 4: Xác nhận booking

---

## UC-CUS-009: Xác nhận thông tin đặt phòng

**Mã UC:** UC-CUS-009  
**Tác nhân chính:** Khách hàng  
**Mô tả:** Khách hàng xem lại và xác nhận tất cả thông tin đặt phòng

### Điều kiện tiên quyết:
- Đã hoàn thành 3 bước trước
- Đang ở màn hình Booking Confirmation

### Luồng chính:
1. Hệ thống hiển thị màn hình xác nhận với:
   - Header: "Xác nhận đặt phòng"
   - **Thông tin phòng:**
     - Hình ảnh phòng
     - Tên: Phòng VIP 01
     - Loại: VIP
     - Cơ sở: Trần Duy Hưng, Hà Nội
   - **Thông tin thời gian:**
     - Ngày: 15/11/2025 (Thứ Sáu)
     - Giờ: 18:00 - 21:00
     - Thời lượng: 3 giờ
   - **Thông tin khách hàng:**
     - Họ tên: [Tên khách]
     - SĐT: [SĐT khách]
     - Email: [Email]
     - (Cho phép edit)
   - **Dịch vụ kèm theo (optional):**
     - Checkbox: Đồ uống (chọn từ menu)
     - Checkbox: Snack
     - Checkbox: Trang trí sinh nhật
   - **Tổng chi phí:**
     - Tiền phòng: 1,350,000đ
     - Dịch vụ: 0đ
     - Giảm giá (nếu có voucher): 0đ
     - **TỔNG: 1,350,000đ**
   - **Phương thức thanh toán:**
     - Radio: Thanh toán tại quầy
     - Radio: Thanh toán online (VNPay/Momo)
   - Checkbox: "Tôi đồng ý với điều khoản sử dụng"
   - Nút "Xác nhận đặt phòng" (primary, large)
2. Khách hàng xem lại thông tin
3. Khách hàng có thể chỉnh sửa thông tin cá nhân
4. Khách hàng có thể chọn thêm dịch vụ
5. Khách hàng tick checkbox điều khoản
6. Khách hàng click "Xác nhận đặt phòng"
7. Hệ thống validate:
   - Kiểm tra checkbox điều khoản đã tick
   - Kiểm tra slot vẫn còn available
8. Hệ thống tạo booking:
   - Generate booking code
   - Lưu vào database
   - Trừ điểm/voucher (nếu có)
9. Nếu chọn thanh toán online:
   - Chuyển sang payment gateway
   - Chờ xác nhận thanh toán
10. Chuyển sang UC-CUS-010
11. Use case kết thúc thành công

### Ngoại lệ:
- **E1:** Chưa tick checkbox điều khoản
  - Hiển thị lỗi "Vui lòng đồng ý điều khoản"
- **E2:** Slot đã được đặt (race condition)
  - Hiển thị "Xin lỗi, slot này vừa được đặt"
  - Gợi ý chọn lại slot
- **E3:** Thanh toán online thất bại
  - Quay lại màn hình confirmation
  - Cho phép chọn phương thức khác
- **E4:** Lỗi tạo booking
  - Hiển thị "Không thể đặt phòng. Vui lòng thử lại"

### Luồng thay thế:
- **A1:** Khách hàng click "Sửa thông tin"
  - Cho phép edit inline
- **A2:** Khách hàng thêm dịch vụ
  - Mở menu chọn dịch vụ
  - Cập nhật tổng tiền
- **A3:** Khách hàng áp dụng voucher
  - Click "Áp dụng mã"
  - Nhập mã voucher
  - Validate và tính giảm giá
- **A4:** Khách hàng quay lại
  - Confirm "Hủy đặt phòng?"
  - Quay về chọn time slot

### Hậu điều kiện:
- **Thành công:**
  - Booking được tạo trong hệ thống
  - Booking code được generate
  - Slot được đánh dấu đã đặt
  - Email/SMS xác nhận được gửi
  - Điểm được cộng (nếu là VIP)
  - Chuyển sang màn hình success
- **Thất bại:**
  - Không có booking được tạo
  - Slot vẫn available

---

## UC-CUS-010: Nhận booking code sau khi đặt thành công

**Mã UC:** UC-CUS-010  
**Tác nhân chính:** Khách hàng  
**Mô tả:** Khách hàng nhận booking code và thông tin xác nhận sau khi đặt phòng thành công

### Điều kiện tiên quyết:
- Đã xác nhận đặt phòng thành công
- Booking đã được tạo trong hệ thống

### Luồng chính:
1. Sau khi đặt phòng thành công, hệ thống chuyển sang màn hình Success
2. Hệ thống hiển thị:
   - Animation checkmark thành công
   - Icon 🎉 và confetti effect
   - Tiêu đề: "Đặt phòng thành công!"
   - **Booking Code (lớn, bold):** #BK123456
   - Thông báo: "Vui lòng lưu mã này để check-in"
   - **Thông tin booking:**
     - Phòng: VIP 01
     - Cơ sở: Trần Duy Hưng
     - Ngày giờ: 15/11/2025, 18:00 - 21:00
     - Tổng tiền: 1,350,000đ
   - **Hướng dẫn check-in:**
     - "Đến quầy 15 phút trước giờ đặt"
     - "Xuất trình mã booking hoặc SĐT"
   - Nút actions:
     - "Lưu vào lịch" (secondary)
     - "Chia sẻ" (secondary)
     - "Về trang chủ" (primary)
     - "Xem chi tiết booking"
3. Khách hàng xem thông tin
4. Hệ thống tự động:
   - Gửi SMS với booking code
   - Gửi email xác nhận chi tiết
   - Thêm vào lịch sử booking
5. Use case kết thúc

### Ngoại lệ:
- Không có ngoại lệ (đã đặt thành công)

### Luồng thay thế:
- **A1:** Khách hàng click "Lưu vào lịch"
  - Mở calendar app với event booking
- **A2:** Khách hàng click "Chia sẻ"
  - Mở share sheet với thông tin booking
- **A3:** Khách hàng click "Xem chi tiết booking"
  - Chuyển sang màn hình booking detail trong tab Booking
- **A4:** Khách hàng click "Về trang chủ"
  - Quay về Customer Dashboard

### Hậu điều kiện:
- Khách hàng có booking code
- Email và SMS xác nhận đã được gửi
- Booking xuất hiện trong lịch sử
- Khách hàng có thể check-in với mã này

---

## UC-CUS-011: Xem lịch sử đặt phòng

**Mã UC:** UC-CUS-011  
**Tác nhân chính:** Khách hàng  
**Mô tả:** Khách hàng xem danh sách các lần đặt phòng đã thực hiện

### Điều kiện tiên quyết:
- Khách hàng đã đăng nhập
- Click vào tab "Đặt phòng" từ bottom nav

### Luồng chính:
1. Khách hàng click tab "Đặt phòng"
2. Hệ thống hiển thị màn hình booking history
3. Hiển thị nút "🎤 Bắt đầu đặt phòng" ở trên cùng
4. Hiển thị section "Lịch sử đặt phòng"
5. Hệ thống load và hiển thị danh sách bookings:
   - **Booking #BK123457 (Sắp tới):**
     - Phòng: Family 02
     - Cơ sở: Nguyễn Huệ
     - Ngày: 15/10/2025
     - Giờ: 20:00 - 23:00
     - Số tiền: 840,000đ
     - Badge: "Sắp tới" (màu xanh)
   - **Booking #BK123456 (Đã hoàn thành):**
     - Phòng: VIP 01
     - Cơ sở: Trần Duy Hưng
     - Ngày: 10/10/2025
     - Giờ: 19:00 - 22:00
     - Số tiền: 1,350,000đ
     - Badge: "Đã hoàn thành" (màu xám)
   - (Sắp xếp từ mới đến cũ)
6. Khách hàng xem lịch sử
7. Use case kết thúc

### Ngoại lệ:
- **E1:** Chưa có booking nào
  - Hiển thị empty state "Chưa có lịch sử đặt phòng"
  - Nút "Đặt phòng ngay"

### Luồng thay thế:
- **A1:** Khách hàng click vào một booking
  - Chuyển sang UC-CUS-012 (Xem chi tiết booking)
- **A2:** Khách hàng filter theo trạng thái
  - Tabs: Tất cả / Sắp tới / Đã hoàn thành / Đã hủy
- **A3:** Khách hàng click "Đặt phòng mới"
  - Chuyển sang booking flow

### Hậu điều kiện:
- Khách hàng xem được lịch sử đặt phòng

---

## UC-CUS-012: Xem chi tiết booking

**Mã UC:** UC-CUS-012  
**Tác nhân chính:** Khách hàng  
**Mô tả:** Khách hàng xem thông tin chi tiết của một booking

### Điều kiện tiên quyết:
- Có booking trong hệ thống
- Click vào một booking từ lịch sử

### Luồng chính:
1. Khách hàng click vào card booking
2. Hệ thống chuyển sang màn hình chi tiết
3. Hệ thống hiển thị:
   - Header với nút quay lại
   - **Booking Code lớn:** #BK123456
   - Trạng thái: Badge "Sắp tới" / "Đã hoàn thành"
   - **QR Code** (để check-in nhanh)
   - **Thông tin phòng:**
     - Hình ảnh phòng
     - Tên: Phòng VIP 01
     - Cơ sở: Trần Duy Hưng, Hà Nội (với bản đồ)
   - **Thông tin thời gian:**
     - Ngày: 15/11/2025 (Thứ Sáu)
     - Check-in: 18:00
     - Check-out: 21:00
     - Countdown (nếu sắp tới): "Còn 2 ngày 5 giờ"
   - **Dịch vụ đã đặt:**
     - List các dịch vụ kèm theo
   - **Chi phí:**
     - Tiền phòng: 1,350,000đ
     - Dịch vụ: 0đ
     - Giảm giá: 0đ
     - **Tổng: 1,350,000đ**
     - Trạng thái thanh toán: "Đã thanh toán" / "Thanh toán tại quầy"
   - **Actions (nếu sắp tới):**
     - Nút "Thêm dịch vụ"
     - Nút "Hủy booking"
     - Nút "Chỉ đường"
     - Nút "Gọi cơ sở"
   - **Actions (nếu đã hoàn thành):**
     - Nút "Đặt lại phòng này"
     - Nút "Đánh giá"
4. Khách hàng xem chi tiết
5. Use case kết thúc

### Ngoại lệ:
- **E1:** Không tìm thấy booking
  - Hiển thị "Booking không tồn tại"
  - Quay về lịch sử

### Luồng thay thế:
- **A1:** Khách hàng click "Hủy booking"
  - Hiển thị dialog xác nhận
  - Cảnh báo về chính sách hủy
  - Nếu xác nhận: Cập nhật trạng thái "Đã hủy"
- **A2:** Khách hàng click "Thêm dịch vụ"
  - Mở menu chọn dịch vụ
  - Cập nhật booking
- **A3:** Khách hàng click "Đánh giá"
  - Mở form đánh giá với rating và comment
- **A4:** Khách hàng click QR code
  - Zoom to fullscreen để dễ scan

### Hậu điều kiện:
- Khách hàng có đầy đủ thông tin booking
- Có thể thực hiện các actions phù hợp

---

## UC-CUS-013: Xem và đặt dịch vụ kèm theo

**Mã UC:** UC-CUS-013  
**Tác nhân chính:** Khách hàng  
**Mô tả:** Khách hàng xem và đặt các dịch vụ kèm theo cho booking

### Điều kiện tiên quyết:
- Đang trong quá trình đặt phòng (bước xác nhận)
- Hoặc đã có booking sắp tới

### Luồng chính:
1. Khách hàng click "Thêm dịch vụ" (trong confirmation hoặc booking detail)
2. Hệ thống hiển thị menu dịch vụ với categories:
   - **🍹 Đồ uống:**
     - Nước ngọt các loại - 15.000đ
     - Bia Heineken - 25.000đ
     - Cocktail - 80.000đ
     - (Với số lượng selector)
   - **🍿 Snack & Trái cây:**
     - Snack khoai tây - 25.000đ
     - Dĩa trái cây - 80.000đ
   - **🎂 Gói sinh nhật:**
     - Gói cơ bản - 500.000đ (bánh + trang trí)
     - Gói VIP - 800.000đ (bánh lớn + trang trí + bóng bay)
   - **🎉 Trang trí sự kiện:**
     - Setup theo theme - Từ 800.000đ
3. Khách hàng chọn dịch vụ và số lượng
4. Hệ thống tính tổng tiền realtime
5. Bottom bar hiển thị:
   - Số items đã chọn
   - Tổng tiền dịch vụ
   - Nút "Xác nhận"
6. Khách hàng click "Xác nhận"
7. Hệ thống thêm dịch vụ vào booking
8. Cập nhật tổng chi phí
9. Hiển thị toast "✓ Đã thêm dịch vụ"
10. Use case kết thúc thành công

### Ngoại lệ:
- **E1:** Dịch vụ không có sẵn
  - Hiển thị "Tạm hết" và disable

### Luồng thay thế:
- **A1:** Khách hàng xóa dịch vụ đã chọn
  - Click icon X
  - Cập nhật lại tổng tiền
- **A2:** Khách hàng hủy
  - Đóng menu
  - Không lưu thay đổi

### Hậu điều kiện:
- Dịch vụ được thêm vào booking
- Tổng tiền được cập nhật

---

## UC-CUS-014: Xem danh sách ưu đãi đặc biệt

**Mã UC:** UC-CUS-014  
**Tác nhân chính:** Khách hàng  
**Mô tả:** Khách hàng xem các chương trình ưu đãi và khuyến mãi đang có

### Điều kiện tiên quyết:
- Khách hàng đã đăng nhập
- Vào tab "Ưu đãi"

### Luồng chính:
1. Khách hàng click tab "Ưu đãi" từ bottom nav
2. Hệ thống hiển thị:
   - Header với điểm tích lũy và số voucher
   - Section "🎉 Ưu đãi đang diễn ra"
3. Hệ thống load danh sách promotions:
   - **Banner "Giảm 30% cuối tuần":**
     - Hình ảnh đẹp
     - Mô tả: Áp dụng cho tất cả phòng VIP
     - Điều kiện: Booking vào T7, CN
     - HSD: 31/10/2025
   - **"Happy Hour 14h-17h":**
     - Giảm 20% giờ vàng
     - HSD: 30/11/2025
   - (Carousel hoặc vertical list)
4. Khách hàng xem các ưu đãi
5. Use case kết thúc

### Ngoại lệ:
- **E1:** Không có ưu đãi nào
  - Hiển thị "Chưa có ưu đãi mới"

### Luồng thay thế:
- **A1:** Khách hàng click vào một ưu đãi
  - Hiển thị chi tiết đầy đủ
  - Điều kiện áp dụng
  - Nút "Đặt phòng ngay"
- **A2:** Khách hàng click "Sao chép mã"
  - Copy voucher code
  - Toast "Đã sao chép"

### Hậu điều kiện:
- Khách hàng biết các ưu đãi đang có

---

## UC-CUS-015: Xem và sử dụng voucher khả dụng

**Mã UC:** UC-CUS-015  
**Tác nhân chính:** Khách hàng  
**Mô tả:** Khách hàng xem danh sách voucher và sử dụng khi đặt phòng

### Điều kiện tiên quyết:
- Khách hàng có ít nhất 1 voucher

### Luồng chính:
1. Khách hàng vào tab "Ưu đãi"
2. Cuộn xuống section "💳 Voucher của bạn"
3. Hệ thống hiển thị danh sách vouchers:
   - **WEEKEND30 (Khả dụng):**
     - Giảm 30%
     - HSD: 31/10/2025
     - Badge: "Khả dụng" (màu xanh)
     - Nút "Sử dụng"
   - **VIP50K (Đã dùng):**
     - Giảm 50.000đ
     - Đã sử dụng: 01/10/2025
     - Badge: "Đã dùng" (màu xám, disabled)
4. Khách hàng xem vouchers
5. Use case kết thúc

### Ngoại lệ:
- **E1:** Không có voucher
  - Hiển thị "Chưa có voucher"
  - Gợi ý "Tích điểm để đổi voucher"

### Luồng thay thế:
- **A1:** Khách hàng click "Sử dụng"
  - Copy voucher code
  - Chuyển sang booking flow
  - Pre-fill voucher code
- **A2:** Khách hàng click voucher
  - Hiển thị chi tiết voucher
  - Điều kiện áp dụng
  - Nút "Đặt phòng ngay"

### Hậu điều kiện:
- Khách hàng biết voucher khả dụng

---

## UC-CUS-016: Xem thống kê cá nhân

**Mã UC:** UC-CUS-016  
**Tác nhân chính:** Khách hàng  
**Mô tả:** Khách hàng xem thống kê về số lượt đặt, điểm, voucher

### Điều kiện tiên quyết:
- Khách hàng vào tab "Tài khoản"

### Luồng chính:
1. Khách hàng click tab "Tài khoản"
2. Hệ thống hiển thị stats grid (3 cards):
   - **12 Lượt đặt** (màu vàng)
   - **1,250 Điểm** (màu tím)
   - **3 Voucher** (màu xanh)
3. Khách hàng xem tổng quan
4. Use case kết thúc

### Ngoại lệ:
- Không có

### Luồng thay thế:
- **A1:** Khách hàng click vào một stat card
  - Chuyển sang chi tiết tương ứng

### Hậu điều kiện:
- Khách hàng biết tổng quan hoạt động

---

## UC-CUS-017: Quản lý thông tin cá nhân

**Mã UC:** UC-CUS-017  
**Tác nhân chính:** Khách hàng  
**Mô tả:** Khách hàng xem và cập nhật thông tin cá nhân

### Điều kiện tiên quyết:
- Vào tab "Tài khoản"

### Luồng chính:
1. Khách hàng click menu item "Thông tin cá nhân"
2. Hệ thống hiển thị form với thông tin hiện tại:
   - Avatar (có thể upload)
   - Họ tên
   - Email
   - Số điện thoại
   - Ngày sinh
   - Giới tính
3. Khách hàng click "Chỉnh sửa"
4. Các field trở thành editable
5. Khách hàng cập nhật thông tin
6. Khách hàng click "Lưu"
7. Hệ thống validate dữ liệu
8. Hệ thống cập nhật trong database
9. Toast "✓ Đã cập nhật thông tin"
10. Use case kết thúc thành công

### Ngoại lệ:
- **E1:** Email/SĐT không hợp lệ
  - Hiển thị lỗi validation
- **E2:** Email/SĐT đã tồn tại
  - Hiển thị "Email/SĐT đã được sử dụng"

### Luồng thay thế:
- **A1:** Khách hàng hủy
  - Discard changes
  - Quay về view mode

### Hậu điều kiện:
- Thông tin được cập nhật

---

## UC-CUS-018: Quản lý phương thức thanh toán

**Mã UC:** UC-CUS-018  
**Tác nhân chính:** Khách hàng  
**Mô tả:** Khách hàng thêm/xóa phương thức thanh toán

### Điều kiện tiên quyết:
- Vào tab "Tài khoản"

### Luồng chính:
1. Khách hàng click "Phương thức thanh toán"
2. Hệ thống hiển thị danh sách:
   - Card đã lưu (nếu có)
   - Ví điện tử đã liên kết
   - Nút "Thêm phương thức"
3. Khách hàng click "Thêm"
4. Chọn loại: Thẻ / Ví điện tử
5. Nhập thông tin
6. Xác minh (OTP nếu cần)
7. Lưu thành công
8. Use case kết thúc

### Ngoại lệ:
- **E1:** Thông tin thẻ không hợp lệ
  - Hiển thị lỗi

### Luồng thay thế:
- **A1:** Xóa phương thức
  - Confirm
  - Xóa khỏi danh sách

### Hậu điều kiện:
- Phương thức thanh toán được thêm/xóa

---

## UC-CUS-019: Cài đặt tài khoản

**Mã UC:** UC-CUS-019  
**Tác nhân chính:** Khách hàng  
**Mô tả:** Khách hàng thay đổi các cài đặt tài khoản

### Điều kiện tiên quyết:
- Vào tab "Tài khoản" → "Cài đặt"

### Luồng chính:
1. Khách hàng click "Cài đặt"
2. Hệ thống hiển thị các options:
   - Ngôn ngữ: Tiếng Việt / English
   - Thông báo: On / Off
   - Âm thanh: On / Off
   - Theme: Dark / Light
   - Đổi mật khẩu
3. Khách hàng thay đổi settings
4. Tự động lưu hoặc click "Lưu"
5. Use case kết thúc

### Ngoại lệ:
- Không có

### Luồng thay thế:
- **A1:** Đổi mật khẩu
  - Nhập mật khẩu cũ
  - Nhập mật khẩu mới
  - Xác nhận

### Hậu điều kiện:
- Settings được cập nhật

---

## UC-CUS-020: Đăng xuất

**Mã UC:** UC-CUS-020  
**Tác nhân chính:** Khách hàng  
**Mô tả:** Khách hàng đăng xuất khỏi tài khoản

### Điều kiện tiên quyết:
- Đã đăng nhập

### Luồng chính:
1. Khách hàng click nút "Đăng xuất"
2. Hệ thống hiển thị dialog xác nhận:
   - Icon cảnh báo
   - "Bạn có chắc muốn đăng xuất?"
   - Nút "Hủy" và "Đăng xuất"
3. Khách hàng click "Đăng xuất"
4. Hệ thống:
   - Clear session
   - Clear local storage
   - Chuyển về trang chủ (public)
5. Use case kết thúc

### Ngoại lệ:
- Không có

### Luồng thay thế:
- **A1:** Khách hàng click "Hủy"
  - Đóng dialog
  - Không đăng xuất

### Hậu điều kiện:
- Người dùng đã đăng xuất
- Session bị xóa
- Quay về trang công khai

---

# 4. USE CASES QUẢN LÝ (MANAGER)

## UC-MGR-001: Xem dashboard tổng quan thời gian thực

**Mã UC:** UC-MGR-001  
**Tác nhân chính:** Quản lý  
**Mô tả:** Quản lý xem dashboard với các chỉ số kinh doanh realtime

### Điều kiện tiên quyết:
- Quản lý đã đăng nhập với vai trò "manager"

### Luồng chính:
1. Quản lý đăng nhập thành công
2. Hệ thống chuyển đến Manager Dashboard
3. Hệ thống hiển thị:
   - **Header:**
     - "Xin chào, [Tên quản lý]"
     - "Quản lý hệ thống"
     - Icon hoạt động
   - **Quick Stats (grid 4 cột):**
     - Trống: 12 phòng
     - Đang dùng: 18 phòng
     - Dọn dẹp: 4 phòng
     - Order chờ: 8 đơn
   - **Revenue Stats (3 cards):**
     - Doanh thu hôm nay: 45,750,000đ
     - Doanh thu tuần: 285,000,000đ
     - Doanh thu tháng: 1,125,000,000đ
   - **Staff On Duty:**
     - 15 nhân viên đang làm việc
   - **Top 5 dịch vụ bán chạy:**
     - Bia Heineken: 156 ly, +12%
     - Cocktail: 89 ly, +8%
     - (Chart hoặc list)
   - **Pending Orders:**
     - ORD-001: VIP-02, 5 phút trước, 3 items
     - ORD-002: FAM-01, 8 phút trước, 5 items
   - **Staff List:**
     - Nguyễn Văn A - Phục vụ - Ca sáng - Active
     - Trần Thị B - Phục vụ - Ca sáng - Active
4. Quản lý xem dashboard
5. Use case kết thúc

### Ngoại lệ:
- **E1:** Lỗi load dữ liệu stats
  - Hiển thị loading skeleton
  - Retry sau 5s

### Luồng thay thế:
- **A1:** Quản lý click vào một stat
  - Chuyển sang chi tiết tương ứng
- **A2:** Refresh dashboard
  - Pull to refresh
  - Reload tất cả data

### Hậu điều kiện:
- Dashboard hiển thị đầy đủ
- Dữ liệu được cập nhật realtime (có thể dùng WebSocket)

---

## UC-MGR-002 đến UC-MGR-006: Xem các thống kê chi tiết

_(Tương tự UC-MGR-001 nhưng chi tiết cho từng metric cụ thể)_

---

## UC-MGR-007: Quản lý danh sách phòng

**Mã UC:** UC-MGR-007  
**Tác nhân chính:** Quản lý  
**Mô tả:** Quản lý xem, thêm, sửa, xóa thông tin phòng karaoke

### Điều kiện tiên quyết:
- Quản lý đã đăng nhập
- Click vào "Quản lý phòng" từ dashboard

### Luồng chính:
1. Quản lý click "Quản lý phòng"
2. Hệ thống hiển thị:
   - Header với nút quay lại
   - Nút "Thêm phòng mới" (floating action button)
   - Filter: Tất cả / VIP / Family / Couple / Party
   - Filter: Available / Occupied / Maintenance
   - Danh sách phòng dạng table/cards:
     - VIP-01 | Tầng 1 | 15-20 người | 450k/h | Available
     - VIP-02 | Tầng 1 | 15-20 người | 450k/h | Occupied
     - (Với actions: Edit, Delete, Change Status)
3. Quản lý xem danh sách
4. Use case kết thúc

### Ngoại lệ:
- Không có

### Luồng thay thế:
- **A1:** Quản lý click "Thêm phòng"
  - Mở form thêm phòng
  - Nhập: Tên, Loại, Tầng, Sức chứa, Giá, Tiện nghi
  - Submit → Tạo phòng mới
- **A2:** Quản lý click "Edit"
  - Mở form sửa với data có sẵn
  - Cập nhật thông tin
  - Submit → Lưu thay đổi
- **A3:** Quản lý click "Delete"
  - Confirm "Xóa phòng này?"
  - Xóa khỏi database
- **A4:** Quản lý click "Change Status"
  - Dropdown: Available / Maintenance / Cleaning
  - Cập nhật trạng thái

### Hậu điều kiện:
- Danh sách phòng được quản lý
- Thay đổi được lưu vào database

---

## UC-MGR-008 đến UC-MGR-024

_(Các use cases còn lại cho Manager được đặc tả tương tự với các luồng cho Quản lý phòng, Order, Nhân sự, Dịch vụ, Báo cáo doanh thu (5 tabs), Quản lý khuyến mãi (4 tabs) theo cấu trúc tương tự)_

---

# 5. USE CASES ADMIN

## UC-ADM-001: Xem dashboard toàn hệ thống

**Mã UC:** UC-ADM-001  
**Tác nhân chính:** Admin  
**Mô tả:** Admin xem dashboard tổng quan toàn bộ hệ thống 3 cơ sở

### Điều kiện tiên quyết:
- Admin đã đăng nhập với vai trò "admin"

### Luồng chính:
1. Admin đăng nhập thành công
2. Hệ thống chuyển đến Admin Dashboard
3. Hệ thống hiển thị:
   - **Header gradient đặc biệt:**
     - "System Administrator"
     - Tên admin
     - Icon cài đặt
   - **System Stats (grid 2x2):**
     - Tổng cơ sở: 3
     - Tổng người dùng: 145
     - Doanh thu tháng: 2.45 tỷ
     - Booking active: 68
   - **Main Menu:**
     - Quản lý người dùng
     - Quản lý cơ sở
     - Quản lý nhân viên toàn hệ thống
     - Quản lý dịch vụ
     - Cấu hình hệ thống
     - Giám sát
     - Quản lý thông báo
     - Bảo trì hệ thống
4. Admin xem dashboard
5. Use case kết thúc

### Ngoại lệ:
- **E1:** Lỗi load system stats
  - Hiển thị thông báo lỗi
  - Vẫn cho phép truy cập menu

### Luồng thay thế:
- **A1:** Admin click vào menu item
  - Chuyển sang màn hình quản lý tương ứng

### Hậu điều kiện:
- Dashboard admin hiển thị
- Admin có quyền truy cập toàn bộ chức năng

---

## UC-ADM-002 đến UC-ADM-023

_(Các use cases admin được đặc tả tương tự với luồng quản lý người dùng, cơ sở, nhân viên toàn hệ thống, dịch vụ chung, cấu hình hệ thống, giám sát, và quản lý thông báo 4 tabs)_

---

## NOTES QUAN TRỌNG

### Quy ước chung cho tất cả use cases:

1. **Authentication & Authorization:**
   - Tất cả use cases (trừ Public) yêu cầu đăng nhập
   - Mỗi vai trò chỉ truy cập được use cases của mình
   - Session timeout: 30 phút không hoạt động

2. **Error Handling:**
   - Tất cả lỗi network: Retry 3 lần, sau đó hiển thị thông báo
   - Lỗi validation: Hiển thị ngay tại field
   - Lỗi server: Hiển thị toast với nút "Thử lại"

3. **Data Persistence:**
   - Tất cả thao tác CUD (Create/Update/Delete) được lưu ngay vào database
   - Có loading indicator trong khi xử lý
   - Có confirmation toast sau khi thành công

4. **UI/UX:**
   - Responsive mobile-first
   - Loading states cho mọi data fetch
   - Empty states khi không có dữ liệu
   - Error states với action recovery

5. **Real-time Updates:**
   - Dashboard stats có thể dùng polling (5s) hoặc WebSocket
   - Trạng thái phòng cần cập nhật realtime

---

## CONCLUSION

Tài liệu này đặc tả đầy đủ 87 use cases của hệ thống Karaoke Thủ Đô. Mỗi use case được mô tả chi tiết với:
- Mã định danh rõ ràng
- Tác nhân và điều kiện
- Luồng chính step-by-step
- Xử lý ngoại lệ
- Các luồng thay thế
- Hậu điều kiện cụ thể

Tài liệu này có thể được sử dụng để:
- Development implementation
- Testing (functional & UAT)
- Documentation & Training
- Project estimation

**Version:** 1.0  
**Last Updated:** 03/11/2025
