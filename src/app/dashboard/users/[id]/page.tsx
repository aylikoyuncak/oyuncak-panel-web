'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { adminApi } from '@/lib/api-client';
import { UserDetailsDto } from '@/api/generated';
import toast from 'react-hot-toast';

export default function UserDetailPage() {
  const params = useParams();
  const router = useRouter();
  const userId = params.id as string;
  const [user, setUser] = useState<UserDetailsDto | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchUserDetail();
  }, [userId]);

  const fetchUserDetail = async () => {
    try {
      const response = await adminApi.apiAdminUserDetailUserIdGet(userId);
      if (response.data.isSucceed && response.data.data) {
        setUser(response.data.data);
      }
    } catch (error) {
      console.error('User detail fetch error:', error);
      toast.error('Kullanıcı detayları yüklenemedi');
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-10 w-10 border-3 border-gray-200 border-t-[#e52b3f]"></div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-600">Kullanıcı bulunamadı</p>
        <button
          onClick={() => router.back()}
          className="mt-4 text-blue-600 hover:text-blue-800"
        >
          Geri Dön
        </button>
      </div>
    );
  }


  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Kullanıcı Detayı</h1>
          <p className="text-gray-600 mt-1">Kullanıcı bilgilerini görüntüleyin</p>
        </div>
        <button
          onClick={() => router.back()}
          className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition text-gray-700 font-medium"
        >
          ← Geri Dön
        </button>
      </div>

      {/* Kullanıcı Profili */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
        <div className="flex items-center gap-6 mb-6">
          <div className="w-20 h-20 rounded-full bg-gray-100 flex items-center justify-center">
            <span className="text-gray-600 font-semibold text-2xl">
              {user.firstName?.[0]}{user.lastName?.[0]}
            </span>
          </div>
          <div>
            <h2 className="text-2xl font-bold text-gray-900">
              {user.firstName} {user.lastName}
            </h2>
            {user.userName && (
              <p className="text-gray-600">@{user.userName}</p>
            )}
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 border-t border-gray-200 pt-6">
          <InfoItem label="E-posta" value={user.email} />
          <InfoItem label="Kullanıcı Adı" value={user.userName} />
        </div>
      </div>

      {/* Adresler */}
      {user.addresses && user.addresses.length > 0 && (
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 space-y-4">
          <h2 className="text-lg font-semibold text-gray-900 border-b border-gray-200 pb-3">📍 Adresler</h2>
          <div className="space-y-4">
            {user.addresses.map((address, index) => (
              <div key={index} className="p-4 bg-gray-50 rounded-lg">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="font-medium text-gray-900">{address.addressName}</h3>
                </div>
                <div className="grid grid-cols-2 gap-2 text-sm">
                  <p className="text-gray-600">
                    {address.firstName} {address.lastName}
                  </p>
                  <p className="text-gray-600">{address.phoneNumber}</p>
                  <p className="text-gray-600">{address.city} / {address.district}</p>
                  <p className="text-gray-600">{address.zipCode}</p>
                  <p className="col-span-2 text-gray-600">{address.addressInfo}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Çocuklar */}
      {user.childInfos && user.childInfos.length > 0 && (
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 space-y-4">
          <h2 className="text-lg font-semibold text-gray-900 border-b border-gray-200 pb-3">👶 Çocuklar</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {user.childInfos.map((child, index) => (
              <div key={index} className="p-4 bg-gray-50 rounded-lg">
                <h3 className="font-medium text-gray-900 mb-2">{child.fullName}</h3>
                <div className="space-y-1 text-sm text-gray-600">
                  <p>Cinsiyet: {child.gender === 1 ? 'Erkek' : child.gender === 2 ? 'Kız' : 'Belirtilmemiş'}</p>
                  <p>Doğum Tarihi: {child.dateOfBirth ? new Date(child.dateOfBirth).toLocaleDateString('tr-TR') : '-'}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Abonelikler */}
      {user.subscriptions && user.subscriptions.length > 0 && (
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 space-y-4">
          <h2 className="text-lg font-semibold text-gray-900 border-b border-gray-200 pb-3">📅 Abonelikler</h2>
          <div className="space-y-3">
            {user.subscriptions.map((subscription, index) => (
              <div key={index} className="p-4 bg-gray-50 rounded-lg flex items-center justify-between">
                <div>
                  <h3 className="font-medium text-gray-900">{subscription.subscriptionName}</h3>
                  <p className="text-sm text-gray-600">
                    Başlangıç: {subscription.startDate ? new Date(subscription.startDate).toLocaleDateString('tr-TR') : '-'}
                  </p>
                </div>
                <span className={`px-3 py-1 text-xs rounded-full ${
                  subscription.status === 'ACTIVE'
                    ? 'bg-green-100 text-green-800'
                    : 'bg-gray-100 text-gray-800'
                }`}>
                  {subscription.status}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Siparişler */}
      {user.orders && user.orders.length > 0 && (
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 space-y-4">
          <h2 className="text-lg font-semibold text-gray-900 border-b border-gray-200 pb-3">🛒 Siparişler</h2>
          <div className="space-y-3">
            {user.orders.map((order, index) => (
              <div key={index} className="p-4 bg-gray-50 rounded-lg flex items-center justify-between">
                <div>
                  <h3 className="font-medium text-gray-900">{order.itemName}</h3>
                  <p className="text-sm text-gray-600">
                    Sipariş No: {order.orderNo}
                  </p>
                  <p className="text-sm text-gray-600">
                    Tarih: {order.orderDate ? new Date(order.orderDate).toLocaleDateString('tr-TR') : '-'}
                  </p>
                </div>
                <div className="text-right">
                  <p className="font-medium text-gray-900">₺{order.price?.toLocaleString('tr-TR')}</p>
                  <span className={`inline-block mt-1 px-2 py-1 text-xs rounded-full ${
                    order.orderStatus === 'Delivered'
                      ? 'bg-green-100 text-green-800'
                      : order.orderStatus === 'Cancelled'
                      ? 'bg-red-100 text-red-800'
                      : 'bg-blue-100 text-blue-800'
                  }`}>
                    {order.orderStatus}
                  </span>
                </div>
              </div>
            ))}
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

