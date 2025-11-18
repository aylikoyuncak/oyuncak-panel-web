# Aylık Oyuncak Admin Panel

Next.js tabanlı, modern ve kullanıcı dostu admin paneli.

## 🚀 Özellikler

### ✅ Tamamlanmış Modüller

1. **Authentication (Kimlik Doğrulama)**
   - Login sayfası
   - JWT token yönetimi
   - Protected routes
   - Otomatik logout (token expire)

2. **Dashboard**
   - Genel istatistikler
   - Günlük/aylık raporlar
   - Hızlı erişim kartları

3. **Ürün Yönetimi (Items)**
   - Ürün listesi (pagination)
   - Yeni ürün ekleme
   - Ürün düzenleme
   - Ürün silme (soft delete)
   - Fiyat ve paket yönetimi

4. **Kampanya Yönetimi (Campaigns)**
   - Kampanya listesi
   - Yeni kampanya oluşturma
   - Kampanya düzenleme
   - Kampanya silme
   - İndirim kodu yönetimi (yüzde/sabit tutar)

5. **Abonelik Yönetimi (Subscriptions)**
   - Abonelik listesi (filtreleme)
   - Abonelik detayları
   - Müşteri bilgileri
   - Adres ve çocuk bilgileri
   - Durum güncelleme

6. **Sipariş Yönetimi (Orders)**
   - Sipariş listesi (filtreleme)
   - Sipariş detayları
   - Sipariş durumu güncelleme
   - Müşteri ve teslimat bilgileri

7. **Kullanıcı Yönetimi (Users)**
   - Kullanıcı listesi
   - Kullanıcı detayları
   - Yeni admin/subadmin oluşturma
   - Kullanıcı rolü yönetimi

## 🛠️ Teknolojiler

- **Next.js 16** - React framework
- **React 19** - UI library
- **TypeScript** - Type safety
- **Tailwind CSS** - Styling
- **Axios** - HTTP client
- **OpenAPI Generator** - API client generation

## 📦 Kurulum

1. Bağımlılıkları yükleyin:
```bash
npm install
```

2. Environment dosyasını oluşturun:
```bash
cp .env.local.example .env.local
```

3. `.env.local` dosyasını düzenleyin:
```env
NEXT_PUBLIC_API_BASE_URL=https://your-api-url.com
```

4. Development serverı başlatın:
```bash
npm run dev
```

5. Tarayıcıda açın: http://localhost:3000

## 📁 Proje Yapısı

```
src/
├── app/                          # Next.js App Router
│   ├── login/                    # Login sayfası
│   ├── dashboard/                # Dashboard layout
│   │   ├── page.tsx              # Ana dashboard
│   │   ├── items/                # Ürün yönetimi
│   │   ├── campaigns/            # Kampanya yönetimi
│   │   ├── subscriptions/        # Abonelik yönetimi
│   │   ├── orders/               # Sipariş yönetimi
│   │   └── users/                # Kullanıcı yönetimi
│   └── layout.tsx                # Root layout
├── api/
│   └── generated/                # OpenAPI generated client
├── components/
│   ├── DashboardLayout.tsx       # Dashboard layout component
│   └── ProtectedRoute.tsx        # Route protection
├── contexts/
│   └── AuthContext.tsx           # Authentication context
└── lib/
    └── api-client.ts             # API client configuration
```

## 🔐 Kimlik Doğrulama

### Login
- Email: admin@example.com
- Password: minimum 6 karakter
- Rol kontrolü: Sadece Admin ve SubAdmin girişi

### Token Yönetimi
- JWT token localStorage'da saklanır
- Her API isteğinde otomatik olarak header'a eklenir
- Token expire olduğunda otomatik logout

### Yetki Seviyeleri
- **Admin (Role: 2)**: Tüm işlemler
- **SubAdmin (Role: 3)**: Silme dışındaki tüm işlemler

## 🎨 Özellikler

### Pagination
- Tüm listeleme sayfalarında sayfalama
- Sayfa başına 10 kayıt
- Önceki/Sonraki butonları

### Filtreleme
- Abonelik ve siparişlerde tarih filtresi
- Bugün, Son 7 Gün, Son 30 Gün, Tümü

### CRUD İşlemleri
- Create (Oluşturma)
- Read (Okuma)
- Update (Güncelleme)
- Delete (Silme - Soft Delete)

### Responsive Design
- Desktop ve tablet uyumlu
- Modern ve temiz arayüz
- Kolay navigasyon

### Status Badge'leri
- Renkli durum göstergeleri
- Aktif/Pasif/İptal vb.
- Anlaşılır UI feedback

## 🔄 API Entegrasyonu

API client'ı OpenAPI Generator ile otomatik oluşturulmuştur:

```bash
npm run api:openapi-generate
```

Bu komut `swagger.json` dosyasından TypeScript client'ı oluşturur.

### API Client Kullanımı

```typescript
import { adminApi } from '@/lib/api-client';

// Örnek: Ürün listesi
const response = await adminApi.apiAdminItemListPost({
  pageNumber: 1,
  pageSize: 10,
});
```

## 🚧 Geliştirme Notları

### Yeni Sayfa Ekleme
1. `src/app/dashboard/` altına klasör oluşturun
2. `page.tsx` dosyası ekleyin
3. `DashboardLayout.tsx`'e menü öğesi ekleyin

### API Endpoint Güncelleme
1. `swagger.json` dosyasını güncelleyin
2. `npm run api:openapi-generate` komutunu çalıştırın
3. Değişiklikleri component'lerde uygulayın

## 📝 Yapılabilecek İyileştirmeler

- [ ] Form validasyonları (React Hook Form, Zod)
- [ ] Toast notification sistemi
- [ ] Daha gelişmiş arama ve filtreleme
- [ ] Excel export özelliği
- [ ] Grafik ve istatistikler (Chart.js)
- [ ] Dark mode
- [ ] Loading skeleton'ları
- [ ] Error boundary
- [ ] Unit testler
- [ ] E2E testler

## 🐛 Hata Ayıklama

### API Bağlantı Hatası
- `.env.local` dosyasındaki `NEXT_PUBLIC_API_BASE_URL` değerini kontrol edin
- CORS ayarlarını kontrol edin
- API sunucusunun çalıştığından emin olun

### Login Hatası
- Email ve şifrenin doğru olduğundan emin olun
- Kullanıcı rolünün Admin veya SubAdmin olduğunu kontrol edin
- Browser console'da hata mesajlarına bakın

### Token Hatası
- localStorage'ı temizleyin
- Tekrar login olun
- Token expire süresini kontrol edin

## 📄 Lisans

Bu proje Aylık Oyuncak için geliştirilmiştir.

## 👥 Katkıda Bulunanlar

- AI Assistant - Full Stack Development

## 📞 Destek

Herhangi bir sorun için lütfen iletişime geçin.

