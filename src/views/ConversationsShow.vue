<template>
  <div class="conversations-show">
    <h1 id="conversation-name">{{ conversation.name}}</h1>
    <div class="row">
      <div v-for="user in conversation.users" class="col-sm card-deck">
        <img id="members-pic" :src="user.image">
      </div>
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
        <select class="form" v-model="language">
          <option value="ru">Russian</option>
          <option value="es">Spanish</option>
          <option value="fr">French</option>
          <option value="zh">Chineese</option>
          <option value="ko">Korean</option>
        </select>
      </div>
      <div class="new-button">
        <input type="submit" value="SEND" class="btn">
      </div>
    </form>
    <ul class="scroll-bar">
      <div v-for="message in conversation.messages" class="styled-message" v-bind:class="{myMessage: userId == message.user.id, theirMessage: userId != message.user.id}"> {{ message.body }} <img :src="message.user.image">
      </div>
    </ul>
  </div>
</template>

<style>
  .conversations-show {
    padding-top: 10%;
  }

  #members-pic {
    height: 100px;
    width: 100px;
    padding-top: 2px;
    border-radius: 50% 50% 50% 50%;
  }

  #conversation-name {
    font-family: Avantgarde;
    font-size: 50px;
    font-style: normal;
    font-variant: normal;
    font-weight: 700;
    line-height: 26.4px;
    padding: 10px;
  }

  .row {
    margin-left: 100px;
  }


  .app {
    text-align: center;
  }

  .btn {
      margin: 5px;
      float: center;
      font-family: "Source Sans Pro", Helvetica, Arial, sans-serif;
      font-size: 9px;
      color: white;
      text-transform: uppercase;
      font-weight: 600;
      background-color: #51546f;
      border-color: #51546f;
      border-radius: 2px;
  }

  .new-button{
    padding: .5px .5px .5px .5px;
  }

  .scrollbar-ripe-malinka::-webkit-scrollbar {
    width: 12px;
    background-color: #F5F5F5;
  }

  .scroll-bar {
    padding-top: 25px;
    position: relative;
    overflow-y: scroll;
    height: 500px;
  }

  .styled-message {
    font-family: "Source Sans Pro", Helvetica, Arial, sans-serif;
    font-size: 15px;
    border: 2px solid #dedede;
    background-color: #f1f1f1;
    border-radius: 10px;
    border-color: #5A5656;
    display: block;
    clear: both;
    color: black;
    margin: 2px;
    padding-left: 5px;
    padding-top: 5px;
  }

  .myMessage {
    float: right;
  }

  .theirMessage {
    float: left;
  }

  .styled-message img {
    height: 30px;
    width: 30px;
    padding-top: 2px;
    padding-bottom: 2px;
    border-radius: 50% 50% 50% 50%;
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
                                  user: {
                                          id: "",
                                          image: ""
                                        }                                  
                                }
                              ]
      },
      errors: [],
      userId: ""
    };
  },

  created: function() {
    this.userId = localStorage.getItem("userId");
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