'use client'

import { useState, useEffect } from 'react'
import { NFTCard } from '@/components/nft-card'
import { WalletConnect } from '@/components/wallet-connect'
import { useAccount, useSwitchChain, useReadContract, useWriteContract } from 'wagmi'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import { PASSPORT_NFT_ABI } from '@/lib/contracts'
import { useAuth } from '@/components/auth-provider'
import { Plus, Crown, Shield, Star } from 'lucide-react'

// Bu adresler deploy sonrası güncellenecek
const PASSPORT_NFT_ADDRESS = process.env.NEXT_PUBLIC_PASSPORT_NFT_ADDRESS || '0x0000000000000000000000000000000000000000'

export default function YawzPassportPage() {
  const { address, isConnected, chainId } = useAccount()
  const { switchChain } = useSwitchChain()
  const { user } = useAuth()
  const [mounted, setMounted] = useState(false)
  const [isMinting, setIsMinting] = useState(false)
  const [mintAddress, setMintAddress] = useState('')
  
  // Hydration hatasını önlemek için
  useEffect(() => {
    setMounted(true)
  }, [])
  
  // RISE Testnet Chain ID: 11155931
  const isCorrectNetwork = chainId === 11155931

  // Kullanıcının NFT'lerini al
  const { data: nftBalance, refetch: refetchBalance } = useReadContract({
    address: PASSPORT_NFT_ADDRESS as `0x${string}`,
    abi: PASSPORT_NFT_ABI,
    functionName: 'balanceOf',
    args: address ? [address] : undefined,
  })

  // Kullanıcının token ID'lerini al
  const { data: tokenIds, refetch: refetchTokenIds } = useReadContract({
    address: PASSPORT_NFT_ADDRESS as `0x${string}`,
    abi: PASSPORT_NFT_ABI,
    functionName: 'tokensOfOwner',
    args: address ? [address] : undefined,
  })

  // NFT detaylarını al (ilk token için)
  const { data: tokenTier } = useReadContract({
    address: PASSPORT_NFT_ADDRESS as `0x${string}`,
    abi: PASSPORT_NFT_ABI,
    functionName: 'getTier',
    args: tokenIds && tokenIds.length > 0 ? [tokenIds[0]] : undefined,
  })

  // NFT oluşturma
  const { writeContract: mintNFT, status: mintStatus } = useWriteContract()
  const isMintingNFT = mintStatus === 'pending'

  const handleMintNFT = async () => {
    if (!mintAddress || !isCorrectNetwork) {
      alert('Lütfen geçerli bir adres girin ve RISE Testnet\'e geçin')
      return
    }

    if (PASSPORT_NFT_ADDRESS === '0x0000000000000000000000000000000000000000') {
      alert('NFT kontrat adresi henüz ayarlanmamış. Lütfen .env dosyasında NEXT_PUBLIC_PASSPORT_NFT_ADDRESS değişkenini ayarlayın.')
      return
    }

    try {
      setIsMinting(true)
      console.log('NFT mintleme başlatılıyor...', {
        address: PASSPORT_NFT_ADDRESS,
        to: mintAddress,
        uri: 'https://yawz.com/metadata/passport.json',
        tier: 'Gold'
      })
      
      await mintNFT({
        address: PASSPORT_NFT_ADDRESS as `0x${string}`,
        abi: PASSPORT_NFT_ABI,
        functionName: 'mint',
        args: [mintAddress as `0x${string}`, 'https://yawz.com/metadata/passport.json', 'Gold'],
      })
      
      // Başarılı mintleme sonrası verileri yenile
      setTimeout(() => {
        refetchBalance()
        refetchTokenIds()
        setIsMinting(false)
        setMintAddress('')
        console.log('NFT başarıyla mintlendi!')
      }, 3000)
    } catch (error) {
      console.error('NFT oluşturma hatası:', error)
      alert('NFT oluşturma hatası: ' + (error as Error).message)
      setIsMinting(false)
    }
  }

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
          <div className="space-y-6">
            {/* NFT Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-gray-600">NFT Sayınız</p>
                      <p className="text-2xl font-bold">{nftBalance?.toString() || '0'}</p>
                    </div>
                    <Crown className="w-8 h-8 text-yellow-500" />
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-gray-600">Tier</p>
                      <p className="text-2xl font-bold">{tokenTier || 'Gold'}</p>
                    </div>
                    <Star className="w-8 h-8 text-yellow-500" />
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-gray-600">Durum</p>
                      <p className="text-2xl font-bold">
                        {nftBalance && Number(nftBalance) > 0 ? 'Aktif' : 'Pasif'}
                      </p>
                    </div>
                    <Shield className="w-8 h-8 text-green-500" />
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* NFT Display */}
            {nftBalance && Number(nftBalance) > 0 ? (
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-semibold">Sahip Olduğunuz NFT'ler ({nftBalance.toString()})</h3>
                  <Button 
                    onClick={() => {
                      refetchBalance()
                      refetchTokenIds()
                    }}
                    variant="outline"
                    size="sm"
                  >
                    Yenile
                  </Button>
                </div>
                
                <div className="grid gap-6 md:grid-cols-2">
                  {tokenIds && tokenIds.length > 0 ? (
                    tokenIds.map((tokenId, index) => (
                      <Card key={tokenId.toString()} className="overflow-hidden">
                        <CardHeader className="bg-gradient-to-r from-yellow-400 to-yellow-600 text-white">
                          <CardTitle className="flex items-center gap-2">
                            <Crown className="w-6 h-6" />
                            YAWZ Passport NFT #{tokenId.toString().padStart(3, '0')}
                          </CardTitle>
                        </CardHeader>
                        <CardContent className="p-6">
                          <div className="space-y-4">
                            <div className="aspect-square bg-gray-100 rounded-lg flex items-center justify-center">
                              <div className="text-center">
                                <div className="w-24 h-24 bg-yellow-500 rounded-full mx-auto mb-4 flex items-center justify-center">
                                  <Crown className="w-12 h-12 text-white" />
                                </div>
                                <p className="text-sm text-gray-600">YAWZ Passport</p>
                              </div>
                            </div>
                            
                            <div className="space-y-2">
                              <div className="flex justify-between">
                                <span className="text-sm text-gray-600">Tier:</span>
                                <Badge className="bg-yellow-100 text-yellow-800">{tokenTier || 'Gold'}</Badge>
                              </div>
                              <div className="flex justify-between">
                                <span className="text-sm text-gray-600">Token ID:</span>
                                <span className="text-sm font-mono">
                                  #{tokenId.toString().padStart(3, '0')}
                                </span>
                              </div>
                              <div className="flex justify-between">
                                <span className="text-sm text-gray-600">Sahip:</span>
                                <span className="text-sm font-mono">
                                  {address?.slice(0, 6)}...{address?.slice(-4)}
                                </span>
                              </div>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))
                  ) : (
                    <Card className="overflow-hidden">
                      <CardHeader className="bg-gradient-to-r from-yellow-400 to-yellow-600 text-white">
                        <CardTitle className="flex items-center gap-2">
                          <Crown className="w-6 h-6" />
                          YAWZ Passport NFT
                        </CardTitle>
                      </CardHeader>
                      <CardContent className="p-6">
                        <div className="space-y-4">
                          <div className="aspect-square bg-gray-100 rounded-lg flex items-center justify-center">
                            <div className="text-center">
                              <div className="w-24 h-24 bg-yellow-500 rounded-full mx-auto mb-4 flex items-center justify-center">
                                <Crown className="w-12 h-12 text-white" />
                              </div>
                              <p className="text-sm text-gray-600">YAWZ Passport</p>
                            </div>
                          </div>
                          
                          <div className="space-y-2">
                            <div className="flex justify-between">
                              <span className="text-sm text-gray-600">Tier:</span>
                              <Badge className="bg-yellow-100 text-yellow-800">{tokenTier || 'Gold'}</Badge>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-sm text-gray-600">Token ID:</span>
                              <span className="text-sm font-mono">#001</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-sm text-gray-600">Sahip:</span>
                              <span className="text-sm font-mono">
                                {address?.slice(0, 6)}...{address?.slice(-4)}
                              </span>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  )}
                </div>

                {/* NFT Details */}
                <Card>
                  <CardHeader>
                    <CardTitle>NFT Detayları</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <h4 className="font-semibold mb-2">Özellikler</h4>
                      <ul className="space-y-1 text-sm text-gray-600">
                        <li>• DAO oylama hakkı</li>
                        <li>• Özel etkinlik erişimi</li>
                        <li>• YAWZ topluluk ayrıcalıkları</li>
                        <li>• RISE Testnet üzerinde</li>
                      </ul>
                    </div>
                    
                    <div>
                      <h4 className="font-semibold mb-2">Metadata</h4>
                      <div className="bg-gray-50 p-3 rounded text-sm font-mono">
                        <p>Name: YAWZ Passport</p>
                        <p>Description: Digital passport for YAWZ ecosystem</p>
                        <p>Image: https://yawz.com/metadata/passport.json</p>
                        <p>Attributes: [{'{'}"trait_type": "Tier", "value": "Gold"{'}'}]</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            ) : (
              <Card>
                <CardContent className="p-12 text-center">
                  <Crown className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-lg font-semibold mb-2">NFT Bulunamadı</h3>
                  <p className="text-gray-600 mb-6">
                    Henüz YAWZ Passport NFT'niz yok. Admin hesabıyla NFT oluşturabilirsiniz.
                  </p>
                </CardContent>
              </Card>
            )}

            {/* Admin Panel */}
            {user && user.role === 'admin' && (
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Plus className="w-5 h-5" />
                    Admin Panel - NFT Oluştur
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                    <h4 className="font-semibold text-blue-900 mb-2">Kontrat Bilgileri</h4>
                    <div className="text-sm text-blue-800 space-y-1">
                      <p>NFT Kontrat Adresi: <span className="font-mono">{PASSPORT_NFT_ADDRESS}</span></p>
                      <p>Network: RISE Testnet (Chain ID: 11155931)</p>
                      <p>Mevcut NFT Sayısı: {nftBalance?.toString() || '0'}</p>
                    </div>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium mb-2">Alıcı Adresi</label>
                    <Input
                      value={mintAddress}
                      onChange={(e) => setMintAddress(e.target.value)}
                      placeholder="0x..."
                      className="font-mono"
                    />
                  </div>
                  
                  <Button
                    onClick={handleMintNFT}
                    disabled={isMinting || isMintingNFT || !mintAddress || PASSPORT_NFT_ADDRESS === '0x0000000000000000000000000000000000000000'}
                    className="w-full"
                  >
                    {isMinting || isMintingNFT ? 'NFT Oluşturuluyor...' : 'YAWZ Passport NFT Oluştur'}
                  </Button>
                  
                  <p className="text-xs text-gray-500 text-center">
                    Admin hesabıyla YAWZ Passport NFT oluşturabilirsiniz
                  </p>
                </CardContent>
              </Card>
            )}
          </div>
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