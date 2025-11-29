import { useState } from 'react';
import { 
  ArrowLeft, Plus, Edit, Trash2, Calendar, DollarSign, 
  Users, Clock, CheckCircle2, UserPlus, Search, UserCheck, UserX, AlertTriangle
} from 'lucide-react';
import { Button } from '../ui/button';
import { Card } from '../ui/card';
import { Badge } from '../ui/badge';
import { ScrollArea } from '../ui/scroll-area';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '../ui/dialog';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { toast } from 'sonner@2.0.3';

interface StaffManagementProps {
  onBack: () => void;
}

export function StaffManagement({ onBack }: StaffManagementProps) {
  const [activeTab, setActiveTab] = useState('list');
  const [editingStaff, setEditingStaff] = useState<any>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedStaffForShift, setSelectedStaffForShift] = useState<any>(null);
  const [isShiftDialogOpen, setIsShiftDialogOpen] = useState(false);
  const [selectedStaffForSalary, setSelectedStaffForSalary] = useState<any>(null);
  const [isSalaryDialogOpen, setIsSalaryDialogOpen] = useState(false);
  const [viewMode, setViewMode] = useState<'list' | 'detail'>('list');
  const [selectedStaff, setSelectedStaff] = useState<any>(null);

  const [staffList, setStaffList] = useState([
    {
      id: 'NV001',
      name: 'Nguyễn Văn A',
      role: 'Phục vụ',
      phone: '0912345678',
      email: 'nguyenvana@email.com',
      status: 'active',
      baseSalary: 6000000,
      bonus: 500000,
      totalSalary: 6500000,
      workHours: 160,
      joinDate: '01/01/2024',
      attendance: { present: 24, absent: 1, late: 2 },
      leaves: 1,
      violations: 0,
      performance: 92,
    },
    {
      id: 'NV002',
      name: 'Trần Thị B',
      role: 'Phục vụ',
      phone: '0923456789',
      email: 'tranthib@email.com',
      status: 'active',
      baseSalary: 6000000,
      bonus: 800000,
      totalSalary: 6800000,
      workHours: 168,
      joinDate: '15/01/2024',
      attendance: { present: 26, absent: 0, late: 1 },
      leaves: 0,
      violations: 0,
      performance: 96,
    },
    {
      id: 'NV003',
      name: 'Lê Văn C',
      role: 'Pha chế',
      phone: '0934567890',
      email: 'levanc@email.com',
      status: 'active',
      baseSalary: 7000000,
      bonus: 1000000,
      totalSalary: 8000000,
      workHours: 176,
      joinDate: '01/02/2024',
      attendance: { present: 25, absent: 1, late: 0 },
      leaves: 1,
      violations: 0,
      performance: 88,
    },
    {
      id: 'NV004',
      name: 'Phạm Thị D',
      role: 'Thu ngân',
      phone: '0945678901',
      email: 'phamthid@email.com',
      status: 'active',
      baseSalary: 7500000,
      bonus: 600000,
      totalSalary: 8100000,
      workHours: 160,
      joinDate: '10/02/2024',
      attendance: { present: 24, absent: 2, late: 1 },
      leaves: 2,
      violations: 1,
      performance: 85,
    },
    {
      id: 'NV005',
      name: 'Hoàng Văn E',
      role: 'Bảo vệ',
      phone: '0956789012',
      email: 'hoangvane@email.com',
      status: 'active',
      baseSalary: 6500000,
      bonus: 300000,
      totalSalary: 6800000,
      workHours: 184,
      joinDate: '01/03/2024',
      attendance: { present: 26, absent: 0, late: 0 },
      leaves: 0,
      violations: 0,
      performance: 90,
    },
  ]);

  // Mock shift schedule data
  const [shiftSchedule, setShiftSchedule] = useState([
    {
      staffId: 'NV001',
      staffName: 'Nguyễn Văn A',
      shifts: [
        { date: '13/10/2025', day: 'T2', time: '08:00-16:00', status: 'confirmed' },
        { date: '14/10/2025', day: 'T3', time: '08:00-16:00', status: 'confirmed' },
        { date: '15/10/2025', day: 'T4', time: '08:00-16:00', status: 'confirmed' },
        { date: '16/10/2025', day: 'T5', time: 'Off', status: 'off' },
        { date: '17/10/2025', day: 'T6', time: '08:00-16:00', status: 'confirmed' },
        { date: '18/10/2025', day: 'T7', time: '08:00-16:00', status: 'confirmed' },
        { date: '19/10/2025', day: 'CN', time: 'Off', status: 'off' },
      ],
    },
    {
      staffId: 'NV002',
      staffName: 'Trần Thị B',
      shifts: [
        { date: '13/10/2025', day: 'T2', time: '16:00-00:00', status: 'confirmed' },
        { date: '14/10/2025', day: 'T3', time: '16:00-00:00', status: 'confirmed' },
        { date: '15/10/2025', day: 'T4', time: '16:00-00:00', status: 'confirmed' },
        { date: '16/10/2025', day: 'T5', time: '16:00-00:00', status: 'confirmed' },
        { date: '17/10/2025', day: 'T6', time: 'Off', status: 'off' },
        { date: '18/10/2025', day: 'T7', time: '16:00-00:00', status: 'confirmed' },
        { date: '19/10/2025', day: 'CN', time: '16:00-00:00', status: 'confirmed' },
      ],
    },
  ]);

  const filteredStaff = staffList.filter(staff =>
    staff.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    staff.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
    staff.role.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const stats = {
    total: staffList.length,
    active: staffList.filter(s => s.status === 'active').length,
    totalSalary: staffList.reduce((sum, s) => sum + s.totalSalary, 0),
    avgSalary: staffList.length > 0 ? staffList.reduce((sum, s) => sum + s.totalSalary, 0) / staffList.length : 0,
  };

  const handleSaveStaff = (staffData: any) => {
    if (editingStaff) {
      setStaffList(prev =>
        prev.map(staff => (staff.id === editingStaff.id ? { ...staff, ...staffData } : staff))
      );
      toast.success('Đã cập nhật thông tin nhân viên');
    } else {
      const newStaff = {
        id: `NV${(staffList.length + 1).toString().padStart(3, '0')}`,
        ...staffData,
        status: 'active',
        totalSalary: staffData.baseSalary + (staffData.bonus || 0),
        workHours: 0,
        attendance: { present: 0, absent: 0, late: 0 },
        leaves: 0,
        violations: 0,
        performance: 0,
      };
      setStaffList(prev => [...prev, newStaff]);
      toast.success('Đã thêm nhân viên mới');
    }
    setIsDialogOpen(false);
    setEditingStaff(null);
  };

  const handleDeleteStaff = (staffId: string) => {
    if (confirm('Bạn có chắc chắn muốn xóa nhân viên này?')) {
      setStaffList(prev => prev.filter(staff => staff.id !== staffId));
      toast.success('Đã xóa nhân viên');
      if (viewMode === 'detail') {
        setViewMode('list');
        setSelectedStaff(null);
      }
    }
  };

  const handleUpdateSalary = (staffId: string, salaryData: any) => {
    setStaffList(prev =>
      prev.map(staff =>
        staff.id === staffId
          ? {
              ...staff,
              baseSalary: salaryData.baseSalary,
              bonus: salaryData.bonus,
              totalSalary: salaryData.baseSalary + salaryData.bonus,
            }
          : staff
      )
    );
    toast.success('Đã cập nhật lương', {
      icon: <DollarSign className="w-5 h-5" />,
    });
    setIsSalaryDialogOpen(false);
    setSelectedStaffForSalary(null);
  };

  const renderStaffDetail = (staff: any) => {
    const attendanceRate = ((staff.attendance.present / (staff.attendance.present + staff.attendance.absent)) * 100).toFixed(0);

    return (
      <div className="pb-20">
        {/* Header */}
        <div className="sticky top-0 z-50 bg-gradient-to-br from-[#9333ea] to-[#6b21a8] p-4 rounded-b-[20px]">
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
              <p className="text-xs text-gray-200 truncate">{staff.id} • {staff.role}</p>
            </div>
            <Badge className="bg-green-500/20 text-green-400 border-green-500/30">
              Đang làm
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
          <Card className="bg-card border-[#9333ea]/30 p-4">
            <h3 className="text-white text-sm mb-3" style={{ fontWeight: 600 }}>
              Thông tin cơ bản
            </h3>
            <div className="space-y-2 text-xs">
              <div className="flex justify-between">
                <span className="text-gray-400">Vị trí:</span>
                <span className="text-white" style={{ fontWeight: 600 }}>{staff.role}</span>
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
                <span className="text-gray-400">Giờ làm tháng này:</span>
                <span className="text-white" style={{ fontWeight: 600 }}>{staff.workHours}h</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">Lương:</span>
                <span className="text-[#ffd700]" style={{ fontWeight: 600 }}>
                  {staff.totalSalary.toLocaleString('vi-VN')}đ
                </span>
              </div>
            </div>
          </Card>

          {/* Chấm công */}
          <Card className="bg-card border-[#ffd700]/30 p-4">
            <h3 className="text-white text-sm mb-3" style={{ fontWeight: 600 }}>
              Chấm công tháng này
            </h3>
            
            <div className="grid grid-cols-3 gap-3 mb-3">
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

            <div className="pt-3 border-t border-gray-700/50">
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
                className="w-full bg-[#9333ea]/20 hover:bg-[#9333ea]/30 text-[#9333ea] h-9 text-xs justify-start"
                onClick={() => {
                  setSelectedStaffForShift(staff);
                  setIsShiftDialogOpen(true);
                }}
              >
                <Calendar className="w-4 h-4 mr-2" />
                Xếp lịch làm việc
              </Button>

              <Button
                size="sm"
                className="w-full bg-green-500/20 hover:bg-green-500/30 text-green-400 h-9 text-xs justify-start"
                onClick={() => {
                  setSelectedStaffForSalary(staff);
                  setIsSalaryDialogOpen(true);
                }}
              >
                <DollarSign className="w-4 h-4 mr-2" />
                Cập nhật lương
              </Button>

              <Button
                size="sm"
                variant="outline"
                className="w-full border-red-500/30 text-red-400 hover:bg-red-500/10 h-9 text-xs justify-start"
                onClick={() => handleDeleteStaff(staff.id)}
              >
                <Trash2 className="w-4 h-4 mr-2" />
                Xóa nhân viên
              </Button>
            </div>
          </Card>
        </div>
      </div>
    );
  };

  const renderStaffList = () => (
    <div className="space-y-4">
      {/* Search */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
        <Input
          placeholder="Tìm kiếm nhân viên..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="pl-10 bg-card border-[#ffd700]/30 text-white"
        />
      </div>

      {/* Staff Cards */}
      <div className="space-y-3">
        {filteredStaff.map(staff => (
          <Card
            key={staff.id}
            className="bg-card border-[#ffd700]/30 p-4 cursor-pointer hover:border-[#ffd700] transition-all"
            onClick={() => {
              setSelectedStaff(staff);
              setViewMode('detail');
            }}
          >
            <div className="flex items-start justify-between mb-3">
              <div className="flex items-start gap-3 flex-1">
                <div className="w-12 h-12 rounded-full bg-[#9333ea]/20 flex items-center justify-center flex-shrink-0">
                  <Users className="w-6 h-6 text-[#9333ea]" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <h3 className="text-white text-sm" style={{ fontWeight: 600 }}>
                      {staff.name}
                    </h3>
                    <Badge className="bg-green-500/20 text-green-400 text-xs">
                      {staff.status === 'active' ? 'Đang làm' : 'Nghỉ'}
                    </Badge>
                  </div>
                  <p className="text-xs text-gray-400">{staff.id} • {staff.role}</p>
                  <p className="text-xs text-gray-400 mt-1">
                    📞 {staff.phone}
                  </p>
                  <div className="flex items-center gap-3 text-xs text-gray-400 mt-1">
                    <span>Hiệu suất: <span className="text-white">{staff.performance}%</span></span>
                    <span>•</span>
                    <span>Vi phạm: <span className={staff.violations > 0 ? 'text-red-400' : 'text-green-400'}>
                      {staff.violations}
                    </span></span>
                  </div>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-2 mb-3 p-2 bg-[#1a1a24] rounded-lg">
              <div>
                <p className="text-xs text-gray-400 mb-0.5">Lương cơ bản</p>
                <p className="text-xs text-white" style={{ fontWeight: 600 }}>
                  {(staff.baseSalary / 1000000).toFixed(1)}M
                </p>
              </div>
              <div>
                <p className="text-xs text-gray-400 mb-0.5">Tổng lương</p>
                <p className="text-xs text-[#ffd700]" style={{ fontWeight: 700 }}>
                  {(staff.totalSalary / 1000000).toFixed(1)}M
                </p>
              </div>
            </div>

            <div className="flex gap-2">
              <Button
                size="sm"
                className="flex-1 bg-[#9333ea]/20 hover:bg-[#9333ea]/30 text-[#9333ea] h-8 text-xs"
                onClick={(e) => {
                  e.stopPropagation();
                  setSelectedStaffForShift(staff);
                  setIsShiftDialogOpen(true);
                }}
              >
                <Calendar className="w-3 h-3 mr-1" />
                Ca làm
              </Button>
              <Button
                size="sm"
                className="flex-1 bg-green-500/20 hover:bg-green-500/30 text-green-400 h-8 text-xs"
                onClick={(e) => {
                  e.stopPropagation();
                  setSelectedStaffForSalary(staff);
                  setIsSalaryDialogOpen(true);
                }}
              >
                <DollarSign className="w-3 h-3 mr-1" />
                Lương
              </Button>
              <Button
                size="sm"
                className="bg-[#ffd700]/20 hover:bg-[#ffd700]/30 text-[#ffd700] h-8 px-2"
                onClick={(e) => {
                  e.stopPropagation();
                  setEditingStaff(staff);
                  setIsDialogOpen(true);
                }}
              >
                <Edit className="w-3 h-3" />
              </Button>
              <Button
                size="sm"
                className="bg-red-500/20 hover:bg-red-500/30 text-red-400 h-8 px-2"
                onClick={(e) => {
                  e.stopPropagation();
                  handleDeleteStaff(staff.id);
                }}
              >
                <Trash2 className="w-3 h-3" />
              </Button>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );

  const renderShiftSchedule = () => (
    <div className="space-y-4">
      <p className="text-xs text-gray-400">
        Tuần 42 - Tháng 10/2025
      </p>

      {shiftSchedule.map((schedule) => (
        <Card
          key={schedule.staffId}
          className="bg-card border-[#9333ea]/30 p-4"
        >
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-[#9333ea]/20 flex items-center justify-center">
                <Users className="w-4 h-4 text-[#9333ea]" />
              </div>
              <div>
                <p className="text-white text-sm" style={{ fontWeight: 600 }}>
                  {schedule.staffName}
                </p>
                <p className="text-xs text-gray-400">
                  {schedule.shifts.filter(s => s.status === 'confirmed').length} ca làm
                </p>
              </div>
            </div>
            <Button
              size="sm"
              className="bg-[#ffd700] hover:bg-[#ffed4e] text-black h-7 px-3 text-xs"
              onClick={() => {
                const staff = staffList.find(s => s.id === schedule.staffId);
                setSelectedStaffForShift(staff);
                setIsShiftDialogOpen(true);
              }}
            >
              Sửa
            </Button>
          </div>

          <div className="grid grid-cols-7 gap-1">
            {schedule.shifts.map((shift, idx) => (
              <div
                key={idx}
                className={`p-2 rounded-lg text-center ${
                  shift.status === 'confirmed'
                    ? 'bg-green-500/10 border border-green-500/30'
                    : shift.status === 'off'
                    ? 'bg-gray-500/10 border border-gray-500/30'
                    : 'bg-yellow-500/10 border border-yellow-500/30'
                }`}
              >
                <p className="text-xs text-gray-400 mb-0.5">{shift.day}</p>
                <p className="text-xs text-white" style={{ fontWeight: 600 }}>
                  {shift.date.split('/')[0]}
                </p>
                <p className="text-xs text-gray-400 mt-0.5 truncate">
                  {shift.time}
                </p>
              </div>
            ))}
          </div>
        </Card>
      ))}
    </div>
  );

  const renderSalaryList = () => (
    <div className="space-y-3">
      <Card className="bg-gradient-to-r from-[#9333ea]/20 to-[#ffd700]/20 border-[#ffd700]/50 p-4">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <p className="text-xs text-gray-400 mb-1">Tổng quỹ lương</p>
            <p className="text-lg text-[#ffd700]" style={{ fontWeight: 700 }}>
              {(stats.totalSalary / 1000000).toFixed(1)}M
            </p>
          </div>
          <div>
            <p className="text-xs text-gray-400 mb-1">TB/người</p>
            <p className="text-lg text-white" style={{ fontWeight: 700 }}>
              {(stats.avgSalary / 1000000).toFixed(1)}M
            </p>
          </div>
        </div>
      </Card>

      {staffList.map(staff => (
        <Card
          key={staff.id}
          className="bg-card border-[#ffd700]/30 p-4"
        >
          <div className="flex items-start justify-between mb-3">
            <div className="flex-1">
              <h3 className="text-white text-sm mb-1" style={{ fontWeight: 600 }}>
                {staff.name}
              </h3>
              <p className="text-xs text-gray-400">{staff.role} • {staff.workHours}h</p>
            </div>
            <Button
              size="sm"
              className="bg-[#ffd700]/20 hover:bg-[#ffd700]/30 text-[#ffd700] h-7 px-3 text-xs"
              onClick={() => {
                setSelectedStaffForSalary(staff);
                setIsSalaryDialogOpen(true);
              }}
            >
              Sửa
            </Button>
          </div>

          <div className="space-y-2">
            <div className="flex items-center justify-between text-sm">
              <span className="text-gray-400">Lương cơ bản:</span>
              <span className="text-white">{staff.baseSalary.toLocaleString('vi-VN')}đ</span>
            </div>
            <div className="flex items-center justify-between text-sm">
              <span className="text-gray-400">Thưởng:</span>
              <span className="text-green-400">+{staff.bonus.toLocaleString('vi-VN')}đ</span>
            </div>
            <div className="border-t border-[#ffd700]/10 pt-2 flex items-center justify-between">
              <span className="text-white" style={{ fontWeight: 600 }}>Tổng:</span>
              <span className="text-[#ffd700] text-base" style={{ fontWeight: 700 }}>
                {staff.totalSalary.toLocaleString('vi-VN')}đ
              </span>
            </div>
          </div>
        </Card>
      ))}
    </div>
  );

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
      <div className="sticky top-0 z-50 bg-gradient-to-br from-[#9333ea] to-[#6b21a8] p-4 rounded-b-[20px]">
        <div className="flex items-center gap-3 mb-4">
          <button
            onClick={onBack}
            className="w-9 h-9 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20"
          >
            <ArrowLeft className="w-5 h-5 text-white" />
          </button>
          <div className="flex-1">
            <h1 className="text-base text-white" style={{ fontWeight: 700 }}>
              Quản lý nhân sự
            </h1>
            <p className="text-xs text-gray-300">{stats.total} nhân viên</p>
          </div>
          <Button
            size="sm"
            className="bg-[#ffd700] hover:bg-[#ffed4e] text-black h-9 rounded-full"
            onClick={() => {
              setEditingStaff(null);
              setIsDialogOpen(true);
            }}
          >
            <UserPlus className="w-4 h-4 mr-1" />
            Thêm
          </Button>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-2">
          <div className="bg-white/10 backdrop-blur-sm rounded-lg p-2 text-center">
            <p className="text-base text-white" style={{ fontWeight: 700 }}>{stats.active}</p>
            <p className="text-xs text-gray-300">Đang làm</p>
          </div>
          <div className="bg-white/10 backdrop-blur-sm rounded-lg p-2 text-center">
            <p className="text-base text-white" style={{ fontWeight: 700 }}>
              {(stats.avgSalary / 1000000).toFixed(1)}M
            </p>
            <p className="text-xs text-gray-300">TB lương</p>
          </div>
          <div className="bg-white/10 backdrop-blur-sm rounded-lg p-2 text-center">
            <p className="text-base text-[#ffd700]" style={{ fontWeight: 700 }}>
              {(stats.totalSalary / 1000000).toFixed(0)}M
            </p>
            <p className="text-xs text-gray-300">Quỹ lương</p>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="px-4 pt-4">
        <TabsList className="grid w-full grid-cols-3 bg-card">
          <TabsTrigger value="list" className="text-xs">
            Danh sách
          </TabsTrigger>
          <TabsTrigger value="shift" className="text-xs">
            Ca làm
          </TabsTrigger>
          <TabsTrigger value="salary" className="text-xs">
            Lương
          </TabsTrigger>
        </TabsList>

        <ScrollArea className="h-[calc(100vh-280px)] mt-4">
          <TabsContent value="list">{renderStaffList()}</TabsContent>
          <TabsContent value="shift">{renderShiftSchedule()}</TabsContent>
          <TabsContent value="salary">{renderSalaryList()}</TabsContent>
        </ScrollArea>
      </Tabs>

      {/* Staff Edit Dialog */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <StaffEditDialog
          staff={editingStaff}
          onSave={handleSaveStaff}
          onClose={() => {
            setIsDialogOpen(false);
            setEditingStaff(null);
          }}
        />
      </Dialog>

      {/* Shift Schedule Dialog */}
      <Dialog open={isShiftDialogOpen} onOpenChange={setIsShiftDialogOpen}>
        <ShiftEditDialog
          staff={selectedStaffForShift}
          onClose={() => {
            setIsShiftDialogOpen(false);
            setSelectedStaffForShift(null);
          }}
          onSave={(shifts) => {
            // Update shift schedule
            toast.success('Đã cập nhật lịch làm việc');
            setIsShiftDialogOpen(false);
          }}
        />
      </Dialog>

      {/* Salary Edit Dialog */}
      <Dialog open={isSalaryDialogOpen} onOpenChange={setIsSalaryDialogOpen}>
        <SalaryEditDialog
          staff={selectedStaffForSalary}
          onClose={() => {
            setIsSalaryDialogOpen(false);
            setSelectedStaffForSalary(null);
          }}
          onSave={(salaryData) => {
            if (selectedStaffForSalary) {
              handleUpdateSalary(selectedStaffForSalary.id, salaryData);
            }
          }}
        />
      </Dialog>
    </div>
  );
}

// Staff Edit Dialog Component
function StaffEditDialog({ staff, onSave, onClose }: any) {
  const [formData, setFormData] = useState(
    staff || {
      name: '',
      role: 'Phục vụ',
      phone: '',
      email: '',
      baseSalary: 6000000,
      bonus: 0,
      joinDate: new Date().toISOString().split('T')[0],
    }
  );

  return (
    <DialogContent className="bg-card border-[#ffd700]/30 text-white max-w-sm" aria-describedby={undefined}>
      <DialogHeader>
        <DialogTitle>{staff ? 'Chỉnh sửa nhân viên' : 'Thêm nhân viên mới'}</DialogTitle>
      </DialogHeader>
      <ScrollArea className="max-h-[60vh]">
        <div className="space-y-4 py-4 pr-4">
          <div>
            <Label htmlFor="name" className="text-xs text-gray-400 mb-1.5 block">
              Họ và tên *
            </Label>
            <Input
              id="name"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="bg-[#1a1a24] border-gray-700 text-white"
              placeholder="Nguyễn Văn A"
            />
          </div>

          <div>
            <Label htmlFor="role" className="text-xs text-gray-400 mb-1.5 block">
              Vị trí
            </Label>
            <Select
              value={formData.role}
              onValueChange={(value) => setFormData({ ...formData, role: value })}
            >
              <SelectTrigger className="bg-[#1a1a24] border-gray-700">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Phục vụ">Phục vụ</SelectItem>
                <SelectItem value="Pha chế">Pha chế</SelectItem>
                <SelectItem value="Thu ngân">Thu ngân</SelectItem>
                <SelectItem value="Bảo vệ">Bảo vệ</SelectItem>
                <SelectItem value="Kỹ thuật">Kỹ thuật</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label htmlFor="phone" className="text-xs text-gray-400 mb-1.5 block">
              Số điện thoại *
            </Label>
            <Input
              id="phone"
              value={formData.phone}
              onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
              className="bg-[#1a1a24] border-gray-700 text-white"
              placeholder="0912345678"
            />
          </div>

          <div>
            <Label htmlFor="email" className="text-xs text-gray-400 mb-1.5 block">
              Email
            </Label>
            <Input
              id="email"
              type="email"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              className="bg-[#1a1a24] border-gray-700 text-white"
              placeholder="example@email.com"
            />
          </div>

          <div>
            <Label htmlFor="baseSalary" className="text-xs text-gray-400 mb-1.5 block">
              Lương cơ bản (đ)
            </Label>
            <Input
              id="baseSalary"
              type="number"
              value={formData.baseSalary}
              onChange={(e) => setFormData({ ...formData, baseSalary: parseInt(e.target.value) })}
              className="bg-[#1a1a24] border-gray-700 text-white"
              placeholder="6000000"
            />
          </div>

          <div>
            <Label htmlFor="joinDate" className="text-xs text-gray-400 mb-1.5 block">
              Ngày vào làm
            </Label>
            <Input
              id="joinDate"
              type="date"
              value={formData.joinDate}
              onChange={(e) => setFormData({ ...formData, joinDate: e.target.value })}
              className="bg-[#1a1a24] border-gray-700 text-white"
            />
          </div>
        </div>
      </ScrollArea>

      <div className="flex gap-2">
        <Button
          variant="outline"
          className="flex-1 border-gray-700 text-white hover:bg-gray-800"
          onClick={onClose}
        >
          Hủy
        </Button>
        <Button
          className="flex-1 bg-[#ffd700] hover:bg-[#ffed4e] text-black"
          onClick={() => onSave(formData)}
        >
          {staff ? 'Cập nhật' : 'Thêm'}
        </Button>
      </div>
    </DialogContent>
  );
}

// Shift Edit Dialog Component
function ShiftEditDialog({ staff, onClose, onSave }: any) {
  const [shifts, setShifts] = useState([
    { date: '13/10/2025', day: 'T2', time: '08:00-16:00', status: 'confirmed' },
    { date: '14/10/2025', day: 'T3', time: '08:00-16:00', status: 'confirmed' },
    { date: '15/10/2025', day: 'T4', time: '08:00-16:00', status: 'confirmed' },
    { date: '16/10/2025', day: 'T5', time: 'Off', status: 'off' },
    { date: '17/10/2025', day: 'T6', time: '08:00-16:00', status: 'confirmed' },
    { date: '18/10/2025', day: 'T7', time: '08:00-16:00', status: 'confirmed' },
    { date: '19/10/2025', day: 'CN', time: 'Off', status: 'off' },
  ]);

  const handleShiftChange = (index: number, time: string) => {
    setShifts(prev =>
      prev.map((shift, idx) =>
        idx === index
          ? { ...shift, time, status: time === 'Off' ? 'off' : 'confirmed' }
          : shift
      )
    );
  };

  return (
    <DialogContent className="bg-card border-[#ffd700]/30 text-white max-w-sm" aria-describedby={undefined}>
      <DialogHeader>
        <DialogTitle>
          Xếp lịch - {staff?.name}
        </DialogTitle>
      </DialogHeader>
      <ScrollArea className="max-h-[60vh]">
        <div className="space-y-3 py-4 pr-4">
          {shifts.map((shift, idx) => (
            <div key={idx} className="flex items-center gap-3">
              <div className="w-16 flex-shrink-0">
                <p className="text-xs text-gray-400">{shift.day}</p>
                <p className="text-sm text-white" style={{ fontWeight: 600 }}>
                  {shift.date}
                </p>
              </div>
              <Select
                value={shift.time}
                onValueChange={(value) => handleShiftChange(idx, value)}
              >
                <SelectTrigger className="bg-[#1a1a24] border-gray-700 flex-1">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="08:00-16:00">Ca sáng (08:00-16:00)</SelectItem>
                  <SelectItem value="16:00-00:00">Ca tối (16:00-00:00)</SelectItem>
                  <SelectItem value="00:00-08:00">Ca đêm (00:00-08:00)</SelectItem>
                  <SelectItem value="Off">Nghỉ</SelectItem>
                </SelectContent>
              </Select>
            </div>
          ))}
        </div>
      </ScrollArea>

      <div className="flex gap-2">
        <Button
          variant="outline"
          className="flex-1 border-gray-700 text-white hover:bg-gray-800"
          onClick={onClose}
        >
          Hủy
        </Button>
        <Button
          className="flex-1 bg-[#ffd700] hover:bg-[#ffed4e] text-black"
          onClick={() => onSave(shifts)}
        >
          Lưu lịch
        </Button>
      </div>
    </DialogContent>
  );
}

// Salary Edit Dialog Component
function SalaryEditDialog({ staff, onClose, onSave }: any) {
  const [salaryData, setSalaryData] = useState({
    baseSalary: staff?.baseSalary || 6000000,
    bonus: staff?.bonus || 0,
    deduction: 0,
    note: '',
  });

  const totalSalary = salaryData.baseSalary + salaryData.bonus - salaryData.deduction;

  return (
    <DialogContent className="bg-card border-[#ffd700]/30 text-white max-w-sm" aria-describedby={undefined}>
      <DialogHeader>
        <DialogTitle>
          Cập nhật lương - {staff?.name}
        </DialogTitle>
      </DialogHeader>
      <div className="space-y-4 py-4">
        <div>
          <Label htmlFor="baseSalary" className="text-xs text-gray-400 mb-1.5 block">
            Lương cơ bản (đ)
          </Label>
          <Input
            id="baseSalary"
            type="number"
            value={salaryData.baseSalary}
            onChange={(e) => setSalaryData({ ...salaryData, baseSalary: parseInt(e.target.value) })}
            className="bg-[#1a1a24] border-gray-700 text-white"
          />
        </div>

        <div>
          <Label htmlFor="bonus" className="text-xs text-gray-400 mb-1.5 block">
            Thưởng (đ)
          </Label>
          <Input
            id="bonus"
            type="number"
            value={salaryData.bonus}
            onChange={(e) => setSalaryData({ ...salaryData, bonus: parseInt(e.target.value) })}
            className="bg-[#1a1a24] border-gray-700 text-white"
          />
        </div>

        <div>
          <Label htmlFor="deduction" className="text-xs text-gray-400 mb-1.5 block">
            Khấu trừ (đ)
          </Label>
          <Input
            id="deduction"
            type="number"
            value={salaryData.deduction}
            onChange={(e) => setSalaryData({ ...salaryData, deduction: parseInt(e.target.value) })}
            className="bg-[#1a1a24] border-gray-700 text-white"
          />
        </div>

        <Card className="bg-gradient-to-r from-[#9333ea]/20 to-[#ffd700]/20 border-[#ffd700]/50 p-3">
          <div className="flex items-center justify-between">
            <span className="text-white" style={{ fontWeight: 600 }}>Tổng lương:</span>
            <span className="text-[#ffd700] text-lg" style={{ fontWeight: 700 }}>
              {totalSalary.toLocaleString('vi-VN')}đ
            </span>
          </div>
        </Card>
      </div>

      <div className="flex gap-2">
        <Button
          variant="outline"
          className="flex-1 border-gray-700 text-white hover:bg-gray-800"
          onClick={onClose}
        >
          Hủy
        </Button>
        <Button
          className="flex-1 bg-[#ffd700] hover:bg-[#ffed4e] text-black"
          onClick={() => onSave(salaryData)}
        >
          Cập nhật
        </Button>
      </div>
    </DialogContent>
  );
}
