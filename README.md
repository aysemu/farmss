# Farm Game - Frontend Çalışma Projesi

Bu proje, modern **Frontend geliştirme** yeteneklerimi ve interaktif web uygulaması mimarisini pratik etmek amacıyla geliştirdiğim bir **Frontend Çalışma ve Öğrenme Projesidir**.

Uygulama; kullanıcı yönetimi, envanter sistemi, dinamik mağaza ekonomisi ve zaman tabanlı tarla ekim simülasyonunu içerir.

---

## Teknolojiler ve Mimari

Bu projede aşağıdaki güncel web teknolojileri kullanılmıştır:

- **Framework:** Next.js 15 (App Router)
- **Kütüphane:** React 19
- **Dil:** TypeScript (Tip güvenliği ve temiz kod)
- **Stilleme:** CSS Modules (Bileşen bazlı modüler CSS)
- **Durum Yönetimi:** React Context API (`BalanceContext`, `StoreContext`)
- **Depolama:** LocalStorage (Kullanıcı hesapları yönetimi)

---

## Proje Özellikleri

1. **Giriş & Kayıt Sistemi (Auth Flow):**
   - Kullanıcı kayıt ve giriş ekranları.
   - Hata ve başarı durumları için kullanıcı dostu satır içi bildirimler.

2. **Ekonomi ve Mağaza Sistemi:**
   - Coin bakiyesi yönetimi.
   - Papatya ve Lale gibi çiçek tohumlarının adet seçilerek satın alınması.
   - Yetersiz bakiye kontrolleri ve canlı envanter takibi.

3. **İnteraktif Tarla Ekim Simülasyonu:**
   - 4x4 ızgara ( grid ) tarla parselleri.
   - Tarlaya tıklandığında eldeki çiçekleri listeleyen özel seçim penceresi (modal).
   - Zaman tabanlı büyüme evreleri:
     - **Tohumlama** (`Seeding.png`)
     - **Filizlenme** (`MiddlePlant.png`)
     - **Çiçek Açma** (`Tulip.png` / `Daisy.png`)
     - **Kuruma** (`DriedTulip.png` / `DriedDaisy.png`)
   - Açan çiçekleri toplayarak Coin kazanma ekonomisi.

4. **Kullanıcı Arayüzü (UI/UX):**
   - Tamamen duyarlı (responsive) ve merkezlenmiş kart tasarımları.
   - Hızlı navigasyon için sağ üst köşede Çıkış Yap butonu.

---

## Yerel Kurulum ve Çalıştırma

Projeyi bilgisayarınızda çalıştırmak için aşağıdaki adımları izleyebilirsiniz:

1. **Bağımlılıkları Yükleyin:**
   ```bash
   npm install
   ```

2. **Geliştirme Sunucusunu Başlatın:**
   ```bash
   npm run dev
   ```

3. **Uygulamayı Tarayıcıda Açın:**
   Tarayıcınızdan `http://localhost:3000` adresine gidin.

4. **Üretim Sürümü (Production Build):**
   ```bash
   npm run build
   npm run start
   ```

---

> **Not:** Bu repo bir frontend öğrenme projesi olup sürekli geliştirilmeye açıktır.