import { useState } from 'react';
import {
  ArrowLeft, Plus, Edit, Trash2, Search, AlertTriangle, CheckCircle2
} from 'lucide-react';
import { Button } from '../ui/button';
import { Card } from '../ui/card';
import { Badge } from '../ui/badge';
import { ScrollArea } from '../ui/scroll-area';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '../ui/dialog';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { Textarea } from '../ui/textarea';
import { toast } from 'sonner@2.0.3';

interface ServiceManagementProps {
  onBack: () => void;
}

export function ServiceManagement({ onBack }: ServiceManagementProps) {
  const [activeTab, setActiveTab] = useState('menu');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [editingItem, setEditingItem] = useState<any>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isComboDialogOpen, setIsComboDialogOpen] = useState(false);
  const [editingCombo, setEditingCombo] = useState<any>(null);

  // Menu Items
  const [menuItems, setMenuItems] = useState([
    { id: 'DU001', name: 'Nước ngọt', category: 'drinks', price: 15000, unit: 'lon', status: 'active', image: '🥤' },
    { id: 'DU002', name: 'Bia Heineken', category: 'drinks', price: 25000, unit: 'lon', status: 'active', image: '🍺' },
    { id: 'DU003', name: 'Bia Tiger', category: 'drinks', price: 20000, unit: 'lon', status: 'active', image: '🍺' },
    { id: 'DU004', name: 'Nước suối', category: 'drinks', price: 10000, unit: 'chai', status: 'active', image: '💧' },
    { id: 'DU005', name: 'Trà xanh', category: 'drinks', price: 15000, unit: 'chai', status: 'active', image: '🍵' },
    { id: 'DU006', name: 'Cocktail', category: 'drinks', price: 80000, unit: 'ly', status: 'active', image: '🍹' },
    { id: 'DA001', name: 'Snack khoai tây', category: 'snacks', price: 25000, unit: 'gói', status: 'active', image: '🥔' },
    { id: 'DA002', name: 'Hạt điều', category: 'snacks', price: 35000, unit: 'gói', status: 'active', image: '🥜' },
    { id: 'DA003', name: 'Bỏng ngô', category: 'snacks', price: 20000, unit: 'gói', status: 'active', image: '🍿' },
    { id: 'DA004', name: 'Khô bò', category: 'snacks', price: 45000, unit: 'gói', status: 'active', image: '🥩' },
    { id: 'TR001', name: 'Dĩa trái cây', category: 'fruits', price: 80000, unit: 'dĩa', status: 'active', image: '🍇' },
    { id: 'TR002', name: 'Dưa hấu', category: 'fruits', price: 50000, unit: 'dĩa', status: 'active', image: '🍉' },
  ]);

  // Combo Packages
  const [combos, setCombos] = useState([
    {
      id: 'CB001',
      name: 'Combo VIP 3h',
      description: 'Phòng VIP 3h + bia + snack',
      price: 1500000,
      originalPrice: 1800000,
      items: [
        { name: 'Phòng VIP 3 giờ', quantity: 1 },
        { name: 'Bia Heineken', quantity: 24 },
        { name: 'Snack khoai tây', quantity: 2 },
      ],
      status: 'active',
      discount: 17,
    },
    {
      id: 'CB002',
      name: 'Combo Party 4h',
      description: 'Phòng Party 4h + bia + snack',
      price: 2500000,
      originalPrice: 3000000,
      items: [
        { name: 'Phòng Party 4 giờ', quantity: 1 },
        { name: 'Bia Tiger', quantity: 48 },
        { name: 'Snack mix', quantity: 5 },
        { name: 'Dĩa trái cây', quantity: 2 },
      ],
      status: 'active',
      discount: 17,
    },
  ]);

  // Inventory Items
  const [inventory, setInventory] = useState([
    { id: 'NL001', name: 'Bia Heineken', category: 'beverage', unit: 'thùng', stock: 45, minStock: 20, maxStock: 100, price: 550000, status: 'good' },
    { id: 'NL002', name: 'Bia Tiger', category: 'beverage', unit: 'thùng', stock: 38, minStock: 20, maxStock: 100, price: 450000, status: 'good' },
    { id: 'NL003', name: 'Nước ngọt Coca', category: 'beverage', unit: 'thùng', stock: 15, minStock: 20, maxStock: 80, price: 320000, status: 'low' },
    { id: 'NL004', name: 'Nước suối', category: 'beverage', unit: 'thùng', stock: 62, minStock: 30, maxStock: 100, price: 80000, status: 'good' },
    { id: 'NL005', name: 'Snack Ostar', category: 'food', unit: 'thùng', stock: 8, minStock: 15, maxStock: 50, price: 280000, status: 'low' },
    { id: 'NL006', name: 'Hạt điều', category: 'food', unit: 'kg', stock: 5, minStock: 10, maxStock: 30, price: 350000, status: 'critical' },
    { id: 'TB001', name: 'Micro không dây', category: 'equipment', unit: 'cái', stock: 48, minStock: 40, maxStock: 60, price: 2500000, status: 'good' },
    { id: 'TB002', name: 'Remote điều khiển', category: 'equipment', unit: 'cái', stock: 35, minStock: 30, maxStock: 50, price: 150000, status: 'good' },
    { id: 'TB003', name: 'Cốc thủy tinh', category: 'equipment', unit: 'lốc', stock: 12, minStock: 20, maxStock: 50, price: 180000, status: 'low' },
  ]);

  const categories = [
    { id: 'all', name: 'Tất cả', icon: '📦' },
    { id: 'drinks', name: 'Đồ uống', icon: '🍹' },
    { id: 'snacks', name: 'Ăn vặt', icon: '🍿' },
    { id: 'fruits', name: 'Trái cây', icon: '🍎' },
  ];

  const inventoryCategories = [
    { id: 'all', name: 'Tất cả', icon: '📦' },
    { id: 'beverage', name: 'Đồ uống', icon: '🍺' },
    { id: 'food', name: 'Thực phẩm', icon: '🍱' },
    { id: 'equipment', name: 'Thiết bị', icon: '🎤' },
  ];

  const filteredMenuItems = menuItems.filter(item => {
    const matchSearch = item.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                       item.id.toLowerCase().includes(searchQuery.toLowerCase());
    const matchCategory = selectedCategory === 'all' || item.category === selectedCategory;
    return matchSearch && matchCategory;
  });

  const filteredInventory = inventory.filter(item => {
    const matchSearch = item.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                       item.id.toLowerCase().includes(searchQuery.toLowerCase());
    const matchCategory = selectedCategory === 'all' || item.category === selectedCategory;
    return matchSearch && matchCategory;
  });

  const stats = {
    totalItems: menuItems.length,
    activeItems: menuItems.filter(i => i.status === 'active').length,
    combos: combos.length,
    inventoryLow: inventory.filter(i => i.status === 'low' || i.status === 'critical').length,
  };

  const handleSaveMenuItem = (itemData: any) => {
    if (editingItem) {
      setMenuItems(prev =>
        prev.map(item => (item.id === editingItem.id ? { ...item, ...itemData } : item))
      );
      toast.success('Đã cập nhật món');
    } else {
      const newItem = {
        id: `${itemData.category.substring(0, 2).toUpperCase()}${(menuItems.length + 1).toString().padStart(3, '0')}`,
        ...itemData,
        status: 'active',
      };
      setMenuItems(prev => [...prev, newItem]);
      toast.success('Đã thêm món mới');
    }
    setIsDialogOpen(false);
    setEditingItem(null);
  };

  const handleDeleteMenuItem = (itemId: string) => {
    if (confirm('Bạn có chắc chắn muốn xóa món này?')) {
      setMenuItems(prev => prev.filter(item => item.id !== itemId));
      toast.success('Đã xóa món');
    }
  };

  const handleSaveCombo = (comboData: any) => {
    if (editingCombo) {
      setCombos(prev =>
        prev.map(combo => (combo.id === editingCombo.id ? { ...combo, ...comboData } : combo))
      );
      toast.success('Đã cập nhật combo');
    } else {
      const newCombo = {
        id: `CB${(combos.length + 1).toString().padStart(3, '0')}`,
        ...comboData,
        status: 'active',
      };
      setCombos(prev => [...prev, newCombo]);
      toast.success('Đã thêm combo mới');
    }
    setIsComboDialogOpen(false);
    setEditingCombo(null);
  };

  const handleUpdateInventory = (itemId: string, stock: number) => {
    setInventory(prev =>
      prev.map(item => {
        if (item.id === itemId) {
          const newStock = stock;
          let status = 'good';
          if (newStock <= item.minStock * 0.5) status = 'critical';
          else if (newStock <= item.minStock) status = 'low';
          return { ...item, stock: newStock, status };
        }
        return item;
      })
    );
    toast.success('Đã cập nhật tồn kho');
  };

  const getStockStatus = (item: any) => {
    if (item.status === 'critical') {
      return { color: 'bg-red-500/20 text-red-400 border-red-500/30', text: 'Rất thấp', icon: AlertTriangle };
    } else if (item.status === 'low') {
      return { color: 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30', text: 'Thấp', icon: AlertTriangle };
    }
    return { color: 'bg-green-500/20 text-green-400 border-green-500/30', text: 'Tốt', icon: CheckCircle2 };
  };

  const renderMenuTab = () => (
    <div className="space-y-3">
      {/* Category Filter */}
      <div className="flex gap-2 overflow-x-auto no-scrollbar pb-2">
        {categories.map((cat) => (
          <button
            key={cat.id}
            onClick={() => setSelectedCategory(cat.id)}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full whitespace-nowrap text-xs transition-all flex-shrink-0 ${
              selectedCategory === cat.id
                ? 'bg-[#ffd700] text-black'
                : 'bg-card text-gray-400 border border-gray-700'
            }`}
            style={{ fontWeight: selectedCategory === cat.id ? 600 : 400 }}
          >
            <span>{cat.icon}</span>
            <span>{cat.name}</span>
          </button>
        ))}
      </div>

      {/* Menu Items */}
      <div className="space-y-2">
        {filteredMenuItems.map((item) => (
          <Card
            key={item.id}
            className="bg-card border-[#ffd700]/30 p-3"
          >
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 rounded-lg bg-[#ffd700]/10 flex items-center justify-center text-2xl flex-shrink-0">
                {item.image}
              </div>

              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-1.5 mb-0.5">
                  <h3 className="text-white text-xs truncate" style={{ fontWeight: 600 }}>
                    {item.name}
                  </h3>
                  <Badge
                    className={`${
                      item.status === 'active'
                        ? 'bg-green-500/20 text-green-400'
                        : 'bg-gray-500/20 text-gray-400'
                    } text-xs px-1.5 py-0 h-auto`}
                  >
                    {item.status === 'active' ? 'Bán' : 'Ngừng'}
                  </Badge>
                </div>
                <p className="text-xs text-gray-400 truncate">{item.id} • {item.unit}</p>
                <p className="text-xs text-[#ffd700] mt-0.5" style={{ fontWeight: 700 }}>
                  {item.price.toLocaleString('vi-VN')}đ
                </p>
              </div>

              <div className="flex gap-1 flex-shrink-0">
                <button
                  onClick={() => {
                    setEditingItem(item);
                    setIsDialogOpen(true);
                  }}
                  className="w-7 h-7 rounded-lg bg-[#ffd700]/20 flex items-center justify-center hover:bg-[#ffd700]/30 transition-colors"
                >
                  <Edit className="w-3.5 h-3.5 text-[#ffd700]" />
                </button>
                <button
                  onClick={() => handleDeleteMenuItem(item.id)}
                  className="w-7 h-7 rounded-lg bg-red-500/20 flex items-center justify-center hover:bg-red-500/30 transition-colors"
                >
                  <Trash2 className="w-3.5 h-3.5 text-red-400" />
                </button>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );

  const renderComboTab = () => (
    <div className="space-y-2">
      {combos.map((combo) => (
        <Card
          key={combo.id}
          className="bg-card border-[#9333ea]/30 p-3"
        >
          <div className="flex items-start justify-between mb-2">
            <div className="flex-1 min-w-0 pr-2">
              <div className="flex items-center gap-1.5 mb-0.5">
                <h3 className="text-white text-xs truncate" style={{ fontWeight: 600 }}>
                  {combo.name}
                </h3>
                <Badge className="bg-pink-500/20 text-pink-400 text-xs px-1.5 py-0 h-auto flex-shrink-0">
                  -{combo.discount}%
                </Badge>
              </div>
              <p className="text-xs text-gray-400 line-clamp-1">{combo.description}</p>
            </div>
          </div>

          <div className="space-y-0.5 mb-2 p-2 bg-[#1a1a24] rounded-lg">
            {combo.items.map((item, idx) => (
              <p key={idx} className="text-xs text-gray-400 truncate">
                • {item.name} x{item.quantity}
              </p>
            ))}
          </div>

          <div className="flex items-center justify-between">
            <div className="min-w-0">
              <p className="text-xs text-gray-400 line-through truncate">
                {combo.originalPrice.toLocaleString('vi-VN')}đ
              </p>
              <p className="text-xs text-[#ffd700] truncate" style={{ fontWeight: 700 }}>
                {combo.price.toLocaleString('vi-VN')}đ
              </p>
            </div>
            <div className="flex gap-1 flex-shrink-0">
              <button
                onClick={() => {
                  setEditingCombo(combo);
                  setIsComboDialogOpen(true);
                }}
                className="px-2 py-1 rounded-lg bg-[#ffd700]/20 text-[#ffd700] text-xs hover:bg-[#ffd700]/30 transition-colors"
              >
                Sửa
              </button>
              <button
                onClick={() => {
                  if (confirm('Xóa combo này?')) {
                    setCombos(prev => prev.filter(c => c.id !== combo.id));
                    toast.success('Đã xóa combo');
                  }
                }}
                className="px-2 py-1 rounded-lg bg-red-500/20 text-red-400 text-xs hover:bg-red-500/30 transition-colors"
              >
                Xóa
              </button>
            </div>
          </div>
        </Card>
      ))}
    </div>
  );

  const renderInventoryTab = () => (
    <div className="space-y-3">
      {/* Category Filter */}
      <div className="flex gap-2 overflow-x-auto no-scrollbar pb-2">
        {inventoryCategories.map((cat) => (
          <button
            key={cat.id}
            onClick={() => setSelectedCategory(cat.id)}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full whitespace-nowrap text-xs transition-all flex-shrink-0 ${
              selectedCategory === cat.id
                ? 'bg-[#9333ea] text-white'
                : 'bg-card text-gray-400 border border-gray-700'
            }`}
            style={{ fontWeight: selectedCategory === cat.id ? 600 : 400 }}
          >
            <span>{cat.icon}</span>
            <span>{cat.name}</span>
          </button>
        ))}
      </div>

      {/* Inventory Items */}
      <div className="space-y-2">
        {filteredInventory.map((item) => {
          const statusInfo = getStockStatus(item);
          const StatusIcon = statusInfo.icon;
          const stockPercentage = (item.stock / item.maxStock) * 100;

          return (
            <Card
              key={item.id}
              className="bg-card border-[#9333ea]/30 p-3"
            >
              <div className="flex items-start justify-between mb-2">
                <div className="flex-1 min-w-0 pr-2">
                  <div className="flex items-center gap-1.5 mb-0.5">
                    <h3 className="text-white text-xs truncate" style={{ fontWeight: 600 }}>
                      {item.name}
                    </h3>
                    <Badge className={`${statusInfo.color} text-xs flex items-center gap-0.5 px-1.5 py-0 h-auto flex-shrink-0`}>
                      <StatusIcon className="w-2.5 h-2.5" />
                      {statusInfo.text}
                    </Badge>
                  </div>
                  <p className="text-xs text-gray-400 truncate">{item.id} • {item.unit}</p>
                </div>
              </div>

              <div className="space-y-1.5 mb-2">
                <div className="flex items-center justify-between text-xs">
                  <span className="text-gray-400">Tồn kho:</span>
                  <span className="text-white" style={{ fontWeight: 600 }}>
                    {item.stock} {item.unit}
                  </span>
                </div>
                <div className="w-full bg-gray-700 rounded-full h-1.5">
                  <div
                    className={`h-1.5 rounded-full transition-all ${
                      item.status === 'critical'
                        ? 'bg-red-500'
                        : item.status === 'low'
                        ? 'bg-yellow-500'
                        : 'bg-green-500'
                    }`}
                    style={{ width: `${Math.min(stockPercentage, 100)}%` }}
                  />
                </div>
                <div className="flex items-center justify-between text-xs text-gray-400">
                  <span>Tối thiểu: {item.minStock}</span>
                  <span>Tối đa: {item.maxStock}</span>
                </div>
              </div>

              <div className="flex items-center justify-between pt-2 border-t border-[#ffd700]/10">
                <div className="min-w-0 pr-2">
                  <p className="text-xs text-gray-400">Giá nhập</p>
                  <p className="text-xs text-[#ffd700] truncate" style={{ fontWeight: 600 }}>
                    {item.price.toLocaleString('vi-VN')}đ
                  </p>
                </div>
                <button
                  onClick={() => {
                    const newStock = prompt(`Nhập số lượng (${item.unit}):`, item.stock.toString());
                    if (newStock) {
                      handleUpdateInventory(item.id, parseInt(newStock));
                    }
                  }}
                  className="px-2 py-1 rounded-lg bg-[#9333ea]/20 text-[#9333ea] text-xs hover:bg-[#9333ea]/30 transition-colors flex-shrink-0"
                >
                  Cập nhật
                </button>
              </div>
            </Card>
          );
        })}
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-background pb-20">
      {/* Header */}
      <div className="sticky top-0 z-50 bg-gradient-to-br from-[#9333ea] to-[#6b21a8] p-4 rounded-b-[20px]">
        <div className="flex items-center gap-3 mb-3">
          <button
            onClick={onBack}
            className="w-9 h-9 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20 flex-shrink-0"
          >
            <ArrowLeft className="w-5 h-5 text-white" />
          </button>
          <div className="flex-1 min-w-0">
            <h1 className="text-sm text-white truncate" style={{ fontWeight: 700 }}>
              Quản lý dịch vụ & kho
            </h1>
            <p className="text-xs text-gray-300">Menu & nguyên vật liệu</p>
          </div>
          {activeTab === 'menu' && (
            <Button
              size="sm"
              className="bg-[#ffd700] hover:bg-[#ffed4e] text-black h-8 rounded-full px-3 flex-shrink-0"
              onClick={() => {
                setEditingItem(null);
                setIsDialogOpen(true);
              }}
            >
              <Plus className="w-3.5 h-3.5 mr-1" />
              <span className="text-xs">Thêm</span>
            </Button>
          )}
          {activeTab === 'combo' && (
            <Button
              size="sm"
              className="bg-[#ffd700] hover:bg-[#ffed4e] text-black h-8 rounded-full px-3 flex-shrink-0"
              onClick={() => {
                setEditingCombo(null);
                setIsComboDialogOpen(true);
              }}
            >
              <Plus className="w-3.5 h-3.5 mr-1" />
              <span className="text-xs">Combo</span>
            </Button>
          )}
        </div>

        {/* Stats */}
        <div className="grid grid-cols-4 gap-2">
          <div className="bg-white/10 backdrop-blur-sm rounded-lg p-1.5 text-center">
            <p className="text-sm text-white" style={{ fontWeight: 700 }}>{stats.activeItems}</p>
            <p className="text-xs text-gray-300">Món</p>
          </div>
          <div className="bg-white/10 backdrop-blur-sm rounded-lg p-1.5 text-center">
            <p className="text-sm text-white" style={{ fontWeight: 700 }}>{stats.combos}</p>
            <p className="text-xs text-gray-300">Combo</p>
          </div>
          <div className="bg-white/10 backdrop-blur-sm rounded-lg p-1.5 text-center">
            <p className="text-sm text-white" style={{ fontWeight: 700 }}>{inventory.length}</p>
            <p className="text-xs text-gray-300">NVL</p>
          </div>
          <div className="bg-white/10 backdrop-blur-sm rounded-lg p-1.5 text-center">
            <p className="text-sm text-red-300" style={{ fontWeight: 700 }}>{stats.inventoryLow}</p>
            <p className="text-xs text-gray-300">Cảnh báo</p>
          </div>
        </div>
      </div>

      {/* Search */}
      <div className="px-4 pt-3">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
          <Input
            placeholder="Tìm kiếm..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10 bg-card border-[#ffd700]/30 text-white h-9 text-sm"
          />
        </div>
      </div>

      {/* Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="px-4 pt-3">
        <TabsList className="grid w-full grid-cols-3 bg-card h-9">
          <TabsTrigger value="menu" className="text-xs">
            Menu
          </TabsTrigger>
          <TabsTrigger value="combo" className="text-xs">
            Combo
          </TabsTrigger>
          <TabsTrigger value="inventory" className="text-xs">
            Kho
          </TabsTrigger>
        </TabsList>

        <ScrollArea className="h-[calc(100vh-300px)] mt-3">
          <TabsContent value="menu" className="mt-0">{renderMenuTab()}</TabsContent>
          <TabsContent value="combo" className="mt-0">{renderComboTab()}</TabsContent>
          <TabsContent value="inventory" className="mt-0">{renderInventoryTab()}</TabsContent>
        </ScrollArea>
      </Tabs>

      {/* Menu Item Dialog */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <MenuItemDialog
          item={editingItem}
          onSave={handleSaveMenuItem}
          onClose={() => {
            setIsDialogOpen(false);
            setEditingItem(null);
          }}
        />
      </Dialog>

      {/* Combo Dialog */}
      <Dialog open={isComboDialogOpen} onOpenChange={setIsComboDialogOpen}>
        <ComboDialog
          combo={editingCombo}
          onSave={handleSaveCombo}
          onClose={() => {
            setIsComboDialogOpen(false);
            setEditingCombo(null);
          }}
        />
      </Dialog>
    </div>
  );
}

// Menu Item Dialog
function MenuItemDialog({ item, onSave, onClose }: any) {
  const [formData, setFormData] = useState(
    item || {
      name: '',
      category: 'drinks',
      price: 0,
      unit: 'ly',
      image: '🍹',
    }
  );

  return (
    <DialogContent className="bg-card border-[#ffd700]/30 text-white w-[90vw] max-w-[360px]" aria-describedby={undefined}>
      <DialogHeader>
        <DialogTitle className="text-sm">{item ? 'Chỉnh sửa món' : 'Thêm món mới'}</DialogTitle>
      </DialogHeader>
      <div className="space-y-3 py-3">
        <div>
          <Label htmlFor="name" className="text-xs text-gray-400 mb-1 block">
            Tên món *
          </Label>
          <Input
            id="name"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            className="bg-[#1a1a24] border-gray-700 text-white h-9 text-sm"
            placeholder="VD: Nước ngọt"
          />
        </div>

        <div>
          <Label htmlFor="category" className="text-xs text-gray-400 mb-1 block">
            Danh mục
          </Label>
          <Select
            value={formData.category}
            onValueChange={(value) => setFormData({ ...formData, category: value })}
          >
            <SelectTrigger className="bg-[#1a1a24] border-gray-700 h-9 text-sm">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="drinks">Đồ uống</SelectItem>
              <SelectItem value="snacks">Đồ ăn vặt</SelectItem>
              <SelectItem value="fruits">Trái cây</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="grid grid-cols-2 gap-2">
          <div>
            <Label htmlFor="price" className="text-xs text-gray-400 mb-1 block">
              Giá (đ)
            </Label>
            <Input
              id="price"
              type="number"
              value={formData.price}
              onChange={(e) => setFormData({ ...formData, price: parseInt(e.target.value) || 0 })}
              className="bg-[#1a1a24] border-gray-700 text-white h-9 text-sm"
              placeholder="15000"
            />
          </div>

          <div>
            <Label htmlFor="unit" className="text-xs text-gray-400 mb-1 block">
              Đơn vị
            </Label>
            <Input
              id="unit"
              value={formData.unit}
              onChange={(e) => setFormData({ ...formData, unit: e.target.value })}
              className="bg-[#1a1a24] border-gray-700 text-white h-9 text-sm"
              placeholder="ly, lon"
            />
          </div>
        </div>

        <div>
          <Label htmlFor="image" className="text-xs text-gray-400 mb-1 block">
            Icon (emoji)
          </Label>
          <Input
            id="image"
            value={formData.image}
            onChange={(e) => setFormData({ ...formData, image: e.target.value })}
            className="bg-[#1a1a24] border-gray-700 text-white h-9 text-sm"
            placeholder="🍹"
          />
        </div>
      </div>

      <div className="flex gap-2">
        <Button
          variant="outline"
          className="flex-1 border-gray-700 text-white hover:bg-gray-800 h-9 text-sm"
          onClick={onClose}
        >
          Hủy
        </Button>
        <Button
          className="flex-1 bg-[#ffd700] hover:bg-[#ffed4e] text-black h-9 text-sm"
          onClick={() => onSave(formData)}
        >
          {item ? 'Cập nhật' : 'Thêm'}
        </Button>
      </div>
    </DialogContent>
  );
}

// Combo Dialog
function ComboDialog({ combo, onSave, onClose }: any) {
  const [formData, setFormData] = useState(
    combo || {
      name: '',
      description: '',
      price: 0,
      originalPrice: 0,
      discount: 0,
      items: [{ name: '', quantity: 1 }],
    }
  );

  const addItem = () => {
    setFormData({
      ...formData,
      items: [...formData.items, { name: '', quantity: 1 }],
    });
  };

  const removeItem = (index: number) => {
    setFormData({
      ...formData,
      items: formData.items.filter((_: any, i: number) => i !== index),
    });
  };

  const updateItem = (index: number, field: string, value: any) => {
    setFormData({
      ...formData,
      items: formData.items.map((item: any, i: number) =>
        i === index ? { ...item, [field]: value } : item
      ),
    });
  };

  const calculateDiscount = () => {
    if (formData.originalPrice > 0 && formData.price > 0) {
      const discount = Math.round(
        ((formData.originalPrice - formData.price) / formData.originalPrice) * 100
      );
      setFormData({ ...formData, discount });
    }
  };

  return (
    <DialogContent className="bg-card border-[#ffd700]/30 text-white w-[90vw] max-w-[360px]" aria-describedby={undefined}>
      <DialogHeader>
        <DialogTitle className="text-sm">{combo ? 'Chỉnh sửa combo' : 'Thêm combo mới'}</DialogTitle>
      </DialogHeader>
      <ScrollArea className="max-h-[60vh]">
        <div className="space-y-3 py-3 pr-3">
          <div>
            <Label htmlFor="name" className="text-xs text-gray-400 mb-1 block">
              Tên combo *
            </Label>
            <Input
              id="name"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="bg-[#1a1a24] border-gray-700 text-white h-9 text-sm"
              placeholder="VD: Combo VIP 3h"
            />
          </div>

          <div>
            <Label htmlFor="description" className="text-xs text-gray-400 mb-1 block">
              Mô tả
            </Label>
            <Textarea
              id="description"
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              className="bg-[#1a1a24] border-gray-700 text-white min-h-[60px] text-sm"
              placeholder="Mô tả chi tiết combo..."
            />
          </div>

          <div>
            <Label className="text-xs text-gray-400 mb-1.5 block">
              Danh sách sản phẩm
            </Label>
            {formData.items.map((item: any, idx: number) => (
              <div key={idx} className="flex gap-1.5 mb-1.5">
                <Input
                  value={item.name}
                  onChange={(e) => updateItem(idx, 'name', e.target.value)}
                  className="bg-[#1a1a24] border-gray-700 text-white flex-1 h-8 text-sm"
                  placeholder="Tên sản phẩm"
                />
                <Input
                  type="number"
                  value={item.quantity}
                  onChange={(e) => updateItem(idx, 'quantity', parseInt(e.target.value) || 1)}
                  className="bg-[#1a1a24] border-gray-700 text-white w-14 h-8 text-sm"
                  placeholder="SL"
                />
                {formData.items.length > 1 && (
                  <button
                    onClick={() => removeItem(idx)}
                    className="w-8 h-8 rounded bg-red-500/20 text-red-400 flex items-center justify-center flex-shrink-0"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                )}
              </div>
            ))}
            <Button
              size="sm"
              variant="outline"
              className="w-full border-gray-700 text-gray-400 h-8 text-xs"
              onClick={addItem}
            >
              <Plus className="w-3 h-3 mr-1" />
              Thêm sản phẩm
            </Button>
          </div>

          <div className="grid grid-cols-2 gap-2">
            <div>
              <Label htmlFor="originalPrice" className="text-xs text-gray-400 mb-1 block">
                Giá gốc (đ)
              </Label>
              <Input
                id="originalPrice"
                type="number"
                value={formData.originalPrice}
                onChange={(e) =>
                  setFormData({ ...formData, originalPrice: parseInt(e.target.value) || 0 })
                }
                onBlur={calculateDiscount}
                className="bg-[#1a1a24] border-gray-700 text-white h-9 text-sm"
              />
            </div>

            <div>
              <Label htmlFor="price" className="text-xs text-gray-400 mb-1 block">
                Giá combo (đ)
              </Label>
              <Input
                id="price"
                type="number"
                value={formData.price}
                onChange={(e) =>
                  setFormData({ ...formData, price: parseInt(e.target.value) || 0 })
                }
                onBlur={calculateDiscount}
                className="bg-[#1a1a24] border-gray-700 text-white h-9 text-sm"
              />
            </div>
          </div>

          {formData.discount > 0 && (
            <div className="p-2 bg-pink-500/10 border border-pink-500/30 rounded-lg text-center">
              <p className="text-xs text-gray-400 mb-0.5">Giảm giá</p>
              <p className="text-base text-pink-400" style={{ fontWeight: 700 }}>
                {formData.discount}%
              </p>
              <p className="text-xs text-gray-400 mt-0.5">
                Tiết kiệm: {(formData.originalPrice - formData.price).toLocaleString('vi-VN')}đ
              </p>
            </div>
          )}
        </div>
      </ScrollArea>

      <div className="flex gap-2">
        <Button
          variant="outline"
          className="flex-1 border-gray-700 text-white hover:bg-gray-800 h-9 text-sm"
          onClick={onClose}
        >
          Hủy
        </Button>
        <Button
          className="flex-1 bg-[#ffd700] hover:bg-[#ffed4e] text-black h-9 text-sm"
          onClick={() => onSave(formData)}
        >
          {combo ? 'Cập nhật' : 'Thêm'}
        </Button>
      </div>
    </DialogContent>
  );
}
