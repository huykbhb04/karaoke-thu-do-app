import { useState } from "react";
import { ArrowLeft, Users, Wifi, Wind, Tv, Music2, CheckCircle2 } from "lucide-react";
import { Button } from "./ui/button";
import { Card } from "./ui/card";
import { Badge } from "./ui/badge";
import { ScrollArea } from "./ui/scroll-area";

interface RoomSelectionProps {
  onNavigate: (screen: string, data?: any) => void;
  onBack: () => void;
  data: any;
}

export function RoomSelection({ onNavigate, onBack, data }: RoomSelectionProps) {
  const { category } = data;
  const [selectedRoom, setSelectedRoom] = useState<any>(null);

  // Mock data - trong thực tế sẽ lấy từ API
  const rooms = [
    {
      id: "VIP-01",
      name: `${category.name} 01`,
      floor: 1,
      capacity: category.capacity,
      status: "available", // available, occupied, maintenance
      price: 450000,
      amenities: ["Dàn âm thanh 5.1", "Đèn LED RGB", "Mini Bar", "Sofa cao cấp", "TV 65 inch", "Wifi 5G"],
      currentBooking: null,
      nextAvailable: null,
    },
    {
      id: "VIP-02",
      name: `${category.name} 02`,
      floor: 1,
      capacity: category.capacity,
      status: "occupied",
      price: 450000,
      amenities: ["Dàn âm thanh 5.1", "Đèn LED RGB", "Mini Bar", "Sofa cao cấp", "TV 65 inch", "Wifi 5G"],
      currentBooking: {
        timeSlots: ["14:00", "15:00", "16:00"],
        endTime: "17:00",
      },
      nextAvailable: "17:00",
    },
    {
      id: "VIP-03",
      name: `${category.name} 03`,
      floor: 2,
      capacity: category.capacity,
      status: "available",
      price: 450000,
      amenities: ["Dàn âm thanh 5.1", "Đèn LED RGB", "Mini Bar", "Sofa cao cấp", "TV 65 inch", "Wifi 5G"],
      currentBooking: null,
      nextAvailable: null,
    },
    {
      id: "VIP-04",
      name: `${category.name} 04`,
      floor: 2,
      capacity: category.capacity,
      status: "occupied",
      price: 450000,
      amenities: ["Dàn âm thanh 5.1", "Đèn LED RGB", "Mini Bar", "Sofa cao cấp", "TV 65 inch", "Wifi 5G"],
      currentBooking: {
        timeSlots: ["15:00", "16:00"],
        endTime: "17:00",
      },
      nextAvailable: "17:00",
    },
    {
      id: "VIP-05",
      name: `${category.name} 05`,
      floor: 3,
      capacity: category.capacity,
      status: "available",
      price: 450000,
      amenities: ["Dàn âm thanh 5.1", "Đèn LED RGB", "Mini Bar", "Sofa cao cấp", "TV 65 inch", "Wifi 5G"],
      currentBooking: null,
      nextAvailable: null,
    },
    {
      id: "VIP-06",
      name: `${category.name} 06`,
      floor: 3,
      capacity: category.capacity,
      status: "maintenance",
      price: 450000,
      amenities: ["Dàn âm thanh 5.1", "Đèn LED RGB", "Mini Bar", "Sofa cao cấp", "TV 65 inch", "Wifi 5G"],
      currentBooking: null,
      nextAvailable: null,
    },
  ];

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "available":
        return (
          <Badge className="bg-green-500/20 text-green-400 border-green-500/30 text-xs">
            <div className="w-1.5 h-1.5 rounded-full bg-green-400 mr-1 animate-pulse" />
            Trống
          </Badge>
        );
      case "occupied":
        return (
          <Badge className="bg-red-500/20 text-red-400 border-red-500/30 text-xs">
            <div className="w-1.5 h-1.5 rounded-full bg-red-400 mr-1" />
            Đang sử dụng
          </Badge>
        );
      case "maintenance":
        return (
          <Badge className="bg-yellow-500/20 text-yellow-400 border-yellow-500/30 text-xs">
            Bảo trì
          </Badge>
        );
      default:
        return null;
    }
  };

  const amenityIcons: any = {
    "Dàn âm thanh 5.1": Music2,
    "Đèn LED RGB": Music2,
    "Mini Bar": Music2,
    "Sofa cao cấp": Music2,
    "TV 65 inch": Tv,
    "Wifi 5G": Wifi,
    "Điều hòa 2 chiều": Wind,
  };

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
                {category.name}
              </h1>
              <p className="text-xs text-gray-400">Chọn phòng để đặt</p>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <ScrollArea className="h-[calc(100vh-120px)]">
        <div className="w-full px-4 mt-4">
          {/* Quick Filter */}
          <div className="mb-4 flex gap-2 overflow-x-auto no-scrollbar">
            <Button
              size="sm"
              variant="outline"
              className="border-[#ffd700] text-[#ffd700] rounded-full text-xs flex-shrink-0"
            >
              Tất cả ({rooms.length})
            </Button>
            <Button
              size="sm"
              variant="outline"
              className="border-gray-600 text-gray-400 rounded-full text-xs flex-shrink-0"
            >
              Trống ({rooms.filter((r) => r.status === "available").length})
            </Button>
            <Button
              size="sm"
              variant="outline"
              className="border-gray-600 text-gray-400 rounded-full text-xs flex-shrink-0"
            >
              Đang dùng ({rooms.filter((r) => r.status === "occupied").length})
            </Button>
          </div>

          {/* Legend */}
          <div className="mb-4 p-3 rounded-xl bg-[#1a1a24] border border-[#ffd700]/10">
            <p className="text-xs text-gray-400 mb-2" style={{ fontWeight: 600 }}>
              Chú thích:
            </p>
            <div className="flex flex-wrap gap-3 text-xs">
              <div className="flex items-center gap-1.5">
                <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
                <span className="text-gray-400">Trống</span>
              </div>
              <div className="flex items-center gap-1.5">
                <div className="w-2 h-2 rounded-full bg-red-400" />
                <span className="text-gray-400">Đang sử dụng</span>
              </div>
              <div className="flex items-center gap-1.5">
                <div className="w-2 h-2 rounded-full bg-yellow-400" />
                <span className="text-gray-400">Bảo trì</span>
              </div>
            </div>
          </div>

          {/* Rooms List */}
          <div className="space-y-3">
            {rooms.map((room) => {
              const isSelected = selectedRoom?.id === room.id;
              const canBook = room.status !== "maintenance";

              return (
                <Card
                  key={room.id}
                  className={`bg-card border-[#ffd700]/30 overflow-hidden transition-all ${
                    isSelected ? "border-[#ffd700] ring-2 ring-[#ffd700]/20" : ""
                  } ${!canBook ? "opacity-50" : "cursor-pointer hover:border-[#ffd700]"}`}
                  onClick={() => canBook && setSelectedRoom(room)}
                >
                  <div className="p-4">
                    {/* Room Header */}
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <h3 className="text-white text-sm" style={{ fontWeight: 600 }}>
                            {room.name}
                          </h3>
                          {isSelected && (
                            <CheckCircle2 className="w-4 h-4 text-[#ffd700]" />
                          )}
                        </div>
                        <p className="text-xs text-gray-400">Tầng {room.floor}</p>
                      </div>
                      {getStatusBadge(room.status)}
                    </div>

                    {/* Room Info */}
                    <div className="flex items-center gap-4 mb-3 text-xs text-gray-400">
                      <div className="flex items-center gap-1">
                        <Users className="w-3.5 h-3.5" />
                        <span>{room.capacity}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <span className="text-[#ffd700]" style={{ fontWeight: 700 }}>
                          {room.price.toLocaleString("vi-VN")}đ
                        </span>
                        <span>/giờ</span>
                      </div>
                    </div>

                    {/* Current Booking Info */}
                    {room.status === "occupied" && room.currentBooking && (
                      <div className="mb-3 p-2 rounded-lg bg-red-500/10 border border-red-500/20">
                        <p className="text-xs text-red-400 mb-1" style={{ fontWeight: 600 }}>
                          Khung giờ đã đặt:
                        </p>
                        <div className="flex flex-wrap gap-1">
                          {room.currentBooking.timeSlots.map((slot: string) => (
                            <span
                              key={slot}
                              className="text-xs bg-red-500/20 text-red-300 px-2 py-0.5 rounded"
                            >
                              {slot}
                            </span>
                          ))}
                        </div>
                        <p className="text-xs text-gray-400 mt-1">
                          Trống từ: <span className="text-green-400">{room.nextAvailable}</span>
                        </p>
                      </div>
                    )}

                    {/* Amenities */}
                    <div className="flex flex-wrap gap-1.5 mb-3">
                      {room.amenities.slice(0, 4).map((amenity, idx) => {
                        const Icon = amenityIcons[amenity] || Music2;
                        return (
                          <span
                            key={idx}
                            className="text-xs text-gray-400 bg-[#1a1a24] px-2 py-1 rounded-lg flex items-center gap-1"
                          >
                            <Icon className="w-3 h-3" />
                            {amenity}
                          </span>
                        );
                      })}
                      {room.amenities.length > 4 && (
                        <span className="text-xs text-[#ffd700] px-2 py-1">
                          +{room.amenities.length - 4}
                        </span>
                      )}
                    </div>

                    {/* Action Button */}
                    {canBook && (
                      <Button
                        className={`w-full rounded-full text-xs h-9 ${
                          room.status === "available"
                            ? "bg-[#ffd700] hover:bg-[#ffed4e] text-black"
                            : "bg-[#9333ea] hover:bg-[#7c3aed] text-white"
                        }`}
                        style={{ fontWeight: 600 }}
                        onClick={(e) => {
                          e.stopPropagation();
                          onNavigate("time-slot-selection", { room, category });
                        }}
                      >
                        {room.status === "available"
                          ? "Chọn giờ đặt phòng"
                          : "Xem khung giờ trống"}
                      </Button>
                    )}

                    {room.status === "maintenance" && (
                      <div className="w-full text-center text-xs text-yellow-400 py-2">
                        Phòng đang bảo trì
                      </div>
                    )}
                  </div>
                </Card>
              );
            })}
          </div>
        </div>
      </ScrollArea>

      {/* Bottom Action */}
      {selectedRoom && selectedRoom.status !== "maintenance" && (
        <div className="fixed bottom-0 left-0 right-0 p-4 bg-[#0a0a0f]/95 backdrop-blur-md border-t border-[#ffd700]/20">
          <div className="max-w-md mx-auto">
            <Button
              className="w-full h-12 rounded-full bg-gradient-to-r from-[#ffd700] to-[#ffed4e] hover:opacity-90 text-black text-sm"
              style={{ fontWeight: 600 }}
              onClick={() => onNavigate("time-slot-selection", { room: selectedRoom, category })}
            >
              Tiếp tục đặt phòng {selectedRoom.name}
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
