const { TokenMintTransaction } = require('@hashgraph/sdk');

const mintToken = async (client, tokenId, amount, supplyKey) => {
  const mintTokenTxn = new TokenMintTransaction()
    .setTokenId(tokenId)
    .setAmount(amount)
    .freezeWith(client);

  const mintTokenTxnSigned = await mintTokenTxn.sign(supplyKey);

  // submit txn to heder network
  const txnResponse = await mintTokenTxnSigned.execute(client);

  const mintTokenRx = await txnResponse.getReceipt(client);
  const mintTokenStatus = mintTokenRx.status.toString();

  console.log(`Token mint was a ${mintTokenStatus}`);
};

module.exports = { mintToken };
