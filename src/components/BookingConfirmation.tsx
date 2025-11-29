import { useState } from "react";
import { ArrowLeft, Calendar, Clock, Users, MapPin, Phone, CreditCard, CheckCircle2, AlertCircle } from "lucide-react";
import { Button } from "./ui/button";
import { Card } from "./ui/card";
import { Badge } from "./ui/badge";
import { ScrollArea } from "./ui/scroll-area";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Textarea } from "./ui/textarea";
import { RadioGroup, RadioGroupItem } from "./ui/radio-group";
import { toast } from "sonner@2.0.3";

interface BookingConfirmationProps {
  onNavigate: (screen: string, data?: any) => void;
  onBack: () => void;
  data: any;
}

export function BookingConfirmation({ onNavigate, onBack, data }: BookingConfirmationProps) {
  const { room, category, date, slots, total } = data;
  const [paymentMethod, setPaymentMethod] = useState("cash");
  const [note, setNote] = useState("");
  const [customerInfo, setCustomerInfo] = useState({
    name: "",
    phone: "",
    email: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleConfirmBooking = async () => {
    // Validate
    if (!customerInfo.name || !customerInfo.phone) {
      toast.error("Vui lòng nhập đầy đủ thông tin liên hệ", {
        icon: <AlertCircle className="w-5 h-5" />,
      });
      return;
    }

    setIsSubmitting(true);

    // Simulate API call
    setTimeout(() => {
      toast.success("Đặt phòng thành công!", {
        description: `Mã đặt phòng: #BK${Date.now().toString().slice(-6)}`,
        icon: <CheckCircle2 className="w-5 h-5" />,
        duration: 5000,
      });

      setIsSubmitting(false);
      
      // Navigate to success screen or back to dashboard
      onNavigate("booking-success", {
        bookingCode: `BK${Date.now().toString().slice(-6)}`,
        room,
        date,
        slots,
        total,
        customerInfo,
        paymentMethod,
      });
    }, 2000);
  };

  const branches = [
    { id: 1, name: "Cơ sở Trần Duy Hưng", address: "45 Trần Duy Hưng, Cầu Giấy, Hà Nội" },
    { id: 2, name: "Cơ sở Nguyễn Huệ", address: "23 Nguyễn Huệ, Hoàn Kiếm, Hà Nội" },
    { id: 3, name: "Cơ sở Láng Hạ", address: "89 Láng Hạ, Đống Đa, Hà Nội" },
  ];

  const selectedBranch = branches[0]; // Mock - có thể cho user chọn

  return (
    <div className="min-h-screen bg-background pb-24">
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
                Xác nhận đặt phòng
              </h1>
              <p className="text-xs text-gray-400">Kiểm tra thông tin</p>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <ScrollArea className="h-[calc(100vh-180px)]">
        <div className="w-full px-4 mt-4 space-y-4">
          {/* Booking Summary */}
          <Card className="bg-gradient-to-r from-[#ffd700]/10 to-[#9333ea]/10 border-[#ffd700]/30 p-4">
            <div className="flex items-start gap-3 mb-3">
              <div className="w-12 h-12 rounded-xl bg-[#ffd700]/20 flex items-center justify-center flex-shrink-0">
                <CheckCircle2 className="w-6 h-6 text-[#ffd700]" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-xs text-gray-400 mb-1">Thông tin phòng</p>
                <h3 className="text-white text-sm mb-1 truncate" style={{ fontWeight: 600 }}>
                  {room.name} • {category.name}
                </h3>
                <Badge className="bg-[#9333ea]/20 text-[#9333ea] text-xs">
                  <Users className="w-3 h-3 mr-1" />
                  {room.capacity}
                </Badge>
              </div>
            </div>

            <div className="space-y-2 text-sm">
              <div className="flex items-center gap-2 text-gray-300">
                <Calendar className="w-4 h-4 text-[#ffd700]" />
                <span>{date.toLocaleDateString("vi-VN", { weekday: "long", year: "numeric", month: "long", day: "numeric" })}</span>
              </div>
              <div className="flex items-start gap-2 text-gray-300">
                <Clock className="w-4 h-4 text-[#ffd700] mt-0.5" />
                <div className="flex-1">
                  <p className="mb-1">{slots.length} khung giờ:</p>
                  <div className="flex flex-wrap gap-1">
                    {slots.map((slot: string) => (
                      <span
                        key={slot}
                        className="text-xs bg-[#ffd700]/20 text-[#ffd700] px-2 py-0.5 rounded"
                      >
                        {slot}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-2 text-gray-300">
                <MapPin className="w-4 h-4 text-[#ffd700]" />
                <span className="text-xs">{selectedBranch.name}</span>
              </div>
            </div>
          </Card>

          {/* Customer Information */}
          <Card className="bg-card border-[#ffd700]/30 p-4">
            <h3 className="text-white text-sm mb-3" style={{ fontWeight: 600 }}>
              👤 Thông tin khách hàng
            </h3>
            <div className="space-y-3">
              <div>
                <Label htmlFor="name" className="text-xs text-gray-400 mb-1.5 block">
                  Họ và tên <span className="text-red-400">*</span>
                </Label>
                <Input
                  id="name"
                  placeholder="Nhập họ và tên"
                  value={customerInfo.name}
                  onChange={(e) =>
                    setCustomerInfo({ ...customerInfo, name: e.target.value })
                  }
                  className="bg-[#1a1a24] border-gray-700 text-white h-10 text-sm"
                />
              </div>
              <div>
                <Label htmlFor="phone" className="text-xs text-gray-400 mb-1.5 block">
                  Số điện thoại <span className="text-red-400">*</span>
                </Label>
                <Input
                  id="phone"
                  type="tel"
                  placeholder="Nhập số điện thoại"
                  value={customerInfo.phone}
                  onChange={(e) =>
                    setCustomerInfo({ ...customerInfo, phone: e.target.value })
                  }
                  className="bg-[#1a1a24] border-gray-700 text-white h-10 text-sm"
                />
              </div>
              <div>
                <Label htmlFor="email" className="text-xs text-gray-400 mb-1.5 block">
                  Email (tùy chọn)
                </Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="Nhập email"
                  value={customerInfo.email}
                  onChange={(e) =>
                    setCustomerInfo({ ...customerInfo, email: e.target.value })
                  }
                  className="bg-[#1a1a24] border-gray-700 text-white h-10 text-sm"
                />
              </div>
            </div>
          </Card>

          {/* Payment Method */}
          <Card className="bg-card border-[#ffd700]/30 p-4">
            <h3 className="text-white text-sm mb-3" style={{ fontWeight: 600 }}>
              💳 Phương thức thanh toán
            </h3>
            <RadioGroup value={paymentMethod} onValueChange={setPaymentMethod}>
              <div className="space-y-2">
                <div className="flex items-center gap-3 p-3 rounded-lg border-2 border-gray-700 hover:border-[#ffd700] transition-colors cursor-pointer">
                  <RadioGroupItem value="cash" id="cash" className="border-[#ffd700]" />
                  <Label htmlFor="cash" className="flex-1 cursor-pointer text-sm text-white">
                    <div className="flex items-center gap-2">
                      <span>💵</span>
                      <div>
                        <p style={{ fontWeight: 600 }}>Tiền mặt</p>
                        <p className="text-xs text-gray-400">Thanh toán tại quầy</p>
                      </div>
                    </div>
                  </Label>
                </div>
                <div className="flex items-center gap-3 p-3 rounded-lg border-2 border-gray-700 hover:border-[#ffd700] transition-colors cursor-pointer">
                  <RadioGroupItem value="card" id="card" className="border-[#ffd700]" />
                  <Label htmlFor="card" className="flex-1 cursor-pointer text-sm text-white">
                    <div className="flex items-center gap-2">
                      <CreditCard className="w-5 h-5" />
                      <div>
                        <p style={{ fontWeight: 600 }}>Thẻ tín dụng/ATM</p>
                        <p className="text-xs text-gray-400">Thanh toán qua thẻ</p>
                      </div>
                    </div>
                  </Label>
                </div>
                <div className="flex items-center gap-3 p-3 rounded-lg border-2 border-gray-700 hover:border-[#ffd700] transition-colors cursor-pointer">
                  <RadioGroupItem value="transfer" id="transfer" className="border-[#ffd700]" />
                  <Label htmlFor="transfer" className="flex-1 cursor-pointer text-sm text-white">
                    <div className="flex items-center gap-2">
                      <Phone className="w-5 h-5" />
                      <div>
                        <p style={{ fontWeight: 600 }}>Chuyển khoản</p>
                        <p className="text-xs text-gray-400">MoMo, ZaloPay, Banking</p>
                      </div>
                    </div>
                  </Label>
                </div>
              </div>
            </RadioGroup>
          </Card>

          {/* Note */}
          <Card className="bg-card border-[#ffd700]/30 p-4">
            <h3 className="text-white text-sm mb-3" style={{ fontWeight: 600 }}>
              📝 Ghi chú (tùy chọn)
            </h3>
            <Textarea
              placeholder="Thêm yêu cầu đặc biệt của bạn..."
              value={note}
              onChange={(e) => setNote(e.target.value)}
              className="bg-[#1a1a24] border-gray-700 text-white min-h-20 text-sm resize-none"
            />
          </Card>

          {/* Terms */}
          <Card className="bg-[#9333ea]/10 border-[#9333ea]/30 p-4">
            <h4 className="text-[#9333ea] text-sm mb-2" style={{ fontWeight: 600 }}>
              📋 Điều khoản đặt phòng
            </h4>
            <ul className="space-y-1.5 text-xs text-gray-400">
              <li className="flex items-start gap-2">
                <span className="text-[#9333ea]">•</span>
                <span>Vui lòng đến trước 15 phút để check-in</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-[#9333ea]">•</span>
                <span>Miễn phí hủy đặt phòng trước 2 giờ</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-[#9333ea]">•</span>
                <span>Giữ phòng trong vòng 15 phút sau giờ đặt</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-[#9333ea]">•</span>
                <span>Phụ thu 30% vào giờ cao điểm cuối tuần</span>
              </li>
            </ul>
          </Card>
        </div>
      </ScrollArea>

      {/* Bottom Total & Confirm */}
      <div className="fixed bottom-0 left-0 right-0 bg-[#0a0a0f]/95 backdrop-blur-md border-t border-[#ffd700]/20">
        <div className="max-w-md mx-auto p-4">
          <div className="flex items-center justify-between mb-3">
            <div>
              <p className="text-xs text-gray-400 mb-0.5">Tổng thanh toán</p>
              <p className="text-xl text-[#ffd700]" style={{ fontWeight: 700 }}>
                {total.toLocaleString("vi-VN")}đ
              </p>
            </div>
            <div className="text-right text-xs text-gray-400">
              <p>{slots.length} giờ × {room.price.toLocaleString("vi-VN")}đ</p>
            </div>
          </div>

          <Button
            className="w-full h-12 rounded-full bg-gradient-to-r from-[#ffd700] to-[#ffed4e] hover:opacity-90 text-black text-sm disabled:opacity-50"
            style={{ fontWeight: 600 }}
            onClick={handleConfirmBooking}
            disabled={isSubmitting || !customerInfo.name || !customerInfo.phone}
          >
            {isSubmitting ? (
              <span className="flex items-center gap-2">
                <div className="w-4 h-4 border-2 border-black border-t-transparent rounded-full animate-spin" />
                Đang xử lý...
              </span>
            ) : (
              "Xác nhận đặt phòng"
            )}
          </Button>
        </div>
      </div>
    </div>
  );
}
