import { useState } from 'react';
import { ArrowLeft, Settings, DollarSign, Clock, Package, AlertCircle, Save } from 'lucide-react';
import { Button } from '../ui/button';
import { Card } from '../ui/card';
import { Badge } from '../ui/badge';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { Switch } from '../ui/switch';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';
import { ScrollArea } from '../ui/scroll-area';
import { toast } from 'sonner@2.0.3';

interface SystemConfigProps {
  onBack: () => void;
}

export function SystemConfig({ onBack }: SystemConfigProps) {
  const [activeTab, setActiveTab] = useState('room-types');
  const [hasChanges, setHasChanges] = useState(false);

  // Room Types
  const [roomTypes, setRoomTypes] = useState([
    { id: 'RT001', name: 'Phòng Thường', capacity: '4-6 người', basePrice: 150000, icon: '🎤', status: 'active' },
    { id: 'RT002', name: 'Phòng VIP', capacity: '15-20 người', basePrice: 450000, icon: '👑', status: 'active' },
    { id: 'RT003', name: 'Phòng Family', capacity: '8-10 người', basePrice: 280000, icon: '👨‍👩‍👧‍👦', status: 'active' },
    { id: 'RT004', name: 'Phòng Couple', capacity: '2-4 người', basePrice: 250000, icon: '💑', status: 'active' },
    { id: 'RT005', name: 'Phòng Party', capacity: '20-30 người', basePrice: 600000, icon: '🎉', status: 'active' },
  ]);

  // Service Categories
  const [serviceCategories, setServiceCategories] = useState([
    { id: 'SC001', name: 'Đồ uống', icon: '🍹', count: 45, status: 'active' },
    { id: 'SC002', name: 'Thức ăn', icon: '🍱', count: 32, status: 'active' },
    { id: 'SC003', name: 'Snack', icon: '🍿', count: 28, status: 'active' },
    { id: 'SC004', name: 'Trái cây', icon: '🍎', count: 15, status: 'active' },
    { id: 'SC005', name: 'Dịch vụ đặc biệt', icon: '⭐', count: 8, status: 'active' },
  ]);

  // Booking Policies
  const [bookingPolicies, setBookingPolicies] = useState({
    minBookingHours: 2,
    maxBookingHours: 8,
    advanceBookingDays: 30,
    cancelHours: 2,
    depositPercent: 30,
    peakHourStart: '19:00',
    peakHourEnd: '23:00',
    peakHourSurcharge: 20,
    weekendSurcharge: 15,
    holidaySurcharge: 30,
  });

  // Pricing Settings
  const [pricingSettings, setPricingSettings] = useState({
    vat: 10,
    serviceCharge: 5,
    overtimeFee: 50000,
    lateCheckoutFee: 100000,
    earlyCheckoutRefund: false,
    groupDiscount: 10,
    memberDiscount: 15,
    vipDiscount: 20,
  });

  // System Settings
  const [systemSettings, setSystemSettings] = useState({
    systemName: 'Karaoke Thủ Đô',
    defaultOpenTime: '10:00',
    defaultCloseTime: '02:00',
    timezone: 'Asia/Ho_Chi_Minh',
    currency: 'VND',
    language: 'vi',
    maintenanceMode: false,
    allowOnlineBooking: true,
    requireDeposit: true,
    autoConfirmBooking: false,
  });

  const handleSaveChanges = () => {
    // Save all changes
    toast.success('Đã lưu cấu hình hệ thống');
    setHasChanges(false);
  };

  const renderRoomTypes = () => (
    <div className="space-y-3">
      {roomTypes.map((type) => (
        <Card key={type.id} className="bg-card border-blue-500/30 p-4">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-xl bg-blue-500/20 flex items-center justify-center text-2xl flex-shrink-0">
              {type.icon}
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-1">
                <h3 className="text-white text-sm" style={{ fontWeight: 600 }}>
                  {type.name}
                </h3>
                <Badge className={`${
                  type.status === 'active' ? 'bg-green-500/20 text-green-400' : 'bg-gray-500/20 text-gray-400'
                } text-xs px-1.5 py-0 h-auto`}>
                  {type.status === 'active' ? 'Active' : 'Inactive'}
                </Badge>
              </div>
              <p className="text-xs text-gray-400">{type.capacity}</p>
              <p className="text-xs text-[#ffd700] mt-1" style={{ fontWeight: 600 }}>
                {type.basePrice.toLocaleString('vi-VN')}đ/giờ
              </p>
            </div>
          </div>
        </Card>
      ))}
    </div>
  );

  const renderServiceCategories = () => (
    <div className="space-y-3">
      {serviceCategories.map((cat) => (
        <Card key={cat.id} className="bg-card border-amber-500/30 p-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-amber-500/20 flex items-center justify-center text-xl flex-shrink-0">
              {cat.icon}
            </div>
            <div className="flex-1">
              <h3 className="text-white text-sm mb-1" style={{ fontWeight: 600 }}>
                {cat.name}
              </h3>
              <p className="text-xs text-gray-400">{cat.count} sản phẩm</p>
            </div>
            <Badge className="bg-green-500/20 text-green-400 text-xs">
              Active
            </Badge>
          </div>
        </Card>
      ))}
    </div>
  );

  const renderBookingPolicies = () => (
    <div className="space-y-3">
      <Card className="bg-card border-[#ffd700]/30 p-4">
        <h3 className="text-white text-sm mb-3" style={{ fontWeight: 600 }}>
          Chính sách đặt phòng
        </h3>
        <div className="space-y-3">
          <div className="grid grid-cols-2 gap-3">
            <div>
              <Label className="text-xs text-gray-400 mb-1 block">Tối thiểu (giờ)</Label>
              <Input
                type="number"
                value={bookingPolicies.minBookingHours}
                onChange={(e) => {
                  setBookingPolicies({ ...bookingPolicies, minBookingHours: parseInt(e.target.value) || 0 });
                  setHasChanges(true);
                }}
                className="bg-[#1a1a24] border-gray-700 text-white h-9 text-sm"
              />
            </div>
            <div>
              <Label className="text-xs text-gray-400 mb-1 block">Tối đa (giờ)</Label>
              <Input
                type="number"
                value={bookingPolicies.maxBookingHours}
                onChange={(e) => {
                  setBookingPolicies({ ...bookingPolicies, maxBookingHours: parseInt(e.target.value) || 0 });
                  setHasChanges(true);
                }}
                className="bg-[#1a1a24] border-gray-700 text-white h-9 text-sm"
              />
            </div>
          </div>

          <div>
            <Label className="text-xs text-gray-400 mb-1 block">Đặt trước tối đa (ngày)</Label>
            <Input
              type="number"
              value={bookingPolicies.advanceBookingDays}
              onChange={(e) => {
                setBookingPolicies({ ...bookingPolicies, advanceBookingDays: parseInt(e.target.value) || 0 });
                setHasChanges(true);
              }}
              className="bg-[#1a1a24] border-gray-700 text-white h-9 text-sm"
            />
          </div>

          <div>
            <Label className="text-xs text-gray-400 mb-1 block">Hủy miễn phí trước (giờ)</Label>
            <Input
              type="number"
              value={bookingPolicies.cancelHours}
              onChange={(e) => {
                setBookingPolicies({ ...bookingPolicies, cancelHours: parseInt(e.target.value) || 0 });
                setHasChanges(true);
              }}
              className="bg-[#1a1a24] border-gray-700 text-white h-9 text-sm"
            />
          </div>

          <div>
            <Label className="text-xs text-gray-400 mb-1 block">Đặt cọc (%)</Label>
            <Input
              type="number"
              value={bookingPolicies.depositPercent}
              onChange={(e) => {
                setBookingPolicies({ ...bookingPolicies, depositPercent: parseInt(e.target.value) || 0 });
                setHasChanges(true);
              }}
              className="bg-[#1a1a24] border-gray-700 text-white h-9 text-sm"
            />
          </div>
        </div>
      </Card>

      <Card className="bg-card border-pink-500/30 p-4">
        <h3 className="text-white text-sm mb-3" style={{ fontWeight: 600 }}>
          Phụ thu giờ cao điểm
        </h3>
        <div className="space-y-3">
          <div className="grid grid-cols-2 gap-3">
            <div>
              <Label className="text-xs text-gray-400 mb-1 block">Giờ bắt đầu</Label>
              <Input
                type="time"
                value={bookingPolicies.peakHourStart}
                onChange={(e) => {
                  setBookingPolicies({ ...bookingPolicies, peakHourStart: e.target.value });
                  setHasChanges(true);
                }}
                className="bg-[#1a1a24] border-gray-700 text-white h-9 text-sm"
              />
            </div>
            <div>
              <Label className="text-xs text-gray-400 mb-1 block">Giờ kết thúc</Label>
              <Input
                type="time"
                value={bookingPolicies.peakHourEnd}
                onChange={(e) => {
                  setBookingPolicies({ ...bookingPolicies, peakHourEnd: e.target.value });
                  setHasChanges(true);
                }}
                className="bg-[#1a1a24] border-gray-700 text-white h-9 text-sm"
              />
            </div>
          </div>

          <div>
            <Label className="text-xs text-gray-400 mb-1 block">Phụ thu cao điểm (%)</Label>
            <Input
              type="number"
              value={bookingPolicies.peakHourSurcharge}
              onChange={(e) => {
                setBookingPolicies({ ...bookingPolicies, peakHourSurcharge: parseInt(e.target.value) || 0 });
                setHasChanges(true);
              }}
              className="bg-[#1a1a24] border-gray-700 text-white h-9 text-sm"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <Label className="text-xs text-gray-400 mb-1 block">Cuối tuần (%)</Label>
              <Input
                type="number"
                value={bookingPolicies.weekendSurcharge}
                onChange={(e) => {
                  setBookingPolicies({ ...bookingPolicies, weekendSurcharge: parseInt(e.target.value) || 0 });
                  setHasChanges(true);
                }}
                className="bg-[#1a1a24] border-gray-700 text-white h-9 text-sm"
              />
            </div>
            <div>
              <Label className="text-xs text-gray-400 mb-1 block">Lễ tết (%)</Label>
              <Input
                type="number"
                value={bookingPolicies.holidaySurcharge}
                onChange={(e) => {
                  setBookingPolicies({ ...bookingPolicies, holidaySurcharge: parseInt(e.target.value) || 0 });
                  setHasChanges(true);
                }}
                className="bg-[#1a1a24] border-gray-700 text-white h-9 text-sm"
              />
            </div>
          </div>
        </div>
      </Card>
    </div>
  );

  const renderPricingSettings = () => (
    <div className="space-y-3">
      <Card className="bg-card border-[#9333ea]/30 p-4">
        <h3 className="text-white text-sm mb-3" style={{ fontWeight: 600 }}>
          Thuế & phí dịch vụ
        </h3>
        <div className="space-y-3">
          <div className="grid grid-cols-2 gap-3">
            <div>
              <Label className="text-xs text-gray-400 mb-1 block">VAT (%)</Label>
              <Input
                type="number"
                value={pricingSettings.vat}
                onChange={(e) => {
                  setPricingSettings({ ...pricingSettings, vat: parseInt(e.target.value) || 0 });
                  setHasChanges(true);
                }}
                className="bg-[#1a1a24] border-gray-700 text-white h-9 text-sm"
              />
            </div>
            <div>
              <Label className="text-xs text-gray-400 mb-1 block">Phí phục vụ (%)</Label>
              <Input
                type="number"
                value={pricingSettings.serviceCharge}
                onChange={(e) => {
                  setPricingSettings({ ...pricingSettings, serviceCharge: parseInt(e.target.value) || 0 });
                  setHasChanges(true);
                }}
                className="bg-[#1a1a24] border-gray-700 text-white h-9 text-sm"
              />
            </div>
          </div>

          <div>
            <Label className="text-xs text-gray-400 mb-1 block">Phí quá giờ (đ/h)</Label>
            <Input
              type="number"
              value={pricingSettings.overtimeFee}
              onChange={(e) => {
                setPricingSettings({ ...pricingSettings, overtimeFee: parseInt(e.target.value) || 0 });
                setHasChanges(true);
              }}
              className="bg-[#1a1a24] border-gray-700 text-white h-9 text-sm"
            />
          </div>
        </div>
      </Card>

      <Card className="bg-card border-green-500/30 p-4">
        <h3 className="text-white text-sm mb-3" style={{ fontWeight: 600 }}>
          Giảm giá theo hạng khách
        </h3>
        <div className="space-y-3">
          <div>
            <Label className="text-xs text-gray-400 mb-1 block">Khách nhóm (%)</Label>
            <Input
              type="number"
              value={pricingSettings.groupDiscount}
              onChange={(e) => {
                setPricingSettings({ ...pricingSettings, groupDiscount: parseInt(e.target.value) || 0 });
                setHasChanges(true);
              }}
              className="bg-[#1a1a24] border-gray-700 text-white h-9 text-sm"
            />
          </div>
          <div>
            <Label className="text-xs text-gray-400 mb-1 block">Member (%)</Label>
            <Input
              type="number"
              value={pricingSettings.memberDiscount}
              onChange={(e) => {
                setPricingSettings({ ...pricingSettings, memberDiscount: parseInt(e.target.value) || 0 });
                setHasChanges(true);
              }}
              className="bg-[#1a1a24] border-gray-700 text-white h-9 text-sm"
            />
          </div>
          <div>
            <Label className="text-xs text-gray-400 mb-1 block">VIP (%)</Label>
            <Input
              type="number"
              value={pricingSettings.vipDiscount}
              onChange={(e) => {
                setPricingSettings({ ...pricingSettings, vipDiscount: parseInt(e.target.value) || 0 });
                setHasChanges(true);
              }}
              className="bg-[#1a1a24] border-gray-700 text-white h-9 text-sm"
            />
          </div>
        </div>
      </Card>
    </div>
  );

  const renderSystemSettings = () => (
    <div className="space-y-3">
      <Card className="bg-card border-[#ffd700]/30 p-4">
        <h3 className="text-white text-sm mb-3" style={{ fontWeight: 600 }}>
          Cài đặt chung
        </h3>
        <div className="space-y-3">
          <div>
            <Label className="text-xs text-gray-400 mb-1 block">Tên hệ thống</Label>
            <Input
              value={systemSettings.systemName}
              onChange={(e) => {
                setSystemSettings({ ...systemSettings, systemName: e.target.value });
                setHasChanges(true);
              }}
              className="bg-[#1a1a24] border-gray-700 text-white h-9 text-sm"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <Label className="text-xs text-gray-400 mb-1 block">Giờ mở cửa mặc định</Label>
              <Input
                type="time"
                value={systemSettings.defaultOpenTime}
                onChange={(e) => {
                  setSystemSettings({ ...systemSettings, defaultOpenTime: e.target.value });
                  setHasChanges(true);
                }}
                className="bg-[#1a1a24] border-gray-700 text-white h-9 text-sm"
              />
            </div>
            <div>
              <Label className="text-xs text-gray-400 mb-1 block">Giờ đóng cửa mặc định</Label>
              <Input
                type="time"
                value={systemSettings.defaultCloseTime}
                onChange={(e) => {
                  setSystemSettings({ ...systemSettings, defaultCloseTime: e.target.value });
                  setHasChanges(true);
                }}
                className="bg-[#1a1a24] border-gray-700 text-white h-9 text-sm"
              />
            </div>
          </div>

          <div>
            <Label className="text-xs text-gray-400 mb-1 block">Múi giờ</Label>
            <Select
              value={systemSettings.timezone}
              onValueChange={(value) => {
                setSystemSettings({ ...systemSettings, timezone: value });
                setHasChanges(true);
              }}
            >
              <SelectTrigger className="bg-[#1a1a24] border-gray-700 h-9 text-sm">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Asia/Ho_Chi_Minh">Việt Nam (GMT+7)</SelectItem>
                <SelectItem value="Asia/Bangkok">Bangkok (GMT+7)</SelectItem>
                <SelectItem value="Asia/Singapore">Singapore (GMT+8)</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </Card>

      <Card className="bg-card border-[#9333ea]/30 p-4">
        <h3 className="text-white text-sm mb-3" style={{ fontWeight: 600 }}>
          Chức năng
        </h3>
        <div className="space-y-3">
          <div className="flex items-center justify-between py-2">
            <div>
              <p className="text-sm text-white" style={{ fontWeight: 600 }}>Chế độ bảo trì</p>
              <p className="text-xs text-gray-400">Tạm khóa truy cập hệ thống</p>
            </div>
            <Switch
              checked={systemSettings.maintenanceMode}
              onCheckedChange={(checked) => {
                setSystemSettings({ ...systemSettings, maintenanceMode: checked });
                setHasChanges(true);
              }}
            />
          </div>

          <div className="flex items-center justify-between py-2 border-t border-gray-700/50">
            <div>
              <p className="text-sm text-white" style={{ fontWeight: 600 }}>Đặt phòng online</p>
              <p className="text-xs text-gray-400">Cho phép khách đặt qua web/app</p>
            </div>
            <Switch
              checked={systemSettings.allowOnlineBooking}
              onCheckedChange={(checked) => {
                setSystemSettings({ ...systemSettings, allowOnlineBooking: checked });
                setHasChanges(true);
              }}
            />
          </div>

          <div className="flex items-center justify-between py-2 border-t border-gray-700/50">
            <div>
              <p className="text-sm text-white" style={{ fontWeight: 600 }}>Bắt buộc đặt cọc</p>
              <p className="text-xs text-gray-400">Yêu cầu cọc khi đặt phòng</p>
            </div>
            <Switch
              checked={systemSettings.requireDeposit}
              onCheckedChange={(checked) => {
                setSystemSettings({ ...systemSettings, requireDeposit: checked });
                setHasChanges(true);
              }}
            />
          </div>

          <div className="flex items-center justify-between py-2 border-t border-gray-700/50">
            <div>
              <p className="text-sm text-white" style={{ fontWeight: 600 }}>Tự động xác nhận</p>
              <p className="text-xs text-gray-400">Không cần duyệt thủ công</p>
            </div>
            <Switch
              checked={systemSettings.autoConfirmBooking}
              onCheckedChange={(checked) => {
                setSystemSettings({ ...systemSettings, autoConfirmBooking: checked });
                setHasChanges(true);
              }}
            />
          </div>
        </div>
      </Card>
    </div>
  );

  return (
    <div className="min-h-screen bg-background pb-20">
      {/* Header */}
      <div className="sticky top-0 z-50 bg-gradient-to-br from-blue-500 to-blue-700 p-4 rounded-b-[20px]">
        <div className="flex items-center gap-3 mb-3">
          <button
            onClick={onBack}
            className="w-9 h-9 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20"
          >
            <ArrowLeft className="w-5 h-5 text-white" />
          </button>
          <div className="flex-1">
            <h1 className="text-sm text-white" style={{ fontWeight: 700 }}>
              Cấu hình hệ thống
            </h1>
            <p className="text-xs text-gray-200">Loại phòng, dịch vụ, chính sách</p>
          </div>
          {hasChanges && (
            <Button
              size="sm"
              className="bg-[#ffd700] hover:bg-[#ffed4e] text-black h-8 rounded-full px-3"
              onClick={handleSaveChanges}
            >
              <Save className="w-4 h-4 mr-1" />
              <span className="text-xs">Lưu</span>
            </Button>
          )}
        </div>

        {hasChanges && (
          <div className="bg-amber-500/20 border border-amber-500/30 rounded-lg p-2 flex items-center gap-2">
            <AlertCircle className="w-4 h-4 text-amber-400 flex-shrink-0" />
            <p className="text-xs text-amber-300">Có thay đổi chưa lưu</p>
          </div>
        )}
      </div>

      {/* Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="px-4 pt-3">
        <TabsList className="grid w-full grid-cols-4 bg-card h-9">
          <TabsTrigger value="room-types" className="text-xs">Phòng</TabsTrigger>
          <TabsTrigger value="services" className="text-xs">Dịch vụ</TabsTrigger>
          <TabsTrigger value="policies" className="text-xs">Chính sách</TabsTrigger>
          <TabsTrigger value="system" className="text-xs">Hệ thống</TabsTrigger>
        </TabsList>

        <ScrollArea className="h-[calc(100vh-200px)] mt-3">
          <TabsContent value="room-types" className="mt-0">
            {renderRoomTypes()}
          </TabsContent>
          <TabsContent value="services" className="mt-0">
            {renderServiceCategories()}
          </TabsContent>
          <TabsContent value="policies" className="mt-0">
            {renderBookingPolicies()}
          </TabsContent>
          <TabsContent value="system" className="mt-0">
            {renderSystemSettings()}
          </TabsContent>
        </ScrollArea>
      </Tabs>
    </div>
  );
}
