const {
  PrivateKey,
  AccountCreateTransaction,
  Hbar
} = require('@hashgraph/sdk');

// create an account with an initial balance
const createAccount = async (client, initialBalance) => {
  const accountPrivateKey = PrivateKey.generateED25519();

  const response = await new AccountCreateTransaction()
    .setInitialBalance(new Hbar(initialBalance))
    .setKey(accountPrivateKey)
    .execute(client);

  const receipt = await response.getReceipt(client);

  return [receipt.accountId, accountPrivateKey];
};

module.exports = { createAccount };
