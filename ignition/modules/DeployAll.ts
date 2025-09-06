import { buildModule } from "@nomicfoundation/hardhat-ignition/modules";
import WeClubDAOModule from "./WeClubDAO";
import PassportNFTModule from "./PassportNFT";

const DeployAllModule = buildModule("DeployAllModule", (m) => {
  // Tüm kontratları deploy et
  const { weClubDAO } = m.useModule(WeClubDAOModule);
  const { passportNFT } = m.useModule(PassportNFTModule);

  // Deploy işlemi tamamlandıktan sonra bilgileri logla
  m.call(weClubDAO, "proposalCount", [], { id: "finalWeClubDAOProposalCount" });
  m.call(passportNFT, "name", [], { id: "finalPassportNFTName" });
  m.call(passportNFT, "symbol", [], { id: "finalPassportNFTSymbol" });

  return { weClubDAO, passportNFT };
});

export default DeployAllModule;
