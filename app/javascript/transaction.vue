<template>
  <div>
    <input type="number" v-model="transaction.amount" />
  </div>
</template>

<script>
  export default {
    name: "transaction",

    props: [
      'transaction'
    ],

    watch: {
      transaction: {
        handler() {
          this.$emit('transaction-changed', this.transaction);
        },
        deep: true
      }
    }
  }
</script>

<style scoped lang="scss">
  input {
    // border: 5px solid white;
    box-shadow:
      inset 0 0 8px  rgba(0,0,0,0.1),
            0 0 16px rgba(0,0,0,0.1);
    padding: 5px;
    background: rgba(255,255,255,0.5);
    margin: 0 0 10px 0;
    text-align: right;
  }

</style>
