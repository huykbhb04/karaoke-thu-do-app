import { useState } from 'react';
import {
  ArrowLeft, Plus, Edit, Trash2, Send, Calendar, Gift, TrendingUp,
  Users, Tag, Image as ImageIcon, CheckCircle2, Clock, XCircle,
  Eye, Copy, BarChart3, PartyPopper, Bell
} from 'lucide-react';
import { Button } from '../ui/button';
import { Card } from '../ui/card';
import { Badge } from '../ui/badge';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Textarea } from '../ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '../ui/dialog';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';
import { ScrollArea } from '../ui/scroll-area';
import { Switch } from '../ui/switch';
import { BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { toast } from 'sonner@2.0.3';

interface PromotionManagementProps {
  onBack: () => void;
}

export function PromotionManagement({ onBack }: PromotionManagementProps) {
  const [activeTab, setActiveTab] = useState('active');
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [isEventDialogOpen, setIsEventDialogOpen] = useState(false);
  const [isStatsDialogOpen, setIsStatsDialogOpen] = useState(false);
  const [selectedPromotion, setSelectedPromotion] = useState<any>(null);
  const [selectedEvent, setSelectedEvent] = useState<any>(null);

  // Mock Promotions Data
  const [promotions, setPromotions] = useState([
    {
      id: 'PROMO001',
      code: 'VIP20',
      name: 'Giảm 20% phòng VIP cuối tuần',
      description: 'Áp dụng cho tất cả phòng VIP từ thứ 6 đến chủ nhật',
      discountType: 'percentage',
      discountValue: 20,
      startDate: '18/10/2025',
      endDate: '31/12/2025',
      targetCustomer: 'all',
      targetRoomType: 'vip',
      status: 'active',
      usageCount: 45,
      revenueGenerated: 125000000,
      createdBy: 'Quản lý',
      createdAt: '15/10/2025',
      approvalStatus: 'approved',
    },
    {
      id: 'PROMO002',
      code: 'HAPPY14',
      name: 'Happy Hour 14h-17h',
      description: 'Giảm 15% cho tất cả phòng trong khung giờ vàng',
      discountType: 'percentage',
      discountValue: 15,
      startDate: '20/10/2025',
      endDate: '20/11/2025',
      targetCustomer: 'all',
      targetRoomType: 'all',
      status: 'active',
      usageCount: 78,
      revenueGenerated: 89000000,
      createdBy: 'Quản lý',
      createdAt: '18/10/2025',
      approvalStatus: 'approved',
    },
    {
      id: 'PROMO003',
      code: 'HALLOWEEN30',
      name: 'Halloween Party 2025',
      description: 'Giảm 30% toàn bộ hệ thống dịp Halloween',
      discountType: 'percentage',
      discountValue: 30,
      startDate: '31/10/2025',
      endDate: '01/11/2025',
      targetCustomer: 'all',
      targetRoomType: 'all',
      status: 'upcoming',
      usageCount: 0,
      revenueGenerated: 0,
      createdBy: 'Quản lý',
      createdAt: '13/10/2025',
      approvalStatus: 'pending',
    },
    {
      id: 'PROMO004',
      code: 'SUMMER50',
      name: 'Khuyến mãi hè 2025',
      description: 'Giảm 50.000đ cho đơn từ 500.000đ',
      discountType: 'fixed',
      discountValue: 50000,
      startDate: '01/06/2025',
      endDate: '31/08/2025',
      targetCustomer: 'all',
      targetRoomType: 'all',
      status: 'expired',
      usageCount: 234,
      revenueGenerated: 450000000,
      createdBy: 'Quản lý',
      createdAt: '25/05/2025',
      approvalStatus: 'approved',
    },
  ]);

  // Mock Events Data
  const [events, setEvents] = useState([
    {
      id: 'EVT001',
      name: 'Halloween Night 2025',
      description: 'Đêm Halloween cực chất! Hóa trang nhận voucher 30%',
      startDate: '31/10/2025',
      startTime: '20:00',
      endDate: '01/11/2025',
      endTime: '02:00',
      location: 'Karaoke Thủ Đô - Trần Duy Hưng',
      image: 'https://images.unsplash.com/photo-1509557965875-b88c97052f0e?w=800',
      status: 'upcoming',
      attendees: 0,
      maxAttendees: 200,
      createdBy: 'Quản lý',
      createdAt: '13/10/2025',
    },
    {
      id: 'EVT002',
      name: 'Khai trương chi nhánh mới',
      description: 'Grand opening với nhiều ưu đãi hấp dẫn',
      startDate: '01/11/2025',
      startTime: '10:00',
      endDate: '03/11/2025',
      endTime: '22:00',
      location: 'Karaoke Thủ Đô - Láng Hạ',
      image: 'https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?w=800',
      status: 'upcoming',
      attendees: 12,
      maxAttendees: 500,
      createdBy: 'Admin',
      createdAt: '10/10/2025',
    },
    {
      id: 'EVT003',
      name: 'Đêm nhạc acoustic',
      description: 'Acoustic night với ca sĩ khách mời',
      startDate: '25/09/2025',
      startTime: '19:00',
      endDate: '25/09/2025',
      endTime: '23:00',
      location: 'Karaoke Thủ Đô - Nguyễn Huệ',
      image: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=800',
      status: 'ended',
      attendees: 156,
      maxAttendees: 150,
      createdBy: 'Quản lý',
      createdAt: '15/09/2025',
    },
  ]);

  // Mock Statistics Data
  const promotionUsageData = [
    { date: '07/10', usage: 8, revenue: 12000000 },
    { date: '08/10', usage: 12, revenue: 18000000 },
    { date: '09/10', usage: 15, revenue: 22000000 },
    { date: '10/10', usage: 18, revenue: 28000000 },
    { date: '11/10', usage: 14, revenue: 20000000 },
    { date: '12/10', usage: 20, revenue: 32000000 },
    { date: '13/10', usage: 22, revenue: 35000000 },
  ];

  const roomTypeDistribution = [
    { name: 'VIP', value: 45, color: '#ffd700' },
    { name: 'Gia đình', value: 30, color: '#9333ea' },
    { name: 'Couple', value: 15, color: '#ec4899' },
    { name: 'Thường', value: 10, color: '#3b82f6' },
  ];

  const stats = {
    activePromotions: promotions.filter(p => p.status === 'active').length,
    upcomingPromotions: promotions.filter(p => p.status === 'upcoming').length,
    totalUsage: promotions.reduce((sum, p) => sum + p.usageCount, 0),
    totalRevenue: promotions.reduce((sum, p) => sum + p.revenueGenerated, 0),
    upcomingEvents: events.filter(e => e.status === 'upcoming').length,
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'active':
        return <Badge className="bg-green-500/20 text-green-400 text-xs">Đang hoạt động</Badge>;
      case 'upcoming':
        return <Badge className="bg-blue-500/20 text-blue-400 text-xs">Sắp diễn ra</Badge>;
      case 'expired':
        return <Badge className="bg-gray-500/20 text-gray-400 text-xs">Hết hạn</Badge>;
      case 'ended':
        return <Badge className="bg-gray-500/20 text-gray-400 text-xs">Đã kết thúc</Badge>;
      default:
        return null;
    }
  };

  const getApprovalBadge = (status: string) => {
    switch (status) {
      case 'approved':
        return <Badge className="bg-green-500/20 text-green-400 text-xs">Đã duyệt</Badge>;
      case 'pending':
        return <Badge className="bg-yellow-500/20 text-yellow-400 text-xs">Chờ duyệt</Badge>;
      case 'rejected':
        return <Badge className="bg-red-500/20 text-red-400 text-xs">Từ chối</Badge>;
      default:
        return null;
    }
  };

  const handleCreatePromotion = (formData: any) => {
    const newPromo = {
      id: `PROMO${(promotions.length + 1).toString().padStart(3, '0')}`,
      ...formData,
      usageCount: 0,
      revenueGenerated: 0,
      status: 'upcoming',
      approvalStatus: 'pending',
      createdBy: 'Quản lý',
      createdAt: new Date().toLocaleDateString('vi-VN'),
    };
    setPromotions(prev => [newPromo, ...prev]);
    setIsCreateDialogOpen(false);
    toast.success('Đã tạo khuyến mãi mới', {
      description: 'Chương trình đang chờ Admin duyệt',
    });
  };

  const handleDeletePromotion = (promoId: string) => {
    if (confirm('Bạn có chắc chắn muốn xóa khuyến mãi này?')) {
      setPromotions(prev => prev.filter(p => p.id !== promoId));
      toast.success('Đã xóa khuyến mãi');
    }
  };

  const handleCopyCode = (code: string) => {
    navigator.clipboard.writeText(code);
    toast.success('Đã copy mã khuyến mãi', {
      description: code,
    });
  };

  const handleSendNotification = (promotion: any) => {
    toast.success('Đã gửi thông báo', {
      description: `Thông báo về "${promotion.name}" đã được gửi đến khách hàng`,
      icon: <Bell className="w-4 h-4" />,
    });
  };

  const handleCreateEvent = (formData: any) => {
    const newEvent = {
      id: `EVT${(events.length + 1).toString().padStart(3, '0')}`,
      ...formData,
      attendees: 0,
      status: 'upcoming',
      createdBy: 'Quản lý',
      createdAt: new Date().toLocaleDateString('vi-VN'),
    };
    setEvents(prev => [newEvent, ...prev]);
    setIsEventDialogOpen(false);
    toast.success('Đã tạo sự kiện mới');
  };

  const handleDeleteEvent = (eventId: string) => {
    if (confirm('Bạn có chắc chắn muốn xóa sự kiện này?')) {
      setEvents(prev => prev.filter(e => e.id !== eventId));
      toast.success('Đã xóa sự kiện');
    }
  };

  const renderPromotionList = (filterStatus: string) => {
    const filtered = promotions.filter(p => p.status === filterStatus);

    if (filtered.length === 0) {
      return (
        <div className="text-center py-8">
          <div className="w-16 h-16 rounded-full bg-gray-700/30 flex items-center justify-center mx-auto mb-3">
            <Gift className="w-8 h-8 text-gray-500" />
          </div>
          <p className="text-gray-400 text-sm">
            {filterStatus === 'active' ? 'Chưa có khuyến mãi đang hoạt động' :
             filterStatus === 'upcoming' ? 'Chưa có khuyến mãi sắp diễn ra' :
             'Chưa có khuyến mãi hết hạn'}
          </p>
        </div>
      );
    }

    return (
      <div className="space-y-3">
        {filtered.map((promo) => (
          <Card key={promo.id} className="bg-card border-[#ffd700]/30 p-3">
            <div className="flex items-start justify-between mb-2">
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <h3 className="text-white text-sm" style={{ fontWeight: 600 }}>
                    {promo.name}
                  </h3>
                  {getStatusBadge(promo.status)}
                </div>
                <p className="text-xs text-gray-400 line-clamp-2 mb-1">
                  {promo.description}
                </p>
                <div className="flex items-center gap-2 text-xs text-gray-500">
                  <Calendar className="w-3 h-3" />
                  <span>{promo.startDate} - {promo.endDate}</span>
                </div>
              </div>
            </div>

            {/* Promo Code */}
            <div className="flex items-center gap-2 mb-2 p-2 bg-[#1a1a24] rounded-lg">
              <Tag className="w-4 h-4 text-[#ffd700]" />
              <code className="text-[#ffd700] text-sm flex-1" style={{ fontWeight: 600 }}>
                {promo.code}
              </code>
              <button
                onClick={() => handleCopyCode(promo.code)}
                className="w-6 h-6 rounded bg-[#ffd700]/20 text-[#ffd700] flex items-center justify-center hover:bg-[#ffd700]/30"
              >
                <Copy className="w-3 h-3" />
              </button>
            </div>

            {/* Discount Info */}
            <div className="grid grid-cols-3 gap-2 mb-2 text-xs">
              <div className="text-center p-2 bg-green-500/10 rounded">
                <p className="text-green-400 mb-0.5">Giảm giá</p>
                <p className="text-white" style={{ fontWeight: 600 }}>
                  {promo.discountType === 'percentage' 
                    ? `${promo.discountValue}%` 
                    : `${(promo.discountValue / 1000).toFixed(0)}K`}
                </p>
              </div>
              <div className="text-center p-2 bg-blue-500/10 rounded">
                <p className="text-blue-400 mb-0.5">Đã dùng</p>
                <p className="text-white" style={{ fontWeight: 600 }}>{promo.usageCount}</p>
              </div>
              <div className="text-center p-2 bg-purple-500/10 rounded">
                <p className="text-purple-400 mb-0.5">Doanh thu</p>
                <p className="text-white" style={{ fontWeight: 600 }}>
                  {(promo.revenueGenerated / 1000000).toFixed(0)}M
                </p>
              </div>
            </div>

            {/* Approval Status */}
            {promo.approvalStatus === 'pending' && (
              <div className="mb-2 p-2 bg-yellow-500/10 border border-yellow-500/30 rounded">
                <p className="text-xs text-yellow-400 flex items-center gap-1">
                  <Clock className="w-3 h-3" />
                  Đang chờ Admin duyệt
                </p>
              </div>
            )}

            {/* Actions */}
            <div className="flex gap-2">
              <Button
                size="sm"
                className="flex-1 bg-blue-500/20 hover:bg-blue-500/30 text-blue-400 h-8 text-xs"
                onClick={() => {
                  setSelectedPromotion(promo);
                  setIsStatsDialogOpen(true);
                }}
              >
                <BarChart3 className="w-3 h-3 mr-1" />
                Thống kê
              </Button>
              <Button
                size="sm"
                className="flex-1 bg-[#9333ea]/20 hover:bg-[#9333ea]/30 text-[#9333ea] h-8 text-xs"
                onClick={() => handleSendNotification(promo)}
              >
                <Send className="w-3 h-3 mr-1" />
                Gửi TB
              </Button>
              {(promo.status === 'upcoming' || promo.status === 'active') && (
                <>
                  <Button
                    size="sm"
                    className="bg-[#ffd700]/20 hover:bg-[#ffd700]/30 text-[#ffd700] h-8 px-2"
                    onClick={() => {
                      setSelectedPromotion(promo);
                      setIsCreateDialogOpen(true);
                    }}
                  >
                    <Edit className="w-3 h-3" />
                  </Button>
                  <Button
                    size="sm"
                    className="bg-red-500/20 hover:bg-red-500/30 text-red-400 h-8 px-2"
                    onClick={() => handleDeletePromotion(promo.id)}
                  >
                    <Trash2 className="w-3 h-3" />
                  </Button>
                </>
              )}
            </div>
          </Card>
        ))}
      </div>
    );
  };

  const renderEventsList = () => (
    <div className="space-y-3">
      {events.map((event) => (
        <Card key={event.id} className="bg-card border-[#9333ea]/30 p-3">
          <div className="flex items-start gap-3 mb-2">
            <div className="w-20 h-20 rounded-lg overflow-hidden flex-shrink-0 bg-gray-700">
              <img
                src={event.image}
                alt={event.name}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-1">
                <h3 className="text-white text-sm truncate" style={{ fontWeight: 600 }}>
                  {event.name}
                </h3>
                {getStatusBadge(event.status)}
              </div>
              <p className="text-xs text-gray-400 line-clamp-2 mb-1">
                {event.description}
              </p>
              <div className="flex items-center gap-2 text-xs text-gray-500">
                <Calendar className="w-3 h-3" />
                <span>{event.startDate} • {event.startTime}</span>
              </div>
            </div>
          </div>

          {/* Event Info */}
          <div className="grid grid-cols-2 gap-2 mb-2 text-xs">
            <div className="p-2 bg-[#1a1a24] rounded">
              <p className="text-gray-400 mb-0.5">Địa điểm</p>
              <p className="text-white truncate">{event.location}</p>
            </div>
            <div className="p-2 bg-[#1a1a24] rounded">
              <p className="text-gray-400 mb-0.5">Tham gia</p>
              <p className="text-white">
                {event.attendees}/{event.maxAttendees}
              </p>
            </div>
          </div>

          {/* Progress Bar */}
          <div className="mb-2">
            <div className="w-full bg-gray-700 rounded-full h-1.5">
              <div
                className="h-1.5 rounded-full bg-[#9333ea]"
                style={{ width: `${(event.attendees / event.maxAttendees) * 100}%` }}
              />
            </div>
          </div>

          {/* Actions */}
          <div className="flex gap-2">
            <Button
              size="sm"
              className="flex-1 bg-[#9333ea]/20 hover:bg-[#9333ea]/30 text-[#9333ea] h-8 text-xs"
              onClick={() => handleSendNotification({ name: event.name })}
            >
              <Send className="w-3 h-3 mr-1" />
              Gửi thông báo
            </Button>
            {event.status !== 'ended' && (
              <>
                <Button
                  size="sm"
                  className="bg-[#ffd700]/20 hover:bg-[#ffd700]/30 text-[#ffd700] h-8 px-2"
                  onClick={() => {
                    setSelectedEvent(event);
                    setIsEventDialogOpen(true);
                  }}
                >
                  <Edit className="w-3 h-3" />
                </Button>
                <Button
                  size="sm"
                  className="bg-red-500/20 hover:bg-red-500/30 text-red-400 h-8 px-2"
                  onClick={() => handleDeleteEvent(event.id)}
                >
                  <Trash2 className="w-3 h-3" />
                </Button>
              </>
            )}
          </div>
        </Card>
      ))}
    </div>
  );

  return (
    <div className="min-h-screen bg-background pb-20">
      {/* Header */}
      <div className="sticky top-0 z-50 bg-gradient-to-br from-[#ec4899] to-[#9333ea] p-4 rounded-b-[20px]">
        <div className="flex items-center gap-3 mb-3">
          <button
            onClick={onBack}
            className="w-9 h-9 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20"
          >
            <ArrowLeft className="w-5 h-5 text-white" />
          </button>
          <div className="flex-1">
            <h1 className="text-sm text-white" style={{ fontWeight: 700 }}>
              Khuyến mãi & Sự kiện
            </h1>
            <p className="text-xs text-gray-200">Quản lý chương trình ưu đãi</p>
          </div>
          <Button
            size="sm"
            className="bg-white/10 hover:bg-white/20 text-white h-8 px-3 text-xs"
            onClick={() => {
              setSelectedPromotion(null);
              setIsCreateDialogOpen(true);
            }}
          >
            <Plus className="w-3 h-3 mr-1" />
            Tạo
          </Button>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-4 gap-2">
          <div className="bg-white/10 backdrop-blur-sm rounded-lg p-1.5 text-center">
            <p className="text-sm text-white" style={{ fontWeight: 700 }}>{stats.activePromotions}</p>
            <p className="text-xs text-gray-200">Đang chạy</p>
          </div>
          <div className="bg-white/10 backdrop-blur-sm rounded-lg p-1.5 text-center">
            <p className="text-sm text-white" style={{ fontWeight: 700 }}>{stats.upcomingPromotions}</p>
            <p className="text-xs text-gray-200">Sắp tới</p>
          </div>
          <div className="bg-white/10 backdrop-blur-sm rounded-lg p-1.5 text-center">
            <p className="text-sm text-white" style={{ fontWeight: 700 }}>{stats.totalUsage}</p>
            <p className="text-xs text-gray-200">Lượt dùng</p>
          </div>
          <div className="bg-white/10 backdrop-blur-sm rounded-lg p-1.5 text-center">
            <p className="text-sm text-white" style={{ fontWeight: 700 }}>
              {(stats.totalRevenue / 1000000).toFixed(0)}M
            </p>
            <p className="text-xs text-gray-200">Doanh thu</p>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="px-4 pt-3">
        <TabsList className="grid w-full grid-cols-4 bg-card h-9">
          <TabsTrigger value="active" className="text-xs">
            <CheckCircle2 className="w-3 h-3 mr-1" />
            Đang chạy
          </TabsTrigger>
          <TabsTrigger value="upcoming" className="text-xs">
            <Clock className="w-3 h-3 mr-1" />
            Sắp tới
          </TabsTrigger>
          <TabsTrigger value="expired" className="text-xs">
            <XCircle className="w-3 h-3 mr-1" />
            Hết hạn
          </TabsTrigger>
          <TabsTrigger value="events" className="text-xs">
            <PartyPopper className="w-3 h-3 mr-1" />
            Sự kiện
          </TabsTrigger>
        </TabsList>

        <ScrollArea className="h-[calc(100vh-230px)] mt-3">
          <TabsContent value="active" className="mt-0">
            {renderPromotionList('active')}
          </TabsContent>
          <TabsContent value="upcoming" className="mt-0">
            {renderPromotionList('upcoming')}
          </TabsContent>
          <TabsContent value="expired" className="mt-0">
            {renderPromotionList('expired')}
          </TabsContent>
          <TabsContent value="events" className="mt-0">
            <Button
              className="w-full mb-3 bg-[#9333ea] hover:bg-[#7c3aed] text-white h-10"
              onClick={() => {
                setSelectedEvent(null);
                setIsEventDialogOpen(true);
              }}
            >
              <PartyPopper className="w-4 h-4 mr-2" />
              Tạo sự kiện mới
            </Button>
            {renderEventsList()}
          </TabsContent>
        </ScrollArea>
      </Tabs>

      {/* Create/Edit Promotion Dialog */}
      <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
        <CreatePromotionDialog
          promotion={selectedPromotion}
          onSave={handleCreatePromotion}
          onClose={() => {
            setIsCreateDialogOpen(false);
            setSelectedPromotion(null);
          }}
        />
      </Dialog>

      {/* Create/Edit Event Dialog */}
      <Dialog open={isEventDialogOpen} onOpenChange={setIsEventDialogOpen}>
        <CreateEventDialog
          event={selectedEvent}
          onSave={handleCreateEvent}
          onClose={() => {
            setIsEventDialogOpen(false);
            setSelectedEvent(null);
          }}
        />
      </Dialog>

      {/* Statistics Dialog */}
      <Dialog open={isStatsDialogOpen} onOpenChange={setIsStatsDialogOpen}>
        {selectedPromotion && (
          <PromotionStatsDialog
            promotion={selectedPromotion}
            usageData={promotionUsageData}
            roomTypeData={roomTypeDistribution}
            onClose={() => {
              setIsStatsDialogOpen(false);
              setSelectedPromotion(null);
            }}
          />
        )}
      </Dialog>
    </div>
  );
}

// Create Promotion Dialog Component
function CreatePromotionDialog({ promotion, onSave, onClose }: any) {
  const [formData, setFormData] = useState(
    promotion || {
      name: '',
      code: '',
      description: '',
      discountType: 'percentage',
      discountValue: 0,
      startDate: '',
      endDate: '',
      targetCustomer: 'all',
      targetRoomType: 'all',
    }
  );

  const handleSubmit = () => {
    if (!formData.name || !formData.code || !formData.startDate || !formData.endDate) {
      toast.error('Vui lòng điền đầy đủ thông tin');
      return;
    }
    onSave(formData);
  };

  return (
    <DialogContent className="bg-card border-[#ec4899]/30 text-white w-[90vw] max-w-[400px]" aria-describedby={undefined}>
      <DialogHeader>
        <DialogTitle>{promotion ? 'Chỉnh sửa khuyến mãi' : 'Tạo khuyến mãi mới'}</DialogTitle>
      </DialogHeader>

      <ScrollArea className="max-h-[60vh]">
        <div className="space-y-3 py-3 pr-3">
          <div>
            <Label className="text-xs text-gray-400 mb-1 block">Tên chương trình *</Label>
            <Input
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="bg-[#1a1a24] border-gray-700 text-white h-9 text-sm"
              placeholder="VD: Giảm 20% cuối tuần"
            />
          </div>

          <div>
            <Label className="text-xs text-gray-400 mb-1 block">Mã khuyến mãi *</Label>
            <Input
              value={formData.code}
              onChange={(e) => setFormData({ ...formData, code: e.target.value.toUpperCase() })}
              className="bg-[#1a1a24] border-gray-700 text-white h-9 text-sm"
              placeholder="VD: VIP20"
            />
          </div>

          <div>
            <Label className="text-xs text-gray-400 mb-1 block">Mô tả</Label>
            <Textarea
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              className="bg-[#1a1a24] border-gray-700 text-white text-sm min-h-[60px]"
              placeholder="Mô tả chi tiết chương trình..."
            />
          </div>

          <div className="grid grid-cols-2 gap-2">
            <div>
              <Label className="text-xs text-gray-400 mb-1 block">Loại giảm giá *</Label>
              <Select
                value={formData.discountType}
                onValueChange={(value) => setFormData({ ...formData, discountType: value })}
              >
                <SelectTrigger className="bg-[#1a1a24] border-gray-700 h-9 text-sm">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="percentage">Giảm %</SelectItem>
                  <SelectItem value="fixed">Giảm số tiền</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label className="text-xs text-gray-400 mb-1 block">Giá trị *</Label>
              <Input
                type="number"
                value={formData.discountValue}
                onChange={(e) => setFormData({ ...formData, discountValue: parseInt(e.target.value) })}
                className="bg-[#1a1a24] border-gray-700 text-white h-9 text-sm"
                placeholder={formData.discountType === 'percentage' ? '20' : '50000'}
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-2">
            <div>
              <Label className="text-xs text-gray-400 mb-1 block">Từ ngày *</Label>
              <Input
                type="date"
                value={formData.startDate}
                onChange={(e) => setFormData({ ...formData, startDate: e.target.value })}
                className="bg-[#1a1a24] border-gray-700 text-white h-9 text-sm"
              />
            </div>

            <div>
              <Label className="text-xs text-gray-400 mb-1 block">Đến ngày *</Label>
              <Input
                type="date"
                value={formData.endDate}
                onChange={(e) => setFormData({ ...formData, endDate: e.target.value })}
                className="bg-[#1a1a24] border-gray-700 text-white h-9 text-sm"
              />
            </div>
          </div>

          <div>
            <Label className="text-xs text-gray-400 mb-1 block">Đối tượng khách hàng</Label>
            <Select
              value={formData.targetCustomer}
              onValueChange={(value) => setFormData({ ...formData, targetCustomer: value })}
            >
              <SelectTrigger className="bg-[#1a1a24] border-gray-700 h-9 text-sm">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Tất cả khách hàng</SelectItem>
                <SelectItem value="vip">Khách VIP</SelectItem>
                <SelectItem value="new">Khách hàng mới</SelectItem>
                <SelectItem value="loyal">Khách thân thiết</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label className="text-xs text-gray-400 mb-1 block">Loại phòng áp dụng</Label>
            <Select
              value={formData.targetRoomType}
              onValueChange={(value) => setFormData({ ...formData, targetRoomType: value })}
            >
              <SelectTrigger className="bg-[#1a1a24] border-gray-700 h-9 text-sm">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Tất cả phòng</SelectItem>
                <SelectItem value="vip">Chỉ VIP</SelectItem>
                <SelectItem value="family">Chỉ Gia đình</SelectItem>
                <SelectItem value="couple">Chỉ Couple</SelectItem>
                <SelectItem value="standard">Chỉ Thường</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </ScrollArea>

      <DialogFooter className="gap-2 sm:gap-0">
        <Button
          variant="outline"
          className="bg-gray-700 hover:bg-gray-600 text-white border-gray-600 h-9 text-sm"
          onClick={onClose}
        >
          Hủy
        </Button>
        <Button
          className="bg-[#ec4899] hover:bg-[#db2777] text-white h-9 text-sm"
          onClick={handleSubmit}
        >
          {promotion ? 'Cập nhật' : 'Tạo & Gửi duyệt'}
        </Button>
      </DialogFooter>
    </DialogContent>
  );
}

// Create Event Dialog Component
function CreateEventDialog({ event, onSave, onClose }: any) {
  const [formData, setFormData] = useState(
    event || {
      name: '',
      description: '',
      startDate: '',
      startTime: '',
      endDate: '',
      endTime: '',
      location: 'Karaoke Thủ Đô - Trần Duy Hưng',
      image: '',
      maxAttendees: 100,
    }
  );

  const handleSubmit = () => {
    if (!formData.name || !formData.startDate || !formData.startTime) {
      toast.error('Vui lòng điền đầy đủ thông tin');
      return;
    }
    onSave(formData);
  };

  return (
    <DialogContent className="bg-card border-[#9333ea]/30 text-white w-[90vw] max-w-[400px]" aria-describedby={undefined}>
      <DialogHeader>
        <DialogTitle>{event ? 'Chỉnh sửa sự kiện' : 'Tạo sự kiện mới'}</DialogTitle>
      </DialogHeader>

      <ScrollArea className="max-h-[60vh]">
        <div className="space-y-3 py-3 pr-3">
          <div>
            <Label className="text-xs text-gray-400 mb-1 block">Tên sự kiện *</Label>
            <Input
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="bg-[#1a1a24] border-gray-700 text-white h-9 text-sm"
              placeholder="VD: Halloween Night 2025"
            />
          </div>

          <div>
            <Label className="text-xs text-gray-400 mb-1 block">Mô tả</Label>
            <Textarea
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              className="bg-[#1a1a24] border-gray-700 text-white text-sm min-h-[60px]"
              placeholder="Mô tả chi tiết sự kiện..."
            />
          </div>

          <div className="grid grid-cols-2 gap-2">
            <div>
              <Label className="text-xs text-gray-400 mb-1 block">Ngày bắt đầu *</Label>
              <Input
                type="date"
                value={formData.startDate}
                onChange={(e) => setFormData({ ...formData, startDate: e.target.value })}
                className="bg-[#1a1a24] border-gray-700 text-white h-9 text-sm"
              />
            </div>

            <div>
              <Label className="text-xs text-gray-400 mb-1 block">Giờ bắt đầu *</Label>
              <Input
                type="time"
                value={formData.startTime}
                onChange={(e) => setFormData({ ...formData, startTime: e.target.value })}
                className="bg-[#1a1a24] border-gray-700 text-white h-9 text-sm"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-2">
            <div>
              <Label className="text-xs text-gray-400 mb-1 block">Ngày kết thúc</Label>
              <Input
                type="date"
                value={formData.endDate}
                onChange={(e) => setFormData({ ...formData, endDate: e.target.value })}
                className="bg-[#1a1a24] border-gray-700 text-white h-9 text-sm"
              />
            </div>

            <div>
              <Label className="text-xs text-gray-400 mb-1 block">Giờ kết thúc</Label>
              <Input
                type="time"
                value={formData.endTime}
                onChange={(e) => setFormData({ ...formData, endTime: e.target.value })}
                className="bg-[#1a1a24] border-gray-700 text-white h-9 text-sm"
              />
            </div>
          </div>

          <div>
            <Label className="text-xs text-gray-400 mb-1 block">Địa điểm</Label>
            <Select
              value={formData.location}
              onValueChange={(value) => setFormData({ ...formData, location: value })}
            >
              <SelectTrigger className="bg-[#1a1a24] border-gray-700 h-9 text-sm">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Karaoke Thủ Đô - Trần Duy Hưng">Trần Duy Hưng</SelectItem>
                <SelectItem value="Karaoke Thủ Đô - Nguyễn Huệ">Nguyễn Huệ</SelectItem>
                <SelectItem value="Karaoke Thủ Đô - Láng Hạ">Láng Hạ</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label className="text-xs text-gray-400 mb-1 block">Số lượng tối đa</Label>
            <Input
              type="number"
              value={formData.maxAttendees}
              onChange={(e) => setFormData({ ...formData, maxAttendees: parseInt(e.target.value) })}
              className="bg-[#1a1a24] border-gray-700 text-white h-9 text-sm"
              placeholder="100"
            />
          </div>

          <div>
            <Label className="text-xs text-gray-400 mb-1 block">Hình ảnh poster (URL)</Label>
            <Input
              value={formData.image}
              onChange={(e) => setFormData({ ...formData, image: e.target.value })}
              className="bg-[#1a1a24] border-gray-700 text-white h-9 text-sm"
              placeholder="https://..."
            />
          </div>
        </div>
      </ScrollArea>

      <DialogFooter className="gap-2 sm:gap-0">
        <Button
          variant="outline"
          className="bg-gray-700 hover:bg-gray-600 text-white border-gray-600 h-9 text-sm"
          onClick={onClose}
        >
          Hủy
        </Button>
        <Button
          className="bg-[#9333ea] hover:bg-[#7c3aed] text-white h-9 text-sm"
          onClick={handleSubmit}
        >
          {event ? 'Cập nhật' : 'Tạo sự kiện'}
        </Button>
      </DialogFooter>
    </DialogContent>
  );
}

// Promotion Statistics Dialog Component
function PromotionStatsDialog({ promotion, usageData, roomTypeData, onClose }: any) {
  const growthRate = ((promotion.revenueGenerated / 100000000) * 100).toFixed(1);

  return (
    <DialogContent className="bg-card border-[#ffd700]/30 text-white w-[90vw] max-w-[420px]" aria-describedby={undefined}>
      <DialogHeader>
        <DialogTitle className="text-sm">Thống kê hiệu quả</DialogTitle>
      </DialogHeader>

      <ScrollArea className="max-h-[65vh]">
        <div className="space-y-3 py-3 pr-3">
          {/* Summary */}
          <Card className="bg-gradient-to-br from-[#ffd700]/20 to-[#9333ea]/20 border-[#ffd700]/50 p-3">
            <h3 className="text-white text-sm mb-2" style={{ fontWeight: 600 }}>
              {promotion.name}
            </h3>
            <div className="grid grid-cols-3 gap-2 text-xs">
              <div className="text-center">
                <p className="text-gray-400 mb-0.5">Lượt dùng</p>
                <p className="text-white" style={{ fontWeight: 600 }}>{promotion.usageCount}</p>
              </div>
              <div className="text-center">
                <p className="text-gray-400 mb-0.5">Doanh thu</p>
                <p className="text-[#ffd700]" style={{ fontWeight: 600 }}>
                  {(promotion.revenueGenerated / 1000000).toFixed(0)}M
                </p>
              </div>
              <div className="text-center">
                <p className="text-gray-400 mb-0.5">Tăng trưởng</p>
                <p className="text-green-400" style={{ fontWeight: 600 }}>+{growthRate}%</p>
              </div>
            </div>
          </Card>

          {/* Usage Trend Chart */}
          <Card className="bg-card border-blue-500/30 p-3">
            <h3 className="text-white text-xs mb-2" style={{ fontWeight: 600 }}>
              Lượt sử dụng theo ngày
            </h3>
            <div className="h-40">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={usageData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#333" />
                  <XAxis dataKey="date" stroke="#888" style={{ fontSize: '10px' }} />
                  <YAxis stroke="#888" style={{ fontSize: '10px' }} />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: '#1a1a24',
                      border: '1px solid #3b82f6',
                      borderRadius: '8px',
                      fontSize: '10px',
                    }}
                  />
                  <Bar dataKey="usage" fill="#3b82f6" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </Card>

          {/* Room Type Distribution */}
          <Card className="bg-card border-[#9333ea]/30 p-3">
            <h3 className="text-white text-xs mb-2" style={{ fontWeight: 600 }}>
              Phân bố theo loại phòng
            </h3>
            <div className="h-32">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={roomTypeData}
                    cx="50%"
                    cy="50%"
                    innerRadius={25}
                    outerRadius={45}
                    dataKey="value"
                    label={({ percentage }) => `${percentage}%`}
                    labelStyle={{ fontSize: '10px', fill: '#fff' }}
                  >
                    {roomTypeData.map((entry: any, index: number) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip
                    contentStyle={{
                      backgroundColor: '#1a1a24',
                      border: '1px solid #9333ea',
                      borderRadius: '8px',
                      fontSize: '10px',
                    }}
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="grid grid-cols-2 gap-2 mt-2">
              {roomTypeData.map((item: any) => (
                <div key={item.name} className="flex items-center gap-1.5 text-xs">
                  <div className="w-2.5 h-2.5 rounded" style={{ backgroundColor: item.color }} />
                  <span className="text-white">{item.name}: {item.value}%</span>
                </div>
              ))}
            </div>
          </Card>

          {/* Growth Analysis */}
          <Card className="bg-gradient-to-br from-green-500/20 to-green-500/5 border-green-500/30 p-3">
            <h3 className="text-white text-xs mb-2" style={{ fontWeight: 600 }}>
              Phân tích hiệu quả
            </h3>
            <div className="space-y-2 text-xs">
              <div className="flex items-center justify-between">
                <span className="text-gray-400">Hiệu suất:</span>
                <Badge className="bg-green-500/20 text-green-400">Tốt</Badge>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-gray-400">Tăng trưởng vs kỳ trước:</span>
                <span className="text-green-400" style={{ fontWeight: 600 }}>+{growthRate}%</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-gray-400">Conversion rate:</span>
                <span className="text-white" style={{ fontWeight: 600 }}>
                  {((promotion.usageCount / 500) * 100).toFixed(1)}%
                </span>
              </div>
            </div>
          </Card>
        </div>
      </ScrollArea>

      <Button
        className="w-full bg-gray-700 hover:bg-gray-600 text-white h-9 text-sm"
        onClick={onClose}
      >
        Đóng
      </Button>
    </DialogContent>
  );
}
