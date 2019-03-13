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
    <p></p>
    <div>
      <div class="containter">
        <div class="myMessage">
          <span>
            <ul v-for="message in message.body">{{ message.body }}<img src="https://media.licdn.com/dms/image/C4E03AQEgfHpB_j-HKw/profile-displayphoto-shrink_200_200/0?e=1557964800&v=beta&t=8-QhX9uE-6PlLsdTuDrweNbUrpN3tugQpfqdnBHmokY"></ul>
          </span>
        </div>
      </div>
    </div>
  </div>

</template>

<style>
  .myMessage, {
      display: block;
      clear:both;
  }
  .myMessage span {
      border: 2px solid #dedede;
      background-color: #f1f1f1;
      border-radius: 5px;
      color: black;
      padding: 10px 5px;
      float: right;
  }
/*  .container img {
    float: left;
    max-width: 60px;
    width: 100%;
    margin-right: 20px;
    border-radius: 50%;
  }*/

  .container img.right {
    float: right;
    margin-left: 20px;
    margin-right:0;
  }

  img {
    width: 25px;
    border-radius: 5px;
    margin-left: 20px;

  }

</style>

<script>
var axios = require('axios');

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
