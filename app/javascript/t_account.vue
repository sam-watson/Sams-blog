<template>
  <div>
    <h2 @mouseover="lightLinks"
        @mouseleave="unlightLinks"
        v-bind:class="account.display">
      {{ account.name }}
    </h2>

    <div class="table">
<!-- todo refactor cols into components -->
      <div class="col debit-side">
        <div class="header">Debits</div>

        <div class="inputs" v-for="debit in debits" v-bind:key="debit.id">
          <transaction 
            :transaction="debit" 
            :canEdit="canEdit"
            @transaction-changed="transactionChanged"
            @delete-me="deleteTransaction" 
          />
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
        <div v-bind:class="{'header':true, 'isLit':isLit}">Credits</div>

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
    account: Object,
    canEdit: Boolean,
  },

  computed: {
    debits() {
      return this.account.transactions.filter(e => e.side == 'debit');
    },
    credits() {
      return this.account.transactions.filter(e => e.side == 'credit');
    }
  },

  methods: {
    transactionChanged(trans) {
      eventBus.$emit('account-changed', this.account, trans);
      this.$emit('account-changed');
    },

    addTransaction(e) {
      console.log('clicked ' + this.account.name + ' ' + this.account.id + ' ' + e.target.value)
      eventBus.$emit('add-transaction', this.account, e.target.value);
    },

    deleteTransaction(transaction) {
      console.log('pls delete')
      eventBus.$emit('delete-transaction', this.account, transaction);
    },

    lightLinks(e) {
      eventBus.$emit('highlight', this.account, true);
    },
    unlightLinks(e) {
      eventBus.$emit('highlight', this.account, false);
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
    grid-template-columns: auto auto;
    max-width: 500px;
    margin: auto;
    padding: 3px;

    .col {
      display: flex;
      flex-direction: column;
      text-align: center;
      width: 100px;
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

  .lit {
    color: gold;
  }

</style>
