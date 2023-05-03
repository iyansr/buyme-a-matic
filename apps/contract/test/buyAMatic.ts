import { loadFixture } from '@nomicfoundation/hardhat-network-helpers';
import { expect } from 'chai';
import { ethers } from 'hardhat';

describe('Buy A Matic', () => {
  const deployMentFixture = async () => {
    const BuyMeAMaticFactory = await ethers.getContractFactory('BuyMeAMatic');
    const [owner, buyer1, buyer2] = await ethers.getSigners();

    const buyMeAMatic = await BuyMeAMaticFactory.deploy();
    await buyMeAMatic.deployed();

    return { buyMeAMatic, owner, buyer1, buyer2 };
  };

  describe('Deployment', () => {
    it('Should set the right owner', async () => {
      const { buyMeAMatic, owner } = await loadFixture(deployMentFixture);

      expect(await buyMeAMatic.owner()).to.equal(owner.address);
    });

    it('Should get initial balance', async () => {
      const { buyMeAMatic } = await loadFixture(deployMentFixture);
      const contractBalance = await ethers.provider.getBalance(
        buyMeAMatic.address,
      );
      expect(contractBalance).to.equal(ethers.utils.parseEther('0'));
    });
  });
});
