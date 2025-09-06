

import dotenv from "dotenv"
dotenv.config();

const config = {
  solidity: {
    version: "0.8.20",
    settings: {
      optimizer: {
        enabled: true,
        runs: 200
      }
    }
  },
  networks: {
    rise: {
      type: "http",
      url: "https://testnet.riselabs.xyz",
      chainId: 11155931,
      accounts: process.env.PRIVATE_KEY ? [process.env.PRIVATE_KEY] : [],
    },
  },
  paths: {
    sources: "./contracts",
    tests: "./test",
    cache: "./cache",
    artifacts: "./artifacts"
  },
  ignition: {
    moduleDir: "./ignition/modules"
  }
};
export default config;
