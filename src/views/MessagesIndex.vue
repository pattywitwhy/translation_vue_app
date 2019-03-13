<template>
  <div class="messages-index">
    <h1>MESSAGES</h1>
    <ul>
      <li v-for="error in errors">{{ error }}</li>
    </ul>
    <form v-on:submit.prevent="submit()">
      <div>
        Create a Message: <input v-model="newMessageBody">
        <div class="new-button">
          <input type="submit" value="SEND" class="btn btn-primary">

        </div>
      </div>

    </form>

    <div>
      <ul id="v-for-object" class="translated">
        <li v-for="value in object">
          {{ value }}
        </li>
      </ul>
      <!-- <ul v-for="body in message.body">{{ body }}</ul> -->
    </div>

  </div>

</template>

<style>

</style>

<script>
var axios = require('axios');

// function resetForm() {
//   document.getElementById("myForm").reset();
// }

export default {
  data: function() {
    return {
      newMessageBody: "",
      message: {
                body: []
      },
      errors: []
    };
  },
  created: function() {
    axios.get("/api/messages")
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
          this.message.body.push(response.data);

        }).catch(error => {
          this.errors = error.response.data.errors;
          console.log(error.response.data.errors);
        });
    }
  }
};
</script>
