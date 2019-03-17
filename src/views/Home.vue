<template>
  <div class="home">

    <!-- <div class="picture">
      <form v-on:submit.prevent="submit()">
        <div>
          Profile Picture: <input type="file" v-on:change="setFile($event)" ref="fileInput">
        </div>
        <input type="submit" value="Go">
      </form>
      <div v-for="profile in profiles">
        <h2>{{profile.name}}</h2>
        <img :src="profile.image_url" alt="">
      </div>
    </div> -->

    <ul>
      <li v-for="error in errors">{{ error }}</li>
    </ul>

    <div class="container">
      <form v-on:submit.prevent="submit()">
        <div>
          Profile Picture: <input type="file" v-on:change="setFile($event)" ref="fileInput">
        </div>
        <input type="submit" value="Go">

        <div v-for="profile in profiles">
          <img :src="profile.image_url" alt="">
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
          <label>Password</label>
          <input type="password" class="form-control" v-model="user.password">
        </div>
        <div class="form-group">
          <label>Preferred Language</label>
          <input type="preferred_language" class="form-control" v-model="user.preferredLanguage">
        </div>
        <div class="form-group">
          <label>Phone Number</label>
          <input type="phone_number" class="form-control" v-model="user.phoneNumber">
        </div>
        <input type="submit" class="btn btn-primary" value="Save">
      </form>
    </div>
    
    <button class="btn btn-secondary" v-on:click="chatroom()">Chatrooms</button>

  </div>

</template>

<style>
</style>

<script>
var axios = require('axios');

export default {
  data: function() {
    return {
      profiles: [],
      newImage: "",
      user: {
            id: "",
            name: "",
            email: "",
            password: "",
            preferredLanguage: "",
            phoneNumber: ""
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
      console.log("Update profile...")
      var profileParams = new FormData();
      profileParams.append("image", this.newImage);
      
      var params = {
                    name: this.user.name,
                    email: this.user.email,
                    password: this.user.password,
                    preferredLanguage: this.user.preferredLanguage,
                    phoneNumber: this.user.phoneNumber
                  };

      axios.patch("/api/users/" + this.user.id, params)
        .then(response => {
          this.$router.push("/home");
          console.log("saved")
        }).catch(error => {
          console.log(error.response.data.errors);
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
        this.newImage = event.target.files[0];
      }
    }
  }
};
</script>