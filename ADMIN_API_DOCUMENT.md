# Admin API Endpoint Dokümantasyonu

Bu dokümantasyon, Aylık Oyuncak Admin Panel için tüm backend API endpointlerinin detaylı açıklamalarını içermektedir. Next.js projenizde bu endpointleri kullanarak admin paneli geliştirebilirsiniz.

## 📋 İçindekiler

1. [Genel Bilgiler](#genel-bilgiler)
2. [Authentication Endpoints](#authentication-endpoints)
3. [Item (Ürün) Yönetimi](#item-ürün-yönetimi)
4. [Campaign (Kampanya) Yönetimi](#campaign-kampanya-yönetimi)
5. [Subscription (Abonelik) Yönetimi](#subscription-abonelik-yönetimi)
6. [Order (Sipariş) Yönetimi](#order-sipariş-yönetimi)
7. [User (Kullanıcı) Yönetimi](#user-kullanıcı-yönetimi)
8. [Dashboard](#dashboard)
9. [Admin Kullanıcı Yönetimi](#admin-kullanıcı-yönetimi)

---

## 🔐 Genel Bilgiler

### Base URL
```
/api/admin
```

### Authorization
Çoğu endpoint JWT Bearer token gerektirir. Header'a şu şekilde eklenir:
```
Authorization: Bearer {token}
```

### Permission Seviyeleri
- **RequireAdminRole**: Sadece Admin (AdminUser) erişebilir
- **RequireAdminOrSubAdminRole**: Admin ve SubAdmin kullanıcıları erişebilir
- **AllowAnonymous**: Herkes erişebilir (sadece login)

### Response Formatı
Tüm endpointler aşağıdaki format ile response döner:
```typescript
{
  isSucceed: boolean,
  message: string | null,
  data: T | null
}
```

### Pagination Request
Birçok liste endpointi bu formatı kullanır:
```typescript
{
  pageNumber: number,    // default: 1
  pageSize: number,      // default: 10
  filter?: string        // "today" | "last_week" | "last_month" | "all"
}
```

### Paged Response
Liste endpointleri bu formatı döner:
```typescript
{
  data: T[],
  totalCount: number,
  pageNumber: number,
  pageSize: number,
  totalPages: number
}
```

---

## 🔑 Authentication Endpoints

### 1. Admin Login
**Endpoint:** `POST /api/admin/login`  
**Authorization:** AllowAnonymous  
**Amaç:** Admin ve SubAdmin kullanıcılarının sisteme giriş yapması

#### Request Body
```typescript
{
  userId?: string,      // Optional
  email: string,        // Required, valid email format
  password: string      // Required, min 6 karakter
}
```

#### Response
```typescript
{
  isSucceed: boolean,
  message: string,
  data: {
    id: string,
    phoneNumber: string,
    email: string,
    firstName: string,
    lastName: string,
    accessToken: string,
    refreshToken: string,
    userStep: number,
    role: number        // 2: AdminUser, 3: SubAdminUser
  }
}
```

#### Kullanım Senaryoları (UI)
- Login sayfası oluşturun
- Email ve password inputları
- Response'dan gelen `accessToken`'ı localStorage/cookie'ye kaydedin
- Sonraki tüm isteklerde header'a ekleyin
- `role` değerine göre UI'da farklı yetkiler gösterin

#### Validasyonlar
- Email boş olamaz ve geçerli format olmalı
- Password minimum 6 karakter olmalı
- Kullanıcı sadece Admin veya SubAdmin rolünde olmalı (User rolü giriş yapamaz)

---

## 📦 Item (Ürün) Yönetimi

### 2. Item Ekle/Güncelle
**Endpoint:** `POST /api/admin/item`  
**Authorization:** RequireAdminOrSubAdminRole  
**Amaç:** Yeni oyuncak paketi eklemek veya mevcut paketi güncellemek

#### Request Body
```typescript
{
  id?: string,                    // Güncelleme için gerekli, yeni kayıt için null
  title: string,                  // Ürün başlığı
  description: string,            // Ürün açıklaması
  price: number,                  // Fiyat (decimal)
  packageLength?: number,         // Paket süresi (ay)
  discountPrice?: number,         // İndirimli fiyat (varsa)
  packageCode?: number,           // Paket kodu
  itemType: number,               // 1: PremiumToy, 2: ToyPackage
  pricingPlanId?: string,         // Iyzico pricing plan ID
  mostPreffered: boolean,         // En çok tercih edilen mi?
  isDeleted: boolean,             // Silinmiş mi?
  mostPrefferedTitle?: string     // "En Popüler" gibi özel başlık
}
```

#### Response
```typescript
{
  isSucceed: boolean,
  message: string,
  data: string
}
```

#### Önemli Business Logic
- **PricingPlanId varsa:** Iyzico'dan plan detayı çekilerek fiyat kontrolü yapılır
- **Güncelleme durumunda:** Eğer `pricingPlanId` değişirse, bu plana sahip tüm aktif kullanıcılar otomatik olarak yeni plana yükseltilir
- **Fiyat Kontrolü:** DiscountPrice varsa bu, yoksa normal price Iyzico fiyatı ile eşleşmeli

#### Kullanım Senaryoları (UI)
1. **Yeni Ürün Ekleme:**
   - Form ile tüm alanları doldurun
   - `id` alanını boş bırakın
   - İndirim varsa `discountPrice` ekleyin
   - `itemType` için dropdown: "Premium Oyuncak" (1) veya "Oyuncak Paketi" (2)
   - "En Çok Tercih Edilen" checkbox

2. **Ürün Güncelleme:**
   - Önce `GET /api/admin/get-item/{itemId}` ile ürün bilgilerini çekin
   - Form'u doldurun
   - `id` alanını gönderin
   - Güncelleme yapın

3. **Uyarı Mesajları:**
   - PricingPlanId değiştiğinde: "Dikkat: Bu değişiklik aktif kullanıcıları etkileyecek"
   - Fiyat uyumsuzluğu: "Fiyat Iyzico ile eşleşmiyor"

### 3. Item Listesi
**Endpoint:** `POST /api/admin/item-list`  
**Authorization:** RequireAdminOrSubAdminRole  
**Amaç:** Tüm ürünleri sayfalı şekilde listelemek

#### Request Body
```typescript
{
  pageNumber: number,    // default: 1
  pageSize: number,      // default: 10
  filter?: string        // Bu endpoint'te filter kullanılmıyor
}
```

#### Response
```typescript
{
  isSucceed: boolean,
  message: string,
  data: {
    data: [
      {
        id: string,
        title: string,
        description: string,
        price: number,
        packageCode?: number,
        packageLength?: number,
        discountPrice?: number,
        itemType: number,
        mostPreffered: boolean,
        mostPrefferedTitle?: string,
        pricingPlanId?: string,
        isDeleted: boolean
      }
    ],
    totalCount: number,
    pageNumber: number,
    pageSize: number,
    totalPages: number
  }
}
```

#### Kullanım Senaryoları (UI)
- **Tablo/Grid görünümü oluşturun:**
  - Sütunlar: Başlık, Açıklama, Fiyat, İndirimli Fiyat, Paket Süresi, Tip, Durum
  - Her satırda: Düzenle, Sil butonları
  - "En Çok Tercih Edilen" badge'i gösterin
  - Silinen ürünleri farklı stil ile gösterin (soluk/çizili)

- **Pagination:**
  - Alt kısımda sayfa numaraları
  - Her sayfada 10-20-50 adet seçeneği
  - Toplam kayıt sayısını gösterin

- **Filtreler:**
  - Tip'e göre (Premium/Paket)
  - Fiyat aralığı
  - Silinen/Aktif durumu

### 4. Tekil Item Getir
**Endpoint:** `GET /api/admin/get-item/{itemId}`  
**Authorization:** RequireAdminOrSubAdminRole  
**Amaç:** Belirli bir ürünün detaylarını getirmek

#### URL Parameters
- `itemId`: string (GUID)

#### Response
```typescript
{
  isSucceed: boolean,
  message: string,
  data: {
    id: string,
    title: string,
    description: string,
    price: number,
    packageCode?: number,
    packageLength?: number,
    discountPrice?: number,
    itemType: number,
    mostPreffered: boolean,
    mostPrefferedTitle?: string,
    pricingPlanId?: string,
    isDeleted: boolean
  }
}
```

#### Kullanım Senaryoları (UI)
- Düzenleme sayfasında form verilerini doldurmak için kullanın
- Detay modal'ında ürün bilgilerini gösterin
- Clone/Kopyala özelliği için kullanın

### 5. Item Silme
**Endpoint:** `POST /api/admin/delete-item/{itemId}`  
**Authorization:** RequireAdminRole (Sadece Admin)  
**Amaç:** Ürünü soft delete ile silmek

#### URL Parameters
- `itemId`: string (GUID)

#### Response
```typescript
{
  isSucceed: boolean,
  message: string,
  data: string
}
```

#### Önemli Notlar
- **Soft Delete:** Ürün veritabanından silinmez, `IsDeleted = true` olarak işaretlenir
- Sadece **Admin** yetkisi gerekli (SubAdmin silemez)

#### Kullanım Senaryoları (UI)
- Silme butonuna tıklanınca onay modal'ı gösterin
- "Bu ürünü silmek istediğinizden emin misiniz?" mesajı
- İşlem başarılıysa listeyi yenileyin
- Toast notification gösterin

---

## 🎯 Campaign (Kampanya) Yönetimi

### 6. Kampanya Ekle/Güncelle
**Endpoint:** `POST /api/admin/campaign`  
**Authorization:** RequireAdminOrSubAdminRole  
**Amaç:** Yeni kampanya kodu oluşturmak veya mevcut kampanyayı güncellemek

#### Request Body
```typescript
{
  id?: string,                  // Güncelleme için gerekli
  code: string,                 // Kampanya kodu (min 5 karakter)
  discountAmount?: number,      // Sabit indirim tutarı (TL)
  discountPercentage?: number,  // Yüzde indirim
  expiration: string            // Son kullanma tarihi (ISO 8601)
}
```

#### Validasyonlar
- `code` boş olamaz ve minimum 5 karakter olmalı
- `discountAmount` VE `discountPercentage` aynı anda gönderilemez (sadece biri)
- `expiration` geçerli tarih formatında olmalı

#### Response
```typescript
{
  isSucceed: boolean,
  message: string,
  data: string
}
```

#### Kullanım Senaryoları (UI)
1. **Form Alanları:**
   - Kampanya Kodu input (uppercase dönüşümü yapın)
   - İndirim Tipi radio: "Sabit Tutar" / "Yüzde"
   - İndirim Tutarı/Yüzde input (seçime göre)
   - Son Kullanma Tarihi (DatePicker)

2. **Validasyonlar (Frontend):**
   - Kod minimum 5 karakter
   - İndirim tipi seçilmeli
   - Tarih bugünden ileri olmalı
   - Yüzde indirim 1-100 arası

3. **UX İyileştirmeleri:**
   - Kampanya kodu preview'ı gösterin
   - Geçerlilik süresi countdown timer
   - Kampanya kodu otomatik generator özelliği

### 7. Kampanya Listesi
**Endpoint:** `POST /api/admin/campaign-list`  
**Authorization:** RequireAdminOrSubAdminRole  
**Amaç:** Tüm kampanyaları listelemek

#### Request Body
```typescript
{
  pageNumber: number,
  pageSize: number,
  filter?: string
}
```

#### Response
```typescript
{
  isSucceed: boolean,
  message: string,
  data: {
    data: [
      {
        id: string,
        code: string,
        discountAmount?: number,
        discountPercentage?: number,
        expiration: string
      }
    ],
    totalCount: number,
    pageNumber: number,
    pageSize: number,
    totalPages: number
  }
}
```

#### Kullanım Senaryoları (UI)
- **Tablo Sütunları:**
  - Kampanya Kodu
  - İndirim Tipi (Sabit/Yüzde)
  - İndirim Miktarı
  - Son Kullanma Tarihi
  - Durum (Aktif/Süresi Dolmuş)
  - İşlemler

- **Özellikler:**
  - Süresi dolmuş kampanyaları kırmızı ile işaretleyin
  - Aktif kampanyaları yeşil badge ile gösterin
  - Kopyala butonu (kodu panoya kopyalar)
  - QR kod oluşturma özelliği

### 8. Tekil Kampanya Getir
**Endpoint:** `GET /api/admin/get-campaign/{campaignId}`  
**Authorization:** RequireAdminOrSubAdminRole  
**Amaç:** Belirli kampanya detaylarını getirmek

#### URL Parameters
- `campaignId`: string (GUID)

#### Response
```typescript
{
  isSucceed: boolean,
  message: string,
  data: {
    id: string,
    code: string,
    discountAmount?: number,
    discountPercentage?: number,
    expiration: string
  }
}
```

### 9. Kampanya Silme
**Endpoint:** `POST /api/admin/delete-campaign/{campaignId}`  
**Authorization:** RequireAdminRole  
**Amaç:** Kampanyayı soft delete ile silmek

#### URL Parameters
- `campaignId`: string (GUID)

#### Response
```typescript
{
  isSucceed: boolean,
  message: string,
  data: string
}
```

---

## 📅 Subscription (Abonelik) Yönetimi

### 10. Abonelik Listesi
**Endpoint:** `POST /api/admin/subscription-list`  
**Authorization:** RequireAdminOrSubAdminRole  
**Amaç:** Tüm abonelikleri filtrelenmiş şekilde listelemek

#### Request Body
```typescript
{
  pageNumber: number,
  pageSize: number,
  filter?: string    // "today" | "last_week" | "last_month"
}
```

#### Filter Açıklaması
- **"today"**: Bugün başlayan abonelikler
- **"last_week"**: Son 7 gün içinde başlayan
- **"last_month"**: Son 30 gün içinde başlayan
- **Boş/undefined**: Tüm abonelikler

#### Response
```typescript
{
  isSucceed: boolean,
  message: string,
  data: {
    data: [
      {
        subscriptionId: string,
        subscriptionName: string,
        startDate: string,           // Turkey timezone formatted
        endDate?: string,            // Turkey timezone formatted
        itemName: string,
        price: number,
        status: string,              // "ACTIVE", "CANCELLED", etc.
        subscriptionReferenceId: string,
        telephoneNumber: string,
        email: string,
        firstName: string,
        lastName: string,
        createdAt: string
      }
    ],
    totalCount: number,
    pageNumber: number,
    pageSize: number,
    totalPages: number
  }
}
```

#### Kullanım Senaryoları (UI)
1. **Tablo/DataGrid:**
   - Sütunlar: Müşteri Adı, Email, Telefon, Abonelik Adı, Paket, Fiyat, Başlangıç, Bitiş, Durum
   - Status için renkli badge'ler (ACTIVE: yeşil, CANCELLED: kırmızı)
   - Her satırda "Detay" butonu

2. **Filtreler:**
   - Zaman filtreleri (Bugün/Bu Hafta/Bu Ay/Tümü)
   - Durum filtreleri (Aktif/İptal/Tümü)
   - Arama (email, telefon, isim)

3. **İstatistikler (Üstte kartlar):**
   - Toplam Abonelik Sayısı
   - Aktif Abonelik Sayısı
   - Bu Ayki Yeni Abonelikler
   - Toplam Gelir

### 11. Abonelik Detayı
**Endpoint:** `GET /api/admin/subscription-detail/{subscriptionId}`  
**Authorization:** RequireAdminOrSubAdminRole  
**Amaç:** Aboneliğin tüm detaylarını görmek (müşteri, adres, çocuk bilgileri)

#### URL Parameters
- `subscriptionId`: string (GUID)

#### Response
```typescript
{
  isSucceed: boolean,
  message: string,
  data: {
    subscription: {
      subscriptionId: string,
      subscriptionName: string,
      startDate: string,
      endDate?: string,
      itemName: string,
      price: number,
      status: string,
      subscriptionReferenceId: string,
      telephoneNumber: string,
      email: string,
      firstName: string,
      lastName: string,
      createdAt: string
    },
    address: {
      id: string,
      addressName: string,
      firstName: string,
      lastName: string,
      phoneNumber: string,
      city: string,
      district: string,
      zipCode: string,
      identityNumber: string,
      addressInfo: string,
      isBillingAddress: boolean,
      invoiceType: number,       // 1: Individual, 2: Corporate
      companyName?: string,
      taxOffice?: string,
      taxId?: string,
      isDefault: boolean,
      userId: string
    },
    childInfo: {
      fullName: string,
      gender: number,             // 1: Male, 2: Female, 3: NotSpecified
      dateOfBirth: string         // dd/MM/yyyy format
    }
  }
}
```

#### Kullanım Senaryoları (UI)
1. **Detay Sayfası/Modal:**
   - **Abonelik Bilgileri:** Üst kısımda kart şeklinde
   - **Müşteri Bilgileri:** İkinci bölüm
   - **Teslimat Adresi:** Harita ile gösterim (isteğe bağlı)
   - **Çocuk Bilgileri:** Yaş hesaplama, cinsiyet ikonu

2. **İşlem Butonları:**
   - Durumu Değiştir (Aktif/Pasif)
   - Aboneliği İptal Et
   - İletişim (Email Gönder, Ara)
   - Geçmiş Siparişleri Görüntüle

3. **Görselleştirme:**
   - Timeline: Abonelik başlangıç-bitiş
   - Ödeme geçmişi grafiği
   - Teslimat durumu takibi

### 12. Abonelik Durumu Güncelle
**Endpoint:** `POST /api/admin/update-subscription-status`  
**Authorization:** RequireAdminOrSubAdminRole  
**Amaç:** Abonelik durumunu manuel olarak değiştirmek

#### Request Body
```typescript
{
  subscriptionId: string,
  status: string              // "ACTIVE", "CANCELLED", "PAUSED", vb.
}
```

#### Response
```typescript
{
  isSucceed: boolean,
  message: string,
  data: string
}
```

#### Kullanım Senaryoları (UI)
- **Durum Değiştirme Modal:**
  - Mevcut durum gösterimi
  - Yeni durum seçimi (dropdown)
  - Neden/Not alanı (isteğe bağlı)
  - Onay butonu

- **Durum Seçenekleri:**
  - ACTIVE: Aktif abonelik
  - CANCELLED: İptal edilmiş
  - PAUSED: Duraklatılmış
  - EXPIRED: Süresi dolmuş

- **Uyarılar:**
  - İptal işlemi geri alınamaz uyarısı
  - Aktif abonelik durumu değişikliklerini loglayın

---

## 📦 Order (Sipariş) Yönetimi

### 13. Sipariş Listesi
**Endpoint:** `POST /api/admin/order-list`  
**Authorization:** RequireAdminOrSubAdminRole  
**Amaç:** Tüm siparişleri filtrelenmiş şekilde listelemek

#### Request Body
```typescript
{
  pageNumber: number,
  pageSize: number,
  filter?: string    // "today" | "last_week" | "last_month" | "all"
}
```

#### Filter Açıklaması
- **"today"**: Bugün verilen siparişler
- **"last_week"**: Son 7 gündeki siparişler
- **"last_month"**: Son 30 gündeki siparişler
- **"all"**: Tüm siparişler
- **Default (boş)**: Bugünden itibaren 3 gün içindeki siparişler

#### Response
```typescript
{
  isSucceed: boolean,
  message: string,
  data: {
    data: [
      {
        orderId: string,
        orderNo: string,           // Payment numarası
        itemName: string,
        price: number,
        paymentStatus: string,     // "Pending", "Completed", "Failed", etc.
        orderStatus: string,       // "Pending", "Processing", "Shipped", "Delivered", etc.
        orderDate: string,         // Turkey timezone
        telephoneNumber: string,
        email: string,
        firstName: string,
        lastName: string,
        createdAt: string
      }
    ],
    totalCount: number,
    pageNumber: number,
    pageSize: number,
    totalPages: number
  }
}
```

#### Payment Status Değerleri
- **Pending**: Ödeme bekleniyor
- **Completed**: Ödeme tamamlandı
- **Failed**: Ödeme başarısız
- **Refunded**: İade edildi
- **Cancelled**: İptal edildi

#### Order Status Değerleri
- **Pending**: Sipariş alındı
- **Processing**: Hazırlanıyor
- **Shipped**: Kargoya verildi
- **Delivered**: Teslim edildi
- **Cancelled**: İptal edildi
- **Returned**: İade edildi

#### Kullanım Senaryoları (UI)
1. **Sipariş Tablosu:**
   - Sütunlar: Sipariş No, Müşteri, Ürün, Fiyat, Ödeme Durumu, Sipariş Durumu, Tarih
   - Durum sütunları için renkli badge'ler
   - Kargo takip numarası (varsa) gösterimi

2. **Filtreler:**
   - Tarih aralığı (bugün/hafta/ay/tümü)
   - Ödeme durumu
   - Sipariş durumu
   - Müşteri arama

3. **Toplu İşlemler:**
   - Seçili siparişleri "Hazırlanıyor" yap
   - Seçili siparişleri "Kargoya Verildi" yap
   - Toplu yazdırma (fatura/etiket)

4. **Raporlama:**
   - Günlük sipariş özeti
   - Ödeme başarı oranı
   - Ortalama teslimat süresi

### 14. Sipariş Detayı
**Endpoint:** `GET /api/admin/order-detail/{orderId}`  
**Authorization:** RequireAdminOrSubAdminRole  
**Amaç:** Siparişin tüm detaylarını görmek

#### URL Parameters
- `orderId`: string (GUID)

#### Response
```typescript
{
  isSucceed: boolean,
  message: string,
  data: {
    order: {
      orderId: string,
      orderNo: string,
      itemName: string,
      price: number,
      paymentStatus: string,
      orderStatus: string,
      orderDate: string,
      telephoneNumber: string,
      email: string,
      firstName: string,
      lastName: string,
      createdAt: string
    },
    address: {
      id: string,
      addressName: string,
      firstName: string,
      lastName: string,
      phoneNumber: string,
      city: string,
      district: string,
      zipCode: string,
      identityNumber: string,
      addressInfo: string,
      isBillingAddress: boolean,
      invoiceType: number,
      companyName?: string,
      taxOffice?: string,
      taxId?: string,
      isDefault: boolean,
      userId: string
    },
    childInfo: {
      fullName: string,
      gender: number,
      dateOfBirth: string
    }
  }
}
```

#### Kullanım Senaryoları (UI)
1. **Detay Sayfası Bölümleri:**
   - **Sipariş Özeti:** Üst banner (sipariş no, tarih, durum)
   - **Ürün Bilgileri:** Ürün adı, fiyat, adet
   - **Müşteri Bilgileri:** İsim, email, telefon
   - **Teslimat Adresi:** Tam adres, harita entegrasyonu
   - **Çocuk Bilgileri:** Hediye edilecek çocuğun bilgileri
   - **Ödeme Bilgileri:** Tutar, yöntem, durum

2. **İşlem Butonları:**
   - Durumu Güncelle
   - Fatura İndir
   - Kargo Etiketi Yazdır
   - Müşteriye Email Gönder
   - İptal Et / İade İşlemi

3. **Durum Takibi:**
   - Timeline gösterimi (sipariş alındı → hazırlandı → kargoya verildi → teslim edildi)
   - Her adımın tarihi ve saati
   - Kargo firması ve takip numarası

### 15. Sipariş Durumlarını Güncelle
**Endpoint:** `POST /api/admin/update-order-statuses`  
**Authorization:** RequireAdminOrSubAdminRole  
**Amaç:** Sipariş ve/veya ödeme durumunu güncellemek

#### Request Body
```typescript
{
  orderId: string,
  orderStatus?: string,      // Optional - yeni sipariş durumu
  paymentStatus?: string     // Optional - yeni ödeme durumu
}
```

#### Response
```typescript
{
  isSucceed: boolean,
  message: string,
  data: string
}
```

#### Önemli Notlar
- Her iki field de optional, en az biri gönderilmeli
- İkisi de birlikte güncellenebilir

#### Kullanım Senaryoları (UI)
1. **Hızlı Durum Değiştirme:**
   - Liste sayfasında dropdown ile hızlı değiştirme
   - Değişiklik anında kaydedilir
   - Toast notification göster

2. **Detaylı Güncelleme Modal:**
   - Sipariş durumu dropdown
   - Ödeme durumu dropdown
   - Not ekle alanı
   - Müşteriye bildirim gönder checkbox
   - Kaydet butonu

3. **Otomatik İşlemler:**
   - Ödeme durumu "Completed" olunca sipariş durumu otomatik "Processing" yap
   - Sipariş "Delivered" olunca müşteriye teşekkür emaili gönder

---

## 📊 Dashboard

### 16. Dashboard Verileri
**Endpoint:** `POST /api/admin/dashboard-data`  
**Authorization:** RequireAdminOrSubAdminRole  
**Amaç:** Admin dashboard için özet istatistikleri getirmek

#### Request Body
Yok (POST olarak gönderilir ama body boş)

#### Response
```typescript
{
  isSucceed: boolean,
  message: string,
  data: {
    totalSubscriptions: number,        // Toplam abonelik sayısı
    activeSubscriptions: number,       // Aktif abonelik sayısı
    lastMonthSubscriptions: number,    // Son 30 gündeki yeni abonelikler
    lastWeekSubscriptions: number,     // Son 7 gündeki yeni abonelikler
    lastDaySubscriptions: number,      // Son 24 saatteki yeni abonelikler
    totalOrderPrice: number,           // Toplam sipariş tutarı
    totalOrderPriceLastMonth: number,  // Son 30 gündeki sipariş tutarı
    totalOrderPriceLastWeek: number,   // Son 7 gündeki sipariş tutarı
    totalOrderPriceLastDay: number     // Son 24 saatteki sipariş tutarı
  }
}
```

#### Kullanım Senaryoları (UI)
1. **Dashboard Layout:**

   **Üst Kısım - KPI Kartları (4 sütun):**
   - **Toplam Abonelik:** 
     - Büyük sayı gösterimi
     - Aktif/Pasif oranı pie chart
     - "Detayları Gör" linki
   
   - **Yeni Abonelikler:**
     - Bugün/Bu Hafta/Bu Ay sekmeli gösterim
     - Trend oku (artış/azalış)
     - Mini line chart

   - **Toplam Gelir:**
     - Büyük tutar gösterimi (TL formatında)
     - Bu ayki hedef progress bar
     - "Raporları Gör" linki

   - **Ortalama Sipariş:**
     - Ortalama sipariş tutarı
     - Karşılaştırma (geçen aya göre)
     - Mini bar chart

   **Orta Kısım - Grafikler (2 sütun):**
   - **Sol:** Abonelik Trend Grafiği (Son 6 ay)
     - Line chart
     - Yeni/İptal edilen abonelikler
   
   - **Sağ:** Gelir Grafiği (Son 6 ay)
     - Area chart
     - Aylık gelir dağılımı

   **Alt Kısım - Tablolar (2 sütun):**
   - **Sol:** Son Siparişler (Son 10)
     - Mini tablo
     - Hızlı durum güncellemesi
     - "Tümünü Gör" linki
   
   - **Sağ:** Bekleyen İşlemler
     - Ödeme bekleyen siparişler
     - İptal talepleri
     - Stok uyarıları

2. **Tarih Filtresi:**
   - Bugün / Bu Hafta / Bu Ay / Bu Yıl toggle
   - Custom tarih aralığı seçici
   - Tüm kartlar ve grafikler filtreye göre güncellenir

3. **Refresh Özelliği:**
   - Auto-refresh (her 30 saniyede bir)
   - Manuel refresh butonu
   - Son güncellenme zamanı gösterimi

4. **Export Özelliği:**
   - Dashboard'u PDF olarak indir
   - Excel raporu oluştur
   - Email ile gönder

---

## 👥 User (Kullanıcı) Yönetimi

### 17. Kullanıcı Listesi
**Endpoint:** `POST /api/admin/user-list`  
**Authorization:** RequireAdminRole (Sadece Admin)  
**Amaç:** Normal kullanıcıları (Customer) listelemek

#### Request Body
```typescript
{
  pageNumber: number,
  pageSize: number,
  filter?: string    // "today" | "last_week" | "last_month"
}
```

#### Response
```typescript
{
  isSucceed: boolean,
  message: string,
  data: {
    data: [
      {
        id: string,
        userName: string,      // Telefon numarası
        email: string,
        firstName: string,
        lastName: string,
        role?: string          // Bu endpoint'te null (sadece User rolü)
      }
    ],
    totalCount: number,
    pageNumber: number,
    pageSize: number,
    totalPages: number
  }
}
```

#### Önemli Notlar
- Bu endpoint sadece `Role = User` olanları getirir
- Admin ve SubAdmin kullanıcıları listede görünmez
- Sadece **Admin** rolü erişebilir (SubAdmin erişemez)

#### Kullanım Senaryoları (UI)
1. **Kullanıcı Tablosu:**
   - Sütunlar: ID, İsim, Soyisim, Email, Telefon, Kayıt Tarihi, İşlemler
   - Avatar/İnitial gösterimi
   - Aktif abonelik badge'i (varsa)

2. **Filtreler ve Arama:**
   - Kayıt tarihi filtreleri
   - İsim/Email/Telefon arama
   - Abonelik durumuna göre filtre (Abonesi Var/Yok)

3. **İşlemler:**
   - Detay Görüntüle butonu
   - Sil butonu (onay ile)
   - Mesaj Gönder butonu
   - Abonelik Oluştur butonu

4. **Toplu İşlemler:**
   - Seçili kullanıcılara toplu email
   - Export (Excel/CSV)

### 18. Kullanıcı Detayı
**Endpoint:** `GET /api/admin/user-detail/{userId}`  
**Authorization:** RequireAdminOrSubAdminRole  
**Amaç:** Kullanıcının tüm bilgilerini görüntülemek

#### URL Parameters
- `userId`: string (GUID)

#### Response
```typescript
{
  isSucceed: boolean,
  message: string,
  data: {
    userId: string,
    userName: string,
    email: string,
    firstName: string,
    lastName: string,
    childInfos: [
      {
        fullName: string,
        dateOfBirth: string,    // dd/MM/yyyy
        gender: number
      }
    ],
    addresses: [
      {
        addressName: string,
        firstName: string,
        lastName: string,
        phoneNumber: string,
        city: string,
        district: string,
        addressInfo: string,
        zipCode: string,
        identityNumber: string,
        companyName?: string,
        taxOffice?: string,
        taxId?: string
      }
    ],
    subscriptions: [
      {
        subscriptionName: string,
        startDate: string,
        endDate?: string,
        itemName: string,
        price: number,
        status: string,
        subscriptionReferenceId?: string
      }
    ],
    orders: [
      {
        orderNo: string,
        itemName: string,
        price: number,
        paymentStatus: string,
        orderStatus: string,
        orderDate: string
      }
    ]
  }
}
```

#### Kullanım Senaryoları (UI)
1. **Detay Sayfası Layout:**

   **Üst Kısım - Kullanıcı Profili:**
   - Avatar/İnitial (büyük)
   - İsim, email, telefon
   - Üyelik tarihi
   - Aktif/Pasif durumu
   - "Düzenle" ve "Sil" butonları

   **Tab Bölümü:**
   
   **Tab 1 - Genel Bilgiler:**
   - Kişisel bilgiler
   - İletişim izinleri
   - Hesap durumu

   **Tab 2 - Çocuk Bilgileri:**
   - Çocuk listesi (kart görünümü)
   - Her çocuk için: İsim, yaş, cinsiyet
   - "Yeni Çocuk Ekle" butonu

   **Tab 3 - Adresler:**
   - Kayıtlı adresler (kart görünümü)
   - Varsayılan adres işaretlemesi
   - Fatura/Teslimat adresi ayrımı
   - Harita entegrasyonu

   **Tab 4 - Abonelikler:**
   - Abonelik listesi (tablo)
   - Durum filtreleri (Aktif/İptal/Tümü)
   - Abonelik detayına git linki

   **Tab 5 - Siparişler:**
   - Sipariş geçmişi (timeline)
   - Sipariş detayına git linki
   - Toplam harcama özeti

2. **İstatistikler (Sağ Sidebar):**
   - Toplam sipariş sayısı
   - Toplam harcama
   - Ortalama sipariş tutarı
   - Abonelik süresi
   - Kayıt tarihi

3. **Hızlı İşlemler:**
   - Email Gönder
   - SMS Gönder
   - Yeni Sipariş Oluştur
   - Hesabı Dondur/Aktifleştir

### 19. Kullanıcı Silme
**Endpoint:** `POST /api/admin/admin-delete/{userId}`  
**Authorization:** RequireAdminRole  
**Amaç:** Kullanıcıyı soft delete ile silmek

#### URL Parameters
- `userId`: string (GUID)

#### Response
```typescript
{
  isSucceed: boolean,
  message: string,
  data: string
}
```

#### Önemli Notlar
- Soft Delete işlemi (kalıcı silme değil)
- Sadece **Admin** yetkisi gerekli
- Aktif aboneliği olan kullanıcı silinmeden önce uyarı gösterilmeli

#### Kullanım Senaryoları (UI)
1. **Silme Onayı Modal:**
   ```
   Kullanıcıyı Sil
   
   [!] Bu kullanıcıyı silmek istediğinizden emin misiniz?
   
   - 2 aktif aboneliği var
   - 5 sipariş geçmişi var
   - Toplam 1.250 TL harcama yapmış
   
   Bu işlem geri alınamaz!
   
   [İptal] [Evet, Sil]
   ```

2. **Silme Seçenekleri:**
   - Sadece hesabı devre dışı bırak
   - Tüm verileri sil (dikkatli!)
   - Abonelikleri iptal et ve sil

---

## 👨‍💼 Admin Kullanıcı Yönetimi

### 20. Admin Kullanıcı Kaydı
**Endpoint:** `POST /api/admin/register`  
**Authorization:** RequireAdminRole  
**Amaç:** Yeni Admin veya SubAdmin kullanıcısı oluşturmak

#### Request Body
```typescript
{
  userId: string,           // Yeni GUID oluşturun
  firstName: string,        // Min 3, Max 50 karakter
  lastName: string,         // Min 2, Max 50 karakter
  email: string,            // Geçerli email formatı
  phoneNumber: string,      // 11 haneli, sadece rakam (05551234567)
  password: string,         // Min 6, Max 100 karakter
  confirmPassword: string,  // Password ile eşleşmeli
  contactPermission: boolean,  // Default: true
  role: number              // 2: AdminUser, 3: SubAdminUser
}
```

#### Validasyonlar
- **FirstName:** Boş olamaz, 3-50 karakter arası
- **LastName:** Boş olamaz, 2-50 karakter arası
- **Email:** Geçerli format, max 254 karakter, daha önce kayıtlı olmamalı
- **PhoneNumber:** 11 haneli, sadece rakam (regex: `^\d+$`)
- **Password:** 6-100 karakter arası
- **ConfirmPassword:** Password ile birebir eşleşmeli
- **Role:** 2 veya 3 olmalı (1: User kabul edilmez)

#### Response
```typescript
{
  isSucceed: boolean,
  message: string,
  data: string
}
```

#### Kullanım Senaryoları (UI)
1. **Admin Ekleme Formu:**
   ```
   Yeni Admin Kullanıcı Ekle
   
   Ad *: [_________]
   Soyad *: [_________]
   Email *: [_________]
   Telefon *: [05XXXXXXXXX]
   
   Rol *: 
   ( ) Admin - Tüm yetkiler
   ( ) Sub Admin - Sınırlı yetkiler
   
   Şifre *: [_________]
   Şifre Tekrar *: [_________]
   
   [İletişim izni var] checkbox
   
   [İptal] [Kaydet]
   ```

2. **Frontend Validasyonları:**
   - Email format kontrolü (real-time)
   - Telefon format kontrolü (0 ile başlamalı, 11 hane)
   - Şifre güç göstergesi (zayıf/orta/güçlü)
   - Şifre eşleşme kontrolü
   - Tüm zorunlu alanlar dolu mu kontrolü

3. **Rol Açıklamaları:**
   - **Admin:** Tüm işlemleri yapabilir, diğer adminleri yönetebilir
   - **Sub Admin:** Kullanıcı ekleyemez/silemez, raporları göremez

4. **Başarılı Kayıt:**
   - Success mesajı
   - Oluşturulan kullanıcının email'ine hoşgeldin maili gönder
   - Admin listesi sayfasına yönlendir

### 21. Admin Kullanıcı Listesi
**Endpoint:** `POST /api/admin/admin-list`  
**Authorization:** RequireAdminOrSubAdminRole  
**Amaç:** Admin ve SubAdmin kullanıcılarını listelemek

#### Request Body
```typescript
{
  pageNumber: number,
  pageSize: number,
  filter?: string    // Bu endpoint'te kullanılmıyor
}
```

#### Response
```typescript
{
  isSucceed: boolean,
  message: string,
  data: {
    data: [
      {
        id: string,
        userName: string,
        email: string,
        firstName: string,
        lastName: string,
        role: string       // "Admin" veya "Sub Admin" (display name)
      }
    ],
    totalCount: number,
    pageNumber: number,
    pageSize: number,
    totalPages: number
  }
}
```

#### Önemli Notlar
- Sadece `Role != User` olan kullanıcıları getirir
- `role` field'ı enum display name olarak dönüyor ("Admin", "Sub Admin")

#### Kullanım Senaryoları (UI)
1. **Admin Listesi Tablosu:**
   - Sütunlar: İsim, Soyisim, Email, Telefon, Rol, İşlemler
   - Rol badge'i (Admin: mavi, SubAdmin: yeşil)
   - "Yeni Admin Ekle" butonu (sadece Admin görsün)

2. **Filtreler:**
   - Role göre filtre (Admin/SubAdmin/Tümü)
   - İsim/Email arama

3. **İşlemler:**
   - Detay Görüntüle
   - Şifre Sıfırla
   - Sil (sadece Admin yetkisi)
   - Aktif/Pasif yap

4. **İzinler Tablosu:**
   - Her satırda hangi admin hangi işlemleri yapabileceğini gösteren icon'lar
   - Tooltip ile açıklamalar

---

## 🎨 UI/UX Önerileri ve Best Practices

### 1. Genel Layout Yapısı

```
┌─────────────────────────────────────────────┐
│  Logo    Dashboard   Users   Orders  [👤]  │ <- Header/Navbar
├──────┬──────────────────────────────────────┤
│      │                                      │
│ 📊   │  Page Content                        │
│ 👥   │                                      │
│ 📦   │                                      │
│ 🎯   │                                      │
│      │                                      │
│ Sidebar                                     │
└──────┴──────────────────────────────────────┘
```

### 2. Component Önerileri

#### Loading States
Tüm API çağrılarında loading indicator kullanın:
```typescript
const [loading, setLoading] = useState(false);

// API çağrısı öncesi
setLoading(true);

// Sonrası
setLoading(false);
```

#### Error Handling
```typescript
try {
  const response = await fetch('/api/admin/item-list', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(request)
  });
  
  const result = await response.json();
  
  if (!result.isSucceed) {
    // Error toast
    toast.error(result.message || 'Bir hata oluştu');
    return;
  }
  
  // Success
  setData(result.data);
} catch (error) {
  toast.error('Bağlantı hatası');
  console.error(error);
}
```

#### Pagination Component
```typescript
interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

const Pagination = ({ currentPage, totalPages, onPageChange }: PaginationProps) => {
  return (
    <div className="flex gap-2">
      <button onClick={() => onPageChange(currentPage - 1)} disabled={currentPage === 1}>
        Önceki
      </button>
      
      {[...Array(totalPages)].map((_, i) => (
        <button 
          key={i} 
          onClick={() => onPageChange(i + 1)}
          className={currentPage === i + 1 ? 'active' : ''}
        >
          {i + 1}
        </button>
      ))}
      
      <button onClick={() => onPageChange(currentPage + 1)} disabled={currentPage === totalPages}>
        Sonraki
      </button>
    </div>
  );
};
```

### 3. API Service Layer Örneği

```typescript
// services/adminApi.ts
import axios from 'axios';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'https://api.example.com';

// Axios instance
const api = axios.create({
  baseURL: `${API_BASE_URL}/api/admin`,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor - Token ekleme
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('accessToken');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Response interceptor - Error handling
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Token expired - redirect to login
      window.location.href = '/admin/login';
    }
    return Promise.reject(error);
  }
);

// API Functions
export const adminApi = {
  // Auth
  login: (data: LoginRequestDto) => 
    api.post<BaseCommandResult<UserBaseModel>>('/login', data),

  // Items
  getItems: (request: PaginationRequest) => 
    api.post<BaseCommandResult<PagedResult<ItemDto>>>('/item-list', request),
  
  getItem: (id: string) => 
    api.get<BaseCommandResult<ItemDto>>(`/get-item/${id}`),
  
  createOrUpdateItem: (data: ItemDto) => 
    api.post<BaseCommandResult<string>>('/item', data),
  
  deleteItem: (id: string) => 
    api.post<BaseCommandResult<string>>(`/delete-item/${id}`),

  // Campaigns
  getCampaigns: (request: PaginationRequest) => 
    api.post<BaseCommandResult<PagedResult<CampaignDto>>>('/campaign-list', request),
  
  getCampaign: (id: string) => 
    api.get<BaseCommandResult<CampaignDto>>(`/get-campaign/${id}`),
  
  createOrUpdateCampaign: (data: CampaignDto) => 
    api.post<BaseCommandResult<string>>('/campaign', data),
  
  deleteCampaign: (id: string) => 
    api.post<BaseCommandResult<string>>(`/delete-campaign/${id}`),

  // Subscriptions
  getSubscriptions: (request: PaginationRequest) => 
    api.post<BaseCommandResult<PagedResult<SubscriptionListAdminResponse>>>('/subscription-list', request),
  
  getSubscriptionDetail: (id: string) => 
    api.get<BaseCommandResult<SubscriptionDetailResponse>>(`/subscription-detail/${id}`),
  
  updateSubscriptionStatus: (data: UpdateSubscriptionStatusRequest) => 
    api.post<BaseCommandResult<string>>('/update-subscription-status', data),

  // Orders
  getOrders: (request: PaginationRequest) => 
    api.post<BaseCommandResult<PagedResult<OrderListAdminResponse>>>('/order-list', request),
  
  getOrderDetail: (id: string) => 
    api.get<BaseCommandResult<OrderDetailResponse>>(`/order-detail/${id}`),
  
  updateOrderStatuses: (data: UpdateOrderStatusesRequest) => 
    api.post<BaseCommandResult<string>>('/update-order-statuses', data),

  // Dashboard
  getDashboardData: () => 
    api.post<BaseCommandResult<DashboardData>>('/dashboard-data'),

  // Users
  getUsers: (request: PaginationRequest) => 
    api.post<BaseCommandResult<PagedResult<UserListDto>>>('/user-list', request),
  
  getUserDetail: (id: string) => 
    api.get<BaseCommandResult<UserDetailsDto>>(`/user-detail/${id}`),
  
  deleteUser: (id: string) => 
    api.post<BaseCommandResult<string>>(`/admin-delete/${id}`),

  // Admin Users
  getAdmins: (request: PaginationRequest) => 
    api.post<BaseCommandResult<PagedResult<UserListDto>>>('/admin-list', request),
  
  registerAdmin: (data: RegisterRequestDto) => 
    api.post<BaseCommandResult<string>>('/register', data),
};
```

### 4. TypeScript Type Definitions

Tüm modelleri TypeScript interface/type olarak tanımlayın:

```typescript
// types/admin.ts

// Base Types
export interface BaseCommandResult<T> {
  isSucceed: boolean;
  message: string | null;
  data: T | null;
}

export interface PagedResult<T> {
  data: T[];
  totalCount: number;
  pageNumber: number;
  pageSize: number;
  totalPages: number;
}

export interface PaginationRequest {
  pageNumber: number;
  pageSize: number;
  filter?: string;
}

// Item Types
export enum ItemTypes {
  PremiumToy = 1,
  ToyPackage = 2,
}

export interface ItemDto {
  id?: string;
  title: string;
  description: string;
  price: number;
  packageLength?: number;
  discountPrice?: number;
  packageCode?: number;
  itemType: ItemTypes;
  pricingPlanId?: string;
  mostPreffered: boolean;
  isDeleted: boolean;
  mostPrefferedTitle?: string;
}

// Campaign Types
export interface CampaignDto {
  id?: string;
  code: string;
  discountAmount?: number;
  discountPercentage?: number;
  expiration: string;
}

// Auth Types
export interface LoginRequestDto {
  userId?: string;
  email: string;
  password: string;
}

export interface RegisterRequestDto {
  userId: string;
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  password: string;
  confirmPassword: string;
  contactPermission: boolean;
  role: number;
}

export enum Roles {
  User = 1,
  AdminUser = 2,
  SubAdminUser = 3,
}

export interface UserBaseModel {
  id: string;
  phoneNumber: string;
  email: string;
  firstName: string;
  lastName: string;
  accessToken?: string;
  refreshToken?: string;
  userStep: number;
  role: Roles;
}

// Dashboard Types
export interface DashboardData {
  totalSubscriptions: number;
  activeSubscriptions: number;
  lastMonthSubscriptions: number;
  lastWeekSubscriptions: number;
  lastDaySubscriptions: number;
  totalOrderPrice: number;
  totalOrderPriceLastMonth: number;
  totalOrderPriceLastWeek: number;
  totalOrderPriceLastDay: number;
}

// Subscription Types
export interface SubscriptionListAdminResponse {
  subscriptionId: string;
  subscriptionName: string;
  startDate: string;
  endDate?: string;
  itemName: string;
  price: number;
  status: string;
  subscriptionReferenceId: string;
  telephoneNumber: string;
  email: string;
  firstName: string;
  lastName: string;
  createdAt: string;
}

export interface UpdateSubscriptionStatusRequest {
  subscriptionId: string;
  status: string;
}

// Order Types
export interface OrderListAdminResponse {
  orderId: string;
  orderNo: string;
  itemName: string;
  price: number;
  paymentStatus: string;
  orderStatus: string;
  orderDate: string;
  telephoneNumber: string;
  email: string;
  firstName: string;
  lastName: string;
  createdAt: string;
}

export interface UpdateOrderStatusesRequest {
  orderId: string;
  orderStatus?: string;
  paymentStatus?: string;
}

// User Types
export interface UserListDto {
  id: string;
  userName: string;
  email: string;
  firstName: string;
  lastName: string;
  role?: string;
}

export interface UserDetailsDto {
  userId: string;
  userName: string;
  email: string;
  firstName: string;
  lastName: string;
  childInfos: ChildInfoUserDto[];
  addresses: AddressUserDto[];
  subscriptions: SubscriptionUserDto[];
  orders: OrderUserDto[];
}

export interface ChildInfoUserDto {
  fullName: string;
  dateOfBirth: string;
  gender: number;
}

export interface AddressUserDto {
  addressName: string;
  firstName: string;
  lastName: string;
  phoneNumber: string;
  city: string;
  district: string;
  addressInfo: string;
  zipCode: string;
  identityNumber: string;
  companyName?: string;
  taxOffice?: string;
  taxId?: string;
}

export interface SubscriptionUserDto {
  subscriptionName: string;
  startDate: string;
  endDate?: string;
  itemName: string;
  price: number;
  status: string;
  subscriptionReferenceId?: string;
}

export interface OrderUserDto {
  orderNo: string;
  itemName: string;
  price: number;
  paymentStatus: string;
  orderStatus: string;
  orderDate: string;
}
```

### 5. Sayfa Yapıları ve Route Önerileri

```
/admin
  /login                          -> Login sayfası
  /dashboard                      -> Ana dashboard
  
  /items                          -> Ürün listesi
  /items/new                      -> Yeni ürün ekle
  /items/[id]/edit                -> Ürün düzenle
  
  /campaigns                      -> Kampanya listesi
  /campaigns/new                  -> Yeni kampanya
  /campaigns/[id]/edit            -> Kampanya düzenle
  
  /subscriptions                  -> Abonelik listesi
  /subscriptions/[id]             -> Abonelik detayı
  
  /orders                         -> Sipariş listesi
  /orders/[id]                    -> Sipariş detayı
  
  /customers                      -> Müşteri listesi
  /customers/[id]                 -> Müşteri detayı
  
  /admins                         -> Admin kullanıcı listesi
  /admins/new                     -> Yeni admin ekle
  
  /settings                       -> Ayarlar
  /profile                        -> Profil
```

### 6. UI Component Library Önerileri

Aşağıdaki kütüphaneleri kullanmanızı öneririm:

- **UI Framework:** shadcn/ui veya Material-UI (MUI)
- **Form Management:** React Hook Form
- **Validation:** Zod veya Yup
- **Data Table:** TanStack Table (React Table)
- **Charts:** Recharts veya Chart.js
- **Date Picker:** react-datepicker
- **Toast Notifications:** react-hot-toast veya sonner
- **Icons:** lucide-react veya react-icons
- **Modal:** @headlessui/react

### 7. Responsive Design

Tüm sayfalar mobile-first yaklaşımla tasarlanmalı:

- **Desktop:** Full featured, sidebar + content
- **Tablet:** Collapsible sidebar
- **Mobile:** Bottom navigation, hamburger menu

### 8. Performance Optimization

- **Lazy Loading:** Route bazlı code splitting
- **Pagination:** Her liste için pagination uygulayın
- **Debounce:** Search inputlarında debounce kullanın
- **Cache:** React Query veya SWR ile data caching
- **Optimistic Updates:** Kullanıcı aksiyonlarında hızlı feedback

### 9. Security

- **Token Storage:** HttpOnly cookie veya secure localStorage
- **Token Refresh:** Automatic token refresh mekanizması
- **Route Protection:** Private route wrapper
- **CSRF Protection:** CSRF token kullanımı
- **Input Sanitization:** XSS koruması

### 10. Testing

Her endpoint için test senaryoları:

```typescript
// __tests__/admin/items.test.ts
describe('Admin Items API', () => {
  it('should list all items', async () => {
    const response = await adminApi.getItems({ pageNumber: 1, pageSize: 10 });
    expect(response.data.isSucceed).toBe(true);
    expect(response.data.data).toBeDefined();
  });

  it('should create new item', async () => {
    const newItem = { /* ... */ };
    const response = await adminApi.createOrUpdateItem(newItem);
    expect(response.data.isSucceed).toBe(true);
  });
});
```

---

## 📝 Endpoint Özet Tablosu

| Endpoint | Method | Auth | Amaç |
|----------|--------|------|------|
| `/login` | POST | Public | Admin girişi |
| `/item` | POST | Admin/SubAdmin | Ürün ekle/güncelle |
| `/item-list` | POST | Admin/SubAdmin | Ürün listesi |
| `/get-item/{id}` | GET | Admin/SubAdmin | Ürün detayı |
| `/delete-item/{id}` | POST | Admin | Ürün sil |
| `/campaign` | POST | Admin/SubAdmin | Kampanya ekle/güncelle |
| `/campaign-list` | POST | Admin/SubAdmin | Kampanya listesi |
| `/get-campaign/{id}` | GET | Admin/SubAdmin | Kampanya detayı |
| `/delete-campaign/{id}` | POST | Admin | Kampanya sil |
| `/subscription-list` | POST | Admin/SubAdmin | Abonelik listesi |
| `/subscription-detail/{id}` | GET | Admin/SubAdmin | Abonelik detayı |
| `/update-subscription-status` | POST | Admin/SubAdmin | Abonelik durumu güncelle |
| `/order-list` | POST | Admin/SubAdmin | Sipariş listesi |
| `/order-detail/{id}` | GET | Admin/SubAdmin | Sipariş detayı |
| `/update-order-statuses` | POST | Admin/SubAdmin | Sipariş durumu güncelle |
| `/dashboard-data` | POST | Admin/SubAdmin | Dashboard verileri |
| `/user-list` | POST | Admin | Kullanıcı listesi |
| `/user-detail/{id}` | GET | Admin/SubAdmin | Kullanıcı detayı |
| `/admin-delete/{id}` | POST | Admin | Kullanıcı sil |
| `/admin-list` | POST | Admin/SubAdmin | Admin listesi |
| `/register` | POST | Admin | Admin kaydı |

---

## 🚀 Hızlı Başlangıç Checklist

### 1. Proje Setup
- [ ] Next.js projesi oluştur
- [ ] TypeScript konfigürasyonu
- [ ] ESLint ve Prettier setup
- [ ] UI component library yükle
- [ ] Axios/Fetch wrapper oluştur

### 2. Authentication
- [ ] Login sayfası
- [ ] Token storage mekanizması
- [ ] Protected route wrapper
- [ ] Token refresh logic

### 3. Layout
- [ ] Admin layout component
- [ ] Sidebar navigation
- [ ] Header component
- [ ] Footer component

### 4. Core Pages (Priority Order)
1. [ ] Dashboard
2. [ ] Orders List & Detail
3. [ ] Subscriptions List & Detail
4. [ ] Items Management
5. [ ] Campaigns Management
6. [ ] Users Management
7. [ ] Admin Users Management

### 5. Shared Components
- [ ] Data table component
- [ ] Pagination component
- [ ] Loading states
- [ ] Error handling
- [ ] Toast notifications
- [ ] Confirm modals

### 6. API Integration
- [ ] API service layer
- [ ] Type definitions
- [ ] Error interceptors
- [ ] Loading states

### 7. Testing & Deployment
- [ ] Unit tests
- [ ] Integration tests
- [ ] E2E tests
- [ ] Production build
- [ ] Deployment

---

## 📞 Destek ve İletişim

Bu dokümantasyon hakkında sorularınız veya ek bilgiye ihtiyacınız varsa, backend ekibi ile iletişime geçebilirsiniz.

**Son Güncelleme:** 2024
**Versiyon:** 1.0.0

