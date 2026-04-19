console.log("🚀 ADIM 1: Motor çalıştı...");
require('dotenv').config();
console.log("🔑 ADIM 2: AWS şifreleri dosyadan okundu...");

const WebSocket = require('ws');
const AWS = require('aws-sdk');
console.log("📦 ADIM 3: Gerekli kütüphaneler yüklendi...");

// AWS DynamoDB Bağlantı Ayarları
AWS.config.update({
    region: process.env.AWS_REGION,
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY
});
const docClient = new AWS.DynamoDB.DocumentClient();
console.log("☁️ ADIM 4: AWS Bulut bağlantısı hazır...");

console.log("⏳ ADIM 5: 8081 portu açılmaya çalışılıyor...");
const wss = new WebSocket.Server({ port: 8081 });

// Sunucu başarıyla açıldığında burası çalışacak
wss.on('listening', () => {
    console.log("📡 BİNGO! Sunucu 8081 portunda dinleniyor! Arayüzü açabilirsin.");
});

// Bir hata olursa sessizce durmak yerine ekrana basacak
wss.on('error', (err) => {
    console.log("🚨 KRİTİK HATA OLUŞTU:", err.message);
});

// Başlangıç Koordinatları (Ankara Merkez)
let currentLat = 39.92077; 
let currentLng = 32.85411;
let speed = 80;

wss.on('connection', (ws) => {
    console.log("🟢 HARİKA: Arayüz (Frontend) sunucuya bağlandı!");

    // Her 2 saniyede bir sensör verisi üret ve AWS'ye yolla
    const interval = setInterval(async () => {
        
        speed = Math.floor(Math.random() * (120 - 60 + 1)) + 60; 
        let rpm = speed * 25 + Math.floor(Math.random() * 200); 
        currentLat += (Math.random() - 0.5) * 0.002; 
        currentLng += (Math.random() - 0.5) * 0.002;

        const telemetryData = {
            arac_id: "06-ACCENT-BLUE", 
            timestamp: Date.now(),
            hiz: speed,
            devir: rpm,
            lat: currentLat.toFixed(5),
            lng: currentLng.toFixed(5)
        };

        // 1. Arayüze gönder
        ws.send(JSON.stringify(telemetryData));

        // 2. AWS'ye yaz
        const params = {
            TableName: "AracTelemetri",
            Item: telemetryData
        };

        try {
            await docClient.put(params).promise();
            console.log(`☁️ AWS'ye yazıldı: ${speed} km/h`);
        } catch (err) {
            console.error("❌ AWS Hatası:", err.message);
        }

    }, 2000); 

    ws.on('close', () => {
        console.log("🔴 Bağlantı koptu.");
        clearInterval(interval);
    });
});