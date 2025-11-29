import { ArrowLeft, MapPin, Phone, Clock, Star, Users } from 'lucide-react';
import { Button } from './ui/button';
import { Card } from './ui/card';
import { Badge } from './ui/badge';
import { ImageWithFallback } from './figma/ImageWithFallback';

interface DetailScreenProps {
  type: 'branch' | 'room' | 'service';
  data: any;
  onBack: () => void;
  onAction?: (action: string) => void;
}

export function BranchDetail({ data, onBack }: { data: any; onBack: () => void }) {
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="bg-gradient-to-br from-[#9333ea] to-[#6b21a8] p-6 rounded-b-[30px]">
        <div className="flex items-center gap-4 mb-6">
          <Button
            variant="ghost"
            size="icon"
            onClick={onBack}
            className="text-white hover:bg-white/10"
          >
            <ArrowLeft className="w-6 h-6" />
          </Button>
          <h1 className="text-2xl text-white" style={{ fontWeight: 700 }}>Chi tiết cơ sở</h1>
        </div>
      </div>

      <div className="px-6 py-6">
        <Card className="bg-card border-[#ffd700]/20 p-6">
          <div className="flex items-center gap-2 mb-4">
            <MapPin className="w-5 h-5 text-[#ffd700]" />
            <h2 className="text-[#ffd700]" style={{ fontWeight: 600 }}>{data.city}</h2>
          </div>
          
          <h3 className="text-white text-xl mb-3" style={{ fontWeight: 600 }}>{data.name}</h3>
          
          <div className="space-y-3 mb-6">
            <div className="flex items-start gap-3">
              <MapPin className="w-5 h-5 text-gray-400 mt-0.5" />
              <p className="text-gray-300">{data.address}</p>
            </div>
            
            <div className="flex items-center gap-3">
              <Phone className="w-5 h-5 text-gray-400" />
              <p className="text-gray-300">Hotline: 1900-xxxx</p>
            </div>
            
            <div className="flex items-center gap-3">
              <Clock className="w-5 h-5 text-gray-400" />
              <p className="text-gray-300">Mở cửa: 10:00 - 02:00</p>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3 mb-6">
            <div className="bg-[#ffd700]/10 rounded-[20px] p-4 text-center">
              <p className="text-gray-400 text-sm mb-1">Số phòng</p>
              <p className="text-white text-2xl" style={{ fontWeight: 700 }}>12</p>
            </div>
            <div className="bg-[#9333ea]/10 rounded-[20px] p-4 text-center">
              <p className="text-gray-400 text-sm mb-1">Đánh giá</p>
              <p className="text-white text-2xl flex items-center justify-center gap-1" style={{ fontWeight: 700 }}>
                <Star className="w-5 h-5 text-[#ffd700]" fill="currentColor" />
                4.8
              </p>
            </div>
          </div>

          <Button
            className="w-full h-12 rounded-[20px] bg-[#ffd700] hover:bg-[#ffed4e] text-black"
            style={{ fontWeight: 600 }}
          >
            📍 Xem bản đồ
          </Button>
        </Card>
      </div>
    </div>
  );
}

export function RoomDetail({ data, onBack, onAction }: { data: any; onBack: () => void; onAction?: (action: string) => void }) {
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="relative h-64">
        <ImageWithFallback
          src={data.image}
          alt={data.name}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
        
        <Button
          variant="ghost"
          size="icon"
          onClick={onBack}
          className="absolute top-4 left-4 text-white bg-black/30 hover:bg-black/50 backdrop-blur-sm"
        >
          <ArrowLeft className="w-6 h-6" />
        </Button>

        <div className="absolute bottom-6 left-6 right-6">
          <h1 className="text-2xl text-white mb-2" style={{ fontWeight: 700 }}>{data.name}</h1>
          {data.branch && (
            <p className="text-gray-300 flex items-center gap-1">
              <MapPin className="w-4 h-4" />
              {data.branch}
            </p>
          )}
        </div>
      </div>

      <div className="px-6 py-6">
        <Card className="bg-card border-[#ffd700]/20 p-6 mb-6">
          <div className="grid grid-cols-2 gap-4 mb-6">
            <div>
              <p className="text-gray-400 text-sm mb-1">Sức chứa</p>
              <p className="text-white flex items-center gap-2" style={{ fontWeight: 600 }}>
                <Users className="w-5 h-5 text-[#ffd700]" />
                {data.capacity}
              </p>
            </div>
            <div>
              <p className="text-gray-400 text-sm mb-1">Giá thuê</p>
              <p className="text-[#9333ea]" style={{ fontWeight: 700 }}>{data.price}</p>
            </div>
          </div>

          {data.rating && (
            <div className="flex items-center gap-2 mb-6">
              <Star className="w-5 h-5 text-[#ffd700]" fill="currentColor" />
              <span className="text-white" style={{ fontWeight: 600 }}>{data.rating}</span>
              <span className="text-gray-400 text-sm">(125 đánh giá)</span>
            </div>
          )}

          <div className="border-t border-gray-700 pt-4">
            <h3 className="text-white mb-3" style={{ fontWeight: 600 }}>Tiện nghi phòng</h3>
            <div className="grid grid-cols-2 gap-2">
              <Badge className="bg-[#9333ea]/20 text-[#9333ea] justify-center">🎤 Micro cao cấp</Badge>
              <Badge className="bg-[#9333ea]/20 text-[#9333ea] justify-center">🔊 Loa 5.1</Badge>
              <Badge className="bg-[#9333ea]/20 text-[#9333ea] justify-center">💡 Ánh sáng LED</Badge>
              <Badge className="bg-[#9333ea]/20 text-[#9333ea] justify-center">📺 Màn hình 65"</Badge>
            </div>
          </div>
        </Card>

        <Button
          onClick={() => onAction?.('book')}
          className="w-full h-14 rounded-[20px] bg-[#ffd700] hover:bg-[#ffed4e] text-black animate-pulse-glow"
          style={{ fontWeight: 600 }}
        >
          🎤 Đặt phòng ngay
        </Button>
      </div>
    </div>
  );
}

export function ServiceDetail({ data, onBack }: { data: any; onBack: () => void }) {
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="bg-gradient-to-br from-[#9333ea] to-[#6b21a8] p-6 rounded-b-[30px]">
        <div className="flex items-center gap-4 mb-6">
          <Button
            variant="ghost"
            size="icon"
            onClick={onBack}
            className="text-white hover:bg-white/10"
          >
            <ArrowLeft className="w-6 h-6" />
          </Button>
          <h1 className="text-2xl text-white" style={{ fontWeight: 700 }}>Chi tiết dịch vụ</h1>
        </div>
      </div>

      <div className="px-6 py-6">
        <Card className="bg-card border-[#9333ea]/20 p-6">
          <div className="text-6xl mb-4 text-center">{data.icon}</div>
          
          <h2 className="text-white text-xl mb-2 text-center" style={{ fontWeight: 700 }}>
            {data.name}
          </h2>
          
          <p className="text-[#9333ea] text-2xl mb-6 text-center" style={{ fontWeight: 700 }}>
            {data.price}
          </p>

          <div className="border-t border-gray-700 pt-4 mb-6">
            <h3 className="text-white mb-3" style={{ fontWeight: 600 }}>Mô tả dịch vụ</h3>
            <p className="text-gray-300 leading-relaxed">
              {data.name === 'Đồ uống' && 'Đa dạng các loại nước uống từ nước ngọt, bia, rượu đến cocktail cao cấp. Menu đồ uống phong phú phù hợp với mọi khẩu vị.'}
              {data.name === 'Snack' && 'Các loại snack, trái cây tươi, và đồ ăn nhẹ chất lượng cao. Được chuẩn bị và phục vụ ngay tại phòng.'}
              {data.name === 'Trang trí sinh nhật' && 'Gói trang trí sinh nhật hoàn chỉnh bao gồm: bong bóng, banner, đèn trang trí, và setup phòng theo chủ đề. Miễn phí bánh sinh nhật.'}
              {data.name === 'Phòng VIP' && 'Không gian VIP sang trọng với hệ thống âm thanh, ánh sáng cao cấp. Phù hợp cho các buổi tiệc lớn và sự kiện đặc biệt.'}
              {!['Đồ uống', 'Snack', 'Trang trí sinh nhật', 'Phòng VIP'].includes(data.name) && 'Dịch vụ chất lượng cao mang đến trải nghiệm tuyệt vời cho khách hàng.'}
            </p>
          </div>

          <Button
            className="w-full h-12 rounded-[20px] bg-[#ffd700] hover:bg-[#ffed4e] text-black"
            style={{ fontWeight: 600 }}
          >
            ➕ Thêm vào đơn hàng
          </Button>
        </Card>
      </div>
    </div>
  );
}
