<template>
  <div class="conversations-index">
    <h1>YOUR CONVERSATIONS</h1>


    <form v-on:submit.prevent="submit(user.id)">
      <div>
        Contacts: <input v-model="newConversationName" list="contacts">
        <datalist v-model="newInvitation" id="contacts">
          <option v-for="user in users" v-bind:value="user.name">{{ user.name }}</option>
        </datalist>
      <input type="submit" value="Create" class="btn btn-secondary">
      </div>
      <ol>
        <button v-on:click="clickConversation(conversation.id)" v-for="conversation in conversations" class="myConversations">{{ conversation.name }} </button>
      </ol>
    </form>

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

    submit: function(invitee_id) {
      console.log("Make an invitation....");
      var params2 = {
                    starter_id: invitee_id
                    }
      var params = {
                    name: this.newConversationName
                    };
      axios.post("/api/invitations", params2)
        .then(response => {
          axios.post("/api/conversations", params)
            .then(response => {
              this.conversations.push(response.data);
              this.newConversationName = "";
            });
          console.log(response.data);
        });
    },
    // submit: function() {
    //   console.log("Create the Conversation....");
    //   var params = {
    //                 name: this.newConversationName
    //                 };
    //   axios.post("/api/conversations", params)
    //     .then(response => {
    //       this.conversations.push(response.data);
    //       this.newConversationName = "";
    //     });
    // },

    clickConversation: function(inputId) {
      axios.get("/api/conversations/")
        .then(response => {
          this.$router.push("/conversations/" + inputId);
        });
    }
  }
};
</script>