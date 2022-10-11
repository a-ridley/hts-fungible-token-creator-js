const { TokenMintTransaction } = require('@hashgraph/sdk');

const mintToken = async (client, tokenId, amount, supplyKey) => {
  // 1. building the token mint transaction
  const mintTokenTxn = new TokenMintTransaction()
    .setTokenId(tokenId)
    .setAmount(amount)
    .freezeWith(client);

  // 2. sign txn
  const mintTokenTxnSigned = await mintTokenTxn.sign(supplyKey);
  
  // 3. excute txn
  const txnResponse = await mintTokenTxnSigned.execute(client);
  // 4. request receipt
  const mintTokenRx = await txnResponse.getReceipt(client);
  const mintTokenStatus = mintTokenRx.status.toString();

  console.log(`Token mint was a ${mintTokenStatus}`);
};

module.exports = { mintToken };
