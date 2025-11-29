import { useState } from 'react';
import {
  ArrowLeft, TrendingUp, DollarSign, Users, Calendar, Download,
  Building2, Clock, Award, PieChart as PieChartIcon, BarChart3, Filter
} from 'lucide-react';
import { Button } from '../ui/button';
import { Card } from '../ui/card';
import { Badge } from '../ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { ScrollArea } from '../ui/scroll-area';
import { LineChart, Line, PieChart, Pie, BarChart, Bar, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { toast } from 'sonner@2.0.3';

interface RevenueReportProps {
  onBack: () => void;
}

export function RevenueReport({ onBack }: RevenueReportProps) {
  const [activeTab, setActiveTab] = useState('overview');
  const [timePeriod, setTimePeriod] = useState('week');
  const [selectedFilter, setSelectedFilter] = useState('all');

  // Mock Data - Revenue Trend
  const revenueTrendData = [
    { date: '07/10', revenue: 45000000, orders: 32, rooms: 8 },
    { date: '08/10', revenue: 52000000, orders: 38, rooms: 9 },
    { date: '09/10', revenue: 48000000, orders: 35, rooms: 8 },
    { date: '10/10', revenue: 61000000, orders: 42, rooms: 11 },
    { date: '11/10', revenue: 58000000, orders: 40, rooms: 10 },
    { date: '12/10', revenue: 69000000, orders: 48, rooms: 12 },
    { date: '13/10', revenue: 72000000, orders: 51, rooms: 12 },
  ];

  // Mock Data - Revenue by Room Type
  const roomTypeData = [
    { name: 'VIP', value: 180000000, percentage: 40, color: '#ffd700' },
    { name: 'Gia đình', value: 135000000, percentage: 30, color: '#9333ea' },
    { name: 'Couple', value: 90000000, percentage: 20, color: '#ec4899' },
    { name: 'Thường', value: 45000000, percentage: 10, color: '#3b82f6' },
  ];

  // Mock Data - Top Services
  const topServicesData = [
    { name: 'Trà sữa', revenue: 12500000, quantity: 342 },
    { name: 'Bia', revenue: 18000000, quantity: 450 },
    { name: 'Snack', revenue: 8500000, quantity: 520 },
    { name: 'Nước ngọt', revenue: 9200000, quantity: 380 },
    { name: 'Combo tiệc', revenue: 15000000, quantity: 65 },
  ];

  // Mock Data - Room Performance
  const roomPerformanceData = [
    {
      id: 'VIP01',
      name: 'VIP 01',
      type: 'VIP',
      totalHours: 156,
      revenue: 42000000,
      serviceRevenue: 8500000,
      utilization: 89,
      status: 'excellent',
    },
    {
      id: 'VIP02',
      name: 'VIP 02',
      type: 'VIP',
      totalHours: 142,
      revenue: 38000000,
      serviceRevenue: 7200000,
      utilization: 81,
      status: 'good',
    },
    {
      id: 'FAM01',
      name: 'Family 01',
      type: 'Gia đình',
      totalHours: 168,
      revenue: 28000000,
      serviceRevenue: 5800000,
      utilization: 96,
      status: 'excellent',
    },
    {
      id: 'FAM02',
      name: 'Family 02',
      type: 'Gia đình',
      totalHours: 134,
      revenue: 22000000,
      serviceRevenue: 4500000,
      utilization: 76,
      status: 'good',
    },
    {
      id: 'COU01',
      name: 'Couple 01',
      type: 'Couple',
      totalHours: 98,
      revenue: 16000000,
      serviceRevenue: 3200000,
      utilization: 56,
      status: 'average',
    },
  ];

  // Mock Data - Staff Performance
  const staffPerformanceData = [
    {
      id: 'NV001',
      name: 'Nguyễn Văn A',
      role: 'Phục vụ',
      orders: 124,
      revenue: 28000000,
      hours: 168,
      rating: 4.8,
      kpi: 15.2,
    },
    {
      id: 'NV002',
      name: 'Trần Thị B',
      role: 'Phục vụ',
      orders: 135,
      revenue: 32000000,
      hours: 176,
      rating: 4.9,
      kpi: 17.4,
    },
    {
      id: 'NV003',
      name: 'Lê Văn C',
      role: 'Pha chế',
      orders: 186,
      revenue: 18500000,
      hours: 168,
      rating: 4.7,
      kpi: 10.1,
    },
    {
      id: 'NV004',
      name: 'Phạm Thị D',
      role: 'Thu ngân',
      orders: 98,
      revenue: 0,
      hours: 160,
      rating: 4.6,
      kpi: 0,
    },
  ];

  // Mock Data - Peak Hours
  const peakHoursData = [
    { hour: '08:00', revenue: 2000000, orders: 3 },
    { hour: '10:00', revenue: 3500000, orders: 5 },
    { hour: '12:00', revenue: 4800000, orders: 8 },
    { hour: '14:00', revenue: 6200000, orders: 10 },
    { hour: '16:00', revenue: 8500000, orders: 14 },
    { hour: '18:00', revenue: 11000000, orders: 18 },
    { hour: '20:00', revenue: 15000000, orders: 24 },
    { hour: '22:00', revenue: 12000000, orders: 19 },
    { hour: '00:00', revenue: 8000000, orders: 12 },
  ];

  // Mock Data - Cost Analysis
  const costAnalysisData = {
    totalRevenue: 450000000,
    materialCost: 120000000,
    laborCost: 85000000,
    operatingCost: 45000000,
    grossProfit: 200000000,
    profitMargin: 44.4,
  };

  const stats = {
    totalRevenue: revenueTrendData.reduce((sum, d) => sum + d.revenue, 0),
    totalOrders: revenueTrendData.reduce((sum, d) => sum + d.orders, 0),
    avgRevenue: revenueTrendData.reduce((sum, d) => sum + d.revenue, 0) / revenueTrendData.length,
    activeRooms: 12,
    totalRooms: 15,
    customers: 342,
  };

  const getUtilizationColor = (utilization: number) => {
    if (utilization >= 80) return 'text-green-400';
    if (utilization >= 60) return 'text-yellow-400';
    return 'text-red-400';
  };

  const getUtilizationBg = (utilization: number) => {
    if (utilization >= 80) return 'bg-green-500/20';
    if (utilization >= 60) return 'bg-yellow-500/20';
    return 'bg-red-500/20';
  };

  const handleExportReport = () => {
    toast.success('Đang xuất báo cáo...', {
      description: 'File Excel sẽ được tải xuống sau ít giây',
    });
  };

  const renderOverview = () => (
    <div className="space-y-3">
      {/* Stats Cards */}
      <div className="grid grid-cols-2 gap-2">
        <Card className="bg-gradient-to-br from-[#ffd700]/20 to-[#ffd700]/5 border-[#ffd700]/30 p-3">
          <div className="flex items-center gap-2 mb-1">
            <div className="w-8 h-8 rounded-lg bg-[#ffd700]/20 flex items-center justify-center">
              <DollarSign className="w-4 h-4 text-[#ffd700]" />
            </div>
            <p className="text-xs text-gray-400">Doanh thu</p>
          </div>
          <p className="text-base text-white" style={{ fontWeight: 700 }}>
            {(stats.totalRevenue / 1000000).toFixed(0)}M
          </p>
          <p className="text-xs text-green-400 mt-0.5">+12.5% tuần trước</p>
        </Card>

        <Card className="bg-gradient-to-br from-[#9333ea]/20 to-[#9333ea]/5 border-[#9333ea]/30 p-3">
          <div className="flex items-center gap-2 mb-1">
            <div className="w-8 h-8 rounded-lg bg-[#9333ea]/20 flex items-center justify-center">
              <TrendingUp className="w-4 h-4 text-[#9333ea]" />
            </div>
            <p className="text-xs text-gray-400">Đơn hàng</p>
          </div>
          <p className="text-base text-white" style={{ fontWeight: 700 }}>
            {stats.totalOrders}
          </p>
          <p className="text-xs text-green-400 mt-0.5">+8.3% tuần trước</p>
        </Card>

        <Card className="bg-gradient-to-br from-blue-500/20 to-blue-500/5 border-blue-500/30 p-3">
          <div className="flex items-center gap-2 mb-1">
            <div className="w-8 h-8 rounded-lg bg-blue-500/20 flex items-center justify-center">
              <Building2 className="w-4 h-4 text-blue-400" />
            </div>
            <p className="text-xs text-gray-400">Phòng HĐ</p>
          </div>
          <p className="text-base text-white" style={{ fontWeight: 700 }}>
            {stats.activeRooms}/{stats.totalRooms}
          </p>
          <p className="text-xs text-gray-400 mt-0.5">{((stats.activeRooms / stats.totalRooms) * 100).toFixed(0)}% tỷ lệ</p>
        </Card>

        <Card className="bg-gradient-to-br from-pink-500/20 to-pink-500/5 border-pink-500/30 p-3">
          <div className="flex items-center gap-2 mb-1">
            <div className="w-8 h-8 rounded-lg bg-pink-500/20 flex items-center justify-center">
              <Users className="w-4 h-4 text-pink-400" />
            </div>
            <p className="text-xs text-gray-400">Khách hàng</p>
          </div>
          <p className="text-base text-white" style={{ fontWeight: 700 }}>
            {stats.customers}
          </p>
          <p className="text-xs text-green-400 mt-0.5">+15.2% tuần trước</p>
        </Card>
      </div>

      {/* Revenue Trend Chart */}
      <Card className="bg-card border-[#ffd700]/30 p-3">
        <div className="flex items-center justify-between mb-2">
          <h3 className="text-white text-sm" style={{ fontWeight: 600 }}>
            Xu hướng doanh thu
          </h3>
          <Badge className="bg-blue-500/20 text-blue-400 text-xs">7 ngày</Badge>
        </div>
        <div className="h-48">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={revenueTrendData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#333" />
              <XAxis dataKey="date" stroke="#888" style={{ fontSize: '10px' }} />
              <YAxis stroke="#888" style={{ fontSize: '10px' }} tickFormatter={(value) => `${value / 1000000}M`} />
              <Tooltip
                contentStyle={{
                  backgroundColor: '#1a1a24',
                  border: '1px solid #ffd700',
                  borderRadius: '8px',
                  fontSize: '11px',
                }}
                formatter={(value: any) => [`${(value / 1000000).toFixed(1)}M`, 'Doanh thu']}
              />
              <Line type="monotone" dataKey="revenue" stroke="#ffd700" strokeWidth={2} dot={{ fill: '#ffd700', r: 3 }} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </Card>

      {/* Revenue by Room Type */}
      <Card className="bg-card border-[#9333ea]/30 p-3">
        <h3 className="text-white text-sm mb-2" style={{ fontWeight: 600 }}>
          Doanh thu theo loại phòng
        </h3>
        <div className="h-40 mb-2">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={roomTypeData}
                cx="50%"
                cy="50%"
                innerRadius={35}
                outerRadius={55}
                fill="#8884d8"
                dataKey="value"
                label={({ percentage }) => `${percentage}%`}
                labelStyle={{ fontSize: '10px', fill: '#fff' }}
              >
                {roomTypeData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip
                contentStyle={{
                  backgroundColor: '#1a1a24',
                  border: '1px solid #9333ea',
                  borderRadius: '8px',
                  fontSize: '11px',
                }}
                formatter={(value: any) => [`${(value / 1000000).toFixed(1)}M`, '']}
              />
            </PieChart>
          </ResponsiveContainer>
        </div>
        <div className="grid grid-cols-2 gap-2">
          {roomTypeData.map((item) => (
            <div key={item.name} className="flex items-center gap-2">
              <div className="w-3 h-3 rounded" style={{ backgroundColor: item.color }} />
              <div className="flex-1 min-w-0">
                <p className="text-xs text-white truncate">{item.name}</p>
                <p className="text-xs text-gray-400">{item.percentage}%</p>
              </div>
            </div>
          ))}
        </div>
      </Card>

      {/* Top Services */}
      <Card className="bg-card border-blue-500/30 p-3">
        <h3 className="text-white text-sm mb-2" style={{ fontWeight: 600 }}>
          Top dịch vụ bán chạy
        </h3>
        <div className="h-48">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={topServicesData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#333" />
              <XAxis dataKey="name" stroke="#888" style={{ fontSize: '10px' }} />
              <YAxis stroke="#888" style={{ fontSize: '10px' }} tickFormatter={(value) => `${value / 1000000}M`} />
              <Tooltip
                contentStyle={{
                  backgroundColor: '#1a1a24',
                  border: '1px solid #3b82f6',
                  borderRadius: '8px',
                  fontSize: '11px',
                }}
                formatter={(value: any) => [`${(value / 1000000).toFixed(1)}M`, 'Doanh thu']}
              />
              <Bar dataKey="revenue" fill="#3b82f6" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </Card>
    </div>
  );

  const renderRoomReport = () => (
    <div className="space-y-2">
      {/* Filter */}
      <Card className="bg-card border-gray-700/30 p-3">
        <div className="flex items-center gap-2">
          <Filter className="w-4 h-4 text-gray-400" />
          <Select value={selectedFilter} onValueChange={setSelectedFilter}>
            <SelectTrigger className="flex-1 bg-[#1a1a24] border-gray-700 h-8 text-xs">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Tất cả phòng</SelectItem>
              <SelectItem value="vip">VIP</SelectItem>
              <SelectItem value="family">Gia đình</SelectItem>
              <SelectItem value="couple">Couple</SelectItem>
              <SelectItem value="standard">Thường</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </Card>

      {/* Room Cards */}
      {roomPerformanceData.map((room) => (
        <Card key={room.id} className="bg-card border-[#ffd700]/30 p-3">
          <div className="flex items-start justify-between mb-2">
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-1">
                <h3 className="text-white text-sm" style={{ fontWeight: 600 }}>
                  {room.name}
                </h3>
                <Badge className="bg-blue-500/20 text-blue-400 text-xs">{room.type}</Badge>
              </div>
              <p className="text-xs text-gray-400">ID: {room.id}</p>
            </div>
            <div className={`px-2 py-1 rounded text-xs ${getUtilizationBg(room.utilization)}`}>
              <span className={getUtilizationColor(room.utilization)} style={{ fontWeight: 600 }}>
                {room.utilization}%
              </span>
            </div>
          </div>

          <div className="space-y-2">
            <div className="grid grid-cols-2 gap-2 text-xs">
              <div>
                <p className="text-gray-400 mb-0.5">Tổng giờ</p>
                <p className="text-white" style={{ fontWeight: 600 }}>{room.totalHours}h</p>
              </div>
              <div>
                <p className="text-gray-400 mb-0.5">Doanh thu phòng</p>
                <p className="text-[#ffd700]" style={{ fontWeight: 600 }}>
                  {(room.revenue / 1000000).toFixed(1)}M
                </p>
              </div>
              <div>
                <p className="text-gray-400 mb-0.5">Doanh thu DV</p>
                <p className="text-green-400" style={{ fontWeight: 600 }}>
                  {(room.serviceRevenue / 1000000).toFixed(1)}M
                </p>
              </div>
              <div>
                <p className="text-gray-400 mb-0.5">Tổng cộng</p>
                <p className="text-white" style={{ fontWeight: 600 }}>
                  {((room.revenue + room.serviceRevenue) / 1000000).toFixed(1)}M
                </p>
              </div>
            </div>

            {/* Utilization Bar */}
            <div>
              <div className="flex items-center justify-between text-xs mb-1">
                <span className="text-gray-400">Tỷ lệ sử dụng</span>
                <span className={getUtilizationColor(room.utilization)}>{room.utilization}%</span>
              </div>
              <div className="w-full bg-gray-700 rounded-full h-1.5">
                <div
                  className={`h-1.5 rounded-full ${
                    room.utilization >= 80 ? 'bg-green-500' :
                    room.utilization >= 60 ? 'bg-yellow-500' : 'bg-red-500'
                  }`}
                  style={{ width: `${room.utilization}%` }}
                />
              </div>
            </div>
          </div>
        </Card>
      ))}
    </div>
  );

  const renderStaffReport = () => (
    <div className="space-y-2">
      {/* Staff Cards */}
      {staffPerformanceData.map((staff) => (
        <Card key={staff.id} className="bg-card border-[#9333ea]/30 p-3">
          <div className="flex items-start justify-between mb-2">
            <div className="flex items-start gap-2 flex-1">
              <div className="w-10 h-10 rounded-full bg-[#9333ea]/20 flex items-center justify-center flex-shrink-0">
                <Users className="w-5 h-5 text-[#9333ea]" />
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="text-white text-sm" style={{ fontWeight: 600 }}>
                  {staff.name}
                </h3>
                <p className="text-xs text-gray-400">{staff.id} • {staff.role}</p>
              </div>
            </div>
            <div className="flex items-center gap-1 text-xs">
              <Award className="w-3 h-3 text-[#ffd700]" />
              <span className="text-white" style={{ fontWeight: 600 }}>{staff.rating}</span>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-2 mb-2">
            <div className="text-center p-2 bg-blue-500/10 rounded">
              <p className="text-xs text-blue-400 mb-0.5">Order</p>
              <p className="text-sm text-white" style={{ fontWeight: 600 }}>{staff.orders}</p>
            </div>
            <div className="text-center p-2 bg-green-500/10 rounded">
              <p className="text-xs text-green-400 mb-0.5">Doanh thu</p>
              <p className="text-sm text-white" style={{ fontWeight: 600 }}>
                {(staff.revenue / 1000000).toFixed(1)}M
              </p>
            </div>
            <div className="text-center p-2 bg-purple-500/10 rounded">
              <p className="text-xs text-purple-400 mb-0.5">Giờ làm</p>
              <p className="text-sm text-white" style={{ fontWeight: 600 }}>{staff.hours}h</p>
            </div>
          </div>

          {staff.revenue > 0 && (
            <div className="pt-2 border-t border-gray-700/30">
              <div className="flex items-center justify-between text-xs">
                <span className="text-gray-400">KPI Đóng góp:</span>
                <span className="text-[#ffd700]" style={{ fontWeight: 600 }}>{staff.kpi}%</span>
              </div>
              <div className="w-full bg-gray-700 rounded-full h-1.5 mt-1">
                <div
                  className="h-1.5 rounded-full bg-[#ffd700]"
                  style={{ width: `${Math.min(staff.kpi * 5, 100)}%` }}
                />
              </div>
            </div>
          )}
        </Card>
      ))}
    </div>
  );

  const renderPeakHours = () => (
    <div className="space-y-3">
      {/* Peak Hours Chart */}
      <Card className="bg-card border-[#ffd700]/30 p-3">
        <h3 className="text-white text-sm mb-2" style={{ fontWeight: 600 }}>
          Doanh thu theo khung giờ
        </h3>
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={peakHoursData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#333" />
              <XAxis dataKey="hour" stroke="#888" style={{ fontSize: '10px' }} />
              <YAxis stroke="#888" style={{ fontSize: '10px' }} tickFormatter={(value) => `${value / 1000000}M`} />
              <Tooltip
                contentStyle={{
                  backgroundColor: '#1a1a24',
                  border: '1px solid #ffd700',
                  borderRadius: '8px',
                  fontSize: '11px',
                }}
                formatter={(value: any, name: string) => {
                  if (name === 'revenue') return [`${(value / 1000000).toFixed(1)}M`, 'Doanh thu'];
                  return [value, 'Đơn hàng'];
                }}
              />
              <Bar dataKey="revenue" fill="#ffd700" radius={[4, 4, 0, 0]} />
              <Bar dataKey="orders" fill="#9333ea" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
        <div className="flex items-center justify-center gap-4 mt-2 text-xs">
          <div className="flex items-center gap-1">
            <div className="w-3 h-3 rounded bg-[#ffd700]" />
            <span className="text-gray-400">Doanh thu</span>
          </div>
          <div className="flex items-center gap-1">
            <div className="w-3 h-3 rounded bg-[#9333ea]" />
            <span className="text-gray-400">Đơn hàng</span>
          </div>
        </div>
      </Card>

      {/* Peak Hours Summary */}
      <Card className="bg-gradient-to-br from-blue-500/20 to-blue-500/5 border-blue-500/30 p-3">
        <h3 className="text-white text-sm mb-2" style={{ fontWeight: 600 }}>
          Phân tích giờ cao điểm
        </h3>
        <div className="space-y-2 text-xs">
          <div className="flex items-center justify-between py-1 border-b border-gray-700/30">
            <span className="text-gray-400">Giờ cao điểm nhất:</span>
            <span className="text-white" style={{ fontWeight: 600 }}>20:00 - 22:00</span>
          </div>
          <div className="flex items-center justify-between py-1 border-b border-gray-700/30">
            <span className="text-gray-400">Giờ thấp điểm:</span>
            <span className="text-white" style={{ fontWeight: 600 }}>08:00 - 12:00</span>
          </div>
          <div className="flex items-center justify-between py-1">
            <span className="text-gray-400">Gợi ý:</span>
            <span className="text-blue-400" style={{ fontWeight: 600 }}>Khuyến mãi buổi sáng</span>
          </div>
        </div>
      </Card>
    </div>
  );

  const renderCostAnalysis = () => (
    <div className="space-y-3">
      {/* Summary Card */}
      <Card className="bg-gradient-to-br from-[#ffd700]/20 to-[#9333ea]/20 border-[#ffd700]/50 p-4">
        <div className="text-center mb-3">
          <p className="text-xs text-gray-400 mb-1">Lợi nhuận gộp</p>
          <p className="text-2xl text-[#ffd700]" style={{ fontWeight: 700 }}>
            {(costAnalysisData.grossProfit / 1000000).toFixed(0)}M
          </p>
          <p className="text-xs text-green-400 mt-1">
            Margin: {costAnalysisData.profitMargin}%
          </p>
        </div>
        <div className="grid grid-cols-2 gap-2 text-xs">
          <div className="text-center">
            <p className="text-gray-400 mb-0.5">Doanh thu</p>
            <p className="text-white" style={{ fontWeight: 600 }}>
              {(costAnalysisData.totalRevenue / 1000000).toFixed(0)}M
            </p>
          </div>
          <div className="text-center">
            <p className="text-gray-400 mb-0.5">Tổng chi phí</p>
            <p className="text-red-400" style={{ fontWeight: 600 }}>
              {((costAnalysisData.materialCost + costAnalysisData.laborCost + costAnalysisData.operatingCost) / 1000000).toFixed(0)}M
            </p>
          </div>
        </div>
      </Card>

      {/* Cost Breakdown */}
      <Card className="bg-card border-red-500/30 p-3">
        <h3 className="text-white text-sm mb-3" style={{ fontWeight: 600 }}>
          Chi tiết chi phí
        </h3>
        <div className="space-y-3">
          <div>
            <div className="flex items-center justify-between text-xs mb-1">
              <span className="text-gray-400">Nguyên vật liệu</span>
              <span className="text-white" style={{ fontWeight: 600 }}>
                {(costAnalysisData.materialCost / 1000000).toFixed(0)}M
              </span>
            </div>
            <div className="w-full bg-gray-700 rounded-full h-2">
              <div
                className="h-2 rounded-full bg-red-500"
                style={{ width: `${(costAnalysisData.materialCost / costAnalysisData.totalRevenue) * 100}%` }}
              />
            </div>
            <p className="text-xs text-gray-500 mt-0.5">
              {((costAnalysisData.materialCost / costAnalysisData.totalRevenue) * 100).toFixed(1)}% doanh thu
            </p>
          </div>

          <div>
            <div className="flex items-center justify-between text-xs mb-1">
              <span className="text-gray-400">Nhân sự</span>
              <span className="text-white" style={{ fontWeight: 600 }}>
                {(costAnalysisData.laborCost / 1000000).toFixed(0)}M
              </span>
            </div>
            <div className="w-full bg-gray-700 rounded-full h-2">
              <div
                className="h-2 rounded-full bg-orange-500"
                style={{ width: `${(costAnalysisData.laborCost / costAnalysisData.totalRevenue) * 100}%` }}
              />
            </div>
            <p className="text-xs text-gray-500 mt-0.5">
              {((costAnalysisData.laborCost / costAnalysisData.totalRevenue) * 100).toFixed(1)}% doanh thu
            </p>
          </div>

          <div>
            <div className="flex items-center justify-between text-xs mb-1">
              <span className="text-gray-400">Vận hành</span>
              <span className="text-white" style={{ fontWeight: 600 }}>
                {(costAnalysisData.operatingCost / 1000000).toFixed(0)}M
              </span>
            </div>
            <div className="w-full bg-gray-700 rounded-full h-2">
              <div
                className="h-2 rounded-full bg-yellow-500"
                style={{ width: `${(costAnalysisData.operatingCost / costAnalysisData.totalRevenue) * 100}%` }}
              />
            </div>
            <p className="text-xs text-gray-500 mt-0.5">
              {((costAnalysisData.operatingCost / costAnalysisData.totalRevenue) * 100).toFixed(1)}% doanh thu
            </p>
          </div>
        </div>
      </Card>

      {/* Profit Margin Card */}
      <Card className="bg-gradient-to-br from-green-500/20 to-green-500/5 border-green-500/30 p-3">
        <div className="flex items-center justify-between mb-2">
          <h3 className="text-white text-sm" style={{ fontWeight: 600 }}>
            Biên lợi nhuận
          </h3>
          <Badge className="bg-green-500/20 text-green-400">
            {costAnalysisData.profitMargin}%
          </Badge>
        </div>
        <div className="w-full bg-gray-700 rounded-full h-3">
          <div
            className="h-3 rounded-full bg-gradient-to-r from-green-500 to-green-400"
            style={{ width: `${costAnalysisData.profitMargin}%` }}
          />
        </div>
        <p className="text-xs text-gray-400 mt-2">
          Biên lợi nhuận tốt. Mục tiêu: 45% hoặc cao hơn.
        </p>
      </Card>
    </div>
  );

  return (
    <div className="min-h-screen bg-background pb-20">
      {/* Header */}
      <div className="sticky top-0 z-50 bg-gradient-to-br from-[#ffd700] to-[#f59e0b] p-4 rounded-b-[20px]">
        <div className="flex items-center gap-3 mb-3">
          <button
            onClick={onBack}
            className="w-9 h-9 rounded-full bg-black/10 flex items-center justify-center hover:bg-black/20"
          >
            <ArrowLeft className="w-5 h-5 text-black" />
          </button>
          <div className="flex-1">
            <h1 className="text-sm text-black" style={{ fontWeight: 700 }}>
              Báo cáo doanh thu
            </h1>
            <p className="text-xs text-black/70">Phân tích & thống kê</p>
          </div>
          <Button
            size="sm"
            className="bg-black/10 hover:bg-black/20 text-black h-8 px-3 text-xs"
            onClick={handleExportReport}
          >
            <Download className="w-3 h-3 mr-1" />
            Xuất
          </Button>
        </div>

        {/* Time Period Filter */}
        <div className="flex items-center gap-2">
          <Calendar className="w-4 h-4 text-black/70" />
          <Select value={timePeriod} onValueChange={setTimePeriod}>
            <SelectTrigger className="flex-1 bg-black/10 border-black/20 text-black h-8 text-xs">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="day">Hôm nay</SelectItem>
              <SelectItem value="week">Tuần này</SelectItem>
              <SelectItem value="month">Tháng này</SelectItem>
              <SelectItem value="quarter">Quý này</SelectItem>
              <SelectItem value="year">Năm nay</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="px-4 pt-3">
        <TabsList className="grid w-full grid-cols-5 bg-card h-auto p-1">
          <TabsTrigger value="overview" className="text-xs py-1.5">
            <PieChartIcon className="w-3 h-3 mr-1" />
            Tổng quan
          </TabsTrigger>
          <TabsTrigger value="rooms" className="text-xs py-1.5">
            <Building2 className="w-3 h-3 mr-1" />
            Phòng
          </TabsTrigger>
          <TabsTrigger value="staff" className="text-xs py-1.5">
            <Users className="w-3 h-3 mr-1" />
            Nhân viên
          </TabsTrigger>
          <TabsTrigger value="peak" className="text-xs py-1.5">
            <Clock className="w-3 h-3 mr-1" />
            Giờ
          </TabsTrigger>
          <TabsTrigger value="cost" className="text-xs py-1.5">
            <BarChart3 className="w-3 h-3 mr-1" />
            Chi phí
          </TabsTrigger>
        </TabsList>

        <ScrollArea className="h-[calc(100vh-230px)] mt-3">
          <TabsContent value="overview" className="mt-0">
            {renderOverview()}
          </TabsContent>
          <TabsContent value="rooms" className="mt-0">
            {renderRoomReport()}
          </TabsContent>
          <TabsContent value="staff" className="mt-0">
            {renderStaffReport()}
          </TabsContent>
          <TabsContent value="peak" className="mt-0">
            {renderPeakHours()}
          </TabsContent>
          <TabsContent value="cost" className="mt-0">
            {renderCostAnalysis()}
          </TabsContent>
        </ScrollArea>
      </Tabs>
    </div>
  );
}
