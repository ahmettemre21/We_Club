import { buildModule } from "@nomicfoundation/hardhat-ignition/modules";

const WeClubDAOModule = buildModule("WeClubDAOModule", (m) => {
  // WeClubDAO kontratını deploy et
  const weClubDAO = m.contract("WeClubDAO", []);

  // Deploy edilen kontratın adresini logla
  m.call(weClubDAO, "proposalCount", [], { id: "getProposalCount" });

  return { weClubDAO };
});

export default WeClubDAOModule;
