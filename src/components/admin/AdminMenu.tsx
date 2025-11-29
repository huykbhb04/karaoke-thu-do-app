import { ArrowLeft, Users, Building2, Settings, Package, BarChart3, Bell, Shield, Database } from 'lucide-react';
import { Button } from '../ui/button';
import { Card } from '../ui/card';
import { Badge } from '../ui/badge';

interface AdminMenuProps {
  onBack: () => void;
  onNavigate: (screen: string) => void;
}

export function AdminMenu({ onBack, onNavigate }: AdminMenuProps) {
  const menuItems = [
    {
      id: 'admin-users',
      title: 'Quản lý tài khoản',
      description: 'Tạo & phân quyền người dùng',
      icon: Users,
      color: '#ffd700',
      bgColor: 'bg-[#ffd700]/20',
      borderColor: 'border-[#ffd700]/30',
      badge: '45',
    },
    {
      id: 'admin-branches',
      title: 'Quản lý cơ sở',
      description: 'Chi nhánh & hoạt động',
      icon: Building2,
      color: '#9333ea',
      bgColor: 'bg-[#9333ea]/20',
      borderColor: 'border-[#9333ea]/30',
      badge: '3',
    },
    {
      id: 'admin-system-config',
      title: 'Cấu hình hệ thống',
      description: 'Loại phòng, dịch vụ, chính sách',
      icon: Settings,
      color: '#3b82f6',
      bgColor: 'bg-blue-500/20',
      borderColor: 'border-blue-500/30',
      badge: null,
    },
    {
      id: 'admin-staff',
      title: 'Quản lý nhân sự',
      description: 'Toàn bộ nhân viên hệ thống',
      icon: Users,
      color: '#10b981',
      bgColor: 'bg-green-500/20',
      borderColor: 'border-green-500/30',
      badge: '128',
    },
    {
      id: 'admin-services',
      title: 'Quản lý dịch vụ',
      description: 'Hàng hóa & tồn kho',
      icon: Package,
      color: '#f59e0b',
      bgColor: 'bg-amber-500/20',
      borderColor: 'border-amber-500/30',
      badge: '256',
    },
    {
      id: 'admin-monitoring',
      title: 'Giám sát & thống kê',
      description: 'Dashboard tổng hợp',
      icon: BarChart3,
      color: '#ec4899',
      bgColor: 'bg-pink-500/20',
      borderColor: 'border-pink-500/30',
      badge: null,
    },
    {
      id: 'admin-notifications',
      title: 'Quản lý thông báo',
      description: 'Thông báo & phản hồi',
      icon: Bell,
      color: '#8b5cf6',
      bgColor: 'bg-purple-500/20',
      borderColor: 'border-purple-500/30',
      badge: '12',
    },
    {
      id: 'admin-maintenance',
      title: 'Bảo trì hệ thống',
      description: 'Backup & logs',
      icon: Database,
      color: '#6366f1',
      bgColor: 'bg-indigo-500/20',
      borderColor: 'border-indigo-500/30',
      badge: null,
    },
  ];

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
            <h1 className="text-base text-white" style={{ fontWeight: 700 }}>
              Quản lý nâng cao
            </h1>
            <p className="text-xs text-gray-300">Hệ thống Admin</p>
          </div>
          <Badge className="bg-red-500/20 text-red-400 border-red-500/30">
            <Shield className="w-3 h-3 mr-1" />
            Admin
          </Badge>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-3 gap-2">
          <div className="bg-white/10 backdrop-blur-sm rounded-lg p-2 text-center">
            <p className="text-sm text-white" style={{ fontWeight: 700 }}>3</p>
            <p className="text-xs text-gray-300">Cơ sở</p>
          </div>
          <div className="bg-white/10 backdrop-blur-sm rounded-lg p-2 text-center">
            <p className="text-sm text-white" style={{ fontWeight: 700 }}>173</p>
            <p className="text-xs text-gray-300">Người dùng</p>
          </div>
          <div className="bg-white/10 backdrop-blur-sm rounded-lg p-2 text-center">
            <p className="text-sm text-white" style={{ fontWeight: 700 }}>45</p>
            <p className="text-xs text-gray-300">Phòng</p>
          </div>
        </div>
      </div>

      {/* Menu Items */}
      <div className="px-4 pt-4 space-y-3">
        {menuItems.map((item) => {
          const Icon = item.icon;
          return (
            <Card
              key={item.id}
              className={`bg-card ${item.borderColor} p-4 cursor-pointer hover:scale-[1.02] transition-all`}
              onClick={() => onNavigate(item.id)}
            >
              <div className="flex items-center gap-3">
                <div
                  className={`w-12 h-12 rounded-xl ${item.bgColor} flex items-center justify-center flex-shrink-0`}
                >
                  <Icon className="w-6 h-6" style={{ color: item.color }} />
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <h3 className="text-white text-sm" style={{ fontWeight: 600 }}>
                      {item.title}
                    </h3>
                    {item.badge && (
                      <Badge
                        className="text-xs px-1.5 py-0 h-auto"
                        style={{
                          backgroundColor: `${item.color}20`,
                          color: item.color,
                          border: `1px solid ${item.color}30`,
                        }}
                      >
                        {item.badge}
                      </Badge>
                    )}
                  </div>
                  <p className="text-xs text-gray-400">{item.description}</p>
                </div>

                <div className="flex-shrink-0">
                  <ArrowLeft className="w-5 h-5 text-gray-400 rotate-180" />
                </div>
              </div>
            </Card>
          );
        })}
      </div>

      {/* Info Card */}
      <div className="px-4 pt-4">
        <Card className="bg-red-500/10 border-red-500/30 p-4">
          <div className="flex items-start gap-3">
            <Shield className="w-5 h-5 text-red-400 flex-shrink-0 mt-0.5" />
            <div>
              <h4 className="text-sm text-red-400 mb-1" style={{ fontWeight: 600 }}>
                Quyền Admin
              </h4>
              <p className="text-xs text-gray-400">
                Bạn có quyền truy cập toàn bộ hệ thống. Hãy cẩn trọng khi thực hiện các thao tác quan trọng.
              </p>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}
