import { useState } from 'react';
import { Home } from './components/Home';
import { Auth } from './components/Auth';
import { StaffDashboard } from './components/StaffDashboard';
import { ManagerDashboard } from './components/ManagerDashboard';
import { CustomerDashboard } from './components/CustomerDashboard';
import { AdminDashboard } from './components/AdminDashboard';
import { BranchDetail, RoomDetail, ServiceDetail } from './components/DetailScreens';
import { BookingFlow } from './components/BookingFlow';
import { RoomSelection } from './components/RoomSelection';
import { TimeSlotSelection } from './components/TimeSlotSelection';
import { BookingConfirmation } from './components/BookingConfirmation';
import { BookingSuccess } from './components/BookingSuccess';
import { RoomOrderDetail } from './components/RoomOrderDetail';
import { RoomManagement } from './components/manager/RoomManagement';
import { OrderManagement } from './components/manager/OrderManagement';
import { ManagerMenu } from './components/manager/ManagerMenu';
import { StaffManagement } from './components/manager/StaffManagement';
import { ServiceManagement } from './components/manager/ServiceManagement';
import { RevenueReport } from './components/manager/RevenueReport';
import { PromotionManagement } from './components/manager/PromotionManagement';
import { AdminMenu } from './components/admin/AdminMenu';
import { UserManagement } from './components/admin/UserManagement';
import { BranchManagement } from './components/admin/BranchManagement';
import { SystemConfig } from './components/admin/SystemConfig';
import { Monitoring } from './components/admin/Monitoring';
import { AdminStaffManagement } from './components/admin/AdminStaffManagement';
import { AdminServiceManagement } from './components/admin/AdminServiceManagement';
import { NotificationManagement } from './components/admin/NotificationManagement';
import { Toaster } from './components/ui/sonner';
import { DesktopLayout } from './components/DesktopLayout';

type Screen = 
  | 'home'
  | 'login'
  | 'signup'
  | 'staff-dashboard'
  | 'manager-dashboard'
  | 'customer-dashboard'
  | 'admin-dashboard'
  | string;

interface AppState {
  currentScreen: Screen;
  userRole: string | null;
  userName: string | null;
  screenData: any;
}

export default function App() {
  const [appState, setAppState] = useState<AppState>({
    currentScreen: 'home',
    userRole: null,
    userName: null,
    screenData: null,
  });

  const handleNavigate = (screen: string, data?: any) => {
    setAppState(prev => ({
      ...prev,
      currentScreen: screen,
      screenData: data || null,
    }));

    // Scroll to top on navigation
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleAuth = (role: string, name: string) => {
    setAppState({
      currentScreen: `${role}-dashboard`,
      userRole: role,
      userName: name,
      screenData: null,
    });
  };

  const renderScreen = () => {
    const { currentScreen, userRole, userName } = appState;

    switch (currentScreen) {
      case 'home':
        return <Home onNavigate={handleNavigate} />;
      
      case 'login':
        return (
          <Auth
            mode="login"
            onNavigate={handleNavigate}
            onAuth={handleAuth}
          />
        );
      
      case 'signup':
        return (
          <Auth
            mode="signup"
            onNavigate={handleNavigate}
            onAuth={handleAuth}
          />
        );
      
      case 'staff-dashboard':
        return (
          <StaffDashboard
            userName={userName || 'Nhân viên'}
            onNavigate={handleNavigate}
          />
        );
      
      case 'manager-dashboard':
        return (
          <ManagerDashboard
            userName={userName || 'Quản lý'}
            onNavigate={handleNavigate}
          />
        );
      
      case 'customer-dashboard':
        return (
          <CustomerDashboard
            userName={userName || 'Khách hàng'}
            onNavigate={handleNavigate}
          />
        );
      
      case 'admin-dashboard':
        return (
          <AdminDashboard
            userName={userName || 'Admin'}
            onNavigate={handleNavigate}
          />
        );
      
      case 'branch-detail':
        return (
          <BranchDetail
            data={appState.screenData}
            onBack={() => handleNavigate(userRole ? `${userRole}-dashboard` : 'home')}
          />
        );
      
      case 'room-detail':
        return (
          <RoomDetail
            data={appState.screenData}
            onBack={() => handleNavigate(userRole ? `${userRole}-dashboard` : 'home')}
            onAction={(action) => {
              if (action === 'book') {
                handleNavigate('booking-flow', { room: appState.screenData });
              }
            }}
          />
        );
      
      case 'service-detail':
        return (
          <ServiceDetail
            data={appState.screenData}
            onBack={() => handleNavigate(userRole ? `${userRole}-dashboard` : 'home')}
          />
        );
      
      case 'booking-flow':
        return (
          <BookingFlow
            onNavigate={handleNavigate}
            onBack={() => handleNavigate(userRole ? `${userRole}-dashboard` : 'home')}
            userRole={userRole}
          />
        );
      
      case 'room-selection':
        return (
          <RoomSelection
            onNavigate={handleNavigate}
            onBack={() => handleNavigate('booking-flow')}
            data={appState.screenData}
          />
        );
      
      case 'time-slot-selection':
        return (
          <TimeSlotSelection
            onNavigate={handleNavigate}
            onBack={() => handleNavigate('room-selection', { category: appState.screenData?.category })}
            data={appState.screenData}
          />
        );
      
      case 'booking-confirmation':
        return (
          <BookingConfirmation
            onNavigate={handleNavigate}
            onBack={() => handleNavigate('time-slot-selection', appState.screenData)}
            data={appState.screenData}
          />
        );
      
      case 'booking-success':
        return (
          <BookingSuccess
            onNavigate={handleNavigate}
            data={appState.screenData}
            userRole={userRole}
          />
        );
      
      case 'room-order':
        return (
          <RoomOrderDetail
            onBack={() => handleNavigate('staff-dashboard')}
            data={appState.screenData}
          />
        );
      
      case 'manager-rooms':
        return (
          <RoomManagement
            onBack={() => handleNavigate('manager-dashboard')}
          />
        );
      
      case 'manager-orders':
        return (
          <OrderManagement
            onBack={() => handleNavigate('manager-dashboard')}
          />
        );
      
      case 'manager-menu':
        return (
          <ManagerMenu
            onBack={() => handleNavigate('manager-dashboard')}
            onNavigate={handleNavigate}
          />
        );
      
      case 'manager-staff':
        return (
          <StaffManagement
            onBack={() => handleNavigate('manager-dashboard')}
          />
        );
      
      case 'manager-services':
        return (
          <ServiceManagement
            onBack={() => handleNavigate('manager-menu')}
          />
        );
      
      case 'manager-revenue':
        return (
          <RevenueReport
            onBack={() => handleNavigate('manager-menu')}
          />
        );
      
      case 'manager-promotions':
        return (
          <PromotionManagement
            onBack={() => handleNavigate('manager-menu')}
          />
        );
      
      case 'manager-reports':
      case 'manager-settings':
        return (
          <div className="min-h-screen bg-background flex flex-col items-center justify-center p-6">
            <div className="max-w-md w-full text-center">
              <div className="w-20 h-20 rounded-full bg-[#9333ea]/20 flex items-center justify-center mx-auto mb-6">
                <span className="text-4xl">🚧</span>
              </div>
              <h2 className="text-2xl text-white mb-4" style={{ fontWeight: 700 }}>
                Đang phát triển
              </h2>
              <p className="text-gray-400 mb-8">
                Tính năng này đang được xây dựng. Vui lòng quay lại sau.
              </p>
              <button
                onClick={() => handleNavigate('manager-menu')}
                className="w-full h-12 rounded-[20px] bg-[#9333ea] hover:bg-[#7c3aed] text-white transition-all"
                style={{ fontWeight: 600 }}
              >
                ← Quay lại Menu
              </button>
            </div>
          </div>
        );
      
      case 'admin-menu':
        return (
          <AdminMenu
            onBack={() => handleNavigate('admin-dashboard')}
            onNavigate={handleNavigate}
          />
        );
      
      case 'admin-users':
        return (
          <UserManagement
            onBack={() => handleNavigate('admin-menu')}
          />
        );
      
      case 'admin-branches':
        return (
          <BranchManagement
            onBack={() => handleNavigate('admin-menu')}
          />
        );
      
      case 'admin-system-config':
        return (
          <SystemConfig
            onBack={() => handleNavigate('admin-menu')}
          />
        );
      
      case 'admin-monitoring':
        return (
          <Monitoring
            onBack={() => handleNavigate('admin-menu')}
          />
        );
      
      case 'admin-staff':
        return (
          <AdminStaffManagement
            onBack={() => handleNavigate('admin-menu')}
          />
        );
      
      case 'admin-services':
        return (
          <AdminServiceManagement
            onBack={() => handleNavigate('admin-menu')}
          />
        );
      
      case 'admin-notifications':
        return (
          <NotificationManagement
            onBack={() => handleNavigate('admin-menu')}
          />
        );
      
      case 'admin-maintenance':
        return (
          <div className="min-h-screen bg-background flex flex-col items-center justify-center p-6">
            <div className="max-w-md w-full text-center">
              <div className="w-20 h-20 rounded-full bg-[#9333ea]/20 flex items-center justify-center mx-auto mb-6">
                <span className="text-4xl">🚧</span>
              </div>
              <h2 className="text-2xl text-white mb-4" style={{ fontWeight: 700 }}>
                Đang phát triển
              </h2>
              <p className="text-gray-400 mb-8">
                Tính năng này đang được xây dựng. Vui lòng quay lại sau.
              </p>
              <button
                onClick={() => handleNavigate('admin-menu')}
                className="w-full h-12 rounded-[20px] bg-[#9333ea] hover:bg-[#7c3aed] text-white transition-all"
                style={{ fontWeight: 600 }}
              >
                ← Quay lại Menu
              </button>
            </div>
          </div>
        );
      
      // Additional screens can be added here
      default:
        // For all other screens (room-detail, booking-flow, etc.)
        // Show a placeholder that navigates back
        return (
          <div className="min-h-screen bg-background flex flex-col items-center justify-center p-6">
            <div className="max-w-md w-full text-center">
              <div className="w-20 h-20 rounded-full bg-[#ffd700]/20 flex items-center justify-center mx-auto mb-6">
                <span className="text-4xl">🎤</span>
              </div>
              <h2 className="text-2xl text-white mb-4" style={{ fontWeight: 700 }}>
                {currentScreen.split('-').map(word => 
                  word.charAt(0).toUpperCase() + word.slice(1)
                ).join(' ')}
              </h2>
              <p className="text-gray-400 mb-8">
                Màn hình này đang được phát triển. Vui lòng quay lại sau.
              </p>
              <button
                onClick={() => {
                  // Navigate back to appropriate dashboard based on role
                  if (userRole) {
                    handleNavigate(`${userRole}-dashboard`);
                  } else {
                    handleNavigate('home');
                  }
                }}
                className="w-full h-12 rounded-[20px] bg-[#ffd700] hover:bg-[#ffed4e] text-black transition-all"
                style={{ fontWeight: 600 }}
              >
                ← Quay lại
              </button>
            </div>
          </div>
        );
    }
  };

  return (
    <div className="size-full min-h-screen bg-background">
      {/* Mobile Layout: max-w-md container */}
      <div className="max-w-md mx-auto bg-background min-h-screen relative md:hidden">
        {/* Mobile Frame Effect */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#ffd700] via-[#9333ea] to-[#ffd700]" />
        </div>
        
        {/* Content */}
        {renderScreen()}
      </div>

      {/* Desktop Layout: full width with sidebar */}
      <div className="hidden md:block">
        <DesktopLayout
          userName={appState.userName || undefined}
          userRole={appState.userRole}
          currentScreen={appState.currentScreen}
          onNavigate={handleNavigate}
        >
          {renderScreen()}
        </DesktopLayout>
      </div>

      {/* Toast Notifications */}
      <Toaster 
        theme="dark"
        position="top-center"
        toastOptions={{
          style: {
            background: '#1a1a24',
            border: '1px solid rgba(255, 215, 0, 0.2)',
            color: '#fff',
          },
        }}
      />
    </div>
  );
}