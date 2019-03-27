<template>
  <div class="home">
    <ul>
      <li v-for="error in errors">{{ error }}</li>
    </ul>
    <div>
      <img id="profile-image" :src="user.image">
    </div>

    <div class="container">
      <form v-on:submit.prevent="submit()">
        <div class="form-group">
          <label>Name</label> 
          <input type="text" class="form-control" v-model="user.name">
        </div>
        <div class="form-group">
          <label>Email</label>
          <input type="email" class="form-control" v-model="user.email">
        </div>
        <div class="form-group">
          <label>Preferred Language</label>
          <input type="preferred_language" class="form-control" v-model="user.preferred_language">
        </div>
        <div class="form-group">
          <label>Phone Number</label>
          <input type="phone_number" class="form-control" v-model="user.phone_number">
        </div>
        <input type="submit" class="btn btn-primary" value="Save">
      </form>
    </div>
    
    <button class="btn" v-on:click="chatroom()">Chatrooms</button>

  </div>

</template>

<style>
  #profile-image {
    height: 250px;
    width: 250px;
    padding-top: 2px;
    border-radius: 70% 70% 70% 70%;
    margin-left: 5px;
    margin-right: 5px;
  }

  .btn {
    margin: 30px 0;
    border-radius: 0;
    padding: 10px 25px;
    float: center;
    font-family: "Source Sans Pro", Helvetica, Arial, sans-serif;
    color: white;
    text-transform: uppercase;
    font-weight: 900;
    background-color: #868e96;
    border-color: #868e96;
  }

  .btn:hover {
    background-color: #ffffff;
    color: #fff;
  }

</style>

<script>
var axios = require('axios');

export default {
  data: function() {
    return {
      user: {
            id: "",
            // image: "",
            name: "",
            email: "",
            preferred_language: "",
            phone_number: ""
      },
      errors: [] 
    };
  },

  created: function () {
    var userId = localStorage.getItem("userId");
    axios.get("/api/users/" + userId)
      .then(response => {
      console.log(response.data);
      this.user = response.data;
    });
  },

  methods: {
    submit: function() {
      var params = {
                    id: this.user.id,
                    // image: this.user.image,
                    name: this.user.name,
                    email: this.user.email,
                    preferred_language: this.user.preferred_language,
                    phone_number: this.user.phone_number
      }

      axios.patch("/api/users/" + this.user.id, params)
        .then(response => {
          this.user = response.data;
          this.$router.push("/home");
        }).catch(error => {
          console.log(error.response.data.errors);
          this.user.push(response.data);
          this.$router.push("/home")
        });
    },

    chatroom: function() {
      axios.get("/api/conversations/")
        .then(response => {
          this.$router.push("/conversations")
        });
    }
  }
};
</script>