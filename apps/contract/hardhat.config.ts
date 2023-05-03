/* eslint-disable turbo/no-undeclared-env-vars */
import { HardhatUserConfig } from 'hardhat/config';
import '@nomicfoundation/hardhat-toolbox';

import dotenv from 'dotenv';

dotenv.config();

const { PRIVATE_KEY = '', ALCHEMY_URL = '' } = process.env;

const config: HardhatUserConfig = {
  solidity: '0.8.9',
  networks: {
    matic_mumbai: {
      accounts: [PRIVATE_KEY],
      url: ALCHEMY_URL,
    },
  },
};

export default config;
