<template>
  <div class='content'>
    <p>{{ message }}</p>
    <add-account
      @add-account="addAccount"/>

    <t-account-set title="Ledger Accounts"
      :accounts="accounts"
      v-bind:equalsPos=-1
      v-bind:canEdit="true"/>

    <t-account-set title="Balance Sheet"
      :accounts="balSheet"
      v-bind:equalsPos=0
      v-bind:canEdit="false"/>
  </div>
</template>

<script>
import eventBus from './eventbus.js';
import TAccountSet from './t_account_set.vue';
import AddAccount from './add_account.vue';
import uuid from 'uuid';

export default {
  data: function () {
    return {
      message: "We're gonna learn Accounting! YAY!",

      accounts: [],

      balSheet: [
        this.createAccount("Assets"),
        this.createAccount("Liabilities"),
        this.createAccount("Equity"),
      ],

      accountLinks: {
        Cash: 'Assets',
        Receivables: 'Assets',
        Inventory: 'Assets',
        Investments: 'Assets',
        Land: 'Assets',
        Equipment: 'Assets',
        Payables: 'Liabilities',
        Deposits: 'Liabilities',
        Stock: 'Equity',
        Earnings: 'Equity'
      },
    }
  },

  methods: {
    createAccount(accountName) {
      return {id: uuid.v4(), name: accountName, transactions: []};
    },

    addAccount(accountName, linkedName) {
      this.accounts.push(this.createAccount(accountName));
      this.accountLinks[accountName] = linkedName;
    },

    addTransaction(accountId, side) {
      const acct = this.accounts.find(a => a.id == accountId);
      if (acct) {
          acct.transactions.push({id:uuid.v4(), amount: 0, side: side});
      }
    },

    updateLinkedAccount(accountName, trans) {
      const srcAcct = this.accounts.find(a => a.name == accountName);
      const linkedName = this.accountLinks[accountName];
      if (linkedName) {
        const linkedAcct = this.balSheet.find(a => a.name == linkedName);
        if (!linkedAcct.transactions.includes(trans)) {
          console.log('push new ' + trans.side + ' ' + trans.amount);
          linkedAcct.transactions.push(trans);
        }
      }
    }
  },

  created() {
    for (let [key, value] of Object.entries(this.accountLinks)) {
      this.addAccount(key, value);
    }
  },

  mounted() {
    eventBus.$on('add-transaction', (accountId, side) => {
      console.log('adding trans to ' + accountId);
      this.addTransaction(accountId, side);
    }),

    eventBus.$on('account-changed', (accountName, trans) => {
      console.log('changing trans');
      this.updateLinkedAccount(accountName, trans);
    })
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
