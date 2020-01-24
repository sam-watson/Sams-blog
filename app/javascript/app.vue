<template>
  <div>
    <p>{{ message }}</p>

    <t-account-set title="Balance Sheet (Oooh!)" :accounts="accounts"/>
  </div>
</template>

<script>
import TAccountSet from './t_account_set.vue'

export default {
  data: function () {
    return {
      message: "We'll learn Accounting! YAY!",

      accounts: [
        {
          id: 1,
          title: "Assets", 
        },
        {
          id: 2,
          title: "Liabilities", 
        },
        {
          id: 3,
          title: "Equity", 
        },
      ]
    }
  },

  components: {
    TAccountSet
  }
}
</script>

<style scoped>
p {
  font-size: 2em;
  text-align: center;
}
</style>
