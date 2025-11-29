import { useState } from 'react';
import {
  ArrowLeft, Plus, Edit, Trash2, Search, Lock, Unlock, UserX, Mail, Phone, Shield, Users, UserCog
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

interface UserManagementProps {
  onBack: () => void;
}

export function UserManagement({ onBack }: UserManagementProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedRole, setSelectedRole] = useState('all');
  const [selectedBranch, setSelectedBranch] = useState('all');
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingUser, setEditingUser] = useState<any>(null);
  const [activeTab, setActiveTab] = useState('all');

  const [users, setUsers] = useState([
    // Admins
    { id: 'AD001', name: 'Nguyễn Văn An', email: 'admin@karaoke.vn', phone: '0901234567', role: 'admin', branch: 'Hệ thống', status: 'active', createdAt: '01/01/2024' },
    
    // Managers
    { id: 'MG001', name: 'Trần Thị Bình', email: 'manager1@karaoke.vn', phone: '0902345678', role: 'manager', branch: 'Trần Duy Hưng', status: 'active', createdAt: '05/01/2024' },
    { id: 'MG002', name: 'Lê Văn Cường', email: 'manager2@karaoke.vn', phone: '0903456789', role: 'manager', branch: 'Nguyễn Huệ', status: 'active', createdAt: '05/01/2024' },
    { id: 'MG003', name: 'Phạm Thị Dung', email: 'manager3@karaoke.vn', phone: '0904567890', role: 'manager', branch: 'Láng Hạ', status: 'active', createdAt: '05/01/2024' },
    
    // Staff
    { id: 'ST001', name: 'Hoàng Văn Em', email: 'staff1@karaoke.vn', phone: '0905678901', role: 'staff', branch: 'Trần Duy Hưng', status: 'active', createdAt: '10/01/2024' },
    { id: 'ST002', name: 'Vũ Thị Phương', email: 'staff2@karaoke.vn', phone: '0906789012', role: 'staff', branch: 'Trần Duy Hưng', status: 'active', createdAt: '10/01/2024' },
    { id: 'ST003', name: 'Đỗ Văn Giang', email: 'staff3@karaoke.vn', phone: '0907890123', role: 'staff', branch: 'Nguyễn Huệ', status: 'active', createdAt: '12/01/2024' },
    { id: 'ST004', name: 'Mai Thị Hà', email: 'staff4@karaoke.vn', phone: '0908901234', role: 'staff', branch: 'Láng Hạ', status: 'inactive', createdAt: '15/01/2024' },
    
    // Customers
    { id: 'CU001', name: 'Ngô Văn Hùng', email: 'customer1@gmail.com', phone: '0909012345', role: 'customer', branch: null, status: 'active', createdAt: '20/01/2024' },
    { id: 'CU002', name: 'Bùi Thị Lan', email: 'customer2@gmail.com', phone: '0910123456', role: 'customer', branch: null, status: 'active', createdAt: '22/01/2024' },
  ]);

  const branches = [
    { id: 'all', name: 'Tất cả cơ sở' },
    { id: 'system', name: 'Hệ thống' },
    { id: 'tran-duy-hung', name: 'Trần Duy Hưng' },
    { id: 'nguyen-hue', name: 'Nguyễn Huệ' },
    { id: 'lang-ha', name: 'Láng Hạ' },
  ];

  const roles = [
    { id: 'admin', name: 'Admin', color: '#ef4444', icon: Shield },
    { id: 'manager', name: 'Quản lý', color: '#f59e0b', icon: UserCog },
    { id: 'staff', name: 'Nhân viên', color: '#3b82f6', icon: Users },
    { id: 'customer', name: 'Khách hàng', color: '#10b981', icon: Users },
  ];

  const filteredUsers = users.filter(user => {
    const matchSearch = 
      user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.id.toLowerCase().includes(searchQuery.toLowerCase());
    const matchRole = activeTab === 'all' || user.role === activeTab;
    const matchBranch = selectedBranch === 'all' || user.branch === selectedBranch;
    return matchSearch && matchRole && matchBranch;
  });

  const stats = {
    total: users.length,
    admin: users.filter(u => u.role === 'admin').length,
    manager: users.filter(u => u.role === 'manager').length,
    staff: users.filter(u => u.role === 'staff').length,
    customer: users.filter(u => u.role === 'customer').length,
    active: users.filter(u => u.status === 'active').length,
    inactive: users.filter(u => u.status === 'inactive').length,
  };

  const getRoleInfo = (role: string) => {
    return roles.find(r => r.id === role) || roles[3];
  };

  const handleSaveUser = (userData: any) => {
    if (editingUser) {
      setUsers(prev =>
        prev.map(user => (user.id === editingUser.id ? { ...user, ...userData } : user))
      );
      toast.success('Đã cập nhật người dùng');
    } else {
      const newUser = {
        id: `${userData.role.substring(0, 2).toUpperCase()}${(users.length + 1).toString().padStart(3, '0')}`,
        ...userData,
        status: 'active',
        createdAt: new Date().toLocaleDateString('vi-VN'),
      };
      setUsers(prev => [...prev, newUser]);
      toast.success('Đã tạo người dùng mới');
    }
    setIsDialogOpen(false);
    setEditingUser(null);
  };

  const handleToggleStatus = (userId: string) => {
    setUsers(prev =>
      prev.map(user =>
        user.id === userId
          ? { ...user, status: user.status === 'active' ? 'inactive' : 'active' }
          : user
      )
    );
    toast.success('Đã cập nhật trạng thái');
  };

  const handleResetPassword = (userId: string) => {
    if (confirm('Gửi email reset mật khẩu cho người dùng này?')) {
      toast.success('Đã gửi email reset mật khẩu');
    }
  };

  const handleDeleteUser = (userId: string) => {
    if (confirm('Bạn có chắc chắn muốn xóa người dùng này?')) {
      setUsers(prev => prev.filter(user => user.id !== userId));
      toast.success('Đã xóa người dùng');
    }
  };

  return (
    <div className="min-h-screen bg-background pb-20">
      {/* Header */}
      <div className="sticky top-0 z-50 bg-gradient-to-br from-[#ffd700] to-[#f59e0b] p-4 rounded-b-[20px]">
        <div className="flex items-center gap-3 mb-3">
          <button
            onClick={onBack}
            className="w-9 h-9 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20"
          >
            <ArrowLeft className="w-5 h-5 text-white" />
          </button>
          <div className="flex-1">
            <h1 className="text-sm text-white" style={{ fontWeight: 700 }}>
              Quản lý tài khoản
            </h1>
            <p className="text-xs text-gray-900/70">Tài khoản & phân quyền</p>
          </div>
          <Button
            size="sm"
            className="bg-white hover:bg-gray-100 text-black h-8 rounded-full px-3"
            onClick={() => {
              setEditingUser(null);
              setIsDialogOpen(true);
            }}
          >
            <Plus className="w-4 h-4 mr-1" />
            <span className="text-xs">Thêm</span>
          </Button>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-4 gap-2">
          <div className="bg-white/20 backdrop-blur-sm rounded-lg p-1.5 text-center">
            <p className="text-sm text-white" style={{ fontWeight: 700 }}>{stats.total}</p>
            <p className="text-xs text-gray-900/70">Tổng</p>
          </div>
          <div className="bg-white/20 backdrop-blur-sm rounded-lg p-1.5 text-center">
            <p className="text-sm text-white" style={{ fontWeight: 700 }}>{stats.staff}</p>
            <p className="text-xs text-gray-900/70">NV</p>
          </div>
          <div className="bg-white/20 backdrop-blur-sm rounded-lg p-1.5 text-center">
            <p className="text-sm text-white" style={{ fontWeight: 700 }}>{stats.customer}</p>
            <p className="text-xs text-gray-900/70">KH</p>
          </div>
          <div className="bg-white/20 backdrop-blur-sm rounded-lg p-1.5 text-center">
            <p className="text-sm text-green-400" style={{ fontWeight: 700 }}>{stats.active}</p>
            <p className="text-xs text-gray-900/70">Active</p>
          </div>
        </div>
      </div>

      {/* Search & Filters */}
      <div className="px-4 pt-3 space-y-2">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
          <Input
            placeholder="Tìm theo tên, email, ID..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10 bg-card border-[#ffd700]/30 text-white h-9 text-sm"
          />
        </div>

        <Select value={selectedBranch} onValueChange={setSelectedBranch}>
          <SelectTrigger className="bg-card border-gray-700 text-white h-9 text-sm">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {branches.map(branch => (
              <SelectItem key={branch.id} value={branch.id}>{branch.name}</SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="px-4 pt-3">
        <TabsList className="grid w-full grid-cols-5 bg-card h-9">
          <TabsTrigger value="all" className="text-xs">Tất cả</TabsTrigger>
          <TabsTrigger value="admin" className="text-xs">Admin</TabsTrigger>
          <TabsTrigger value="manager" className="text-xs">QL</TabsTrigger>
          <TabsTrigger value="staff" className="text-xs">NV</TabsTrigger>
          <TabsTrigger value="customer" className="text-xs">KH</TabsTrigger>
        </TabsList>

        <ScrollArea className="h-[calc(100vh-340px)] mt-3">
          <div className="space-y-2">
            {filteredUsers.map((user) => {
              const roleInfo = getRoleInfo(user.role);
              const RoleIcon = roleInfo.icon;

              return (
                <Card
                  key={user.id}
                  className="bg-card border-gray-700/30 p-3"
                >
                  <div className="flex items-start gap-3">
                    <div
                      className="w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0"
                      style={{ backgroundColor: `${roleInfo.color}20` }}
                    >
                      <RoleIcon className="w-5 h-5" style={{ color: roleInfo.color }} />
                    </div>

                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <h3 className="text-white text-sm truncate" style={{ fontWeight: 600 }}>
                          {user.name}
                        </h3>
                        <Badge
                          className={`${
                            user.status === 'active'
                              ? 'bg-green-500/20 text-green-400'
                              : 'bg-red-500/20 text-red-400'
                          } text-xs px-1.5 py-0 h-auto`}
                        >
                          {user.status === 'active' ? 'Active' : 'Inactive'}
                        </Badge>
                      </div>
                      <p className="text-xs text-gray-400 mb-0.5 truncate">
                        <Mail className="w-3 h-3 inline mr-1" />
                        {user.email}
                      </p>
                      <p className="text-xs text-gray-400 truncate">
                        <Phone className="w-3 h-3 inline mr-1" />
                        {user.phone}
                      </p>
                      <div className="flex items-center gap-2 mt-1">
                        <Badge
                          className="text-xs px-1.5 py-0 h-auto"
                          style={{
                            backgroundColor: `${roleInfo.color}20`,
                            color: roleInfo.color,
                            border: `1px solid ${roleInfo.color}30`,
                          }}
                        >
                          {roleInfo.name}
                        </Badge>
                        {user.branch && (
                          <span className="text-xs text-gray-500">• {user.branch}</span>
                        )}
                      </div>
                    </div>

                    <div className="flex flex-col gap-1 flex-shrink-0">
                      <button
                        onClick={() => {
                          setEditingUser(user);
                          setIsDialogOpen(true);
                        }}
                        className="w-7 h-7 rounded bg-blue-500/20 text-blue-400 flex items-center justify-center hover:bg-blue-500/30"
                      >
                        <Edit className="w-3.5 h-3.5" />
                      </button>
                      <button
                        onClick={() => handleToggleStatus(user.id)}
                        className={`w-7 h-7 rounded flex items-center justify-center ${
                          user.status === 'active'
                            ? 'bg-red-500/20 text-red-400 hover:bg-red-500/30'
                            : 'bg-green-500/20 text-green-400 hover:bg-green-500/30'
                        }`}
                      >
                        {user.status === 'active' ? (
                          <Lock className="w-3.5 h-3.5" />
                        ) : (
                          <Unlock className="w-3.5 h-3.5" />
                        )}
                      </button>
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex gap-1 mt-3 pt-3 border-t border-gray-700/30">
                    <button
                      onClick={() => handleResetPassword(user.id)}
                      className="flex-1 px-2 py-1 rounded bg-[#ffd700]/20 text-[#ffd700] text-xs hover:bg-[#ffd700]/30"
                    >
                      Reset MK
                    </button>
                    <button
                      onClick={() => handleDeleteUser(user.id)}
                      className="flex-1 px-2 py-1 rounded bg-red-500/20 text-red-400 text-xs hover:bg-red-500/30"
                    >
                      Xóa
                    </button>
                  </div>
                </Card>
              );
            })}
          </div>
        </ScrollArea>
      </Tabs>

      {/* User Dialog */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <UserDialog
          user={editingUser}
          branches={branches.filter(b => b.id !== 'all')}
          roles={roles}
          onSave={handleSaveUser}
          onClose={() => {
            setIsDialogOpen(false);
            setEditingUser(null);
          }}
        />
      </Dialog>
    </div>
  );
}

function UserDialog({ user, branches, roles, onSave, onClose }: any) {
  const [formData, setFormData] = useState(
    user || {
      name: '',
      email: '',
      phone: '',
      role: 'staff',
      branch: '',
      password: '',
    }
  );

  return (
    <DialogContent className="bg-card border-[#ffd700]/30 text-white w-[90vw] max-w-[360px]" aria-describedby={undefined}>
      <DialogHeader>
        <DialogTitle className="text-sm">
          {user ? 'Chỉnh sửa người dùng' : 'Thêm người dùng mới'}
        </DialogTitle>
      </DialogHeader>
      <ScrollArea className="max-h-[60vh]">
        <div className="space-y-3 py-3 pr-3">
          <div>
            <Label htmlFor="name" className="text-xs text-gray-400 mb-1 block">
              Họ tên *
            </Label>
            <Input
              id="name"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="bg-[#1a1a24] border-gray-700 text-white h-9 text-sm"
              placeholder="Nguyễn Văn A"
            />
          </div>

          <div>
            <Label htmlFor="email" className="text-xs text-gray-400 mb-1 block">
              Email *
            </Label>
            <Input
              id="email"
              type="email"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              className="bg-[#1a1a24] border-gray-700 text-white h-9 text-sm"
              placeholder="email@example.com"
            />
          </div>

          <div>
            <Label htmlFor="phone" className="text-xs text-gray-400 mb-1 block">
              Số điện thoại *
            </Label>
            <Input
              id="phone"
              value={formData.phone}
              onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
              className="bg-[#1a1a24] border-gray-700 text-white h-9 text-sm"
              placeholder="0901234567"
            />
          </div>

          <div>
            <Label htmlFor="role" className="text-xs text-gray-400 mb-1 block">
              Vai trò *
            </Label>
            <Select
              value={formData.role}
              onValueChange={(value) => setFormData({ ...formData, role: value })}
            >
              <SelectTrigger className="bg-[#1a1a24] border-gray-700 h-9 text-sm">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {roles.map((role: any) => (
                  <SelectItem key={role.id} value={role.id}>
                    {role.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {formData.role !== 'customer' && formData.role !== 'admin' && (
            <div>
              <Label htmlFor="branch" className="text-xs text-gray-400 mb-1 block">
                Cơ sở làm việc *
              </Label>
              <Select
                value={formData.branch}
                onValueChange={(value) => setFormData({ ...formData, branch: value })}
              >
                <SelectTrigger className="bg-[#1a1a24] border-gray-700 h-9 text-sm">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {branches.map((branch: any) => (
                    <SelectItem key={branch.id} value={branch.name}>
                      {branch.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          )}

          {!user && (
            <div>
              <Label htmlFor="password" className="text-xs text-gray-400 mb-1 block">
                Mật khẩu *
              </Label>
              <Input
                id="password"
                type="password"
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                className="bg-[#1a1a24] border-gray-700 text-white h-9 text-sm"
                placeholder="Tối thiểu 8 ký tự"
              />
            </div>
          )}
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
          className="flex-1 bg-[#ffd700] hover:bg-[#ffed4e] text-black h-9 text-sm"
          onClick={() => onSave(formData)}
        >
          {user ? 'Cập nhật' : 'Tạo'}
        </Button>
      </div>
    </DialogContent>
  );
}
