import { useState } from "react";
import { ArrowLeft, Users, Star, ChevronRight } from "lucide-react";
import { Button } from "./ui/button";
import { Card } from "./ui/card";
import { Badge } from "./ui/badge";
import { ImageWithFallback } from "./figma/ImageWithFallback";

interface BookingFlowProps {
  onNavigate: (screen: string, data?: any) => void;
  onBack: () => void;
  userRole?: string | null;
}

export function BookingFlow({ onNavigate, onBack, userRole }: BookingFlowProps) {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const roomCategories = [
    {
      id: "vip",
      name: "Phòng VIP",
      description: "Sang trọng, rộng rãi cho nhóm lớn",
      image: "https://images.unsplash.com/photo-1598387993441-a364f854c3e1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsdXh1cnklMjBuaWdodGNsdWIlMjBwdXJwbGUlMjBsaWdodGluZ3xlbnwxfHx8fDE3NjAzNzgwOTR8MA&ixlib=rb-4.1.0&q=80&w=1080",
      capacity: "15-20 người",
      priceRange: "450.000đ - 600.000đ",
      features: ["Dàn âm thanh cao cấp", "Đèn LED RGB", "Mini Bar", "Sofa sang trọng"],
      totalRooms: 6,
      availableRooms: 4,
    },
    {
      id: "family",
      name: "Phòng Family",
      description: "Ấm cúng cho gia đình và bạn bè",
      image: "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxrYXJhb2tlJTIwcm9vbSUyMGx1eHVyeSUyMGludGVyaW9yfGVufDF8fHx8MTc2MDM3ODA5NHww&ixlib=rb-4.1.0&q=80&w=1080",
      capacity: "8-10 người",
      priceRange: "250.000đ - 350.000đ",
      features: ["Âm thanh Bose", "Đèn LED", "Điều hòa 2 chiều", "TV 55 inch"],
      totalRooms: 12,
      availableRooms: 8,
    },
    {
      id: "couple",
      name: "Phòng Couple",
      description: "Lãng mạn cho 2-4 người",
      image: "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcml2YXRlJTIwa2FyYW9rZSUyMGJvb3RofGVufDF8fHx8MTc2MDM3ODA5NHww&ixlib=rb-4.1.0&q=80&w=1080",
      capacity: "2-4 người",
      priceRange: "200.000đ - 280.000đ",
      features: ["Âm thanh JBL", "Ánh sáng lãng mạn", "Sofa đôi", "Mini fridge"],
      totalRooms: 8,
      availableRooms: 5,
    },
    {
      id: "party",
      name: "Phòng Party",
      description: "Sôi động cho sự kiện, tiệc tùng",
      image: "https://images.unsplash.com/photo-1429962714451-bb934ecdc4ec?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxWSVAlMjBsb3VuZ2UlMjBuaWdodGxpZmV8ZW58MXx8fHwxNzYwMzc4MDk0fDA&ixlib=rb-4.1.0&q=80&w=1080",
      capacity: "20-30 người",
      priceRange: "600.000đ - 800.000đ",
      features: ["Âm thanh chuyên nghiệp", "Đèn sân khấu", "Bar riêng", "Sân khấu"],
      totalRooms: 4,
      availableRooms: 2,
    },
  ];

  return (
    <div className="min-h-screen bg-background pb-6">
      {/* Header */}
      <div className="sticky top-0 z-50 bg-[#0a0a0f]/95 backdrop-blur-md border-b border-[#ffd700]/20">
        <div className="w-full px-4 py-3">
          <div className="flex items-center gap-3">
            <button
              onClick={onBack}
              className="w-9 h-9 rounded-full bg-[#ffd700]/10 flex items-center justify-center hover:bg-[#ffd700]/20 transition-colors"
            >
              <ArrowLeft className="w-5 h-5 text-[#ffd700]" />
            </button>
            <div className="flex-1">
              <h1 className="text-base text-white" style={{ fontWeight: 600 }}>
                Đặt phòng karaoke
              </h1>
              <p className="text-xs text-gray-400">Chọn loại phòng phù hợp</p>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="w-full px-4 mt-4">
        {/* Info Banner */}
        <div className="mb-4 p-3 rounded-2xl bg-gradient-to-r from-[#ffd700]/10 to-[#9333ea]/10 border border-[#ffd700]/20">
          <div className="flex items-start gap-2">
            <span className="text-lg">🎤</span>
            <div className="flex-1">
              <p className="text-sm text-white mb-1" style={{ fontWeight: 600 }}>
                Đặt phòng nhanh chóng
              </p>
              <p className="text-xs text-gray-300 leading-relaxed">
                Chọn loại phòng → Xem danh sách phòng → Chọn khung giờ
              </p>
            </div>
          </div>
        </div>

        {/* Room Categories */}
        <div className="space-y-3">
          {roomCategories.map((category) => {
            const availabilityPercent = Math.round((category.availableRooms / category.totalRooms) * 100);
            const isLowAvailability = availabilityPercent < 40;

            return (
              <Card
                key={category.id}
                className="bg-card border-[#ffd700]/30 overflow-hidden hover:border-[#ffd700] transition-all cursor-pointer group"
                onClick={() => onNavigate("room-selection", { category })}
              >
                <div className="flex gap-3 p-3">
                  {/* Image */}
                  <div className="w-24 h-24 rounded-xl overflow-hidden flex-shrink-0 relative">
                    <ImageWithFallback
                      src={category.image}
                      alt={category.name}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                    
                    {/* Availability Badge */}
                    <div className={`absolute top-2 left-2 px-2 py-0.5 rounded-full text-xs flex items-center gap-1 ${
                      isLowAvailability 
                        ? "bg-red-500/90 text-white" 
                        : "bg-green-500/90 text-white"
                    }`} style={{ fontWeight: 600 }}>
                      <div className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
                      {category.availableRooms}/{category.totalRooms}
                    </div>
                  </div>

                  {/* Info */}
                  <div className="flex-1 min-w-0 flex flex-col justify-between">
                    <div>
                      <div className="flex items-start justify-between gap-2 mb-1">
                        <h3 className="text-white text-sm truncate" style={{ fontWeight: 600 }}>
                          {category.name}
                        </h3>
                        <ChevronRight className="w-4 h-4 text-[#ffd700] flex-shrink-0 group-hover:translate-x-1 transition-transform" />
                      </div>
                      <p className="text-xs text-gray-400 mb-2 line-clamp-1">
                        {category.description}
                      </p>
                      
                      <div className="flex items-center gap-2 mb-2">
                        <Badge className="bg-[#9333ea]/20 text-[#9333ea] text-xs px-2 py-0">
                          <Users className="w-3 h-3 mr-1" />
                          {category.capacity}
                        </Badge>
                      </div>
                    </div>

                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-xs text-gray-400">Giá từ</p>
                        <p className="text-sm text-[#ffd700]" style={{ fontWeight: 700 }}>
                          {category.priceRange.split(" - ")[0]}
                        </p>
                      </div>
                      <Button
                        size="sm"
                        className="bg-[#ffd700] hover:bg-[#ffed4e] text-black rounded-full h-7 px-4 text-xs"
                        style={{ fontWeight: 600 }}
                        onClick={(e) => {
                          e.stopPropagation();
                          onNavigate("room-selection", { category });
                        }}
                      >
                        Xem phòng
                      </Button>
                    </div>
                  </div>
                </div>

                {/* Features */}
                <div className="px-3 pb-3 pt-0">
                  <div className="flex flex-wrap gap-1.5">
                    {category.features.slice(0, 3).map((feature, idx) => (
                      <span
                        key={idx}
                        className="text-xs text-gray-400 bg-[#1a1a24] px-2 py-0.5 rounded-full"
                      >
                        {feature}
                      </span>
                    ))}
                    {category.features.length > 3 && (
                      <span className="text-xs text-[#ffd700] px-2 py-0.5">
                        +{category.features.length - 3}
                      </span>
                    )}
                  </div>
                </div>
              </Card>
            );
          })}
        </div>

        {/* Bottom Info */}
        <div className="mt-6 p-4 rounded-2xl bg-[#1a1a24] border border-[#ffd700]/20">
          <h4 className="text-white text-sm mb-3" style={{ fontWeight: 600 }}>
            💡 Lưu ý khi đặt phòng
          </h4>
          <ul className="space-y-2 text-xs text-gray-400">
            <li className="flex items-start gap-2">
              <span className="text-[#ffd700]">•</span>
              <span>Vui lòng đặt phòng trước ít nhất 30 phút</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-[#ffd700]">•</span>
              <span>Giá phòng có thể thay đổi vào giờ cao điểm (18h-23h)</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-[#ffd700]">•</span>
              <span>Miễn phí hủy đặt phòng trước 2 giờ</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
