// RISE Testnet'i MetaMask'a eklemek için bu scripti kullanın
// Browser console'da çalıştırın

const addRiseNetwork = async () => {
  try {
    await window.ethereum.request({
      method: 'wallet_addEthereumChain',
      params: [{
        chainId: '0xAA1A1B', // 11155931 in hex
        chainName: 'RISE Testnet',
        nativeCurrency: {
          name: 'RISE',
          symbol: 'RISE',
          decimals: 18
        },
        rpcUrls: ['https://testnet.riselabs.xyz'],
        blockExplorerUrls: ['https://explorer.testnet.riselabs.xyz']
      }]
    });
    console.log('RISE Testnet başarıyla eklendi!');
  } catch (error) {
    console.error('RISE Testnet eklenirken hata:', error);
  }
};

// Scripti çalıştır
addRiseNetwork();
