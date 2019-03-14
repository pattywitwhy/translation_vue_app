<template>
  <div class="messages-index">
    <h1>MESSAGES</h1>
    <ul>
      <div v-for="error in errors">{{ error }}</div>
    </ul>
    <form v-on:submit.prevent="submit()">
      <div>
        <input v-model="newMessageBody">
      </div>
      <div class="new-button">
        <input type="submit" value="SEND" class="btn btn-primary">
      </div>
    </form>
    <p></p>
    <div>
      <form v-on:click="destroyMessage()">
        <div class="new-button">
          <input type="submit" value="DELETE ALL MESSAGES" class="btn btn-primary">
        </div>
      </form>
      
    </div>
    <div>
      <div v-for="message in messages" class="myMessage">{{ message.body }}<img src="https://media.licdn.com/dms/image/C4E03AQEgfHpB_j-HKw/profile-displayphoto-shrink_200_200/0?e=1557964800&v=beta&t=8-QhX9uE-6PlLsdTuDrweNbUrpN3tugQpfqdnBHmokY">
      </div>
    </div>
  </div>

</template>

<style>
  .myMessage {
    border: 2px solid #dedede;
    background-color: #f1f1f1;
    border-radius: 5px;
    display: block;
    clear:both;
    color: black;
    float: right;
    margin: 10px;
    padding: 5px;
  }
/*  .container img {
    float: left;
    max-width: 60px;
    width: 100%;
    margin-right: 20px;
    border-radius: 50%;
  }*/

  .row img.right {
    float: right;
    margin-left: 20px;
    margin-right:0;
  }

  img {
    width: 25px;
    border-radius: 5px;
    margin-left: 10px;
    margin-right: 10px;
    margin-top: 4px;

  }

</style>

<script>
var axios = require('axios');

export default {
  data: function() {
    return {
      newMessageBody: "",
      messages: [],
      errors: []
    };
  },
  created: function() {
    // need to get the specific messages for the specific conversation only. no point in showing all the messages in all the conversations
    axios.get("/api/messages/")
      .then(response => {
      // console.log(response.data);
      this.messages = response.data;
    });
  },
  methods: {
    submit: function() { 
      console.log("Create a Message....");
      var params = {
                    conversation_id: this.$route.params.id,
                    body: this.newMessageBody
                    };

      axios.post("/api/messages", params)
        .then(response => {
          console.log("Success", response.data);
          this.messages.push(response.data);
          this.newMessageBody = "";
        });
    },

    destroyMessage: function() {
      axios.delete("/api/messages/" + this.$route.params.id)
        .then(response => {
          console.log("Success", response.data);
          this.$router.push("/conversations/" + this.conversation_id);
        });
    }
  }
};
</script>



