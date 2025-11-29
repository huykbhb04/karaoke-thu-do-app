import { ReactNode, useState } from 'react';
import { 
  Home, 
  User, 
  Calendar, 
  Settings, 
  LogOut, 
  Menu,
  X,
  Bell,
  Search,
  ChevronDown,
  LayoutDashboard,
  Users,
  Building2,
  Utensils,
  BarChart3,
  Gift,
  MessageSquare,
  Shield,
  Database,
  Activity,
  Megaphone,
  Wrench,
  ClipboardList,
  DoorOpen,
  Clock,
} from 'lucide-react';
import { Button } from './ui/button';
import { Avatar, AvatarFallback } from './ui/avatar';
import { Badge } from './ui/badge';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from './ui/dropdown-menu';

interface DesktopLayoutProps {
  children: ReactNode;
  userName?: string;
  userRole?: string | null;
  currentScreen?: string;
  onNavigate: (screen: string, data?: any) => void;
}

export function DesktopLayout({ 
  children, 
  userName = 'User', 
  userRole,
  currentScreen = 'home',
  onNavigate 
}: DesktopLayoutProps) {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [notificationCount] = useState(3);

  // Navigation items based on user role
  const getNavigationItems = () => {
    if (!userRole) {
      return [
        { icon: Home, label: 'Trang chủ', screen: 'home' },
        { icon: User, label: 'Đăng nhập', screen: 'login' },
      ];
    }

    switch (userRole) {
      case 'staff':
        return [
          { icon: LayoutDashboard, label: 'Dashboard', screen: 'staff-dashboard' },
          { icon: ClipboardList, label: 'Order Phòng', screen: 'staff-dashboard' },
          { icon: Clock, label: 'Chấm công', screen: 'staff-dashboard' },
          { icon: Calendar, label: 'Lịch làm việc', screen: 'staff-dashboard' },
        ];
      
      case 'manager':
        return [
          { icon: LayoutDashboard, label: 'Dashboard', screen: 'manager-dashboard' },
          { icon: DoorOpen, label: 'Quản lý phòng', screen: 'manager-rooms' },
          { icon: ClipboardList, label: 'Quản lý order', screen: 'manager-orders' },
          { icon: Users, label: 'Quản lý nhân sự', screen: 'manager-staff' },
          { icon: Utensils, label: 'Dịch vụ', screen: 'manager-services' },
          { icon: BarChart3, label: 'Báo cáo doanh thu', screen: 'manager-revenue' },
          { icon: Gift, label: 'Khuyến mãi', screen: 'manager-promotions' },
        ];
      
      case 'customer':
        return [
          { icon: LayoutDashboard, label: 'Dashboard', screen: 'customer-dashboard' },
          { icon: Calendar, label: 'Đặt phòng', screen: 'booking-flow' },
          { icon: ClipboardList, label: 'Lịch sử', screen: 'customer-dashboard' },
          { icon: Gift, label: 'Ưu đãi', screen: 'customer-dashboard' },
        ];
      
      case 'admin':
        return [
          { icon: LayoutDashboard, label: 'Dashboard', screen: 'admin-dashboard' },
          { icon: Users, label: 'Quản lý User', screen: 'admin-users' },
          { icon: Building2, label: 'Quản lý Cơ sở', screen: 'admin-branches' },
          { icon: Shield, label: 'Nhân viên', screen: 'admin-staff' },
          { icon: Utensils, label: 'Dịch vụ', screen: 'admin-services' },
          { icon: Settings, label: 'Cấu hình', screen: 'admin-system-config' },
          { icon: Activity, label: 'Giám sát', screen: 'admin-monitoring' },
          { icon: Megaphone, label: 'Thông báo', screen: 'admin-notifications' },
          { icon: Wrench, label: 'Bảo trì', screen: 'admin-maintenance' },
        ];
      
      default:
        return [
          { icon: Home, label: 'Trang chủ', screen: 'home' },
        ];
    }
  };

  const navigationItems = getNavigationItems();

  const handleLogout = () => {
    onNavigate('home');
  };

  const getRoleColor = () => {
    switch (userRole) {
      case 'admin': return 'bg-red-500/20 text-red-400';
      case 'manager': return 'bg-[#9333ea]/20 text-[#9333ea]';
      case 'staff': return 'bg-blue-500/20 text-blue-400';
      case 'customer': return 'bg-[#ffd700]/20 text-[#ffd700]';
      default: return 'bg-gray-500/20 text-gray-400';
    }
  };

  const getRoleLabel = () => {
    switch (userRole) {
      case 'admin': return 'Admin';
      case 'manager': return 'Quản lý';
      case 'staff': return 'Nhân viên';
      case 'customer': return 'Khách hàng';
      default: return 'Guest';
    }
  };

  return (
    <div className="flex h-screen bg-background overflow-hidden">
      {/* Sidebar - Hidden on mobile, visible on desktop */}
      <aside
        className={`
          fixed lg:static inset-y-0 left-0 z-50
          w-64 bg-card border-r border-border
          transform transition-transform duration-300 ease-in-out
          ${sidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
          ${!sidebarOpen && 'lg:w-20'}
        `}
      >
        {/* Logo */}
        <div className="h-16 flex items-center justify-between px-4 border-b border-border">
          {sidebarOpen && (
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-[#ffd700] to-[#9333ea] flex items-center justify-center">
                <span className="text-xl">🎤</span>
              </div>
              <div>
                <div className="text-white" style={{ fontWeight: 600 }}>Karaoke</div>
                <div className="text-[#ffd700] text-xs" style={{ fontWeight: 600 }}>Thủ Đô</div>
              </div>
            </div>
          )}
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="lg:flex hidden"
          >
            {sidebarOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </Button>
        </div>

        {/* Navigation */}
        <nav className="flex-1 overflow-y-auto p-4 space-y-2 no-scrollbar">
          {navigationItems.map((item, index) => {
            const Icon = item.icon;
            const isActive = currentScreen === item.screen;
            return (
              <button
                key={index}
                onClick={() => onNavigate(item.screen)}
                className={`
                  w-full flex items-center gap-3 px-4 py-3 rounded-xl
                  transition-all duration-200
                  ${isActive 
                    ? 'bg-[#ffd700] text-black shadow-lg shadow-[#ffd700]/20' 
                    : 'text-gray-400 hover:bg-white/5 hover:text-white'
                  }
                  ${!sidebarOpen && 'lg:justify-center lg:px-2'}
                `}
                style={{ fontWeight: isActive ? 600 : 500 }}
              >
                <Icon className={`w-5 h-5 ${isActive ? 'text-black' : ''}`} />
                {sidebarOpen && <span>{item.label}</span>}
              </button>
            );
          })}
        </nav>

        {/* User info at bottom */}
        {userRole && (
          <div className="p-4 border-t border-border">
            {sidebarOpen ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <button className="w-full flex items-center gap-3 p-3 rounded-xl hover:bg-white/5 transition-colors">
                    <Avatar className="w-10 h-10 border-2 border-[#ffd700]">
                      <AvatarFallback className="bg-gradient-to-br from-[#ffd700] to-[#9333ea] text-black" style={{ fontWeight: 600 }}>
                        {userName.charAt(0).toUpperCase()}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex-1 text-left">
                      <div className="text-white text-sm" style={{ fontWeight: 600 }}>{userName}</div>
                      <div className={`text-xs px-2 py-0.5 rounded-full inline-block ${getRoleColor()}`}>
                        {getRoleLabel()}
                      </div>
                    </div>
                    <ChevronDown className="w-4 h-4 text-gray-400" />
                  </button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-56">
                  <DropdownMenuLabel>Tài khoản</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem>
                    <User className="w-4 h-4 mr-2" />
                    Thông tin cá nhân
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <Settings className="w-4 h-4 mr-2" />
                    Cài đặt
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={handleLogout} className="text-red-400">
                    <LogOut className="w-4 h-4 mr-2" />
                    Đăng xuất
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <button 
                onClick={handleLogout}
                className="w-full flex justify-center p-3 rounded-xl hover:bg-white/5 transition-colors"
              >
                <LogOut className="w-5 h-5 text-gray-400" />
              </button>
            )}
          </div>
        )}
      </aside>

      {/* Mobile sidebar overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Main content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Top header bar */}
        <header className="h-16 bg-card border-b border-border flex items-center justify-between px-6">
          <div className="flex items-center gap-4">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setSidebarOpen(true)}
              className="lg:hidden"
            >
              <Menu className="w-5 h-5" />
            </Button>
            
            <div>
              <h1 className="text-white" style={{ fontWeight: 600 }}>
                {currentScreen === 'home' ? 'Trang chủ' : 
                 currentScreen.includes('dashboard') ? 'Dashboard' :
                 currentScreen.split('-').map(word => 
                   word.charAt(0).toUpperCase() + word.slice(1)
                 ).join(' ')
                }
              </h1>
              <p className="text-sm text-gray-400">
                {new Date().toLocaleDateString('vi-VN', { 
                  weekday: 'long', 
                  year: 'numeric', 
                  month: 'long', 
                  day: 'numeric' 
                })}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-4">
            {/* Search - hidden on small screens */}
            <div className="hidden md:flex items-center gap-2 bg-white/5 rounded-xl px-4 py-2 w-64">
              <Search className="w-4 h-4 text-gray-400" />
              <input
                type="text"
                placeholder="Tìm kiếm..."
                className="bg-transparent border-none outline-none text-white text-sm w-full"
              />
            </div>

            {/* Notifications */}
            <Button variant="ghost" size="icon" className="relative">
              <Bell className="w-5 h-5" />
              {notificationCount > 0 && (
                <Badge 
                  className="absolute -top-1 -right-1 w-5 h-5 flex items-center justify-center p-0 bg-red-500 text-white text-xs"
                  style={{ fontWeight: 600 }}
                >
                  {notificationCount}
                </Badge>
              )}
            </Button>

            {/* User menu - shown if no sidebar user info visible */}
            {!userRole && (
              <Button onClick={() => onNavigate('login')} className="bg-[#ffd700] hover:bg-[#ffed4e] text-black">
                Đăng nhập
              </Button>
            )}
          </div>
        </header>

        {/* Page content */}
        <main className="flex-1 overflow-y-auto bg-background">
          {children}
        </main>
      </div>
    </div>
  );
}
