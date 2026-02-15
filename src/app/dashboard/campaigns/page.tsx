'use client';

import { useEffect, useState } from 'react';
import { adminApi } from '@/lib/api-client';
import { CampaignDto } from '@/api/generated';
import Link from 'next/link';
import toast from 'react-hot-toast';

export default function CampaignsPage() {
  const [campaigns, setCampaigns] = useState<CampaignDto[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [pageNumber, setPageNumber] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const pageSize = 10;

  useEffect(() => {
    fetchCampaigns();
  }, [pageNumber]);

  const fetchCampaigns = async () => {
    try {
      setIsLoading(true);
      const response = await adminApi.apiAdminCampaignListPost({
        pageNumber,
        pageSize,
      });
      if (response.data.isSucceed && response.data.data) {
        setCampaigns(response.data.data.data || []);
        setTotalPages(response.data.data.totalPages || 1);
      }
    } catch (error) {
      console.error('Campaigns fetch error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDelete = async (campaignId: string) => {
    if (!confirm('Bu kampanyayı silmek istediğinizden emin misiniz?')) return;

    try {
      const response = await adminApi.apiAdminDeleteCampaignCampaignIdPost(campaignId);
      if (response.data.isSucceed) {
        toast.success('Kampanya başarıyla silindi');
        fetchCampaigns();
      } else {
        toast.error(response.data.message || 'Silme işlemi başarısız');
      }
    } catch (error: any) {
      console.error('Delete error:', error);
      toast.error(error.response?.data?.message || 'Silme işlemi başarısız');
    }
  };

  const isExpired = (expirationDate?: string) => {
    if (!expirationDate) return false;
    return new Date(expirationDate) < new Date();
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
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#e52b3f] to-[#ff4757] flex items-center justify-center shadow-lg">
              <span className="text-2xl">🎯</span>
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">
                Kampanya Yönetimi
              </h1>
              <p className="text-sm text-gray-500">İndirim kampanyalarını yönetin</p>
            </div>
          </div>
          <Link
            href="/dashboard/campaigns/add"
            className="inline-flex items-center justify-center gap-2 px-5 py-3 bg-gradient-to-r from-[#e52b3f] to-[#ff4757] hover:shadow-xl text-white rounded-xl transition-all duration-200 font-semibold text-sm transform hover:-translate-y-0.5"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>
            Yeni Kampanya Ekle
          </Link>
        </div>
      </div>

      {/* Kampanya Tablosu */}
      <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-100">
            <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Kampanya Kodu
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                İndirim Tipi
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                İndirim Miktarı
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Kullanım
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Son Kullanma
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Durum
              </th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                İşlemler
              </th>
            </tr>
          </thead>
            <tbody className="bg-white divide-y divide-gray-100">
            {campaigns.length === 0 ? (
              <tr>
                <td colSpan={7} className="px-6 py-16">
                  <div className="flex flex-col items-center justify-center text-center">
                    <div className="w-20 h-20 rounded-full bg-gray-100 flex items-center justify-center mb-4">
                      <svg className="w-10 h-10 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
                      </svg>
                    </div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">Henüz kampanya eklenmemiş</h3>
                    <p className="text-sm text-gray-500 mb-4">İlk kampanyanızı oluşturarak başlayın</p>
                    <Link
                      href="/dashboard/campaigns/add"
                      className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-[#e52b3f] to-[#ff4757] text-white rounded-lg hover:shadow-lg transition-all text-sm font-medium"
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                      </svg>
                      Yeni Kampanya Ekle
                    </Link>
                  </div>
                </td>
              </tr>
            ) : (
              campaigns.map((campaign) => (
              <tr key={campaign.id} className={isExpired(campaign.expiration) ? 'bg-gray-50 opacity-60' : ''}>
                <td className="px-6 py-4">
                  <div className="flex items-center gap-2">
                    <code className="text-sm font-mono font-medium text-gray-900 bg-gray-100 px-2 py-1 rounded">
                      {campaign.code}
                    </code>
                    <button
                      onClick={() => {
                        navigator.clipboard.writeText(campaign.code || '');
                        toast.success('Kod kopyalandı!');
                      }}
                      className="text-gray-400 hover:text-gray-600"
                      title="Kopyala"
                    >
                      📋
                    </button>
                  </div>
                </td>
                <td className="px-6 py-4 text-sm text-gray-900">
                  {campaign.discountAmount ? '💵 Sabit Tutar' : '📊 Yüzde'}
                </td>
                <td className="px-6 py-4 text-sm font-medium text-green-600">
                  {campaign.discountAmount
                    ? `₺${campaign.discountAmount.toLocaleString('tr-TR')}`
                    : `%${campaign.discountPercentage}`}
                </td>
                <td className="px-6 py-4 text-sm text-gray-900">
                  {campaign.maxUsageCount != null
                    ? `${campaign.usedCount ?? 0} / ${campaign.maxUsageCount}`
                    : `${campaign.usedCount ?? 0} (sınırsız)`}
                </td>
                <td className="px-6 py-4 text-sm text-gray-900">
                  {campaign.expiration
                    ? new Date(campaign.expiration).toLocaleDateString('tr-TR')
                    : '-'}
                </td>
                <td className="px-6 py-4">
                  <span
                    className={`px-2 py-1 text-xs rounded-full ${
                      isExpired(campaign.expiration)
                        ? 'bg-red-100 text-red-800'
                        : 'bg-green-100 text-green-800'
                    }`}
                  >
                    {isExpired(campaign.expiration) ? 'Süresi Dolmuş' : 'Aktif'}
                  </span>
                </td>
                <td className="px-6 py-4 text-right text-sm space-x-2">
                  <Link
                    href={`/dashboard/campaigns/edit/${campaign.id}`}
                    className="px-4 py-2 text-sm font-medium text-white bg-gradient-to-r from-[#e52b3f] to-[#ff4757] hover:shadow-lg rounded-lg transition-all"
                  >
                    Düzenle
                  </Link>
                  <button
                    onClick={() => handleDelete(campaign.id || '')}
                    className="px-4 py-2 text-sm font-medium text-white bg-gradient-to-r from-red-500 to-red-600 hover:shadow-lg rounded-lg transition-all"
                  >
                    Sil
                  </button>
                </td>
              </tr>
              ))
            )}
          </tbody>
          </table>
        </div>
      </div>

      {/* Pagination */}
      {campaigns.length > 0 && (
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

