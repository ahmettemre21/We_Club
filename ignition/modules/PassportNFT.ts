import { buildModule } from "@nomicfoundation/hardhat-ignition/modules";

const PassportNFTModule = buildModule("PassportNFTModule", (m) => {
  // PassportNFT kontratını deploy et
  const passportNFT = m.contract("PassportNFT", []);

  // Deploy edilen kontratın adresini logla
  m.call(passportNFT, "name", [], { id: "getContractName" });
  m.call(passportNFT, "symbol", [], { id: "getContractSymbol" });

  return { passportNFT };
});

export default PassportNFTModule;
