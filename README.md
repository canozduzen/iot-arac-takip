# 🚗 Gerçek Zamanlı Araç Telemetrisi (IoT & Cloud)

Bu proje, bir aracın (Hyundai Accent Blue) telemetri verilerinin (Hız, Motor Devri, GPS Konumu) gerçek zamanlı olarak simüle edildiği, AWS bulut altyapısı üzerinden yayınlandığı ve NoSQL veritabanında depolandığı uçtan uca bir IoT (Nesnelerin İnterneti) uygulamasıdır.

🔗 **[Canlı Demo İçin Tıklayın](http://canozduzen.github.io/iot-arac-takip/)** *(Not: Sistem bulut sunucusuyla gerçek zamanlı WebSocket bağlantısı kurduğu için tarayıcınızda 'Mixed Content / Güvenli Olmayan İçerik' izni vermeniz gerekebilir.)*

---

## 🏗️ Sistem Mimarisi ve Teknolojiler

Proje, yerel makine bağımlılığını ortadan kaldırarak tamamen bulut (Cloud-Native) ortamında çalışacak şekilde tasarlanmıştır.

* **Frontend (Arayüz):** HTML5, CSS3, Vanilla JavaScript (GitHub Pages üzerinde barındırılmaktadır).
* **Backend (Sunucu):** Node.js & WebSocket (AWS EC2 - Ubuntu 22.04 üzerinde çalışmaktadır).
* **Veritabanı:** AWS DynamoDB (AWS SDK `v3` ile entegre).
* **Süreç Yönetimi:** PM2 (Sunucuda 7/24 kesintisiz veri akışı için).

---

## ✨ Temel Özellikler

- **Gerçek Zamanlı Veri Akışı:** WebSocket protokolü kullanılarak minimum gecikme ile çift yönlü iletişim.
- **Dinamik Simülasyon:** Aracın hızlanma, yavaşlama ve ivme durumlarına göre mantıksal motor devri (RPM) ve GPS koordinat hesaplamaları.
- **Kalıcı Veri Depolama:** Üretilen her telemetri paketi anlık olarak AWS DynamoDB'ye zaman damgasıyla (timestamp) kaydedilir.
- **Yüksek Erişilebilirlik:** EC2 sunucusunda çalışan süreç, sistem yeniden başlatılsa bile PM2 sayesinde otomatik olarak ayağa kalkar.

---

## 🛠️ Kurulum ve Çalıştırma (Geliştiriciler İçin)

Projeyi kendi ortamınızda veya sunucunuzda çalıştırmak isterseniz aşağıdaki adımları izleyebilirsiniz.

### 1. Gereksinimler
- Node.js (v18 veya üzeri)
- AWS Hesabı (DynamoDB erişimi için)
- AWS Access Key ve Secret Key

### 2. Kurulum
Depoyu bilgisayarınıza klonlayın ve bağımlılıkları yükleyin:
```bash
git clone [https://github.com/canozduzen/iot-arac-takip.git](https://github.com/canozduzen/iot-arac-takip.git)
cd iot-arac-takip/backend
npm install
