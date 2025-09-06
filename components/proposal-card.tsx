'use client'

import { useState } from 'react'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { useAccount, useWriteContract, useReadContract } from 'wagmi'
import { WECLUB_DAO_ABI, PASSPORT_NFT_ABI } from '@/lib/contracts'
import { formatDistanceToNow } from 'date-fns'
import { tr } from 'date-fns/locale'
import { CheckCircle2, Clock, Users, Vote } from 'lucide-react'

interface ProposalCardProps {
  proposalId: number
  contractAddress: string
  onVoteSuccess?: () => void
  passportNftAddress?: string
}

export function ProposalCard({ proposalId, contractAddress, onVoteSuccess, passportNftAddress }: ProposalCardProps) {
  const { address } = useAccount()
  
  // Proposal detaylarını al
  const { data: proposal, refetch } = useReadContract({
    address: contractAddress as `0x${string}`,
    abi: WECLUB_DAO_ABI,
    functionName: 'getProposal',
    args: [BigInt(proposalId)],
  })

  // Kullanıcı oy kullandı mı kontrol et
  const { data: hasVoted } = useReadContract({
    address: contractAddress as `0x${string}`,
    abi: WECLUB_DAO_ABI,
    functionName: 'hasVoted',
    args: address ? [BigInt(proposalId), address] : undefined,
  })

  // NFT sahiplik kontrolü
  const { data: nftBalance } = useReadContract({
    address: passportNftAddress as `0x${string}`,
    abi: PASSPORT_NFT_ABI,
    functionName: 'balanceOf',
    args: address ? [address] : undefined,
  })

  const hasNFT = nftBalance && Number(nftBalance) > 0

  // Oy kullanma fonksiyonu
  const { writeContract, isLoading: isVoting } = useWriteContract()
  const [isVotingState, setIsVotingState] = useState(false)

  const handleVote = async () => {
    try {
      setIsVotingState(true)
      await writeContract({
        address: contractAddress as `0x${string}`,
        abi: WECLUB_DAO_ABI,
        functionName: 'vote',
        args: [BigInt(proposalId)],
      })
      
      // Başarılı olursa verileri yenile
      setTimeout(() => {
        refetch()
        onVoteSuccess?.()
        setIsVotingState(false)
      }, 2000)
    } catch (error) {
      console.error('Oy kullanma hatası:', error)
      setIsVotingState(false)
    }
  }

  if (!proposal) {
    return (
      <Card className="animate-pulse">
        <CardHeader>
          <div className="h-4 bg-gray-200 rounded w-3/4"></div>
          <div className="h-3 bg-gray-200 rounded w-1/2 mt-2"></div>
        </CardHeader>
      </Card>
    )
  }

  const [id, title, description, voteCount, createdAt, proposer, executed] = proposal

  return (
    <Card className={executed ? 'opacity-75' : ''}>
      <CardHeader>
        <div className="flex justify-between items-start">
          <div className="flex-1">
            <CardTitle className="text-lg">{title}</CardTitle>
            <CardDescription className="mt-2">
              {description}
            </CardDescription>
          </div>
          <Badge variant={executed ? 'secondary' : 'default'}>
            {executed ? (
              <>
                <CheckCircle2 className="w-3 h-3 mr-1" />
                Tamamlandı
              </>
            ) : (
              <>
                <Clock className="w-3 h-3 mr-1" />
                Aktif
              </>
            )}
          </Badge>
        </div>
      </CardHeader>
      
      <CardContent>
        <div className="space-y-2 text-sm text-muted-foreground">
          <div className="flex items-center gap-2">
            <Users className="w-4 h-4" />
            <span>{voteCount.toString()} oy</span>
          </div>
          <div>
            Öneren: {proposer.slice(0, 6)}...{proposer.slice(-4)}
          </div>
          <div>
            {formatDistanceToNow(new Date(Number(createdAt) * 1000), { 
              addSuffix: true,
              locale: tr 
            })}
          </div>
        </div>
      </CardContent>
      
             <CardFooter>
               {!address ? (
                 <p className="text-sm text-muted-foreground">
                   Oy kullanmak için cüzdanınızı bağlayın
                 </p>
               ) : !hasNFT ? (
                 <div className="w-full">
                   <Badge variant="outline" className="text-orange-600 mb-2">
                     🔒 NFT Gerekli
                   </Badge>
                   <p className="text-xs text-muted-foreground">
                     Oy kullanmak için YAWZ Passport NFT sahibi olmanız gerekiyor.
                   </p>
                 </div>
               ) : hasVoted ? (
                 <div className="w-full">
                   <Badge variant="outline" className="text-green-600 mb-2">
                     ✓ Oy kullandınız
                   </Badge>
                   <p className="text-xs text-muted-foreground">
                     Teşekkürler! Oyunuz kaydedildi.
                   </p>
                 </div>
               ) : executed ? (
                 <Badge variant="secondary">
                   Oylama sona erdi
                 </Badge>
               ) : (
                 <div className="w-full space-y-2">
                   <Button
                     onClick={handleVote}
                     disabled={isVoting || isVotingState}
                     className="w-full"
                   >
                     <Vote className="w-4 h-4 mr-1" />
                     {isVoting || isVotingState ? 'Oy Kullanılıyor...' : 'Oy Ver'}
                   </Button>
                   {isVotingState && (
                     <p className="text-xs text-green-600 text-center">
                       Oyunuz gönderiliyor...
                     </p>
                   )}
                 </div>
               )}
             </CardFooter>
    </Card>
  )
}
