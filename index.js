const { Client, PrivateKey, AccountId } = require('@hashgraph/sdk');
require('dotenv').config();
const { createAccount } = require('./createAccount');
const { createToken } = require('./createToken');
const { mintToken } = require('./mintToken');

// create your client
const operatorAccountId = AccountId.fromString(process.env.OPERATOR_ACCOUNT_ID);
const operatorPrivateKey = PrivateKey.fromString(
  process.env.OPERATOR_PRIVATE_KEY
);
const client = Client.forTestnet().setOperator(
  operatorAccountId,
  operatorPrivateKey
);

// generate supply key in charge of authorizing token mints and burn txn
const supplyKey = PrivateKey.generateED25519();

const fungibleTokenExample = async (supplyKey) => {
  console.log('Step 1: Create a treasury account');
  // Create an account to be the holder of the tokens
  // This is called a treasury account
  const [treasuryAccId, treasuryAccPvKey] = await createAccount(client, 50);
  console.log(
    `Treasury Account Id: ${treasuryAccId}
Treasury Account Private Key (save locally): ${treasuryAccPvKey}`
  );

  console.log('Step 2: Create a token type');
  // create a transaction with token type fungible
  const tokenId = await createToken(
    client,
    treasuryAccId,
    supplyKey,
    treasuryAccPvKey
  );

  console.log('Step 3: Mint Tokens');
  await mintToken(client, tokenId, 100, supplyKey);
};

fungibleTokenExample(supplyKey);
