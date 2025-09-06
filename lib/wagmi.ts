import { createConfig, http } from 'wagmi'
import { Chain } from 'viem'
import { injected, metaMask } from 'wagmi/connectors'

// RISE Testnet Chain tanımı - Doğru bilgilerle
export const riseTestnet: Chain = {
  id: 11155931,
  name: 'RISE Testnet',
  nativeCurrency: {
    decimals: 18,
    name: 'RISE',
    symbol: 'RISE',
  },
  rpcUrls: {
    default: {
      http: ['https://testnet.riselabs.xyz'],
    },
  },
  blockExplorers: {
    default: { 
      name: 'RISE Explorer', 
      url: 'https://explorer.testnet.riselabs.xyz' 
    },
  },
  testnet: true,
}

// Wagmi konfigürasyonu
export const config = createConfig({
  chains: [riseTestnet],
  connectors: [
    injected(),
    metaMask(),
  ],
  transports: {
    [riseTestnet.id]: http()
  },
  ssr: false, // SSR sorunlarını önlemek için
})
