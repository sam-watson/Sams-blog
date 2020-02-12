<template>
  <div class='content'>
    <p>{{ appTitle }}</p>
    <add-account
      @add-account="addAccount"/>

    <t-account-set title="Ledger Accounts"
      :accounts="accounts"
      v-bind:equalsPos=-1
      v-bind:canEdit="true"
      @highlight="highlight"
    />

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
      appTitle: "Accountomator 9000",

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
      return {
        id: uuid.v4(), 
        name: accountName, 
        transactions: [],
        display: ''
      };
    },

    addAccount(accountName, linkedName) {
      this.accounts.push(this.createAccount(accountName));
      this.accountLinks[accountName] = linkedName;
    },

    addTransaction(account, side) {
      account.transactions.push({id:uuid.v4(), amount: null, side: side});
    },

    deleteTransaction(account, trans) {
      console.log('deletion')
      const linkedName = this.accountLinks[account.name];
      if (linkedName) {
        const linkedAcct = this.balSheet.find(a => a.name == linkedName);
        linkedAcct.transactions.splice(linkedAcct.transactions.indexOf(trans, 0), 1);
      }
      account.transactions.splice(account.transactions.indexOf(trans, 0), 1);
    },

    updateLinkedAccount(srcAcct, trans) {
      const linkedName = this.accountLinks[srcAcct.name];
      if (linkedName) {
        const linkedAcct = this.balSheet.find(a => a.name == linkedName);
        if (!linkedAcct.transactions.includes(trans)) {
          console.log('push new ' + trans.side + ' ' + trans.amount);
          linkedAcct.transactions.push(trans);
        }
      }
    },

    highlight(srcAcct, isOn) {
      srcAcct.display = isOn ? 'lit' : '';
      const linkedName = this.accountLinks[srcAcct.name];
      if (linkedName) {
        const linkedAcct = this.balSheet.find(a => a.name == linkedName);
        if (linkedAcct) {
          linkedAcct.display = isOn ? 'lit' : '';
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

    eventBus.$on('add-transaction', (account, side) => {
      console.log('adding trans to ' + account);
      this.addTransaction(account, side);
    }),

    eventBus.$on('delete-transaction', (account, trans) => {
      this.deleteTransaction(account, trans);
    }),

    eventBus.$on('account-changed', (account, trans) => {
      console.log('changing trans');
      this.updateLinkedAccount(account, trans);
    }),

    eventBus.$on('highlight', (account, isOn) => {
      this.highlight(account, isOn);
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
