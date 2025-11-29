import { useState } from 'react';
import { 
  Home, LayoutDashboard, DoorOpen, ShoppingCart, Package, 
  Users, TrendingUp, Gift, Bell, LogOut, ChevronRight,
  Activity, Clock, DollarSign, AlertCircle
} from 'lucide-react';
import { Button } from './ui/button';
import { Card } from './ui/card';
import { Badge } from './ui/badge';
import { Progress } from './ui/progress';
import { ScrollArea } from './ui/scroll-area';

interface ManagerDashboardProps {
  userName: string;
  onNavigate: (screen: string, data?: any) => void;
}

export function ManagerDashboard({ userName, onNavigate }: ManagerDashboardProps) {
  const [activeTab, setActiveTab] = useState('dashboard');

  // Mock data - Real-time statistics
  const stats = {
    roomsAvailable: 12,
    roomsOccupied: 18,
    roomsCleaning: 4,
    roomsMaintenance: 2,
    todayRevenue: 45750000,
    weekRevenue: 285000000,
    monthRevenue: 1125000000,
    staffOnDuty: 15,
    pendingOrders: 8,
  };

  const topServices = [
    { name: 'Bia Heineken', quantity: 156, revenue: 3900000, trend: '+12%' },
    { name: 'Cocktail', quantity: 89, revenue: 7120000, trend: '+8%' },
    { name: 'Snack khoai tây', quantity: 134, revenue: 3350000, trend: '+15%' },
    { name: 'Dĩa trái cây', quantity: 67, revenue: 5360000, trend: '+5%' },
    { name: 'Nước ngọt', quantity: 245, revenue: 3675000, trend: '+20%' },
  ];

  const pendingOrdersList = [
    { id: 'ORD-001', room: 'VIP-02', time: '5 phút trước', items: 3, status: 'pending' },
    { id: 'ORD-002', room: 'FAM-01', time: '8 phút trước', items: 5, status: 'pending' },
    { id: 'ORD-003', room: 'PAR-01', time: '12 phút trước', items: 4, status: 'preparing' },
    { id: 'ORD-004', room: 'COU-01', time: '15 phút trước', items: 2, status: 'preparing' },
  ];

  const staffOnDutyList = [
    { name: 'Nguyễn Văn A', role: 'Phục vụ', shift: 'Ca sáng', status: 'active' },
    { name: 'Trần Thị B', role: 'Phục vụ', shift: 'Ca sáng', status: 'active' },
    { name: 'Lê Văn C', role: 'Pha chế', shift: 'Ca sáng', status: 'active' },
    { name: 'Phạm Thị D', role: 'Thu ngân', shift: 'Ca sáng', status: 'break' },
    { name: 'Hoàng Văn E', role: 'Bảo vệ', shift: 'Ca sáng', status: 'active' },
  ];

  const renderDashboard = () => (
    <div className="pb-20">
      {/* Header */}
      <div className="bg-gradient-to-br from-[#9333ea] to-[#6b21a8] p-4 rounded-b-[20px]">
        <div className="flex items-center justify-between mb-4">
          <div>
            <p className="text-gray-300 text-xs">Xin chào,</p>
            <h1 className="text-lg text-white" style={{ fontWeight: 700 }}>{userName}</h1>
            <p className="text-xs text-gray-300 mt-0.5">Quản lý hệ thống</p>
          </div>
          <div className="w-12 h-12 rounded-full bg-[#ffd700] flex items-center justify-center flex-shrink-0">
            <Activity className="w-6 h-6 text-black" />
          </div>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-4 gap-2">
          <Card className="bg-white/10 border-white/20 p-2 backdrop-blur-sm text-center">
            <p className="text-lg text-white mb-0.5" style={{ fontWeight: 700 }}>
              {stats.roomsAvailable}
            </p>
            <p className="text-xs text-gray-300">Trống</p>
          </Card>
          <Card className="bg-white/10 border-white/20 p-2 backdrop-blur-sm text-center">
            <p className="text-lg text-white mb-0.5" style={{ fontWeight: 700 }}>
              {stats.roomsOccupied}
            </p>
            <p className="text-xs text-gray-300">Đang dùng</p>
          </Card>
          <Card className="bg-white/10 border-white/20 p-2 backdrop-blur-sm text-center">
            <p className="text-lg text-white mb-0.5" style={{ fontWeight: 700 }}>
              {stats.roomsCleaning}
            </p>
            <p className="text-xs text-gray-300">Dọn dẹp</p>
          </Card>
          <Card className="bg-white/10 border-white/20 p-2 backdrop-blur-sm text-center">
            <p className="text-lg text-white mb-0.5" style={{ fontWeight: 700 }}>
              {stats.pendingOrders}
            </p>
            <p className="text-xs text-gray-300">Order chờ</p>
          </Card>
        </div>
      </div>

      <div className="px-4 py-4 space-y-4">
        {/* Revenue Cards */}
        <div>
          <h3 className="text-white text-sm mb-3" style={{ fontWeight: 600 }}>
            💰 Doanh thu
          </h3>
          <div className="grid grid-cols-3 gap-2">
            <Card className="bg-card border-[#ffd700]/30 p-3">
              <p className="text-xs text-gray-400 mb-1">Hôm nay</p>
              <p className="text-sm text-[#ffd700]" style={{ fontWeight: 700 }}>
                {(stats.todayRevenue / 1000000).toFixed(1)}M
              </p>
            </Card>
            <Card className="bg-card border-[#9333ea]/30 p-3">
              <p className="text-xs text-gray-400 mb-1">Tuần này</p>
              <p className="text-sm text-[#9333ea]" style={{ fontWeight: 700 }}>
                {(stats.weekRevenue / 1000000).toFixed(0)}M
              </p>
            </Card>
            <Card className="bg-card border-green-500/30 p-3">
              <p className="text-xs text-gray-400 mb-1">Tháng này</p>
              <p className="text-sm text-green-400" style={{ fontWeight: 700 }}>
                {(stats.monthRevenue / 1000000).toFixed(0)}M
              </p>
            </Card>
          </div>
        </div>

        {/* Top Services */}
        <Card className="bg-card border-[#ffd700]/30 p-4">
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-white text-sm" style={{ fontWeight: 600 }}>
              🔥 Top 5 dịch vụ bán chạy
            </h3>
            <Button
              size="sm"
              variant="ghost"
              className="text-xs text-[#ffd700] h-auto p-0"
              onClick={() => onNavigate('manager-services')}
            >
              Xem tất cả
            </Button>
          </div>
          <div className="space-y-2">
            {topServices.map((service, idx) => (
              <div key={idx} className="flex items-center gap-2">
                <div className="w-6 h-6 rounded-full bg-[#ffd700]/20 flex items-center justify-center flex-shrink-0">
                  <span className="text-xs text-[#ffd700]" style={{ fontWeight: 600 }}>
                    {idx + 1}
                  </span>
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-xs text-white truncate" style={{ fontWeight: 500 }}>
                    {service.name}
                  </p>
                  <p className="text-xs text-gray-400">
                    {service.quantity} món • {(service.revenue / 1000).toFixed(0)}K
                  </p>
                </div>
                <Badge className="bg-green-500/20 text-green-400 text-xs flex-shrink-0">
                  {service.trend}
                </Badge>
              </div>
            ))}
          </div>
        </Card>

        {/* Pending Orders */}
        <Card className="bg-card border-red-500/30 p-4">
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-white text-sm flex items-center gap-2" style={{ fontWeight: 600 }}>
              <AlertCircle className="w-4 h-4 text-red-400" />
              Order đang chờ xử lý
            </h3>
            <Button
              size="sm"
              variant="ghost"
              className="text-xs text-[#ffd700] h-auto p-0"
              onClick={() => onNavigate('manager-orders')}
            >
              Xem tất cả
            </Button>
          </div>
          <div className="space-y-2">
            {pendingOrdersList.slice(0, 3).map((order) => (
              <div
                key={order.id}
                className="flex items-center justify-between p-2 rounded-lg bg-[#1a1a24] border border-red-500/20 cursor-pointer hover:border-red-500/40 transition-colors"
                onClick={() => onNavigate('manager-order-detail', order)}
              >
                <div className="flex items-center gap-2">
                  <ShoppingCart className="w-4 h-4 text-red-400" />
                  <div>
                    <p className="text-xs text-white" style={{ fontWeight: 600 }}>
                      {order.room}
                    </p>
                    <p className="text-xs text-gray-400">{order.time}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Badge
                    className={
                      order.status === 'pending'
                        ? 'bg-yellow-500/20 text-yellow-400'
                        : 'bg-blue-500/20 text-blue-400'
                    }
                  >
                    {order.items} món
                  </Badge>
                  <ChevronRight className="w-4 h-4 text-gray-400" />
                </div>
              </div>
            ))}
          </div>
        </Card>

        {/* Staff On Duty */}
        <Card className="bg-card border-[#9333ea]/30 p-4">
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-white text-sm" style={{ fontWeight: 600 }}>
              👨‍💼 Nhân viên đang làm ({stats.staffOnDuty})
            </h3>
            <Button
              size="sm"
              variant="ghost"
              className="text-xs text-[#ffd700] h-auto p-0"
              onClick={() => onNavigate('manager-staff')}
            >
              Xem tất cả
            </Button>
          </div>
          <div className="space-y-2">
            {staffOnDutyList.slice(0, 3).map((staff, idx) => (
              <div key={idx} className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-full bg-[#9333ea]/20 flex items-center justify-center flex-shrink-0">
                    <Users className="w-4 h-4 text-[#9333ea]" />
                  </div>
                  <div>
                    <p className="text-xs text-white" style={{ fontWeight: 500 }}>
                      {staff.name}
                    </p>
                    <p className="text-xs text-gray-400">
                      {staff.role} • {staff.shift}
                    </p>
                  </div>
                </div>
                <Badge
                  className={
                    staff.status === 'active'
                      ? 'bg-green-500/20 text-green-400'
                      : 'bg-yellow-500/20 text-yellow-400'
                  }
                >
                  <div className="w-1.5 h-1.5 rounded-full bg-current mr-1" />
                  {staff.status === 'active' ? 'Làm việc' : 'Nghỉ'}
                </Badge>
              </div>
            ))}
          </div>
        </Card>

        {/* Quick Actions */}
        <div className="grid grid-cols-2 gap-3">
          <Card
            className="bg-card border-[#ffd700]/20 p-4 cursor-pointer hover:border-[#ffd700] transition-all"
            onClick={() => onNavigate('manager-rooms')}
          >
            <DoorOpen className="w-8 h-8 text-[#ffd700] mb-2" />
            <h4 className="text-white text-sm mb-1" style={{ fontWeight: 600 }}>
              Quản lý phòng
            </h4>
            <p className="text-xs text-gray-400">
              {stats.roomsAvailable + stats.roomsOccupied} phòng
            </p>
          </Card>
          <Card
            className="bg-card border-[#9333ea]/20 p-4 cursor-pointer hover:border-[#9333ea] transition-all"
            onClick={() => onNavigate('manager-revenue')}
          >
            <TrendingUp className="w-8 h-8 text-[#9333ea] mb-2" />
            <h4 className="text-white text-sm mb-1" style={{ fontWeight: 600 }}>
              Báo cáo doanh thu
            </h4>
            <p className="text-xs text-gray-400">Xem thống kê</p>
          </Card>
        </div>

        {/* Logout */}
        <Button
          onClick={() => onNavigate('home')}
          variant="outline"
          className="w-full h-10 rounded-xl border-red-500/50 text-red-500 hover:bg-red-500/10 text-sm"
        >
          <LogOut className="w-4 h-4 mr-2" />
          Đăng xuất
        </Button>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-background">
      {activeTab === 'dashboard' && renderDashboard()}

      {/* Bottom Navigation */}
      <div className="fixed bottom-0 left-0 right-0 bg-[#1a1a24] border-t border-[#ffd700]/20 px-2 py-2 max-w-md mx-auto">
        <div className="flex items-center justify-around">
          <button
            onClick={() => setActiveTab('dashboard')}
            className={`flex flex-col items-center gap-0.5 transition-colors ${
              activeTab === 'dashboard' ? 'text-[#ffd700]' : 'text-gray-400'
            }`}
          >
            <LayoutDashboard className="w-5 h-5" />
            <span className="text-xs">Dashboard</span>
          </button>
          <button
            onClick={() => onNavigate('manager-rooms')}
            className="flex flex-col items-center gap-0.5 transition-colors text-gray-400 hover:text-[#ffd700]"
          >
            <DoorOpen className="w-5 h-5" />
            <span className="text-xs">Phòng</span>
          </button>
          <button
            onClick={() => onNavigate('manager-orders')}
            className="flex flex-col items-center gap-0.5 transition-colors text-gray-400 hover:text-[#ffd700]"
          >
            <ShoppingCart className="w-5 h-5" />
            <span className="text-xs">Order</span>
          </button>
          <button
            onClick={() => onNavigate('manager-staff')}
            className="flex flex-col items-center gap-0.5 transition-colors text-gray-400 hover:text-[#ffd700]"
          >
            <Users className="w-5 h-5" />
            <span className="text-xs">Nhân sự</span>
          </button>
          <button
            onClick={() => onNavigate('manager-menu')}
            className="flex flex-col items-center gap-0.5 transition-colors text-gray-400 hover:text-[#ffd700]"
          >
            <Package className="w-5 h-5" />
            <span className="text-xs">Thêm</span>
          </button>
        </div>
      </div>
    </div>
  );
}
