<template>
  <div class="conversations-show">
    <h1>MESSAGES</h1>
    <div>
      <form v-on:click="destroyMessage()">
        <div class="new-button">
          <input type="button" value="DELETE ALL MESSAGES" class="btn btn-primary">
        </div>
      </form>
    </div>

    <form v-on:click="goBack()">
      <div class="new-button">
        <input type="button" value="GO BACK TO CHATS" class="btn btn-primary">
      </div>
    </form>

    <ul>
      <div v-for="error in errors">{{ error }}</div>
    </ul>
    <form v-on:submit.prevent="submit()">
      <div>
        <input v-model="newMessageBody" placeholder="type your message here">
      </div>
      <div class="new-button">
        <input type="submit" value="SEND" class="btn btn-primary">
      </div>
    </form>

      <div v-for="message in conversation.messages" class="myMessage"> {{ message.body }} <img src="https://media.licdn.com/dms/image/C4E03AQEgfHpB_j-HKw/profile-displayphoto-shrink_200_200/0?e=1557964800&v=beta&t=8-QhX9uE-6PlLsdTuDrweNbUrpN3tugQpfqdnBHmokY">
      </div>
        
    </div>
  </div>
</template>

<style>
  .myMessage {
    border: 2px solid #dedede;
    background-color: #f1f1f1;
    border-radius: 10px;
    display: block;
    clear: both;
    color: black;
    float: right;
    margin: 10px;
    padding-left: 8px;
    padding-bottom: 5px;
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
      conversation_id: "",
      conversation: {
                    id: "",
                    name: "",
                    messages: [
                                {
                                  id: "",
                                  body: "",
                                  user_id: "",
                                  conversation_id: ""
                                }
                              ]
      },
      errors: []
    };
  },
  created: function() {
    axios.get("/api/conversations/" + this.$route.params.id )
      .then(response => {
      this.conversation = response.data;
      console.log(this.conversation);
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
          this.conversation.messages.push(response.data);
          this.newMessageBody = "";
          console.log("nice")
        });
    },

    destroyMessage: function() {
      axios.delete("/api/conversations/" + this.$route.params.id)
        .then(response => {
          console.log("Success", response.data);
          this.$router.push("/conversations");
        });
    },

    goBack: function() {
      axios.get("/api/conversations/")
        .then(response => {
          console.log("Success", response.data);
          this.$router.push("/conversations");
          console.log(response.data)
        });
    }
  }
};
</script>