import { ignition } from "@nomicfoundation/hardhat-ignition";
import { ethers } from "hardhat";
import DeployAllModule from "../ignition/modules/DeployAll";

async function main() {
  console.log("🚀 WeClub Platform kontratları deploy ediliyor...\n");

  try {
    // Ignition kullanarak tüm kontratları deploy et
    const { weClubDAO, passportNFT } = await ignition.deploy(DeployAllModule);

    console.log("✅ Deploy işlemi başarıyla tamamlandı!\n");
    
    console.log("📋 Deploy Edilen Kontratlar:");
    console.log("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━");
    console.log(`🏛️  WeClubDAO:     ${await weClubDAO.getAddress()}`);
    console.log(`🎫 PassportNFT:    ${await passportNFT.getAddress()}`);
    console.log("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n");

    // Kontrat bilgilerini doğrula
    console.log("🔍 Kontrat Bilgileri:");
    
    // WeClubDAO bilgileri
    const proposalCount = await weClubDAO.proposalCount();
    console.log(`📊 WeClubDAO - Mevcut Proposal Sayısı: ${proposalCount}`);
    
    // PassportNFT bilgileri
    const nftName = await passportNFT.name();
    const nftSymbol = await passportNFT.symbol();
    console.log(`🎫 PassportNFT - İsim: ${nftName}`);
    console.log(`🎫 PassportNFT - Sembol: ${nftSymbol}\n`);

    // Deploy eden hesap bilgileri
    const [deployer] = await ethers.getSigners();
    console.log("👤 Deploy Eden Hesap:");
    console.log(`   Adres: ${deployer.address}`);
    console.log(`   Bakiye: ${ethers.formatEther(await ethers.provider.getBalance(deployer.address))} ETH\n`);

    console.log("🎉 Tüm kontratlar başarıyla deploy edildi!");
    console.log("💡 Artık frontend uygulamanızda bu adresleri kullanabilirsiniz.");

  } catch (error) {
    console.error("❌ Deploy işlemi sırasında hata oluştu:", error);
    process.exit(1);
  }
}

// Script'i çalıştır
main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error("❌ Beklenmeyen hata:", error);
    process.exit(1);
  });