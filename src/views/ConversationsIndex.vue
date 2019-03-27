<template>

  <div class="conversations-index">
    <h1>Chatrooms</h1>

    <div>
      <form v-on:submit.prevent="submit()">
        <div class="contacts">
          Contacts: <select v-model="selectedUserId" list="contacts">
            <option v-for="user in users" v-bind:value="user.id">{{ user.name }}</option>
          </select>
        </div>

        <br>
        <input v-model="newConversationName" placeholder="Conversation Name">
        <input type="submit" value="Create" class="btn btn-secondary">
      </form>
      <div>
        <div v-for="conversation in startedConversations" >
          <router-link class="my-conversations started-conversation" :to="'/conversations/' + conversation.id">
            {{ conversation.name }} 
          </router-link>
        </div>

          <div v-for="conversation in invitedConversations" >
            <router-link class="my-conversations invited-conversation" :to="'/conversations/' + conversation.id">
              {{ conversation.name }} 
            </router-link>
          </div>
      </div>
    </div>
  </div>
</template>

<style>
  h1 {
    font-family: Avantgarde;
    font-size: 50px;
    font-style: normal;
    font-variant: normal;
    font-weight: 700;
    line-height: 26.4px;
    padding: 10px;
  }

  .contacts{
    color: black;
  }
  .conversations-index {
    padding: 50px;
  }

  .my-conversations {
    display: block;
    border: 1px solid;
    border-color: black;
    border-radius: 10px;
    width: 80%;
    height: 40px;
  }

  .started-conversation {
    border-color: black;
  }

  .invited-conversation {
    border-color: black;
  }
</style>

<script>
var axios = require('axios');

export default {
  data: function() {
    return {
      users: [],
      startedConversations: [],
      invitedConversations: [],
      selectedUserId: "",
      newConversationName: ""
    };
  },
  created: function() {
    axios.get("/api/conversations")
      .then(response => {
        console.log(response.data)
        this.startedConversations = response.data["started_conversations"];
        this.invitedConversations = response.data["invited_conversations"];
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