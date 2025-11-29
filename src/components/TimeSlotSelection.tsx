import { useState } from "react";
import { ArrowLeft, Calendar, Clock, Users, CheckCircle2, XCircle } from "lucide-react";
import { Button } from "./ui/button";
import { Card } from "./ui/card";
import { Badge } from "./ui/badge";
import { ScrollArea } from "./ui/scroll-area";
import { Calendar as CalendarComponent } from "./ui/calendar";

interface TimeSlotSelectionProps {
  onNavigate: (screen: string, data?: any) => void;
  onBack: () => void;
  data: any;
}

export function TimeSlotSelection({ onNavigate, onBack, data }: TimeSlotSelectionProps) {
  const { room, category } = data;
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [selectedSlots, setSelectedSlots] = useState<string[]>([]);

  // Generate time slots from 10:00 to 02:00 (next day)
  const generateTimeSlots = () => {
    const slots = [];
    for (let hour = 10; hour < 24; hour++) {
      slots.push(`${hour.toString().padStart(2, "0")}:00`);
    }
    slots.push("00:00", "01:00", "02:00");
    return slots;
  };

  const timeSlots = generateTimeSlots();

  // Mock occupied slots - trong thực tế lấy từ API
  const occupiedSlots = room.currentBooking?.timeSlots || [];

  const isSlotOccupied = (slot: string) => {
    return occupiedSlots.includes(slot);
  };

  const isSlotSelected = (slot: string) => {
    return selectedSlots.includes(slot);
  };

  const toggleSlot = (slot: string) => {
    if (isSlotOccupied(slot)) return;

    setSelectedSlots((prev) => {
      if (prev.includes(slot)) {
        return prev.filter((s) => s !== slot);
      } else {
        return [...prev, slot].sort();
      }
    });
  };

  const calculateTotal = () => {
    return selectedSlots.length * room.price;
  };

  const getTimeRangeDisplay = () => {
    if (selectedSlots.length === 0) return "";
    const sorted = [...selectedSlots].sort();
    return `${sorted[0]} - ${sorted[sorted.length - 1]}`;
  };

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
            <div className="flex-1 min-w-0">
              <h1 className="text-base text-white truncate" style={{ fontWeight: 600 }}>
                {room.name}
              </h1>
              <p className="text-xs text-gray-400">Chọn khung giờ</p>
            </div>
            <Badge className="bg-[#9333ea]/20 text-[#9333ea] text-xs flex-shrink-0">
              <Users className="w-3 h-3 mr-1" />
              {room.capacity}
            </Badge>
          </div>
        </div>
      </div>

      {/* Content */}
      <ScrollArea className="h-[calc(100vh-180px)]">
        <div className="w-full px-4 mt-4">
          {/* Selected Info Card */}
          <Card className="bg-gradient-to-r from-[#ffd700]/10 to-[#9333ea]/10 border-[#ffd700]/30 p-4 mb-4">
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 rounded-full bg-[#ffd700]/20 flex items-center justify-center flex-shrink-0">
                <Calendar className="w-5 h-5 text-[#ffd700]" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-xs text-gray-400 mb-1">Thông tin đặt phòng</p>
                <p className="text-sm text-white mb-1" style={{ fontWeight: 600 }}>
                  {room.name} • {category.name}
                </p>
                <div className="flex items-center gap-2 text-xs text-gray-300">
                  <span>{selectedDate.toLocaleDateString("vi-VN")}</span>
                  {selectedSlots.length > 0 && (
                    <>
                      <span>•</span>
                      <span className="text-[#ffd700]">{selectedSlots.length} giờ</span>
                    </>
                  )}
                </div>
              </div>
            </div>
          </Card>

          {/* Calendar */}
          <Card className="bg-card border-[#ffd700]/30 p-4 mb-4">
            <h3 className="text-white text-sm mb-3" style={{ fontWeight: 600 }}>
              📅 Chọn ngày
            </h3>
            <CalendarComponent
              mode="single"
              selected={selectedDate}
              onSelect={(date) => date && setSelectedDate(date)}
              disabled={(date) => date < new Date(new Date().setHours(0, 0, 0, 0))}
              className="rounded-lg border-0 mx-auto"
            />
          </Card>

          {/* Time Slots */}
          <Card className="bg-card border-[#ffd700]/30 p-4">
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-white text-sm" style={{ fontWeight: 600 }}>
                ⏰ Chọn khung giờ
              </h3>
              {selectedSlots.length > 0 && (
                <Button
                  size="sm"
                  variant="ghost"
                  className="text-xs text-red-400 hover:text-red-300 h-auto p-0"
                  onClick={() => setSelectedSlots([])}
                >
                  Xóa hết
                </Button>
              )}
            </div>

            {/* Legend */}
            <div className="mb-3 p-2 rounded-lg bg-[#1a1a24]">
              <div className="flex flex-wrap gap-3 text-xs">
                <div className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#ffd700]" />
                  <span className="text-gray-400">Đã chọn</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <XCircle className="w-3.5 h-3.5 text-red-400" />
                  <span className="text-gray-400">Đã được đặt</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <div className="w-3.5 h-3.5 rounded border-2 border-gray-600" />
                  <span className="text-gray-400">Còn trống</span>
                </div>
              </div>
            </div>

            {/* Time Slots Grid */}
            <div className="grid grid-cols-3 gap-2">
              {timeSlots.map((slot) => {
                const isOccupied = isSlotOccupied(slot);
                const isSelected = isSlotSelected(slot);

                return (
                  <button
                    key={slot}
                    onClick={() => toggleSlot(slot)}
                    disabled={isOccupied}
                    className={`
                      relative p-3 rounded-xl border-2 transition-all text-sm
                      ${
                        isSelected
                          ? "bg-[#ffd700] border-[#ffd700] text-black"
                          : isOccupied
                          ? "bg-red-500/10 border-red-500/30 text-red-400 opacity-50 cursor-not-allowed"
                          : "bg-[#1a1a24] border-gray-700 text-gray-300 hover:border-[#ffd700] hover:bg-[#ffd700]/5"
                      }
                    `}
                    style={{ fontWeight: isSelected ? 600 : 400 }}
                  >
                    <Clock className="w-3.5 h-3.5 mx-auto mb-1" />
                    <div>{slot}</div>
                    {isSelected && (
                      <CheckCircle2 className="absolute top-1 right-1 w-3.5 h-3.5" />
                    )}
                    {isOccupied && (
                      <XCircle className="absolute top-1 right-1 w-3.5 h-3.5" />
                    )}
                  </button>
                );
              })}
            </div>

            {/* Info Note */}
            <div className="mt-4 p-3 rounded-lg bg-[#9333ea]/10 border border-[#9333ea]/20">
              <p className="text-xs text-[#9333ea] mb-1" style={{ fontWeight: 600 }}>
                💡 Lưu ý:
              </p>
              <ul className="text-xs text-gray-400 space-y-1">
                <li>• Tối thiểu đặt 1 giờ</li>
                <li>• Giá: {room.price.toLocaleString("vi-VN")}đ/giờ</li>
                <li>• Có thể chọn nhiều khung giờ liên tục</li>
              </ul>
            </div>
          </Card>
        </div>
      </ScrollArea>

      {/* Bottom Summary & Action */}
      <div className="fixed bottom-0 left-0 right-0 bg-[#0a0a0f]/95 backdrop-blur-md border-t border-[#ffd700]/20">
        <div className="max-w-md mx-auto p-4">
          {selectedSlots.length > 0 ? (
            <div className="space-y-3">
              {/* Summary */}
              <div className="flex items-center justify-between text-sm">
                <div className="text-gray-400">
                  <div className="flex items-center gap-2 mb-1">
                    <Clock className="w-4 h-4" />
                    <span>{selectedSlots.length} giờ</span>
                    {getTimeRangeDisplay() && (
                      <span className="text-xs">({getTimeRangeDisplay()})</span>
                    )}
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-xs text-gray-400 mb-0.5">Tổng tiền</p>
                  <p className="text-lg text-[#ffd700]" style={{ fontWeight: 700 }}>
                    {calculateTotal().toLocaleString("vi-VN")}đ
                  </p>
                </div>
              </div>

              {/* Confirm Button */}
              <Button
                className="w-full h-12 rounded-full bg-gradient-to-r from-[#ffd700] to-[#ffed4e] hover:opacity-90 text-black text-sm"
                style={{ fontWeight: 600 }}
                onClick={() =>
                  onNavigate("booking-confirmation", {
                    room,
                    category,
                    date: selectedDate,
                    slots: selectedSlots,
                    total: calculateTotal(),
                  })
                }
              >
                Xác nhận đặt phòng
              </Button>
            </div>
          ) : (
            <div className="text-center py-3">
              <p className="text-sm text-gray-400">Vui lòng chọn ít nhất 1 khung giờ</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
