<template>
  <div class="home">
    <!-- <h1>{{ message }}</h1> -->
    <ul>
      <li v-for="error in errors">{{ error }}</li>
    </ul>
    <div class="container">
      <form v-on:submit.prevent="submit()">
        <div></div>
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
            name: "",
            email: "",
            preferred_language: "",
            phone_number: ""
      },
      errors: [] 
    };
  },
  created: function () {
    axios.get("/api/users/" + this.$route.params.id)
    .then(response => {
      console.log(response.data);
      this.user = response.data;
    });
  },
  methods: {
    submit: function() {
      console.log("Update profile...")
      var params = {
                    name: this.user.name,
                    email: this.user.email,
                    preferred_language: this.user.preferred_language,
                    phone_number: this.user.phone_number
                  };
      axios.patch("/api/users/" + this.user.id, params)
        .then(response => {
          this.$router.push("/home");
          console.log("saved")
        }).catch(error => {
          this.$router.push("/home")
        });
        console.log("something went wrong");
    }
  }
};
</script>