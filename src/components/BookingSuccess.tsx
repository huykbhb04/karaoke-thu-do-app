import { CheckCircle2, Calendar, Clock, MapPin, Phone, Share2, Download } from "lucide-react";
import { Button } from "./ui/button";
import { Card } from "./ui/card";
import { Badge } from "./ui/badge";

interface BookingSuccessProps {
  onNavigate: (screen: string, data?: any) => void;
  data: any;
  userRole?: string | null;
}

export function BookingSuccess({ onNavigate, data, userRole }: BookingSuccessProps) {
  const { bookingCode, room, date, slots, total, customerInfo } = data;

  return (
    <div className="min-h-screen bg-background flex flex-col items-center justify-center p-4">
      <div className="w-full max-w-md space-y-4">
        {/* Success Animation */}
        <div className="text-center mb-6">
          <div className="w-20 h-20 rounded-full bg-gradient-to-r from-[#ffd700] to-[#ffed4e] flex items-center justify-center mx-auto mb-4 animate-pulse">
            <CheckCircle2 className="w-12 h-12 text-black" />
          </div>
          <h1 className="text-xl text-white mb-2" style={{ fontWeight: 700 }}>
            Đặt phòng thành công!
          </h1>
          <p className="text-sm text-gray-400">
            Cảm ơn bạn đã tin tưởng Karaoke Thủ Đô
          </p>
        </div>

        {/* Booking Code */}
        <Card className="bg-gradient-to-r from-[#ffd700]/10 to-[#9333ea]/10 border-[#ffd700]/30 p-6 text-center">
          <p className="text-xs text-gray-400 mb-2">Mã đặt phòng</p>
          <div className="flex items-center justify-center gap-2">
            <p className="text-2xl text-[#ffd700] tracking-wider" style={{ fontWeight: 700 }}>
              #{bookingCode}
            </p>
            <Button
              size="sm"
              variant="ghost"
              className="text-[#ffd700] hover:text-[#ffed4e] h-auto p-1"
              onClick={() => {
                navigator.clipboard.writeText(bookingCode);
              }}
            >
              📋
            </Button>
          </div>
          <p className="text-xs text-gray-400 mt-2">
            Vui lòng lưu mã này để check-in
          </p>
        </Card>

        {/* Booking Details */}
        <Card className="bg-card border-[#ffd700]/30 p-4">
          <h3 className="text-white text-sm mb-3" style={{ fontWeight: 600 }}>
            Chi tiết đặt phòng
          </h3>
          
          <div className="space-y-3 text-sm">
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 rounded-lg bg-[#ffd700]/20 flex items-center justify-center flex-shrink-0">
                🎤
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-xs text-gray-400">Phòng</p>
                <p className="text-white truncate" style={{ fontWeight: 600 }}>
                  {room.name}
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="w-8 h-8 rounded-lg bg-[#ffd700]/20 flex items-center justify-center flex-shrink-0">
                <Calendar className="w-4 h-4 text-[#ffd700]" />
              </div>
              <div className="flex-1">
                <p className="text-xs text-gray-400">Ngày</p>
                <p className="text-white" style={{ fontWeight: 600 }}>
                  {date.toLocaleDateString("vi-VN", { 
                    weekday: "long",
                    year: "numeric",
                    month: "long",
                    day: "numeric"
                  })}
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="w-8 h-8 rounded-lg bg-[#ffd700]/20 flex items-center justify-center flex-shrink-0">
                <Clock className="w-4 h-4 text-[#ffd700]" />
              </div>
              <div className="flex-1">
                <p className="text-xs text-gray-400">Khung giờ ({slots.length} giờ)</p>
                <div className="flex flex-wrap gap-1 mt-1">
                  {slots.map((slot: string) => (
                    <Badge
                      key={slot}
                      className="bg-[#ffd700]/20 text-[#ffd700] text-xs"
                    >
                      {slot}
                    </Badge>
                  ))}
                </div>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="w-8 h-8 rounded-lg bg-[#ffd700]/20 flex items-center justify-center flex-shrink-0">
                <Phone className="w-4 h-4 text-[#ffd700]" />
              </div>
              <div className="flex-1">
                <p className="text-xs text-gray-400">Thông tin liên hệ</p>
                <p className="text-white" style={{ fontWeight: 600 }}>
                  {customerInfo.name}
                </p>
                <p className="text-sm text-gray-400">{customerInfo.phone}</p>
              </div>
            </div>

            <div className="pt-3 border-t border-[#ffd700]/20 flex items-center justify-between">
              <p className="text-gray-400">Tổng tiền</p>
              <p className="text-lg text-[#ffd700]" style={{ fontWeight: 700 }}>
                {total.toLocaleString("vi-VN")}đ
              </p>
            </div>
          </div>
        </Card>

        {/* Next Steps */}
        <Card className="bg-[#9333ea]/10 border-[#9333ea]/30 p-4">
          <h4 className="text-[#9333ea] text-sm mb-2" style={{ fontWeight: 600 }}>
            📍 Bước tiếp theo
          </h4>
          <ul className="space-y-2 text-xs text-gray-400">
            <li className="flex items-start gap-2">
              <span className="text-[#9333ea]">1.</span>
              <span>Đến quầy lễ tân trước {slots[0]} (giờ đầu tiên)</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-[#9333ea]">2.</span>
              <span>Xuất trình mã đặt phòng #{bookingCode}</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-[#9333ea]">3.</span>
              <span>Thanh toán và nhận chìa khóa phòng</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-[#9333ea]">4.</span>
              <span>Tận hưởng trải nghiệm karaoke tuyệt vời! 🎉</span>
            </li>
          </ul>
        </Card>

        {/* Contact */}
        <div className="text-center text-xs text-gray-400 space-y-1">
          <p>Hotline hỗ trợ: <span className="text-[#ffd700]">1900-xxxx</span></p>
          <p>Mở cửa: 10:00 - 02:00 hàng ngày</p>
        </div>

        {/* Actions */}
        <div className="space-y-2">
          <Button
            className="w-full h-12 rounded-full bg-gradient-to-r from-[#ffd700] to-[#ffed4e] hover:opacity-90 text-black text-sm"
            style={{ fontWeight: 600 }}
            onClick={() => {
              if (userRole) {
                onNavigate(`${userRole}-dashboard`);
              } else {
                onNavigate("home");
              }
            }}
          >
            Về trang chủ
          </Button>

          <div className="grid grid-cols-2 gap-2">
            <Button
              variant="outline"
              className="h-10 rounded-full border-[#ffd700] text-[#ffd700] hover:bg-[#ffd700]/10 text-sm"
              onClick={() => {
                // Share functionality
                if (navigator.share) {
                  navigator.share({
                    title: "Đặt phòng Karaoke Thủ Đô",
                    text: `Mã đặt phòng: ${bookingCode}`,
                  });
                }
              }}
            >
              <Share2 className="w-4 h-4 mr-2" />
              Chia sẻ
            </Button>
            <Button
              variant="outline"
              className="h-10 rounded-full border-[#ffd700] text-[#ffd700] hover:bg-[#ffd700]/10 text-sm"
              onClick={() => {
                // Download/Screenshot functionality
                window.print();
              }}
            >
              <Download className="w-4 h-4 mr-2" />
              Lưu
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
