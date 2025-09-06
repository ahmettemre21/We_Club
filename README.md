# WeClub on RISE - ETHIstanbul Hackathon Project

## 🚀 Proje Özeti

WeClub, RISE Testnet üzerinde NFT pasaportlar ve DAO yönetişimi ile gerçek ürün sahiplerini bir araya getiren özel bir on-chain kulüp platformudur. YAWZ ekosisteminin dijital uzantısı olarak, fiziksel ürün sahipliğini blockchain üzerinde doğrulayan ve topluluk yönetimini merkeziyetsiz hale getiren bir dApp'tir.

### 🎯 ETHIstanbul 2024 Kategorileri
- **RISE Track**: RISE Testnet üzerinde native olarak geliştirildi
- **DAO & Governance Track**: On-chain oylama ve topluluk yönetimi
- **NFT Track**: Dijital pasaport NFT'leri

## 🏗️ Teknik Mimari

### Akıllı Kontratlar
1. **PassportNFT.sol**: ERC-721 standardında dijital pasaport NFT'leri
   - Tier sistemi (Platinum, Gold, Silver)
   - Owner-only minting
   - Metadata desteği

2. **WeClubDAO.sol**: Basit ama etkili DAO yönetişim kontratı
   - Proposal oluşturma ve oylama
   - Ağırlıklı oylama sistemi
   - Execution mekanizması

### Frontend Stack
- **Next.js 14**: React framework
- **Wagmi + Viem**: Web3 entegrasyonu
- **Tailwind CSS**: Styling
- **shadcn/ui**: UI komponnetleri

### RISE Entegrasyonu
- **Chain ID**: 11155931 (RISE Testnet)
- **RPC**: https://testnet.riselabs.xyz
- **Explorer**: https://explorer.testnet.riselabs.xyz

## 🛠️ Kurulum

### Gereksinimler
- Node.js 18+
- npm veya yarn
- MetaMask veya benzeri Web3 cüzdan

### Adımlar

1. **Projeyi klonlayın**
```bash
git clone https://github.com/ahmettemre21/We_Club
cd We_Club
```

2. **Bağımlılıkları yükleyin**
```bash
npm install
```

3. **Çevre değişkenlerini ayarlayın**
`.env.local` dosyası oluşturun:
```env
PRIVATE_KEY=your_private_key
NEXT_PUBLIC_PASSPORT_NFT_ADDRESS=deployed_nft_address
NEXT_PUBLIC_DAO_ADDRESS=deployed_dao_address
```

4. **Kontratları deploy edin**
```bash
npx hardhat run scripts/deploy.ts --network rise
```

5. **Frontend'i çalıştırın**
```bash
npm run dev
```

## 📱 Özellikler

### 1. NFT Passport System
- Fiziksel YAWZ ürün sahiplerine dijital pasaport
- Tier bazlı ayrıcalıklar
- On-chain sahiplik doğrulaması

### 2. DAO Governance
- Topluluk önerileri ve oylamaları
- Ağırlıklı oylama sistemi
- Transparent execution

### 3. RISE Native Features
- Hızlı ve düşük maliyetli işlemler
- EVM uyumluluğu
- Gelişmiş paralel işleme

## 🔗 Demo & Linkler

- **Live Demo**: [weclub-rise.vercel.app](https://weclub-rise.vercel.app)
- **Video Demo**: [YouTube Link](https://youtube.com/demo)
- **Kontrat Adresleri**:
  - PassportNFT: `0x...`
  - WeClubDAO: `0x...`

## 🏆 Neden RISE?

1. **Performans**: 100,000+ TPS kapasitesi ile ölçeklenebilir DAO oylamaları
2. **Maliyet**: Ultra düşük gas ücretleri ile herkes için erişilebilir yönetişim
3. **Developer Experience**: EVM uyumluluğu ve zengin toolkit
4. **Paralel İşleme**: Aynı anda binlerce oylama işlemi

## 🤝 Katkıda Bulunma

Pull request'ler kabul edilir. Büyük değişiklikler için önce bir issue açın.

## 📄 Lisans

MIT

## 👥 Ekip

- **Proje Lideri**: [İsim]
- **Smart Contract Dev**: [İsim]
- **Frontend Dev**: [İsim]
- **UI/UX Designer**: [İsim]

## 🙏 Teşekkürler

- RISE Chain ekibine toolkit ve destek için
- ETHIstanbul organizatörlerine bu fırsat için
- YAWZ topluluğuna ilham ve destek için

---

**Built with ❤️ at ETHIstanbul 2024**
