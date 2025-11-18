'use client';

import { useEffect, useState } from 'react';
import { adminApi } from '@/lib/api-client';
import { DashboardData } from '@/api/generated';

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
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-10 w-10 border-3 border-gray-200 border-t-[#e52b3f]"></div>
      </div>
    );
  }


  return (
    <div className="space-y-4 sm:space-y-6">
      {/* Header */}
      <div className="bg-white rounded-2xl border border-gray-100 p-6 sm:p-8 shadow-sm">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#e52b3f] to-[#ff4757] flex items-center justify-center shadow-lg">
              <span className="text-2xl">📊</span>
            </div>
            <div>
              <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">
                Dashboard
              </h1>
              <p className="text-sm text-gray-500 mt-1">Genel bakış ve istatistikler</p>
            </div>
          </div>
          <div className="flex items-center gap-2 text-sm text-gray-500">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
            <span>Son güncelleme: Bugün</span>
          </div>
        </div>
      </div>

      {/* İstatistik Kartları */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
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
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
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
    <div className="group bg-white rounded-2xl border border-gray-100 p-4 sm:p-6 hover:shadow-xl hover:border-gray-200 transition-all duration-300 hover:-translate-y-1">
      <div className="flex items-center justify-between mb-3 sm:mb-4">
        <div className={`w-12 h-12 sm:w-14 sm:h-14 ${config.iconBg} rounded-xl flex items-center justify-center text-xl sm:text-2xl group-hover:scale-110 transition-transform`}>
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
    <div className="bg-white rounded-2xl border border-gray-100 p-4 sm:p-6 shadow-sm hover:border-gray-200 transition-all duration-300">
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

