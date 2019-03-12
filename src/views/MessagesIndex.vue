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

    {{ message.body }}
  </div>

<!--   <div>
    <li v-for="message in body.message" v-bind:class=""></li>
  </div> -->


<!--   <div>
        <li v-for="item in list.items" v-bind:class="{complete: item.completed}" v-on:click="toggleItemComplete(item)">{{ item.name }}</li>
      </div>
      <div id="action-buttons"> 
        <router-link style="margin: 8px" class="btn btn-info" :to="'/lists/' + list.id + '/edit'">Edit List</router-link>
        <button class="btn btn-info" v-on:click="destroyList()">Delete List</button>
      </div> -->

</template>

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
