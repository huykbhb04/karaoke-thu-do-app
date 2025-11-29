import { useState } from 'react';
import { ArrowLeft, TrendingUp, TrendingDown, Users, DoorOpen, ShoppingCart, DollarSign, Calendar, Download } from 'lucide-react';
import { Button } from '../ui/button';
import { Card } from '../ui/card';
import { Badge } from '../ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { ScrollArea } from '../ui/scroll-area';
import { toast } from 'sonner@2.0.3';

interface MonitoringProps {
  onBack: () => void;
}

export function Monitoring({ onBack }: MonitoringProps) {
  const [timeRange, setTimeRange] = useState('today');
  const [selectedBranch, setSelectedBranch] = useState('all');

  const branches = [
    { id: 'all', name: 'Tất cả cơ sở' },
    { id: 'tran-duy-hung', name: 'Trần Duy Hưng' },
    { id: 'nguyen-hue', name: 'Nguyễn Huệ' },
    { id: 'lang-ha', name: 'Láng Hạ' },
  ];

  const stats = {
    todayRevenue: 83000000,
    yesterdayRevenue: 75000000,
    monthRevenue: 2450000000,
    totalCustomers: 342,
    activeRooms: 23,
    totalRooms: 45,
    pendingOrders: 15,
    completedOrders: 128,
  };

  const revenueGrowth = ((stats.todayRevenue - stats.yesterdayRevenue) / stats.yesterdayRevenue * 100).toFixed(1);
  const roomUsage = ((stats.activeRooms / stats.totalRooms) * 100).toFixed(0);

  // Branch Performance Data
  const branchPerformance = [
    {
      id: 'BR001',
      name: 'Trần Duy Hưng',
      revenue: 45000000,
      customers: 156,
      rooms: { active: 8, total: 15 },
      growth: 12.5,
      status: 'excellent',
    },
    {
      id: 'BR002',
      name: 'Nguyễn Huệ',
      revenue: 38000000,
      customers: 128,
      rooms: { active: 5, total: 12 },
      growth: -5.2,
      status: 'warning',
    },
    {
      id: 'BR003',
      name: 'Láng Hạ',
      revenue: 0,
      customers: 0,
      rooms: { active: 0, total: 18 },
      growth: 0,
      status: 'maintenance',
    },
  ];

  // Top Services
  const topServices = [
    { name: 'Bia Heineken', quantity: 248, revenue: 6200000, category: 'drinks' },
    { name: 'Snack khoai tây', quantity: 186, revenue: 4650000, category: 'snacks' },
    { name: 'Bia Tiger', quantity: 172, revenue: 3440000, category: 'drinks' },
    { name: 'Dĩa trái cây', quantity: 95, revenue: 7600000, category: 'fruits' },
    { name: 'Nước ngọt', quantity: 312, revenue: 4680000, category: 'drinks' },
  ];

  // Recent Activities
  const recentActivities = [
    { time: '5 phút trước', action: 'Đặt phòng mới', branch: 'Trần Duy Hưng', details: 'Phòng VIP 01 - 3h', type: 'booking' },
    { time: '12 phút trước', action: 'Order đồ uống', branch: 'Nguyễn Huệ', details: '2 Bia + 1 Snack', type: 'order' },
    { time: '18 phút trước', action: 'Thanh toán', branch: 'Trần Duy Hưng', details: '1,350,000đ', type: 'payment' },
    { time: '25 phút trước', action: 'Check-in', branch: 'Nguyễn Huệ', details: 'Phòng Family 02', type: 'checkin' },
    { time: '32 phút trước', action: 'Đặt phòng hủy', branch: 'Láng Hạ', details: 'Phòng Party 04', type: 'cancel' },
  ];

  const handleExportReport = () => {
    toast.success('Đang xuất báo cáo... Sẽ tải xuống trong giây lát');
  };

  const getActivityColor = (type: string) => {
    switch (type) {
      case 'booking': return 'text-green-400';
      case 'order': return 'text-blue-400';
      case 'payment': return 'text-[#ffd700]';
      case 'checkin': return 'text-purple-400';
      case 'cancel': return 'text-red-400';
      default: return 'text-gray-400';
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'excellent':
        return <Badge className="bg-green-500/20 text-green-400 text-xs">Xuất sắc</Badge>;
      case 'good':
        return <Badge className="bg-blue-500/20 text-blue-400 text-xs">Tốt</Badge>;
      case 'warning':
        return <Badge className="bg-yellow-500/20 text-yellow-400 text-xs">Cảnh báo</Badge>;
      case 'maintenance':
        return <Badge className="bg-gray-500/20 text-gray-400 text-xs">Bảo trì</Badge>;
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-background pb-20">
      {/* Header */}
      <div className="sticky top-0 z-50 bg-gradient-to-br from-pink-500 to-pink-700 p-4 rounded-b-[20px]">
        <div className="flex items-center gap-3 mb-3">
          <button
            onClick={onBack}
            className="w-9 h-9 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20"
          >
            <ArrowLeft className="w-5 h-5 text-white" />
          </button>
          <div className="flex-1">
            <h1 className="text-sm text-white" style={{ fontWeight: 700 }}>
              Giám sát & thống kê
            </h1>
            <p className="text-xs text-gray-200">Dashboard tổng hợp realtime</p>
          </div>
          <Button
            size="sm"
            className="bg-white/20 hover:bg-white/30 text-white h-8 rounded-full px-3"
            onClick={handleExportReport}
          >
            <Download className="w-4 h-4 mr-1" />
            <span className="text-xs">Xuất</span>
          </Button>
        </div>

        {/* Filters */}
        <div className="grid grid-cols-2 gap-2">
          <Select value={timeRange} onValueChange={setTimeRange}>
            <SelectTrigger className="bg-white/10 border-white/20 text-white h-8 text-xs">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="today">Hôm nay</SelectItem>
              <SelectItem value="yesterday">Hôm qua</SelectItem>
              <SelectItem value="week">Tuần này</SelectItem>
              <SelectItem value="month">Tháng này</SelectItem>
              <SelectItem value="year">Năm này</SelectItem>
            </SelectContent>
          </Select>

          <Select value={selectedBranch} onValueChange={setSelectedBranch}>
            <SelectTrigger className="bg-white/10 border-white/20 text-white h-8 text-xs">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {branches.map(branch => (
                <SelectItem key={branch.id} value={branch.id}>{branch.name}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      <ScrollArea className="h-[calc(100vh-200px)] px-4 pt-4">
        <div className="space-y-4">
          {/* Key Metrics */}
          <div>
            <h3 className="text-white text-sm mb-3" style={{ fontWeight: 600 }}>
              Chỉ số chính
            </h3>
            <div className="grid grid-cols-2 gap-3">
              <Card className="bg-gradient-to-br from-[#ffd700]/20 to-[#ffd700]/5 border-[#ffd700]/30 p-4">
                <div className="flex items-center gap-2 mb-2">
                  <DollarSign className="w-4 h-4 text-[#ffd700]" />
                  <p className="text-xs text-gray-400">Doanh thu hôm nay</p>
                </div>
                <p className="text-lg text-white mb-1" style={{ fontWeight: 700 }}>
                  {(stats.todayRevenue / 1000000).toFixed(1)}M
                </p>
                <div className="flex items-center gap-1">
                  {parseFloat(revenueGrowth) >= 0 ? (
                    <TrendingUp className="w-3 h-3 text-green-400" />
                  ) : (
                    <TrendingDown className="w-3 h-3 text-red-400" />
                  )}
                  <p className={`text-xs ${parseFloat(revenueGrowth) >= 0 ? 'text-green-400' : 'text-red-400'}`}>
                    {revenueGrowth}%
                  </p>
                </div>
              </Card>

              <Card className="bg-gradient-to-br from-[#9333ea]/20 to-[#9333ea]/5 border-[#9333ea]/30 p-4">
                <div className="flex items-center gap-2 mb-2">
                  <Users className="w-4 h-4 text-[#9333ea]" />
                  <p className="text-xs text-gray-400">Lượng khách</p>
                </div>
                <p className="text-lg text-white mb-1" style={{ fontWeight: 700 }}>
                  {stats.totalCustomers}
                </p>
                <p className="text-xs text-gray-400">khách hôm nay</p>
              </Card>

              <Card className="bg-gradient-to-br from-blue-500/20 to-blue-500/5 border-blue-500/30 p-4">
                <div className="flex items-center gap-2 mb-2">
                  <DoorOpen className="w-4 h-4 text-blue-400" />
                  <p className="text-xs text-gray-400">Phòng đang dùng</p>
                </div>
                <p className="text-lg text-white mb-1" style={{ fontWeight: 700 }}>
                  {stats.activeRooms}/{stats.totalRooms}
                </p>
                <p className="text-xs text-gray-400">{roomUsage}% công suất</p>
              </Card>

              <Card className="bg-gradient-to-br from-green-500/20 to-green-500/5 border-green-500/30 p-4">
                <div className="flex items-center gap-2 mb-2">
                  <ShoppingCart className="w-4 h-4 text-green-400" />
                  <p className="text-xs text-gray-400">Order</p>
                </div>
                <p className="text-lg text-white mb-1" style={{ fontWeight: 700 }}>
                  {stats.completedOrders}
                </p>
                <p className="text-xs text-gray-400">{stats.pendingOrders} đang xử lý</p>
              </Card>
            </div>
          </div>

          {/* Branch Performance */}
          <div>
            <h3 className="text-white text-sm mb-3" style={{ fontWeight: 600 }}>
              Hiệu suất theo cơ sở
            </h3>
            <div className="space-y-2">
              {branchPerformance.map((branch) => {
                const roomPercentage = (branch.rooms.active / branch.rooms.total * 100).toFixed(0);
                
                return (
                  <Card key={branch.id} className="bg-card border-gray-700/30 p-3">
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="text-white text-sm" style={{ fontWeight: 600 }}>
                        {branch.name}
                      </h4>
                      {getStatusBadge(branch.status)}
                    </div>

                    <div className="grid grid-cols-3 gap-2 mb-2">
                      <div>
                        <p className="text-xs text-gray-400">Doanh thu</p>
                        <p className="text-xs text-[#ffd700]" style={{ fontWeight: 600 }}>
                          {(branch.revenue / 1000000).toFixed(1)}M
                        </p>
                      </div>
                      <div>
                        <p className="text-xs text-gray-400">Khách</p>
                        <p className="text-xs text-white" style={{ fontWeight: 600 }}>
                          {branch.customers}
                        </p>
                      </div>
                      <div>
                        <p className="text-xs text-gray-400">Phòng</p>
                        <p className="text-xs text-white" style={{ fontWeight: 600 }}>
                          {branch.rooms.active}/{branch.rooms.total}
                        </p>
                      </div>
                    </div>

                    <div className="w-full bg-gray-700 rounded-full h-1.5 mb-1">
                      <div
                        className={`h-1.5 rounded-full ${
                          parseInt(roomPercentage) > 80 ? 'bg-red-500' :
                          parseInt(roomPercentage) > 50 ? 'bg-yellow-500' : 'bg-green-500'
                        }`}
                        style={{ width: `${roomPercentage}%` }}
                      />
                    </div>

                    {branch.growth !== 0 && (
                      <div className="flex items-center gap-1">
                        {branch.growth >= 0 ? (
                          <TrendingUp className="w-3 h-3 text-green-400" />
                        ) : (
                          <TrendingDown className="w-3 h-3 text-red-400" />
                        )}
                        <p className={`text-xs ${branch.growth >= 0 ? 'text-green-400' : 'text-red-400'}`}>
                          {branch.growth >= 0 ? '+' : ''}{branch.growth}% so với hôm qua
                        </p>
                      </div>
                    )}
                  </Card>
                );
              })}
            </div>
          </div>

          {/* Top Services */}
          <div>
            <h3 className="text-white text-sm mb-3" style={{ fontWeight: 600 }}>
              Dịch vụ bán chạy
            </h3>
            <Card className="bg-card border-gray-700/30 p-3">
              <div className="space-y-2">
                {topServices.map((service, idx) => (
                  <div key={idx} className="flex items-center justify-between py-2 border-b border-gray-700/30 last:border-0">
                    <div className="flex items-center gap-2 flex-1">
                      <div className="w-6 h-6 rounded bg-[#ffd700]/20 flex items-center justify-center flex-shrink-0">
                        <span className="text-xs text-[#ffd700]" style={{ fontWeight: 700 }}>
                          {idx + 1}
                        </span>
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-xs text-white truncate" style={{ fontWeight: 600 }}>
                          {service.name}
                        </p>
                        <p className="text-xs text-gray-400">SL: {service.quantity}</p>
                      </div>
                    </div>
                    <p className="text-xs text-[#ffd700] flex-shrink-0" style={{ fontWeight: 600 }}>
                      {(service.revenue / 1000).toFixed(0)}K
                    </p>
                  </div>
                ))}
              </div>
            </Card>
          </div>

          {/* Recent Activities */}
          <div>
            <h3 className="text-white text-sm mb-3" style={{ fontWeight: 600 }}>
              Hoạt động gần đây
            </h3>
            <Card className="bg-card border-gray-700/30 p-3">
              <div className="space-y-3">
                {recentActivities.map((activity, idx) => (
                  <div key={idx} className="flex items-start gap-3 pb-3 border-b border-gray-700/30 last:border-0 last:pb-0">
                    <div className="w-2 h-2 rounded-full bg-[#ffd700] mt-1.5 flex-shrink-0" />
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <p className={`text-xs ${getActivityColor(activity.type)}`} style={{ fontWeight: 600 }}>
                          {activity.action}
                        </p>
                        <span className="text-xs text-gray-500">•</span>
                        <p className="text-xs text-gray-400">{activity.time}</p>
                      </div>
                      <p className="text-xs text-gray-400 mb-0.5">{activity.branch}</p>
                      <p className="text-xs text-white">{activity.details}</p>
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          </div>
        </div>
      </ScrollArea>
    </div>
  );
}
