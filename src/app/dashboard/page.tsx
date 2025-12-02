'use client';

import { useEffect, useState } from 'react';
import { adminApi } from '@/lib/api-client';
import { DashboardData } from '@/api/generated';
import Link from 'next/link';

export default function DashboardPage() {
  const [data, setData] = useState<DashboardData | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      const response = await adminApi.apiAdminDashboardDataPost();
      if (response.data.isSucceed && response.data.data) {
        setData(response.data.data);
      }
    } catch (error) {
      console.error('Dashboard data fetch error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/10 backdrop-blur-sm">
        <div className="animate-spin rounded-full h-16 w-16 border-4 border-gray-200 border-t-[#e52b3f]"></div>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#e52b3f] to-[#ff4757] flex items-center justify-center shadow-lg">
            <span className="text-2xl">📊</span>
          </div>
          <div>
            <h1 className="text-2xl font-bold text-gray-900">
              Dashboard
            </h1>
            <p className="text-sm text-gray-500">Genel bakış ve istatistikler</p>
          </div>
        </div>
      </div>

      {/* İstatistik Kartları */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          title="Toplam Abonelikler"
          value={data?.totalSubscriptions || 0}
          icon="📅"
          color="blue"
        />
        <StatCard
          title="Aktif Abonelikler"
          value={data?.activeSubscriptions || 0}
          icon="✅"
          color="green"
        />
        <StatCard
          title="Toplam Gelir"
          value={`₺${(data?.totalOrderPrice || 0).toLocaleString('tr-TR')}`}
          icon="💰"
          color="purple"
        />
        <StatCard
          title="Bu Ayki Gelir"
          value={`₺${(data?.totalOrderPriceLastMonth || 0).toLocaleString('tr-TR')}`}
          icon="📊"
          color="yellow"
        />
      </div>

      {/* Ek Bilgiler */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <InfoCard 
          title="Son 7 Gün Abonelikler" 
          value={data?.lastWeekSubscriptions || 0}
          icon="📈"
          gradient="info"
        />
        <InfoCard 
          title="Son 7 Gün Gelir" 
          value={`₺${(data?.totalOrderPriceLastWeek || 0).toLocaleString('tr-TR')}`}
          icon="💵"
          gradient="success"
        />
        <InfoCard 
          title="Son 30 Gün Abonelikler" 
          value={data?.lastMonthSubscriptions || 0}
          icon="📅"
          gradient="primary"
        />
        <InfoCard 
          title="Bugünkü Abonelikler" 
          value={data?.lastDaySubscriptions || 0}
          icon="🎯"
          gradient="warning"
        />
      </div>

      {/* Hızlı Erişim ve Özet Bilgiler */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {/* Hızlı Erişim */}
        <div className="lg:col-span-2 bg-white rounded-2xl border border-gray-100 p-6 shadow-sm">
          <h2 className="text-lg font-bold text-gray-900 mb-4">Hızlı Erişim</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
            <Link 
              href="/dashboard/items"
              className="flex flex-col items-center justify-center p-4 rounded-xl border border-gray-100 hover:border-[#e52b3f] hover:bg-[#feeff0] group"
            >
              <div className="w-12 h-12 rounded-lg bg-blue-50 flex items-center justify-center mb-2 group-hover:bg-blue-100">
                <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                </svg>
              </div>
              <span className="text-sm font-medium text-gray-700 group-hover:text-[#e52b3f]">Ürünler</span>
            </Link>
            
            <Link 
              href="/dashboard/campaigns"
              className="flex flex-col items-center justify-center p-4 rounded-xl border border-gray-100 hover:border-[#e52b3f] hover:bg-[#feeff0] group"
            >
              <div className="w-12 h-12 rounded-lg bg-purple-50 flex items-center justify-center mb-2 group-hover:bg-purple-100">
                <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
                </svg>
              </div>
              <span className="text-sm font-medium text-gray-700 group-hover:text-[#e52b3f]">Kampanyalar</span>
            </Link>
            
            <Link 
              href="/dashboard/subscriptions"
              className="flex flex-col items-center justify-center p-4 rounded-xl border border-gray-100 hover:border-[#e52b3f] hover:bg-[#feeff0] group"
            >
              <div className="w-12 h-12 rounded-lg bg-emerald-50 flex items-center justify-center mb-2 group-hover:bg-emerald-100">
                <svg className="w-6 h-6 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
              </div>
              <span className="text-sm font-medium text-gray-700 group-hover:text-[#e52b3f]">Abonelikler</span>
            </Link>
            
            <Link 
              href="/dashboard/orders"
              className="flex flex-col items-center justify-center p-4 rounded-xl border border-gray-100 hover:border-[#e52b3f] hover:bg-[#feeff0] group"
            >
              <div className="w-12 h-12 rounded-lg bg-orange-50 flex items-center justify-center mb-2 group-hover:bg-orange-100">
                <svg className="w-6 h-6 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                </svg>
              </div>
              <span className="text-sm font-medium text-gray-700 group-hover:text-[#e52b3f]">Siparişler</span>
            </Link>
            
            <Link 
              href="/dashboard/users"
              className="flex flex-col items-center justify-center p-4 rounded-xl border border-gray-100 hover:border-[#e52b3f] hover:bg-[#feeff0] group"
            >
              <div className="w-12 h-12 rounded-lg bg-indigo-50 flex items-center justify-center mb-2 group-hover:bg-indigo-100">
                <svg className="w-6 h-6 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                </svg>
              </div>
              <span className="text-sm font-medium text-gray-700 group-hover:text-[#e52b3f]">Kullanıcılar</span>
            </Link>
            
            <Link 
              href="/dashboard/items/add"
              className="flex flex-col items-center justify-center p-4 rounded-xl border border-gray-100 hover:border-[#e52b3f] hover:bg-[#feeff0] group"
            >
              <div className="w-12 h-12 rounded-lg bg-red-50 flex items-center justify-center mb-2 group-hover:bg-red-100">
                <svg className="w-6 h-6 text-[#e52b3f]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                </svg>
              </div>
              <span className="text-sm font-medium text-gray-700 group-hover:text-[#e52b3f]">Ürün Ekle</span>
            </Link>
          </div>
        </div>

        {/* Bugünkü Özet */}
        <div className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm">
          <h2 className="text-lg font-bold text-gray-900 mb-4">Bugünkü Özet</h2>
          <div className="space-y-4">
            <div className="flex items-center justify-between p-3 rounded-lg bg-blue-50">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-blue-100 flex items-center justify-center">
                  <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                </div>
                <div>
                  <p className="text-xs text-gray-600">Yeni Abonelikler</p>
                  <p className="text-lg font-bold text-gray-900">{data?.lastDaySubscriptions || 0}</p>
                </div>
              </div>
            </div>
            
            <div className="flex items-center justify-between p-3 rounded-lg bg-green-50">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-green-100 flex items-center justify-center">
                  <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <div>
                  <p className="text-xs text-gray-600">Bugünkü Gelir</p>
                  <p className="text-lg font-bold text-gray-900">₺{(data?.totalOrderPriceLastDay || 0).toLocaleString('tr-TR')}</p>
                </div>
              </div>
            </div>
            
            <div className="flex items-center justify-between p-3 rounded-lg bg-purple-50">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-purple-100 flex items-center justify-center">
                  <svg className="w-5 h-5 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                  </svg>
                </div>
                <div>
                  <p className="text-xs text-gray-600">Aktif Oranı</p>
                  <p className="text-lg font-bold text-gray-900">
                    {data?.totalSubscriptions 
                      ? Math.round(((data?.activeSubscriptions || 0) / data.totalSubscriptions) * 100)
                      : 0}%
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function StatCard({
  title,
  value,
  icon,
  color,
}: {
  title: string;
  value: string | number;
  icon: string;
  color: 'blue' | 'green' | 'purple' | 'yellow';
}) {
  const colorConfig = {
    blue: {
      bg: 'from-blue-500 to-blue-600',
      iconBg: 'bg-blue-50',
      iconColor: 'text-blue-600',
      textColor: 'text-blue-600',
    },
    green: {
      bg: 'from-emerald-500 to-emerald-600',
      iconBg: 'bg-emerald-50',
      iconColor: 'text-emerald-600',
      textColor: 'text-emerald-600',
    },
    purple: {
      bg: 'from-purple-500 to-purple-600',
      iconBg: 'bg-purple-50',
      iconColor: 'text-purple-600',
      textColor: 'text-purple-600',
    },
    yellow: {
      bg: 'from-amber-500 to-amber-600',
      iconBg: 'bg-amber-50',
      iconColor: 'text-amber-600',
      textColor: 'text-amber-600',
    },
  };

  const config = colorConfig[color];

  return (
    <div className="bg-white rounded-2xl border border-gray-100 p-4 sm:p-6">
      <div className="flex items-center justify-between mb-3 sm:mb-4">
        <div className={`w-12 h-12 sm:w-14 sm:h-14 ${config.iconBg} rounded-xl flex items-center justify-center text-xl sm:text-2xl`}>
          {icon}
        </div>
      </div>
      <p className="text-xs sm:text-sm font-medium text-gray-500 mb-2">{title}</p>
      <p className={`text-2xl sm:text-3xl font-bold ${config.textColor}`}>{value}</p>
    </div>
  );
}

function InfoCard({ 
  title, 
  value, 
  icon,
  gradient 
}: { 
  title: string; 
  value: string | number;
  icon: string;
  gradient: 'info' | 'success' | 'primary' | 'warning';
}) {
  const badgeConfig = {
    info: {
      bg: 'bg-gradient-to-br from-blue-50 to-cyan-50',
      iconBg: 'bg-blue-100',
      text: 'text-blue-700',
      border: 'border-blue-100',
    },
    success: {
      bg: 'bg-gradient-to-br from-emerald-50 to-teal-50',
      iconBg: 'bg-emerald-100',
      text: 'text-emerald-700',
      border: 'border-emerald-100',
    },
    primary: {
      bg: 'bg-gradient-to-br from-[#feeff0] to-red-50',
      iconBg: 'bg-red-100',
      text: 'text-[#e52b3f]',
      border: 'border-red-100',
    },
    warning: {
      bg: 'bg-gradient-to-br from-amber-50 to-yellow-50',
      iconBg: 'bg-amber-100',
      text: 'text-amber-700',
      border: 'border-amber-100',
    },
  };

  const badge = badgeConfig[gradient];

  return (
    <div className="bg-white rounded-2xl border border-gray-100 p-4 sm:p-6 shadow-sm">
      <div className="flex items-center justify-between mb-3 sm:mb-4">
        <div className={`w-12 h-12 sm:w-14 sm:h-14 ${badge.iconBg} rounded-xl flex items-center justify-center text-xl sm:text-2xl shadow-sm`}>
          {icon}
        </div>
      </div>
      <p className="text-xs sm:text-sm font-medium text-gray-600 mb-2">{title}</p>
      <p className={`text-2xl sm:text-3xl font-bold ${badge.text}`}>{value}</p>
    </div>
  );
}

