<template>
  <div class="messages-index">
    <h1>Messages</h1>
    <div v-for="message in messages">
      <h2>{{ message.message_id }}</h2>
    </div>
  </div>
</template>

<script>
var axios = require('axios');

export default {
  data: function() {
    return {
      messages: []
    };
  },
  created: function() {
    axios.get("/api/messages").then(response => {
      this.messages = response.data;
    });
  },
  methods: {}
};
</script>
