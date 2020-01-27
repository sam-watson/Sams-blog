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
        name: accountName
      }
      this.accounts = [...this.accounts, newAccount];
      this.accountLinks[accountName] = linkedName;
    },

    updateLinkedAccount(accountName, trans) {
      const linkedName = this.accountLinks[accountName];
      const srcAcct = this.accounts.find(e => e.name = accountName);
      const linkedAcct = this.balSheet.find(a => a.name == linkedName);
      const linkedTrans = linkedAcct.transactions.find(t => t.id = trans.id);
      if (linkedTrans == undefined) {
        linkedAcct.transactions.push(trans);
      } else {
        linkedTrans.amount = trans.amount;
      }
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
