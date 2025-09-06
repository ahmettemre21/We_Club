'use client'

import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { ProposalCard } from '@/components/proposal-card'
import { WalletConnect } from '@/components/wallet-connect'
import { useAccount, useReadContract, useWriteContract, useSwitchChain } from 'wagmi'
import { WECLUB_DAO_ABI } from '@/lib/contracts'
import { PASSPORT_NFT_ABI } from '@/lib/contracts'
import { Plus, Users, Vote, BarChart3, Shield } from 'lucide-react'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Badge } from '@/components/ui/badge'
import { useAuth } from '@/components/auth-provider'

// Demo kontrat adresi - gerçek deploy sonrası güncellenecek
const DAO_ADDRESS = process.env.NEXT_PUBLIC_DAO_ADDRESS || '0x1234567890123456789012345678901234567890'
const PASSPORT_NFT_ADDRESS = process.env.NEXT_PUBLIC_PASSPORT_NFT_ADDRESS || '0x0000000000000000000000000000000000000000'

export default function DAOPage() {
  const { address, isConnected, chainId } = useAccount()
  const { switchChain } = useSwitchChain()
  const { user } = useAuth()
  const [isCreatingProposal, setIsCreatingProposal] = useState(false)
  const [newProposal, setNewProposal] = useState({ title: '', description: '' })
  const [mounted, setMounted] = useState(false)
  
  // Hydration hatasını önlemek için
  useEffect(() => {
    setMounted(true)
  }, [])
  
  // RISE Testnet Chain ID: 11155931
  const isCorrectNetwork = chainId === 11155931
  
  // Proposal sayısını al
  const { data: proposalCount, refetch: refetchCount } = useReadContract({
    address: DAO_ADDRESS as `0x${string}`,
    abi: WECLUB_DAO_ABI,
    functionName: 'proposalCount',
  })

  // Kullanıcının oylama gücünü al - auth'dan veya kontrattan
  const { data: contractVotingPower } = useReadContract({
    address: DAO_ADDRESS as `0x${string}`,
    abi: WECLUB_DAO_ABI,
    functionName: 'memberVotingPower',
    args: address ? [address] : undefined,
  })
  
  // Auth'dan gelen voting power'ı kullan, yoksa kontrattan al
  const votingPower = user?.votingPower || contractVotingPower || 0

  // NFT sahiplik kontrolü
  const { data: nftBalance } = useReadContract({
    address: PASSPORT_NFT_ADDRESS as `0x${string}`,
    abi: PASSPORT_NFT_ABI,
    functionName: 'balanceOf',
    args: address ? [address] : undefined,
  })

  const hasNFT = nftBalance && Number(nftBalance) > 0

  // Tüm proposalları al - 5 saniyede bir yenile
  const { data: allProposals, refetch: refetchProposals } = useReadContract({
    address: DAO_ADDRESS as `0x${string}`,
    abi: WECLUB_DAO_ABI,
    functionName: 'getAllProposals',
    query: {
      refetchInterval: 5000, // 5 saniyede bir yenile
    }
  })

  // Proposalları işle - getAllProposals tuple döndürüyor
  const processedProposals = allProposals ? allProposals[0].map((id, index) => ({
    id: Number(id),
    title: allProposals[1][index],
    voteCount: Number(allProposals[2][index]),
    executed: allProposals[3][index]
  })) : []

  // Debug için
  console.log('allProposals:', allProposals)
  console.log('processedProposals:', processedProposals)

  // Test için mock data - gerçek kontrat çalışana kadar
  const mockProposals = [
    {
      id: 0,
      title: "Yeni koleksiyon teması 'Vintage' olsun mu?",
      voteCount: 3,
      executed: false
    },
    {
      id: 1,
      title: "Gelecek sezon hoodie gelsin mi?",
      voteCount: 5,
      executed: false
    }
  ]

  // Eğer kontrat çalışmıyorsa mock data kullan
  // Debug için
  console.log('processedProposals.length:', processedProposals.length)
  console.log('allProposals:', allProposals)
  
  // Mock data'yı her zaman göster (demo için)
  const displayProposals = processedProposals.length > 0 ? processedProposals : mockProposals

  // Proposal oluşturma
  const { writeContract: createProposal, status } = useWriteContract()
  const isCreating = status === 'pending'

  const handleCreateProposal = async () => {
    if (!newProposal.title || !newProposal.description) {
      alert('Lütfen tüm alanları doldurun')
      return
    }

    if (!isCorrectNetwork) {
      alert('Lütfen önce RISE Testnet\'e geçin')
      return
    }

    try {
      await createProposal({
        address: DAO_ADDRESS as `0x${string}`,
        abi: WECLUB_DAO_ABI,
        functionName: 'createProposal',
        args: [newProposal.title, newProposal.description],
      })
      
      // Başarılı olursa
      setIsCreatingProposal(false)
      setNewProposal({ title: '', description: '' })
      
      // Verileri yenile
      setTimeout(() => {
        refetchCount()
        refetchProposals()
      }, 2000)
    } catch (error) {
      console.error('Proposal oluşturma hatası:', error)
    }
  }

  // Artık processedProposals kullanıyoruz

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
            <h1 className="text-2xl md:text-3xl font-bold">WeClub DAO</h1>
            <p className="text-gray-600 mt-2">RISE Testnet üzerinde topluluk yönetimi</p>
          </div>
          <WalletConnect />
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Toplam Proposal</p>
                  <p className="text-2xl font-bold">{proposalCount?.toString() || '0'}</p>
                </div>
                <Vote className="w-8 h-8 text-gray-400" />
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Oy Gücünüz</p>
                  <p className="text-2xl font-bold">{votingPower?.toString() || '0'}</p>
                </div>
                <Shield className="w-8 h-8 text-gray-400" />
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Aktif Oylamalar</p>
                  <p className="text-2xl font-bold">
                    {displayProposals.length}
                  </p>
                </div>
                <BarChart3 className="w-8 h-8 text-gray-400" />
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Üye Sayısı</p>
                  <p className="text-2xl font-bold">1</p>
                </div>
                <Users className="w-8 h-8 text-gray-400" />
              </div>
            </CardContent>
          </Card>
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

        {/* Auth Warning */}
        {!user && (
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
              <span className="text-blue-800 font-medium">
                Demo için giriş yapın: admin@weclub.com / demo123
              </span>
            </div>
          </div>
        )}

        {/* NFT Warning */}
        {isConnected && !hasNFT && (
          <div className="bg-orange-50 border border-orange-200 rounded-lg p-4 mb-6">
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
              <span className="text-orange-800 font-medium">
                YAWZ Passport NFT'niz yok. Oy kullanmak için NFT sahibi olmanız gerekiyor.
              </span>
            </div>
          </div>
        )}

        {/* Main Content */}
        {isConnected ? (
          <Tabs defaultValue="proposals" className="space-y-6">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="proposals">Proposallar</TabsTrigger>
              <TabsTrigger value="create">Yeni Proposal</TabsTrigger>
            </TabsList>
            
             <TabsContent value="proposals" className="space-y-4">
               {displayProposals.length > 0 ? (
                 <>
                   <div className="flex items-center justify-between">
                     <h3 className="text-lg font-semibold">
                       Aktif Proposallar ({displayProposals.length})
                     </h3>
                     <div className="text-sm text-gray-500">
                       Her 5 saniyede bir güncellenir
                     </div>
                   </div>
                   <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                     {displayProposals.reverse().map((proposal) => (
                       <ProposalCard 
                         key={proposal.id} 
                         proposalId={proposal.id} 
                         contractAddress={DAO_ADDRESS}
                         passportNftAddress={PASSPORT_NFT_ADDRESS}
                         onVoteSuccess={() => refetchProposals()}
                       />
                     ))}
                   </div>
                 </>
               ) : (
                 <Card>
                   <CardContent className="p-12 text-center">
                     <Vote className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                     <h3 className="text-lg font-semibold mb-2">Henüz proposal yok</h3>
                     <p className="text-gray-600 mb-4">
                       İlk proposal'ı oluşturan siz olun!
                     </p>
                     <Button onClick={() => setIsCreatingProposal(true)}>
                       <Plus className="w-4 h-4 mr-2" />
                       Proposal Oluştur
                     </Button>
                   </CardContent>
                 </Card>
               )}
             </TabsContent>
            
            <TabsContent value="create">
              <Card>
                <CardHeader>
                  <CardTitle>Yeni Proposal Oluştur</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {user && (hasNFT || Number(votingPower || 0) > 0) ? (
                    <>
                      <div>
                        <label className="block text-sm font-medium mb-2">Başlık</label>
                        <Input
                          value={newProposal.title}
                          onChange={(e) => setNewProposal({ ...newProposal, title: e.target.value })}
                          placeholder="Proposal başlığı..."
                          maxLength={100}
                        />
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium mb-2">Açıklama</label>
                        <Textarea
                          value={newProposal.description}
                          onChange={(e) => setNewProposal({ ...newProposal, description: e.target.value })}
                          placeholder="Detaylı açıklama..."
                          rows={6}
                          maxLength={500}
                        />
                      </div>
                      
                       <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                         <h4 className="font-semibold text-blue-900 mb-2">Oylama Kuralları</h4>
                         <ul className="text-sm text-blue-800 space-y-1">
                           <li>• Her üye sadece bir kez oy kullanabilir</li>
                           <li>• Oylar on-chain olarak kaydedilir</li>
                           <li>• NFT Sahipliği: {hasNFT ? '✅ Var' : '❌ Yok'}</li>
                           <li>• Oylama gücünüz: {votingPower?.toString()}</li>
                           <li>• Proposal'lar gerçek zamanlı güncellenir</li>
                         </ul>
                       </div>
                      
                      <Button
                        onClick={handleCreateProposal}
                        disabled={isCreating || !newProposal.title || !newProposal.description}
                        className="w-full"
                      >
                        {isCreating ? 'Oluşturuluyor...' : 'Proposal Oluştur'}
                      </Button>
                    </>
                  ) : (
                    <div className="text-center py-8">
                      <Shield className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                      <h3 className="text-lg font-semibold mb-2">Yetkiniz Yok</h3>
                      <p className="text-gray-600 mb-2">
                        Proposal oluşturmak için YAWZ Passport NFT sahibi olmanız gerekiyor.
                      </p>
                      <p className="text-sm text-gray-500">
                        NFT Sahipliği: {hasNFT ? '✅ Var' : '❌ Yok'} | 
                        Oylama Gücü: {votingPower?.toString() || '0'}
                      </p>
                    </div>
                  )}
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        ) : (
          <Card>
            <CardContent className="p-12 text-center">
              <h2 className="text-xl font-semibold mb-4">Cüzdanınızı Bağlayın</h2>
              <p className="text-gray-600 mb-6">
                DAO'ya katılmak ve oy kullanmak için cüzdanınızı bağlamanız gerekiyor.
              </p>
              <div className="flex justify-center">
                <WalletConnect />
              </div>
            </CardContent>
          </Card>
        )}

        {/* Create Proposal Modal */}
        {isCreatingProposal && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
            <Card className="w-full max-w-2xl">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle>Yeni Proposal Oluştur</CardTitle>
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    onClick={() => setIsCreatingProposal(false)}
                  >
                    ✕
                  </Button>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-2">Başlık</label>
                  <Input
                    value={newProposal.title}
                    onChange={(e) => setNewProposal({ ...newProposal, title: e.target.value })}
                    placeholder="Proposal başlığı..."
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium mb-2">Açıklama</label>
                  <Textarea
                    value={newProposal.description}
                    onChange={(e) => setNewProposal({ ...newProposal, description: e.target.value })}
                    placeholder="Detaylı açıklama..."
                    rows={6}
                  />
                </div>
                
                <div className="flex justify-end space-x-2">
                  <Button 
                    variant="outline" 
                    onClick={() => setIsCreatingProposal(false)}
                  >
                    İptal
                  </Button>
                  <Button
                    onClick={handleCreateProposal}
                    disabled={isCreating}
                  >
                    {isCreating ? 'Oluşturuluyor...' : 'Oluştur'}
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    </div>
  )
}
