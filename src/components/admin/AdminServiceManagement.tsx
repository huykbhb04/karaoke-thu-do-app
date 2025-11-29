import { useState } from 'react';
import {
  ArrowLeft, Plus, Edit, Trash2, Search, Package, TrendingUp, AlertCircle, Copy, RefreshCw
} from 'lucide-react';
import { Button } from '../ui/button';
import { Card } from '../ui/card';
import { Badge } from '../ui/badge';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '../ui/dialog';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';
import { ScrollArea } from '../ui/scroll-area';
import { Textarea } from '../ui/textarea';
import { Switch } from '../ui/switch';
import { toast } from 'sonner@2.0.3';

interface AdminServiceManagementProps {
  onBack: () => void;
}

export function AdminServiceManagement({ onBack }: AdminServiceManagementProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [activeTab, setActiveTab] = useState('services');
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<any>(null);
  const [dialogType, setDialogType] = useState<'service' | 'combo'>('service');

  const categories = [
    { id: 'all', name: 'Tất cả', icon: '📦' },
    { id: 'drinks', name: 'Đồ uống', icon: '🍹' },
    { id: 'food', name: 'Thức ăn', icon: '🍱' },
    { id: 'snacks', name: 'Snack', icon: '🍿' },
    { id: 'fruits', name: 'Trái cây', icon: '🍎' },
    { id: 'special', name: 'Đặc biệt', icon: '⭐' },
  ];

  const [services, setServices] = useState([
    // Drinks
    { 
      id: 'SV001', 
      name: 'Bia Heineken', 
      category: 'drinks',
      price: 25000,
      cost: 18000,
      unit: 'lon',
      status: 'active',
      syncedBranches: ['Trần Duy Hưng', 'Nguyễn Huệ', 'Láng Hạ'],
      stock: { 'Trần Duy Hưng': 248, 'Nguyễn Huệ': 186, 'Láng Hạ': 312 },
      sold: 746,
    },
    { 
      id: 'SV002', 
      name: 'Bia Tiger', 
      category: 'drinks',
      price: 20000,
      cost: 15000,
      unit: 'lon',
      status: 'active',
      syncedBranches: ['Trần Duy Hưng', 'Nguyễn Huệ', 'Láng Hạ'],
      stock: { 'Trần Duy Hưng': 172, 'Nguyễn Huệ': 145, 'Láng Hạ': 228 },
      sold: 545,
    },
    { 
      id: 'SV003', 
      name: 'Nước ngọt Coca', 
      category: 'drinks',
      price: 15000,
      cost: 10000,
      unit: 'lon',
      status: 'active',
      syncedBranches: ['Trần Duy Hưng', 'Nguyễn Huệ'],
      stock: { 'Trần Duy Hưng': 312, 'Nguyễn Huệ': 265, 'Láng Hạ': 0 },
      sold: 577,
    },
    { 
      id: 'SV004', 
      name: 'Nước suối', 
      category: 'drinks',
      price: 10000,
      cost: 6000,
      unit: 'chai',
      status: 'active',
      syncedBranches: ['Trần Duy Hưng', 'Nguyễn Huệ', 'Láng Hạ'],
      stock: { 'Trần Duy Hưng': 420, 'Nguyễn Huệ': 385, 'Láng Hạ': 510 },
      sold: 1315,
    },

    // Snacks
    { 
      id: 'SV005', 
      name: 'Snack khoai tây', 
      category: 'snacks',
      price: 25000,
      cost: 15000,
      unit: 'gói',
      status: 'active',
      syncedBranches: ['Trần Duy Hưng', 'Nguyễn Huệ', 'Láng Hạ'],
      stock: { 'Trần Duy Hưng': 186, 'Nguyễn Huệ': 142, 'Láng Hạ': 205 },
      sold: 533,
    },
    { 
      id: 'SV006', 
      name: 'Đậu phộng', 
      category: 'snacks',
      price: 20000,
      cost: 12000,
      unit: 'gói',
      status: 'active',
      syncedBranches: ['Trần Duy Hưng', 'Nguyễn Huệ', 'Láng Hạ'],
      stock: { 'Trần Duy Hưng': 95, 'Nguyễn Huệ': 78, 'Láng Hạ': 112 },
      sold: 285,
    },

    // Fruits
    { 
      id: 'SV007', 
      name: 'Dĩa trái cây', 
      category: 'fruits',
      price: 80000,
      cost: 50000,
      unit: 'dĩa',
      status: 'active',
      syncedBranches: ['Trần Duy Hưng', 'Nguyễn Huệ', 'Láng Hạ'],
      stock: { 'Trần Duy Hưng': 95, 'Nguyễn Huệ': 72, 'Láng Hạ': 86 },
      sold: 253,
    },

    // Food
    { 
      id: 'SV008', 
      name: 'Mì tôm trứng', 
      category: 'food',
      price: 35000,
      cost: 20000,
      unit: 'tô',
      status: 'active',
      syncedBranches: ['Trần Duy Hưng', 'Nguyễn Huệ'],
      stock: { 'Trần Duy Hưng': 58, 'Nguyễn Huệ': 42, 'Láng Hạ': 0 },
      sold: 100,
    },
  ]);

  const [combos, setCombos] = useState([
    {
      id: 'CB001',
      name: 'Combo Sinh nhật VIP',
      description: '2 Heineken + 1 Dĩa trái cây + Snack',
      items: ['SV001', 'SV007', 'SV005'],
      originalPrice: 130000,
      salePrice: 99000,
      discount: 24,
      status: 'active',
      sold: 45,
    },
    {
      id: 'CB002',
      name: 'Combo Bạn bè',
      description: '4 Tiger + 2 Snack khoai tây',
      items: ['SV002', 'SV005'],
      originalPrice: 130000,
      salePrice: 110000,
      discount: 15,
      status: 'active',
      sold: 78,
    },
    {
      id: 'CB003',
      name: 'Combo Gia đình',
      description: '4 Nước ngọt + 2 Dĩa trái cây + 2 Snack',
      items: ['SV003', 'SV007', 'SV005'],
      originalPrice: 270000,
      salePrice: 220000,
      discount: 19,
      status: 'active',
      sold: 32,
    },
  ]);

  const filteredServices = services.filter(service => {
    const matchSearch = service.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchCategory = selectedCategory === 'all' || service.category === selectedCategory;
    return matchSearch && matchCategory;
  });

  const filteredCombos = combos.filter(combo =>
    combo.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const stats = {
    totalServices: services.length,
    activeServices: services.filter(s => s.status === 'active').length,
    totalCombos: combos.length,
    totalStock: Object.values(
      services.reduce((acc: any, s) => {
        Object.entries(s.stock).forEach(([branch, qty]) => {
          acc[branch] = (acc[branch] || 0) + qty;
        });
        return acc;
      }, {})
    ).reduce((sum: number, qty: any) => sum + qty, 0),
  };

  const getCategoryInfo = (categoryId: string) => {
    return categories.find(c => c.id === categoryId) || categories[0];
  };

  const getStatusInfo = (status: string) => {
    switch (status) {
      case 'active': return { text: 'Đang bán', color: 'bg-green-500/20 text-green-400 border-green-500/30' };
      case 'inactive': return { text: 'Ngừng bán', color: 'bg-red-500/20 text-red-400 border-red-500/30' };
      case 'out_of_stock': return { text: 'Hết hàng', color: 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30' };
      default: return { text: status, color: 'bg-gray-500/20 text-gray-400' };
    }
  };

  const handleSaveService = (serviceData: any) => {
    if (editingItem) {
      setServices(prev =>
        prev.map(service => (service.id === editingItem.id ? { ...service, ...serviceData } : service))
      );
      toast.success('Đã cập nhật dịch vụ');
    } else {
      const newService = {
        id: `SV${(services.length + 1).toString().padStart(3, '0')}`,
        ...serviceData,
        stock: {
          'Trần Duy Hưng': 0,
          'Nguyễn Huệ': 0,
          'Láng Hạ': 0,
        },
        sold: 0,
      };
      setServices(prev => [...prev, newService]);
      toast.success('Đã thêm dịch vụ mới');
    }
    setIsDialogOpen(false);
    setEditingItem(null);
  };

  const handleSaveCombo = (comboData: any) => {
    if (editingItem) {
      setCombos(prev =>
        prev.map(combo => (combo.id === editingItem.id ? { ...combo, ...comboData } : combo))
      );
      toast.success('Đã cập nhật combo');
    } else {
      const newCombo = {
        id: `CB${(combos.length + 1).toString().padStart(3, '0')}`,
        ...comboData,
        sold: 0,
      };
      setCombos(prev => [...prev, newCombo]);
      toast.success('Đã tạo combo mới');
    }
    setIsDialogOpen(false);
    setEditingItem(null);
  };

  const handleDeleteService = (serviceId: string) => {
    if (confirm('Bạn có chắc chắn muốn xóa dịch vụ này?')) {
      setServices(prev => prev.filter(service => service.id !== serviceId));
      toast.success('Đã xóa dịch vụ');
    }
  };

  const handleDeleteCombo = (comboId: string) => {
    if (confirm('Bạn có chắc chắn muốn xóa combo này?')) {
      setCombos(prev => prev.filter(combo => combo.id !== comboId));
      toast.success('Đã xóa combo');
    }
  };

  const handleSyncToBranches = (serviceId: string) => {
    toast.success('Đang đồng bộ dịch vụ đến các cơ sở...');
  };

  const handleDuplicateService = (service: any) => {
    const duplicated = {
      ...service,
      id: `SV${(services.length + 1).toString().padStart(3, '0')}`,
      name: `${service.name} (Copy)`,
      sold: 0,
    };
    setServices(prev => [...prev, duplicated]);
    toast.success('Đã sao chép dịch vụ');
  };

  const renderServicesTab = () => (
    <ScrollArea className="h-[calc(100vh-340px)] mt-3">
      <div className="space-y-2">
        {filteredServices.map((service) => {
          const categoryInfo = getCategoryInfo(service.category);
          const statusInfo = getStatusInfo(service.status);
          const totalStock = Object.values(service.stock).reduce((sum: number, qty: any) => sum + qty, 0);
          const profit = service.price - service.cost;
          const profitMargin = ((profit / service.price) * 100).toFixed(0);

          return (
            <Card key={service.id} className="bg-card border-gray-700/30 p-3">
              <div className="flex items-start gap-3 mb-2">
                <div className="w-10 h-10 rounded-lg bg-amber-500/20 flex items-center justify-center text-xl flex-shrink-0">
                  {categoryInfo.icon}
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <h3 className="text-white text-sm truncate" style={{ fontWeight: 600 }}>
                      {service.name}
                    </h3>
                    <Badge className={`${statusInfo.color} text-xs px-1.5 py-0 h-auto`}>
                      {statusInfo.text}
                    </Badge>
                  </div>
                  <p className="text-xs text-gray-400 mb-1">
                    {categoryInfo.name} • {service.unit}
                  </p>
                  <div className="flex items-center gap-2 text-xs">
                    <span className="text-[#ffd700]" style={{ fontWeight: 600 }}>
                      {service.price.toLocaleString('vi-VN')}đ
                    </span>
                    <span className="text-gray-500">•</span>
                    <span className="text-gray-400">
                      Vốn: {service.cost.toLocaleString('vi-VN')}đ
                    </span>
                    <span className="text-gray-500">•</span>
                    <span className="text-green-400">
                      +{profitMargin}%
                    </span>
                  </div>
                </div>

                <div className="flex flex-col gap-1 flex-shrink-0">
                  <button
                    onClick={() => {
                      setEditingItem(service);
                      setDialogType('service');
                      setIsDialogOpen(true);
                    }}
                    className="w-7 h-7 rounded bg-amber-500/20 text-amber-400 flex items-center justify-center hover:bg-amber-500/30"
                  >
                    <Edit className="w-3.5 h-3.5" />
                  </button>
                  <button
                    onClick={() => handleDuplicateService(service)}
                    className="w-7 h-7 rounded bg-blue-500/20 text-blue-400 flex items-center justify-center hover:bg-blue-500/30"
                  >
                    <Copy className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>

              {/* Stock per branch */}
              <div className="grid grid-cols-3 gap-2 mb-2">
                {Object.entries(service.stock).map(([branch, qty]: any) => (
                  <div key={branch} className="text-center p-1.5 bg-[#1a1a24] rounded">
                    <p className="text-xs text-white" style={{ fontWeight: 600 }}>{qty}</p>
                    <p className="text-xs text-gray-400 truncate">{branch.split(' ')[0]}</p>
                  </div>
                ))}
              </div>

              {/* Stats */}
              <div className="flex items-center justify-between text-xs pt-2 border-t border-gray-700/30">
                <div className="flex items-center gap-3">
                  <span className="text-gray-400">
                    Tồn kho: <span className="text-white">{totalStock}</span>
                  </span>
                  <span className="text-gray-500">•</span>
                  <span className="text-gray-400">
                    Đã bán: <span className="text-white">{service.sold}</span>
                  </span>
                </div>
                <button
                  onClick={() => handleSyncToBranches(service.id)}
                  className="flex items-center gap-1 text-blue-400 hover:text-blue-300"
                >
                  <RefreshCw className="w-3 h-3" />
                  Đồng bộ
                </button>
              </div>

              {/* Synced branches */}
              <div className="flex items-center gap-1 mt-2 pt-2 border-t border-gray-700/30">
                <span className="text-xs text-gray-400">Đã đồng bộ:</span>
                <div className="flex flex-wrap gap-1">
                  {service.syncedBranches.map((branch: string) => (
                    <Badge key={branch} className="bg-green-500/20 text-green-400 text-xs px-1.5 py-0 h-auto">
                      {branch.split(' ')[0]}
                    </Badge>
                  ))}
                </div>
              </div>
            </Card>
          );
        })}
      </div>
    </ScrollArea>
  );

  const renderCombosTab = () => (
    <ScrollArea className="h-[calc(100vh-340px)] mt-3">
      <div className="space-y-2">
        {filteredCombos.map((combo) => {
          const statusInfo = getStatusInfo(combo.status);

          return (
            <Card key={combo.id} className="bg-card border-gray-700/30 p-3">
              <div className="flex items-start gap-3 mb-2">
                <div className="w-10 h-10 rounded-lg bg-pink-500/20 flex items-center justify-center text-xl flex-shrink-0">
                  🎁
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <h3 className="text-white text-sm truncate" style={{ fontWeight: 600 }}>
                      {combo.name}
                    </h3>
                    <Badge className={`${statusInfo.color} text-xs px-1.5 py-0 h-auto`}>
                      {statusInfo.text}
                    </Badge>
                  </div>
                  <p className="text-xs text-gray-400 mb-2 line-clamp-2">
                    {combo.description}
                  </p>
                  <div className="flex items-center gap-2 text-xs">
                    <span className="text-gray-400 line-through">
                      {combo.originalPrice.toLocaleString('vi-VN')}đ
                    </span>
                    <span className="text-[#ffd700]" style={{ fontWeight: 700 }}>
                      {combo.salePrice.toLocaleString('vi-VN')}đ
                    </span>
                    <Badge className="bg-red-500/20 text-red-400 text-xs px-1.5 py-0 h-auto">
                      -{combo.discount}%
                    </Badge>
                  </div>
                </div>

                <div className="flex flex-col gap-1 flex-shrink-0">
                  <button
                    onClick={() => {
                      setEditingItem(combo);
                      setDialogType('combo');
                      setIsDialogOpen(true);
                    }}
                    className="w-7 h-7 rounded bg-pink-500/20 text-pink-400 flex items-center justify-center hover:bg-pink-500/30"
                  >
                    <Edit className="w-3.5 h-3.5" />
                  </button>
                  <button
                    onClick={() => handleDeleteCombo(combo.id)}
                    className="w-7 h-7 rounded bg-red-500/20 text-red-400 flex items-center justify-center hover:bg-red-500/30"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>

              {/* Stats */}
              <div className="flex items-center justify-between text-xs pt-2 border-t border-gray-700/30">
                <span className="text-gray-400">
                  Đã bán: <span className="text-white">{combo.sold}</span>
                </span>
                <span className="text-green-400">
                  Tiết kiệm: {(combo.originalPrice - combo.salePrice).toLocaleString('vi-VN')}đ
                </span>
              </div>
            </Card>
          );
        })}
      </div>
    </ScrollArea>
  );

  const renderStockTab = () => {
    const branchStock = ['Trần Duy Hưng', 'Nguyễn Huệ', 'Láng Hạ'].map(branch => {
      const items = services.map(service => ({
        ...service,
        qty: service.stock[branch] || 0,
      }));
      const totalQty = items.reduce((sum, item) => sum + item.qty, 0);
      const lowStock = items.filter(item => item.qty < 50).length;

      return { branch, items, totalQty, lowStock };
    });

    return (
      <ScrollArea className="h-[calc(100vh-340px)] mt-3">
        <div className="space-y-3">
          {branchStock.map((branchData) => (
            <Card key={branchData.branch} className="bg-card border-gray-700/30 p-4">
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-white text-sm" style={{ fontWeight: 600 }}>
                  {branchData.branch}
                </h3>
                <div className="flex items-center gap-2">
                  <Badge className="bg-blue-500/20 text-blue-400 text-xs">
                    {branchData.totalQty} items
                  </Badge>
                  {branchData.lowStock > 0 && (
                    <Badge className="bg-yellow-500/20 text-yellow-400 text-xs">
                      <AlertCircle className="w-3 h-3 mr-1" />
                      {branchData.lowStock} sắp hết
                    </Badge>
                  )}
                </div>
              </div>

              <div className="space-y-2">
                {branchData.items
                  .filter(item => item.qty > 0)
                  .sort((a, b) => a.qty - b.qty)
                  .slice(0, 5)
                  .map((item) => {
                    const categoryInfo = getCategoryInfo(item.category);
                    const isLowStock = item.qty < 50;

                    return (
                      <div key={item.id} className="flex items-center justify-between py-1.5 border-b border-gray-700/30 last:border-0">
                        <div className="flex items-center gap-2 flex-1 min-w-0">
                          <span className="text-sm">{categoryInfo.icon}</span>
                          <span className="text-xs text-white truncate">{item.name}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          {isLowStock && <AlertCircle className="w-3 h-3 text-yellow-400" />}
                          <span className={`text-xs ${isLowStock ? 'text-yellow-400' : 'text-white'}`} style={{ fontWeight: 600 }}>
                            {item.qty}
                          </span>
                        </div>
                      </div>
                    );
                  })}
              </div>
            </Card>
          ))}
        </div>
      </ScrollArea>
    );
  };

  return (
    <div className="min-h-screen bg-background pb-20">
      {/* Header */}
      <div className="sticky top-0 z-50 bg-gradient-to-br from-amber-500 to-orange-600 p-4 rounded-b-[20px]">
        <div className="flex items-center gap-3 mb-3">
          <button
            onClick={onBack}
            className="w-9 h-9 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20"
          >
            <ArrowLeft className="w-5 h-5 text-white" />
          </button>
          <div className="flex-1">
            <h1 className="text-sm text-white" style={{ fontWeight: 700 }}>
              Quản lý dịch vụ
            </h1>
            <p className="text-xs text-gray-900/70">Hàng hóa & tồn kho</p>
          </div>
          <Button
            size="sm"
            className="bg-white hover:bg-gray-100 text-black h-8 rounded-full px-3"
            onClick={() => {
              setEditingItem(null);
              setDialogType(activeTab === 'combos' ? 'combo' : 'service');
              setIsDialogOpen(true);
            }}
          >
            <Plus className="w-4 h-4 mr-1" />
            <span className="text-xs">Thêm</span>
          </Button>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-4 gap-2">
          <div className="bg-white/20 backdrop-blur-sm rounded-lg p-1.5 text-center">
            <p className="text-sm text-white" style={{ fontWeight: 700 }}>{stats.totalServices}</p>
            <p className="text-xs text-gray-900/70">Dịch vụ</p>
          </div>
          <div className="bg-white/20 backdrop-blur-sm rounded-lg p-1.5 text-center">
            <p className="text-sm text-white" style={{ fontWeight: 700 }}>{stats.totalCombos}</p>
            <p className="text-xs text-gray-900/70">Combo</p>
          </div>
          <div className="bg-white/20 backdrop-blur-sm rounded-lg p-1.5 text-center">
            <p className="text-sm text-white" style={{ fontWeight: 700 }}>{stats.totalStock}</p>
            <p className="text-xs text-gray-900/70">Tồn kho</p>
          </div>
          <div className="bg-white/20 backdrop-blur-sm rounded-lg p-1.5 text-center">
            <p className="text-sm text-white" style={{ fontWeight: 700 }}>{stats.activeServices}</p>
            <p className="text-xs text-gray-900/70">Active</p>
          </div>
        </div>
      </div>

      {/* Search & Filter */}
      <div className="px-4 pt-3 space-y-2">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
          <Input
            placeholder="Tìm kiếm..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10 bg-card border-amber-500/30 text-white h-9 text-sm"
          />
        </div>

        {activeTab === 'services' && (
          <Select value={selectedCategory} onValueChange={setSelectedCategory}>
            <SelectTrigger className="bg-card border-gray-700 text-white h-9 text-sm">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {categories.map(cat => (
                <SelectItem key={cat.id} value={cat.id}>
                  {cat.icon} {cat.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        )}
      </div>

      {/* Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="px-4 pt-3">
        <TabsList className="grid w-full grid-cols-3 bg-card h-9">
          <TabsTrigger value="services" className="text-xs">Dịch vụ</TabsTrigger>
          <TabsTrigger value="combos" className="text-xs">Combo</TabsTrigger>
          <TabsTrigger value="stock" className="text-xs">Tồn kho</TabsTrigger>
        </TabsList>

        <TabsContent value="services" className="mt-0">
          {renderServicesTab()}
        </TabsContent>
        <TabsContent value="combos" className="mt-0">
          {renderCombosTab()}
        </TabsContent>
        <TabsContent value="stock" className="mt-0">
          {renderStockTab()}
        </TabsContent>
      </Tabs>

      {/* Dialog */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        {dialogType === 'service' ? (
          <ServiceDialog
            service={editingItem}
            categories={categories.filter(c => c.id !== 'all')}
            onSave={handleSaveService}
            onClose={() => {
              setIsDialogOpen(false);
              setEditingItem(null);
            }}
          />
        ) : (
          <ComboDialog
            combo={editingItem}
            services={services}
            onSave={handleSaveCombo}
            onClose={() => {
              setIsDialogOpen(false);
              setEditingItem(null);
            }}
          />
        )}
      </Dialog>
    </div>
  );
}

function ServiceDialog({ service, categories, onSave, onClose }: any) {
  const [formData, setFormData] = useState(
    service || {
      name: '',
      category: 'drinks',
      price: 0,
      cost: 0,
      unit: 'cái',
      status: 'active',
      syncedBranches: ['Trần Duy Hưng', 'Nguyễn Huệ', 'Láng Hạ'],
    }
  );

  return (
    <DialogContent className="bg-card border-amber-500/30 text-white w-[90vw] max-w-[360px]" aria-describedby={undefined}>
      <DialogHeader>
        <DialogTitle className="text-sm">
          {service ? 'Chỉnh sửa dịch vụ' : 'Thêm dịch vụ mới'}
        </DialogTitle>
      </DialogHeader>
      <ScrollArea className="max-h-[60vh]">
        <div className="space-y-3 py-3 pr-3">
          <div>
            <Label className="text-xs text-gray-400 mb-1 block">Tên dịch vụ *</Label>
            <Input
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="bg-[#1a1a24] border-gray-700 text-white h-9 text-sm"
              placeholder="Bia Heineken"
            />
          </div>

          <div className="grid grid-cols-2 gap-2">
            <div>
              <Label className="text-xs text-gray-400 mb-1 block">Danh mục *</Label>
              <Select
                value={formData.category}
                onValueChange={(value) => setFormData({ ...formData, category: value })}
              >
                <SelectTrigger className="bg-[#1a1a24] border-gray-700 h-9 text-sm">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {categories.map((cat: any) => (
                    <SelectItem key={cat.id} value={cat.id}>
                      {cat.icon} {cat.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label className="text-xs text-gray-400 mb-1 block">Đơn vị *</Label>
              <Input
                value={formData.unit}
                onChange={(e) => setFormData({ ...formData, unit: e.target.value })}
                className="bg-[#1a1a24] border-gray-700 text-white h-9 text-sm"
                placeholder="lon, chai, gói..."
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-2">
            <div>
              <Label className="text-xs text-gray-400 mb-1 block">Giá bán (đ) *</Label>
              <Input
                type="number"
                value={formData.price}
                onChange={(e) => setFormData({ ...formData, price: parseInt(e.target.value) || 0 })}
                className="bg-[#1a1a24] border-gray-700 text-white h-9 text-sm"
              />
            </div>

            <div>
              <Label className="text-xs text-gray-400 mb-1 block">Giá vốn (đ) *</Label>
              <Input
                type="number"
                value={formData.cost}
                onChange={(e) => setFormData({ ...formData, cost: parseInt(e.target.value) || 0 })}
                className="bg-[#1a1a24] border-gray-700 text-white h-9 text-sm"
              />
            </div>
          </div>

          {formData.price > 0 && formData.cost > 0 && (
            <div className="bg-green-500/10 border border-green-500/30 rounded-lg p-2">
              <p className="text-xs text-green-400">
                Lợi nhuận: {((formData.price - formData.cost) / formData.price * 100).toFixed(0)}%
                ({(formData.price - formData.cost).toLocaleString('vi-VN')}đ)
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
          className="flex-1 bg-amber-500 hover:bg-amber-600 text-white h-9 text-sm"
          onClick={() => onSave(formData)}
        >
          {service ? 'Cập nhật' : 'Tạo'}
        </Button>
      </div>
    </DialogContent>
  );
}

function ComboDialog({ combo, services, onSave, onClose }: any) {
  const [formData, setFormData] = useState(
    combo || {
      name: '',
      description: '',
      items: [],
      originalPrice: 0,
      salePrice: 0,
      discount: 0,
      status: 'active',
    }
  );

  const calculateDiscount = (original: number, sale: number) => {
    if (original > 0) {
      return Math.round(((original - sale) / original) * 100);
    }
    return 0;
  };

  return (
    <DialogContent className="bg-card border-pink-500/30 text-white w-[90vw] max-w-[360px]" aria-describedby={undefined}>
      <DialogHeader>
        <DialogTitle className="text-sm">
          {combo ? 'Chỉnh sửa combo' : 'Tạo combo mới'}
        </DialogTitle>
      </DialogHeader>
      <ScrollArea className="max-h-[60vh]">
        <div className="space-y-3 py-3 pr-3">
          <div>
            <Label className="text-xs text-gray-400 mb-1 block">Tên combo *</Label>
            <Input
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="bg-[#1a1a24] border-gray-700 text-white h-9 text-sm"
              placeholder="Combo Sinh nhật VIP"
            />
          </div>

          <div>
            <Label className="text-xs text-gray-400 mb-1 block">Mô tả</Label>
            <Textarea
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              className="bg-[#1a1a24] border-gray-700 text-white text-sm min-h-[60px]"
              placeholder="Mô tả combo..."
            />
          </div>

          <div className="grid grid-cols-2 gap-2">
            <div>
              <Label className="text-xs text-gray-400 mb-1 block">Giá gốc (đ) *</Label>
              <Input
                type="number"
                value={formData.originalPrice}
                onChange={(e) => {
                  const original = parseInt(e.target.value) || 0;
                  setFormData({
                    ...formData,
                    originalPrice: original,
                    discount: calculateDiscount(original, formData.salePrice),
                  });
                }}
                className="bg-[#1a1a24] border-gray-700 text-white h-9 text-sm"
              />
            </div>

            <div>
              <Label className="text-xs text-gray-400 mb-1 block">Giá bán (đ) *</Label>
              <Input
                type="number"
                value={formData.salePrice}
                onChange={(e) => {
                  const sale = parseInt(e.target.value) || 0;
                  setFormData({
                    ...formData,
                    salePrice: sale,
                    discount: calculateDiscount(formData.originalPrice, sale),
                  });
                }}
                className="bg-[#1a1a24] border-gray-700 text-white h-9 text-sm"
              />
            </div>
          </div>

          {formData.discount > 0 && (
            <div className="bg-red-500/10 border border-red-500/30 rounded-lg p-2">
              <p className="text-xs text-red-400">
                Giảm giá: {formData.discount}% 
                ({(formData.originalPrice - formData.salePrice).toLocaleString('vi-VN')}đ)
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
          className="flex-1 bg-pink-500 hover:bg-pink-600 text-white h-9 text-sm"
          onClick={() => onSave(formData)}
        >
          {combo ? 'Cập nhật' : 'Tạo'}
        </Button>
      </div>
    </DialogContent>
  );
}
