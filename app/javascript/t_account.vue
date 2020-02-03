<template>
  <div>
    <h2>{{ name }}</h2>

    <div class="table">
<!-- todo refactor cols into components -->
      <div class="col debit-side">
        <div class="header">Debits</div>

        <div class="inputs" v-for="debit in debits" v-bind:key="debit.id">
          <transaction 
            :transaction="debit" 
            :canEdit="canEdit"
            @transaction-changed="transactionChanged"/>
        </div>

        <div>
          <button class="add-trans-btn" type="button" 
            v-if="canEdit"
            @click="addTransaction"
            value="debit">
            +
          </button>
        </div>
      </div>

      <div class="col credit-side">
        <div class="header">Credits</div>

        <div class="inputs" v-for="credit in credits" v-bind:key="credit.id">
          <transaction 
            :transaction="credit" 
            :canEdit="canEdit"
            @transaction-changed="transactionChanged"/>
        </div>

        <div>
          <button class="add-trans-btn" type="button" 
            v-if="canEdit"
            @click="addTransaction"
            value="credit">
            +
          </button>
        </div>
      </div>

    </div>

  </div>
</template>

<script>
import eventBus from './eventbus.js';
import Transaction from './transaction.vue';
import uuid from 'uuid';

export default {  
  name: "t-account",

  props: {
    id: String,
    name: String,
    transactions: {
      type: Array,
      default: () => []
    },
    canEdit: Boolean
  },

  computed: {
    debits() {
      return this.transactions.filter(e => e.side == 'debit');
    },
    credits() {
      return this.transactions.filter(e => e.side == 'credit');
    }
  },

  methods: {
    transactionChanged(trans) {
      eventBus.$emit('account-changed', this.name, trans);
    },

    addTransaction(e) {
      console.log('clicked ' + this.name + ' ' + this.id + ' ' + e.target.value)
      eventBus.$emit('add-transaction', this.id, e.target.value);
    }
  },
  
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
    padding: 3px;

    .col {
      display: flex;
      flex-direction: column;
      text-align: center;
      min-width: 100px;
      max-width: 225px;
      min-height: 50px;

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

  button {
    background-color: Transparent;
    background-repeat:no-repeat;
    border: none;
    cursor:pointer;
    overflow: hidden;
    outline:none;
    color: white;
  }

  .add-trans-btn {
    width: 20px;
    margin: 0 auto;
    text-align: center;
    font-weight: bold;
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
