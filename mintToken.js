const { TokenMintTransaction } = require('@hashgraph/sdk');

const mintToken = async (client, tokenId, amount, supplyKey) => {
  //1. building the token mint transaction


  //2. sign txn


  //3. submit txn to hedera network

  //4. request receipt


  console.log(`Token mint was a ${mintTokenStatus}`);
};

module.exports = { mintToken };
