import { useState } from 'react';
import {
  ArrowLeft, Plus, Edit, Trash2, Search, MapPin, Phone, Users, DoorOpen, TrendingUp, AlertTriangle, CheckCircle2, Building2, Mail, Clock, Star
} from 'lucide-react';
import { Button } from '../ui/button';
import { Card } from '../ui/card';
import { Badge } from '../ui/badge';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '../ui/dialog';
import { ScrollArea } from '../ui/scroll-area';
import { Textarea } from '../ui/textarea';
import { toast } from 'sonner@2.0.3';
import { BRANCHES } from '../../data/mockData';

interface BranchManagementProps {
  onBack: () => void;
}

export function BranchManagement({ onBack }: BranchManagementProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingBranch, setEditingBranch] = useState<any>(null);
  const [viewMode, setViewMode] = useState('list'); // 'list' or 'detail'
  const [selectedBranch, setSelectedBranch] = useState<any>(null);

  // Initialize with data from mockData.ts and add additional fields
  const [branches, setBranches] = useState(
    BRANCHES.map(branch => ({
      ...branch,
      shortName: branch.name.split(' - ')[1] || branch.name,
      manager: branch.id === 'BR001' ? 'Trần Thị Bình' : 
               branch.id === 'BR002' ? 'Lê Văn Cường' : 'Phạm Thị Dung',
      managerId: branch.id === 'BR001' ? 'MG001' : 
                 branch.id === 'BR002' ? 'MG002' : 'MG003',
      email: branch.id === 'BR001' ? 'tranduyhung@thudokaraoke.vn' : 
             branch.id === 'BR002' ? 'nguyenhue@thudokaraoke.vn' : 'langha@thudokaraoke.vn',
      activeRooms: branch.id === 'BR001' ? 8 : 
                   branch.id === 'BR002' ? 5 : 0,
      staff: branch.id === 'BR001' ? 12 : 
             branch.id === 'BR002' ? 10 : 15,
      revenue: branch.id === 'BR001' ? 45000000 : 
               branch.id === 'BR002' ? 38000000 : 0,
      customers: branch.id === 'BR001' ? 156 : 
                 branch.id === 'BR002' ? 128 : 0,
      openTime: branch.operatingHours.split(' - ')[0],
      closeTime: branch.operatingHours.split(' - ')[1],
      createdAt: '01/01/2024',
    }))
  );

  const filteredBranches = branches.filter(branch =>
    branch.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    branch.address.toLowerCase().includes(searchQuery.toLowerCase()) ||
    branch.id.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const stats = {
    total: branches.length,
    active: branches.filter(b => b.status === 'active').length,
    maintenance: branches.filter(b => b.status === 'maintenance').length,
    totalRevenue: branches.reduce((sum, b) => sum + b.revenue, 0),
    totalRooms: branches.reduce((sum, b) => sum + b.totalRooms, 0),
    totalStaff: branches.reduce((sum, b) => sum + b.staff, 0),
  };

  const getStatusInfo = (status: string) => {
    switch (status) {
      case 'active':
        return { text: 'Hoạt động', color: 'bg-green-500/20 text-green-400 border-green-500/30', icon: CheckCircle2 };
      case 'maintenance':
        return { text: 'Bảo trì', color: 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30', icon: AlertTriangle };
      case 'closed':
        return { text: 'Đóng cửa', color: 'bg-red-500/20 text-red-400 border-red-500/30', icon: AlertTriangle };
      default:
        return { text: 'Unknown', color: 'bg-gray-500/20 text-gray-400', icon: AlertTriangle };
    }
  };

  const handleSaveBranch = (branchData: any) => {
    if (editingBranch) {
      setBranches(prev =>
        prev.map(branch => (branch.id === editingBranch.id ? { ...branch, ...branchData } : branch))
      );
      toast.success('Đã cập nhật cơ sở');
    } else {
      const newBranch = {
        id: `BR${(branches.length + 1).toString().padStart(3, '0')}`,
        ...branchData,
        activeRooms: 0,
        revenue: 0,
        customers: 0,
        createdAt: new Date().toLocaleDateString('vi-VN'),
      };
      setBranches(prev => [...prev, newBranch]);
      toast.success('Đã tạo cơ sở mới');
    }
    setIsDialogOpen(false);
    setEditingBranch(null);
  };

  const handleDeleteBranch = (branchId: string) => {
    if (confirm('Bạn có chắc chắn muốn xóa cơ sở này? Tất cả dữ liệu liên quan sẽ bị mất.')) {
      setBranches(prev => prev.filter(branch => branch.id !== branchId));
      toast.success('Đã xóa cơ sở');
    }
  };

  const handleChangeStatus = (branchId: string, newStatus: string) => {
    setBranches(prev =>
      prev.map(branch => (branch.id === branchId ? { ...branch, status: newStatus } : branch))
    );
    toast.success('Đã cập nhật trạng thái');
  };

  const renderBranchDetail = (branch: any) => {
    const statusInfo = getStatusInfo(branch.status);
    const StatusIcon = statusInfo.icon;
    const roomUsagePercent = (branch.activeRooms / branch.totalRooms) * 100;

    return (
      <div className="pb-20">
        {/* Header */}
        <div className="sticky top-0 z-50 bg-gradient-to-br from-[#9333ea] to-[#6b21a8] p-4 rounded-b-[20px]">
          <div className="flex items-center gap-3 mb-3">
            <button
              onClick={() => {
                setViewMode('list');
                setSelectedBranch(null);
              }}
              className="w-9 h-9 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20"
            >
              <ArrowLeft className="w-5 h-5 text-white" />
            </button>
            <div className="flex-1 min-w-0">
              <h1 className="text-sm text-white truncate" style={{ fontWeight: 700 }}>
                {branch.shortName}
              </h1>
              <p className="text-xs text-gray-300 truncate">{branch.id}</p>
            </div>
            <Badge className={statusInfo.color}>
              <StatusIcon className="w-3 h-3 mr-1" />
              {statusInfo.text}
            </Badge>
          </div>

          {/* Quick Stats */}
          <div className="grid grid-cols-3 gap-2">
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-2 text-center">
              <p className="text-sm text-white" style={{ fontWeight: 700 }}>{branch.activeRooms}/{branch.totalRooms}</p>
              <p className="text-xs text-gray-300">Phòng</p>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-2 text-center">
              <p className="text-sm text-white" style={{ fontWeight: 700 }}>{branch.staff}</p>
              <p className="text-xs text-gray-300">Nhân sự</p>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-2 text-center">
              <p className="text-sm text-[#ffd700]" style={{ fontWeight: 700 }}>
                {(branch.revenue / 1000000).toFixed(1)}M
              </p>
              <p className="text-xs text-gray-300">Doanh thu</p>
            </div>
          </div>
        </div>

        <div className="px-4 pt-4 space-y-3">
          {/* Thông tin cơ bản */}
          <Card className="bg-card border-[#9333ea]/30 p-4">
            <h3 className="text-white text-sm mb-3" style={{ fontWeight: 600 }}>
              Thông tin cơ bản
            </h3>
            <div className="space-y-2 text-xs">
              <div className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-gray-400 flex-shrink-0 mt-0.5" />
                <p className="text-gray-300">{branch.address}</p>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-gray-400" />
                <p className="text-gray-300">{branch.phone}</p>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-gray-400" />
                <p className="text-gray-300">{branch.email}</p>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-gray-400" />
                <p className="text-gray-300">Giờ mở cửa: {branch.openTime} - {branch.closeTime}</p>
              </div>
              <div className="flex items-center gap-2">
                <Users className="w-4 h-4 text-gray-400" />
                <p className="text-gray-300">Quản lý: {branch.manager}</p>
              </div>
              {branch.rating && (
                <div className="flex items-center gap-2">
                  <Star className="w-4 h-4 text-[#ffd700]" />
                  <p className="text-gray-300">Đánh giá: {branch.rating}/5.0</p>
                </div>
              )}
            </div>
          </Card>

          {/* Tình trạng hoạt động */}
          <Card className="bg-card border-[#ffd700]/30 p-4">
            <h3 className="text-white text-sm mb-3" style={{ fontWeight: 600 }}>
              Tình trạng hoạt động
            </h3>
            
            <div className="space-y-3">
              {/* Phòng đang sử dụng */}
              <div>
                <div className="flex items-center justify-between text-xs mb-1">
                  <span className="text-gray-400">Phòng đang sử dụng</span>
                  <span className="text-white" style={{ fontWeight: 600 }}>
                    {branch.activeRooms}/{branch.totalRooms} ({roomUsagePercent.toFixed(0)}%)
                  </span>
                </div>
                <div className="w-full bg-gray-700 rounded-full h-2">
                  <div
                    className={`h-2 rounded-full ${
                      roomUsagePercent > 80 ? 'bg-red-500' : roomUsagePercent > 50 ? 'bg-yellow-500' : 'bg-green-500'
                    }`}
                    style={{ width: `${roomUsagePercent}%` }}
                  />
                </div>
              </div>

              {/* Revenue today */}
              <div className="flex items-center justify-between py-2 border-t border-gray-700/50">
                <span className="text-xs text-gray-400">Doanh thu hôm nay</span>
                <span className="text-sm text-[#ffd700]" style={{ fontWeight: 700 }}>
                  {branch.revenue.toLocaleString('vi-VN')}đ
                </span>
              </div>

              {/* Customers today */}
              <div className="flex items-center justify-between py-2 border-t border-gray-700/50">
                <span className="text-xs text-gray-400">Lượng khách hôm nay</span>
                <span className="text-sm text-white" style={{ fontWeight: 600 }}>
                  {branch.customers} khách
                </span>
              </div>
            </div>
          </Card>

          {/* Actions */}
          <Card className="bg-card border-gray-700/30 p-4">
            <h3 className="text-white text-sm mb-3" style={{ fontWeight: 600 }}>
              Hành động
            </h3>
            <div className="space-y-2">
              <Button
                size="sm"
                className="w-full bg-[#ffd700]/20 hover:bg-[#ffd700]/30 text-[#ffd700] h-9 text-xs justify-start"
                onClick={() => {
                  setEditingBranch(branch);
                  setIsDialogOpen(true);
                }}
              >
                <Edit className="w-4 h-4 mr-2" />
                Chỉnh sửa thông tin
              </Button>
              
              <Select
                value={branch.status}
                onValueChange={(value) => handleChangeStatus(branch.id, value)}
              >
                <SelectTrigger className="w-full bg-card border-gray-700 h-9 text-xs">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="active">Hoạt động</SelectItem>
                  <SelectItem value="maintenance">Bảo trì</SelectItem>
                  <SelectItem value="closed">Đóng cửa</SelectItem>
                </SelectContent>
              </Select>

              <Button
                size="sm"
                variant="outline"
                className="w-full border-red-500/30 text-red-400 hover:bg-red-500/10 h-9 text-xs justify-start"
                onClick={() => handleDeleteBranch(branch.id)}
              >
                <Trash2 className="w-4 h-4 mr-2" />
                Xóa cơ sở
              </Button>
            </div>
          </Card>
        </div>
      </div>
    );
  };

  if (viewMode === 'detail' && selectedBranch) {
    return (
      <div className="min-h-screen bg-background">
        {renderBranchDetail(selectedBranch)}
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background pb-20">
      {/* Header */}
      <div className="sticky top-0 z-50 bg-gradient-to-br from-[#9333ea] to-[#6b21a8] p-4 rounded-b-[20px]">
        <div className="flex items-center gap-3 mb-3">
          <button
            onClick={onBack}
            className="w-9 h-9 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20"
          >
            <ArrowLeft className="w-5 h-5 text-white" />
          </button>
          <div className="flex-1">
            <h1 className="text-sm text-white" style={{ fontWeight: 700 }}>
              Quản lý cơ sở
            </h1>
            <p className="text-xs text-gray-300">Chi nhánh & hoạt động</p>
          </div>
          <Button
            size="sm"
            className="bg-[#ffd700] hover:bg-[#ffed4e] text-black h-8 rounded-full px-3"
            onClick={() => {
              setEditingBranch(null);
              setIsDialogOpen(true);
            }}
          >
            <Plus className="w-4 h-4 mr-1" />
            <span className="text-xs">Thêm</span>
          </Button>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-4 gap-2">
          <div className="bg-white/10 backdrop-blur-sm rounded-lg p-1.5 text-center">
            <p className="text-sm text-white" style={{ fontWeight: 700 }}>{stats.total}</p>
            <p className="text-xs text-gray-300">Cơ sở</p>
          </div>
          <div className="bg-white/10 backdrop-blur-sm rounded-lg p-1.5 text-center">
            <p className="text-sm text-white" style={{ fontWeight: 700 }}>{stats.totalRooms}</p>
            <p className="text-xs text-gray-300">Phòng</p>
          </div>
          <div className="bg-white/10 backdrop-blur-sm rounded-lg p-1.5 text-center">
            <p className="text-sm text-white" style={{ fontWeight: 700 }}>{stats.totalStaff}</p>
            <p className="text-xs text-gray-300">NV</p>
          </div>
          <div className="bg-white/10 backdrop-blur-sm rounded-lg p-1.5 text-center">
            <p className="text-sm text-[#ffd700]" style={{ fontWeight: 700 }}>
              {(stats.totalRevenue / 1000000).toFixed(0)}M
            </p>
            <p className="text-xs text-gray-300">DT</p>
          </div>
        </div>
      </div>

      {/* Search */}
      <div className="px-4 pt-3">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
          <Input
            placeholder="Tìm cơ sở..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10 bg-card border-[#9333ea]/30 text-white h-9 text-sm"
          />
        </div>
      </div>

      {/* Branches List */}
      <ScrollArea className="h-[calc(100vh-230px)] px-4 pt-3">
        <div className="space-y-3">
          {filteredBranches.map((branch) => {
            const statusInfo = getStatusInfo(branch.status);
            const StatusIcon = statusInfo.icon;
            const roomUsagePercent = (branch.activeRooms / branch.totalRooms) * 100;

            return (
              <Card
                key={branch.id}
                className="bg-card border-[#9333ea]/30 p-4 cursor-pointer hover:border-[#9333ea] transition-all"
                onClick={() => {
                  setSelectedBranch(branch);
                  setViewMode('detail');
                }}
              >
                <div className="flex items-start justify-between mb-3">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <Building2 className="w-4 h-4 text-[#9333ea] flex-shrink-0" />
                      <h3 className="text-white text-sm truncate" style={{ fontWeight: 600 }}>
                        {branch.shortName}
                      </h3>
                      <Badge className={`${statusInfo.color} text-xs px-1.5 py-0 h-auto flex-shrink-0`}>
                        <StatusIcon className="w-2.5 h-2.5 mr-0.5" />
                        {statusInfo.text}
                      </Badge>
                    </div>
                    <p className="text-xs text-gray-400 truncate">
                      <MapPin className="w-3 h-3 inline mr-1" />
                      {branch.address}
                    </p>
                    <p className="text-xs text-gray-400 mt-0.5">
                      <Users className="w-3 h-3 inline mr-1" />
                      QL: {branch.manager}
                    </p>
                  </div>
                </div>

                {/* Stats Row */}
                <div className="grid grid-cols-3 gap-2 mb-3">
                  <div className="text-center p-2 bg-[#1a1a24] rounded">
                    <p className="text-xs text-white" style={{ fontWeight: 600 }}>
                      {branch.activeRooms}/{branch.totalRooms}
                    </p>
                    <p className="text-xs text-gray-400">Phòng</p>
                  </div>
                  <div className="text-center p-2 bg-[#1a1a24] rounded">
                    <p className="text-xs text-white" style={{ fontWeight: 600 }}>{branch.staff}</p>
                    <p className="text-xs text-gray-400">Nhân sự</p>
                  </div>
                  <div className="text-center p-2 bg-[#1a1a24] rounded">
                    <p className="text-xs text-[#ffd700]" style={{ fontWeight: 600 }}>
                      {(branch.revenue / 1000000).toFixed(1)}M
                    </p>
                    <p className="text-xs text-gray-400">DT</p>
                  </div>
                </div>

                {/* Room Usage Bar */}
                <div>
                  <div className="flex items-center justify-between text-xs mb-1">
                    <span className="text-gray-400">Sử dụng phòng</span>
                    <span className="text-white">{roomUsagePercent.toFixed(0)}%</span>
                  </div>
                  <div className="w-full bg-gray-700 rounded-full h-1.5">
                    <div
                      className={`h-1.5 rounded-full transition-all ${
                        roomUsagePercent > 80 ? 'bg-red-500' : roomUsagePercent > 50 ? 'bg-yellow-500' : 'bg-green-500'
                      }`}
                      style={{ width: `${roomUsagePercent}%` }}
                    />
                  </div>
                </div>
              </Card>
            );
          })}
        </div>
      </ScrollArea>

      {/* Branch Dialog */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <BranchDialog
          branch={editingBranch}
          onSave={handleSaveBranch}
          onClose={() => {
            setIsDialogOpen(false);
            setEditingBranch(null);
          }}
        />
      </Dialog>
    </div>
  );
}

function BranchDialog({ branch, onSave, onClose }: any) {
  const [formData, setFormData] = useState(
    branch || {
      name: '',
      shortName: '',
      address: '',
      phone: '',
      email: '',
      manager: '',
      managerId: '',
      totalRooms: 0,
      staff: 0,
      openTime: '10:00',
      closeTime: '02:00',
      status: 'active',
      rating: 4.5,
      image: '',
    }
  );

  const handleSubmit = () => {
    // Validation
    if (!formData.name || !formData.address || !formData.phone) {
      toast.error('Vui lòng điền đầy đủ thông tin bắt buộc', {
        description: 'Tên, địa chỉ và số điện thoại là bắt buộc',
      });
      return;
    }

    // Auto-generate shortName if not provided
    if (!formData.shortName && formData.name.includes(' - ')) {
      formData.shortName = formData.name.split(' - ')[1];
    } else if (!formData.shortName) {
      formData.shortName = formData.name;
    }

    // Generate operating hours string
    const operatingHours = `${formData.openTime} - ${formData.closeTime}`;
    
    onSave({
      ...formData,
      operatingHours,
    });
  };

  return (
    <DialogContent className="bg-card border-[#9333ea]/30 text-white w-[90vw] max-w-[400px]" aria-describedby={undefined}>
      <DialogHeader>
        <DialogTitle className="text-sm">
          {branch ? 'Chỉnh sửa cơ sở' : 'Thêm cơ sở mới'}
        </DialogTitle>
      </DialogHeader>
      <ScrollArea className="max-h-[65vh]">
        <div className="space-y-3 py-3 pr-3">
          {/* Tên cơ sở */}
          <div>
            <Label className="text-xs text-gray-400 mb-1 block">Tên đầy đủ *</Label>
            <Input
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="bg-[#1a1a24] border-gray-700 text-white h-9 text-sm"
              placeholder="Karaoke Thủ Đô - Trần Duy Hưng"
            />
            <p className="text-xs text-gray-500 mt-0.5">Định dạng: "Tên hệ thống - Tên chi nhánh"</p>
          </div>

          <div>
            <Label className="text-xs text-gray-400 mb-1 block">Tên ngắn</Label>
            <Input
              value={formData.shortName}
              onChange={(e) => setFormData({ ...formData, shortName: e.target.value })}
              className="bg-[#1a1a24] border-gray-700 text-white h-9 text-sm"
              placeholder="Trần Duy Hưng"
            />
            <p className="text-xs text-gray-500 mt-0.5">Để trống để tự động tạo từ tên đầy đủ</p>
          </div>

          {/* Địa chỉ */}
          <div>
            <Label className="text-xs text-gray-400 mb-1 block">Địa chỉ *</Label>
            <Textarea
              value={formData.address}
              onChange={(e) => setFormData({ ...formData, address: e.target.value })}
              className="bg-[#1a1a24] border-gray-700 text-white text-sm min-h-[60px]"
              placeholder="123 Trần Duy Hưng, Cầu Giấy, Hà Nội"
            />
          </div>

          {/* Contact Info */}
          <div className="grid grid-cols-2 gap-2">
            <div>
              <Label className="text-xs text-gray-400 mb-1 block">Số điện thoại *</Label>
              <Input
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                className="bg-[#1a1a24] border-gray-700 text-white h-9 text-sm"
                placeholder="024 3838 8888"
              />
            </div>
            <div>
              <Label className="text-xs text-gray-400 mb-1 block">Email</Label>
              <Input
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="bg-[#1a1a24] border-gray-700 text-white h-9 text-sm"
                placeholder="branch@..."
              />
            </div>
          </div>

          {/* Capacity Info */}
          <div className="grid grid-cols-2 gap-2">
            <div>
              <Label className="text-xs text-gray-400 mb-1 block">Số phòng</Label>
              <Input
                type="number"
                value={formData.totalRooms}
                onChange={(e) => setFormData({ ...formData, totalRooms: parseInt(e.target.value) || 0 })}
                className="bg-[#1a1a24] border-gray-700 text-white h-9 text-sm"
                placeholder="15"
                min="0"
              />
            </div>
            <div>
              <Label className="text-xs text-gray-400 mb-1 block">Số nhân sự</Label>
              <Input
                type="number"
                value={formData.staff}
                onChange={(e) => setFormData({ ...formData, staff: parseInt(e.target.value) || 0 })}
                className="bg-[#1a1a24] border-gray-700 text-white h-9 text-sm"
                placeholder="12"
                min="0"
              />
            </div>
          </div>

          {/* Operating Hours */}
          <div className="grid grid-cols-2 gap-2">
            <div>
              <Label className="text-xs text-gray-400 mb-1 block">Giờ mở cửa</Label>
              <Input
                type="time"
                value={formData.openTime}
                onChange={(e) => setFormData({ ...formData, openTime: e.target.value })}
                className="bg-[#1a1a24] border-gray-700 text-white h-9 text-sm"
              />
            </div>
            <div>
              <Label className="text-xs text-gray-400 mb-1 block">Giờ đóng cửa</Label>
              <Input
                type="time"
                value={formData.closeTime}
                onChange={(e) => setFormData({ ...formData, closeTime: e.target.value })}
                className="bg-[#1a1a24] border-gray-700 text-white h-9 text-sm"
              />
            </div>
          </div>

          {/* Manager */}
          <div>
            <Label className="text-xs text-gray-400 mb-1 block">Quản lý phụ trách</Label>
            <Input
              value={formData.manager}
              onChange={(e) => setFormData({ ...formData, manager: e.target.value })}
              className="bg-[#1a1a24] border-gray-700 text-white h-9 text-sm"
              placeholder="Tên quản lý"
            />
          </div>

          {/* Rating & Image */}
          <div className="grid grid-cols-2 gap-2">
            <div>
              <Label className="text-xs text-gray-400 mb-1 block">Đánh giá</Label>
              <Input
                type="number"
                step="0.1"
                min="0"
                max="5"
                value={formData.rating}
                onChange={(e) => setFormData({ ...formData, rating: parseFloat(e.target.value) || 0 })}
                className="bg-[#1a1a24] border-gray-700 text-white h-9 text-sm"
                placeholder="4.5"
              />
            </div>
            <div>
              <Label className="text-xs text-gray-400 mb-1 block">Trạng thái</Label>
              <Select
                value={formData.status}
                onValueChange={(value) => setFormData({ ...formData, status: value })}
              >
                <SelectTrigger className="bg-[#1a1a24] border-gray-700 h-9 text-sm">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="active">Hoạt động</SelectItem>
                  <SelectItem value="maintenance">Bảo trì</SelectItem>
                  <SelectItem value="closed">Đóng cửa</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Image URL */}
          <div>
            <Label className="text-xs text-gray-400 mb-1 block">Hình ảnh (URL)</Label>
            <Input
              value={formData.image}
              onChange={(e) => setFormData({ ...formData, image: e.target.value })}
              className="bg-[#1a1a24] border-gray-700 text-white h-9 text-sm"
              placeholder="https://..."
            />
            {formData.image && (
              <div className="mt-2 rounded overflow-hidden">
                <img 
                  src={formData.image} 
                  alt="Preview" 
                  className="w-full h-24 object-cover"
                  onError={(e) => {
                    e.currentTarget.style.display = 'none';
                  }}
                />
              </div>
            )}
          </div>
        </div>
      </ScrollArea>

      <div className="flex gap-2 pt-2 border-t border-gray-700/50">
        <Button
          variant="outline"
          className="flex-1 border-gray-700 text-white hover:bg-gray-800 h-9 text-sm"
          onClick={onClose}
        >
          Hủy
        </Button>
        <Button
          className="flex-1 bg-[#9333ea] hover:bg-[#7c3aed] text-white h-9 text-sm"
          onClick={handleSubmit}
        >
          {branch ? 'Cập nhật' : 'Tạo'}
        </Button>
      </div>
    </DialogContent>
  );
}
