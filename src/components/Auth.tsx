import { useState } from 'react';
import { ArrowLeft } from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Card } from './ui/card';

interface AuthProps {
  mode: 'login' | 'signup';
  onNavigate: (screen: string, data?: any) => void;
  onAuth: (role: string, name: string) => void;
}

export function Auth({ mode, onNavigate, onAuth }: AuthProps) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [selectedRole, setSelectedRole] = useState('customer');
  const [showRoleSelect, setShowRoleSelect] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Demo login - allow role selection
    if (mode === 'login' && email && password) {
      setShowRoleSelect(true);
    } else if (mode === 'signup' && email && password && name) {
      onAuth('customer', name);
    }
  };

  const handleRoleSelect = (role: string) => {
    const displayName = name || email.split('@')[0];
    onAuth(role, displayName);
  };

  if (showRoleSelect) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center px-6">
        <Card className="w-full max-w-md bg-card border-[#ffd700]/20 p-8">
          <h2 className="text-center mb-8" style={{ color: '#ffd700', fontWeight: 600 }}>
            Chọn vai trò đăng nhập (Demo)
          </h2>
          <div className="space-y-3">
            <Button
              onClick={() => handleRoleSelect('staff')}
              className="w-full h-14 rounded-[20px] bg-[#9333ea] hover:bg-[#7c3aed] text-white"
            >
              👔 Đăng nhập với vai trò Nhân viên
            </Button>
            <Button
              onClick={() => handleRoleSelect('manager')}
              className="w-full h-14 rounded-[20px] bg-[#9333ea] hover:bg-[#7c3aed] text-white"
            >
              💼 Đăng nhập với vai trò Quản lý
            </Button>
            <Button
              onClick={() => handleRoleSelect('customer')}
              className="w-full h-14 rounded-[20px] bg-[#9333ea] hover:bg-[#7c3aed] text-white"
            >
              👤 Đăng nhập với vai trò Khách hàng
            </Button>
            <Button
              onClick={() => handleRoleSelect('admin')}
              className="w-full h-14 rounded-[20px] bg-[#9333ea] hover:bg-[#7c3aed] text-white"
            >
              🔧 Đăng nhập với vai trò Admin
            </Button>
          </div>
          <Button
            onClick={() => setShowRoleSelect(false)}
            variant="ghost"
            className="w-full mt-4 text-gray-400"
          >
            Quay lại
          </Button>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="p-6 flex items-center gap-4">
        <Button
          variant="ghost"
          size="icon"
          onClick={() => onNavigate('home')}
          className="text-[#ffd700] hover:bg-[#ffd700]/10"
        >
          <ArrowLeft className="w-6 h-6" />
        </Button>
        <h1 className="text-2xl" style={{ color: '#ffd700', fontWeight: 600 }}>
          {mode === 'login' ? 'Đăng nhập' : 'Đăng ký'}
        </h1>
      </div>

      {/* Form */}
      <div className="px-6 pt-8">
        <form onSubmit={handleSubmit} className="space-y-6">
          {mode === 'signup' && (
            <div>
              <Label className="text-gray-300 mb-2 block">Họ và tên</Label>
              <Input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Nhập họ và tên"
                className="h-12 rounded-[20px] bg-[#1a1a24] border-[#ffd700]/20 text-white focus:border-[#ffd700]"
                required
              />
            </div>
          )}

          <div>
            <Label className="text-gray-300 mb-2 block">Email</Label>
            <Input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="example@email.com"
              className="h-12 rounded-[20px] bg-[#1a1a24] border-[#ffd700]/20 text-white focus:border-[#ffd700]"
              required
            />
          </div>

          <div>
            <Label className="text-gray-300 mb-2 block">Mật khẩu</Label>
            <Input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              className="h-12 rounded-[20px] bg-[#1a1a24] border-[#ffd700]/20 text-white focus:border-[#ffd700]"
              required
            />
          </div>

          {mode === 'login' && (
            <div className="text-right">
              <button
                type="button"
                onClick={() => alert('Chức năng đang phát triển')}
                className="text-sm text-[#9333ea] hover:text-[#7c3aed]"
              >
                Quên mật khẩu?
              </button>
            </div>
          )}

          <Button
            type="submit"
            className="w-full h-14 rounded-[20px] bg-[#ffd700] hover:bg-[#ffed4e] text-black animate-pulse-glow"
            style={{ fontWeight: 600 }}
          >
            {mode === 'login' ? '🔐 Đăng nhập' : '✨ Đăng ký'}
          </Button>

          {mode === 'login' && (
            <div className="text-center">
              <span className="text-gray-400">Chưa có tài khoản? </span>
              <button
                type="button"
                onClick={() => onNavigate('signup')}
                className="text-[#ffd700] hover:text-[#ffed4e]"
                style={{ fontWeight: 600 }}
              >
                Đăng ký ngay
              </button>
            </div>
          )}

          {mode === 'signup' && (
            <div className="text-center">
              <span className="text-gray-400">Đã có tài khoản? </span>
              <button
                type="button"
                onClick={() => onNavigate('login')}
                className="text-[#ffd700] hover:text-[#ffed4e]"
                style={{ fontWeight: 600 }}
              >
                Đăng nhập
              </button>
            </div>
          )}
        </form>

        {/* Divider */}
        <div className="flex items-center gap-4 my-8">
          <div className="flex-1 h-px bg-gray-700" />
          <span className="text-gray-500 text-sm">hoặc</span>
          <div className="flex-1 h-px bg-gray-700" />
        </div>

        {/* Google Login */}
        <Button
          onClick={() => alert('Đăng nhập Google - Chức năng demo')}
          className="w-full h-14 rounded-[20px] bg-white hover:bg-gray-100 text-black"
          style={{ fontWeight: 600 }}
        >
          <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24">
            <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
            <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
            <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
            <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
          </svg>
          Tiếp tục với Google
        </Button>
      </div>
    </div>
  );
}
