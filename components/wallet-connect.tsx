'use client'

import { useAccount, useConnect, useDisconnect } from 'wagmi'
import { Button } from '@/components/ui/button'
import { useState, useEffect } from 'react'

export function WalletConnect() {
  const { address, isConnected } = useAccount()
  const { connect, connectors, error, status } = useConnect()
  const { disconnect } = useDisconnect()
  const [showAddress, setShowAddress] = useState(false)
  const [mounted, setMounted] = useState(false)
  const isPending = status === 'pending'

  // Hydration hatasını önlemek için
  useEffect(() => {
    setMounted(true)
  }, [])

  // Hydration hatasını önlemek için mounted kontrolü
  if (!mounted) {
    return (
      <div className="flex flex-col gap-2">
        <div className="h-9 w-32 bg-gray-200 rounded animate-pulse"></div>
        <div className="text-xs text-gray-500">Yükleniyor...</div>
      </div>
    )
  }

  if (isConnected && address) {
    return (
      <div className="flex items-center gap-2">
        <Button
          variant="outline"
          onClick={() => setShowAddress(!showAddress)}
          className="font-mono text-sm"
        >
          {showAddress
            ? address
            : `${address.slice(0, 6)}...${address.slice(-4)}`
          }
        </Button>
        <Button
          variant="ghost"
          onClick={() => disconnect()}
          className="text-red-500 hover:text-red-600"
        >
          Çıkış
        </Button>
      </div>
    )
  }

  return (
    <div className="flex flex-col gap-2">
      {connectors.map((connector) => (
        <Button
          key={connector.id}
          onClick={() => connect({ connector })}
          disabled={isPending}
          variant="outline"
          className="w-full"
        >
          {connector.name}
          {isPending && ' (bağlanıyor...)'}
        </Button>
      ))}
      
      {error && (
        <div className="text-sm text-red-500 mt-2">
          {error.message}
        </div>
      )}
      
      <div className="text-xs text-gray-500 mt-2">
        RISE Wallet ile bağlanın - RISE Testnet (Chain ID: 11155931)
      </div>
    </div>
  )
}
