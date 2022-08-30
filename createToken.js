const { TokenCreateTransaction, Hbar, TokenType } = require('@hashgraph/sdk');

const createToken = async (
  client,
  treasureyAccId,
  supplyKey,
  treasuryAccPvKey
) => {
  // create a transaction with token type fungible
  const createTokenTxn = await new TokenCreateTransaction()
    .setTokenName('popsicleCoin') // publicly visible name of token
    .setTokenSymbol('POP') //publicly viisble symbol of token (ie. DOGE, ETH)
    .setTokenType(TokenType.FungibleCommon)
    .setInitialSupply(0)
    .setTreasuryAccountId(treasureyAccId)
    .setSupplyKey(supplyKey)
    .setMaxTransactionFee(new Hbar(30)) // you will be charged only what the network is asking for (charges you ~.001 usd in hbar)
    .freezeWith(client); //freeze tx from from any further mods.

  const createTokenTxnSigned = await createTokenTxn.sign(treasuryAccPvKey);
  // submit txn to heder network
  const txnResponse = await createTokenTxnSigned.execute(client);
  // request receipt of txn
  const txnRx = await txnResponse.getReceipt(client);
  const txnStatus = txnRx.status.toString();
  const tokenId = txnRx.tokenId;

  console.log(
    `Token Type Creation was a ${txnStatus} and was created with token id: ${tokenId}`
  );

  return tokenId;
};

module.exports = { createToken };
