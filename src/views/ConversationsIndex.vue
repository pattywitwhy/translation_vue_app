<template>
  <div class="conversations-index">
    <h1>YOUR CONVERSATIONS</h1>

    <ol>
      <button class="myConversations" v-on:click="clickConversation()"v-for="conversation in conversations">{{ conversation }}></button>
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
      // {
                      // id: "",
                      // starter_id: ""
                      // conversation_id: ""
                    // },
      started_conversation: ""
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