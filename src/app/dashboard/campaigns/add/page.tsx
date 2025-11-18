'use client';

import { useState, FormEvent } from 'react';
import { useRouter } from 'next/navigation';
import { adminApi } from '@/lib/api-client';
import toast from 'react-hot-toast';

export default function AddCampaignPage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [discountType, setDiscountType] = useState<'amount' | 'percentage'>('percentage');
  const [formData, setFormData] = useState({
    code: '',
    discountAmount: '',
    discountPercentage: '',
    expiration: '',
  });

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const response = await adminApi.apiAdminCampaignPost({
        code: formData.code.toUpperCase(),
        discountAmount: discountType === 'amount' ? parseFloat(formData.discountAmount) : undefined,
        discountPercentage: discountType === 'percentage' ? parseFloat(formData.discountPercentage) : undefined,
        expiration: formData.expiration,
      });

      if (response.data.isSucceed) {
        toast.success('Kampanya başarıyla oluşturuldu');
        router.push('/dashboard/campaigns');
      } else {
        toast.error(response.data.message || 'Kampanya oluşturulamadı');
      }
    } catch (error: any) {
      console.error('Add campaign error:', error);
      toast.error(error.response?.data?.message || 'Bir hata oluştu');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-2xl space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Yeni Kampanya Ekle</h1>
        <p className="text-gray-600 mt-1">Yeni indirim kampanyası oluşturun</p>
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
            placeholder="Örn: SUMMER2024"
          />
          <p className="mt-1 text-xs text-gray-500">Kod otomatik olarak büyük harfe çevrilecektir</p>
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
              <div className="text-xs text-gray-500 mt-1">Fiyatın belirli bir yüzdesi</div>
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
              <div className="text-xs text-gray-500 mt-1">Sabit bir TL miktarı</div>
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
                placeholder="Örn: 15"
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
                placeholder="Örn: 50.00"
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
            min={new Date().toISOString().slice(0, 16)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#e52b3f] focus:border-[#e52b3f] text-gray-900 placeholder:text-gray-500"
          />
          <p className="mt-1 text-xs text-gray-500">Kampanyanın geçerli olacağı son tarih ve saat</p>
        </div>

        <div className="flex gap-4">
          <button
            type="submit"
            disabled={isLoading}
            className="flex-1 bg-gradient-to-r from-[#e52b3f] to-[#ff4757] text-white py-2 rounded-lg hover:shadow-lg transition disabled:opacity-50"
          >
            {isLoading ? 'Oluşturuluyor...' : 'Kampanya Oluştur'}
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

