import { useState } from 'react';
import {
  ArrowLeft, Plus, Edit, Trash2, Search, Calendar, Clock, AlertTriangle, UserCheck, UserX, Download, Filter
} from 'lucide-react';
import { Button } from '../ui/button';
import { Card } from '../ui/card';
import { Badge } from '../ui/badge';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '../ui/dialog';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';
import { ScrollArea } from '../ui/scroll-area';
import { toast } from 'sonner@2.0.3';

interface AdminStaffManagementProps {
  onBack: () => void;
}

export function AdminStaffManagement({ onBack }: AdminStaffManagementProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedBranch, setSelectedBranch] = useState('all');
  const [selectedPosition, setSelectedPosition] = useState('all');
  const [selectedStatus, setSelectedStatus] = useState('all');
  const [activeTab, setActiveTab] = useState('all');
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingStaff, setEditingStaff] = useState<any>(null);
  const [viewMode, setViewMode] = useState<'list' | 'detail'>('list');
  const [selectedStaff, setSelectedStaff] = useState<any>(null);

  const branches = [
    { id: 'all', name: 'Tất cả cơ sở' },
    { id: 'tran-duy-hung', name: 'Trần Duy Hưng' },
    { id: 'nguyen-hue', name: 'Nguyễn Huệ' },
    { id: 'lang-ha', name: 'Láng Hạ' },
  ];

  const positions = [
    { id: 'all', name: 'Tất cả vị trí' },
    { id: 'manager', name: 'Quản lý' },
    { id: 'receptionist', name: 'Lễ tân' },
    { id: 'waiter', name: 'Phục vụ' },
    { id: 'technician', name: 'Kỹ thuật' },
    { id: 'cashier', name: 'Thu ngân' },
    { id: 'security', name: 'Bảo vệ' },
  ];

  const [staffList, setStaffList] = useState([
    // Trần Duy Hưng
    { 
      id: 'ST001', 
      name: 'Trần Thị Bình', 
      position: 'manager',
      branch: 'Trần Duy Hưng',
      phone: '0902345678',
      email: 'binh.tran@karaoke.vn',
      joinDate: '05/01/2024',
      salary: 15000000,
      status: 'active',
      attendance: { present: 24, absent: 1, late: 2 },
      leaves: 1,
      violations: 0,
      performance: 95,
    },
    { 
      id: 'ST002', 
      name: 'Hoàng Văn Em', 
      position: 'receptionist',
      branch: 'Trần Duy Hưng',
      phone: '0905678901',
      email: 'em.hoang@karaoke.vn',
      joinDate: '10/01/2024',
      salary: 8000000,
      status: 'active',
      attendance: { present: 26, absent: 0, late: 1 },
      leaves: 0,
      violations: 0,
      performance: 92,
    },
    { 
      id: 'ST003', 
      name: 'Vũ Thị Phương', 
      position: 'waiter',
      branch: 'Trần Duy Hưng',
      phone: '0906789012',
      email: 'phuong.vu@karaoke.vn',
      joinDate: '10/01/2024',
      salary: 7000000,
      status: 'active',
      attendance: { present: 25, absent: 1, late: 0 },
      leaves: 1,
      violations: 0,
      performance: 88,
    },
    { 
      id: 'ST004', 
      name: 'Nguyễn Văn Giang', 
      position: 'technician',
      branch: 'Trần Duy Hưng',
      phone: '0907890123',
      email: 'giang.nguyen@karaoke.vn',
      joinDate: '15/01/2024',
      salary: 9000000,
      status: 'active',
      attendance: { present: 24, absent: 2, late: 1 },
      leaves: 2,
      violations: 1,
      performance: 85,
    },
    
    // Nguyễn Huệ
    { 
      id: 'ST005', 
      name: 'Lê Văn Cường', 
      position: 'manager',
      branch: 'Nguyễn Huệ',
      phone: '0903456789',
      email: 'cuong.le@karaoke.vn',
      joinDate: '05/01/2024',
      salary: 15000000,
      status: 'active',
      attendance: { present: 25, absent: 0, late: 2 },
      leaves: 0,
      violations: 0,
      performance: 93,
    },
    { 
      id: 'ST006', 
      name: 'Đỗ Thị Hoa', 
      position: 'receptionist',
      branch: 'Nguyễn Huệ',
      phone: '0908901234',
      email: 'hoa.do@karaoke.vn',
      joinDate: '12/01/2024',
      salary: 8000000,
      status: 'active',
      attendance: { present: 26, absent: 0, late: 0 },
      leaves: 0,
      violations: 0,
      performance: 96,
    },
    { 
      id: 'ST007', 
      name: 'Phạm Văn Khải', 
      position: 'waiter',
      branch: 'Nguyễn Huệ',
      phone: '0909012345',
      email: 'khai.pham@karaoke.vn',
      joinDate: '15/01/2024',
      salary: 7000000,
      status: 'active',
      attendance: { present: 23, absent: 2, late: 2 },
      leaves: 2,
      violations: 1,
      performance: 82,
    },
    
    // Láng Hạ
    { 
      id: 'ST008', 
      name: 'Phạm Thị Dung', 
      position: 'manager',
      branch: 'Láng Hạ',
      phone: '0904567890',
      email: 'dung.pham@karaoke.vn',
      joinDate: '05/01/2024',
      salary: 15000000,
      status: 'active',
      attendance: { present: 26, absent: 0, late: 1 },
      leaves: 0,
      violations: 0,
      performance: 94,
    },
    { 
      id: 'ST009', 
      name: 'Mai Thị Hà', 
      position: 'cashier',
      branch: 'Láng Hạ',
      phone: '0910123456',
      email: 'ha.mai@karaoke.vn',
      joinDate: '15/01/2024',
      salary: 8500000,
      status: 'leave',
      attendance: { present: 20, absent: 5, late: 0 },
      leaves: 5,
      violations: 0,
      performance: 78,
    },
    { 
      id: 'ST010', 
      name: 'Trần Văn Long', 
      position: 'security',
      branch: 'Láng Hạ',
      phone: '0911234567',
      email: 'long.tran@karaoke.vn',
      joinDate: '20/01/2024',
      salary: 7500000,
      status: 'active',
      attendance: { present: 26, absent: 0, late: 0 },
      leaves: 0,
      violations: 0,
      performance: 90,
    },
  ]);

  const filteredStaff = staffList.filter(staff => {
    const matchSearch = 
      staff.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      staff.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      staff.email.toLowerCase().includes(searchQuery.toLowerCase());
    const matchBranch = selectedBranch === 'all' || staff.branch === branches.find(b => b.id === selectedBranch)?.name;
    const matchPosition = selectedPosition === 'all' || staff.position === selectedPosition;
    const matchStatus = selectedStatus === 'all' || staff.status === selectedStatus;
    const matchTab = activeTab === 'all' || staff.position === activeTab;
    
    return matchSearch && matchBranch && matchPosition && matchStatus && matchTab;
  });

  const stats = {
    total: staffList.length,
    active: staffList.filter(s => s.status === 'active').length,
    onLeave: staffList.filter(s => s.status === 'leave').length,
    managers: staffList.filter(s => s.position === 'manager').length,
    avgPerformance: (staffList.reduce((sum, s) => sum + s.performance, 0) / staffList.length).toFixed(0),
  };

  const getPositionInfo = (position: string) => {
    switch (position) {
      case 'manager': return { name: 'Quản lý', color: '#f59e0b' };
      case 'receptionist': return { name: 'Lễ tân', color: '#3b82f6' };
      case 'waiter': return { name: 'Phục vụ', color: '#10b981' };
      case 'technician': return { name: 'Kỹ thuật', color: '#8b5cf6' };
      case 'cashier': return { name: 'Thu ngân', color: '#ec4899' };
      case 'security': return { name: 'Bảo vệ', color: '#6366f1' };
      default: return { name: position, color: '#gray' };
    }
  };

  const getStatusInfo = (status: string) => {
    switch (status) {
      case 'active': return { text: 'Đang làm', color: 'bg-green-500/20 text-green-400 border-green-500/30' };
      case 'leave': return { text: 'Nghỉ phép', color: 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30' };
      case 'terminated': return { text: 'Đã nghỉ', color: 'bg-red-500/20 text-red-400 border-red-500/30' };
      default: return { text: status, color: 'bg-gray-500/20 text-gray-400' };
    }
  };

  const handleSaveStaff = (staffData: any) => {
    if (editingStaff) {
      setStaffList(prev =>
        prev.map(staff => (staff.id === editingStaff.id ? { ...staff, ...staffData } : staff))
      );
      toast.success('Đã cập nhật thông tin nhân sự');
    } else {
      const newStaff = {
        id: `ST${(staffList.length + 1).toString().padStart(3, '0')}`,
        ...staffData,
        attendance: { present: 0, absent: 0, late: 0 },
        leaves: 0,
        violations: 0,
        performance: 0,
        joinDate: new Date().toLocaleDateString('vi-VN'),
      };
      setStaffList(prev => [...prev, newStaff]);
      toast.success('Đã thêm nhân sự mới');
    }
    setIsDialogOpen(false);
    setEditingStaff(null);
  };

  const handleDeleteStaff = (staffId: string) => {
    if (confirm('Bạn có chắc chắn muốn xóa nhân sự này?')) {
      setStaffList(prev => prev.filter(staff => staff.id !== staffId));
      toast.success('Đã xóa nhân sự');
      if (viewMode === 'detail') {
        setViewMode('list');
        setSelectedStaff(null);
      }
    }
  };

  const handleExportReport = () => {
    toast.success('Đang xuất báo cáo nhân sự...');
  };

  const renderStaffDetail = (staff: any) => {
    const positionInfo = getPositionInfo(staff.position);
    const statusInfo = getStatusInfo(staff.status);
    const attendanceRate = ((staff.attendance.present / (staff.attendance.present + staff.attendance.absent)) * 100).toFixed(0);

    return (
      <div className="pb-20">
        {/* Header */}
        <div className="sticky top-0 z-50 bg-gradient-to-br from-green-500 to-green-700 p-4 rounded-b-[20px]">
          <div className="flex items-center gap-3 mb-3">
            <button
              onClick={() => {
                setViewMode('list');
                setSelectedStaff(null);
              }}
              className="w-9 h-9 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20"
            >
              <ArrowLeft className="w-5 h-5 text-white" />
            </button>
            <div className="flex-1 min-w-0">
              <h1 className="text-sm text-white truncate" style={{ fontWeight: 700 }}>
                {staff.name}
              </h1>
              <p className="text-xs text-gray-200 truncate">{staff.id}</p>
            </div>
            <Badge className={statusInfo.color}>
              {statusInfo.text}
            </Badge>
          </div>

          {/* Quick Stats */}
          <div className="grid grid-cols-3 gap-2">
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-2 text-center">
              <p className="text-sm text-white" style={{ fontWeight: 700 }}>{staff.performance}%</p>
              <p className="text-xs text-gray-200">Hiệu suất</p>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-2 text-center">
              <p className="text-sm text-white" style={{ fontWeight: 700 }}>{attendanceRate}%</p>
              <p className="text-xs text-gray-200">Chuyên cần</p>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-2 text-center">
              <p className="text-sm text-white" style={{ fontWeight: 700 }}>{staff.violations}</p>
              <p className="text-xs text-gray-200">Vi phạm</p>
            </div>
          </div>
        </div>

        <div className="px-4 pt-4 space-y-3">
          {/* Thông tin cơ bản */}
          <Card className="bg-card border-green-500/30 p-4">
            <h3 className="text-white text-sm mb-3" style={{ fontWeight: 600 }}>
              Thông tin cơ bản
            </h3>
            <div className="space-y-2 text-xs">
              <div className="flex justify-between">
                <span className="text-gray-400">Vị trí:</span>
                <span className="text-white" style={{ fontWeight: 600, color: positionInfo.color }}>
                  {positionInfo.name}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">Cơ sở:</span>
                <span className="text-white" style={{ fontWeight: 600 }}>{staff.branch}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">Email:</span>
                <span className="text-white">{staff.email}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">Điện thoại:</span>
                <span className="text-white">{staff.phone}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">Ngày vào:</span>
                <span className="text-white">{staff.joinDate}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">Lương:</span>
                <span className="text-[#ffd700]" style={{ fontWeight: 600 }}>
                  {staff.salary.toLocaleString('vi-VN')}đ
                </span>
              </div>
            </div>
          </Card>

          {/* Chấm công */}
          <Card className="bg-card border-[#ffd700]/30 p-4">
            <h3 className="text-white text-sm mb-3" style={{ fontWeight: 600 }}>
              Chấm công tháng này
            </h3>
            <div className="grid grid-cols-3 gap-3">
              <div className="text-center p-2 bg-green-500/10 rounded">
                <UserCheck className="w-5 h-5 text-green-400 mx-auto mb-1" />
                <p className="text-sm text-white" style={{ fontWeight: 600 }}>{staff.attendance.present}</p>
                <p className="text-xs text-gray-400">Có mặt</p>
              </div>
              <div className="text-center p-2 bg-red-500/10 rounded">
                <UserX className="w-5 h-5 text-red-400 mx-auto mb-1" />
                <p className="text-sm text-white" style={{ fontWeight: 600 }}>{staff.attendance.absent}</p>
                <p className="text-xs text-gray-400">Vắng</p>
              </div>
              <div className="text-center p-2 bg-yellow-500/10 rounded">
                <Clock className="w-5 h-5 text-yellow-400 mx-auto mb-1" />
                <p className="text-sm text-white" style={{ fontWeight: 600 }}>{staff.attendance.late}</p>
                <p className="text-xs text-gray-400">Muộn</p>
              </div>
            </div>

            <div className="mt-3 pt-3 border-t border-gray-700/50">
              <div className="flex justify-between text-xs mb-1">
                <span className="text-gray-400">Tỷ lệ chuyên cần</span>
                <span className="text-white" style={{ fontWeight: 600 }}>{attendanceRate}%</span>
              </div>
              <div className="w-full bg-gray-700 rounded-full h-2">
                <div
                  className={`h-2 rounded-full ${
                    parseInt(attendanceRate) >= 90 ? 'bg-green-500' :
                    parseInt(attendanceRate) >= 70 ? 'bg-yellow-500' : 'bg-red-500'
                  }`}
                  style={{ width: `${attendanceRate}%` }}
                />
              </div>
            </div>
          </Card>

          {/* Nghỉ phép & Vi phạm */}
          <Card className="bg-card border-blue-500/30 p-4">
            <h3 className="text-white text-sm mb-3" style={{ fontWeight: 600 }}>
              Nghỉ phép & Vi phạm
            </h3>
            <div className="space-y-2 text-xs">
              <div className="flex items-center justify-between py-2 border-b border-gray-700/30">
                <div className="flex items-center gap-2">
                  <Calendar className="w-4 h-4 text-blue-400" />
                  <span className="text-gray-400">Ngày nghỉ phép</span>
                </div>
                <span className="text-white" style={{ fontWeight: 600 }}>{staff.leaves} ngày</span>
              </div>
              <div className="flex items-center justify-between py-2">
                <div className="flex items-center gap-2">
                  <AlertTriangle className="w-4 h-4 text-red-400" />
                  <span className="text-gray-400">Vi phạm</span>
                </div>
                <span className="text-white" style={{ fontWeight: 600 }}>{staff.violations} lần</span>
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
                  setEditingStaff(staff);
                  setIsDialogOpen(true);
                }}
              >
                <Edit className="w-4 h-4 mr-2" />
                Chỉnh sửa thông tin
              </Button>

              <Button
                size="sm"
                variant="outline"
                className="w-full border-red-500/30 text-red-400 hover:bg-red-500/10 h-9 text-xs justify-start"
                onClick={() => handleDeleteStaff(staff.id)}
              >
                <Trash2 className="w-4 h-4 mr-2" />
                Xóa nhân sự
              </Button>
            </div>
          </Card>
        </div>
      </div>
    );
  };

  if (viewMode === 'detail' && selectedStaff) {
    return (
      <div className="min-h-screen bg-background">
        {renderStaffDetail(selectedStaff)}
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background pb-20">
      {/* Header */}
      <div className="sticky top-0 z-50 bg-gradient-to-br from-green-500 to-green-700 p-4 rounded-b-[20px]">
        <div className="flex items-center gap-3 mb-3">
          <button
            onClick={onBack}
            className="w-9 h-9 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20"
          >
            <ArrowLeft className="w-5 h-5 text-white" />
          </button>
          <div className="flex-1">
            <h1 className="text-sm text-white" style={{ fontWeight: 700 }}>
              Quản lý nhân sự
            </h1>
            <p className="text-xs text-gray-200">Toàn bộ hệ thống</p>
          </div>
          <Button
            size="sm"
            className="bg-white hover:bg-gray-100 text-black h-8 rounded-full px-3"
            onClick={() => {
              setEditingStaff(null);
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
            <p className="text-xs text-gray-200">Tổng</p>
          </div>
          <div className="bg-white/10 backdrop-blur-sm rounded-lg p-1.5 text-center">
            <p className="text-sm text-white" style={{ fontWeight: 700 }}>{stats.active}</p>
            <p className="text-xs text-gray-200">Làm việc</p>
          </div>
          <div className="bg-white/10 backdrop-blur-sm rounded-lg p-1.5 text-center">
            <p className="text-sm text-white" style={{ fontWeight: 700 }}>{stats.managers}</p>
            <p className="text-xs text-gray-200">Quản lý</p>
          </div>
          <div className="bg-white/10 backdrop-blur-sm rounded-lg p-1.5 text-center">
            <p className="text-sm text-white" style={{ fontWeight: 700 }}>{stats.avgPerformance}%</p>
            <p className="text-xs text-gray-200">Hiệu suất</p>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="px-4 pt-3 space-y-2">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
          <Input
            placeholder="Tìm theo tên, ID, email..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10 bg-card border-green-500/30 text-white h-9 text-sm"
          />
        </div>

        <div className="grid grid-cols-3 gap-2">
          <Select value={selectedBranch} onValueChange={setSelectedBranch}>
            <SelectTrigger className="bg-card border-gray-700 text-white h-8 text-xs">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {branches.map(branch => (
                <SelectItem key={branch.id} value={branch.id}>{branch.name}</SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Select value={selectedPosition} onValueChange={setSelectedPosition}>
            <SelectTrigger className="bg-card border-gray-700 text-white h-8 text-xs">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {positions.map(pos => (
                <SelectItem key={pos.id} value={pos.id}>{pos.name}</SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Button
            size="sm"
            variant="outline"
            className="border-green-500/30 text-green-400 h-8 text-xs"
            onClick={handleExportReport}
          >
            <Download className="w-3 h-3 mr-1" />
            Xuất
          </Button>
        </div>
      </div>

      {/* Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="px-4 pt-3">
        <TabsList className="grid w-full grid-cols-4 bg-card h-8">
          <TabsTrigger value="all" className="text-xs">Tất cả</TabsTrigger>
          <TabsTrigger value="manager" className="text-xs">Quản lý</TabsTrigger>
          <TabsTrigger value="receptionist" className="text-xs">Lễ tân</TabsTrigger>
          <TabsTrigger value="waiter" className="text-xs">Phục vụ</TabsTrigger>
        </TabsList>

        <ScrollArea className="h-[calc(100vh-340px)] mt-3">
          <div className="space-y-2">
            {filteredStaff.map((staff) => {
              const positionInfo = getPositionInfo(staff.position);
              const statusInfo = getStatusInfo(staff.status);

              return (
                <Card
                  key={staff.id}
                  className="bg-card border-gray-700/30 p-3 cursor-pointer hover:border-green-500/50 transition-all"
                  onClick={() => {
                    setSelectedStaff(staff);
                    setViewMode('detail');
                  }}
                >
                  <div className="flex items-start gap-3">
                    <div
                      className="w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 text-sm"
                      style={{ 
                        backgroundColor: `${positionInfo.color}20`,
                        color: positionInfo.color,
                        fontWeight: 700,
                      }}
                    >
                      {staff.name.split(' ').pop()?.charAt(0)}
                    </div>

                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <h3 className="text-white text-sm truncate" style={{ fontWeight: 600 }}>
                          {staff.name}
                        </h3>
                        <Badge className={`${statusInfo.color} text-xs px-1.5 py-0 h-auto`}>
                          {statusInfo.text}
                        </Badge>
                      </div>
                      <p className="text-xs text-gray-400 mb-1">
                        <span style={{ color: positionInfo.color, fontWeight: 600 }}>
                          {positionInfo.name}
                        </span>
                        {' • '}
                        {staff.branch}
                      </p>
                      <div className="flex items-center gap-3 text-xs text-gray-400">
                        <span>Hiệu suất: <span className="text-white">{staff.performance}%</span></span>
                        <span>•</span>
                        <span>Vi phạm: <span className={staff.violations > 0 ? 'text-red-400' : 'text-green-400'}>
                          {staff.violations}
                        </span></span>
                      </div>
                    </div>

                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        setEditingStaff(staff);
                        setIsDialogOpen(true);
                      }}
                      className="w-7 h-7 rounded bg-green-500/20 text-green-400 flex items-center justify-center hover:bg-green-500/30 flex-shrink-0"
                    >
                      <Edit className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </Card>
              );
            })}
          </div>
        </ScrollArea>
      </Tabs>

      {/* Staff Dialog */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <StaffDialog
          staff={editingStaff}
          branches={branches.filter(b => b.id !== 'all')}
          positions={positions.filter(p => p.id !== 'all')}
          onSave={handleSaveStaff}
          onClose={() => {
            setIsDialogOpen(false);
            setEditingStaff(null);
          }}
        />
      </Dialog>
    </div>
  );
}

function StaffDialog({ staff, branches, positions, onSave, onClose }: any) {
  const [formData, setFormData] = useState(
    staff || {
      name: '',
      position: 'waiter',
      branch: '',
      phone: '',
      email: '',
      salary: 7000000,
      status: 'active',
    }
  );

  return (
    <DialogContent className="bg-card border-green-500/30 text-white w-[90vw] max-w-[360px]" aria-describedby={undefined}>
      <DialogHeader>
        <DialogTitle className="text-sm">
          {staff ? 'Chỉnh sửa nhân sự' : 'Thêm nhân sự mới'}
        </DialogTitle>
      </DialogHeader>
      <ScrollArea className="max-h-[60vh]">
        <div className="space-y-3 py-3 pr-3">
          <div>
            <Label className="text-xs text-gray-400 mb-1 block">Họ tên *</Label>
            <Input
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="bg-[#1a1a24] border-gray-700 text-white h-9 text-sm"
              placeholder="Nguyễn Văn A"
            />
          </div>

          <div className="grid grid-cols-2 gap-2">
            <div>
              <Label className="text-xs text-gray-400 mb-1 block">Vị trí *</Label>
              <Select
                value={formData.position}
                onValueChange={(value) => setFormData({ ...formData, position: value })}
              >
                <SelectTrigger className="bg-[#1a1a24] border-gray-700 h-9 text-sm">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {positions.map((pos: any) => (
                    <SelectItem key={pos.id} value={pos.id}>{pos.name}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label className="text-xs text-gray-400 mb-1 block">Cơ sở *</Label>
              <Select
                value={formData.branch}
                onValueChange={(value) => setFormData({ ...formData, branch: value })}
              >
                <SelectTrigger className="bg-[#1a1a24] border-gray-700 h-9 text-sm">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {branches.map((branch: any) => (
                    <SelectItem key={branch.id} value={branch.name}>{branch.name}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <div>
            <Label className="text-xs text-gray-400 mb-1 block">Số điện thoại *</Label>
            <Input
              value={formData.phone}
              onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
              className="bg-[#1a1a24] border-gray-700 text-white h-9 text-sm"
              placeholder="0901234567"
            />
          </div>

          <div>
            <Label className="text-xs text-gray-400 mb-1 block">Email *</Label>
            <Input
              type="email"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              className="bg-[#1a1a24] border-gray-700 text-white h-9 text-sm"
              placeholder="email@karaoke.vn"
            />
          </div>

          <div>
            <Label className="text-xs text-gray-400 mb-1 block">Lương (VNĐ) *</Label>
            <Input
              type="number"
              value={formData.salary}
              onChange={(e) => setFormData({ ...formData, salary: parseInt(e.target.value) || 0 })}
              className="bg-[#1a1a24] border-gray-700 text-white h-9 text-sm"
            />
          </div>
        </div>
      </ScrollArea>

      <div className="flex gap-2">
        <Button
          variant="outline"
          className="flex-1 border-gray-700 text-white hover:bg-gray-800 h-9 text-sm"
          onClick={onClose}
        >
          Hủy
        </Button>
        <Button
          className="flex-1 bg-green-500 hover:bg-green-600 text-white h-9 text-sm"
          onClick={() => onSave(formData)}
        >
          {staff ? 'Cập nhật' : 'Tạo'}
        </Button>
      </div>
    </DialogContent>
  );
}
