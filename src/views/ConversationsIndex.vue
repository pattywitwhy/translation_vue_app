<template>
  <div class="conversations-index">
    <h1>YOUR CONVERSATIONS</h1>

    <form v-on:submit.prevent="submit()">
      <div>
        Conversation Name: <input v-model="newConversationName">
      </div>
      <input type="submit" value="Create" class="btn btn-secondary">
    </form>

    <ol>
      <button class="myConversations" v-on:click="clickConversation(conversation.id)"v-for="conversation in conversations">{{ conversation.id }}</button>
    </ol>

  </div>
</template>

<style>
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
      conversations: "",
      started_conversation: "",
      newConversationName: ""
    };
  },
  created: function() {
    axios.get("/api/conversations")
      .then(response => {
        console.log(response.data)
        this.conversations = response.data;
      });
  },
  methods: {
    submit: function(){
      console.log("Create the Conversation....");
      var params = {
                    name: this.newConversationName
                    };
      axios.post("/api/conversations", params)
        .then(response => {
          console.log("Success", response.data);
          this.$router.push("/conversations/");
        }).catch(error => {
          this.errors = error.response.data.errors;
        });
    },

    clickConversation: function(inputId) {
      var params = {
                    conversation_id: this.conversation_id
                   }
      axios.get("/api/conversations/")
        .then(response => {
          console.log("Success", response.data);
          this.$router.push("/conversations/" + inputId);
        });
    },

    myConversations: function() {
      axios.get("/api/conversations")
        .then(response => {
          console.log("Displaying conversations...", response.data);
          this.conversation.push(response.data)
        });
    }
  }
};
</script>