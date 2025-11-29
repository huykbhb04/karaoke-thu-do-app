import { useState } from 'react';
import { ArrowLeft, Clock, CheckCircle2, XCircle, AlertCircle, Filter } from 'lucide-react';
import { Button } from '../ui/button';
import { Card } from '../ui/card';
import { Badge } from '../ui/badge';
import { ScrollArea } from '../ui/scroll-area';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '../ui/dialog';
import { Textarea } from '../ui/textarea';
import { toast } from 'sonner@2.0.3';

interface OrderManagementProps {
  onBack: () => void;
}

export function OrderManagement({ onBack }: OrderManagementProps) {
  const [selectedOrder, setSelectedOrder] = useState<any>(null);
  const [showReasonDialog, setShowReasonDialog] = useState(false);
  const [cancelReason, setCancelReason] = useState('');

  const [orders, setOrders] = useState([
    {
      id: 'ORD-001',
      room: 'VIP-02',
      roomName: 'Phòng VIP 02',
      customer: 'Nguyễn Văn A',
      staff: 'Trần Thị B',
      time: '14:30',
      items: [
        { name: 'Bia Heineken', quantity: 4, price: 25000 },
        { name: 'Snack khoai tây', quantity: 2, price: 25000 },
        { name: 'Nước ngọt', quantity: 3, price: 15000 },
      ],
      total: 195000,
      status: 'pending',
      note: '',
    },
    {
      id: 'ORD-002',
      room: 'FAM-01',
      roomName: 'Phòng Family 01',
      customer: 'Lê Văn C',
      staff: 'Phạm Thị D',
      time: '15:00',
      items: [
        { name: 'Cocktail', quantity: 2, price: 80000 },
        { name: 'Dĩa trái cây', quantity: 1, price: 80000 },
        { name: 'Hạt điều', quantity: 1, price: 35000 },
      ],
      total: 275000,
      status: 'preparing',
      note: 'Khách yêu cầu giao nhanh',
    },
    {
      id: 'ORD-003',
      room: 'PAR-01',
      roomName: 'Phòng Party 01',
      customer: 'Hoàng Văn E',
      staff: 'Trần Thị B',
      time: '16:00',
      items: [
        { name: 'Bia Tiger', quantity: 12, price: 20000 },
        { name: 'Bỏng ngô', quantity: 3, price: 20000 },
        { name: 'Khô bò', quantity: 2, price: 45000 },
      ],
      total: 390000,
      status: 'delivered',
      note: '',
    },
    {
      id: 'ORD-004',
      room: 'COU-01',
      roomName: 'Phòng Couple 01',
      customer: 'Phạm Thị D',
      staff: 'Lê Văn C',
      time: '14:45',
      items: [
        { name: 'Nước suối', quantity: 2, price: 10000 },
        { name: 'Trà xanh', quantity: 2, price: 15000 },
      ],
      total: 50000,
      status: 'cancelled',
      note: 'Khách đổi ý',
    },
  ]);

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'pending':
        return (
          <Badge className="bg-yellow-500/20 text-yellow-400 border-yellow-500/30">
            <AlertCircle className="w-3 h-3 mr-1" />
            Chờ duyệt
          </Badge>
        );
      case 'preparing':
        return (
          <Badge className="bg-blue-500/20 text-blue-400 border-blue-500/30">
            <Clock className="w-3 h-3 mr-1" />
            Đang chuẩn bị
          </Badge>
        );
      case 'delivered':
        return (
          <Badge className="bg-green-500/20 text-green-400 border-green-500/30">
            <CheckCircle2 className="w-3 h-3 mr-1" />
            Đã giao
          </Badge>
        );
      case 'cancelled':
        return (
          <Badge className="bg-red-500/20 text-red-400 border-red-500/30">
            <XCircle className="w-3 h-3 mr-1" />
            Đã hủy
          </Badge>
        );
      default:
        return null;
    }
  };

  const handleApprove = (orderId: string) => {
    setOrders(prev =>
      prev.map(order =>
        order.id === orderId ? { ...order, status: 'preparing' } : order
      )
    );
    toast.success('Đã duyệt đơn hàng', {
      description: `Order ${orderId} đang được chuẩn bị`,
      icon: <CheckCircle2 className="w-5 h-5" />,
    });
  };

  const handleComplete = (orderId: string) => {
    setOrders(prev =>
      prev.map(order =>
        order.id === orderId ? { ...order, status: 'delivered' } : order
      )
    );
    toast.success('Đã hoàn thành đơn hàng', {
      icon: <CheckCircle2 className="w-5 h-5" />,
    });
  };

  const handleCancel = (orderId: string) => {
    if (!cancelReason.trim()) {
      toast.error('Vui lòng nhập lý do hủy');
      return;
    }
    setOrders(prev =>
      prev.map(order =>
        order.id === orderId ? { ...order, status: 'cancelled', note: cancelReason } : order
      )
    );
    toast.success('Đã hủy đơn hàng', {
      icon: <XCircle className="w-5 h-5" />,
    });
    setShowReasonDialog(false);
    setCancelReason('');
  };

  const filterOrders = (status: string) => {
    if (status === 'all') return orders;
    return orders.filter(order => order.status === status);
  };

  const stats = {
    pending: orders.filter(o => o.status === 'pending').length,
    preparing: orders.filter(o => o.status === 'preparing').length,
    delivered: orders.filter(o => o.status === 'delivered').length,
    cancelled: orders.filter(o => o.status === 'cancelled').length,
    total: orders.length,
    totalRevenue: orders.filter(o => o.status !== 'cancelled').reduce((sum, o) => sum + o.total, 0),
  };

  const renderOrderList = (orderList: any[]) => (
    <div className="space-y-3">
      {orderList.map(order => (
        <Card
          key={order.id}
          className="bg-card border-[#ffd700]/30 p-4 cursor-pointer hover:border-[#ffd700] transition-all"
          onClick={() => setSelectedOrder(order)}
        >
          <div className="flex items-start justify-between mb-3">
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-1">
                <h3 className="text-white text-sm" style={{ fontWeight: 600 }}>
                  {order.id}
                </h3>
                {getStatusBadge(order.status)}
              </div>
              <p className="text-xs text-gray-400">
                {order.roomName} • {order.time}
              </p>
            </div>
          </div>

          <div className="space-y-1 mb-3">
            {order.items.slice(0, 2).map((item: any, idx: number) => (
              <p key={idx} className="text-xs text-gray-400">
                {item.quantity}x {item.name}
              </p>
            ))}
            {order.items.length > 2 && (
              <p className="text-xs text-[#ffd700]">+{order.items.length - 2} món khác</p>
            )}
          </div>

          <div className="flex items-center justify-between pt-2 border-t border-[#ffd700]/10">
            <div>
              <p className="text-xs text-gray-400">Tổng</p>
              <p className="text-sm text-[#ffd700]" style={{ fontWeight: 700 }}>
                {order.total.toLocaleString('vi-VN')}đ
              </p>
            </div>
            <div className="flex gap-2">
              {order.status === 'pending' && (
                <>
                  <Button
                    size="sm"
                    className="bg-green-500/20 hover:bg-green-500/30 text-green-400 h-8 px-3 text-xs"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleApprove(order.id);
                    }}
                  >
                    Duyệt
                  </Button>
                  <Button
                    size="sm"
                    className="bg-red-500/20 hover:bg-red-500/30 text-red-400 h-8 px-3 text-xs"
                    onClick={(e) => {
                      e.stopPropagation();
                      setSelectedOrder(order);
                      setShowReasonDialog(true);
                    }}
                  >
                    Hủy
                  </Button>
                </>
              )}
              {order.status === 'preparing' && (
                <Button
                  size="sm"
                  className="bg-[#ffd700] hover:bg-[#ffed4e] text-black h-8 px-3 text-xs"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleComplete(order.id);
                  }}
                >
                  Đã giao
                </Button>
              )}
            </div>
          </div>
        </Card>
      ))}
    </div>
  );

  return (
    <div className="min-h-screen bg-background pb-20">
      {/* Header */}
      <div className="sticky top-0 z-50 bg-gradient-to-br from-[#9333ea] to-[#6b21a8] p-4 rounded-b-[20px]">
        <div className="flex items-center gap-3 mb-4">
          <button
            onClick={onBack}
            className="w-9 h-9 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20"
          >
            <ArrowLeft className="w-5 h-5 text-white" />
          </button>
          <div className="flex-1">
            <h1 className="text-base text-white" style={{ fontWeight: 700 }}>
              Quản lý Order
            </h1>
            <p className="text-xs text-gray-300">{stats.total} đơn hôm nay</p>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-4 gap-2">
          <div className="bg-white/10 backdrop-blur-sm rounded-lg p-2 text-center">
            <p className="text-base text-white" style={{ fontWeight: 700 }}>{stats.pending}</p>
            <p className="text-xs text-yellow-300">Chờ duyệt</p>
          </div>
          <div className="bg-white/10 backdrop-blur-sm rounded-lg p-2 text-center">
            <p className="text-base text-white" style={{ fontWeight: 700 }}>{stats.preparing}</p>
            <p className="text-xs text-blue-300">Đang làm</p>
          </div>
          <div className="bg-white/10 backdrop-blur-sm rounded-lg p-2 text-center">
            <p className="text-base text-white" style={{ fontWeight: 700 }}>{stats.delivered}</p>
            <p className="text-xs text-green-300">Đã giao</p>
          </div>
          <div className="bg-white/10 backdrop-blur-sm rounded-lg p-2 text-center">
            <p className="text-base text-[#ffd700]" style={{ fontWeight: 700 }}>
              {(stats.totalRevenue / 1000).toFixed(0)}K
            </p>
            <p className="text-xs text-gray-300">Doanh thu</p>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <Tabs defaultValue="all" className="px-4 pt-4">
        <TabsList className="grid w-full grid-cols-5 bg-card">
          <TabsTrigger value="all" className="text-xs">Tất cả</TabsTrigger>
          <TabsTrigger value="pending" className="text-xs">Chờ</TabsTrigger>
          <TabsTrigger value="preparing" className="text-xs">Làm</TabsTrigger>
          <TabsTrigger value="delivered" className="text-xs">Xong</TabsTrigger>
          <TabsTrigger value="cancelled" className="text-xs">Hủy</TabsTrigger>
        </TabsList>

        <ScrollArea className="h-[calc(100vh-260px)] mt-4">
          <TabsContent value="all">{renderOrderList(filterOrders('all'))}</TabsContent>
          <TabsContent value="pending">{renderOrderList(filterOrders('pending'))}</TabsContent>
          <TabsContent value="preparing">{renderOrderList(filterOrders('preparing'))}</TabsContent>
          <TabsContent value="delivered">{renderOrderList(filterOrders('delivered'))}</TabsContent>
          <TabsContent value="cancelled">{renderOrderList(filterOrders('cancelled'))}</TabsContent>
        </ScrollArea>
      </Tabs>

      {/* Order Detail Dialog */}
      <Dialog open={!!selectedOrder && !showReasonDialog} onOpenChange={() => setSelectedOrder(null)}>
        <DialogContent className="bg-card border-[#ffd700]/30 text-white max-w-sm" aria-describedby={undefined}>
          <DialogHeader>
            <DialogTitle>Chi tiết đơn hàng</DialogTitle>
          </DialogHeader>
          {selectedOrder && (
            <div className="space-y-4 py-4">
              <div className="flex items-center justify-between">
                <p className="text-sm text-gray-400">Mã đơn:</p>
                <p className="text-sm text-white" style={{ fontWeight: 600 }}>{selectedOrder.id}</p>
              </div>
              <div className="flex items-center justify-between">
                <p className="text-sm text-gray-400">Phòng:</p>
                <p className="text-sm text-white">{selectedOrder.roomName}</p>
              </div>
              <div className="flex items-center justify-between">
                <p className="text-sm text-gray-400">Khách:</p>
                <p className="text-sm text-white">{selectedOrder.customer}</p>
              </div>
              <div className="flex items-center justify-between">
                <p className="text-sm text-gray-400">NV thực hiện:</p>
                <p className="text-sm text-white">{selectedOrder.staff}</p>
              </div>
              <div className="flex items-center justify-between">
                <p className="text-sm text-gray-400">Thời gian:</p>
                <p className="text-sm text-white">{selectedOrder.time}</p>
              </div>
              <div className="flex items-center justify-between">
                <p className="text-sm text-gray-400">Trạng thái:</p>
                {getStatusBadge(selectedOrder.status)}
              </div>

              <div className="border-t border-[#ffd700]/10 pt-3">
                <p className="text-sm text-gray-400 mb-2">Danh sách món:</p>
                <div className="space-y-2">
                  {selectedOrder.items.map((item: any, idx: number) => (
                    <div key={idx} className="flex justify-between text-sm">
                      <span className="text-gray-300">
                        {item.quantity}x {item.name}
                      </span>
                      <span className="text-white">
                        {(item.quantity * item.price).toLocaleString('vi-VN')}đ
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="border-t border-[#ffd700]/10 pt-3 flex justify-between">
                <p className="text-white" style={{ fontWeight: 600 }}>Tổng cộng:</p>
                <p className="text-[#ffd700]" style={{ fontWeight: 700 }}>
                  {selectedOrder.total.toLocaleString('vi-VN')}đ
                </p>
              </div>

              {selectedOrder.note && (
                <div className="border-t border-[#ffd700]/10 pt-3">
                  <p className="text-sm text-gray-400 mb-1">Ghi chú:</p>
                  <p className="text-sm text-white">{selectedOrder.note}</p>
                </div>
              )}
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* Cancel Reason Dialog */}
      <Dialog open={showReasonDialog} onOpenChange={setShowReasonDialog}>
        <DialogContent className="bg-card border-[#ffd700]/30 text-white max-w-sm" aria-describedby={undefined}>
          <DialogHeader>
            <DialogTitle>Lý do hủy đơn</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <Textarea
              placeholder="Nhập lý do hủy đơn hàng..."
              value={cancelReason}
              onChange={(e) => setCancelReason(e.target.value)}
              className="bg-[#1a1a24] border-gray-700 text-white min-h-24"
            />
            <div className="flex gap-2">
              <Button
                variant="outline"
                className="flex-1 border-gray-700 text-white"
                onClick={() => {
                  setShowReasonDialog(false);
                  setCancelReason('');
                }}
              >
                Hủy bỏ
              </Button>
              <Button
                className="flex-1 bg-red-500 hover:bg-red-600 text-white"
                onClick={() => selectedOrder && handleCancel(selectedOrder.id)}
              >
                Xác nhận hủy
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
