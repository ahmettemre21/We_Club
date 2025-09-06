import { ethers } from "hardhat";

async function main() {
  console.log("🚀 RISE Testnet'e deploy başlıyor...");
  
  const [deployer] = await ethers.getSigners();
  console.log("Deploy eden adres:", deployer.address);
  
  const balance = await ethers.provider.getBalance(deployer.address);
  console.log("Hesap bakiyesi:", ethers.formatEther(balance), "ETH");
  
  // PassportNFT deploy
  console.log("\n📝 PassportNFT deploy ediliyor...");
  const PassportNFT = await ethers.getContractFactory("PassportNFT");
  const passportNFT = await PassportNFT.deploy();
  await passportNFT.waitForDeployment();
  const passportAddress = await passportNFT.getAddress();
  console.log("✅ PassportNFT deployed to:", passportAddress);
  
  // WeClubDAO deploy
  console.log("\n🏛️ WeClubDAO deploy ediliyor...");
  const WeClubDAO = await ethers.getContractFactory("WeClubDAO");
  const weClubDAO = await WeClubDAO.deploy();
  await weClubDAO.waitForDeployment();
  const daoAddress = await weClubDAO.getAddress();
  console.log("✅ WeClubDAO deployed to:", daoAddress);
  
  // Deploy bilgilerini kaydet
  const deployInfo = {
    network: "RISE Testnet",
    chainId: 60000,
    deployer: deployer.address,
    contracts: {
      PassportNFT: passportAddress,
      WeClubDAO: daoAddress
    },
    deployedAt: new Date().toISOString()
  };
  
  console.log("\n📋 Deploy Özeti:");
  console.log(JSON.stringify(deployInfo, null, 2));
  
  // Kontratları .env.local'e kaydetmek için bilgileri yazdır
  console.log("\n⚠️  Aşağıdaki satırları .env.local dosyanıza ekleyin:");
  console.log(`NEXT_PUBLIC_PASSPORT_NFT_ADDRESS=${passportAddress}`);
  console.log(`NEXT_PUBLIC_DAO_ADDRESS=${daoAddress}`);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
