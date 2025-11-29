# 📊 Hướng dẫn đồng bộ dữ liệu - Data Sync Guide

## ✅ Đã hoàn thành

Đã tạo file `/data/mockData.ts` chứa tất cả dữ liệu tập trung cho toàn bộ ứng dụng.

## 📦 Dữ liệu có sẵn

### 1. **BRANCHES** - Chi nhánh
- 3 cơ sở tại Hà Nội
- Thông tin: ID, tên, địa chỉ, phone, giờ hoạt động, số phòng, rating

### 2. **ROOMS** - Phòng hát  
- 10 phòng (VIP, Family, Couple, Standard)
- Phân bố theo 3 chi nhánh
- Thông tin: ID, tên, category, capacity, giá, mô tả, features, status, branch

### 3. **STAFF** - Nhân viên
- 7 nhân viên
- Phân bố theo 3 chi nhánh
- Thông tin: ID, tên, role, contact, salary, attendance, performance, branch

### 4. **MENU_ITEMS** - Đồ ăn & đồ uống
- 10 items (5 drinks + 5 foods)
- Thông tin: ID, tên, category, giá, đơn vị, mô tả, hình, stock, status

### 5. **COMBOS** - Combo dịch vụ
- 4 combos (Tiệc nhỏ, Sinh nhật, Couple, Party)
- Thông tin: ID, tên, mô tả, giá, discount, items included

### 6. **PROMOTIONS** - Khuyến mãi
- 3 promotions (VIP20, HAPPY14, HALLOWEEN30)
- Thông tin: ID, code, tên, discount, thời gian, target, status, usage stats

### 7. **BOOKINGS** - Đặt phòng
- 2 sample bookings
- Thông tin: ID, customer, room, branch, date/time, guests, amount, status

### 8. **ORDERS** - Đơn hàng
- 2 sample orders
- Thông tin: ID, room, items, total, status, created time

## 🔧 Helper Functions

```typescript
// Lấy phòng theo chi nhánh
getRoomsByBranch(branchId: string)

// Lấy nhân viên theo chi nhánh  
getStaffByBranch(branchId: string)

// Lấy phòng theo ID
getRoomById(roomId: string)

// Lấy nhân viên theo ID
getStaffById(staffId: string)

// Lấy chi nhánh theo ID
getBranchById(branchId: string)

// Lấy menu item theo ID
getMenuItemById(itemId: string)

// Lấy combo theo ID
getComboById(comboId: string)

// Lấy promotion theo code
getPromotionByCode(code: string)
```

## 📝 Cách sử dụng

### Import vào component:

```typescript
import { 
  BRANCHES, 
  ROOMS, 
  STAFF, 
  MENU_ITEMS, 
  COMBOS,
  PROMOTIONS,
  getRoomsByBranch,
  getStaffByBranch
} from '../data/mockData';
```

### Ví dụ sử dụng trong component:

```typescript
// Thay vì define local data:
// const rooms = [{ id: 1, name: 'VIP 01', ... }];

// Dùng centralized data:
import { ROOMS } from '../data/mockData';

function RoomList() {
  const [rooms, setRooms] = useState(ROOMS);
  
  return (
    <div>
      {rooms.map(room => (
        <RoomCard key={room.id} room={room} />
      ))}
    </div>
  );
}
```

### Filter data theo branch:

```typescript
import { getRoomsByBranch } from '../data/mockData';

function BranchRooms({ branchId }: { branchId: string }) {
  const rooms = getRoomsByBranch(branchId);
  
  return (
    <div>
      {rooms.map(room => (
        <RoomCard key={room.id} room={room} />
      ))}
    </div>
  );
}
```

## 🎯 Components cần cập nhật

### Priority 1 (Core):
- [ ] `/components/Home.tsx` - Update branches & rooms
- [ ] `/components/DetailScreens.tsx` - BranchDetail, RoomDetail
- [ ] `/components/RoomSelection.tsx` - Use ROOMS data
- [ ] `/components/CustomerDashboard.tsx` - Use ROOMS for featured rooms

### Priority 2 (Manager):
- [ ] `/components/manager/RoomManagement.tsx` - Use ROOMS
- [ ] `/components/manager/StaffManagement.tsx` - Use STAFF
- [ ] `/components/manager/ServiceManagement.tsx` - Use MENU_ITEMS & COMBOS
- [ ] `/components/manager/OrderManagement.tsx` - Use ORDERS
- [ ] `/components/manager/PromotionManagement.tsx` - Use PROMOTIONS

### Priority 3 (Admin):
- [ ] `/components/admin/BranchManagement.tsx` - Use BRANCHES
- [ ] `/components/admin/AdminStaffManagement.tsx` - Use STAFF (all branches)
- [ ] `/components/admin/AdminServiceManagement.tsx` - Use MENU_ITEMS & COMBOS

### Priority 4 (Staff):
- [ ] `/components/StaffDashboard.tsx` - Use ROOMS for room status
- [ ] `/components/RoomOrderDetail.tsx` - Use MENU_ITEMS for ordering

## 🔄 Migration Strategy

### Step 1: Import centralized data
```typescript
import { ROOMS } from '../data/mockData';
```

### Step 2: Replace local useState with centralized data
```typescript
// Before:
const [rooms, setRooms] = useState([
  { id: 1, name: 'VIP 01', ... }
]);

// After:
const [rooms, setRooms] = useState(ROOMS);
```

### Step 3: Update handlers to work with centralized structure
```typescript
// Ensure IDs match (e.g., 'VIP01' not 1)
// Ensure field names match (e.g., 'category' not 'type')
```

## ⚠️ Important Notes

1. **IDs are strings**: `'VIP01'` not `1`
2. **Consistent field names**: Follow the structure in mockData.ts
3. **Branch relationships**: Each room/staff has `branchId` and `branch` name
4. **Status fields**: Use consistent values ('available', 'occupied', 'maintenance')
5. **Categories**: Follow exact naming from constants (ROOM_CATEGORIES, STAFF_ROLES, etc.)

## 🎨 Data Structure Details

### Room Object:
```typescript
{
  id: string;           // 'VIP01'
  name: string;         // 'Phòng VIP 01'
  category: string;     // 'VIP' | 'Gia đình' | 'Couple' | 'Thường'
  capacity: number;     // 15
  pricePerHour: number; // 300000
  description: string;
  image: string;
  features: string[];
  status: string;       // 'available' | 'occupied' | 'maintenance'
  branchId: string;     // 'BR001'
  branch: string;       // 'Trần Duy Hưng'
}
```

### Staff Object:
```typescript
{
  id: string;           // 'NV001'
  name: string;
  role: string;         // 'Phục vụ' | 'Pha chế' | 'Thu ngân' | ...
  phone: string;
  email: string;
  status: string;       // 'active'
  baseSalary: number;
  bonus: number;
  totalSalary: number;
  workHours: number;
  joinDate: string;
  attendance: { present: number; absent: number; late: number };
  leaves: number;
  violations: number;
  performance: number;  // 0-100
  branchId: string;
  branch: string;
}
```

### Menu Item Object:
```typescript
{
  id: string;          // 'DRINK001'
  name: string;
  category: string;    // 'Đồ uống' | 'Đồ ăn'
  price: number;
  unit: string;        // 'Lon', 'Ly', 'Gói', ...
  description: string;
  image: string;
  stock: number;
  status: string;      // 'available'
}
```

## 🚀 Benefits

1. **Single source of truth** - Tất cả data ở 1 nơi
2. **Consistency** - Đảm bảo data đồng nhất across components
3. **Easy updates** - Chỉ cần update 1 file
4. **Type safety** - Dễ maintain structure
5. **Reusability** - Helper functions có thể dùng lại
6. **Testing** - Dễ mock data cho testing

## 📋 Next Steps

1. ✅ Đã tạo `/data/mockData.ts`
2. ⏳ Update components theo thứ tự priority
3. ⏳ Test thoroughly sau mỗi component update
4. ⏳ Remove old local data definitions
5. ⏳ Add TypeScript types/interfaces nếu cần

## 💡 Tips

- Giữ nguyên structure hiện tại của mockData.ts
- Thêm data mới vào cuối mỗi array
- Đảm bảo IDs unique
- Maintain relationships (branchId linking)
- Update helper functions khi thêm data mới
