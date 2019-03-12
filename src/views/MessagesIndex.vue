<template>
  <div class="messages-index">
    <h1>MESSAGES</h1>

    <ul>
      <li v-for="error in errors">{{ error }}</li>
    </ul>

    <form v-on:submit.prevent="submit()">
      <div>
        Message Body: <input v-model="newMessageBody">
      </div>
    </form>
  </div>
</template>

<script>
var axios = require('axios');

export default {
  data: function() {
    return {
      newMessageBody: "",
      errors: []
    };
  },
  created: function() {
    var userId = localStorage.getItem("userId");
    axios.get("/api/messages" + userID)
      .then(response => {
      console.log(response.data);
      this.messages = response.data;
    });
  },
  methods: {
    submit: function() {
      console.log("Create a Message....");
      var params = {
                    body: this.newMessageBody
                    };
      axios.post("/api/messages", params)
        .then(response => {
          console.log("Success", response.data);
          this.message = response.data;
        }).catch(error => {
          console.log(error.response.data.errors);
          this.errors = error.response.data.errors;
        });
    }
  }
};
</script>
