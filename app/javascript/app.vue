<template>
  <div class='content'>
    <p>{{ appTitle }}</p>
    <add-account
      :linkedAccountNames="balanceSheet"
      @add-account="addAccount"/>

    <t-account-set title="Ledger Accounts"
      :accounts="accounts"
      v-bind:equalsPos=-1
      v-bind:canEdit="true"
      @highlight="highlight"
    />

    <t-account-set title="Balance Sheet"
      :accounts="balanceSheet"
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

      balanceSheet: [
        { id: 1, account: this.createAccount("Assets") },
        { id: 2, account: this.createAccount("Liabilities") },
        { id: 3, account: this.createAccount("Equity") },
      ],

      accountLinks: {
        Cash: 1,
        Receivables: 1,
        Inventory: 1,
        Investments: 1,
        Land: 1,
        Equipment: 1,
        Payables: 2,
        Deposits: 2,
        Stock: 3,
        Earnings: 3
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

    addAccount(accountName, linkedId) {
      this.accounts.push(this.createAccount(accountName));
      this.accountLinks[accountName] = linkedId;
    },

    addTransaction(account, side) {
      account.transactions.push({id:uuid.v4(), amount: null, side: side});
    },

    deleteTransaction(account, trans) {
      console.log('deletion')
      const linkedId = this.accountLinks[account.name];
      if (linkedId) {
        const linkedAcct = this.balanceSheet.find(a => a.Id == linkedId).acct;
        linkedAcct.transactions.splice(linkedAcct.transactions.indexOf(trans, 0), 1);
      }
      account.transactions.splice(account.transactions.indexOf(trans, 0), 1);
    },

    updateBalanceSheet(srcAcct, trans) {
      const linkedId = this.accountLinks[srcAcct.name];
      if (linkedId) {
        const linkedAcct = this.balanceSheet.find(a => a.Id == linkedId);
        if (linkedAcct.transactions.includes(trans) == false) {
          linkedAcct.transactions.push(trans);
        }
      }
    },

    balanceSheetContains(account) {
      return this.balanceSheet.find(a => a.account == account);
    },

    highlightRelated(srcAcct, toggleOn) {
      let relatedAccts = [srcAcct];

      let balSheetItem = this.balanceSheet.find(a => a.account == srcAcct);
      if (balSheetItem) {
        for (let [key, value] of Object.entries(this.accountLinks)) {
          if (value == balSheetItem.id)
            relatedAccts.push(accounts.find(a => a.name == key));
        }
      }
      else {
        let linkedBalSheetId = this.accountLinks[srcAcct.name];
        if (linkedBalSheetId > 0)
          relatedAccts.push(this.balanceSheet.find(a => a.id = linkedBalSheetId));
      }

      for (acct in relatedAccts) {
        highlight(acct, toggleOn);
      }
    },

    highlight(acct, toggleOn) {
      acct.display = toggleOn ? 'lit' : '';
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
      this.updateBalanceSheet(account, trans);
    }),

    eventBus.$on('highlight', (account, isOn) => {
      this.highlightRelated(account, isOn);
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
