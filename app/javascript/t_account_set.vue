<template>
  <div class="container">
    <h1>{{ title }}</h1>

    <t-account
      v-for="account in accounts"
      v-bind:key="account.id"
      v-bind:account="account"
    />
  </div>
</template>

<script>
import TAccount from './t_account.vue'


export default {
  props: [
    'title',
    'accounts',
  ],

  data: function () {
    return {
    }
  },

  methods: {
    updateLinkedAccounts(account) {
      this.$emit('update-accounts', account)
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
