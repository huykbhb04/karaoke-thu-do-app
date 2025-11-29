import { useState } from 'react';
import { Search, Calendar, Gift, User, Bell, LogOut, Home as HomeIcon, Sparkles, MapPin, Star, ArrowLeft, ChevronRight, Settings, HelpCircle, Shield, CreditCard, MessageSquare, ThumbsUp, Send } from 'lucide-react';
import { Button } from './ui/button';
import { Card } from './ui/card';
import { Badge } from './ui/badge';
import { Input } from './ui/input';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { Textarea } from './ui/textarea';
import { Label } from './ui/label';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from './ui/dialog';

interface CustomerDashboardProps {
  userName: string;
  onNavigate: (screen: string, data?: any) => void;
}

interface Booking {
  id: number;
  room: string;
  category: string;
  branch: string;
  date: string;
  time: string;
  status: string;
  amount: string;
  bookingCode: string;
  rating?: number;
  review?: string;
  image?: string;
}

export function CustomerDashboard({ userName, onNavigate }: CustomerDashboardProps) {
  const [activeTab, setActiveTab] = useState('home');
  const [showLogoutDialog, setShowLogoutDialog] = useState(false);
  const [showReviewModal, setShowReviewModal] = useState(false);
  const [selectedBooking, setSelectedBooking] = useState<Booking | null>(null);
  const [reviewRating, setReviewRating] = useState(0);
  const [reviewText, setReviewText] = useState('');
  const [bookings, setBookings] = useState<Booking[]>([
    {
      id: 1,
      room: 'Phòng VIP 01',
      category: 'VIP',
      branch: 'Trần Duy Hưng',
      date: '10/10/2025',
      time: '19:00 - 22:00',
      status: 'completed',
      amount: '1,350,000đ',
      bookingCode: 'BK123456',
      image: 'https://images.unsplash.com/photo-1598387993441-a364f854c3e1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsdXh1cnklMjBuaWdodGNsdWIlMjBwdXJwbGUlMjBsaWdodGluZ3xlbnwxfHx8fDE3NjAzNzgwOTR8MA&ixlib=rb-4.1.0&q=80&w=1080',
      rating: 5,
      review: 'Phòng đẹp, âm thanh tuyệt vời!'
    },
    {
      id: 2,
      room: 'Phòng Family 02',
      category: 'Family',
      branch: 'Nguyễn Huệ',
      date: '15/10/2025',
      time: '20:00 - 23:00',
      status: 'upcoming',
      amount: '840,000đ',
      bookingCode: 'BK123457',
      image: 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxrYXJhb2tlJTIwcm9vbSUyMGx1eHVyeSUyMGludGVyaW9yfGVufDF8fHx8MTc2MDM3ODA5NHww&ixlib=rb-4.1.0&q=80&w=1080',
    },
    {
      id: 3,
      room: 'Phòng Party 04',
      category: 'Party',
      branch: 'Trần Duy Hưng',
      date: '05/10/2025',
      time: '18:00 - 21:00',
      status: 'completed',
      amount: '1,800,000đ',
      bookingCode: 'BK123458',
      image: 'https://images.unsplash.com/photo-1429962714451-bb934ecdc4ec?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxWSVAlMjBsb3VuZ2UlMjBuaWdodGxpZmV8ZW58MXx8fHwxNzYwMzc4MDk0fDA&ixlib=rb-4.1.0&q=80&w=1080',
    },
  ]);

  // Handle review modal
  const handleOpenReview = (booking: Booking) => {
    setSelectedBooking(booking);
    setReviewRating(booking.rating || 0);
    setReviewText(booking.review || '');
    setShowReviewModal(true);
  };

  const handleSubmitReview = () => {
    if (selectedBooking && reviewRating > 0) {
      // Update booking with review
      setBookings(bookings.map(b => 
        b.id === selectedBooking.id 
          ? { ...b, rating: reviewRating, review: reviewText }
          : b
      ));
      
      // Show success message
      alert(`✅ Cảm ơn bạn đã đánh giá ${reviewRating} ⭐!\n\nReview của bạn đã được gửi thành công.`);
      
      // Close modal and reset
      setShowReviewModal(false);
      setReviewRating(0);
      setReviewText('');
      setSelectedBooking(null);
    } else {
      alert('Vui lòng chọn số sao đánh giá!');
    }
  };

  const promotions = [
    {
      id: 1,
      title: 'Giảm 30% cuối tuần',
      description: 'Áp dụng cho tất cả phòng VIP',
      validUntil: '31/10/2025',
      image: 'https://images.unsplash.com/photo-1565382038303-8c62e88d119a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsdXh1cnklMjBrYXJhb2tlJTIwcm9vbSUyMHB1cnBsZSUyMGxpZ2h0aW5nfGVufDF8fHx8MTc2MDM3MTkxM3ww&ixlib=rb-4.1.0&q=80&w=1080',
    },
    {
      id: 2,
      title: 'Happy Hour 14h-17h',
      description: 'Giảm 20% giờ vàng',
      validUntil: '30/11/2025',
      image: 'https://images.unsplash.com/photo-1679205700241-bd122d6beaa3?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjBrYXJhb2tlJTIwcm9vbSUyMGludGVyaW9yfGVufDF8fHx8MTc2MDM3NTI2OXww&ixlib=rb-4.1.0&q=80&w=1080',
    },
  ];

  // Đồng bộ với hệ thống đặt phòng
  const featuredRooms = [
    {
      id: 1,
      name: 'Phòng VIP 01',
      category: 'VIP',
      branch: 'Trần Duy Hưng, Hà Nội',
      image: 'https://images.unsplash.com/photo-1598387993441-a364f854c3e1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsdXh1cnklMjBuaWdodGNsdWIlMjBwdXJwbGUlMjBsaWdodGluZ3xlbnwxfHx8fDE3NjAzNzgwOTR8MA&ixlib=rb-4.1.0&q=80&w=1080',
      capacity: '15-20 người',
      price: '450.000đ/giờ',
      rating: 4.9,
    },
    {
      id: 2,
      name: 'Phòng Family 02',
      category: 'Family',
      branch: 'Nguyễn Huệ, Hà Nội',
      image: 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxrYXJhb2tlJTIwcm9vbSUyMGx1eHVyeSUyMGludGVyaW9yfGVufDF8fHx8MTc2MDM3ODA5NHww&ixlib=rb-4.1.0&q=80&w=1080',
      capacity: '8-10 người',
      price: '280.000đ/giờ',
      rating: 4.7,
    },
    {
      id: 3,
      name: 'Phòng Couple 03',
      category: 'Couple',
      branch: 'Láng Hạ, Hà Nội',
      image: 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcml2YXRlJTIwa2FyYW9rZSUyMGJvb3RofGVufDF8fHx8MTc2MDM3ODA5NHww&ixlib=rb-4.1.0&q=80&w=1080',
      capacity: '2-4 người',
      price: '250.000đ/giờ',
      rating: 4.8,
    },
    {
      id: 4,
      name: 'Phòng Party 04',
      category: 'Party',
      branch: 'Trần Duy Hưng, Hà Nội',
      image: 'https://images.unsplash.com/photo-1429962714451-bb934ecdc4ec?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxWSVAlMjBsb3VuZ2UlMjBuaWdodGxpZmV8ZW58MXx8fHwxNzYwMzc4MDk0fDA&ixlib=rb-4.1.0&q=80&w=1080',
      capacity: '20-30 người',
      price: '600.000đ/giờ',
      rating: 5.0,
    },
  ];

  const services = [
    { name: 'Đồ uống cao cấp', icon: '🍹', price: 'Từ 50.000đ' },
    { name: 'Snack & Trái cây', icon: '🍿', price: 'Từ 80.000đ' },
    { name: 'Trang trí sinh nhật', icon: '🎂', price: '500.000đ' },
    { name: 'Setup VIP', icon: '👑', price: '300.000đ' },
  ];

  const vouchers = [
    { code: 'WEEKEND30', discount: '30%', validUntil: '31/10/2025', used: false },
    { code: 'HAPPY20', discount: '20%', validUntil: '30/11/2025', used: false },
    { code: 'VIP50K', discount: '50.000đ', validUntil: '31/12/2025', used: true },
  ];

  const renderHome = () => (
    <div className="pb-20">
      {/* Header */}
      <div className="bg-gradient-to-br from-[#9333ea] to-[#6b21a8] p-6 rounded-b-[30px]">
        <div className="flex items-center justify-between mb-6">
          <div>
            <p className="text-gray-300 text-sm">Chào mừng,</p>
            <h1 className="text-2xl text-white" style={{ fontWeight: 700 }}>{userName}</h1>
            <div className="flex items-center gap-2 mt-2">
              <Badge className="bg-[#ffd700] text-black">⭐ VIP Member</Badge>
              <span className="text-sm text-gray-300">1,250 điểm</span>
            </div>
          </div>
          <div className="w-12 h-12 rounded-full bg-[#ffd700] flex items-center justify-center">
            <User className="w-6 h-6 text-black" />
          </div>
        </div>

        {/* Search Bar */}
        <div className="relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
          <Input
            placeholder="Tìm phòng / cơ sở..."
            className="h-12 rounded-[20px] bg-white/10 border-white/20 text-white pl-12 placeholder:text-gray-400"
          />
        </div>
      </div>

      {/* Promotions Banner */}
      <div className="px-6 py-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-[#ffd700]" style={{ fontWeight: 600 }}>🎉 Ưu đãi đặc biệt</h2>
        </div>
        <div className="flex gap-4 overflow-x-auto pb-2 no-scrollbar">
          {promotions.map((promo) => (
            <Card
              key={promo.id}
              className="min-w-[320px] bg-card border-[#9333ea]/30 overflow-hidden cursor-pointer hover:border-[#9333ea] transition-all"
              onClick={() => onNavigate('promotion-detail', promo)}
            >
              <div className="relative h-32">
                <ImageWithFallback
                  src={promo.image}
                  alt={promo.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
                <div className="absolute bottom-3 left-3 right-3">
                  <h3 className="text-white mb-1">{promo.title}</h3>
                  <p className="text-sm text-gray-300">{promo.description}</p>
                </div>
              </div>
              <div className="p-3 bg-[#9333ea]/20">
                <p className="text-xs text-gray-400">Hạn sử dụng: {promo.validUntil}</p>
              </div>
            </Card>
          ))}
        </div>
      </div>

      {/* Quick Actions */}
      <div className="px-6">
        <div className="grid grid-cols-2 gap-3">
          <Card
            className="bg-card border-[#ffd700]/20 p-4 cursor-pointer hover:border-[#ffd700] transition-all hover:shadow-lg hover:shadow-[#ffd700]/20"
            onClick={() => setActiveTab('booking')}
          >
            <div className="w-12 h-12 rounded-full bg-[#ffd700]/20 flex items-center justify-center mb-3">
              <Calendar className="w-6 h-6 text-[#ffd700]" />
            </div>
            <h3 className="text-white mb-1">Đặt phòng</h3>
            <p className="text-sm text-gray-400">Đặt ngay</p>
          </Card>

          <Card
            className="bg-card border-[#9333ea]/20 p-4 cursor-pointer hover:border-[#9333ea] transition-all hover:shadow-lg hover:shadow-[#9333ea]/20"
            onClick={() => setActiveTab('services')}
          >
            <div className="w-12 h-12 rounded-full bg-[#9333ea]/20 flex items-center justify-center mb-3">
              <Sparkles className="w-6 h-6 text-[#9333ea]" />
            </div>
            <h3 className="text-white mb-1">Dịch vụ</h3>
            <p className="text-sm text-gray-400">Xem thêm</p>
          </Card>
        </div>
      </div>

      {/* Featured Rooms */}
      <div className="px-6 py-6">
        <h2 className="text-[#ffd700] mb-4" style={{ fontWeight: 600 }}>⭐ Phòng nổi bật</h2>
        <div className="space-y-3">
          {featuredRooms.map((room) => (
            <Card
              key={room.id}
              className="bg-card border-[#9333ea]/20 overflow-hidden cursor-pointer hover:border-[#9333ea] transition-all"
              onClick={() => onNavigate('room-detail', room)}
            >
              <div className="flex gap-3">
                <div className="relative w-24 h-24 flex-shrink-0">
                  <ImageWithFallback
                    src={room.image}
                    alt={room.name}
                    className="w-full h-full object-cover rounded-l-[20px]"
                  />
                </div>
                <div className="flex-1 py-2 pr-3">
                  <div className="flex items-start justify-between mb-2">
                    <div>
                      <h3 className="text-white">{room.name}</h3>
                      <p className="text-sm text-gray-400 flex items-center gap-1 mt-1">
                        <MapPin className="w-3 h-3" />
                        {room.branch}
                      </p>
                    </div>
                    <div className="flex items-center gap-1">
                      <Star className="w-4 h-4 text-[#ffd700]" fill="currentColor" />
                      <span className="text-sm text-white">{room.rating}</span>
                    </div>
                  </div>
                  <p className="text-sm text-gray-400 mb-2">👥 {room.capacity}</p>
                  <div className="flex items-center justify-between">
                    <span className="text-[#9333ea]" style={{ fontWeight: 600 }}>
                      {room.price}
                    </span>
                    <Button
                      size="sm"
                      className="bg-[#ffd700] hover:bg-[#ffed4e] text-black rounded-full h-7"
                    >
                      Đặt
                    </Button>
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );

  const renderBooking = () => (
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
          <div>
            <h2 className="text-2xl text-white" style={{ fontWeight: 700 }}>Đặt phòng</h2>
            <p className="text-gray-300 text-sm">Chọn cơ sở và phòng yêu thích</p>
          </div>
        </div>
      </div>

      <div className="px-6 py-6">
        <Button
          onClick={() => onNavigate('booking-flow', { step: 1 })}
          className="w-full h-14 rounded-[20px] bg-[#ffd700] hover:bg-[#ffed4e] text-black mb-6 animate-pulse-glow"
          style={{ fontWeight: 600 }}
        >
          🎤 Bắt đầu đặt phòng
        </Button>

        <h3 className="text-[#ffd700] mb-4" style={{ fontWeight: 600 }}>Lịch sử đặt phòng</h3>
        <div className="space-y-3">
          {bookings.map((booking) => (
            <Card
              key={booking.id}
              className="bg-card border-[#9333ea]/20 p-4"
            >
              <div className="flex items-start justify-between mb-3">
                <div>
                  <h3 className="text-white mb-1">{booking.room}</h3>
                  <p className="text-sm text-gray-400 flex items-center gap-1">
                    <MapPin className="w-3 h-3" />
                    {booking.branch}
                  </p>
                </div>
                <Badge
                  className={
                    booking.status === 'completed'
                      ? 'bg-gray-500'
                      : 'bg-green-500'
                  }
                >
                  {booking.status === 'completed' ? 'Đã hoàn thành' : 'Sắp tới'}
                </Badge>
              </div>
              
              {/* Booking details */}
              <div className="flex items-center justify-between text-sm mb-3">
                <span className="text-gray-400">
                  📅 {booking.date} • {booking.time}
                </span>
                <span className="text-[#ffd700]" style={{ fontWeight: 600 }}>
                  {booking.amount}
                </span>
              </div>
              
              {/* Booking code */}
              <div className="flex items-center gap-2 mb-3">
                <span className="text-xs text-gray-500">Mã: {booking.bookingCode}</span>
              </div>
              
              {/* Review section */}
              {booking.status === 'completed' && (
                <div className="border-t border-gray-700 pt-3 mt-3">
                  {booking.rating ? (
                    <div className="space-y-2">
                      <div className="flex items-center gap-2">
                        <span className="text-sm text-gray-400">Đánh giá của bạn:</span>
                        <div className="flex items-center gap-1">
                          {[1, 2, 3, 4, 5].map(star => (
                            <Star
                              key={star}
                              className={`w-4 h-4 ${
                                star <= booking.rating! ? 'text-[#ffd700] fill-[#ffd700]' : 'text-gray-600'
                              }`}
                            />
                          ))}
                        </div>
                      </div>
                      {booking.review && (
                        <p className="text-sm text-gray-300 bg-white/5 p-2 rounded-lg">
                          "{booking.review}"
                        </p>
                      )}
                      <Button
                        size="sm"
                        variant="outline"
                        className="border-[#9333ea]/50 text-[#9333ea] hover:bg-[#9333ea]/10"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleOpenReview(booking);
                        }}
                      >
                        <MessageSquare className="w-4 h-4 mr-1" />
                        Sửa đánh giá
                      </Button>
                    </div>
                  ) : (
                    <Button
                      size="sm"
                      className="w-full bg-[#ffd700] hover:bg-[#ffed4e] text-black rounded-full"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleOpenReview(booking);
                      }}
                    >
                      <Star className="w-4 h-4 mr-1" />
                      Đánh giá dịch vụ
                    </Button>
                  )}
                </div>
              )}
            </Card>
          ))}
        </div>
      </div>
    </div>
  );

  const renderServices = () => (
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
          <div>
            <h2 className="text-2xl text-white" style={{ fontWeight: 700 }}>Dịch vụ</h2>
            <p className="text-gray-300 text-sm">Nâng cấp trải nghiệm của bạn</p>
          </div>
        </div>
      </div>

      <div className="px-6 py-6">
        <div className="grid grid-cols-2 gap-4">
          {services.map((service, index) => (
            <Card
              key={index}
              className="bg-card border-[#9333ea]/20 p-4 cursor-pointer hover:border-[#9333ea] transition-all hover:shadow-lg hover:shadow-[#9333ea]/20"
              onClick={() => onNavigate('service-detail', service)}
            >
              <div className="text-4xl mb-3">{service.icon}</div>
              <h4 className="text-white mb-2">{service.name}</h4>
              <p className="text-sm text-[#9333ea]">{service.price}</p>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );

  const renderOffers = () => (
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
          <h2 className="text-2xl text-white" style={{ fontWeight: 700 }}>Ưu đãi</h2>
        </div>
        <div className="flex items-center gap-2 mt-4">
          <div className="flex-1">
            <p className="text-gray-300 text-sm">Điểm tích lũy</p>
            <p className="text-white text-2xl" style={{ fontWeight: 700 }}>1,250 điểm</p>
          </div>
          <div className="flex-1">
            <p className="text-gray-300 text-sm">Voucher</p>
            <p className="text-white text-2xl" style={{ fontWeight: 700 }}>3 mã</p>
          </div>
        </div>
      </div>

      <div className="px-6 py-6">
        <h3 className="text-[#ffd700] mb-4" style={{ fontWeight: 600 }}>💳 Voucher của bạn</h3>
        <div className="space-y-3">
          {vouchers.map((voucher, index) => (
            <Card
              key={index}
              className={`bg-card p-4 ${
                voucher.used
                  ? 'border-gray-700/30 opacity-60'
                  : 'border-[#ffd700]/30 hover:border-[#ffd700] cursor-pointer'
              }`}
            >
              <div className="flex items-center justify-between mb-3">
                <div>
                  <p className="text-[#ffd700] mb-1" style={{ fontWeight: 700, letterSpacing: 1 }}>
                    {voucher.code}
                  </p>
                  <p className="text-white">Giảm {voucher.discount}</p>
                </div>
                <Badge className={voucher.used ? 'bg-gray-500' : 'bg-green-500'}>
                  {voucher.used ? 'Đã dùng' : 'Khả dụng'}
                </Badge>
              </div>
              <p className="text-sm text-gray-400">HSD: {voucher.validUntil}</p>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );

  const renderProfile = () => (
    <div className="pb-20">
      {/* Header */}
      <div className="bg-gradient-to-br from-[#9333ea] to-[#6b21a8] p-6 rounded-b-[30px]">
        <div className="flex items-center gap-4 mb-6">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setActiveTab('home')}
            className="text-white hover:bg-white/10"
          >
            <ArrowLeft className="w-6 h-6" />
          </Button>
          <h2 className="text-2xl text-white" style={{ fontWeight: 700 }}>Tài khoản</h2>
        </div>

        {/* User Info Card */}
        <Card className="bg-white/10 backdrop-blur-sm border-white/20 p-4">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-full bg-[#ffd700] flex items-center justify-center flex-shrink-0">
              <User className="w-8 h-8 text-black" />
            </div>
            <div className="flex-1 min-w-0">
              <h3 className="text-white mb-1" style={{ fontWeight: 600 }}>
                {userName}
              </h3>
              <p className="text-sm text-gray-300">customer@karaokethudo.vn</p>
              <div className="flex items-center gap-2 mt-2">
                <Badge className="bg-[#ffd700] text-black">⭐ VIP Member</Badge>
              </div>
            </div>
          </div>
        </Card>
      </div>

      {/* Stats */}
      <div className="px-6 py-6">
        <div className="grid grid-cols-3 gap-3 mb-6">
          <Card className="bg-card border-[#ffd700]/30 p-3 text-center">
            <p className="text-2xl text-[#ffd700] mb-1" style={{ fontWeight: 700 }}>
              12
            </p>
            <p className="text-xs text-gray-400">Lượt đặt</p>
          </Card>
          <Card className="bg-card border-[#9333ea]/30 p-3 text-center">
            <p className="text-2xl text-[#9333ea] mb-1" style={{ fontWeight: 700 }}>
              1,250
            </p>
            <p className="text-xs text-gray-400">Điểm</p>
          </Card>
          <Card className="bg-card border-green-500/30 p-3 text-center">
            <p className="text-2xl text-green-500 mb-1" style={{ fontWeight: 700 }}>
              3
            </p>
            <p className="text-xs text-gray-400">Voucher</p>
          </Card>
        </div>

        {/* Menu Options */}
        <div className="space-y-2">
          <Card className="bg-card border-[#ffd700]/20 overflow-hidden">
            <button
              className="w-full p-4 flex items-center justify-between hover:bg-[#ffd700]/5 transition-colors"
              onClick={() => {}}
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-[#ffd700]/20 flex items-center justify-center">
                  <User className="w-5 h-5 text-[#ffd700]" />
                </div>
                <div className="text-left">
                  <p className="text-white text-sm" style={{ fontWeight: 600 }}>
                    Thông tin cá nhân
                  </p>
                  <p className="text-xs text-gray-400">Cập nhật thông tin</p>
                </div>
              </div>
              <ChevronRight className="w-5 h-5 text-gray-400" />
            </button>
          </Card>

          <Card className="bg-card border-[#9333ea]/20 overflow-hidden">
            <button
              className="w-full p-4 flex items-center justify-between hover:bg-[#9333ea]/5 transition-colors"
              onClick={() => {}}
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-[#9333ea]/20 flex items-center justify-center">
                  <CreditCard className="w-5 h-5 text-[#9333ea]" />
                </div>
                <div className="text-left">
                  <p className="text-white text-sm" style={{ fontWeight: 600 }}>
                    Phương thức thanh toán
                  </p>
                  <p className="text-xs text-gray-400">Quản lý thanh toán</p>
                </div>
              </div>
              <ChevronRight className="w-5 h-5 text-gray-400" />
            </button>
          </Card>

          <Card className="bg-card border-gray-700/20 overflow-hidden">
            <button
              className="w-full p-4 flex items-center justify-between hover:bg-gray-700/5 transition-colors"
              onClick={() => {}}
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-gray-700/20 flex items-center justify-center">
                  <Settings className="w-5 h-5 text-gray-400" />
                </div>
                <div className="text-left">
                  <p className="text-white text-sm" style={{ fontWeight: 600 }}>
                    Cài đặt
                  </p>
                  <p className="text-xs text-gray-400">Tùy chỉnh ứng dụng</p>
                </div>
              </div>
              <ChevronRight className="w-5 h-5 text-gray-400" />
            </button>
          </Card>

          <Card className="bg-card border-gray-700/20 overflow-hidden">
            <button
              className="w-full p-4 flex items-center justify-between hover:bg-gray-700/5 transition-colors"
              onClick={() => {}}
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-gray-700/20 flex items-center justify-center">
                  <Shield className="w-5 h-5 text-gray-400" />
                </div>
                <div className="text-left">
                  <p className="text-white text-sm" style={{ fontWeight: 600 }}>
                    Bảo mật
                  </p>
                  <p className="text-xs text-gray-400">Mật khẩu & bảo mật</p>
                </div>
              </div>
              <ChevronRight className="w-5 h-5 text-gray-400" />
            </button>
          </Card>

          <Card className="bg-card border-gray-700/20 overflow-hidden">
            <button
              className="w-full p-4 flex items-center justify-between hover:bg-gray-700/5 transition-colors"
              onClick={() => {}}
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-gray-700/20 flex items-center justify-center">
                  <HelpCircle className="w-5 h-5 text-gray-400" />
                </div>
                <div className="text-left">
                  <p className="text-white text-sm" style={{ fontWeight: 600 }}>
                    Trợ giúp & Hỗ trợ
                  </p>
                  <p className="text-xs text-gray-400">Câu hỏi thường gặp</p>
                </div>
              </div>
              <ChevronRight className="w-5 h-5 text-gray-400" />
            </button>
          </Card>
        </div>

        {/* Logout Button */}
        <Button
          onClick={() => setShowLogoutDialog(true)}
          className="w-full h-12 rounded-[20px] bg-red-500/20 hover:bg-red-500/30 text-red-400 border border-red-500/30 mt-6"
          variant="outline"
        >
          <LogOut className="w-5 h-5 mr-2" />
          Đăng xuất
        </Button>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-background">
      {activeTab === 'home' && renderHome()}
      {activeTab === 'booking' && renderBooking()}
      {activeTab === 'services' && renderServices()}
      {activeTab === 'offers' && renderOffers()}
      {activeTab === 'profile' && renderProfile()}

      {/* Bottom Navigation */}
      <div className="fixed bottom-0 left-0 right-0 bg-[#1a1a24] border-t border-[#ffd700]/20 px-2 py-2 max-w-md mx-auto">
        <div className="flex items-center justify-around">
          <button
            onClick={() => setActiveTab('home')}
            className={`flex flex-col items-center gap-0.5 transition-colors ${
              activeTab === 'home' ? 'text-[#ffd700]' : 'text-gray-400'
            }`}
          >
            <HomeIcon className="w-5 h-5" />
            <span className="text-xs">Trang chủ</span>
          </button>
          <button
            onClick={() => setActiveTab('booking')}
            className={`flex flex-col items-center gap-0.5 transition-colors ${
              activeTab === 'booking' ? 'text-[#ffd700]' : 'text-gray-400'
            }`}
          >
            <Calendar className="w-5 h-5" />
            <span className="text-xs">Đặt phòng</span>
          </button>
          <button
            onClick={() => setActiveTab('services')}
            className={`flex flex-col items-center gap-0.5 transition-colors ${
              activeTab === 'services' ? 'text-[#ffd700]' : 'text-gray-400'
            }`}
          >
            <Sparkles className="w-5 h-5" />
            <span className="text-xs">Dịch vụ</span>
          </button>
          <button
            onClick={() => setActiveTab('offers')}
            className={`flex flex-col items-center gap-0.5 transition-colors ${
              activeTab === 'offers' ? 'text-[#ffd700]' : 'text-gray-400'
            }`}
          >
            <Gift className="w-5 h-5" />
            <span className="text-xs">Ưu đãi</span>
          </button>
          <button
            onClick={() => setActiveTab('profile')}
            className={`flex flex-col items-center gap-0.5 transition-colors ${
              activeTab === 'profile' ? 'text-[#ffd700]' : 'text-gray-400'
            }`}
          >
            <User className="w-5 h-5" />
            <span className="text-xs">Tài khoản</span>
          </button>
        </div>
      </div>

      {/* Logout Confirmation Dialog */}
      <Dialog open={showLogoutDialog} onOpenChange={setShowLogoutDialog}>
        <DialogContent className="bg-card border-red-500/30 text-white max-w-sm">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2 text-white">
              <div className="w-10 h-10 rounded-full bg-red-500/20 flex items-center justify-center">
                <LogOut className="w-5 h-5 text-red-400" />
              </div>
              Đăng xuất
            </DialogTitle>
            <DialogDescription className="text-gray-300">
              Bạn có chắc chắn muốn đăng xuất khỏi tài khoản? 
              Bạn sẽ cần đăng nhập lại để sử dụng ứng dụng.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter className="gap-2 sm:gap-0">
            <Button
              variant="outline"
              className="bg-gray-700 hover:bg-gray-600 text-white border-gray-600"
              onClick={() => setShowLogoutDialog(false)}
            >
              Hủy
            </Button>
            <Button
              className="bg-red-500 hover:bg-red-600 text-white"
              onClick={() => {
                setShowLogoutDialog(false);
                // Navigate to home and clear session
                onNavigate('home');
              }}
            >
              Đăng xuất
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Review Modal */}
      <Dialog open={showReviewModal} onOpenChange={setShowReviewModal}>
        <DialogContent className="bg-card border-[#9333ea]/30 text-white max-w-sm">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2 text-white">
              <div className="w-10 h-10 rounded-full bg-[#9333ea]/20 flex items-center justify-center">
                <ThumbsUp className="w-5 h-5 text-[#9333ea]" />
              </div>
              Đánh giá
            </DialogTitle>
            <DialogDescription className="text-gray-300">
              Hãy chia sẻ trải nghiệm của bạn về phòng này!
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              {[1, 2, 3, 4, 5].map(star => (
                <Star
                  key={star}
                  className={`w-5 h-5 cursor-pointer ${
                    star <= reviewRating ? 'text-[#ffd700]' : 'text-gray-400'
                  }`}
                  onClick={() => setReviewRating(star)}
                />
              ))}
            </div>
            <Textarea
              value={reviewText}
              onChange={(e) => setReviewText(e.target.value)}
              placeholder="Nhập đánh giá của bạn..."
              className="h-24 bg-white/10 backdrop-blur-sm border-white/20 text-white placeholder:text-gray-400"
            />
          </div>
          <DialogFooter className="gap-2 sm:gap-0">
            <Button
              variant="outline"
              className="bg-gray-700 hover:bg-gray-600 text-white border-gray-600"
              onClick={() => setShowReviewModal(false)}
            >
              Hủy
            </Button>
            <Button
              className="bg-[#9333ea] hover:bg-[#9333ea]/80 text-white"
              onClick={handleSubmitReview}
            >
              Gửi đánh giá
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}