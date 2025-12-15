'use client';

import { useState, FormEvent } from 'react';
import { useRouter } from 'next/navigation';
import { adminApi } from '@/lib/api-client';
import { ItemTypes } from '@/api/generated';
import toast from 'react-hot-toast';

export default function AddItemPage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    price: '',
    discountPrice: '',
    packageLength: '',
    packageCode: '',
    itemType: '2',
    pricingPlanId: '',
    mostPreffered: false,
    mostPrefferedTitle: '',
  });

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const response = await adminApi.apiAdminItemPost({
        title: formData.title,
        description: formData.description,
        price: parseFloat(formData.price),
        discountPrice: formData.discountPrice ? parseFloat(formData.discountPrice) : undefined,
        packageLength: formData.packageLength ? parseInt(formData.packageLength) : undefined,
        packageCode: formData.packageCode ? parseInt(formData.packageCode) : undefined,
        itemType: parseInt(formData.itemType) as ItemTypes,
        pricingPlanId: formData.pricingPlanId || undefined,
        mostPreffered: formData.mostPreffered,
        mostPrefferedTitle: formData.mostPrefferedTitle || undefined,
        isDeleted: false,
      });

      if (response.data.isSucceed) {
        toast.success('Ürün başarıyla eklendi');
        router.push('/dashboard/items');
      } else {
        toast.error(response.data.message || 'Ürün eklenemedi');
      }
    } catch (error: any) {
      console.error('Add item error:', error);
      toast.error(error.response?.data?.message || 'Bir hata oluştu');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-2xl space-y-6">
      <form onSubmit={handleSubmit} className="bg-gradient-to-br from-white to-pink-50/30 rounded-3xl shadow-xl p-6 sm:p-8 space-y-6 border-2 border-pink-200/50">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Başlık *
          </label>
          <input
            type="text"
            value={formData.title}
            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
            required
            className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#e52b3f] focus:border-[#e52b3f] outline-none transition-all bg-white text-gray-900 placeholder:text-gray-500"
            placeholder="Örn: 6 Aylık Oyuncak Paketi"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Açıklama *
          </label>
          <textarea
            value={formData.description}
            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            required
            rows={4}
            className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#e52b3f] focus:border-[#e52b3f] outline-none transition-all bg-white text-gray-900 placeholder:text-gray-500"
            placeholder="Ürün açıklaması..."
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Fiyat (₺) *
            </label>
            <input
              type="number"
              step="0.01"
              value={formData.price}
              onChange={(e) => setFormData({ ...formData, price: e.target.value })}
              required
              className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#e52b3f] focus:border-[#e52b3f] outline-none transition-all bg-white text-gray-900 placeholder:text-gray-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              İndirimli Fiyat (₺)
            </label>
            <input
              type="number"
              step="0.01"
              value={formData.discountPrice}
              onChange={(e) => setFormData({ ...formData, discountPrice: e.target.value })}
              className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#e52b3f] focus:border-[#e52b3f] outline-none transition-all bg-white text-gray-900 placeholder:text-gray-500"
            />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Paket Süresi (Ay)
            </label>
            <input
              type="number"
              value={formData.packageLength}
              onChange={(e) => setFormData({ ...formData, packageLength: e.target.value })}
              className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#e52b3f] focus:border-[#e52b3f] outline-none transition-all bg-white text-gray-900 placeholder:text-gray-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
            Ürün Tipi *
          </label>
          <select
            value={formData.itemType}
            onChange={(e) => setFormData({ ...formData, itemType: e.target.value })}
            className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#e52b3f] focus:border-[#e52b3f] outline-none transition-all bg-white text-gray-900 placeholder:text-gray-500"
          >
            <option value="1">Premium Oyuncak</option>
            <option value="2">Oyuncak Paketi</option>
          </select>
          </div>
        </div>

        {formData.packageLength === '1' && (
          <>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Iyzico Pricing Plan ID
          </label>
          <input
            type="text"
            value={formData.pricingPlanId}
            onChange={(e) => setFormData({ ...formData, pricingPlanId: e.target.value })}
            className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#e52b3f] focus:border-[#e52b3f] outline-none transition-all bg-white text-gray-900 placeholder:text-gray-500"
            placeholder="Örn: 12345678-1234-1234-1234-123456789012"
          />
        </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Kaç Premium Oyuncaklı Fiyatlama
              </label>
              <input
                type="number"
                value={formData.packageCode}
                onChange={(e) => setFormData({ ...formData, packageCode: e.target.value })}
                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#e52b3f] focus:border-[#e52b3f] outline-none transition-all bg-white text-gray-900 placeholder:text-gray-500"
              />
            </div>
          </>
        )}

        <div className="flex items-center gap-2">
          <input
            type="checkbox"
            id="mostPreffered"
            checked={formData.mostPreffered}
            onChange={(e) => setFormData({ ...formData, mostPreffered: e.target.checked })}
            className="w-5 h-5 text-[#e52b3f] border-2 border-gray-300 rounded-lg focus:ring-[#e52b3f] focus:ring-2"
          />
          <label htmlFor="mostPreffered" className="text-sm font-medium text-gray-700">
            En çok tercih edilen olarak işaretle
          </label>
        </div>

        {formData.mostPreffered && (
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Popüler Başlık
            </label>
            <input
              type="text"
              value={formData.mostPrefferedTitle}
              onChange={(e) => setFormData({ ...formData, mostPrefferedTitle: e.target.value })}
              className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#e52b3f] focus:border-[#e52b3f] outline-none transition-all bg-white text-gray-900 placeholder:text-gray-500"
              placeholder="Örn: En Popüler"
            />
          </div>
        )}

        <div className="flex gap-4 pt-4 border-t border-gray-200">
          <button
            type="submit"
            disabled={isLoading}
            className="flex-1 bg-gradient-to-r from-[#e52b3f] to-[#ff4757] text-white py-3 rounded-lg hover:shadow-lg transition-all duration-200 font-semibold disabled:opacity-50"
          >
            {isLoading ? (
              <span className="flex items-center justify-center gap-2">
                <svg className="animate-spin h-5 w-5 text-[#e52b3f]" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                </svg>
                Ekleniyor...
              </span>
            ) : (
              'Ürün Ekle'
            )}
          </button>
          <button
            type="button"
            onClick={() => router.back()}
            className="px-6 py-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition font-medium text-gray-700"
          >
            İptal
          </button>
        </div>
      </form>
    </div>
  );
}

