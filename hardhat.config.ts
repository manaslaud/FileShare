require("@nomicfoundation/hardhat-toolbox");
import dotenv from 'dotenv'; 
dotenv.config();
/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: "0.8.9",
  networks: {
    hardhat: {
      chainId: 1337,
    },
    sepolia:{
      url:process.env.sepolia_url,
      accounts:[process.env.secret_phrase]
    }
  },
  paths: {
    artifacts: "./client/src/artifacts",
  },
};