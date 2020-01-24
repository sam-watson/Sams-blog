<template>
  <div>

    <h2>{{ account.title }}</h2>

    <div class="table">

      <div class="col debit-side">
        <div class="header">Debits</div>
        <div class="inputs" v-for="debit in debits" v-bind:key="debit.id">
          <!-- <p>{{debit.amount}}</p> -->
          <input type="number" v-model="debit.amount" name="amount">
        </div>
      </div>

      <div class="col credit-side">
        <div class="header">Credits</div>
        <div class="inputs" v-for="credit in credits" v-bind:key="credit.id">
          <!-- <p>{{credit.amount}}</p> -->
          <input type="number" v-model="credit.amount" name="amount">
        </div>
      </div>

    </div>

  </div>
</template>

<script>
  export default {
    name: "t-account",

    props: [
      "account",
    ],

    data: function () {
      return {
        transactions: [
          {
            id: 0,
            amount: 0,
            type: 'debit',
          },
          {
            id: 0,
            amount: 0,
            type: 'credit',
          },
        ],
      }
    },

    computed: {
      debits() {
        return this.transactions.filter(e => e.type = 'debit')
      }
      credits() {
        return this.transactions.filter(e => e.type = 'credit')
      }
    }
    watch: {
      trans() {

      }
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
    -webkit-box-shadow:
      inset 0 0 8px  rgba(0,0,0,0.1),
            0 0 16px rgba(0,0,0,0.1);
    -moz-box-shadow:
      inset 0 0 8px  rgba(0,0,0,0.1),
            0 0 16px rgba(0,0,0,0.1);
    box-shadow:
      inset 0 0 8px  rgba(0,0,0,0.1),
            0 0 16px rgba(0,0,0,0.1);
    padding: 5px;
    background: rgba(255,255,255,0.5);
    margin: 0 0 10px 0;
    text-align: right;
  }

</style>
