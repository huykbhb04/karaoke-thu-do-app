import { useState } from "react";
import {
  MapPin,
  Phone,
  Clock,
  Mail,
  Facebook,
  Instagram,
  Music,
  Star,
  Users,
  Sparkles,
  Volume2,
  Sofa,
  Wind,
  Tv,
  Menu,
  X,
} from "lucide-react";
import { Button } from "./ui/button";
import { Card } from "./ui/card";
import { Badge } from "./ui/badge";
import { ImageWithFallback } from "./figma/ImageWithFallback";

interface HomeProps {
  onNavigate: (screen: string, data?: any) => void;
}

export function Home({ onNavigate }: HomeProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("home");

  const branches = [
    {
      id: 1,
      name: "Cơ sở 1 - Trần Duy Hưng",
      address: "45 Trần Duy Hưng, Cầu Giấy, Hà Nội",
      phone: "024 3856 xxxx",
      hours: "10:00 - 02:00",
      rooms: 15,
    },
    {
      id: 2,
      name: "Cơ sở 2 - Nguyễn Huệ",
      address: "23 Nguyễn Huệ, Hoàn Kiếm, Hà Nội",
      phone: "024 3942 xxxx",
      hours: "10:00 - 02:00",
      rooms: 12,
    },
    {
      id: 3,
      name: "Cơ sở 3 - Láng Hạ",
      address: "89 Láng Hạ, Đống Đa, Hà Nội",
      phone: "024 3776 xxxx",
      hours: "10:00 - 02:00",
      rooms: 18,
    },
  ];

  const rooms = [
    {
      id: 1,
      name: "Phòng VIP 01",
      image:
        "https://images.unsplash.com/photo-1598387993441-a364f854c3e1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsdXh1cnklMjBuaWdodGNsdWIlMjBwdXJwbGUlMjBsaWdodGluZ3xlbnwxfHx8fDE3NjAzNzgwOTR8MA&ixlib=rb-4.1.0&q=80&w=1080",
      capacity: "15-20 người",
      amenities: [
        "Dàn âm thanh 5.1",
        "Đèn LED RGB",
        "Mini Bar",
        "Sofa cao cấp",
      ],
      price: "450.000đ",
      priceUnit: "/giờ",
      rating: 4.9,
    },
    {
      id: 2,
      name: "Phòng Family 02",
      image:
        "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxrYXJhb2tlJTIwcm9vbSUyMGx1eHVyeSUyMGludGVyaW9yfGVufDF8fHx8MTc2MDM3ODA5NHww&ixlib=rb-4.1.0&q=80&w=1080",
      capacity: "8-10 người",
      amenities: [
        "Âm thanh Bose",
        "Đèn LED",
        "Điều hòa 2 chiều",
        "TV 55 inch",
      ],
      price: "280.000đ",
      priceUnit: "/giờ",
      rating: 4.7,
    },
    {
      id: 3,
      name: "Phòng Couple 03",
      image:
        "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcml2YXRlJTIwa2FyYW9rZSUyMGJvb3RofGVufDF8fHx8MTc2MDM3ODA5NHww&ixlib=rb-4.1.0&q=80&w=1080",
      capacity: "2-4 người",
      amenities: [
        "Âm thanh JBL",
        "Ánh sáng lãng mạn",
        "Sofa đôi",
        "Mini fridge",
      ],
      price: "250.000đ",
      priceUnit: "/giờ",
      rating: 4.8,
    },
    {
      id: 4,
      name: "Phòng Party 04",
      image:
        "https://images.unsplash.com/photo-1429962714451-bb934ecdc4ec?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxWSVAlMjBsb3VuZ2UlMjBuaWdodGxpZmV8ZW58MXx8fHwxNzYwMzc4MDk0fDA&ixlib=rb-4.1.0&q=80&w=1080",
      capacity: "20-30 người",
      amenities: [
        "Âm thanh chuyên nghiệp",
        "Đèn sân khấu",
        "Bar riêng",
        "Sân khấu",
      ],
      price: "600.000đ",
      priceUnit: "/giờ",
      rating: 5.0,
    },
  ];

  const services = [
    {
      name: "Đồ uống cao cấp",
      icon: "🍹",
      description:
        "Menu đa dạng: nước ngọt, bia, rượu, cocktail",
      price: "Từ 30.000đ",
    },
    {
      name: "Snack & Trái cây",
      icon: "🍿",
      description: "Snack nhập khẩu, hoa quả tươi theo mùa",
      price: "Từ 50.000đ",
    },
    {
      name: "Phục vụ sinh nhật",
      icon: "🎂",
      description: "Bánh kem, trang trí phòng, bóng bay",
      price: "500.000đ",
    },
    {
      name: "Trang trí sự kiện",
      icon: "🎉",
      description: "Setup theo chủ đề, backdrop, banner",
      price: "Từ 800.000đ",
    },
  ];

  const scrollToSection = (sectionId: string) => {
    setActiveSection(sectionId);
    setMobileMenuOpen(false);
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Navbar */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-[#0a0a0f]/95 backdrop-blur-md border-b border-[#ffd700]/20">
        <div className="w-full px-3 md:px-6 lg:px-8 py-2.5 md:py-4">
          <div className="max-w-7xl mx-auto flex items-center justify-between gap-2">
            {/* Logo */}
            <div
              className="flex items-center gap-1.5 md:gap-3 cursor-pointer min-w-0"
              onClick={() => scrollToSection("home")}
            >
              <div className="w-7 h-7 md:w-10 md:h-10 rounded-full bg-gradient-gold-purple flex items-center justify-center flex-shrink-0">
                <Music className="w-4 h-4 md:w-6 md:h-6 text-white" />
              </div>
              <h1
                className="text-sm md:text-xl leading-none whitespace-nowrap"
                style={{
                  color: "#ffd700",
                  fontWeight: 700,
                  textShadow: "0 0 15px rgba(255, 215, 0, 0.4)",
                }}
              >
                KARAOKE THỦ ĐÔ
              </h1>
            </div>

            {/* Desktop Navigation Menu - Hidden on mobile */}
            <div className="hidden md:flex items-center gap-6">
              <button
                onClick={() => scrollToSection("home")}
                className="text-sm text-gray-300 hover:text-[#ffd700] transition-colors"
                style={{ fontWeight: 500 }}
              >
                Trang chủ
              </button>
              <button
                onClick={() => scrollToSection("about")}
                className="text-sm text-gray-300 hover:text-[#ffd700] transition-colors"
                style={{ fontWeight: 500 }}
              >
                Giới thiệu
              </button>
              <button
                onClick={() => scrollToSection("rooms")}
                className="text-sm text-gray-300 hover:text-[#ffd700] transition-colors"
                style={{ fontWeight: 500 }}
              >
                Phòng & Dịch vụ
              </button>
              <button
                onClick={() => scrollToSection("contact")}
                className="text-sm text-gray-300 hover:text-[#ffd700] transition-colors"
                style={{ fontWeight: 500 }}
              >
                Liên hệ
              </button>
            </div>

            {/* Auth Buttons - Always Visible */}
            <div className="flex items-center gap-1.5 md:gap-3 flex-shrink-0">
              <Button
                onClick={() => onNavigate("login")}
                size="sm"
                variant="outline"
                className="border-[#ffd700] text-[#ffd700] hover:bg-[#ffd700]/10 rounded-full h-7 md:h-9 text-xs md:text-sm px-3 md:px-6"
                style={{ fontWeight: 500 }}
              >
                Đăng nhập
              </Button>
              <Button
                onClick={() => onNavigate("signup")}
                size="sm"
                className="bg-[#ffd700] hover:bg-[#ffed4e] text-black rounded-full h-7 md:h-9 text-xs md:text-sm px-3 md:px-6"
                style={{ fontWeight: 600 }}
              >
                Đăng ký
              </Button>
              {/* Mobile menu button - only visible on mobile */}
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="text-[#ffd700] p-1.5 flex-shrink-0 md:hidden"
                aria-label="Menu"
              >
                {mobileMenuOpen ? (
                  <X className="w-5 h-5" />
                ) : (
                  <Menu className="w-5 h-5" />
                )}
              </button>
            </div>
          </div>

          {/* Mobile Menu Dropdown */}
          {mobileMenuOpen && (
            <div className="mt-2.5 pb-2.5 border-t border-[#ffd700]/20 pt-2.5 md:hidden">
              <div className="flex flex-col gap-2">
                <button
                  onClick={() => scrollToSection("home")}
                  className="text-left text-xs text-gray-300 hover:text-[#ffd700] transition-colors py-1.5 px-2"
                  style={{ fontWeight: 500 }}
                >
                  Trang chủ
                </button>
                <button
                  onClick={() => scrollToSection("about")}
                  className="text-left text-xs text-gray-300 hover:text-[#ffd700] transition-colors py-1.5 px-2"
                  style={{ fontWeight: 500 }}
                >
                  Giới thiệu
                </button>
                <button
                  onClick={() => scrollToSection("rooms")}
                  className="text-left text-xs text-gray-300 hover:text-[#ffd700] transition-colors py-1.5 px-2"
                  style={{ fontWeight: 500 }}
                >
                  Phòng & Dịch vụ
                </button>
                <button
                  onClick={() => scrollToSection("contact")}
                  className="text-left text-xs text-gray-300 hover:text-[#ffd700] transition-colors py-1.5 px-2"
                  style={{ fontWeight: 500 }}
                >
                  Liên hệ
                </button>
              </div>
            </div>
          )}
        </div>
      </nav>

      {/* Hero Section */}
      <section
        id="home"
        className="relative min-h-screen flex items-center justify-center pt-12 md:pt-16"
      >
        {/* Background Image */}
        <div className="absolute inset-0">
          <ImageWithFallback
            src="https://images.unsplash.com/photo-1598387993441-a364f854c3e1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsdXh1cnklMjBuaWdodGNsdWIlMjBwdXJwbGUlMjBsaWdodGluZ3xlbnwxfHx8fDE3NjAzNzgwOTR8MA&ixlib=rb-4.1.0&q=80&w=1080"
            alt="Hero Background"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-[#9333ea]/30 to-[#0a0a0f]" />
          <div className="absolute inset-0 bg-gradient-to-r from-[#ffd700]/10 via-transparent to-[#9333ea]/10 animate-pulse" />
        </div>

        {/* Content */}
        <div className="relative z-10 w-full px-4 md:px-6 text-center">
          <div className="max-w-4xl mx-auto">
            <Badge className="mb-3 md:mb-6 bg-[#ffd700]/20 text-[#ffd700] border-[#ffd700]/50 px-3 md:px-6 py-1 md:py-2 text-xs md:text-sm inline-block">
              ⭐ Hệ thống karaoke cao cấp
            </Badge>

            <h1
              className="text-3xl md:text-5xl lg:text-6xl mb-3 md:mb-6 leading-tight"
              style={{
                color: "#ffd700",
                fontWeight: 700,
                textShadow: "0 0 20px rgba(255, 215, 0, 0.5)",
              }}
            >
              Trải nghiệm âm nhạc
              <br />
              đỉnh cao
            </h1>

            <p className="text-sm md:text-lg text-gray-200 mb-6 md:mb-10 leading-relaxed max-w-sm md:max-w-2xl mx-auto">
              Không gian sang trọng • Âm thanh chuẩn quốc tế • Dịch vụ 5 sao
            </p>

            <div className="flex flex-col md:flex-row gap-2 md:gap-4 max-w-xs md:max-w-md mx-auto">
              <Button
                onClick={() => onNavigate("booking-flow")}
                className="w-full h-11 md:h-14 rounded-full bg-[#ffd700] hover:bg-[#ffed4e] text-black text-sm md:text-base"
                style={{ fontWeight: 600 }}
              >
                🎤 Đặt phòng ngay
              </Button>
              <Button
                onClick={() => scrollToSection("rooms")}
                variant="outline"
                className="w-full h-11 md:h-14 rounded-full border-2 border-[#ffd700] text-[#ffd700] hover:bg-[#ffd700]/10 backdrop-blur-sm text-sm md:text-base"
                style={{ fontWeight: 500 }}
              >
                Xem dịch vụ
              </Button>
            </div>

            {/* Stats */}
            <div className="mt-8 md:mt-16 grid grid-cols-3 gap-2 md:gap-6 max-w-sm md:max-w-3xl mx-auto">
              <div className="backdrop-blur-md bg-white/5 rounded-2xl p-3 md:p-6 border border-[#ffd700]/20">
                <p className="text-xl md:text-4xl text-[#ffd700]" style={{ fontWeight: 700 }}>3</p>
                <p className="text-gray-300 text-xs md:text-base mt-1 md:mt-2">Cơ sở</p>
              </div>
              <div className="backdrop-blur-md bg-white/5 rounded-2xl p-3 md:p-6 border border-[#ffd700]/20">
                <p className="text-xl md:text-4xl text-[#ffd700]" style={{ fontWeight: 700 }}>45</p>
                <p className="text-gray-300 text-xs md:text-base mt-1 md:mt-2">Phòng</p>
              </div>
              <div className="backdrop-blur-md bg-white/5 rounded-2xl p-3 md:p-6 border border-[#ffd700]/20">
                <p className="text-xl md:text-4xl text-[#ffd700]" style={{ fontWeight: 700 }}>10+</p>
                <p className="text-gray-300 text-xs md:text-base mt-1 md:mt-2">Năm KN</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section
        id="about"
        className="py-12 md:py-20 bg-gradient-to-b from-[#0a0a0f] to-[#1a1a24]"
      >
        <div className="w-full px-4 md:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-8 md:mb-12">
              <Badge className="mb-3 md:mb-4 bg-[#9333ea]/20 text-[#9333ea] border-[#9333ea]/50 px-3 md:px-6 py-1 md:py-2 text-xs md:text-sm inline-block">
                VỀ CHÚNG TÔI
              </Badge>
              <h2
                className="text-lg md:text-3xl lg:text-4xl mb-3 md:mb-4 px-2"
                style={{
                  color: "#ffd700",
                  fontWeight: 700,
                  textShadow: "0 0 15px rgba(255, 215, 0, 0.3)",
                }}
              >
                Giới thiệu Karaoke Thủ Đô
              </h2>
              <p className="text-gray-300 text-sm md:text-base leading-relaxed max-w-lg md:max-w-3xl mx-auto px-4">
                Với hơn 10 năm kinh nghiệm, Karaoke Thủ Đô tự hào là hệ thống karaoke cao cấp hàng đầu tại Hà Nội. Chúng tôi cam kết mang đến không gian sang trọng cùng dịch vụ 5 sao.
              </p>
            </div>

            {/* Branches */}
            <div>
              <h3
                className="text-base md:text-xl text-[#ffd700] mb-4 md:mb-6 text-center"
                style={{ fontWeight: 600 }}
              >
                🏢 Hệ thống cơ sở
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3 md:gap-6">
                {branches.map((branch) => (
                  <Card
                    key={branch.id}
                    className="bg-card border-[#ffd700]/30 p-4 md:p-6 hover:border-[#ffd700] transition-all cursor-pointer"
                    onClick={() => onNavigate("branch-detail", branch)}
                  >
                    <div className="flex items-start gap-3 mb-3 md:mb-4">
                      <div className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-[#ffd700]/20 flex items-center justify-center flex-shrink-0">
                        <MapPin className="w-5 h-5 md:w-6 md:h-6 text-[#ffd700]" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h4 className="text-white text-sm md:text-base mb-1 md:mb-2 break-words" style={{ fontWeight: 600 }}>
                          {branch.name}
                        </h4>
                        <Badge className="bg-[#9333ea]/20 text-[#9333ea] text-xs md:text-sm">
                          {branch.rooms} phòng
                        </Badge>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <p className="flex items-start gap-2 text-xs md:text-sm text-gray-400">
                        <MapPin className="w-3.5 h-3.5 md:w-4 md:h-4 mt-0.5 flex-shrink-0" />
                        <span className="break-words leading-relaxed">{branch.address}</span>
                      </p>
                      <p className="flex items-center gap-2 text-xs md:text-sm text-gray-400">
                        <Phone className="w-3.5 h-3.5 md:w-4 md:h-4 flex-shrink-0" />
                        <span>{branch.phone}</span>
                      </p>
                      <p className="flex items-center gap-2 text-xs md:text-sm text-gray-400">
                        <Clock className="w-3.5 h-3.5 md:w-4 md:h-4 flex-shrink-0" />
                        <span>{branch.hours}</span>
                      </p>
                    </div>
                  </Card>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Rooms Section */}
      <section id="rooms" className="py-12 md:py-20 bg-[#0a0a0f]">
        <div className="w-full px-4 md:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-8 md:mb-12">
              <Badge className="mb-3 md:mb-4 bg-[#ffd700]/20 text-[#ffd700] border-[#ffd700]/50 px-3 md:px-6 py-1 md:py-2 text-xs md:text-sm inline-block">
                PHÒNG HÁT
              </Badge>
              <h2
                className="text-lg md:text-3xl lg:text-4xl mb-3 md:mb-4"
                style={{
                  color: "#ffd700",
                  fontWeight: 700,
                  textShadow: "0 0 15px rgba(255, 215, 0, 0.3)",
                }}
              >
                Đa dạng phòng hát
              </h2>
              <p className="text-gray-300 text-sm md:text-base max-w-lg md:max-w-3xl mx-auto">
                Từ phòng đôi lãng mạn đến phòng VIP sang trọng
              </p>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-6">
              {rooms.map((room) => (
                <Card
                  key={room.id}
                  className="bg-card border-[#9333ea]/30 overflow-hidden hover:border-[#9333ea] transition-all cursor-pointer"
                  onClick={() => onNavigate("room-detail", room)}
                >
                  <div className="relative h-32 md:h-48 overflow-hidden">
                    <ImageWithFallback
                      src={room.image}
                      alt={room.name}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
                    <div className="absolute top-2 right-2 flex items-center gap-0.5 bg-[#ffd700] text-black px-2 py-0.5 rounded-full">
                      <Star className="w-3 h-3" fill="currentColor" />
                      <span className="text-xs" style={{ fontWeight: 600 }}>{room.rating}</span>
                    </div>
                    <div className="absolute bottom-2 left-2 right-2">
                      <h3 className="text-white text-xs md:text-sm mb-0.5 truncate" style={{ fontWeight: 600 }}>
                        {room.name}
                      </h3>
                      <p className="text-xs text-gray-300 flex items-center gap-1">
                        <Users className="w-3 h-3" />
                        <span className="truncate">{room.capacity}</span>
                      </p>
                    </div>
                  </div>

                  <div className="p-3 md:p-4">
                    <div className="space-y-1 mb-3">
                      {room.amenities.slice(0, 2).map((amenity, idx) => (
                        <div key={idx} className="flex items-center gap-1 text-xs text-gray-400">
                          {idx === 0 && <Volume2 className="w-3 h-3 flex-shrink-0" />}
                          {idx === 1 && <Sparkles className="w-3 h-3 flex-shrink-0" />}
                          <span className="truncate">{amenity}</span>
                        </div>
                      ))}
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="min-w-0">
                        <p className="text-base md:text-lg text-[#9333ea] truncate" style={{ fontWeight: 700 }}>
                          {room.price}
                        </p>
                        <p className="text-xs text-gray-400">/giờ</p>
                      </div>
                      <Button
                        size="sm"
                        className="bg-[#ffd700] hover:bg-[#ffed4e] text-black rounded-full h-7 md:h-9 px-3 md:px-4 text-xs md:text-sm flex-shrink-0"
                        style={{ fontWeight: 600 }}
                        onClick={(e) => {
                          e.stopPropagation();
                          onNavigate("booking-flow");
                        }}
                      >
                        Đặt
                      </Button>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section
        id="services"
        className="py-12 md:py-20 bg-gradient-to-b from-[#0a0a0f] to-[#1a1a24]"
      >
        <div className="w-full px-4 md:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-8 md:mb-12">
              <Badge className="mb-3 md:mb-4 bg-[#9333ea]/20 text-[#9333ea] border-[#9333ea]/50 px-3 md:px-6 py-1 md:py-2 text-xs md:text-sm inline-block">
                DỊCH VỤ
              </Badge>
              <h2
                className="text-lg md:text-3xl lg:text-4xl mb-3 md:mb-4"
                style={{
                  color: "#ffd700",
                  fontWeight: 700,
                  textShadow: "0 0 15px rgba(255, 215, 0, 0.3)",
                }}
              >
                Dịch vụ đẳng cấp
              </h2>
              <p className="text-gray-300 text-sm md:text-base max-w-lg md:max-w-3xl mx-auto">
                Nâng tầm trải nghiệm của bạn
              </p>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-6">
              {services.map((service, index) => (
                <Card
                  key={index}
                  className="bg-card border-[#9333ea]/30 p-4 md:p-6 hover:border-[#9333ea] transition-all cursor-pointer text-center"
                  onClick={() => onNavigate("service-detail", service)}
                >
                  <div className="text-4xl md:text-5xl mb-2 md:mb-4">{service.icon}</div>
                  <h3 className="text-white text-sm md:text-base mb-2 break-words" style={{ fontWeight: 600 }}>
                    {service.name}
                  </h3>
                  <p className="text-xs md:text-sm text-gray-400 mb-2 md:mb-3 leading-relaxed break-words">
                    {service.description}
                  </p>
                  <p className="text-[#9333ea] text-sm md:text-base" style={{ fontWeight: 700 }}>
                    {service.price}
                  </p>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Contact/Footer Section */}
      <footer
        id="contact"
        className="bg-[#1a1a24] border-t border-[#ffd700]/20 py-8 md:py-12"
      >
        <div className="w-full px-4 md:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 mb-8">
              {/* Contact Info */}
              <div>
                <h3 className="text-[#ffd700] text-sm md:text-base mb-3 md:mb-4" style={{ fontWeight: 600 }}>
                  Liên hệ
                </h3>
                <div className="space-y-2 text-sm text-gray-400">
                  <p className="flex items-center gap-2">
                    <Phone className="w-3.5 h-3.5 md:w-4 md:h-4 flex-shrink-0" />
                    <span>Hotline: 1900-xxxx</span>
                  </p>
                  <p className="flex items-center gap-2">
                    <Mail className="w-3.5 h-3.5 md:w-4 md:h-4 flex-shrink-0" />
                    <span className="break-all">info@karaoketd.vn</span>
                  </p>
                  <p className="flex items-start gap-2">
                    <Clock className="w-3.5 h-3.5 md:w-4 md:h-4 mt-0.5 flex-shrink-0" />
                    <span>Giờ mở cửa: 10:00 - 02:00 hàng ngày</span>
                  </p>
                </div>
              </div>

              {/* Social Media */}
              <div>
                <h3 className="text-[#ffd700] text-sm md:text-base mb-3 md:mb-4" style={{ fontWeight: 600 }}>
                  Kết nối với chúng tôi
                </h3>
                <div className="flex gap-2 mb-3">
                  <a
                    href="#"
                    className="w-9 h-9 md:w-11 md:h-11 rounded-full bg-[#9333ea]/20 flex items-center justify-center hover:bg-[#9333ea] transition-colors"
                    aria-label="Facebook"
                  >
                    <Facebook className="w-4 h-4 md:w-5 md:h-5 text-[#9333ea]" />
                  </a>
                  <a
                    href="#"
                    className="w-9 h-9 md:w-11 md:h-11 rounded-full bg-[#9333ea]/20 flex items-center justify-center hover:bg-[#9333ea] transition-colors"
                    aria-label="Instagram"
                  >
                    <Instagram className="w-4 h-4 md:w-5 md:h-5 text-[#9333ea]" />
                  </a>
                  <a
                    href="#"
                    className="w-9 h-9 md:w-11 md:h-11 rounded-full bg-[#9333ea]/20 flex items-center justify-center hover:bg-[#9333ea] transition-colors"
                    aria-label="TikTok"
                  >
                    <Music className="w-4 h-4 md:w-5 md:h-5 text-[#9333ea]" />
                  </a>
                </div>
                <p className="text-gray-400 text-xs leading-relaxed">
                  Theo dõi để nhận ưu đãi mới nhất!
                </p>
              </div>

              {/* Logo & Info - Desktop Only */}
              <div className="hidden md:block">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 rounded-full bg-gradient-gold-purple flex items-center justify-center">
                    <Music className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <div className="text-white" style={{ fontWeight: 700 }}>Karaoke</div>
                    <div className="text-[#ffd700] text-sm" style={{ fontWeight: 700 }}>Thủ Đô</div>
                  </div>
                </div>
                <p className="text-gray-400 text-sm leading-relaxed">
                  Hệ thống karaoke cao cấp hàng đầu tại Hà Nội với hơn 10 năm kinh nghiệm.
                </p>
              </div>
            </div>

            <div className="border-t border-[#ffd700]/20 pt-6 text-center text-gray-400 text-xs md:text-sm">
              <p>© 2025 Karaoke Thủ Đô. All rights reserved</p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}