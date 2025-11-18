'use client';

import { useState, FormEvent, useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { adminApi } from '@/lib/api-client';
import { CampaignDto } from '@/api/generated';
import toast from 'react-hot-toast';

export default function EditCampaignPage() {
  const router = useRouter();
  const params = useParams();
  const campaignId = params.id as string;
  const [isLoading, setIsLoading] = useState(false);
  const [isFetching, setIsFetching] = useState(true);
  const [discountType, setDiscountType] = useState<'amount' | 'percentage'>('percentage');
  const [formData, setFormData] = useState({
    id: campaignId,
    code: '',
    discountAmount: '',
    discountPercentage: '',
    expiration: '',
  });

  useEffect(() => {
    fetchCampaign();
  }, [campaignId]);

  const fetchCampaign = async () => {
    try {
      const response = await adminApi.apiAdminGetCampaignCampaignIdGet(campaignId);
      if (response.data.isSucceed && response.data.data) {
        const campaign: CampaignDto = response.data.data;
        const type = campaign.discountAmount ? 'amount' : 'percentage';
        setDiscountType(type);
        setFormData({
          id: campaignId,
          code: campaign.code || '',
          discountAmount: campaign.discountAmount?.toString() || '',
          discountPercentage: campaign.discountPercentage?.toString() || '',
          expiration: campaign.expiration
            ? new Date(campaign.expiration).toISOString().slice(0, 16)
            : '',
        });
      }
    } catch (error) {
      console.error('Fetch campaign error:', error);
      toast.error('Kampanya bilgileri yüklenemedi');
    } finally {
      setIsFetching(false);
    }
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const response = await adminApi.apiAdminCampaignPost({
        id: campaignId,
        code: formData.code.toUpperCase(),
        discountAmount: discountType === 'amount' ? parseFloat(formData.discountAmount) : undefined,
        discountPercentage: discountType === 'percentage' ? parseFloat(formData.discountPercentage) : undefined,
        expiration: formData.expiration,
      });

      if (response.data.isSucceed) {
        toast.success('Kampanya başarıyla güncellendi');
        router.push('/dashboard/campaigns');
      } else {
        toast.error(response.data.message || 'Kampanya güncellenemedi');
      }
    } catch (error: any) {
      console.error('Update campaign error:', error);
      toast.error(error.response?.data?.message || 'Bir hata oluştu');
    } finally {
      setIsLoading(false);
    }
  };

  if (isFetching) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="relative">
          <div className="animate-spin rounded-full h-16 w-16 border-4 border-pink-200"></div>
          <div className="animate-spin rounded-full h-16 w-16 border-4 border-purple-500 border-t-transparent absolute top-0 left-0"></div>
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="text-2xl">🎯</span>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-2xl space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Kampanya Düzenle</h1>
        <p className="text-gray-600 mt-1">Kampanya bilgilerini güncelleyin</p>
      </div>

      <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow p-6 space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Kampanya Kodu * (Min. 5 karakter)
          </label>
          <input
            type="text"
            value={formData.code}
            onChange={(e) => setFormData({ ...formData, code: e.target.value.toUpperCase() })}
            required
            minLength={5}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#e52b3f] focus:border-[#e52b3f] uppercase text-gray-900 placeholder:text-gray-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-3">
            İndirim Tipi *
          </label>
          <div className="grid grid-cols-2 gap-4">
            <button
              type="button"
              onClick={() => setDiscountType('percentage')}
              className={`p-4 border-2 rounded-lg transition ${
                discountType === 'percentage'
                  ? 'border-blue-500 bg-blue-50'
                  : 'border-gray-200 hover:border-gray-300'
              }`}
            >
              <div className="text-2xl mb-2">📊</div>
              <div className="font-medium">Yüzde İndirim</div>
            </button>
            <button
              type="button"
              onClick={() => setDiscountType('amount')}
              className={`p-4 border-2 rounded-lg transition ${
                discountType === 'amount'
                  ? 'border-blue-500 bg-blue-50'
                  : 'border-gray-200 hover:border-gray-300'
              }`}
            >
              <div className="text-2xl mb-2">💵</div>
              <div className="font-medium">Sabit Tutar</div>
            </button>
          </div>
        </div>

        {discountType === 'percentage' ? (
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              İndirim Yüzdesi * (1-100 arası)
            </label>
            <div className="relative">
              <input
                type="number"
                step="0.01"
                min="1"
                max="100"
                value={formData.discountPercentage}
                onChange={(e) => setFormData({ ...formData, discountPercentage: e.target.value })}
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#e52b3f] focus:border-[#e52b3f] text-gray-900 placeholder:text-gray-500"
              />
              <span className="absolute right-4 top-2 text-gray-500">%</span>
            </div>
          </div>
        ) : (
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              İndirim Tutarı * (TL)
            </label>
            <div className="relative">
              <span className="absolute left-4 top-2 text-gray-500">₺</span>
              <input
                type="number"
                step="0.01"
                min="0.01"
                value={formData.discountAmount}
                onChange={(e) => setFormData({ ...formData, discountAmount: e.target.value })}
                required
                className="w-full pl-8 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#e52b3f] focus:border-[#e52b3f] text-gray-900 placeholder:text-gray-500"
              />
            </div>
          </div>
        )}

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Son Kullanma Tarihi *
          </label>
          <input
            type="datetime-local"
            value={formData.expiration}
            onChange={(e) => setFormData({ ...formData, expiration: e.target.value })}
            required
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#e52b3f] focus:border-[#e52b3f] text-gray-900 placeholder:text-gray-500"
          />
        </div>

        <div className="flex gap-4">
          <button
            type="submit"
            disabled={isLoading}
            className="flex-1 bg-gradient-to-r from-[#e52b3f] to-[#ff4757] text-white py-2 rounded-lg hover:shadow-lg transition disabled:opacity-50"
          >
            {isLoading ? 'Güncelleniyor...' : 'Güncelle'}
          </button>
          <button
            type="button"
            onClick={() => router.back()}
            className="px-6 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition text-gray-700 font-medium"
          >
            İptal
          </button>
        </div>
      </form>
    </div>
  );
}

