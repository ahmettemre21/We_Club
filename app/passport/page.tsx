'use client'

import { useState, useEffect } from 'react'
import { NFTCard } from '@/components/nft-card'
import { WalletConnect } from '@/components/wallet-connect'
import { useAccount, useSwitchChain } from 'wagmi'
import { Button } from '@/components/ui/button'

// Bu adresler deploy sonrası güncellenecek
const PASSPORT_NFT_ADDRESS = process.env.NEXT_PUBLIC_PASSPORT_NFT_ADDRESS || '0x0000000000000000000000000000000000000000'

export default function YawzPassportPage() {
  const { isConnected, chainId } = useAccount()
  const { switchChain } = useSwitchChain()
  const [mounted, setMounted] = useState(false)
  
  // Hydration hatasını önlemek için
  useEffect(() => {
    setMounted(true)
  }, [])
  
  // RISE Testnet Chain ID: 11155931
  const isCorrectNetwork = chainId === 11155931

  // Hydration hatasını önlemek için mounted kontrolü
  if (!mounted) {
    return (
      <div className="min-h-screen bg-gray-50 p-4 md:p-8">
        <div className="max-w-7xl mx-auto">
          <div className="flex justify-center items-center h-64">
            <div className="text-center">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900 mx-auto mb-4"></div>
              <p className="text-gray-600">Yükleniyor...</p>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold">YAWZ Passport NFT</h1>
            <p className="text-gray-600 mt-2">RISE Testnet üzerinde dijital pasaportunuz</p>
          </div>
          <WalletConnect />
        </div>

        {/* Network Warning */}
        {isConnected && !isCorrectNetwork && (
          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
                <span className="text-yellow-800 font-medium">
                  Yanlış Network: RISE Testnet'e geçin
                </span>
              </div>
              <Button 
                onClick={() => switchChain({ chainId: 11155931 })}
                size="sm"
                className="bg-yellow-600 hover:bg-yellow-700"
              >
                RISE Testnet'e Geç
              </Button>
            </div>
          </div>
        )}

        {/* NFT Gallery */}
        {isConnected ? (
          <NFTCard contractAddress={PASSPORT_NFT_ADDRESS} />
        ) : (
          <div className="bg-white rounded-lg shadow-lg p-12 text-center">
            <h2 className="text-xl font-semibold mb-4">Cüzdanınızı Bağlayın</h2>
            <p className="text-gray-600 mb-6">
              YAWZ Passport NFT'lerinizi görüntülemek için cüzdanınızı bağlamanız gerekiyor.
            </p>
            <div className="flex justify-center">
              <WalletConnect />
            </div>
          </div>
        )}

        {/* Original Passport Design Below */}
        <div className="mt-16">
          <h2 className="text-xl font-bold mb-6 text-center">Fiziksel Pasaport Tasarımı</h2>
          
          {/* Passport Document - Real passport design */}
          <div className="bg-white shadow-lg border-2 border-gray-300 overflow-hidden">
            {/* Page 1 - Product Identity */}
            <div className="p-8 md:p-12 border-b border-gray-200">
              {/* Header */}
              <div className="flex justify-between items-start mb-8">
                <div>
                  <h1 className="text-xl md:text-2xl font-bold mb-1">YAWZ EKOSİSTEM / YAWZ ECOSYSTEM</h1>
                  <h2 className="text-lg md:text-xl font-semibold">PASAPORT / PASSPORT</h2>
                </div>
                <div className="text-right">
                  <p className="text-xs font-semibold mb-1">PASAPORT NO. / PASSPORT NO.</p>
                  <p className="text-lg font-mono font-bold">L2510100001</p>
                </div>
              </div>

              {/* Main Content - Product Image + Identity Info */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
                {/* Left Side - Product Image */}
                <div className="flex justify-center">
                  <div className="w-full max-w-sm bg-gray-100 border border-gray-300 p-4 rounded">
                    <img
                      src="/yawz-green-polo-shirt-with-white-collar-stripes.jpg"
                      alt="YAWZ Polo Shirt"
                      className="w-full h-auto object-cover rounded"
                    />
                  </div>
                </div>

                {/* Right Side - Product Identity Information */}
                <div className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <p className="text-xs font-semibold mb-1 text-gray-600">MODEL TÜRÜ / MODEL TYPE</p>
                      <p className="text-base font-semibold">POLO TİŞÖRT</p>
                    </div>
                    <div>
                      <p className="text-xs font-semibold mb-1 text-gray-600">ÜLKE KODU / CODE OF ISSUING STATE</p>
                      <p className="text-base font-semibold">TR</p>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <p className="text-xs font-semibold mb-1 text-gray-600">MODEL ADI / MODEL NAME</p>
                      <p className="text-base font-bold">YAWZ#101001</p>
                    </div>
                    <div>
                      <p className="text-xs font-semibold mb-1 text-gray-600">KOLEKSİYON ADI / COLLECTION NAME</p>
                      <p className="text-base font-semibold">ESSENTIALS</p>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <p className="text-xs font-semibold mb-1 text-gray-600">ÜRETİM TARİHİ / PRODUCTION DATE</p>
                      <p className="text-base">01 EYL/SEP 2025</p>
                    </div>
                    <div>
                      <p className="text-xs font-semibold mb-1 text-gray-600">ÜRETİM YERİ / PRODUCTION PLACE</p>
                      <p className="text-base">İSTANBUL / TÜRKİYE</p>
                    </div>
                  </div>

                  <div>
                    <p className="text-xs font-semibold mb-1 text-gray-600">KOLEKSİYON NO. / COLLECTION NO.</p>
                    <p className="text-base font-mono">CN00001</p>
                  </div>
                </div>
              </div>

              <div className="border-t-2 border-black pt-4">
                <div className="bg-gray-50 border border-gray-300 p-8 font-mono text-sm md:text-base tracking-wider leading-relaxed">
                  <p className="break-all">
                    YAWZ&lt;&lt;101001&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;TR&lt;&lt;&lt;ESSENTIALS&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;001250901&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;
                  </p>
                  <p className="break-all">&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;L2510100001250901&lt;AVC&lt;IST&lt;TUR&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;CN000017546C180GR&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;YAWZ</p>
                </div>
              </div>
            </div>

            {/* Page 2 - Production Details + Vision */}
            <div className="p-8 md:p-12 relative">
              {/* Large YAWZ Watermark */}
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-5">
                <div className="text-9xl font-black text-black transform rotate-12">YAWZ</div>
              </div>

              {/* Content Grid */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 relative z-10">
                {/* Left Side - Production Details */}
                <div>
                  <h3 className="text-lg font-bold mb-6 border-b border-gray-300 pb-2">
                    ÜRETİM BİLGİLERİ / PRODUCTION DETAILS
                  </h3>

                  <div className="space-y-4">
                    <div>
                      <p className="text-xs font-semibold mb-1 text-gray-600">KUMAŞ TÜRÜ / FABRIC TYPE</p>
                      <p className="text-base font-semibold">%100 ORGANİK PAMUK / %100 ORGANIC COTTON</p>
                    </div>

                    <div>
                      <p className="text-xs font-semibold mb-1 text-gray-600">RENK / COLOR</p>
                      <p className="text-base">PANTONE 7546C (YAWZ NAVY)</p>
                    </div>

                    <div>
                      <p className="text-xs font-semibold mb-1 text-gray-600">BEDEN / SIZE</p>
                      <p className="text-base font-bold">M</p>
                    </div>

                    <div>
                      <p className="text-xs font-semibold mb-1 text-gray-600">GRAMAJ / WEIGHT</p>
                      <p className="text-base">180 GR</p>
                    </div>

                    <div>
                      <p className="text-xs font-semibold mb-1 text-gray-600">DİKİŞ TİPİ / STITCH TYPE</p>
                      <p className="text-base">ÇİFT İĞNE / DOUBLE NEEDLE</p>
                    </div>

                    <div>
                      <p className="text-xs font-semibold mb-1 text-gray-600">BASKI TİPİ / PRINT TYPE</p>
                      <p className="text-base">SERİGRAFİ / SCREEN PRINTING</p>
                    </div>
                  </div>

                  {/* Large YAWZ Logo */}
                  <div className="mt-8">
                    <div className="text-6xl font-black text-black">YAWZ</div>
                  </div>
                </div>

                {/* Right Side - YAWZ Vision */}
                <div>
                  <h3 className="text-lg font-bold mb-6 border-b border-gray-300 pb-2">YAWZ VİZYON / YAWZ VISION</h3>

                  <div className="space-y-6">
                    <div>
                      <p className="text-sm font-bold mb-3 text-black">TR:</p>
                      <p className="text-sm leading-relaxed text-justify">
                        Yawz, etik, estetik ve teknolojiyi zarafetle buluşturarak, bu değerlerin yönetimini topluluk
                        temelli bir hak olarak gören; Türkiye'den doğup global moda anlayışına yön vermeyi amaçlayan öncü
                        bir giyim markasıdır.
                      </p>
                    </div>

                    <div>
                      <p className="text-sm font-bold mb-3 text-black">EN:</p>
                      <p className="text-sm leading-relaxed text-justify">
                        Yawz is a pioneering fashion brand that blends ethics, aesthetics, and technology with elegance,
                        recognizing the governance of these values as a community-based right; born in Turkey with the aim
                        of shaping the global fashion landscape.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}