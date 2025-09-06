'use client'

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { useAccount, useReadContract } from 'wagmi'
import { PASSPORT_NFT_ABI } from '@/lib/contracts'
import { useState, useEffect } from 'react'

interface NFTCardProps {
  contractAddress: string
}

export function NFTCard({ contractAddress }: NFTCardProps) {
  const { address } = useAccount()
  const [tokenIds, setTokenIds] = useState<bigint[]>([])
  
  // Kullanıcının token'larını al
  const { data: userTokens } = useReadContract({
    address: contractAddress as `0x${string}`,
    abi: PASSPORT_NFT_ABI,
    functionName: 'tokensOfOwner',
    args: address ? [address] : undefined,
  })

  useEffect(() => {
    if (userTokens) {
      setTokenIds(userTokens as bigint[])
    }
  }, [userTokens])

  if (!address) {
    return (
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle>YAWZ Passport</CardTitle>
          <CardDescription>Cüzdanınızı bağlayın</CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground">
            Passport NFT'nizi görüntülemek için cüzdanınızı bağlamanız gerekiyor.
          </p>
        </CardContent>
      </Card>
    )
  }

  if (tokenIds.length === 0) {
    return (
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle>YAWZ Passport</CardTitle>
          <CardDescription>NFT Bulunamadı</CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground">
            Henüz bir YAWZ Passport NFT'niz bulunmuyor.
          </p>
        </CardContent>
      </Card>
    )
  }

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      {tokenIds.map((tokenId) => (
        <TokenCard 
          key={tokenId.toString()} 
          tokenId={tokenId} 
          contractAddress={contractAddress}
        />
      ))}
    </div>
  )
}

function TokenCard({ tokenId, contractAddress }: { tokenId: bigint; contractAddress: string }) {
  // Token URI'yi al
  const { data: tokenURI } = useReadContract({
    address: contractAddress as `0x${string}`,
    abi: PASSPORT_NFT_ABI,
    functionName: 'tokenURI',
    args: [tokenId],
  })

  // Tier seviyesini al
  const { data: tier } = useReadContract({
    address: contractAddress as `0x${string}`,
    abi: PASSPORT_NFT_ABI,
    functionName: 'getTier',
    args: [tokenId],
  })

  const getTierColor = (tierLevel: string) => {
    switch (tierLevel?.toLowerCase()) {
      case 'platinum': return 'bg-gray-200 text-gray-800'
      case 'gold': return 'bg-yellow-200 text-yellow-800'
      case 'silver': return 'bg-gray-100 text-gray-700'
      default: return 'bg-blue-100 text-blue-800'
    }
  }

  return (
    <Card className="overflow-hidden">
      <div className="aspect-square bg-gradient-to-br from-gray-900 to-gray-700 relative">
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-white text-center">
            <h3 className="text-2xl font-bold mb-2">YAWZ</h3>
            <p className="text-4xl font-mono">#{tokenId.toString()}</p>
          </div>
        </div>
      </div>
      <CardHeader>
        <div className="flex justify-between items-start">
          <CardTitle className="text-lg">Passport #{tokenId.toString()}</CardTitle>
          {tier && (
            <Badge className={getTierColor(tier as string)}>
              {tier as string}
            </Badge>
          )}
        </div>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-muted-foreground">
          RISE Testnet üzerinde mint edilmiş
        </p>
      </CardContent>
    </Card>
  )
}
