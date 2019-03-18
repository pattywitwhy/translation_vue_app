<template>
  <div class="home">
    <ul>
      <li v-for="error in errors">{{ error }}</li>
    </ul>

    <div class="container">
      <form v-on:submit.prevent="submit()">
        <div>
          Profile Picture: <input type="file" v-on:change="setFile($event)" ref="fileInput">
        </div>
          <img :src="user.image_url" alt="">
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
      user: {
            id: "",
            image: "",
            name: "",
            email: "",
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
      // var profileParams = new FormData();
      // profileParams.append("image", this.user.image);
      
      var params = {
                    image: this.user.image,
                    name: this.user.name,
                    email: this.user.email,
                    // password: this.user.password,
                    preferredLanguage: this.user.preferredLanguage,
                    phoneNumber: this.user.phoneNumber
                  };

      axios.patch("/api/users/" + this.user.id, params)
        .then(response => {
          // this.$refs.fileInput.value = "";
          this.$router.push("/home");
          this.user = response.data
          console.log("saved")
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