<template>
  <div class="container">
    <form @submit.prevent="addAccount">
      <input type="text" v-model="accountName" name="accountName"
        placeholder="Account Name"/>

      <select v-model="linkedAccountName" name="linkedAccountName" >
        <option v-for="item in linkedAccountNames" :value="item.id">
          {{ item.account.name }}</option>
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
      linkedAccountName: null,
    	linkedAccountNames: []
    }
  }, 
  methods: {
    addAccount() {
      if (this.accountName)
      this.$emit("add-account", this.accountName, this.linkedAccountName);
    },
  }
}
</script>

<style scoped>
  .container > form {
    display: flex;
    justify-content: center;
  }
  @media (max-width: 700px) {
    .container > form {
      flex-direction: column;
      align-items: center;
    }
  }
</style>