import { useState } from 'react';
import { ArrowLeft, Plus, Edit, Trash2, CheckCircle2, XCircle, Wrench, Sparkles } from 'lucide-react';
import { Button } from '../ui/button';
import { Card } from '../ui/card';
import { Badge } from '../ui/badge';
import { ScrollArea } from '../ui/scroll-area';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '../ui/dialog';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { toast } from 'sonner@2.0.3';

interface RoomManagementProps {
  onBack: () => void;
}

export function RoomManagement({ onBack }: RoomManagementProps) {
  const [selectedFloor, setSelectedFloor] = useState('all');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [editingRoom, setEditingRoom] = useState<any>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  // Mock room data - đồng bộ với hệ thống
  const [rooms, setRooms] = useState([
    { id: 'VIP-01', name: 'Phòng VIP 01', category: 'VIP', floor: 1, capacity: '15-20', price: 450000, status: 'available' },
    { id: 'VIP-02', name: 'Phòng VIP 02', category: 'VIP', floor: 1, capacity: '15-20', price: 450000, status: 'occupied' },
    { id: 'VIP-03', name: 'Phòng VIP 03', category: 'VIP', floor: 2, capacity: '15-20', price: 450000, status: 'available' },
    { id: 'VIP-04', name: 'Phòng VIP 04', category: 'VIP', floor: 2, capacity: '15-20', price: 450000, status: 'occupied' },
    { id: 'VIP-05', name: 'Phòng VIP 05', category: 'VIP', floor: 3, capacity: '15-20', price: 450000, status: 'available' },
    { id: 'VIP-06', name: 'Phòng VIP 06', category: 'VIP', floor: 3, capacity: '15-20', price: 450000, status: 'maintenance' },
    { id: 'FAM-01', name: 'Phòng Family 01', category: 'Family', floor: 1, capacity: '8-10', price: 280000, status: 'occupied' },
    { id: 'FAM-02', name: 'Phòng Family 02', category: 'Family', floor: 1, capacity: '8-10', price: 280000, status: 'available' },
    { id: 'FAM-03', name: 'Phòng Family 03', category: 'Family', floor: 1, capacity: '8-10', price: 280000, status: 'available' },
    { id: 'FAM-04', name: 'Phòng Family 04', category: 'Family', floor: 2, capacity: '8-10', price: 280000, status: 'cleaning' },
    { id: 'COU-01', name: 'Phòng Couple 01', category: 'Couple', floor: 1, capacity: '2-4', price: 250000, status: 'occupied' },
    { id: 'COU-02', name: 'Phòng Couple 02', category: 'Couple', floor: 1, capacity: '2-4', price: 250000, status: 'available' },
    { id: 'COU-03', name: 'Phòng Couple 03', category: 'Couple', floor: 2, capacity: '2-4', price: 250000, status: 'available' },
    { id: 'PAR-01', name: 'Phòng Party 01', category: 'Party', floor: 3, capacity: '20-30', price: 600000, status: 'occupied' },
    { id: 'PAR-02', name: 'Phòng Party 02', category: 'Party', floor: 3, capacity: '20-30', price: 600000, status: 'available' },
  ]);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'available': return 'bg-green-500/20 border-green-500/50 text-green-400';
      case 'occupied': return 'bg-red-500/20 border-red-500/50 text-red-400';
      case 'cleaning': return 'bg-blue-500/20 border-blue-500/50 text-blue-400';
      case 'maintenance': return 'bg-yellow-500/20 border-yellow-500/50 text-yellow-400';
      default: return 'bg-gray-500/20 border-gray-500/50 text-gray-400';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'available': return <CheckCircle2 className="w-4 h-4" />;
      case 'occupied': return <XCircle className="w-4 h-4" />;
      case 'cleaning': return <Sparkles className="w-4 h-4" />;
      case 'maintenance': return <Wrench className="w-4 h-4" />;
      default: return null;
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'available': return 'Trống';
      case 'occupied': return 'Đang dùng';
      case 'cleaning': return 'Dọn dẹp';
      case 'maintenance': return 'Bảo trì';
      default: return status;
    }
  };

  const filteredRooms = rooms.filter(room => {
    if (selectedFloor !== 'all' && room.floor.toString() !== selectedFloor) return false;
    if (selectedCategory !== 'all' && room.category !== selectedCategory) return false;
    return true;
  });

  const handleStatusChange = (roomId: string, newStatus: string) => {
    setRooms(prev =>
      prev.map(room =>
        room.id === roomId ? { ...room, status: newStatus } : room
      )
    );
    toast.success('Đã cập nhật trạng thái phòng', {
      icon: <CheckCircle2 className="w-5 h-5" />,
    });
  };

  const handleSaveRoom = (roomData: any) => {
    if (editingRoom) {
      setRooms(prev =>
        prev.map(room => (room.id === editingRoom.id ? { ...room, ...roomData } : room))
      );
      toast.success('Đã cập nhật thông tin phòng');
    } else {
      const newRoom = {
        id: `${roomData.category.substring(0, 3).toUpperCase()}-${(rooms.length + 1).toString().padStart(2, '0')}`,
        ...roomData,
        status: 'available',
      };
      setRooms(prev => [...prev, newRoom]);
      toast.success('Đã thêm phòng mới');
    }
    setIsDialogOpen(false);
    setEditingRoom(null);
  };

  const stats = {
    total: rooms.length,
    available: rooms.filter(r => r.status === 'available').length,
    occupied: rooms.filter(r => r.status === 'occupied').length,
    cleaning: rooms.filter(r => r.status === 'cleaning').length,
    maintenance: rooms.filter(r => r.status === 'maintenance').length,
  };

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
              Quản lý phòng hát
            </h1>
            <p className="text-xs text-gray-300">{stats.total} phòng</p>
          </div>
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button
                size="sm"
                className="bg-[#ffd700] hover:bg-[#ffed4e] text-black h-9 rounded-full"
                onClick={() => setEditingRoom(null)}
              >
                <Plus className="w-4 h-4 mr-1" />
                Thêm
              </Button>
            </DialogTrigger>
            <RoomEditDialog
              room={editingRoom}
              onSave={handleSaveRoom}
              onClose={() => {
                setIsDialogOpen(false);
                setEditingRoom(null);
              }}
            />
          </Dialog>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-5 gap-2">
          <div className="bg-white/10 backdrop-blur-sm rounded-lg p-2 text-center">
            <p className="text-base text-white" style={{ fontWeight: 700 }}>{stats.available}</p>
            <p className="text-xs text-green-300">Trống</p>
          </div>
          <div className="bg-white/10 backdrop-blur-sm rounded-lg p-2 text-center">
            <p className="text-base text-white" style={{ fontWeight: 700 }}>{stats.occupied}</p>
            <p className="text-xs text-red-300">Đang dùng</p>
          </div>
          <div className="bg-white/10 backdrop-blur-sm rounded-lg p-2 text-center">
            <p className="text-base text-white" style={{ fontWeight: 700 }}>{stats.cleaning}</p>
            <p className="text-xs text-blue-300">Dọn dẹp</p>
          </div>
          <div className="bg-white/10 backdrop-blur-sm rounded-lg p-2 text-center">
            <p className="text-base text-white" style={{ fontWeight: 700 }}>{stats.maintenance}</p>
            <p className="text-xs text-yellow-300">Bảo trì</p>
          </div>
          <div className="bg-white/10 backdrop-blur-sm rounded-lg p-2 text-center">
            <p className="text-base text-white" style={{ fontWeight: 700 }}>{stats.total}</p>
            <p className="text-xs text-gray-300">Tổng</p>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="sticky top-[140px] z-40 bg-background py-3 px-4 border-b border-[#ffd700]/20">
        <div className="flex gap-2 overflow-x-auto no-scrollbar">
          <Select value={selectedFloor} onValueChange={setSelectedFloor}>
            <SelectTrigger className="w-auto h-8 text-xs bg-card border-[#ffd700]/30">
              <SelectValue placeholder="Tầng" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Tất cả tầng</SelectItem>
              <SelectItem value="1">Tầng 1</SelectItem>
              <SelectItem value="2">Tầng 2</SelectItem>
              <SelectItem value="3">Tầng 3</SelectItem>
            </SelectContent>
          </Select>

          <Select value={selectedCategory} onValueChange={setSelectedCategory}>
            <SelectTrigger className="w-auto h-8 text-xs bg-card border-[#ffd700]/30">
              <SelectValue placeholder="Loại" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Tất cả loại</SelectItem>
              <SelectItem value="VIP">VIP</SelectItem>
              <SelectItem value="Family">Family</SelectItem>
              <SelectItem value="Couple">Couple</SelectItem>
              <SelectItem value="Party">Party</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Room List */}
      <ScrollArea className="h-[calc(100vh-280px)]">
        <div className="px-4 py-4 space-y-3">
          {filteredRooms.map(room => (
            <Card
              key={room.id}
              className={`p-4 border ${getStatusColor(room.status)}`}
            >
              <div className="flex items-start justify-between mb-3">
                <div className="flex-1">
                  <h3 className="text-white text-sm mb-1" style={{ fontWeight: 600 }}>
                    {room.name}
                  </h3>
                  <div className="flex items-center gap-2 text-xs text-gray-400">
                    <span>Tầng {room.floor}</span>
                    <span>•</span>
                    <span>{room.capacity} người</span>
                  </div>
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={() => {
                      setEditingRoom(room);
                      setIsDialogOpen(true);
                    }}
                    className="w-8 h-8 rounded-lg bg-[#ffd700]/20 flex items-center justify-center hover:bg-[#ffd700]/30"
                  >
                    <Edit className="w-4 h-4 text-[#ffd700]" />
                  </button>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <Badge className={`${getStatusColor(room.status)} flex items-center gap-1`}>
                    {getStatusIcon(room.status)}
                    {getStatusText(room.status)}
                  </Badge>
                  <p className="text-xs text-[#ffd700] mt-2" style={{ fontWeight: 600 }}>
                    {room.price.toLocaleString('vi-VN')}đ/giờ
                  </p>
                </div>

                {/* Status Change Buttons */}
                <div className="flex gap-1">
                  <button
                    onClick={() => handleStatusChange(room.id, 'available')}
                    className="px-2 py-1 rounded text-xs bg-green-500/20 text-green-400 hover:bg-green-500/30"
                  >
                    Trống
                  </button>
                  <button
                    onClick={() => handleStatusChange(room.id, 'cleaning')}
                    className="px-2 py-1 rounded text-xs bg-blue-500/20 text-blue-400 hover:bg-blue-500/30"
                  >
                    Dọn
                  </button>
                  <button
                    onClick={() => handleStatusChange(room.id, 'maintenance')}
                    className="px-2 py-1 rounded text-xs bg-yellow-500/20 text-yellow-400 hover:bg-yellow-500/30"
                  >
                    Bảo trì
                  </button>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </ScrollArea>
    </div>
  );
}

// Room Edit Dialog Component
function RoomEditDialog({ room, onSave, onClose }: any) {
  const [formData, setFormData] = useState(
    room || {
      name: '',
      category: 'VIP',
      floor: 1,
      capacity: '',
      price: 0,
    }
  );

  return (
    <DialogContent className="bg-card border-[#ffd700]/30 text-white max-w-sm" aria-describedby={undefined}>
      <DialogHeader>
        <DialogTitle>{room ? 'Chỉnh sửa phòng' : 'Thêm phòng mới'}</DialogTitle>
      </DialogHeader>
      <div className="space-y-4 py-4">
        <div>
          <Label htmlFor="name" className="text-xs text-gray-400 mb-1.5 block">
            Tên phòng
          </Label>
          <Input
            id="name"
            value={formData.name}
            onChange={e => setFormData({ ...formData, name: e.target.value })}
            className="bg-[#1a1a24] border-gray-700 text-white"
            placeholder="VD: Phòng VIP 01"
          />
        </div>

        <div>
          <Label htmlFor="category" className="text-xs text-gray-400 mb-1.5 block">
            Loại phòng
          </Label>
          <Select
            value={formData.category}
            onValueChange={value => setFormData({ ...formData, category: value })}
          >
            <SelectTrigger className="bg-[#1a1a24] border-gray-700">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="VIP">VIP</SelectItem>
              <SelectItem value="Family">Family</SelectItem>
              <SelectItem value="Couple">Couple</SelectItem>
              <SelectItem value="Party">Party</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="grid grid-cols-2 gap-3">
          <div>
            <Label htmlFor="floor" className="text-xs text-gray-400 mb-1.5 block">
              Tầng
            </Label>
            <Select
              value={formData.floor.toString()}
              onValueChange={value => setFormData({ ...formData, floor: parseInt(value) })}
            >
              <SelectTrigger className="bg-[#1a1a24] border-gray-700">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="1">Tầng 1</SelectItem>
                <SelectItem value="2">Tầng 2</SelectItem>
                <SelectItem value="3">Tầng 3</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label htmlFor="capacity" className="text-xs text-gray-400 mb-1.5 block">
              Sức chứa
            </Label>
            <Input
              id="capacity"
              value={formData.capacity}
              onChange={e => setFormData({ ...formData, capacity: e.target.value })}
              className="bg-[#1a1a24] border-gray-700 text-white"
              placeholder="VD: 15-20"
            />
          </div>
        </div>

        <div>
          <Label htmlFor="price" className="text-xs text-gray-400 mb-1.5 block">
            Giá (đ/giờ)
          </Label>
          <Input
            id="price"
            type="number"
            value={formData.price}
            onChange={e => setFormData({ ...formData, price: parseInt(e.target.value) })}
            className="bg-[#1a1a24] border-gray-700 text-white"
            placeholder="450000"
          />
        </div>
      </div>

      <div className="flex gap-2">
        <Button
          variant="outline"
          className="flex-1 border-gray-700 text-white hover:bg-gray-800"
          onClick={onClose}
        >
          Hủy
        </Button>
        <Button
          className="flex-1 bg-[#ffd700] hover:bg-[#ffed4e] text-black"
          onClick={() => onSave(formData)}
        >
          {room ? 'Cập nhật' : 'Thêm'}
        </Button>
      </div>
    </DialogContent>
  );
}
