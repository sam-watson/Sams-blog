<template>
  <div>
    <h1>{{ title }}</h1>

    <div class="container">
      <div class="account" 
        v-for="(account, index) in accounts" :key="account.id">

        <t-account
          :id="account.id"
          :name="account.name"
          :transactions="account.transactions"
          :canEdit="canEdit" />

        <i v-if="equalsPos >= 0 && index != accounts.length - 1" 
          ref="eqsymbol"
          v-bind:class="[
            'equation', 
            'fas', 
            index == equalsPos ? (isEqual ? 'fa-equals' : 'fa-not-equal') : 'fa-plus']">
        </i>

      </div>
    </div>
  </div>
</template>

<script>
import TAccount from './t_account.vue';
import uuid from 'uuid';

export default {
  props: {
    title: String,
    accounts: Array,
    canEdit: Boolean,
    equalsPos: Number,
  },

  methods: {
    updateAccount(accountName, newAmount) {
      for (const account in this.accounts) {
        if (account.name = accountName) {
          account.transactions = [{id:uuid.v4(), amount: newAmount, side: 'debit'}];
        }
      }
    },

    evaluateEquation() {
      let leftHand = 0, rightHand = 0;
      for (let i = 0; i < this.accounts.length; i++) { 
        leftHand += i <= this.equalsPos ? this.sumAccount(this.accounts[i]) : 0;
        rightHand += i > this.equalsPos ? this.sumAccount(this.accounts[i]) : 0;
      }
      console.log(leftHand)
      console.log(rightHand);
      return (leftHand - rightHand);
    },

    sumAccount(account) {
      return account.transactions.reduce((sum, tx) => sum + (tx.side == 'debit' ? tx.amount : -tx.amount), 0);
    }
  },

  computed: {
    isEqual() {
      return this.evaluateEquation() == 0;
    }
  },
  
  mounted() {
    
    this.evaluateEquation();

    this.$on('account-changed', () => {
      this.evaluateEquation();
    })
  },

  components: {
    TAccount
  }
}
</script>

<style scoped>
h1 {
  font-size: 2em;
  text-align: center;
}

.container {
  display: flex;
  flex-flow: row wrap;
  justify-content: center;
}

.account {
  display: flex;
  align-items: flex-start;
}

t-account {
  margin: 0 5px;
}

.equation {
  margin-top: 24px;
}

.fa-equals {
  color: lightgreen;
}
.fa-not-equal {
  color: pink;
}

</style>
