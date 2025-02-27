const hre = require("hardhat");

async function main() {
  const initialSupply = hre.ethers.parseEther("1000"); // 1000 tokens
  const Token = await hre.ethers.getContractFactory("TokenTransfer");
  const token = await Token.deploy(initialSupply);

  await token.waitForDeployment();

  console.log(`Token deployed at: ${token.target}`);
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
