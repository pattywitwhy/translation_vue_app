<template>
  <div class="conversations-index">
    <h1>YOUR CONVERSATIONS</h1>

    <div>
      Contacts: <select v-model="newConversationName" list="contacts">
        <option v-for="user in users" v-bind:value="user.name">{{ user.name }}</option>
      </select>
      <datalist v-model="newInvitation" id="contacts">
        <option v-for="user in users" v-bind:value="user.name">{{ user.name }}</option>
      </datalist>
    </div>

    <div>
      <form v-on:submit.prevent="submit()">
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

    <div>
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
      newConversationName: "",
      newInvitation: ""
    };
  },
  created: function() {
    axios.get("/api/conversations")
      .then(response => {
        console.log(response.data)
        this.conversations = response.data;
      });
    axios.get("/api/users")
      .then(response => {
        this.users = response.data
      });
  },
  methods: {

    // submit: function() {
    //   console.log("Make an invitation....");

    //   var params = {
    //                 user_id: this.users.id,
    //                 conversation_id: this.$route.params.id
    //                 }
    //   axios.post("/api/invitations")
    //     .then(response => {
    //       console.log(response.data);
    //       console.log("+++++++++++++++++++++++++")
    //       this.newInvitation = response.data
    //       var params = {
    //                     name: this.newConversationName
    //                     };
    //       axios.post("/api/conversations", params)
    //         .then(response => {
    //           this.conversations.push(response.data);
    //           this.newConversationName = "";
    //         });
    //     });

    // },
    submit: function() {
      console.log("Create the Conversation....");
      var params = {
                    name: this.newConversationName
                    };
      axios.post("/api/conversations", params)
        .then(response => {
          this.conversations.push(response.data);
          this.newConversationName = "";
        });
    }
  }
};
</script>