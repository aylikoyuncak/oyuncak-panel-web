'use client';

import { useEffect, useState } from 'react';
import { adminApi } from '@/lib/api-client';
import { ItemDto } from '@/api/generated';
import Link from 'next/link';
import toast from 'react-hot-toast';

export default function ItemsPage() {
  const [items, setItems] = useState<ItemDto[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [pageNumber, setPageNumber] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const pageSize = 10;

  useEffect(() => {
    fetchItems();
  }, [pageNumber]);

  const fetchItems = async () => {
    try {
      setIsLoading(true);
      const response = await adminApi.apiAdminItemListPost({
        pageNumber,
        pageSize,
      });
      if (response.data.isSucceed && response.data.data) {
        setItems(response.data.data.data || []);
        setTotalPages(response.data.data.totalPages || 1);
      }
    } catch (error) {
      console.error('Items fetch error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDelete = async (itemId: string) => {
    if (!confirm('Bu ürünü silmek istediğinizden emin misiniz?')) return;

    try {
      const response = await adminApi.apiAdminDeleteItemItemIdPost(itemId);
      if (response.data.isSucceed) {
        toast.success('Ürün başarıyla silindi');
        fetchItems();
      } else {
        toast.error(response.data.message || 'Silme işlemi başarısız');
      }
    } catch (error: any) {
      console.error('Delete error:', error);
      toast.error(error.response?.data?.message || 'Silme işlemi başarısız');
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="relative">
          <div className="animate-spin rounded-full h-16 w-16 border-4 border-pink-200"></div>
          <div className="animate-spin rounded-full h-16 w-16 border-4 border-purple-500 border-t-transparent absolute top-0 left-0"></div>
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="text-2xl">📦</span>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#e52b3f] to-[#ff4757] flex items-center justify-center shadow-lg">
              <span className="text-2xl">📦</span>
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">
                Ürün Yönetimi
              </h1>
              <p className="text-sm text-gray-500">Oyuncak paketlerini yönetin</p>
            </div>
          </div>
          <Link
            href="/dashboard/items/add"
            className="inline-flex items-center justify-center gap-2 px-5 py-3 bg-gradient-to-r from-[#e52b3f] to-[#ff4757] hover:shadow-xl text-white rounded-xl transition-all duration-200 font-semibold text-sm transform hover:-translate-y-0.5"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>
            Yeni Ürün Ekle
          </Link>
        </div>
      </div>

      {/* Desktop Table View */}
      <div className="hidden lg:block bg-white rounded-2xl border border-gray-100 overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-100">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                  Başlık
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                  Tip
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                  Fiyat
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                  İndirimli Fiyat
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                  Paket Süresi
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                  Durum
                </th>
                <th className="px-6 py-4 text-right text-xs font-semibold text-gray-700 uppercase tracking-wider">
                  İşlemler
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {items.length === 0 ? (
                <tr>
                  <td colSpan={7} className="px-6 py-12 text-center text-gray-500">
                    Henüz ürün eklenmemiş
                  </td>
                </tr>
              ) : (
                items.map((item) => (
                  <tr key={item.id} className={`hover:bg-gray-50 transition-colors ${item.isDeleted ? 'opacity-60' : ''}`}>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <div className="text-sm font-semibold text-gray-900">{item.title}</div>
                        {item.mostPreffered && (
                          <span className="px-3 py-1 text-xs bg-gradient-to-r from-amber-400 to-orange-400 text-white rounded-full font-semibold shadow-md">
                            ⭐ Popüler
                          </span>
                        )}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className="inline-flex items-center gap-1 text-sm text-gray-700">
                        {item.itemType === 1 ? '🎁 Premium' : '📦 Paket'}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <span className="text-sm font-semibold text-gray-900">
                        ₺{item.price?.toLocaleString('tr-TR')}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <span className="text-sm font-semibold text-green-600">
                        {item.discountPrice ? `₺${item.discountPrice.toLocaleString('tr-TR')}` : '-'}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-700">
                      {item.packageLength ? `${item.packageLength} ay` : '-'}
                    </td>
                    <td className="px-6 py-4">
                      <span
                        className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${
                          item.isDeleted
                            ? 'bg-red-100 text-red-800'
                            : 'bg-green-100 text-green-800'
                        }`}
                      >
                        {item.isDeleted ? 'Silinmiş' : 'Aktif'}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <Link
                          href={`/dashboard/items/edit/${item.id}`}
                          className="px-4 py-2 text-sm font-medium text-white bg-gradient-to-r from-[#e52b3f] to-[#ff4757] hover:shadow-lg rounded-lg transition-all"
                        >
                          Düzenle
                        </Link>
                        {!item.isDeleted && (
                          <button
                            onClick={() => handleDelete(item.id || '')}
                            className="px-4 py-2 text-sm font-medium text-white bg-gradient-to-r from-red-500 to-red-600 hover:shadow-lg rounded-lg transition-all"
                          >
                            Sil
                          </button>
                        )}
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Mobile Card View */}
      <div className="lg:hidden space-y-4">
        {items.length === 0 ? (
          <div className="bg-gradient-to-br from-white to-pink-50/50 rounded-3xl shadow-xl p-12 text-center border-2 border-pink-200/50">
            <span className="text-6xl mb-4 block">📦</span>
            <p className="text-gray-600 font-medium">Henüz ürün eklenmemiş</p>
          </div>
        ) : (
          items.map((item) => (
            <div
              key={item.id}
              className={`bg-gradient-to-br from-white to-pink-50/30 rounded-3xl shadow-xl p-5 border-2 border-pink-200/50 hover:shadow-2xl transition-all ${item.isDeleted ? 'opacity-60' : ''}`}
            >
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <h3 className="text-lg font-bold text-gray-900">{item.title}</h3>
                    {item.mostPreffered && (
                      <span className="px-3 py-1 text-xs bg-gradient-to-r from-yellow-400 via-orange-400 to-pink-400 text-white rounded-full font-bold shadow-lg">
                        ⭐ Popüler
                      </span>
                    )}
                  </div>
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <span>{item.itemType === 1 ? '🎁 Premium' : '📦 Paket'}</span>
                    {item.packageLength && <span>• {item.packageLength} ay</span>}
                  </div>
                </div>
                <span
                  className={`px-3 py-1 rounded-full text-xs font-medium ${
                    item.isDeleted
                      ? 'bg-red-100 text-red-800'
                      : 'bg-green-100 text-green-800'
                  }`}
                >
                  {item.isDeleted ? 'Silinmiş' : 'Aktif'}
                </span>
              </div>
              <div className="grid grid-cols-2 gap-4 mb-4">
                <div>
                  <p className="text-xs text-gray-500 mb-1">Fiyat</p>
                  <p className="text-base font-semibold text-gray-900">
                    ₺{item.price?.toLocaleString('tr-TR')}
                  </p>
                </div>
                <div>
                  <p className="text-xs text-gray-500 mb-1">İndirimli Fiyat</p>
                  <p className="text-base font-semibold text-green-600">
                    {item.discountPrice ? `₺${item.discountPrice.toLocaleString('tr-TR')}` : '-'}
                  </p>
                </div>
              </div>
              <div className="flex gap-2 pt-4 border-t-2 border-pink-200">
                <Link
                  href={`/dashboard/items/edit/${item.id}`}
                  className="flex-1 px-4 py-2 text-sm font-medium text-center text-white bg-gradient-to-r from-[#e52b3f] to-[#ff4757] hover:shadow-lg rounded-lg transition-all"
                >
                  Düzenle
                </Link>
                {!item.isDeleted && (
                  <button
                    onClick={() => handleDelete(item.id || '')}
                    className="flex-1 px-4 py-2 text-sm font-medium text-white bg-gradient-to-r from-red-500 to-red-600 hover:shadow-lg rounded-lg transition-all"
                  >
                    Sil
                  </button>
                )}
              </div>
            </div>
          ))
        )}
      </div>

      {/* Pagination */}
      {items.length > 0 && (
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

