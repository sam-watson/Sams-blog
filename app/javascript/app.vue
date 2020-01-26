<template>
  <div>
    <p>{{ message }}</p>
    <add-account @add-account="addAccount"/>

    <t-account-set title="Accounting Accounts" 
      :accounts="accounts"
      @update-linked-account="updateLinkedAccount"
    />
    <t-account-set title="Balance Sheet" 
      :accounts="balSheet"/>
  </div>
</template>

<script>
import TAccountSet from './t_account_set.vue';
import AddAccount from './add_account.vue';
import uuid from 'uuid';

export default {
  data: function () {
    return {
      message: "We'll learn Accounting! YAY!",

      accounts: [],

      balSheet: [
        {id: 1, name: "Assets"},
        {id: 2, name: "Liabilities"},
        {id: 3, name: "Equity"},
      ],

      accountLinks: {},
    }
  },

  methods: {
    addAccount(accountName, linkedName) {
      const newAccount = {
        id: uuid.v4(),
        name: accountName,
        transactions: []
      }
      this.accounts = [...this.accounts, newAccount];
      this.accountLinks[accountName] = linkedName;
    },

    updateLinkedAccount(accountName) {
      const linkedName = this.accountLinks[accountName];
      const account = this.accounts.find(e => e.name = accountName);
      const debits = account.transactions
        .filter(e => e.side == 'debit')
        .reduce((a, b) => a.amount + b.amount, 0);
      const credits = account.transactions
        .filter(e => e.side == 'credit')
        .reduce((a, b) => a.amount + b.amount, 0);
      console.log('update ' + accountName + ', ' + linkedName + ', ' + debits);
      console.log(this.balSheet.find(a => a.name == linkedName).transactions);
      this.balSheet.find(a => a.name == linkedName).transactions = [
        {id:uuid.v4(), amount: debits, side: 'debit'},
        {id:uuid.v4(), amount: credits, side: 'credit'},
      ]
    }
  },

  components: {
    TAccountSet,
    AddAccount
  }
}
</script>

<style scoped>
p {
  font-size: 2em;
  text-align: center;
}
</style>
