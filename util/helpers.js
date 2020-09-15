// Helper functions

const sessionizeAccount = account => {
    return { AccountId: account.AccountId, FirstName: account.FirstName, LastName: account.LastName,
        AccountType: account.AccountTypeId};
}

module.exports = sessionizeAccount;