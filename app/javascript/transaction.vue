<template>
  <div>
    <input type="number"
      v-focus 
      @blur="checkValue" 
      @keyup.enter="checkValue" 
      placeholder=0
      v-bind:readonly="readonly"
      v-model.number="transaction.amount" />
  </div>
</template>

<script>
  export default {
    name: "transaction",

    props: {
      transaction: {
        id: String,
        amount: Number,
        side: String,
      },
      canEdit: Boolean,
    },

    computed: {
      readonly() {
        return !this.canEdit;
      }
    },

    methods: {
      checkValue() {
        if (!this.transaction.amount) {
          console.log('delme')
          this.$emit('delete-me', this.transaction);
        }        
      }
    },

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
    // background: rgba(255,255,255,0.5);
    background-color: Transparent;
    border: none;  
    box-shadow:
      inset 0 0 8px  rgba(0,0,0,0.1),
            0 0 16px rgba(0,0,0,0.1);
    color: white;
    padding: 5px;
    margin: 0 0 10px 0;
    text-align: right;
    max-width: 80px;
  }

</style>
