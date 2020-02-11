<template>
  <div>
    <h2>{{ name }}</h2>

    <div class="table">
<!-- todo refactor cols into components -->
      <div class="col debit side">
        <div class="header">Debits</div>

        <div class="inputs" v-for="debit in debits" v-bind:key="debit.id">
          <transaction 
            :transaction="debit" 
            :canEdit="canEdit"
            @transaction-changed="transactionChanged"
            @delete-me="deleteTransaction" 
          />
          <div v-if="debits.count == 0"></div>
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

      <div class="col divider"></div>

      <div class="col credit side">
        <div class="header">Credits</div>

        <div class="inputs" v-for="credit in credits" v-bind:key="credit.id">
          <transaction
            :transaction="credit" 
            :canEdit="canEdit"
            @transaction-changed="transactionChanged"
            @delete-me="deleteTransaction"
          />
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
      this.$emit('account-changed');
    },

    addTransaction(e) {
      console.log('clicked ' + this.name + ' ' + this.id + ' ' + e.target.value)
      eventBus.$emit('add-transaction', this.id, e.target.value);
    },

    deleteTransaction(transaction) {
      console.log('pls delete')
      eventBus.$emit('delete-transaction', this, transaction);
    }
  },
  
  components: {
    Transaction
  },
}
</script>

<style scoped lang="scss">
  h2 {
    text-align: center;
    margin-bottom: 5px;
  }

  .table {
    display: grid;
    grid-template-columns: auto 2px auto;
    grid-template-rows: auto auto;
    max-width: 500px;
    margin: auto;
    padding: 3px;

    .header {
      border-bottom: 2px solid black;
    }

    .col {
      display: flex;
      flex-direction: column;
      text-align: center;

      &.side {
        width: 100px;
        min-height: 50px;
      }

      &.divider {
        height: 100%;
        background-color: black;
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

</style>