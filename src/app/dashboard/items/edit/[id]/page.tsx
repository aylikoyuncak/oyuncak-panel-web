'use client';

import { useState, FormEvent, useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { adminApi } from '@/lib/api-client';
import { ItemDto, ItemTypes } from '@/api/generated';
import toast from 'react-hot-toast';

export default function EditItemPage() {
  const router = useRouter();
  const params = useParams();
  const itemId = params.id as string;
  const [isLoading, setIsLoading] = useState(false);
  const [isFetching, setIsFetching] = useState(true);
  const [formData, setFormData] = useState({
    id: itemId,
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
    isDeleted: false,
  });

  useEffect(() => {
    fetchItem();
  }, [itemId]);

  const fetchItem = async () => {
    try {
      const response = await adminApi.apiAdminGetItemItemIdGet(itemId);
      if (response.data.isSucceed && response.data.data) {
        const item: ItemDto = response.data.data;
        setFormData({
          id: itemId,
          title: item.title || '',
          description: item.description || '',
          price: item.price?.toString() || '',
          discountPrice: item.discountPrice?.toString() || '',
          packageLength: item.packageLength?.toString() || '',
          packageCode: item.packageCode?.toString() || '',
          itemType: item.itemType?.toString() || '2',
          pricingPlanId: item.pricingPlanId || '',
          mostPreffered: item.mostPreffered || false,
          mostPrefferedTitle: item.mostPrefferedTitle || '',
          isDeleted: item.isDeleted || false,
        });
      }
    } catch (error) {
      console.error('Fetch item error:', error);
      toast.error('Ürün bilgileri yüklenemedi');
    } finally {
      setIsFetching(false);
    }
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const response = await adminApi.apiAdminItemPost({
        id: itemId,
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
        isDeleted: formData.isDeleted,
      });

      if (response.data.isSucceed) {
        toast.success('Ürün başarıyla güncellendi');
        router.push('/dashboard/items');
      } else {
        toast.error(response.data.message || 'Ürün güncellenemedi');
      }
    } catch (error: any) {
      console.error('Update item error:', error);
      toast.error(error.response?.data?.message || 'Bir hata oluştu');
    } finally {
      setIsLoading(false);
    }
  };

  if (isFetching) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/10 backdrop-blur-sm">
        <div className="animate-spin rounded-full h-16 w-16 border-4 border-gray-200 border-t-[#e52b3f]"></div>
      </div>
    );
  }

  return (
    <div className="max-w-2xl space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Ürün Düzenle</h1>
        <p className="text-gray-600 mt-1">Ürün bilgilerini güncelleyin</p>
      </div>

      <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow p-6 space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Başlık *
          </label>
          <input
            type="text"
            value={formData.title}
            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
            required
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 placeholder:text-gray-500"
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
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 placeholder:text-gray-500"
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
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 placeholder:text-gray-500"
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
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 placeholder:text-gray-500"
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
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 placeholder:text-gray-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
            Ürün Tipi *
          </label>
          <select
            value={formData.itemType}
            onChange={(e) => setFormData({ ...formData, itemType: e.target.value })}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 placeholder:text-gray-500"
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
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 placeholder:text-gray-500"
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
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 placeholder:text-gray-500"
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
            className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
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
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 placeholder:text-gray-500"
            />
          </div>
        )}

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

