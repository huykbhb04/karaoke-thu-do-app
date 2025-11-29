import { useState } from 'react';
import {
  ArrowLeft, Plus, Send, Bell, MessageSquare, AlertTriangle, Calendar, Users, 
  Building2, Edit, Trash2, Eye, CheckCircle2, Clock, Filter, Search, Image as ImageIcon
} from 'lucide-react';
import { Button } from '../ui/button';
import { Card } from '../ui/card';
import { Badge } from '../ui/badge';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Textarea } from '../ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '../ui/dialog';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';
import { ScrollArea } from '../ui/scroll-area';
import { Switch } from '../ui/switch';
import { toast } from 'sonner@2.0.3';

interface NotificationManagementProps {
  onBack: () => void;
}

export function NotificationManagement({ onBack }: NotificationManagementProps) {
  const [activeTab, setActiveTab] = useState('create');
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [selectedNotification, setSelectedNotification] = useState<any>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterType, setFilterType] = useState('all');
  const [filterStatus, setFilterStatus] = useState('all');

  // Notification Types
  const notificationTypes = [
    { id: 'system', name: 'Thông báo hệ thống', icon: '🔔', color: '#3b82f6', target: 'all' },
    { id: 'internal', name: 'Thông báo nội bộ', icon: '🏠', color: '#10b981', target: 'staff' },
    { id: 'feedback', name: 'Phản hồi khách hàng', icon: '💬', color: '#f59e0b', target: 'admin' },
    { id: 'promotion', name: 'Khuyến mãi & sự kiện', icon: '💸', color: '#ec4899', target: 'customer' },
    { id: 'alert', name: 'Cảnh báo sự cố', icon: '⚠️', color: '#ef4444', target: 'admin+manager' },
  ];

  // Mock Notifications Data
  const [notifications, setNotifications] = useState([
    {
      id: 'NTF001',
      title: 'Bảo trì hệ thống định kỳ',
      content: 'Hệ thống sẽ bảo trì từ 23:00 - 02:00 ngày 15/10. Vui lòng hoàn tất công việc trước thời gian này.',
      type: 'system',
      target: 'all',
      priority: 'important',
      status: 'sent',
      createdAt: '13/10/2025 09:00',
      sendAt: '13/10/2025 14:00',
      sentTo: 173,
      readBy: 145,
      createdBy: 'Admin',
    },
    {
      id: 'NTF002',
      title: 'Cập nhật menu đồ uống mới',
      content: 'Đã thêm 5 loại đồ uống mới vào hệ thống. Vui lòng cập nhật bảng giá.',
      type: 'internal',
      target: 'staff',
      branch: 'Trần Duy Hưng',
      priority: 'normal',
      status: 'sent',
      createdAt: '12/10/2025 16:30',
      sendAt: '12/10/2025 16:30',
      sentTo: 12,
      readBy: 10,
      createdBy: 'Manager',
    },
    {
      id: 'NTF003',
      title: 'Khuyến mãi Halloween 2025',
      content: 'Giảm 30% cho tất cả phòng từ 31/10 - 01/11. Book ngay!',
      type: 'promotion',
      target: 'customer',
      priority: 'urgent',
      status: 'scheduled',
      createdAt: '13/10/2025 10:00',
      sendAt: '25/10/2025 08:00',
      sentTo: 0,
      readBy: 0,
      createdBy: 'Admin',
    },
    {
      id: 'NTF004',
      title: 'Phản hồi: Chất lượng âm thanh phòng VIP 03',
      content: 'Khách hàng Nguyễn Văn A phản hồi âm thanh phòng VIP 03 bị rè. Cần kiểm tra gấp.',
      type: 'feedback',
      target: 'admin',
      priority: 'urgent',
      status: 'pending',
      createdAt: '13/10/2025 15:20',
      sendAt: null,
      sentTo: 0,
      readBy: 0,
      createdBy: 'Customer',
      feedbackStatus: 'pending',
    },
  ]);

  // Mock Feedbacks Data
  const [feedbacks, setFeedbacks] = useState([
    {
      id: 'FB001',
      customerId: 'CU001',
      customerName: 'Nguyễn Văn A',
      title: 'Chất lượng âm thanh',
      content: 'Phòng VIP 03 âm thanh bị rè, ảnh hưởng trải nghiệm.',
      branch: 'Trần Duy Hưng',
      room: 'VIP 03',
      rating: 3,
      status: 'pending',
      createdAt: '13/10/2025 15:20',
      priority: 'high',
    },
    {
      id: 'FB002',
      customerId: 'CU002',
      customerName: 'Trần Thị B',
      title: 'Đồ uống đến chậm',
      content: 'Order đồ uống 30 phút mới được phục vụ. Rất chậm.',
      branch: 'Nguyễn Huệ',
      room: 'Family 02',
      rating: 2,
      status: 'in_progress',
      createdAt: '12/10/2025 20:15',
      priority: 'medium',
      assignedTo: 'Manager Nguyễn Huệ',
    },
    {
      id: 'FB003',
      customerId: 'CU003',
      customerName: 'Lê Văn C',
      title: 'Phòng sạch sẽ, dịch vụ tốt',
      content: 'Rất hài lòng với dịch vụ. Nhân viên thân thiện.',
      branch: 'Láng Hạ',
      room: 'Couple 01',
      rating: 5,
      status: 'resolved',
      createdAt: '11/10/2025 18:30',
      priority: 'low',
      resolvedAt: '12/10/2025 09:00',
    },
  ]);

  // Mock Alerts Data
  const [alerts, setAlerts] = useState([
    {
      id: 'ALT001',
      type: 'system',
      severity: 'critical',
      title: 'Phòng VIP 01 mất kết nối',
      description: 'Hệ thống phát hiện phòng VIP 01 (Trần Duy Hưng) mất kết nối với server.',
      branch: 'Tr��n Duy Hưng',
      room: 'VIP 01',
      status: 'active',
      createdAt: '13/10/2025 16:45',
      notifiedTo: ['Admin', 'Manager Trần Duy Hưng'],
    },
    {
      id: 'ALT002',
      type: 'order',
      severity: 'warning',
      title: 'Order không có phản hồi',
      description: 'Order #ORD123 tại phòng Family 05 đã 15 phút không có phản hồi từ nhân viên.',
      branch: 'Nguyễn Huệ',
      room: 'Family 05',
      status: 'acknowledged',
      createdAt: '13/10/2025 16:20',
      acknowledgedAt: '13/10/2025 16:25',
      acknowledgedBy: 'Manager Nguyễn Huệ',
      notifiedTo: ['Admin', 'Manager Nguyễn Huệ'],
    },
    {
      id: 'ALT003',
      type: 'equipment',
      severity: 'info',
      title: 'Cần bảo trì máy chiếu',
      description: 'Phòng Party 01 cần thay bóng đèn máy chiếu.',
      branch: 'Láng Hạ',
      room: 'Party 01',
      status: 'resolved',
      createdAt: '10/10/2025 14:00',
      resolvedAt: '11/10/2025 10:30',
      resolvedBy: 'Kỹ thuật viên',
      notifiedTo: ['Manager Láng Hạ'],
    },
  ]);

  const stats = {
    totalNotifications: notifications.length,
    sent: notifications.filter(n => n.status === 'sent').length,
    scheduled: notifications.filter(n => n.status === 'scheduled').length,
    pendingFeedbacks: feedbacks.filter(f => f.status === 'pending').length,
    activeAlerts: alerts.filter(a => a.status === 'active').length,
  };

  const filteredNotifications = notifications.filter(notif => {
    const matchSearch = notif.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                       notif.content.toLowerCase().includes(searchQuery.toLowerCase());
    const matchType = filterType === 'all' || notif.type === filterType;
    const matchStatus = filterStatus === 'all' || notif.status === filterStatus;
    return matchSearch && matchType && matchStatus;
  });

  const getTypeInfo = (typeId: string) => {
    return notificationTypes.find(t => t.id === typeId) || notificationTypes[0];
  };

  const getPriorityBadge = (priority: string) => {
    switch (priority) {
      case 'urgent':
        return <Badge className="bg-red-500/20 text-red-400 border-red-500/30 text-xs">Khẩn cấp</Badge>;
      case 'important':
        return <Badge className="bg-yellow-500/20 text-yellow-400 border-yellow-500/30 text-xs">Quan trọng</Badge>;
      case 'normal':
        return <Badge className="bg-blue-500/20 text-blue-400 border-blue-500/30 text-xs">Bình thường</Badge>;
      default:
        return null;
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'sent':
        return <Badge className="bg-green-500/20 text-green-400 text-xs">Đã gửi</Badge>;
      case 'scheduled':
        return <Badge className="bg-blue-500/20 text-blue-400 text-xs">Đã hẹn</Badge>;
      case 'pending':
        return <Badge className="bg-yellow-500/20 text-yellow-400 text-xs">Chờ xử lý</Badge>;
      default:
        return null;
    }
  };

  const handleSendNotification = (notifData: any) => {
    const newNotif = {
      id: `NTF${(notifications.length + 1).toString().padStart(3, '0')}`,
      ...notifData,
      status: notifData.sendNow ? 'sent' : 'scheduled',
      createdAt: new Date().toLocaleString('vi-VN'),
      sentTo: notifData.sendNow ? 100 : 0,
      readBy: 0,
      createdBy: 'Admin',
    };
    setNotifications(prev => [newNotif, ...prev]);
    toast.success(notifData.sendNow ? 'Đã gửi thông báo' : 'Đã hẹn giờ gửi thông báo');
  };

  const handleDeleteNotification = (notifId: string) => {
    if (confirm('Bạn có chắc chắn muốn xóa thông báo này?')) {
      setNotifications(prev => prev.filter(n => n.id !== notifId));
      toast.success('Đã xóa thông báo');
    }
  };

  const handleResolveFeedback = (feedbackId: string, response: string) => {
    setFeedbacks(prev =>
      prev.map(f =>
        f.id === feedbackId
          ? { ...f, status: 'resolved', resolvedAt: new Date().toLocaleString('vi-VN') }
          : f
      )
    );
    toast.success('Đã giải quyết phản hồi');
  };

  const handleAcknowledgeAlert = (alertId: string) => {
    setAlerts(prev =>
      prev.map(a =>
        a.id === alertId
          ? {
              ...a,
              status: 'acknowledged',
              acknowledgedAt: new Date().toLocaleString('vi-VN'),
              acknowledgedBy: 'Admin',
            }
          : a
      )
    );
    toast.success('Đã xác nhận cảnh báo');
  };

  const renderCreateTab = () => (
    <CreateNotificationForm onSend={handleSendNotification} notificationTypes={notificationTypes} />
  );

  const renderListTab = () => (
    <div className="space-y-3">
      {/* Filters */}
      <div className="space-y-2">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
          <Input
            placeholder="Tìm kiếm thông báo..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10 bg-card border-[#8b5cf6]/30 text-white h-9 text-sm"
          />
        </div>

        <div className="grid grid-cols-2 gap-2">
          <Select value={filterType} onValueChange={setFilterType}>
            <SelectTrigger className="bg-card border-gray-700 h-8 text-xs">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Tất cả loại</SelectItem>
              {notificationTypes.map(type => (
                <SelectItem key={type.id} value={type.id}>
                  {type.icon} {type.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Select value={filterStatus} onValueChange={setFilterStatus}>
            <SelectTrigger className="bg-card border-gray-700 h-8 text-xs">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Tất cả trạng thái</SelectItem>
              <SelectItem value="sent">Đã gửi</SelectItem>
              <SelectItem value="scheduled">Đã hẹn</SelectItem>
              <SelectItem value="pending">Chờ xử lý</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Notifications List */}
      <div className="space-y-2">
        {filteredNotifications.map((notif) => {
          const typeInfo = getTypeInfo(notif.type);
          
          return (
            <Card key={notif.id} className="bg-card border-gray-700/30 p-3">
              <div className="flex items-start gap-3 mb-2">
                <div
                  className="w-10 h-10 rounded-lg flex items-center justify-center text-xl flex-shrink-0"
                  style={{ backgroundColor: `${typeInfo.color}20` }}
                >
                  {typeInfo.icon}
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <h3 className="text-white text-sm truncate" style={{ fontWeight: 600 }}>
                      {notif.title}
                    </h3>
                    {getPriorityBadge(notif.priority)}
                  </div>
                  <p className="text-xs text-gray-400 line-clamp-2 mb-1">{notif.content}</p>
                  <div className="flex items-center gap-2 text-xs text-gray-500">
                    <span>{notif.createdAt}</span>
                    <span>•</span>
                    <span>{notif.createdBy}</span>
                  </div>
                </div>

                <div className="flex flex-col gap-1 flex-shrink-0">
                  <button
                    onClick={() => {
                      setSelectedNotification(notif);
                      setIsDialogOpen(true);
                    }}
                    className="w-7 h-7 rounded bg-blue-500/20 text-blue-400 flex items-center justify-center hover:bg-blue-500/30"
                  >
                    <Eye className="w-3.5 h-3.5" />
                  </button>
                  {notif.status === 'scheduled' && (
                    <button
                      onClick={() => handleDeleteNotification(notif.id)}
                      className="w-7 h-7 rounded bg-red-500/20 text-red-400 flex items-center justify-center hover:bg-red-500/30"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  )}
                </div>
              </div>

              {/* Stats Row */}
              <div className="flex items-center justify-between pt-2 border-t border-gray-700/30">
                <div className="flex items-center gap-3 text-xs">
                  {getStatusBadge(notif.status)}
                  {notif.status === 'sent' && (
                    <>
                      <span className="text-gray-400">
                        Gửi: <span className="text-white">{notif.sentTo}</span>
                      </span>
                      <span className="text-gray-400">
                        Đọc: <span className="text-green-400">{notif.readBy}</span>
                      </span>
                    </>
                  )}
                  {notif.status === 'scheduled' && notif.sendAt && (
                    <span className="text-blue-400 flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      {notif.sendAt}
                    </span>
                  )}
                </div>
              </div>
            </Card>
          );
        })}
      </div>
    </div>
  );

  const renderFeedbackTab = () => (
    <div className="space-y-2">
      {feedbacks.map((feedback) => {
        const isResolved = feedback.status === 'resolved';
        const isPending = feedback.status === 'pending';
        
        return (
          <Card key={feedback.id} className="bg-card border-gray-700/30 p-3">
            <div className="flex items-start justify-between mb-2">
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <h3 className="text-white text-sm" style={{ fontWeight: 600 }}>
                    {feedback.title}
                  </h3>
                  <Badge
                    className={`text-xs ${
                      isPending
                        ? 'bg-yellow-500/20 text-yellow-400'
                        : feedback.status === 'in_progress'
                        ? 'bg-blue-500/20 text-blue-400'
                        : 'bg-green-500/20 text-green-400'
                    }`}
                  >
                    {isPending ? 'Chờ xử lý' : feedback.status === 'in_progress' ? 'Đang xử lý' : 'Đã giải quyết'}
                  </Badge>
                </div>
                <p className="text-xs text-gray-400 mb-2">{feedback.content}</p>
                <div className="flex items-center gap-2 text-xs text-gray-500">
                  <span>{feedback.customerName}</span>
                  <span>•</span>
                  <span>{feedback.branch}</span>
                  <span>•</span>
                  <span>{feedback.room}</span>
                  <span>•</span>
                  <span>{feedback.createdAt}</span>
                </div>
                {/* Rating */}
                <div className="flex items-center gap-1 mt-1">
                  {[...Array(5)].map((_, i) => (
                    <span key={i} className={i < feedback.rating ? 'text-[#ffd700]' : 'text-gray-600'}>
                      ★
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {!isResolved && (
              <div className="flex gap-2 pt-2 border-t border-gray-700/30">
                <Button
                  size="sm"
                  className="flex-1 bg-blue-500/20 hover:bg-blue-500/30 text-blue-400 h-8 text-xs"
                  onClick={() => {
                    setFeedbacks(prev =>
                      prev.map(f =>
                        f.id === feedback.id ? { ...f, status: 'in_progress', assignedTo: 'Admin' } : f
                      )
                    );
                    toast.success('Đã nhận xử lý');
                  }}
                >
                  Nhận xử lý
                </Button>
                <Button
                  size="sm"
                  className="flex-1 bg-green-500/20 hover:bg-green-500/30 text-green-400 h-8 text-xs"
                  onClick={() => handleResolveFeedback(feedback.id, 'Đã xử lý xong')}
                >
                  Giải quyết
                </Button>
              </div>
            )}
          </Card>
        );
      })}
    </div>
  );

  const renderAlertsTab = () => (
    <div className="space-y-2">
      {alerts.map((alert) => {
        const isActive = alert.status === 'active';
        const severityColor =
          alert.severity === 'critical'
            ? 'text-red-400 bg-red-500/20'
            : alert.severity === 'warning'
            ? 'text-yellow-400 bg-yellow-500/20'
            : 'text-blue-400 bg-blue-500/20';

        return (
          <Card key={alert.id} className="bg-card border-gray-700/30 p-3">
            <div className="flex items-start gap-3 mb-2">
              <div className={`w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0 ${severityColor}`}>
                <AlertTriangle className="w-5 h-5" />
              </div>

              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  <h3 className="text-white text-sm" style={{ fontWeight: 600 }}>
                    {alert.title}
                  </h3>
                  <Badge
                    className={`text-xs ${
                      isActive
                        ? 'bg-red-500/20 text-red-400'
                        : alert.status === 'acknowledged'
                        ? 'bg-blue-500/20 text-blue-400'
                        : 'bg-green-500/20 text-green-400'
                    }`}
                  >
                    {isActive ? 'Active' : alert.status === 'acknowledged' ? 'Đã xác nhận' : 'Đã xử lý'}
                  </Badge>
                </div>
                <p className="text-xs text-gray-400 mb-1">{alert.description}</p>
                <div className="flex items-center gap-2 text-xs text-gray-500">
                  <span>{alert.branch}</span>
                  {alert.room && (
                    <>
                      <span>•</span>
                      <span>{alert.room}</span>
                    </>
                  )}
                  <span>•</span>
                  <span>{alert.createdAt}</span>
                </div>
              </div>
            </div>

            {isActive && (
              <Button
                size="sm"
                className="w-full bg-blue-500/20 hover:bg-blue-500/30 text-blue-400 h-8 text-xs mt-2"
                onClick={() => handleAcknowledgeAlert(alert.id)}
              >
                <CheckCircle2 className="w-3 h-3 mr-1" />
                Xác nhận đã biết
              </Button>
            )}
          </Card>
        );
      })}
    </div>
  );

  return (
    <div className="min-h-screen bg-background pb-20">
      {/* Header */}
      <div className="sticky top-0 z-50 bg-gradient-to-br from-[#8b5cf6] to-[#6b21a8] p-4 rounded-b-[20px]">
        <div className="flex items-center gap-3 mb-3">
          <button
            onClick={onBack}
            className="w-9 h-9 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20"
          >
            <ArrowLeft className="w-5 h-5 text-white" />
          </button>
          <div className="flex-1">
            <h1 className="text-sm text-white" style={{ fontWeight: 700 }}>
              Quản lý thông báo
            </h1>
            <p className="text-xs text-gray-200">Thông báo & phản hồi</p>
          </div>
          <Badge className="bg-red-500/20 text-red-400 border-red-500/30">
            {stats.pendingFeedbacks + stats.activeAlerts}
          </Badge>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-4 gap-2">
          <div className="bg-white/10 backdrop-blur-sm rounded-lg p-1.5 text-center">
            <p className="text-sm text-white" style={{ fontWeight: 700 }}>{stats.totalNotifications}</p>
            <p className="text-xs text-gray-200">Tổng</p>
          </div>
          <div className="bg-white/10 backdrop-blur-sm rounded-lg p-1.5 text-center">
            <p className="text-sm text-white" style={{ fontWeight: 700 }}>{stats.sent}</p>
            <p className="text-xs text-gray-200">Đã gửi</p>
          </div>
          <div className="bg-white/10 backdrop-blur-sm rounded-lg p-1.5 text-center">
            <p className="text-sm text-white" style={{ fontWeight: 700 }}>{stats.pendingFeedbacks}</p>
            <p className="text-xs text-gray-200">Phản hồi</p>
          </div>
          <div className="bg-white/10 backdrop-blur-sm rounded-lg p-1.5 text-center">
            <p className="text-sm text-red-400" style={{ fontWeight: 700 }}>{stats.activeAlerts}</p>
            <p className="text-xs text-gray-200">Cảnh báo</p>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="px-4 pt-3">
        <TabsList className="grid w-full grid-cols-4 bg-card h-9">
          <TabsTrigger value="create" className="text-xs">
            <Plus className="w-3 h-3 mr-1" />
            Tạo
          </TabsTrigger>
          <TabsTrigger value="list" className="text-xs">
            <Bell className="w-3 h-3 mr-1" />
            Danh sách
          </TabsTrigger>
          <TabsTrigger value="feedback" className="text-xs">
            <MessageSquare className="w-3 h-3 mr-1" />
            Phản hồi
          </TabsTrigger>
          <TabsTrigger value="alerts" className="text-xs">
            <AlertTriangle className="w-3 h-3 mr-1" />
            Cảnh báo
          </TabsTrigger>
        </TabsList>

        <ScrollArea className="h-[calc(100vh-230px)] mt-3">
          <TabsContent value="create" className="mt-0">
            {renderCreateTab()}
          </TabsContent>
          <TabsContent value="list" className="mt-0">
            {renderListTab()}
          </TabsContent>
          <TabsContent value="feedback" className="mt-0">
            {renderFeedbackTab()}
          </TabsContent>
          <TabsContent value="alerts" className="mt-0">
            {renderAlertsTab()}
          </TabsContent>
        </ScrollArea>
      </Tabs>

      {/* Detail Dialog */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        {selectedNotification && (
          <NotificationDetailDialog
            notification={selectedNotification}
            onClose={() => {
              setIsDialogOpen(false);
              setSelectedNotification(null);
            }}
          />
        )}
      </Dialog>
    </div>
  );
}

// Create Notification Form Component
function CreateNotificationForm({ onSend, notificationTypes }: any) {
  const [formData, setFormData] = useState({
    title: '',
    content: '',
    type: 'system',
    target: 'all',
    branch: '',
    priority: 'normal',
    sendNow: true,
    sendAt: '',
  });

  const handleSubmit = () => {
    if (!formData.title || !formData.content) {
      toast.error('Vui lòng điền đầy đủ thông tin');
      return;
    }

    onSend(formData);
    
    // Reset form
    setFormData({
      title: '',
      content: '',
      type: 'system',
      target: 'all',
      branch: '',
      priority: 'normal',
      sendNow: true,
      sendAt: '',
    });
  };

  const selectedType = notificationTypes.find((t: any) => t.id === formData.type);

  return (
    <div className="space-y-4">
      <Card className="bg-card border-[#8b5cf6]/30 p-4">
        <h3 className="text-white text-sm mb-3" style={{ fontWeight: 600 }}>
          Thông tin thông báo
        </h3>

        <div className="space-y-3">
          <div>
            <Label className="text-xs text-gray-400 mb-1 block">Tiêu đề *</Label>
            <Input
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              className="bg-[#1a1a24] border-gray-700 text-white h-9 text-sm"
              placeholder="Nhập tiêu đề thông báo..."
            />
          </div>

          <div>
            <Label className="text-xs text-gray-400 mb-1 block">Nội dung *</Label>
            <Textarea
              value={formData.content}
              onChange={(e) => setFormData({ ...formData, content: e.target.value })}
              className="bg-[#1a1a24] border-gray-700 text-white text-sm min-h-[80px]"
              placeholder="Nhập nội dung thông báo..."
            />
          </div>

          <div>
            <Label className="text-xs text-gray-400 mb-1 block">Loại thông báo *</Label>
            <Select
              value={formData.type}
              onValueChange={(value) => setFormData({ ...formData, type: value })}
            >
              <SelectTrigger className="bg-[#1a1a24] border-gray-700 h-9 text-sm">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {notificationTypes.map((type: any) => (
                  <SelectItem key={type.id} value={type.id}>
                    {type.icon} {type.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="grid grid-cols-2 gap-2">
            <div>
              <Label className="text-xs text-gray-400 mb-1 block">Đối tượng *</Label>
              <Select
                value={formData.target}
                onValueChange={(value) => setFormData({ ...formData, target: value })}
              >
                <SelectTrigger className="bg-[#1a1a24] border-gray-700 h-9 text-sm">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Tất cả</SelectItem>
                  <SelectItem value="admin">Admin</SelectItem>
                  <SelectItem value="manager">Quản lý</SelectItem>
                  <SelectItem value="staff">Nhân viên</SelectItem>
                  <SelectItem value="customer">Khách hàng</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label className="text-xs text-gray-400 mb-1 block">Mức ưu tiên</Label>
              <Select
                value={formData.priority}
                onValueChange={(value) => setFormData({ ...formData, priority: value })}
              >
                <SelectTrigger className="bg-[#1a1a24] border-gray-700 h-9 text-sm">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="normal">Bình thường</SelectItem>
                  <SelectItem value="important">Quan trọng</SelectItem>
                  <SelectItem value="urgent">Khẩn cấp</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {(formData.type === 'internal' || formData.target === 'manager' || formData.target === 'staff') && (
            <div>
              <Label className="text-xs text-gray-400 mb-1 block">Cơ sở</Label>
              <Select
                value={formData.branch}
                onValueChange={(value) => setFormData({ ...formData, branch: value })}
              >
                <SelectTrigger className="bg-[#1a1a24] border-gray-700 h-9 text-sm">
                  <SelectValue placeholder="Chọn cơ sở..." />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Tất cả cơ sở</SelectItem>
                  <SelectItem value="tran-duy-hung">Trần Duy Hưng</SelectItem>
                  <SelectItem value="nguyen-hue">Nguyễn Huệ</SelectItem>
                  <SelectItem value="lang-ha">Láng Hạ</SelectItem>
                </SelectContent>
              </Select>
            </div>
          )}
        </div>
      </Card>

      <Card className="bg-card border-[#8b5cf6]/30 p-4">
        <h3 className="text-white text-sm mb-3" style={{ fontWeight: 600 }}>
          Thời gian gửi
        </h3>

        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-white" style={{ fontWeight: 600 }}>Gửi ngay</p>
              <p className="text-xs text-gray-400">Thông báo sẽ được gửi ngay lập tức</p>
            </div>
            <Switch
              checked={formData.sendNow}
              onCheckedChange={(checked) => setFormData({ ...formData, sendNow: checked })}
            />
          </div>

          {!formData.sendNow && (
            <div>
              <Label className="text-xs text-gray-400 mb-1 block">Hẹn giờ gửi</Label>
              <Input
                type="datetime-local"
                value={formData.sendAt}
                onChange={(e) => setFormData({ ...formData, sendAt: e.target.value })}
                className="bg-[#1a1a24] border-gray-700 text-white h-9 text-sm"
              />
            </div>
          )}
        </div>
      </Card>

      <Button
        className="w-full bg-[#8b5cf6] hover:bg-[#7c3aed] text-white h-10"
        onClick={handleSubmit}
      >
        <Send className="w-4 h-4 mr-2" />
        {formData.sendNow ? 'Gửi ngay' : 'Hẹn giờ gửi'}
      </Button>
    </div>
  );
}

// Notification Detail Dialog Component
function NotificationDetailDialog({ notification, onClose }: any) {
  const typeInfo = {
    system: { icon: '🔔', color: '#3b82f6' },
    internal: { icon: '🏠', color: '#10b981' },
    feedback: { icon: '💬', color: '#f59e0b' },
    promotion: { icon: '💸', color: '#ec4899' },
    alert: { icon: '⚠️', color: '#ef4444' },
  }[notification.type] || { icon: '🔔', color: '#3b82f6' };

  return (
    <DialogContent className="bg-card border-[#8b5cf6]/30 text-white w-[90vw] max-w-[360px]" aria-describedby={undefined}>
      <DialogHeader>
        <DialogTitle className="text-sm flex items-center gap-2">
          <span className="text-xl">{typeInfo.icon}</span>
          Chi tiết thông báo
        </DialogTitle>
      </DialogHeader>

      <ScrollArea className="max-h-[60vh]">
        <div className="space-y-3 py-3 pr-3">
          <div>
            <p className="text-xs text-gray-400 mb-1">Tiêu đề</p>
            <p className="text-sm text-white" style={{ fontWeight: 600 }}>{notification.title}</p>
          </div>

          <div>
            <p className="text-xs text-gray-400 mb-1">Nội dung</p>
            <p className="text-sm text-white">{notification.content}</p>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <p className="text-xs text-gray-400 mb-1">Đối tượng</p>
              <Badge className="bg-blue-500/20 text-blue-400 text-xs">
                {notification.target}
              </Badge>
            </div>
            <div>
              <p className="text-xs text-gray-400 mb-1">Mức ưu tiên</p>
              <Badge className={`text-xs ${
                notification.priority === 'urgent' ? 'bg-red-500/20 text-red-400' :
                notification.priority === 'important' ? 'bg-yellow-500/20 text-yellow-400' :
                'bg-blue-500/20 text-blue-400'
              }`}>
                {notification.priority === 'urgent' ? 'Khẩn cấp' :
                 notification.priority === 'important' ? 'Quan trọng' : 'Bình thường'}
              </Badge>
            </div>
          </div>

          {notification.status === 'sent' && (
            <div className="pt-3 border-t border-gray-700/50">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <p className="text-xs text-gray-400 mb-1">Đã gửi</p>
                  <p className="text-sm text-white" style={{ fontWeight: 600 }}>{notification.sentTo}</p>
                </div>
                <div>
                  <p className="text-xs text-gray-400 mb-1">Đã đọc</p>
                  <p className="text-sm text-green-400" style={{ fontWeight: 600 }}>{notification.readBy}</p>
                </div>
              </div>
            </div>
          )}

          <div className="pt-3 border-t border-gray-700/50">
            <p className="text-xs text-gray-400">
              Tạo bởi: {notification.createdBy} • {notification.createdAt}
            </p>
          </div>
        </div>
      </ScrollArea>

      <Button
        className="w-full bg-gray-700 hover:bg-gray-600 text-white h-9 text-sm"
        onClick={onClose}
      >
        Đóng
      </Button>
    </DialogContent>
  );
}
