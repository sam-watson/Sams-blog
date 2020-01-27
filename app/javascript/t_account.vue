<template>
  <div>
    <h2>{{ name }}</h2>

    <div class="table">

      <div class="col debit-side">
        <div class="header">Debits</div>
        <div class="inputs" v-for="debit in debits" v-bind:key="debit.id">

          <transaction :transaction="debit" @transaction-changed="transactionChanged"/>

        </div>
      </div>

      <div class="col credit-side">
        <div class="header">Credits</div>
        <div class="inputs" v-for="credit in credits" v-bind:key="credit.id">

          <transaction :transaction="credit" @transaction-changed="transactionChanged"/>

        </div>
      </div>

    </div>

  </div>
</template>

<script>
import Transaction from './transaction.vue';
import uuid from 'uuid';

export default {  
  name: "t-account",

  props: {
    name: String,
    transactions: {
      type: Array,
      default: () => [
        {id:uuid.v4(), amount:0, side: 'debit'},
        {id:uuid.v4(), amount:0, side: 'credit'}
      ]
    }
  },

  computed: {
    debits() {
      return [...this.transactions.filter(e => e.side == 'debit')];
    },
    credits() {
      return [...this.transactions.filter(e => e.side == 'credit')];
    }
  },

  methods: {
    transactionChanged(trans) {
      console.log('accounted');
      console.log(trans);
      console.log(this.transactions);
      this.$emit('account-changed', this.name, trans);
    }
  },

  // watch: {
    // transactions: {
    //   handler(val) {
    //     console.log('base')
    //     this.$emit('account-changed', name)
    //   },
    //   deep: true
    // }
  // },
  
  components: {
    Transaction
  }
}
</script>

<style scoped lang="scss">
  h2 {
    text-align: center;
    margin-bottom: 5px;
  }

  .table {
    display: grid;
    grid-template-columns: auto auto;
    max-width: 500px;
    margin: auto;

    .col {
      display: flex;
      flex-direction: column;
      text-align: center;

      .header {
        border-bottom: 2px solid black;
      }

      &:nth-child(1) {
        :nth-child(n+2) {
          border-right: 2px solid black;
        }
      }
    }
  }

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
