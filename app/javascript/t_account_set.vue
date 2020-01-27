<template>
  <div class="container">
    <h1>{{ title }}</h1>

    <t-account
      v-for="account in accounts"
      :key="account.id"
      :name="account.name"
      :transactions="account.transactions"
      @account-changed="accountChanged"
    />
  </div>
</template>

<script>
import TAccount from './t_account.vue';
import uuid from 'uuid';

export default {
  props: [
    'title',
    'accounts',
  ],

  methods: {
    accountChanged(accountName, trans) {
      console.log('set')
      this.$emit('update-linked-account', accountName, trans)
    },
    updateAccount(accountName, newAmount) {
      for (const account in this.accounts) {
        if (account.name = accountName) {
          account.transactions = [{id:uuid.v4(), amount: newAmount, side: 'debit'}];
        }
      }
    }
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
</style>
