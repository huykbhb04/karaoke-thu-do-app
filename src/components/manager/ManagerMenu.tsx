import { ArrowLeft, Package, Users, TrendingUp, Gift, Settings, FileText } from 'lucide-react';
import { Button } from '../ui/button';
import { Card } from '../ui/card';

interface ManagerMenuProps {
  onBack: () => void;
  onNavigate: (screen: string) => void;
}

export function ManagerMenu({ onBack, onNavigate }: ManagerMenuProps) {
  const menuItems = [
    {
      id: 'services',
      icon: Package,
      title: 'Quản lý dịch vụ & giá',
      description: 'CRUD menu, combo, giá',
      color: 'text-[#ffd700]',
      bgColor: 'bg-[#ffd700]/20',
      borderColor: 'border-[#ffd700]/30',
    },
    {
      id: 'staff',
      icon: Users,
      title: 'Quản lý nhân sự & ca',
      description: 'Nhân viên, lịch làm việc',
      color: 'text-[#9333ea]',
      bgColor: 'bg-[#9333ea]/20',
      borderColor: 'border-[#9333ea]/30',
    },
    {
      id: 'revenue',
      icon: TrendingUp,
      title: 'Doanh thu & báo cáo',
      description: 'Thống kê, biểu đồ, xuất file',
      color: 'text-green-400',
      bgColor: 'bg-green-500/20',
      borderColor: 'border-green-500/30',
    },
    {
      id: 'promotions',
      icon: Gift,
      title: 'Khuyến mãi & sự kiện',
      description: 'Quản lý chương trình ưu đãi',
      color: 'text-pink-400',
      bgColor: 'bg-pink-500/20',
      borderColor: 'border-pink-500/30',
    },
    {
      id: 'reports',
      icon: FileText,
      title: 'Báo cáo chi tiết',
      description: 'Xuất báo cáo PDF/Excel',
      color: 'text-blue-400',
      bgColor: 'bg-blue-500/20',
      borderColor: 'border-blue-500/30',
    },
    {
      id: 'settings',
      icon: Settings,
      title: 'Cài đặt hệ thống',
      description: 'Cấu hình ứng dụng',
      color: 'text-gray-400',
      bgColor: 'bg-gray-500/20',
      borderColor: 'border-gray-500/30',
    },
  ];

  return (
    <div className="min-h-screen bg-background pb-20">
      {/* Header */}
      <div className="sticky top-0 z-50 bg-gradient-to-br from-[#9333ea] to-[#6b21a8] p-4 rounded-b-[20px]">
        <div className="flex items-center gap-3">
          <button
            onClick={onBack}
            className="w-9 h-9 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20"
          >
            <ArrowLeft className="w-5 h-5 text-white" />
          </button>
          <div>
            <h1 className="text-base text-white" style={{ fontWeight: 700 }}>
              Quản lý nâng cao
            </h1>
            <p className="text-xs text-gray-300">Chọn chức năng</p>
          </div>
        </div>
      </div>

      {/* Menu Grid */}
      <div className="px-4 py-4 space-y-3">
        {menuItems.map((item) => {
          const Icon = item.icon;
          return (
            <Card
              key={item.id}
              className={`bg-card border ${item.borderColor} p-4 cursor-pointer hover:border-opacity-100 transition-all`}
              onClick={() => onNavigate(`manager-${item.id}`)}
            >
              <div className="flex items-center gap-4">
                <div className={`w-12 h-12 rounded-xl ${item.bgColor} flex items-center justify-center flex-shrink-0`}>
                  <Icon className={`w-6 h-6 ${item.color}`} />
                </div>
                <div className="flex-1">
                  <h3 className="text-white text-sm mb-1" style={{ fontWeight: 600 }}>
                    {item.title}
                  </h3>
                  <p className="text-xs text-gray-400">{item.description}</p>
                </div>
              </div>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
