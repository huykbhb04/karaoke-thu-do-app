import React, { useState } from 'react';
import { Clock, Calendar, ShoppingCart, User, Bell, LogOut, Home, ChevronRight, ArrowLeft } from 'lucide-react';
import { Button } from './ui/button';
import { Card } from './ui/card';
import { Badge } from './ui/badge';

interface StaffDashboardProps {
  userName: string;
  onNavigate: (screen: string, data?: any) => void;
}

export function StaffDashboard({ userName, onNavigate }: StaffDashboardProps) {
  const [activeTab, setActiveTab] = useState('home');
  const [isWorking, setIsWorking] = useState(false);

  // Đồng bộ với dữ liệu hệ thống đặt phòng
  const roomCategories = [
    { id: "vip", name: "VIP", totalRooms: 6 },
    { id: "family", name: "Family", totalRooms: 12 },
    { id: "couple", name: "Couple", totalRooms: 8 },
    { id: "party", name: "Party", totalRooms: 4 },
  ];

  const rooms = [
    // VIP Rooms
    { id: 'VIP-01', name: 'Phòng VIP 01', category: 'VIP', floor: 1, status: 'available', customer: null, startTime: null, endTime: null },
    { id: 'VIP-02', name: 'Phòng VIP 02', category: 'VIP', floor: 1, status: 'occupied', customer: 'Nguyễn Văn A', startTime: '14:00', endTime: '17:00' },
    { id: 'VIP-03', name: 'Phòng VIP 03', category: 'VIP', floor: 2, status: 'available', customer: null, startTime: null, endTime: null },
    { id: 'VIP-04', name: 'Phòng VIP 04', category: 'VIP', floor: 2, status: 'occupied', customer: 'Trần Thị B', startTime: '15:00', endTime: '17:00' },
    { id: 'VIP-05', name: 'Phòng VIP 05', category: 'VIP', floor: 3, status: 'available', customer: null, startTime: null, endTime: null },
    { id: 'VIP-06', name: 'Phòng VIP 06', category: 'VIP', floor: 3, status: 'maintenance', customer: null, startTime: null, endTime: null },
    
    // Family Rooms
    { id: 'FAM-01', name: 'Phòng Family 01', category: 'Family', floor: 1, status: 'occupied', customer: 'Lê Văn C', startTime: '16:00', endTime: '19:00' },
    { id: 'FAM-02', name: 'Phòng Family 02', category: 'Family', floor: 1, status: 'available', customer: null, startTime: null, endTime: null },
    { id: 'FAM-03', name: 'Phòng Family 03', category: 'Family', floor: 1, status: 'available', customer: null, startTime: null, endTime: null },
    { id: 'FAM-04', name: 'Phòng Family 04', category: 'Family', floor: 2, status: 'cleaning', customer: null, startTime: null, endTime: null },
    
    // Couple Rooms
    { id: 'COU-01', name: 'Phòng Couple 01', category: 'Couple', floor: 1, status: 'occupied', customer: 'Phạm Thị D', startTime: '18:00', endTime: '21:00' },
    { id: 'COU-02', name: 'Phòng Couple 02', category: 'Couple', floor: 1, status: 'available', customer: null, startTime: null, endTime: null },
    { id: 'COU-03', name: 'Phòng Couple 03', category: 'Couple', floor: 2, status: 'available', customer: null, startTime: null, endTime: null },
    
    // Party Rooms
    { id: 'PAR-01', name: 'Phòng Party 01', category: 'Party', floor: 3, status: 'occupied', customer: 'Hoàng Văn E', startTime: '19:00', endTime: '23:00' },
    { id: 'PAR-02', name: 'Phòng Party 02', category: 'Party', floor: 3, status: 'available', customer: null, startTime: null, endTime: null },
  ];

  const shifts = [
    { date: '13/10/2025', day: 'T2', time: '08:00 - 16:00', status: 'confirmed' },
    { date: '14/10/2025', day: 'T3', time: '16:00 - 24:00', status: 'confirmed' },
    { date: '15/10/2025', day: 'T4', time: '08:00 - 16:00', status: 'pending' },
    { date: '16/10/2025', day: 'T5', time: 'Off', status: 'off' },
  ];

  const renderHome = () => (
    <div className="pb-20">
      {/* Header */}
      <div className="bg-gradient-to-br from-[#9333ea] to-[#6b21a8] p-6 rounded-b-[30px]">
        <div className="flex items-center justify-between mb-6">
          <div>
            <p className="text-gray-300 text-sm">Xin chào,</p>
            <h1 className="text-2xl text-white" style={{ fontWeight: 700 }}>{userName}</h1>
          </div>
          <div className="w-12 h-12 rounded-full bg-[#ffd700] flex items-center justify-center">
            <User className="w-6 h-6 text-black" />
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-2 gap-4">
          <Card className="bg-white/10 border-white/20 p-4 backdrop-blur-sm">
            <p className="text-gray-300 text-sm mb-1">Ca làm hôm nay</p>
            <p className="text-white text-xl" style={{ fontWeight: 600 }}>08:00 - 16:00</p>
          </Card>
          <Card className="bg-white/10 border-white/20 p-4 backdrop-blur-sm">
            <p className="text-gray-300 text-sm mb-1">Giờ làm tuần này</p>
            <p className="text-white text-xl" style={{ fontWeight: 600 }}>32 giờ</p>
          </Card>
        </div>
      </div>

      {/* Main Menu */}
      <div className="px-6 py-6">
        <div className="grid grid-cols-2 gap-4">
          <Card
            className="bg-card border-[#ffd700]/20 p-6 cursor-pointer hover:border-[#ffd700] transition-all hover:shadow-lg hover:shadow-[#ffd700]/20"
            onClick={() => setActiveTab('chamcong')}
          >
            <div className="w-12 h-12 rounded-full bg-[#ffd700]/20 flex items-center justify-center mb-3">
              <Clock className="w-6 h-6 text-[#ffd700]" />
            </div>
            <h3 className="text-white mb-1">Chấm công</h3>
            <p className="text-sm text-gray-400">Bắt đầu/Kết thúc ca</p>
          </Card>

          <Card
            className="bg-card border-[#9333ea]/20 p-6 cursor-pointer hover:border-[#9333ea] transition-all hover:shadow-lg hover:shadow-[#9333ea]/20"
            onClick={() => setActiveTab('schedule')}
          >
            <div className="w-12 h-12 rounded-full bg-[#9333ea]/20 flex items-center justify-center mb-3">
              <Calendar className="w-6 h-6 text-[#9333ea]" />
            </div>
            <h3 className="text-white mb-1">Lịch làm việc</h3>
            <p className="text-sm text-gray-400">Xem lịch & đăng ký</p>
          </Card>

          <Card
            className="bg-card border-[#ffd700]/20 p-6 cursor-pointer hover:border-[#ffd700] transition-all hover:shadow-lg hover:shadow-[#ffd700]/20"
            onClick={() => setActiveTab('order')}
          >
            <div className="w-12 h-12 rounded-full bg-[#ffd700]/20 flex items-center justify-center mb-3">
              <ShoppingCart className="w-6 h-6 text-[#ffd700]" />
            </div>
            <h3 className="text-white mb-1">Order phòng hát</h3>
            <p className="text-sm text-gray-400">Quản lý đơn hàng</p>
          </Card>

          <Card
            className="bg-card border-[#9333ea]/20 p-6 cursor-pointer hover:border-[#9333ea] transition-all hover:shadow-lg hover:shadow-[#9333ea]/20"
            onClick={() => onNavigate('staff-profile')}
          >
            <div className="w-12 h-12 rounded-full bg-[#9333ea]/20 flex items-center justify-center mb-3">
              <User className="w-6 h-6 text-[#9333ea]" />
            </div>
            <h3 className="text-white mb-1">Thông tin cá nhân</h3>
            <p className="text-sm text-gray-400">Xem & sửa hồ sơ</p>
          </Card>
        </div>

        {/* Quick Actions */}
        <div className="mt-8">
          <h3 className="text-[#ffd700] mb-4" style={{ fontWeight: 600 }}>Thông báo mới</h3>
          <Card className="bg-card border-[#9333ea]/20 p-4">
            <div className="flex items-start gap-3">
              <Bell className="w-5 h-5 text-[#9333ea] mt-0.5" />
              <div className="flex-1">
                <p className="text-white mb-1">Lịch làm việc tuần sau</p>
                <p className="text-sm text-gray-400">Vui lòng kiểm tra và xác nhận lịch làm việc tuần tới</p>
                <p className="text-xs text-[#9333ea] mt-2">2 giờ trước</p>
              </div>
            </div>
          </Card>
        </div>

        {/* Logout */}
        <Button
          onClick={() => onNavigate('home')}
          variant="outline"
          className="w-full mt-8 h-12 rounded-[20px] border-red-500/50 text-red-500 hover:bg-red-500/10"
        >
          <LogOut className="w-5 h-5 mr-2" />
          Đăng xuất
        </Button>
      </div>
    </div>
  );

  const renderChamCong = () => (
    <div className="pb-20">
      <div className="bg-gradient-to-br from-[#9333ea] to-[#6b21a8] p-6 rounded-b-[30px]">
        <div className="flex items-center gap-4 mb-6">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setActiveTab('home')}
            className="text-white hover:bg-white/10"
          >
            <ArrowLeft className="w-6 h-6" />
          </Button>
          <h2 className="text-2xl text-white" style={{ fontWeight: 700 }}>Chấm công</h2>
        </div>
        
        <Card className="bg-white/10 border-white/20 p-6 backdrop-blur-sm">
          <div className="text-center mb-6">
            <p className="text-gray-300 text-sm mb-2">Thời gian hiện tại</p>
            <p className="text-white text-4xl mb-1" style={{ fontWeight: 700 }}>14:32</p>
            <p className="text-gray-300">Thứ Hai, 13/10/2025</p>
          </div>

          <div className="flex items-center justify-between p-4 bg-white/10 rounded-[20px] mb-6">
            <div>
              <p className="text-gray-300 text-sm">Trạng thái</p>
              <p className="text-white" style={{ fontWeight: 600 }}>
                {isWorking ? 'Đang làm việc' : 'Chưa chấm công'}
              </p>
            </div>
            <Badge className={isWorking ? 'bg-green-500' : 'bg-gray-500'}>
              {isWorking ? 'Hoạt động' : 'Chờ bắt đầu'}
            </Badge>
          </div>

          {isWorking && (
            <div className="mb-6">
              <p className="text-gray-300 text-sm mb-2">Bắt đầu ca:</p>
              <p className="text-white" style={{ fontWeight: 600 }}>08:15 AM</p>
            </div>
          )}

          <Button
            onClick={() => setIsWorking(!isWorking)}
            className={`w-full h-14 rounded-[20px] ${
              isWorking
                ? 'bg-red-500 hover:bg-red-600'
                : 'bg-[#ffd700] hover:bg-[#ffed4e] text-black'
            }`}
            style={{ fontWeight: 600 }}
          >
            {isWorking ? '⏹ Kết thúc ca' : '▶ Bắt đầu ca'}
          </Button>
        </Card>
      </div>

      <div className="px-6 py-6">
        <h3 className="text-[#ffd700] mb-4" style={{ fontWeight: 600 }}>Lịch sử chấm công</h3>
        <div className="space-y-3">
          {[
            { date: '12/10/2025', start: '08:00', end: '16:00', hours: '8h' },
            { date: '11/10/2025', start: '16:00', end: '00:00', hours: '8h' },
            { date: '10/10/2025', start: '08:00', end: '16:00', hours: '8h' },
          ].map((record, index) => (
            <Card key={index} className="bg-card border-[#ffd700]/20 p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-white mb-1">{record.date}</p>
                  <p className="text-sm text-gray-400">{record.start} - {record.end}</p>
                </div>
                <Badge className="bg-[#9333ea]">{record.hours}</Badge>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );

  const renderSchedule = () => (
    <div className="pb-20">
      <div className="bg-gradient-to-br from-[#9333ea] to-[#6b21a8] p-6 rounded-b-[30px]">
        <div className="flex items-center gap-4 mb-4">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setActiveTab('home')}
            className="text-white hover:bg-white/10"
          >
            <ArrowLeft className="w-6 h-6" />
          </Button>
          <div>
            <h2 className="text-2xl text-white" style={{ fontWeight: 700 }}>Lịch làm việc</h2>
            <p className="text-gray-300 text-sm">Tuần 42 - Tháng 10/2025</p>
          </div>
        </div>
      </div>

      <div className="px-6 py-6">
        <div className="space-y-3">
          {shifts.map((shift, index) => (
            <Card
              key={index}
              className={`bg-card p-4 ${
                shift.status === 'confirmed'
                  ? 'border-[#ffd700]/30'
                  : shift.status === 'pending'
                  ? 'border-[#9333ea]/30'
                  : 'border-gray-700/30'
              }`}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-[#ffd700]/20 flex flex-col items-center justify-center">
                    <span className="text-xs text-gray-400">{shift.day}</span>
                    <span className="text-white" style={{ fontWeight: 600 }}>
                      {shift.date.split('/')[0]}
                    </span>
                  </div>
                  <div>
                    <p className="text-white mb-1">{shift.date}</p>
                    <p className="text-sm text-gray-400">{shift.time}</p>
                  </div>
                </div>
                <Badge
                  className={
                    shift.status === 'confirmed'
                      ? 'bg-green-500'
                      : shift.status === 'pending'
                      ? 'bg-yellow-500'
                      : 'bg-gray-500'
                  }
                >
                  {shift.status === 'confirmed'
                    ? 'Đã xác nhận'
                    : shift.status === 'pending'
                    ? 'Chờ duyệt'
                    : 'Nghỉ'}
                </Badge>
              </div>
            </Card>
          ))}
        </div>

        <Button
          className="w-full mt-6 h-12 rounded-[20px] bg-[#ffd700] hover:bg-[#ffed4e] text-black"
          style={{ fontWeight: 600 }}
        >
          Đăng ký đổi ca
        </Button>
      </div>
    </div>
  );

  const renderOrder = () => {
    const availableRooms = rooms.filter(r => r.status === 'available').length;
    const occupiedRooms = rooms.filter(r => r.status === 'occupied').length;
    const maintenanceRooms = rooms.filter(r => r.status === 'maintenance').length;
    const cleaningRooms = rooms.filter(r => r.status === 'cleaning').length;

    return (
      <div className="pb-20">
        <div className="bg-gradient-to-br from-[#9333ea] to-[#6b21a8] p-4 rounded-b-[30px]">
          <div className="flex items-center gap-3 mb-4">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setActiveTab('home')}
              className="text-white hover:bg-white/10 w-9 h-9"
            >
              <ArrowLeft className="w-5 h-5" />
            </Button>
            <div className="flex-1">
              <h2 className="text-lg text-white" style={{ fontWeight: 700 }}>Order phòng hát</h2>
              <p className="text-gray-300 text-xs">Quản lý tất cả phòng</p>
            </div>
          </div>

          {/* Stats Overview */}
          <div className="grid grid-cols-4 gap-2">
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-2 text-center">
              <p className="text-lg text-white" style={{ fontWeight: 700 }}>{availableRooms}</p>
              <p className="text-xs text-gray-300">Trống</p>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-2 text-center">
              <p className="text-lg text-white" style={{ fontWeight: 700 }}>{occupiedRooms}</p>
              <p className="text-xs text-gray-300">Đang dùng</p>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-2 text-center">
              <p className="text-lg text-white" style={{ fontWeight: 700 }}>{cleaningRooms}</p>
              <p className="text-xs text-gray-300">Dọn dẹp</p>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-2 text-center">
              <p className="text-lg text-white" style={{ fontWeight: 700 }}>{maintenanceRooms}</p>
              <p className="text-xs text-gray-300">Bảo trì</p>
            </div>
          </div>
        </div>

        <div className="px-4 py-4">
          {/* Filter Tabs */}
          <div className="flex gap-2 mb-4 overflow-x-auto no-scrollbar">
            <Badge className="bg-[#ffd700] text-black px-3 py-1 text-xs whitespace-nowrap">
              Tất cả ({rooms.length})
            </Badge>
            <Badge variant="outline" className="border-gray-600 text-gray-400 px-3 py-1 text-xs whitespace-nowrap">
              VIP (6)
            </Badge>
            <Badge variant="outline" className="border-gray-600 text-gray-400 px-3 py-1 text-xs whitespace-nowrap">
              Family (12)
            </Badge>
            <Badge variant="outline" className="border-gray-600 text-gray-400 px-3 py-1 text-xs whitespace-nowrap">
              Couple (8)
            </Badge>
            <Badge variant="outline" className="border-gray-600 text-gray-400 px-3 py-1 text-xs whitespace-nowrap">
              Party (4)
            </Badge>
          </div>

          {/* Rooms Grid */}
          <div className="grid grid-cols-2 gap-3">
            {rooms.map((room) => {
              const getStatusColor = () => {
                switch (room.status) {
                  case 'occupied':
                    return 'bg-red-500/20 border-red-500/50';
                  case 'available':
                    return 'bg-green-500/20 border-green-500/50';
                  case 'cleaning':
                    return 'bg-blue-500/20 border-blue-500/50';
                  case 'maintenance':
                    return 'bg-yellow-500/20 border-yellow-500/50';
                  default:
                    return 'bg-card border-gray-700/30';
                }
              };

              const getStatusBadge = () => {
                switch (room.status) {
                  case 'occupied':
                    return <Badge className="bg-red-500/90 text-white text-xs">Đang dùng</Badge>;
                  case 'available':
                    return <Badge className="bg-green-500/90 text-white text-xs">Trống</Badge>;
                  case 'cleaning':
                    return <Badge className="bg-blue-500/90 text-white text-xs">Dọn dẹp</Badge>;
                  case 'maintenance':
                    return <Badge className="bg-yellow-500/90 text-black text-xs">Bảo trì</Badge>;
                  default:
                    return null;
                }
              };

              return (
                <Card
                  key={room.id}
                  className={`p-3 cursor-pointer transition-all ${getStatusColor()} hover:scale-105`}
                  onClick={() => room.status === 'occupied' && onNavigate('room-order', room)}
                >
                  <div className="mb-2">
                    <div className="flex items-start justify-between mb-1">
                      <h3 className="text-white text-sm truncate flex-1" style={{ fontWeight: 600 }}>
                        {room.name}
                      </h3>
                    </div>
                    <p className="text-xs text-gray-400">Tầng {room.floor}</p>
                  </div>

                  {getStatusBadge()}

                  {room.customer && (
                    <div className="mt-2 pt-2 border-t border-white/10">
                      <p className="text-xs text-gray-400 mb-0.5">Khách hàng:</p>
                      <p className="text-xs text-white truncate" style={{ fontWeight: 500 }}>
                        {room.customer}
                      </p>
                      {room.startTime && room.endTime && (
                        <p className="text-xs text-[#ffd700] mt-1">
                          ⏰ {room.startTime} - {room.endTime}
                        </p>
                      )}
                    </div>
                  )}

                  {room.status === 'available' && (
                    <div className="mt-2 pt-2 border-t border-white/10">
                      <p className="text-xs text-green-400 flex items-center gap-1">
                        <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
                        Sẵn sàng
                      </p>
                    </div>
                  )}
                </Card>
              );
            })}
          </div>

          {/* Quick Actions */}
          <div className="mt-6 space-y-2">
            <Button
              className="w-full h-10 rounded-xl bg-[#ffd700] hover:bg-[#ffed4e] text-black text-sm"
              style={{ fontWeight: 600 }}
            >
              📋 Xem tất cả đơn hàng
            </Button>
            <Button
              variant="outline"
              className="w-full h-10 rounded-xl border-[#9333ea] text-[#9333ea] hover:bg-[#9333ea]/10 text-sm"
              style={{ fontWeight: 500 }}
            >
              🔔 Thông báo phòng trống
            </Button>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-background">
      {activeTab === 'home' && renderHome()}
      {activeTab === 'chamcong' && renderChamCong()}
      {activeTab === 'schedule' && renderSchedule()}
      {activeTab === 'order' && renderOrder()}

      {/* Bottom Navigation */}
      <div className="fixed bottom-0 left-0 right-0 bg-[#1a1a24] border-t border-[#ffd700]/20 px-2 py-2 max-w-md mx-auto">
        <div className="flex items-center justify-around">
          <button
            onClick={() => setActiveTab('home')}
            className={`flex flex-col items-center gap-0.5 transition-colors ${
              activeTab === 'home' ? 'text-[#ffd700]' : 'text-gray-400'
            }`}
          >
            <Home className="w-5 h-5" />
            <span className="text-xs">Trang chủ</span>
          </button>
          <button
            onClick={() => setActiveTab('schedule')}
            className={`flex flex-col items-center gap-0.5 transition-colors ${
              activeTab === 'schedule' ? 'text-[#ffd700]' : 'text-gray-400'
            }`}
          >
            <Calendar className="w-5 h-5" />
            <span className="text-xs">Lịch làm</span>
          </button>
          <button
            onClick={() => setActiveTab('order')}
            className={`flex flex-col items-center gap-0.5 transition-colors ${
              activeTab === 'order' ? 'text-[#ffd700]' : 'text-gray-400'
            }`}
          >
            <ShoppingCart className="w-5 h-5" />
            <span className="text-xs">Order</span>
          </button>
          <button
            onClick={() => setActiveTab('home')}
            className="flex flex-col items-center gap-0.5 transition-colors text-gray-400"
          >
            <Bell className="w-5 h-5" />
            <span className="text-xs">Thông báo</span>
          </button>
          <button
            onClick={() => onNavigate('staff-profile')}
            className="flex flex-col items-center gap-0.5 transition-colors text-gray-400"
          >
            <User className="w-5 h-5" />
            <span className="text-xs">Hồ sơ</span>
          </button>
        </div>
      </div>
    </div>
  );
}

