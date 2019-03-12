<template>
  <div class="conversations-index">
    <h1>YOUR CONVERSATIONS</h1>

    <h4>conversations: {{ conversation.starter_id }}</h4>

    <button class="btn btn-secondary" v-on:click="clickConversation()">Go to Conversation</button>
  </div>
</template>

<style>
</style>

<script>
var axios = require('axios');

export default {
  data: function() {
    return {
      conversation: []
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
    clickConversation: function() {
      axios.get("/api/messages/")
        .then(response => {
          console.log("Success", response.data);
          this.$router.push("/messages");
        });
    }
  }
};
</script>