const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("TokenTransfer", function () {
  let Token, token, owner, addr1, addr2;

  beforeEach(async function () {
    Token = await ethers.getContractFactory("TokenTransfer");
    [owner, addr1, addr2] = await ethers.getSigners();
    token = await Token.deploy(ethers.parseEther("1000"));
    await token.waitForDeployment();
  });

  it("Should assign total supply to owner", async function () {
    expect(await token.balanceOf(owner.address)).to.equal(ethers.parseEther("1000"));
  });

  it("Should transfer tokens between accounts", async function () {
    await token.transfer(addr1.address, ethers.parseEther("50"));
    expect(await token.balanceOf(addr1.address)).to.equal(ethers.parseEther("50"));
  });

  it("Should approve and allow transferFrom", async function () {
    await token.approve(addr1.address, ethers.parseEther("30"));
    await token.connect(addr1).transferFrom(owner.address, addr2.address, ethers.parseEther("30"));
    expect(await token.balanceOf(addr2.address)).to.equal(ethers.parseEther("30"));
  });
});
