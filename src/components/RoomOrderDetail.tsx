import { useState } from "react";
import { ArrowLeft, Plus, Minus, ShoppingCart, Clock, Users, CheckCircle2 } from "lucide-react";
import { Button } from "./ui/button";
import { Card } from "./ui/card";
import { Badge } from "./ui/badge";
import { ScrollArea } from "./ui/scroll-area";
import { Separator } from "./ui/separator";
import { toast } from "sonner@2.0.3";

interface RoomOrderDetailProps {
  onBack: () => void;
  data: any;
}

export function RoomOrderDetail({ onBack, data }: RoomOrderDetailProps) {
  const { name: roomName, customer, startTime, endTime, id: roomId } = data;
  
  const [cart, setCart] = useState<any[]>([]);
  const [showOrderHistory, setShowOrderHistory] = useState(true);

  // Mock data - Đơn hàng đã order trước đó
  const previousOrders = [
    {
      id: 1,
      orderTime: "14:30",
      items: [
        { name: "Bia Heineken", quantity: 4, price: 25000, image: "🍺" },
        { name: "Snack khoai tây", quantity: 2, price: 25000, image: "🥔" },
        { name: "Nước ngọt", quantity: 3, price: 15000, image: "🥤" },
      ],
      total: 195000,
      status: "delivered", // delivered, preparing, pending
    },
    {
      id: 2,
      orderTime: "15:15",
      items: [
        { name: "Cocktail", quantity: 2, price: 80000, image: "🍹" },
        { name: "Dĩa trái cây", quantity: 1, price: 80000, image: "🍇" },
      ],
      total: 240000,
      status: "delivered",
    },
    {
      id: 3,
      orderTime: "16:00",
      items: [
        { name: "Bia Tiger", quantity: 6, price: 20000, image: "🍺" },
        { name: "Hạt điều", quantity: 1, price: 35000, image: "🥜" },
      ],
      total: 155000,
      status: "preparing",
    },
  ];

  const menuCategories = [
    {
      id: "drinks",
      name: "Đồ uống",
      icon: "🍹",
      items: [
        { id: 1, name: "Nước ngọt", price: 15000, unit: "lon", image: "🥤" },
        { id: 2, name: "Bia Heineken", price: 25000, unit: "lon", image: "🍺" },
        { id: 3, name: "Bia Tiger", price: 20000, unit: "lon", image: "🍺" },
        { id: 4, name: "Nước suối", price: 10000, unit: "chai", image: "💧" },
        { id: 5, name: "Trà xanh", price: 15000, unit: "chai", image: "🍵" },
        { id: 6, name: "Cocktail", price: 80000, unit: "ly", image: "🍹" },
      ],
    },
    {
      id: "snacks",
      name: "Đồ ăn vặt",
      icon: "🍿",
      items: [
        { id: 7, name: "Snack khoai tây", price: 25000, unit: "gói", image: "🥔" },
        { id: 8, name: "Hạt điều", price: 35000, unit: "gói", image: "🥜" },
        { id: 9, name: "Bỏng ngô", price: 20000, unit: "gói", image: "🍿" },
        { id: 10, name: "Khô bò", price: 45000, unit: "gói", image: "🥩" },
      ],
    },
    {
      id: "fruits",
      name: "Trái cây",
      icon: "🍎",
      items: [
        { id: 11, name: "Dĩa trái cây", price: 80000, unit: "dĩa", image: "🍇" },
        { id: 12, name: "Dưa hấu", price: 50000, unit: "dĩa", image: "🍉" },
      ],
    },
  ];

  const [selectedCategory, setSelectedCategory] = useState(menuCategories[0].id);

  const addToCart = (item: any) => {
    const existingItem = cart.find((i) => i.id === item.id);
    if (existingItem) {
      setCart(
        cart.map((i) =>
          i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i
        )
      );
    } else {
      setCart([...cart, { ...item, quantity: 1 }]);
    }
    toast.success(`Đã thêm ${item.name}`, {
      icon: item.image,
      duration: 1500,
    });
  };

  const removeFromCart = (itemId: number) => {
    const existingItem = cart.find((i) => i.id === itemId);
    if (existingItem && existingItem.quantity > 1) {
      setCart(
        cart.map((i) =>
          i.id === itemId ? { ...i, quantity: i.quantity - 1 } : i
        )
      );
    } else {
      setCart(cart.filter((i) => i.id !== itemId));
    }
  };

  const getTotal = () => {
    return cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  };

  const handleConfirmOrder = () => {
    if (cart.length === 0) {
      toast.error("Vui lòng chọn ít nhất 1 sản phẩm");
      return;
    }

    toast.success("Đơn hàng đã được gửi!", {
      description: `Tổng: ${getTotal().toLocaleString("vi-VN")}đ`,
      icon: <CheckCircle2 className="w-5 h-5" />,
      duration: 3000,
    });

    setTimeout(() => {
      onBack();
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-background pb-32">
      {/* Header */}
      <div className="sticky top-0 z-50 bg-gradient-to-br from-[#9333ea] to-[#6b21a8] p-4 rounded-b-[20px]">
        <div className="flex items-center gap-3 mb-4">
          <button
            onClick={onBack}
            className="w-9 h-9 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20 transition-colors"
          >
            <ArrowLeft className="w-5 h-5 text-white" />
          </button>
          <div className="flex-1">
            <h1 className="text-base text-white" style={{ fontWeight: 600 }}>
              Order - {roomName}
            </h1>
            <p className="text-xs text-gray-300">Thêm đồ uống & đồ ăn</p>
          </div>
        </div>

        {/* Room Info Card */}
        <Card className="bg-white/10 backdrop-blur-sm border-white/20 p-3">
          <div className="flex items-center justify-between text-sm text-white">
            <div className="flex items-center gap-2">
              <Users className="w-4 h-4" />
              <span>{customer}</span>
            </div>
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4" />
              <span>{startTime} - {endTime}</span>
            </div>
          </div>
        </Card>
      </div>

      {/* Order History & Category Tabs */}
      <div className="sticky top-[140px] z-40 bg-background border-b border-[#ffd700]/20">
        {/* Toggle History Button */}
        <div className="px-4 py-2 border-b border-[#ffd700]/10">
          <button
            onClick={() => setShowOrderHistory(!showOrderHistory)}
            className="w-full flex items-center justify-between text-sm"
          >
            <div className="flex items-center gap-2">
              <span className="text-[#ffd700]">📋</span>
              <span className="text-white" style={{ fontWeight: 600 }}>
                Đơn đã order ({previousOrders.length})
              </span>
              <Badge className="bg-[#ffd700]/20 text-[#ffd700] text-xs">
                {previousOrders.reduce((sum, order) => sum + order.total, 0).toLocaleString("vi-VN")}đ
              </Badge>
            </div>
            <span className="text-gray-400">
              {showOrderHistory ? "▼" : "▶"}
            </span>
          </button>
        </div>

        {/* Category Tabs */}
        <div className="py-3 px-4">
          <div className="flex gap-2 overflow-x-auto no-scrollbar">
            {menuCategories.map((category) => (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                className={`flex items-center gap-2 px-4 py-2 rounded-full whitespace-nowrap text-sm transition-all ${
                  selectedCategory === category.id
                    ? "bg-[#ffd700] text-black"
                    : "bg-card text-gray-400 border border-gray-700"
                }`}
                style={{ fontWeight: selectedCategory === category.id ? 600 : 400 }}
              >
                <span>{category.icon}</span>
                <span>{category.name}</span>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Content */}
      <ScrollArea className="h-[calc(100vh-320px)]">
        <div className="px-4 py-4">
          {/* Order History Section */}
          {showOrderHistory && previousOrders.length > 0 && (
            <div className="mb-6">
              <div className="space-y-3">
                {previousOrders.map((order) => {
                  const getStatusBadge = (status: string) => {
                    switch (status) {
                      case "delivered":
                        return (
                          <Badge className="bg-green-500/20 text-green-400 border-green-500/30 text-xs">
                            ✓ Đã giao
                          </Badge>
                        );
                      case "preparing":
                        return (
                          <Badge className="bg-yellow-500/20 text-yellow-400 border-yellow-500/30 text-xs">
                            ⏳ Đang chuẩn bị
                          </Badge>
                        );
                      case "pending":
                        return (
                          <Badge className="bg-gray-500/20 text-gray-400 border-gray-500/30 text-xs">
                            ⏱ Chờ xử lý
                          </Badge>
                        );
                      default:
                        return null;
                    }
                  };

                  return (
                    <Card
                      key={order.id}
                      className="bg-card border-[#9333ea]/30 p-3"
                    >
                      {/* Order Header */}
                      <div className="flex items-center justify-between mb-3 pb-2 border-b border-[#ffd700]/10">
                        <div className="flex items-center gap-2">
                          <Clock className="w-4 h-4 text-[#ffd700]" />
                          <span className="text-sm text-white" style={{ fontWeight: 600 }}>
                            {order.orderTime}
                          </span>
                        </div>
                        {getStatusBadge(order.status)}
                      </div>

                      {/* Order Items */}
                      <div className="space-y-2 mb-2">
                        {order.items.map((item, idx) => (
                          <div
                            key={idx}
                            className="flex items-center justify-between text-sm"
                          >
                            <div className="flex items-center gap-2 flex-1">
                              <span className="text-xl">{item.image}</span>
                              <div className="flex-1 min-w-0">
                                <p className="text-white text-xs truncate">
                                  {item.name}
                                </p>
                                <p className="text-xs text-gray-400">
                                  {item.price.toLocaleString("vi-VN")}đ × {item.quantity}
                                </p>
                              </div>
                            </div>
                            <span className="text-xs text-[#ffd700]" style={{ fontWeight: 600 }}>
                              {(item.price * item.quantity).toLocaleString("vi-VN")}đ
                            </span>
                          </div>
                        ))}
                      </div>

                      {/* Order Total */}
                      <div className="flex items-center justify-between pt-2 border-t border-[#ffd700]/10">
                        <span className="text-xs text-gray-400">Tổng đơn #{order.id}</span>
                        <span className="text-sm text-[#ffd700]" style={{ fontWeight: 700 }}>
                          {order.total.toLocaleString("vi-VN")}đ
                        </span>
                      </div>
                    </Card>
                  );
                })}
              </div>

              {/* Total Summary */}
              <Card className="mt-3 bg-gradient-to-r from-[#9333ea]/20 to-[#6b21a8]/20 border-[#9333ea]/50 p-3">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-xs text-gray-400 mb-0.5">Tổng đã order</p>
                    <p className="text-xs text-gray-400">
                      {previousOrders.reduce(
                        (sum, order) =>
                          sum + order.items.reduce((s, item) => s + item.quantity, 0),
                        0
                      )}{" "}
                      món
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="text-lg text-[#9333ea]" style={{ fontWeight: 700 }}>
                      {previousOrders
                        .reduce((sum, order) => sum + order.total, 0)
                        .toLocaleString("vi-VN")}đ
                    </p>
                  </div>
                </div>
              </Card>

              {/* Divider */}
              <div className="flex items-center gap-3 my-6">
                <div className="flex-1 h-px bg-[#ffd700]/20" />
                <span className="text-xs text-gray-400">Thêm order mới</span>
                <div className="flex-1 h-px bg-[#ffd700]/20" />
              </div>
            </div>
          )}

          {/* Menu Items */}
          {menuCategories
            .filter((cat) => cat.id === selectedCategory)
            .map((category) => (
              <div key={category.id} className="space-y-3">
                {category.items.map((item) => {
                  const cartItem = cart.find((i) => i.id === item.id);
                  const quantity = cartItem?.quantity || 0;

                  return (
                    <Card
                      key={item.id}
                      className="bg-card border-[#ffd700]/20 p-3 hover:border-[#ffd700] transition-all"
                    >
                      <div className="flex items-center gap-3">
                        <div className="w-14 h-14 rounded-xl bg-[#ffd700]/10 flex items-center justify-center text-3xl flex-shrink-0">
                          {item.image}
                        </div>

                        <div className="flex-1 min-w-0">
                          <h3 className="text-white text-sm mb-0.5 truncate" style={{ fontWeight: 600 }}>
                            {item.name}
                          </h3>
                          <p className="text-xs text-gray-400 mb-1">{item.unit}</p>
                          <p className="text-sm text-[#ffd700]" style={{ fontWeight: 700 }}>
                            {item.price.toLocaleString("vi-VN")}đ
                          </p>
                        </div>

                        {quantity > 0 ? (
                          <div className="flex items-center gap-2 flex-shrink-0">
                            <button
                              onClick={() => removeFromCart(item.id)}
                              className="w-8 h-8 rounded-full bg-red-500/20 text-red-400 flex items-center justify-center hover:bg-red-500/30 transition-colors"
                            >
                              <Minus className="w-4 h-4" />
                            </button>
                            <span className="text-white w-6 text-center" style={{ fontWeight: 600 }}>
                              {quantity}
                            </span>
                            <button
                              onClick={() => addToCart(item)}
                              className="w-8 h-8 rounded-full bg-[#ffd700]/20 text-[#ffd700] flex items-center justify-center hover:bg-[#ffd700]/30 transition-colors"
                            >
                              <Plus className="w-4 h-4" />
                            </button>
                          </div>
                        ) : (
                          <button
                            onClick={() => addToCart(item)}
                            className="w-9 h-9 rounded-full bg-[#ffd700] text-black flex items-center justify-center hover:bg-[#ffed4e] transition-colors flex-shrink-0"
                          >
                            <Plus className="w-5 h-5" />
                          </button>
                        )}
                      </div>
                    </Card>
                  );
                })}
              </div>
            ))}
        </div>
      </ScrollArea>

      {/* Bottom Cart */}
      {cart.length > 0 && (
        <div className="fixed bottom-0 left-0 right-0 bg-[#0a0a0f]/95 backdrop-blur-md border-t border-[#ffd700]/20">
          <div className="max-w-md mx-auto p-4">
            {/* Cart Summary */}
            <div className="mb-3">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <ShoppingCart className="w-4 h-4 text-[#ffd700]" />
                  <span className="text-sm text-gray-400">
                    {cart.reduce((sum, item) => sum + item.quantity, 0)} sản phẩm
                  </span>
                </div>
                <button
                  onClick={() => setCart([])}
                  className="text-xs text-red-400 hover:text-red-300"
                >
                  Xóa hết
                </button>
              </div>

              <Separator className="bg-[#ffd700]/20 mb-2" />

              <div className="max-h-20 overflow-y-auto space-y-1">
                {cart.map((item) => (
                  <div key={item.id} className="flex items-center justify-between text-xs">
                    <span className="text-gray-400">
                      {item.quantity}x {item.name}
                    </span>
                    <span className="text-white">
                      {(item.price * item.quantity).toLocaleString("vi-VN")}đ
                    </span>
                  </div>
                ))}
              </div>

              <Separator className="bg-[#ffd700]/20 my-2" />

              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-400">Tổng cộng:</span>
                <span className="text-lg text-[#ffd700]" style={{ fontWeight: 700 }}>
                  {getTotal().toLocaleString("vi-VN")}đ
                </span>
              </div>
            </div>

            {/* Confirm Button */}
            <Button
              onClick={handleConfirmOrder}
              className="w-full h-12 rounded-full bg-gradient-to-r from-[#ffd700] to-[#ffed4e] hover:opacity-90 text-black text-sm"
              style={{ fontWeight: 600 }}
            >
              <CheckCircle2 className="w-5 h-5 mr-2" />
              Xác nhận đơn hàng
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
