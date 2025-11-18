'use client';

import { useEffect, useState } from 'react';
import { adminApi } from '@/lib/api-client';
import { OrderListAdminResponse } from '@/api/generated';
import Link from 'next/link';

type FilterType = 'all' | 'today' | 'last_week' | 'last_month';

export default function OrdersPage() {
  const [orders, setOrders] = useState<OrderListAdminResponse[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [pageNumber, setPageNumber] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [filter, setFilter] = useState<FilterType>('all');
  const pageSize = 10;

  useEffect(() => {
    fetchOrders();
  }, [pageNumber, filter]);

  const fetchOrders = async () => {
    try {
      setIsLoading(true);
      const response = await adminApi.apiAdminOrderListPost({
        pageNumber,
        pageSize,
        filter: filter === 'all' ? undefined : filter,
      });
      if (response.data.isSucceed && response.data.data) {
        setOrders(response.data.data.data || []);
        setTotalPages(response.data.data.totalPages || 1);
      }
    } catch (error) {
      console.error('Orders fetch error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const getPaymentStatusBadge = (status?: string) => {
    const statusColors: Record<string, string> = {
      Pending: 'bg-yellow-100 text-yellow-800',
      Completed: 'bg-green-100 text-green-800',
      Failed: 'bg-red-100 text-red-800',
      Refunded: 'bg-purple-100 text-purple-800',
      Cancelled: 'bg-gray-100 text-gray-800',
    };
    return statusColors[status || ''] || 'bg-gray-100 text-gray-800';
  };

  const getOrderStatusBadge = (status?: string) => {
    const statusColors: Record<string, string> = {
      Pending: 'bg-yellow-100 text-yellow-800',
      Processing: 'bg-blue-100 text-blue-800',
      Shipped: 'bg-indigo-100 text-indigo-800',
      Delivered: 'bg-green-100 text-green-800',
      Cancelled: 'bg-red-100 text-red-800',
      Returned: 'bg-orange-100 text-orange-800',
    };
    return statusColors[status || ''] || 'bg-gray-100 text-gray-800';
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="relative">
          <div className="animate-spin rounded-full h-16 w-16 border-4 border-pink-200"></div>
          <div className="animate-spin rounded-full h-16 w-16 border-4 border-purple-500 border-t-transparent absolute top-0 left-0"></div>
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="text-2xl">🛒</span>
          </div>
        </div>
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
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
              </svg>
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">
                Sipariş Yönetimi
              </h1>
              <p className="text-sm text-gray-500">Siparişleri görüntüleyin ve yönetin</p>
            </div>
          </div>

          {/* Filtreler */}
          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => setFilter('all')}
              className={`px-4 py-2 rounded-lg transition-all duration-200 font-medium text-sm ${
                filter === 'all'
                  ? 'bg-[#e52b3f] text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              Tümü
            </button>
            <button
              onClick={() => setFilter('today')}
              className={`px-4 py-2 rounded-lg transition-all duration-200 font-medium text-sm ${
                filter === 'today'
                  ? 'bg-[#e52b3f] text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              Bugün
            </button>
            <button
              onClick={() => setFilter('last_week')}
              className={`px-4 py-2 rounded-lg transition-all duration-200 font-medium text-sm ${
                filter === 'last_week'
                  ? 'bg-[#e52b3f] text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              Son 7 Gün
            </button>
            <button
              onClick={() => setFilter('last_month')}
              className={`px-4 py-2 rounded-lg transition-all duration-200 font-medium text-sm ${
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

      {/* Sipariş Tablosu */}
      <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-100">
            <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Sipariş No
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Müşteri
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Ürün
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Fiyat
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Ödeme Durumu
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Sipariş Durumu
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Tarih
              </th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                İşlemler
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {orders.map((order) => (
              <tr key={order.orderId} className="hover:bg-gray-50">
                <td className="px-6 py-4">
                  <code className="text-xs font-mono bg-gray-100 px-2 py-1 rounded text-gray-900">
                    {order.orderNo}
                  </code>
                </td>
                <td className="px-6 py-4">
                  <div className="text-sm font-medium text-gray-900">
                    {order.firstName} {order.lastName}
                  </div>
                  <div className="text-xs text-gray-500">{order.email}</div>
                </td>
                <td className="px-6 py-4 text-sm text-gray-900">{order.itemName}</td>
                <td className="px-6 py-4 text-sm font-medium text-gray-900">
                  ₺{order.price?.toLocaleString('tr-TR')}
                </td>
                <td className="px-6 py-4">
                  <span
                    className={`px-2 py-1 text-xs rounded-full ${getPaymentStatusBadge(
                      order.paymentStatus || undefined
                    )}`}
                  >
                    {order.paymentStatus}
                  </span>
                </td>
                <td className="px-6 py-4">
                  <span
                    className={`px-2 py-1 text-xs rounded-full ${getOrderStatusBadge(
                      order.orderStatus || undefined
                    )}`}
                  >
                    {order.orderStatus}
                  </span>
                </td>
                <td className="px-6 py-4 text-sm text-gray-900">
                  {order.orderDate
                    ? new Date(order.orderDate).toLocaleDateString('tr-TR')
                    : '-'}
                </td>
                <td className="px-6 py-4 text-right text-sm">
                  <Link
                    href={`/dashboard/orders/${order.orderId}`}
                    className="px-4 py-2 text-sm font-medium text-white bg-gradient-to-r from-[#e52b3f] to-[#ff4757] hover:shadow-lg rounded-lg transition-all"
                  >
                    Detay
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
          </table>
        </div>
      </div>

      {/* Pagination */}
      {orders.length > 0 && (
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

