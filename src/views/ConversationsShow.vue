<template>
  <div class="conversations-show">
    <h1>{{ conversation.name}}</h1>
    <div v-for="user in conversation.users" class="members">
      <img :src="user.image_url">
    </div>
      <form v-on:click="goBack()">
        <div class="new-button">
          <input type="button" value="GO BACK TO CHATS" class="btn">
        </div>
      </form>
      <form v-on:click="destroyMessage()">
        <div class="new-button">
          <input type="button" value="DELETE ALL MESSAGES" class="btn">
        </div>
      </form>
    <ul>
      <div v-for="error in errors">{{ error }}</div>
    </ul>
    <form v-on:submit.prevent="sendMessage()">
      <div>
        <input v-model="textToTranslate" placeholder="Type your message here">
      </div>
      <div class="new-button">
        <input type="submit" value="SEND" class="btn">
      </div>
    </form>
    <ul class="example1 square scrollbar-dusty-grass square thin">
      <div v-for="user in conversation.users">
        <div v-for="message in conversation.messages" class="myMessage"> {{ message.body }} <img :src="user.image_url">
        </div>
      </div>
    </ul>
  </div>
</template>

<style>
  .conversations-show {
    padding-top: 10%;
  }

  h1 {
    font-family: "Source Sans Pro", Helvetica, Arial, sans-serif;
    font-size: 40px;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: black;
    padding: 10px;
  }

  .app {
    text-align: center;
  }

  /*  .img {
      overflow: hidden;
      width: 400px;
      height: 120px;
    }
  */
  .btn {
      margin: 5px;
      border-radius: 0;
      padding: 5px 5px;
      float: center;
      font-family: "Source Sans Pro", Helvetica, Arial, sans-serif;
      color: white;
      text-transform: uppercase;
      font-weight: 900;
      background-color: #868e96;
      border-color: #868e96;
  }

  .scrollbar-ripe-malinka::-webkit-scrollbar {
    width: 12px;
    background-color: #F5F5F5;
  }

  .example1 {
    position: relative;
    overflow-y: scroll;
    height: 500px;
  }

  .myMessage {
    font-family: "Source Sans Pro", Helvetica, Arial, sans-serif;
    font-size: 15px;
    border: 2px solid #dedede;
    background-color: #f1f1f1;
    border-radius: 10px;
    border-color: #5A5656;
    display: block;
    clear: both;
    color: black;
    float: right;
    margin: 2px;
    padding-left: 5px;
    padding-top: 5px;
  }

  .row img.right {
    float: right;
    margin-left: 20px;
    margin-right:0;
    padding: 0;
    border-radius: 50%
  }

  .myMessage img {
    height: 70px;
    width: 40px;
    padding-top: 2px;
    border-radius: 100%;
    margin-left: 5px;
    margin-right: 5px;
  }

</style>

<script>
var axios = require('axios');

export default {

  data: function() {
    return {
      textToTranslate: "",
      language: "",
      users: [],
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
      axios.get("/api/users" + this.$route.params.id)
      console.log(this.conversation);

    });
  },

  methods: {
    sendMessage:function() {
      console.log("Create a Message....");
      var newSearchTerm = this.textToTranslate.replace(/ /g, '%20');
      var params = {
                    conversation_id: this.$route.params.id,
                    body: newSearchTerm
                    };
      axios.post("/api/messages", params)
        .then(response => {
            this.conversation.messages.push(response.data);
            this.textToTranslate = "";
            console.log(response.data.body)
          }).catch(error => {
            this.errors = error.response.data.errors;
            console.log(response.data.errors)
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