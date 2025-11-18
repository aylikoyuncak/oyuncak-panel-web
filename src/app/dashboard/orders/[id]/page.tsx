'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { adminApi } from '@/lib/api-client';
import { OrderDetailResponse } from '@/api/generated';
import toast from 'react-hot-toast';

export default function OrderDetailPage() {
  const params = useParams();
  const router = useRouter();
  const orderId = params.id as string;
  const [data, setData] = useState<OrderDetailResponse | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [newOrderStatus, setNewOrderStatus] = useState('');
  const [isUpdating, setIsUpdating] = useState(false);

  useEffect(() => {
    fetchOrderDetail();
  }, [orderId]);

  const fetchOrderDetail = async () => {
    try {
      const response = await adminApi.apiAdminOrderDetailOrderIdGet(orderId);
      if (response.data.isSucceed && response.data.data) {
        setData(response.data.data);
        setNewOrderStatus(response.data.data.order?.orderStatus || '');
      }
    } catch (error) {
      console.error('Order detail fetch error:', error);
      toast.error('Sipariş detayları yüklenemedi');
    } finally {
      setIsLoading(false);
    }
  };

  const handleStatusUpdate = async () => {
    if (!newOrderStatus || newOrderStatus === data?.order?.orderStatus) return;
    
    if (!confirm('Sipariş durumunu değiştirmek istediğinizden emin misiniz?')) return;

    try {
      setIsUpdating(true);
      const response = await adminApi.apiAdminUpdateOrderStatusesPost({
        orderId: orderId,
        orderStatus: newOrderStatus,
      });

      if (response.data.isSucceed) {
        toast.success('Durum başarıyla güncellendi');
        fetchOrderDetail();
      } else {
        toast.error(response.data.message || 'Durum güncellenemedi');
      }
    } catch (error: any) {
      console.error('Status update error:', error);
      toast.error(error.response?.data?.message || 'Bir hata oluştu');
    } finally {
      setIsUpdating(false);
    }
  };

  if (isLoading) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/10 backdrop-blur-sm">
        <div className="animate-spin rounded-full h-16 w-16 border-4 border-gray-200 border-t-[#e52b3f]"></div>
      </div>
    );
  }

  if (!data || !data.order) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-600">Sipariş bulunamadı</p>
        <button
          onClick={() => router.back()}
          className="mt-4 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition text-gray-700 font-medium"
        >
          Geri Dön
        </button>
      </div>
    );
  }

  const { order, address, childInfo } = data;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Sipariş Detayı</h1>
          <p className="text-gray-600 mt-1">Sipariş bilgilerini görüntüleyin</p>
        </div>
        <button
          onClick={() => router.back()}
          className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition text-gray-700 font-medium"
        >
          ← Geri Dön
        </button>
      </div>

      {/* Sipariş Bilgileri */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 space-y-4">
        <h2 className="text-lg font-semibold text-gray-900 border-b border-gray-200 pb-3">🛒 Sipariş Bilgileri</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <InfoItem label="Sipariş No" value={order.orderNo} />
          <InfoItem label="Ürün" value={order.itemName} />
          <InfoItem label="Fiyat" value={`₺${order.price?.toLocaleString('tr-TR')}`} />
          <InfoItem label="Ödeme Durumu" value={order.paymentStatus} />
          <InfoItem label="Sipariş Durumu" value={order.orderStatus} />
          <InfoItem
            label="Sipariş Tarihi"
            value={order.orderDate ? new Date(order.orderDate).toLocaleDateString('tr-TR') : '-'}
          />
        </div>
      </div>

      {/* Müşteri Bilgileri */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 space-y-4">
        <h2 className="text-lg font-semibold text-gray-900 border-b border-gray-200 pb-3">👤 Müşteri Bilgileri</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <InfoItem label="Ad Soyad" value={`${order.firstName} ${order.lastName}`} />
          <InfoItem label="E-posta" value={order.email} />
          <InfoItem label="Telefon" value={order.telephoneNumber} />
          <InfoItem
            label="Kayıt Tarihi"
            value={order.createdAt ? new Date(order.createdAt).toLocaleDateString('tr-TR') : '-'}
          />
        </div>
      </div>

      {/* Teslimat Adresi */}
      {address && (
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 space-y-4">
          <h2 className="text-lg font-semibold text-gray-900 border-b border-gray-200 pb-3">📍 Teslimat Adresi</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <InfoItem label="Adres Adı" value={address.addressName} />
            <InfoItem label="Ad Soyad" value={`${address.firstName} ${address.lastName}`} />
            <InfoItem label="Telefon" value={address.phoneNumber} />
            <InfoItem label="Şehir" value={address.city} />
            <InfoItem label="İlçe" value={address.district} />
            <InfoItem label="Posta Kodu" value={address.zipCode} />
            <div className="col-span-2">
              <InfoItem label="Adres" value={address.addressInfo} />
            </div>
          </div>
        </div>
      )}

      {/* Çocuk Bilgileri */}
      {childInfo && (
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 space-y-4">
          <h2 className="text-lg font-semibold text-gray-900 border-b border-gray-200 pb-3">👶 Çocuk Bilgileri</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <InfoItem label="Ad Soyad" value={childInfo.fullName} />
            <InfoItem
              label="Cinsiyet"
              value={childInfo.gender === 1 ? 'Erkek' : childInfo.gender === 2 ? 'Kız' : 'Belirtilmemiş'}
            />
            <InfoItem label="Doğum Tarihi" value={childInfo.dateOfBirth} />
          </div>
        </div>
      )}

      {/* Durum Güncelleme */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 space-y-4">
        <h2 className="text-lg font-semibold text-gray-900 border-b border-gray-200 pb-3">⚙️ Sipariş Durumunu Güncelle</h2>
        <div className="flex flex-col sm:flex-row gap-4 items-end">
          <div className="flex-1 w-full">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Yeni Durum
            </label>
            <select
              value={newOrderStatus}
              onChange={(e) => setNewOrderStatus(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#e52b3f] focus:border-[#e52b3f] text-gray-900"
            >
              <option value="Pending">Pending (Beklemede)</option>
              <option value="Processing">Processing (Hazırlanıyor)</option>
              <option value="Shipped">Shipped (Kargoya Verildi)</option>
              <option value="Delivered">Delivered (Teslim Edildi)</option>
              <option value="Cancelled">Cancelled (İptal Edildi)</option>
              <option value="Returned">Returned (İade Edildi)</option>
            </select>
          </div>
          <button
            onClick={handleStatusUpdate}
            disabled={isUpdating || newOrderStatus === order.orderStatus}
            className="w-full sm:w-auto px-6 py-2 bg-gradient-to-r from-[#e52b3f] to-[#ff4757] text-white rounded-lg hover:shadow-lg transition disabled:opacity-50 disabled:cursor-not-allowed font-medium"
          >
            {isUpdating ? 'Güncelleniyor...' : 'Durumu Güncelle'}
          </button>
        </div>
      </div>
    </div>
  );
}

function InfoItem({ label, value }: { label: string; value?: string | null }) {
  return (
    <div>
      <p className="text-xs text-gray-500 mb-1">{label}</p>
      <p className="text-sm font-medium text-gray-900">{value || '-'}</p>
    </div>
  );
}

