<template>
  <div class="conversations-index">
    <h1>YOUR CONVERSATIONS</h1>

    <form v-on:submit.prevent="submit()">
      <div>
        Conversation Name: <input v-model="newConversationName">
      <input type="submit" value="Create" class="btn btn-secondary">
      </div>
    </form>
    <ol>
      <button v-on:click="clickConversation(conversation.id)" v-for="conversation in conversations" class="myConversations">{{ conversation.name }} </button>
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
      conversations: [],
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
    },

    clickConversation: function(inputId) {
      axios.get("/api/conversations/")
        .then(response => {
          this.$router.push("/conversations/" + inputId);
        });
    }
  }
};
</script>