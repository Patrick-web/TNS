<template>
  <div class="signup auth page">
    <titleBar title="SignUp" />
    <vs-dialog blur v-model="active">
      <vs-input v-model="email" placeholder="Email">
        <template #icon> @ </template>
      </vs-input>
      <br />
      <vs-input type="password" v-model="password" placeholder="Password">
        <template #icon>
          <box-icon name="lock" type="solid"></box-icon>
        </template>
      </vs-input>
      <br />
      <div class="footer-dialog">
        <vs-button block @click="signup"> Sign Up </vs-button>
        <div class="new"><router-link to="/">Login Instead</router-link></div>
      </div>
    </vs-dialog>
  </div>
</template>

<script>
import titleBar from "@/components/titleBar.vue";
import * as firebase from "firebase/app";
import "firebase/auth";
export default {
  data() {
    return {
      active: true,
      email: "",
      password: "",
      error: "",
    };
  },
  components: {
    titleBar,
  },
  methods: {
    signup() {
      const user = firebase
        .auth()
        .createUserWithEmailAndPassword(this.email, this.password)
        .then((cred) => {
          console.log(cred);
          this.$router.replace({ name: "stickys" });
        })
        .catch((err) => {
          const noti = this.$vs.notification({
            position: "top-center",
            color: "danger",
            title: "Error",
            text: err.message,
          });
        });
    },
  },
  mounted() {
    document.querySelector("#nav").style.display = "none";
  },
};
</script>

<style lang="scss">
</style>