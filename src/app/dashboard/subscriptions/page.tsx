'use client';

import { useEffect, useState } from 'react';
import { adminApi } from '@/lib/api-client';
import { SubscriptionListAdminResponse } from '@/api/generated';
import Link from 'next/link';

type FilterType = 'all' | 'today' | 'last_week' | 'last_month';

export default function SubscriptionsPage() {
  const [subscriptions, setSubscriptions] = useState<SubscriptionListAdminResponse[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [pageNumber, setPageNumber] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [filter, setFilter] = useState<FilterType>('all');
  const pageSize = 10;

  useEffect(() => {
    fetchSubscriptions();
  }, [pageNumber, filter]);

  const fetchSubscriptions = async () => {
    try {
      setIsLoading(true);
      const response = await adminApi.apiAdminSubscriptionListPost({
        pageNumber,
        pageSize,
        filter: filter === 'all' ? undefined : filter,
      });
      if (response.data.isSucceed && response.data.data) {
        setSubscriptions(response.data.data.data || []);
        setTotalPages(response.data.data.totalPages || 1);
      }
    } catch (error) {
      console.error('Subscriptions fetch error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const getStatusBadge = (status?: string) => {
    const statusColors: Record<string, string> = {
      ACTIVE: 'bg-green-100 text-green-800',
      CANCELLED: 'bg-red-100 text-red-800',
      PAUSED: 'bg-yellow-100 text-yellow-800',
      EXPIRED: 'bg-gray-100 text-gray-800',
    };
    return statusColors[status || ''] || 'bg-gray-100 text-gray-800';
  };

  if (isLoading) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/10 backdrop-blur-sm">
        <div className="animate-spin rounded-full h-16 w-16 border-4 border-gray-200 border-t-[#e52b3f]"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm">
        <div className="flex flex-col gap-4">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#e52b3f] to-[#ff4757] flex items-center justify-center shadow-lg">
              <span className="text-2xl">📅</span>
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">
                Abonelik Yönetimi
              </h1>
              <p className="text-sm text-gray-500">Kullanıcı aboneliklerini görüntüleyin ve yönetin</p>
            </div>
          </div>

          {/* Filtreler */}
          <div className="grid grid-cols-2 lg:flex lg:flex-row gap-2">
            <button
              onClick={() => setFilter('all')}
              className={`w-full px-4 py-2 rounded-lg transition-all duration-200 font-medium text-sm ${
                filter === 'all'
                  ? 'bg-[#e52b3f] text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              Tümü
            </button>
            <button
              onClick={() => setFilter('today')}
              className={`w-full px-4 py-2 rounded-lg transition-all duration-200 font-medium text-sm ${
                filter === 'today'
                  ? 'bg-[#e52b3f] text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              Bugün
            </button>
            <button
              onClick={() => setFilter('last_week')}
              className={`w-full px-4 py-2 rounded-lg transition-all duration-200 font-medium text-sm ${
                filter === 'last_week'
                  ? 'bg-[#e52b3f] text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              Son 7 Gün
            </button>
            <button
              onClick={() => setFilter('last_month')}
              className={`w-full px-4 py-2 rounded-lg transition-all duration-200 font-medium text-sm ${
                filter === 'last_month'
                  ? 'bg-[#e52b3f] text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              Son 30 Gün
            </button>
          </div>
        </div>
      </div>

      {/* Abonelik Tablosu */}
      <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-100">
            <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Müşteri
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                İletişim
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Abonelik
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Fiyat
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Başlangıç
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Durum
              </th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                İşlemler
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {subscriptions.length === 0 ? (
              <tr>
                <td colSpan={7} className="px-6 py-16">
                  <div className="flex flex-col items-center justify-center text-center">
                    <div className="w-20 h-20 rounded-full bg-gray-100 flex items-center justify-center mb-4">
                      <svg className="w-10 h-10 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                    </div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">Henüz abonelik bulunmuyor</h3>
                    <p className="text-sm text-gray-500">Henüz hiç abonelik kaydı yok</p>
                  </div>
                </td>
              </tr>
            ) : (
              subscriptions.map((subscription) => (
              <tr key={subscription.subscriptionId} className="hover:bg-gray-50">
                <td className="px-6 py-4">
                  <div className="text-sm font-medium text-gray-900">
                    {subscription.firstName} {subscription.lastName}
                  </div>
                  <div className="text-xs text-gray-500">{subscription.subscriptionName}</div>
                </td>
                <td className="px-6 py-4">
                  <div className="text-sm text-gray-900">{subscription.email}</div>
                  <div className="text-xs text-gray-500">{subscription.telephoneNumber}</div>
                </td>
                <td className="px-6 py-4 text-sm text-gray-900">{subscription.itemName}</td>
                <td className="px-6 py-4 text-sm font-medium text-gray-900">
                  ₺{subscription.price?.toLocaleString('tr-TR')}
                </td>
                <td className="px-6 py-4 text-sm text-gray-900">
                  {subscription.startDate
                    ? new Date(subscription.startDate).toLocaleDateString('tr-TR')
                    : '-'}
                </td>
                <td className="px-6 py-4">
                  <span className={`px-2 py-1 text-xs rounded-full ${getStatusBadge(subscription.status || undefined)}`}>
                    {subscription.status}
                  </span>
                </td>
                <td className="px-6 py-4 text-right text-sm">
                  <Link
                    href={`/dashboard/subscriptions/${subscription.subscriptionId}`}
                    className="px-4 py-2 text-sm font-medium text-white bg-gradient-to-r from-[#e52b3f] to-[#ff4757] hover:shadow-lg rounded-lg transition-all"
                  >
                    Detay
                  </Link>
                </td>
              </tr>
              ))
            )}
          </tbody>
          </table>
        </div>
      </div>

      {/* Pagination */}
      {subscriptions.length > 0 && (
        <div className="bg-white rounded-2xl border border-gray-100 p-4 shadow-sm">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <span className="text-sm text-gray-500">
              Sayfa <span className="font-semibold text-gray-900">{pageNumber}</span> / <span className="font-semibold text-gray-900">{totalPages}</span>
            </span>
            <div className="flex gap-2">
              <button
                onClick={() => setPageNumber((p) => Math.max(1, p - 1))}
                disabled={pageNumber === 1}
                className="px-5 py-2.5 text-sm font-medium text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-xl disabled:opacity-50 disabled:cursor-not-allowed transition-all"
              >
                Önceki
              </button>
              <button
                onClick={() => setPageNumber((p) => Math.min(totalPages, p + 1))}
                disabled={pageNumber === totalPages}
                className="px-5 py-2.5 text-sm font-medium text-white bg-gradient-to-r from-[#e52b3f] to-[#ff4757] hover:shadow-lg rounded-xl disabled:opacity-50 disabled:cursor-not-allowed transition-all"
              >
                Sonraki
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

