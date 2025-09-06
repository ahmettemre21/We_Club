'use client'

import Link from "next/link"
import { useState, useEffect } from "react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { WalletConnect } from "@/components/wallet-connect"
import { useAccount } from "wagmi"

export default function HomePage() {
  const { isConnected } = useAccount()
  const [mounted, setMounted] = useState(false)
  
  // Hydration hatasını önlemek için
  useEffect(() => {
    setMounted(true)
  }, [])
  
  // Hydration hatasını önlemek için mounted kontrolü
  if (!mounted) {
    return (
      <div className="bg-weclub-visa-white">
        <div className="max-w-[1280px] mx-auto px-6 md:px-12">
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
    <div className="bg-weclub-visa-white">
      {/* Hero Section */}
      <div className="max-w-[1280px] mx-auto px-6 md:px-12">
        <div className="grid md:grid-cols-2 gap-12 items-center py-12">
          {/* Left Block */}
          <div className="space-y-8">
            <div className="space-y-6">
              <Image
                src="/images/we-club-logo-black.png"
                alt="We Club"
                width={300}
                height={120}
                className="h-16 w-auto"
              />
              <h1 className="text-4xl md:text-5xl font-bold text-weclub-power-black leading-tight">
                YAWZ'a sahip olanların dijital topluluğu
              </h1>
              <p className="text-lg text-gray-700 font-light leading-relaxed">
                Yalnızca gerçek ürün sahiplerinin katılabildiği zincir üstü kulüp.
              </p>
              <p className="text-base text-gray-600 leading-relaxed">
                An on-chain club exclusive to real product owners.
              </p>
            </div>

            <div className="space-y-4">
              {!isConnected ? (
                <>
                  <WalletConnect />
                  <div className="space-y-2">
                    <p className="text-sm text-gray-600">
                      RISE Testnet üzerinde çalışan WeClub dApp'i
                    </p>
                    <button 
                      onClick={() => {
                        const script = document.createElement('script');
                        script.src = '/add-rise-network.js';
                        document.head.appendChild(script);
                      }}
                      className="text-xs text-blue-600 hover:text-blue-800 underline"
                    >
                      RISE Testnet'i MetaMask'a ekle
                    </button>
                  </div>
                </>
              ) : (
                <>
                  <div className="flex gap-4">
                    <Link href="/passport">
                      <Button className="rounded-full px-6 py-4 font-medium bg-weclub-yawz-green hover:bg-weclub-yawz-green/90">
                        NFT Pasaport
                      </Button>
                    </Link>
                    <Link href="/dao">
                      <Button className="rounded-full px-6 py-4 font-medium" variant="outline">
                        DAO Yönetimi
                      </Button>
                    </Link>
                  </div>
                  <p className="text-sm text-gray-600">
                    Cüzdan bağlı ✓ ETHIstanbul demo versiyonu
                  </p>
                </>
              )}
            </div>
          </div>

          {/* Right Block - Digital Passport Preview */}
          <div className="flex justify-center">
            <div className="weclub-passport-card w-80 h-96">
              <div className="text-center space-y-4">
                <div className="w-16 h-16 mx-auto rounded-full bg-weclub-yawz-green flex items-center justify-center">
                  <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                </div>
                <h3 className="font-mono text-lg font-bold text-weclub-yawz-green">DIGITAL PASSPORT</h3>
                <p className="text-sm text-gray-600">Fiziksel ürününüzü dijital kimliğinizle eşleştirin</p>
                <div className="space-y-2 pt-4">
                  <div className="weclub-visa-status ok">
                    <span>Visa: APPROVED</span>
                  </div>
                  <div className="text-xs text-gray-500 font-mono">PASSPORT NO: YWZ-TR-00001</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* How It Works Section */}
      <div className="bg-white py-16">
        <div className="max-w-[1280px] mx-auto px-6 md:px-12">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-weclub-power-black mb-4">Pasaport → Vize → Topluluk</h2>
            <p className="text-lg text-gray-600">3 adımda WeClub üyesi olun</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <Card className="text-center p-6">
              <CardContent className="space-y-4">
                <div className="w-12 h-12 mx-auto bg-weclub-yawz-green rounded-full flex items-center justify-center text-white font-bold">
                  1
                </div>
                <h3 className="font-semibold text-lg">Ürün Satın Al</h3>
                <p className="text-gray-600">YAWZ ürününüzle birlikte QR kart ve geçici şifre alın</p>
              </CardContent>
            </Card>

            <Card className="text-center p-6">
              <CardContent className="space-y-4">
                <div className="w-12 h-12 mx-auto bg-weclub-yawz-green rounded-full flex items-center justify-center text-white font-bold">
                  2
                </div>
                <h3 className="font-semibold text-lg">Vize Başvurusu</h3>
                <p className="text-gray-600">QR kod ve şifre ile vizenizi aktive edin</p>
              </CardContent>
            </Card>

            <Card className="text-center p-6">
              <CardContent className="space-y-4">
                <div className="w-12 h-12 mx-auto bg-weclub-yawz-green rounded-full flex items-center justify-center text-white font-bold">
                  3
                </div>
                <h3 className="font-semibold text-lg">Topluluğa Katıl</h3>
                <p className="text-gray-600">DAO oylaması, etkinlikler ve özel ayrıcalıklara erişin</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      {/* Membership Tiers */}
      <div className="bg-weclub-visa-white py-16">
        <div className="max-w-[1280px] mx-auto px-6 md:px-12">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-weclub-power-black mb-4">Üyelik Seviyeleri</h2>
            <p className="text-lg text-gray-600">Katkınıza göre seviye atlayın</p>
          </div>

          <div className="grid md:grid-cols-6 gap-4">
            {[
              { level: 1, name: "Giriş", desc: "Ziyaretçi", color: "bg-gray-100" },
              { level: 2, name: "Katılımcı", desc: "1 ürün sahibi", color: "bg-blue-100" },
              { level: 3, name: "Rol Bazlı", desc: "Gezgin/Tasarımcı", color: "bg-green-100" },
              { level: 4, name: "Uzman", desc: "Kaşif/Modalist", color: "bg-yellow-100" },
              { level: 5, name: "Elçi", desc: "Temsil gücü", color: "bg-purple-100" },
              { level: 6, name: "Büyük Elçi", desc: "Marka elçisi", color: "bg-red-100" },
            ].map((tier) => (
              <Card key={tier.level} className={`${tier.color} border-0`}>
                <CardContent className="p-4 text-center">
                  <div className="text-2xl font-bold text-weclub-yawz-green mb-2">L{tier.level}</div>
                  <h4 className="font-semibold text-sm mb-1">{tier.name}</h4>
                  <p className="text-xs text-gray-600">{tier.desc}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="bg-white py-16">
        <div className="max-w-[1280px] mx-auto px-6 md:px-12">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <h2 className="text-3xl font-bold text-weclub-power-black">Tek Tıkla Sahiplik, Tek Kimlikle DAO</h2>
              <div className="space-y-4">
                <div className="flex items-start space-x-3">
                  <div className="w-6 h-6 bg-weclub-yawz-green rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                    <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                      <path
                        fillRule="evenodd"
                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </div>
                  <div>
                    <h4 className="font-semibold">Gömülü Cüzdan</h4>
                    <p className="text-gray-600">Web3 bilgisi olmadan tüm deneyimi yaşayın</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-6 h-6 bg-weclub-yawz-green rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                    <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                      <path
                        fillRule="evenodd"
                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </div>
                  <div>
                    <h4 className="font-semibold">Şeffaf Yönetişim</h4>
                    <p className="text-gray-600">Tüm kararlar on-chain, oylar şeffaf</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-6 h-6 bg-weclub-yawz-green rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                    <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                      <path
                        fillRule="evenodd"
                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </div>
                  <div>
                    <h4 className="font-semibold">Sahtecilik Önleme</h4>
                    <p className="text-gray-600">Kontrollü transfer, on-chain kanıt</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="flex justify-center">
              <div className="bg-weclub-yawz-green rounded-2xl p-8 text-white">
                <div className="text-center space-y-4">
                  <div className="w-16 h-16 mx-auto bg-white/20 rounded-full flex items-center justify-center">
                    <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                      />
                    </svg>
                  </div>
                  <h3 className="font-mono text-lg font-bold">EMBEDDED WALLET</h3>
                  <p className="text-sm opacity-90">Güvenli, basit, otomatik</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ETHIstanbul Banner */}
      <div className="bg-gradient-to-r from-purple-600 to-blue-600 py-8">
        <div className="max-w-[1280px] mx-auto px-6 md:px-12 text-center">
          <div className="space-y-3">
            <h3 className="text-xl font-bold text-white">🚀 ETHIstanbul 2024 Demo</h3>
            <p className="text-white/90">RISE Testnet üzerinde NFT + DAO entegrasyonu</p>
            <div className="flex justify-center gap-4 flex-wrap">
              <Badge className="bg-white/20 text-white border-white/30">Chain ID: 11155931</Badge>
              <Badge className="bg-white/20 text-white border-white/30">100K+ TPS</Badge>
              <Badge className="bg-white/20 text-white border-white/30">EVM Compatible</Badge>
            </div>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-weclub-power-black py-16">
        <div className="max-w-[1280px] mx-auto px-6 md:px-12 text-center">
          <div className="space-y-6">
            <h2 className="text-3xl font-bold text-white">Bu bir ürün değil; bir giriş izni</h2>
            <p className="text-lg text-gray-300">Pasaportun, vizen ve hikâyen burada</p>
            {!isConnected && (
              <div className="flex justify-center">
                <WalletConnect />
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
