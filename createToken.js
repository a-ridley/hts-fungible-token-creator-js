const { TokenCreateTransaction, Hbar, TokenType } = require('@hashgraph/sdk');

const createToken = async (
  client,
  treasuryAccId,
  supplyKey,
  treasuryAccPvKey
) => {
  // 1. building a transaction with token type fungible

  // 2. Sign txn

  //3. submit txn to hedera network

  //4. request receipt of txn

  console.log(
    `Token Type Creation was a ${txnStatus} and was created with token id: ${tokenId}`
  );

  return tokenId;
};

module.exports = { createToken };
