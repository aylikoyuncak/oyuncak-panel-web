'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { adminApi } from '@/lib/api-client';
import { SubscriptionDetailResponse } from '@/api/generated';
import { getBoxDisplayName } from '@/lib/utils';
import toast from 'react-hot-toast';

export default function SubscriptionDetailPage() {
  const params = useParams();
  const router = useRouter();
  const subscriptionId = params.id as string;
  const [data, setData] = useState<SubscriptionDetailResponse | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [newStatus, setNewStatus] = useState('');
  const [isUpdating, setIsUpdating] = useState(false);
  const [showConfirmModal, setShowConfirmModal] = useState(false);

  useEffect(() => {
    fetchSubscriptionDetail();
  }, [subscriptionId]);

  const fetchSubscriptionDetail = async () => {
    try {
      const response = await adminApi.apiAdminSubscriptionDetailSubscriptionIdGet(subscriptionId);
      if (response.data.isSucceed && response.data.data) {
        setData(response.data.data);
        setNewStatus(response.data.data.subscription?.status || '');
      }
    } catch (error) {
      console.error('Subscription detail fetch error:', error);
      toast.error('Abonelik detayları yüklenemedi');
    } finally {
      setIsLoading(false);
    }
  };

  const handleStatusUpdateClick = () => {
    if (!newStatus || newStatus === data?.subscription?.status) return;
    setShowConfirmModal(true);
  };

  const handleStatusUpdate = async () => {
    setShowConfirmModal(false);
    
    try {
      setIsUpdating(true);
      const response = await adminApi.apiAdminUpdateSubscriptionStatusPost({
        subscriptionId,
        status: newStatus,
      });

      if (response.data.isSucceed) {
        toast.success('Durum başarıyla güncellendi');
        fetchSubscriptionDetail();
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

  if (!data) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-600">Abonelik bulunamadı</p>
        <button
          onClick={() => router.back()}
          className="mt-4 text-blue-600 hover:text-blue-800"
        >
          Geri Dön
        </button>
      </div>
    );
  }

  const { subscription, address, childInfo } = data;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Abonelik Detayı</h1>
          <p className="text-gray-600 mt-1">Abonelik bilgilerini görüntüleyin</p>
        </div>
        <button
          onClick={() => router.back()}
          className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition text-gray-700 font-medium"
        >
          ← Geri Dön
        </button>
      </div>

      {/* Abonelik Bilgileri */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 space-y-4">
        <h2 className="text-lg font-semibold text-gray-900 border-b border-gray-200 pb-3">📅 Abonelik Bilgileri</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <InfoItem label="Abonelik Adı" value={subscription?.subscriptionName} />
          <InfoItem label="Paket" value={subscription?.itemName} />
          <InfoItem label="Fiyat" value={`₺${subscription?.price?.toLocaleString('tr-TR')}`} />
          <InfoItem label="Durum" value={subscription?.status} />
          <InfoItem
            label="Başlangıç Tarihi"
            value={subscription?.startDate ? new Date(subscription.startDate).toLocaleDateString('tr-TR') : '-'}
          />
        </div>
      </div>

      {/* Müşteri Bilgileri */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 space-y-4">
        <h2 className="text-lg font-semibold text-gray-900 border-b border-gray-200 pb-3">👤 Müşteri Bilgileri</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <InfoItem
            label="Ad Soyad"
            value={`${subscription?.firstName} ${subscription?.lastName}`}
          />
          <InfoItem label="E-posta" value={subscription?.email} />
          <InfoItem label="Telefon" value={subscription?.telephoneNumber} />
          <InfoItem
            label="Kayıt Tarihi"
            value={subscription?.createdAt ? new Date(subscription.createdAt).toLocaleDateString('tr-TR') : '-'}
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
            {address.isBillingAddress && (
              <>
                <InfoItem
                  label="Fatura Tipi"
                  value={address.invoiceType === 1 ? 'Bireysel' : 'Kurumsal'}
                />
                {address.invoiceType === 2 && (
                  <>
                    <InfoItem label="Şirket Adı" value={address.companyName} />
                    <InfoItem label="Vergi Dairesi" value={address.taxOffice} />
                    <InfoItem label="Vergi No" value={address.taxId} />
                  </>
                )}
              </>
            )}
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
            <InfoItem label="Yaş Grubu" value={getBoxDisplayName(childInfo.boxNumber)} />
          </div>
        </div>
      )}

      {/* Durum Güncelleme */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 space-y-4">
        <h2 className="text-lg font-semibold text-gray-900 border-b border-gray-200 pb-3">⚙️ Durum Güncelle</h2>
        <div className="flex flex-col sm:flex-row gap-4 items-end">
          <div className="flex-1 w-full">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Yeni Durum
            </label>
            <select
              value={newStatus}
              onChange={(e) => setNewStatus(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#e52b3f] focus:border-[#e52b3f] text-gray-900"
            >
              <option value="ACTIVE">ACTIVE (Aktif)</option>
              <option value="CANCELLED">CANCELLED (İptal)</option>
              <option value="PAUSED">PAUSED (Duraklatılmış)</option>
              <option value="EXPIRED">EXPIRED (Süresi Dolmuş)</option>
            </select>
          </div>
          <button
            onClick={handleStatusUpdateClick}
            disabled={isUpdating || newStatus === subscription?.status}
            className="w-full sm:w-auto px-6 py-2 bg-gradient-to-r from-[#e52b3f] to-[#ff4757] text-white rounded-lg hover:shadow-lg transition disabled:opacity-50 disabled:cursor-not-allowed font-medium"
          >
            {isUpdating ? 'Güncelleniyor...' : 'Durumu Güncelle'}
          </button>
        </div>
      </div>

      {/* Confirm Modal */}
      {showConfirmModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
          <div className="bg-white rounded-2xl shadow-xl p-6 max-w-md w-full mx-4">
            <div className="flex items-center gap-4 mb-4">
              <div className="w-12 h-12 rounded-full bg-red-100 flex items-center justify-center">
                <svg className="w-6 h-6 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                </svg>
              </div>
              <div className="flex-1">
                <h3 className="text-lg font-bold text-gray-900">Durum Değişikliği</h3>
                <p className="text-sm text-gray-500 mt-1">Bu işlem geri alınamaz</p>
              </div>
            </div>
            <p className="text-gray-700 mb-6">
              Abonelik durumunu <span className="font-semibold text-gray-900">{subscription?.status}</span> durumundan{' '}
              <span className="font-semibold text-[#e52b3f]">{newStatus}</span> durumuna değiştirmek istediğinizden emin misiniz?
            </p>
            <div className="flex gap-3">
              <button
                onClick={() => setShowConfirmModal(false)}
                className="flex-1 px-4 py-2.5 border border-gray-300 rounded-lg hover:bg-gray-50 transition font-medium text-gray-700"
              >
                İptal
              </button>
              <button
                onClick={handleStatusUpdate}
                disabled={isUpdating}
                className="flex-1 px-4 py-2.5 bg-gradient-to-r from-[#e52b3f] to-[#ff4757] text-white rounded-lg hover:shadow-lg transition disabled:opacity-50 disabled:cursor-not-allowed font-medium"
              >
                {isUpdating ? 'Güncelleniyor...' : 'Evet, Değiştir'}
              </button>
            </div>
          </div>
        </div>
      )}
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

