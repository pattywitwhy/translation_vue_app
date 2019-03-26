<template>
  <div class="home">
    <ul>
      <li v-for="error in errors">{{ error }}</li>
    </ul>
    <div class="img">
      <img :src="user.image_url" alt="">
    </div>
    <div class="container">
      <form v-on:submit.prevent="submit()">
        <div class="photo">
          Profile Picture: <input type="file" v-on:change="setFile($event)" ref="fileInput">
        </div>
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
  img {
    height:200px;
    width:160px;
    border-radius: 100px;
    margin-top: 2px;
    padding-bottom: 20px;
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
            image: "",
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
      var params = new FormData();
      params.append("id", this.user.id);
      params.append("image", this.user.image);
      params.append("name", this.user.name);
      params.append("email", this.user.email);
      params.append("preferred_language", this.user.preferred_language);
      params.append("phone_number", this.user.phone_number);

      axios.patch("/api/users/" + this.user.id, params)
        .then(response => {
          this.user = response.data;
          this.image = "";
          this.$refs.fileInput.value = "";
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
    },

    setFile: function(event) {
      if (event.target.files.length > 0) {
        this.user.image = event.target.files[0];
      }
    }
  }
};
</script>