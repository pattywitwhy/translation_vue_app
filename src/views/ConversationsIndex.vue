<template>

  <div class="conversations-index">
    <h1>YOUR CONVERSATIONS</h1>

    <div>
      <form v-on:submit.prevent="submit()">
        Contacts: <select v-model="selectedUserId" list="contacts">
          <option v-for="user in users" v-bind:value="user.id">{{ user.name }}</option>
        </select>

        <input v-model="newConversationName">
        <input type="submit" value="Create" class="btn btn-secondary">
      </form>
      <ol>
        <div v-for="conversation in conversations" >
        <router-link class="myConversations" :to="'/conversations/' + conversation.id">
        {{ conversation.name }} 
      </router-link>
        </div>
      </ol>
    </div>
  </div>
</template>

<style>
  .conversations-index {
    padding: 50px;
  }

  .myConversations {
    display: block;
    border: 1px solid;
    border-radius: 5px;
    width: 80%;
    height: 40px;
  }
</style>

<script>
var axios = require('axios');

export default {
  data: function() {
    return {
      users: [],
      conversations: [],
      selectedUserId: "",
      newConversationName: ""
    };
  },
  created: function() {
    axios.get("/api/conversations")
      .then(response => {
        console.log(response.data)
        this.conversations = response.data;
        axios.get("/api/users")
          .then(response => {
            this.users = response.data
          });
      });
  },
  methods: {

    submit: function() {
      console.log("Make an invitation")
      var params = {
                    name: this.newConversationName,
                    user_id: this.selectedUserId
                    };                  

        axios.post("api/conversations", params)
          .then(response => {
            this.$router.push("/conversations/" + response.data.id);
          });
    },
    storeID: function(userID) {
      localStorage.setItem("inviteId", userID);
      console.log(userID)
    }
  }
};
</script>