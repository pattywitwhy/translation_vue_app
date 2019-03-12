<template>
  <div class="conversations-index">
    <h1>All Conversations</h1>
  </div>
</template>

<style>
</style>

<script>
var axios = require('axios');

export default {
  data: function() {
    return {
    };
  },
  created: function() {
    axios.get("/api/conversations")
      .then(response => {
        this.conversations = response.data;
      });
  },
  methods: {}
};
</script>