const { ethers } = require("ethers");

const provider = new ethers.JsonRpcProvider("https://mainnet.infura.io/v3/3f4621bbba154d5e89fabae8ab737ef4");

const interactBlockchain = async () => {
  try {
    const currentBlock = await provider.getBlockNumber();
    console.log("You are using the block: ", currentBlock);

    const address = "0x974CaA59e49682CdA0AD2bbe82983419A2ECC400";
    const balance = await provider.getBalance(address);

    const balanceInEther = ethers.formatEther(balance); // formatEther in ethers v6
    console.log("Account balance in ether:", balanceInEther);

    const balanceInWei = ethers.parseEther(balanceInEther); // parseEther in ethers v6
    console.log("Account balance in wei:", balanceInWei.toString());
  } catch (error) {
    console.error("An error occurred:", error);
  }
};

interactBlockchain();
