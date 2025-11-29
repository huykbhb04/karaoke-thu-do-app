import { useState } from 'react';
import { Building2, Users, BarChart3, Settings, LogOut, Plus, Edit, Trash2, ArrowLeft, ArrowRight, Shield, X, Check, AlertCircle } from 'lucide-react';
import { Button } from './ui/button';
import { Card } from './ui/card';
import { Badge } from './ui/badge';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Textarea } from './ui/textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from './ui/select';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from './ui/dialog';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from './ui/alert-dialog';

interface AdminDashboardProps {
  userName: string;
  onNavigate: (screen: string, data?: any) => void;
}

interface Branch {
  id: number;
  name: string;
  address: string;
  manager: string;
  rooms: number;
  staff: number;
  status: string;
  revenue: string;
  phone?: string;
  email?: string;
}

interface User {
  id: number;
  name: string;
  email: string;
  role: string;
  branch: string;
  phone?: string;
  password?: string;
}

export function AdminDashboard({ userName, onNavigate }: AdminDashboardProps) {
  const [activeTab, setActiveTab] = useState('home');
  const [branches, setBranches] = useState<Branch[]>([
    {
      id: 1,
      name: 'Karaoke Thủ Đô Hà Nội',
      address: '123 Đường Láng, Đống Đa, Hà Nội',
      manager: 'Nguyễn Văn A',
      rooms: 12,
      staff: 45,
      status: 'active',
      revenue: '850,000,000đ',
      phone: '024 1234 5678',
      email: 'hanoi@karaoke.vn',
    },
    {
      id: 2,
      name: 'Karaoke Thủ Đô TP.HCM',
      address: '456 Nguyễn Huệ, Quận 1, TP.HCM',
      manager: 'Trần Thị B',
      rooms: 15,
      staff: 60,
      status: 'active',
      revenue: '1,200,000,000đ',
      phone: '028 9876 5432',
      email: 'hcm@karaoke.vn',
    },
    {
      id: 3,
      name: 'Karaoke Thủ Đô Đà Nẵng',
      address: '789 Trần Phú, Hải Châu, Đà Nẵng',
      manager: 'Lê Văn C',
      rooms: 10,
      staff: 40,
      status: 'active',
      revenue: '400,000,000đ',
      phone: '0236 3456 789',
      email: 'danang@karaoke.vn',
    },
  ]);

  const [allUsers, setAllUsers] = useState<User[]>([
    { id: 1, name: 'Nguyễn Văn A', email: 'nguyenvana@email.com', role: 'manager', branch: 'Hà Nội', phone: '0987654321' },
    { id: 2, name: 'Trần Thị B', email: 'tranthib@email.com', role: 'manager', branch: 'TP.HCM', phone: '0912345678' },
    { id: 3, name: 'Lê Văn C', email: 'levanc@email.com', role: 'manager', branch: 'Đà Nẵng', phone: '0976543210' },
    { id: 4, name: 'Phạm Thị D', email: 'phamthid@email.com', role: 'staff', branch: 'Hà Nội', phone: '0965432109' },
    { id: 5, name: 'Hoàng Văn E', email: 'hoangvane@email.com', role: 'staff', branch: 'TP.HCM', phone: '0954321098' },
  ]);

  // Modal states
  const [showBranchModal, setShowBranchModal] = useState(false);
  const [showUserModal, setShowUserModal] = useState(false);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [editingBranch, setEditingBranch] = useState<Branch | null>(null);
  const [editingUser, setEditingUser] = useState<User | null>(null);
  const [deleteTarget, setDeleteTarget] = useState<{ type: 'branch' | 'user'; id: number; name: string } | null>(null);

  // Form states
  const [branchForm, setBranchForm] = useState({
    name: '',
    address: '',
    manager: '',
    phone: '',
    email: '',
    rooms: 0,
    staff: 0,
  });

  const [userForm, setUserForm] = useState({
    name: '',
    email: '',
    phone: '',
    role: 'staff',
    branch: '',
    password: '',
  });

  const systemStats = {
    totalBranches: branches.length,
    totalUsers: allUsers.length,
    totalRevenue: '2,450,000,000đ',
    activeBookings: 68,
  };

  // Branch CRUD operations
  const handleAddBranch = () => {
    setEditingBranch(null);
    setBranchForm({
      name: '',
      address: '',
      manager: '',
      phone: '',
      email: '',
      rooms: 0,
      staff: 0,
    });
    setShowBranchModal(true);
  };

  const handleEditBranch = (branch: Branch) => {
    setEditingBranch(branch);
    setBranchForm({
      name: branch.name,
      address: branch.address,
      manager: branch.manager,
      phone: branch.phone || '',
      email: branch.email || '',
      rooms: branch.rooms,
      staff: branch.staff,
    });
    setShowBranchModal(true);
  };

  const handleSaveBranch = () => {
    if (editingBranch) {
      // Update existing branch
      setBranches(branches.map(b => 
        b.id === editingBranch.id 
          ? { 
              ...b, 
              ...branchForm, 
              revenue: b.revenue,
              status: b.status 
            }
          : b
      ));
    } else {
      // Add new branch
      const newBranch: Branch = {
        id: Math.max(...branches.map(b => b.id)) + 1,
        ...branchForm,
        status: 'active',
        revenue: '0đ',
      };
      setBranches([...branches, newBranch]);
    }
    setShowBranchModal(false);
  };

  const handleDeleteBranch = (branch: Branch) => {
    setDeleteTarget({ type: 'branch', id: branch.id, name: branch.name });
    setShowDeleteDialog(true);
  };

  // User CRUD operations
  const handleAddUser = () => {
    setEditingUser(null);
    setUserForm({
      name: '',
      email: '',
      phone: '',
      role: 'staff',
      branch: '',
      password: '',
    });
    setShowUserModal(true);
  };

  const handleEditUser = (user: User) => {
    setEditingUser(user);
    setUserForm({
      name: user.name,
      email: user.email,
      phone: user.phone || '',
      role: user.role,
      branch: user.branch,
      password: '',
    });
    setShowUserModal(true);
  };

  const handleSaveUser = () => {
    if (editingUser) {
      // Update existing user
      setAllUsers(allUsers.map(u => 
        u.id === editingUser.id 
          ? { ...u, ...userForm }
          : u
      ));
    } else {
      // Add new user
      const newUser: User = {
        id: Math.max(...allUsers.map(u => u.id)) + 1,
        ...userForm,
      };
      setAllUsers([...allUsers, newUser]);
    }
    setShowUserModal(false);
  };

  const handleDeleteUser = (user: User) => {
    setDeleteTarget({ type: 'user', id: user.id, name: user.name });
    setShowDeleteDialog(true);
  };

  const handleResetPassword = (user: User) => {
    const newPassword = 'Karaoke@' + Math.floor(Math.random() * 10000);
    alert(`Mật khẩu mới cho ${user.name}:\n\n${newPassword}\n\nVui lòng lưu lại và gửi cho người dùng!`);
  };

  const confirmDelete = () => {
    if (deleteTarget) {
      if (deleteTarget.type === 'branch') {
        setBranches(branches.filter(b => b.id !== deleteTarget.id));
      } else {
        setAllUsers(allUsers.filter(u => u.id !== deleteTarget.id));
      }
    }
    setShowDeleteDialog(false);
    setDeleteTarget(null);
  };

  const renderHome = () => (
    <div className="pb-20">
      {/* Header */}
      <div className="bg-gradient-to-br from-[#1a1a24] via-[#9333ea] to-[#6b21a8] p-6 rounded-b-[30px]">
        <div className="flex items-center justify-between mb-6">
          <div>
            <p className="text-gray-300 text-sm">System Administrator</p>
            <h1 className="text-2xl text-white" style={{ fontWeight: 700 }}>{userName}</h1>
          </div>
          <div className="w-12 h-12 rounded-full bg-[#ffd700] flex items-center justify-center">
            <Settings className="w-6 h-6 text-black" />
          </div>
        </div>

        {/* System Stats */}
        <div className="grid grid-cols-2 gap-3">
          <Card className="bg-white/10 border-white/20 p-4 backdrop-blur-sm">
            <p className="text-gray-300 text-sm mb-1">Tổng cơ sở</p>
            <p className="text-white text-xl" style={{ fontWeight: 600 }}>{systemStats.totalBranches}</p>
          </Card>
          <Card className="bg-white/10 border-white/20 p-4 backdrop-blur-sm">
            <p className="text-gray-300 text-sm mb-1">Tổng người dùng</p>
            <p className="text-white text-xl" style={{ fontWeight: 600 }}>{systemStats.totalUsers}</p>
          </Card>
          <Card className="bg-white/10 border-white/20 p-4 backdrop-blur-sm">
            <p className="text-gray-300 text-sm mb-1">Doanh thu tháng này</p>
            <p className="text-white text-lg" style={{ fontWeight: 600 }}>2.45 tỷ</p>
          </Card>
          <Card className="bg-white/10 border-white/20 p-4 backdrop-blur-sm">
            <p className="text-gray-300 text-sm mb-1">Booking đang hoạt động</p>
            <p className="text-white text-xl" style={{ fontWeight: 600 }}>{systemStats.activeBookings}</p>
          </Card>
        </div>
      </div>

      {/* Main Menu */}
      <div className="px-6 py-6">
        <div className="space-y-3">
          <Card
            className="bg-card border-[#ffd700]/20 p-4 cursor-pointer hover:border-[#ffd700] transition-all hover:shadow-lg hover:shadow-[#ffd700]/20"
            onClick={() => setActiveTab('branches')}
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-full bg-[#ffd700]/20 flex items-center justify-center">
                  <Building2 className="w-6 h-6 text-[#ffd700]" />
                </div>
                <div>
                  <h3 className="text-white">Quản lý cơ sở</h3>
                  <p className="text-sm text-gray-400">Thêm/Sửa/Xóa chi nhánh</p>
                </div>
              </div>
              <Badge className="bg-[#ffd700] text-black">{branches.length}</Badge>
            </div>
          </Card>

          <Card
            className="bg-card border-[#9333ea]/20 p-4 cursor-pointer hover:border-[#9333ea] transition-all hover:shadow-lg hover:shadow-[#9333ea]/20"
            onClick={() => setActiveTab('users')}
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-full bg-[#9333ea]/20 flex items-center justify-center">
                  <Users className="w-6 h-6 text-[#9333ea]" />
                </div>
                <div>
                  <h3 className="text-white">Quản lý nhân sự</h3>
                  <p className="text-sm text-gray-400">Toàn hệ thống</p>
                </div>
              </div>
              <Badge className="bg-[#9333ea]">{allUsers.length}</Badge>
            </div>
          </Card>

          <Card
            className="bg-card border-[#ffd700]/20 p-4 cursor-pointer hover:border-[#ffd700] transition-all hover:shadow-lg hover:shadow-[#ffd700]/20"
            onClick={() => onNavigate('system-report')}
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-full bg-[#ffd700]/20 flex items-center justify-center">
                  <BarChart3 className="w-6 h-6 text-[#ffd700]" />
                </div>
                <div>
                  <h3 className="text-white">Báo cáo hệ thống</h3>
                  <p className="text-sm text-gray-400">Thống kê & phân tích</p>
                </div>
              </div>
            </div>
          </Card>

          <Card
            className="bg-card border-[#9333ea]/20 p-4 cursor-pointer hover:border-[#9333ea] transition-all hover:shadow-lg hover:shadow-[#9333ea]/20"
            onClick={() => onNavigate('system-config')}
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-full bg-[#9333ea]/20 flex items-center justify-center">
                  <Settings className="w-6 h-6 text-[#9333ea]" />
                </div>
                <div>
                  <h3 className="text-white">Cấu hình hệ thống</h3>
                  <p className="text-sm text-gray-400">Quyền & cài đặt</p>
                </div>
              </div>
            </div>
          </Card>

          <Card
            className="bg-gradient-to-br from-red-500/10 to-orange-500/10 border-red-500/30 p-4 cursor-pointer hover:border-red-500/50 transition-all mt-6"
            onClick={() => onNavigate('admin-menu')}
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-full bg-red-500/20 flex items-center justify-center">
                  <Shield className="w-6 h-6 text-red-400" />
                </div>
                <div>
                  <h3 className="text-white" style={{ fontWeight: 600 }}>Quản lý nâng cao</h3>
                  <p className="text-sm text-gray-400">Toàn quyền Admin System</p>
                </div>
              </div>
              <ArrowRight className="w-5 h-5 text-gray-400" />
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

  const renderBranches = () => (
    <div className="pb-20">
      <div className="bg-gradient-to-br from-[#ffd700] to-[#d4af37] p-6 rounded-b-[30px]">
        <div className="flex items-center gap-4 mb-4">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setActiveTab('home')}
            className="text-black hover:bg-black/10"
          >
            <ArrowLeft className="w-6 h-6" />
          </Button>
          <h2 className="text-2xl text-black" style={{ fontWeight: 700 }}>Quản lý cơ sở</h2>
        </div>
        <Button
          onClick={() => handleAddBranch()}
          className="w-full h-12 rounded-[20px] bg-black hover:bg-black/80 text-[#ffd700]"
          style={{ fontWeight: 600 }}
        >
          <Plus className="w-5 h-5 mr-2" />
          Thêm cơ sở mới
        </Button>
      </div>

      <div className="px-6 py-6">
        <div className="space-y-4">
          {branches.map((branch) => (
            <Card
              key={branch.id}
              className="bg-card border-[#ffd700]/20 p-4"
            >
              <div className="flex items-start justify-between mb-3">
                <div className="flex-1">
                  <h3 className="text-white mb-1">{branch.name}</h3>
                  <p className="text-sm text-gray-400 mb-2">{branch.address}</p>
                  <div className="flex items-center gap-2 mb-2">
                    <Badge className="bg-green-500">{branch.status === 'active' ? 'Hoạt động' : 'Tạm đóng'}</Badge>
                    <span className="text-sm text-gray-400">Quản lý: {branch.manager}</span>
                  </div>
                  <div className="grid grid-cols-3 gap-2 mt-3">
                    <div>
                      <p className="text-xs text-gray-400">Phòng</p>
                      <p className="text-white" style={{ fontWeight: 600 }}>{branch.rooms}</p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-400">Nhân viên</p>
                      <p className="text-white" style={{ fontWeight: 600 }}>{branch.staff}</p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-400">Doanh thu</p>
                      <p className="text-[#ffd700] text-sm" style={{ fontWeight: 600 }}>
                        {(parseInt(branch.revenue.replace(/[^\d]/g, '')) / 1000000).toFixed(0)}M
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="flex gap-2 mt-3">
                <Button
                  size="sm"
                  variant="outline"
                  className="flex-1 border-[#ffd700]/50 text-[#ffd700] hover:bg-[#ffd700]/10"
                  onClick={() => handleEditBranch(branch)}
                >
                  <Edit className="w-4 h-4 mr-1" />
                  Sửa
                </Button>
                <Button
                  size="sm"
                  variant="outline"
                  className="border-red-500/50 text-red-500 hover:bg-red-500/10"
                  onClick={() => handleDeleteBranch(branch)}
                >
                  <Trash2 className="w-4 h-4" />
                </Button>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );

  const renderUsers = () => (
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
          <h2 className="text-2xl text-white" style={{ fontWeight: 700 }}>Quản lý nhân sự</h2>
        </div>
        <Button
          onClick={() => handleAddUser()}
          className="w-full h-12 rounded-[20px] bg-[#ffd700] hover:bg-[#ffed4e] text-black"
          style={{ fontWeight: 600 }}
        >
          <Plus className="w-5 h-5 mr-2" />
          Thêm người dùng
        </Button>
      </div>

      <div className="px-6 py-6">
        {/* Filter Tabs */}
        <div className="flex gap-2 mb-4 overflow-x-auto pb-2 no-scrollbar">
          <Badge className="bg-[#ffd700] text-black cursor-pointer">Tất cả ({allUsers.length})</Badge>
          <Badge className="bg-[#2a2a3a] text-gray-400 cursor-pointer">Quản lý (3)</Badge>
          <Badge className="bg-[#2a2a3a] text-gray-400 cursor-pointer">Nhân viên (2)</Badge>
        </div>

        <div className="space-y-3">
          {allUsers.map((user) => (
            <Card
              key={user.id}
              className="bg-card border-[#9333ea]/20 p-4"
            >
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-[#ffd700] flex items-center justify-center">
                    <span className="text-black" style={{ fontWeight: 600 }}>
                      {user.name.charAt(0)}
                    </span>
                  </div>
                  <div>
                    <h3 className="text-white">{user.name}</h3>
                    <p className="text-sm text-gray-400">{user.email}</p>
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-2 mb-3">
                <Badge className={user.role === 'manager' ? 'bg-[#ffd700] text-black' : 'bg-[#9333ea]'}>
                  {user.role === 'manager' ? '💼 Quản lý' : '👔 Nhân viên'}
                </Badge>
                <span className="text-sm text-gray-400">{user.branch}</span>
              </div>
              <div className="flex gap-2">
                <Button
                  size="sm"
                  variant="outline"
                  className="flex-1 border-[#9333ea]/50 text-[#9333ea] hover:bg-[#9333ea]/10"
                  onClick={() => handleEditUser(user)}
                >
                  <Edit className="w-4 h-4 mr-1" />
                  Sửa
                </Button>
                <Button
                  size="sm"
                  variant="outline"
                  className="border-yellow-500/50 text-yellow-500 hover:bg-yellow-500/10"
                  onClick={() => handleResetPassword(user)}
                >
                  Reset MK
                </Button>
                <Button
                  size="sm"
                  variant="outline"
                  className="border-red-500/50 text-red-500 hover:bg-red-500/10"
                  onClick={() => handleDeleteUser(user)}
                >
                  <Trash2 className="w-4 h-4" />
                </Button>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-background">
      {activeTab === 'home' && renderHome()}
      {activeTab === 'branches' && renderBranches()}
      {activeTab === 'users' && renderUsers()}

      {/* Bottom Navigation */}
      <div className="fixed bottom-0 left-0 right-0 bg-[#1a1a24] border-t border-[#ffd700]/20 px-2 py-2 max-w-md mx-auto">
        <div className="flex items-center justify-around">
          <button
            onClick={() => setActiveTab('home')}
            className={`flex flex-col items-center gap-0.5 transition-colors ${
              activeTab === 'home' ? 'text-[#ffd700]' : 'text-gray-400'
            }`}
          >
            <Settings className="w-5 h-5" />
            <span className="text-xs">Dashboard</span>
          </button>
          <button
            onClick={() => setActiveTab('branches')}
            className={`flex flex-col items-center gap-0.5 transition-colors ${
              activeTab === 'branches' ? 'text-[#ffd700]' : 'text-gray-400'
            }`}
          >
            <Building2 className="w-5 h-5" />
            <span className="text-xs">Cơ sở</span>
          </button>
          <button
            onClick={() => setActiveTab('users')}
            className={`flex flex-col items-center gap-0.5 transition-colors ${
              activeTab === 'users' ? 'text-[#ffd700]' : 'text-gray-400'
            }`}
          >
            <Users className="w-5 h-5" />
            <span className="text-xs">Nhân sự</span>
          </button>
          <button
            onClick={() => onNavigate('system-report')}
            className="flex flex-col items-center gap-0.5 transition-colors text-gray-400 hover:text-[#ffd700]"
          >
            <BarChart3 className="w-5 h-5" />
            <span className="text-xs">Báo cáo</span>
          </button>
        </div>
      </div>

      {/* Branch Modal */}
      <Dialog open={showBranchModal} onOpenChange={setShowBranchModal}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>{editingBranch ? 'Sửa cơ sở' : 'Thêm cơ sở mới'}</DialogTitle>
            <DialogDescription>
              {editingBranch ? 'Cập nhật thông tin cơ sở' : 'Nhập thông tin mới cho cơ sở'}
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="name">Tên cơ sở</Label>
              <Input
                id="name"
                value={branchForm.name}
                onChange={(e) => setBranchForm({ ...branchForm, name: e.target.value })}
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="address">Địa chỉ</Label>
              <Input
                id="address"
                value={branchForm.address}
                onChange={(e) => setBranchForm({ ...branchForm, address: e.target.value })}
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="manager">Quản lý</Label>
              <Input
                id="manager"
                value={branchForm.manager}
                onChange={(e) => setBranchForm({ ...branchForm, manager: e.target.value })}
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="phone">Điện thoại</Label>
              <Input
                id="phone"
                value={branchForm.phone}
                onChange={(e) => setBranchForm({ ...branchForm, phone: e.target.value })}
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                value={branchForm.email}
                onChange={(e) => setBranchForm({ ...branchForm, email: e.target.value })}
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="rooms">Số phòng</Label>
              <Input
                id="rooms"
                type="number"
                value={branchForm.rooms}
                onChange={(e) => setBranchForm({ ...branchForm, rooms: parseInt(e.target.value) })}
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="staff">Số nhân viên</Label>
              <Input
                id="staff"
                type="number"
                value={branchForm.staff}
                onChange={(e) => setBranchForm({ ...branchForm, staff: parseInt(e.target.value) })}
                className="col-span-3"
              />
            </div>
          </div>
          <DialogFooter>
            <Button
              type="button"
              variant="outline"
              onClick={() => setShowBranchModal(false)}
            >
              Hủy
            </Button>
            <Button
              type="button"
              onClick={handleSaveBranch}
            >
              Lưu
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* User Modal */}
      <Dialog open={showUserModal} onOpenChange={setShowUserModal}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>{editingUser ? 'Sửa người dùng' : 'Thêm người dùng mới'}</DialogTitle>
            <DialogDescription>
              {editingUser ? 'Cập nhật thông tin người dùng' : 'Nhập thông tin mới cho người dùng'}
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="name">Tên người dùng</Label>
              <Input
                id="name"
                value={userForm.name}
                onChange={(e) => setUserForm({ ...userForm, name: e.target.value })}
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                value={userForm.email}
                onChange={(e) => setUserForm({ ...userForm, email: e.target.value })}
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="phone">Điện thoại</Label>
              <Input
                id="phone"
                value={userForm.phone}
                onChange={(e) => setUserForm({ ...userForm, phone: e.target.value })}
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="role">Vai trò</Label>
              <Select
                value={userForm.role}
                onValueChange={(value) => setUserForm({ ...userForm, role: value })}
              >
                <SelectTrigger className="col-span-3">
                  <SelectValue placeholder="Chọn vai trò">{userForm.role}</SelectValue>
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="manager">Quản lý</SelectItem>
                  <SelectItem value="staff">Nhân viên</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="branch">Chi nhánh</Label>
              <Select
                value={userForm.branch}
                onValueChange={(value) => setUserForm({ ...userForm, branch: value })}
              >
                <SelectTrigger className="col-span-3">
                  <SelectValue placeholder="Chọn chi nhánh">{userForm.branch}</SelectValue>
                </SelectTrigger>
                <SelectContent>
                  {branches.map(branch => (
                    <SelectItem key={branch.id} value={branch.name}>{branch.name}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="password">Mật khẩu</Label>
              <Input
                id="password"
                type="password"
                value={userForm.password}
                onChange={(e) => setUserForm({ ...userForm, password: e.target.value })}
                className="col-span-3"
              />
            </div>
          </div>
          <DialogFooter>
            <Button
              type="button"
              variant="outline"
              onClick={() => setShowUserModal(false)}
            >
              Hủy
            </Button>
            <Button
              type="button"
              onClick={handleSaveUser}
            >
              Lưu
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Delete Dialog */}
      <AlertDialog open={showDeleteDialog} onOpenChange={setShowDeleteDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Xác nhận xóa</AlertDialogTitle>
            <AlertDialogDescription>
              Bạn có chắc chắn muốn xóa {deleteTarget?.type === 'branch' ? 'cơ sở' : 'người dùng'} này không?
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel
              onClick={() => setShowDeleteDialog(false)}
            >
              Hủy
            </AlertDialogCancel>
            <AlertDialogAction
              onClick={confirmDelete}
            >
              Xóa
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}