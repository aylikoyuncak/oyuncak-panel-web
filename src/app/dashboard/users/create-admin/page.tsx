'use client';

import { useState, FormEvent } from 'react';
import { useRouter } from 'next/navigation';
import { adminApi } from '@/lib/api-client';
import toast from 'react-hot-toast';

export default function CreateAdminPage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phoneNumber: '',
    password: '',
    confirmPassword: '',
    role: '3', // Default: SubAdmin
  });

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      toast.error('Şifreler eşleşmiyor');
      return;
    }

    if (formData.password.length < 6) {
      toast.error('Şifre en az 6 karakter olmalıdır');
      return;
    }

    setIsLoading(true);

    try {
      const response = await adminApi.apiAdminRegisterPost({
        firstName: formData.firstName,
        lastName: formData.lastName,
        email: formData.email,
        phoneNumber: formData.phoneNumber,
        password: formData.password,
        confirmPassword: formData.confirmPassword,
        role: parseInt(formData.role),
      });

      if (response.data.isSucceed) {
        toast.success('Admin kullanıcı başarıyla oluşturuldu');
        router.push('/dashboard/users');
      } else {
        toast.error(response.data.message || 'Kullanıcı oluşturulamadı');
      }
    } catch (error: any) {
      console.error('Create admin error:', error);
      toast.error(error.response?.data?.message || 'Bir hata oluştu');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-2xl space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Yeni Admin Kullanıcı Ekle</h1>
        <p className="text-gray-600 mt-1">Admin veya SubAdmin kullanıcı oluşturun</p>
      </div>

      <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow p-6 space-y-6">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Ad *
            </label>
            <input
              type="text"
              value={formData.firstName}
              onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#e52b3f] focus:border-transparent placeholder:text-gray-500 text-gray-900"
              placeholder="Örn: Ahmet"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Soyad *
            </label>
            <input
              type="text"
              value={formData.lastName}
              onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#e52b3f] focus:border-transparent placeholder:text-gray-500 text-gray-900"
              placeholder="Örn: Yılmaz"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            E-posta *
          </label>
          <input
            type="email"
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            required
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#e52b3f] focus:border-transparent placeholder:text-gray-500 text-gray-900"
            placeholder="admin@aylikoyuncak.com"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Telefon
          </label>
          <input
            type="tel"
            value={formData.phoneNumber}
            onChange={(e) => setFormData({ ...formData, phoneNumber: e.target.value })}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#e52b3f] focus:border-transparent placeholder:text-gray-500 text-gray-900"
            placeholder="5XX XXX XX XX"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Rol *
          </label>
          <select
            value={formData.role}
            onChange={(e) => setFormData({ ...formData, role: e.target.value })}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#e52b3f] focus:border-transparent text-gray-900 bg-white"
          >
            <option value="2">Admin (Tam Yetki)</option>
            <option value="3">SubAdmin (Kısıtlı Yetki)</option>
          </select>
          <p className="mt-1 text-xs text-gray-500">
            Admin: Tüm işlemleri yapabilir. SubAdmin: Silme işlemi yapamaz.
          </p>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Şifre * (Min. 6 karakter)
            </label>
            <input
              type="password"
              value={formData.password}
              onChange={(e) => setFormData({ ...formData, password: e.target.value })}
              required
              minLength={6}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#e52b3f] focus:border-transparent placeholder:text-gray-500 text-gray-900"
              placeholder="••••••••"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Şifre Tekrar *
            </label>
            <input
              type="password"
              value={formData.confirmPassword}
              onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
              required
              minLength={6}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#e52b3f] focus:border-transparent placeholder:text-gray-500 text-gray-900"
              placeholder="••••••••"
            />
          </div>
        </div>

        {formData.password && formData.confirmPassword && formData.password !== formData.confirmPassword && (
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg text-sm">
            Şifreler eşleşmiyor
          </div>
        )}

        <div className="flex gap-4">
          <button
            type="submit"
            disabled={isLoading}
            className="flex-1 bg-gradient-to-r from-[#e52b3f] to-[#ff4757] text-white py-2 rounded-lg hover:shadow-lg transition disabled:opacity-50 font-medium"
          >
            {isLoading ? 'Oluşturuluyor...' : 'Kullanıcı Oluştur'}
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

