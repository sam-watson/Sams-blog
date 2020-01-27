<template>
  <div>
    <form @submit.prevent="addAccount">
      <input type="text" v-model="accountName" name="accountName"
        placeholder="Account Name"/>
      <select v-model="linkedName" name="linkedName" >
        <option v-for="name in linkedNames" :value="name">
          {{ name }}</option>
      </select>
      <input type="submit" value='Add an account'/>
    </form>
  </div>
</template>

<script>
export default {
  name: "addAccounts",

  data: function () {
    return {
      accountName: null,
      linkedName: null,
    	linkedNames: [
      	'Assets', 'Liabilities', 'Equity'
      ]
    }
  }, 
  methods: {
    addAccount() {
      this.$emit("add-account", this.accountName, this.linkedName);
    },
  }
}
</script>

<style scoped>
  div {
    display: flex;
    flex-direction: row;
    justify-content: center;
  }
</style>