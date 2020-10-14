<template>
  <div class="auth page">
    <titleBar title="Login" />
    <vs-dialog blur v-model="active">
      <vs-input v-model="email" placeholder="Email">
        <template #icon> @ </template>
      </vs-input>
      <vs-input type="password" v-model="password" placeholder="Password">
        <template #icon>
          <i class="bx bxs-lock"></i>
        </template>
      </vs-input>
      <div class="flex">
        <vs-checkbox v-model="checkbox">Remember me</vs-checkbox>
        <a href="#">Forgot Password?</a>
      </div>
      <div class="footer-dialog">
        <vs-button animation-type="vertical" block @click="signIn">
          Login
          <template #animate>
            <i class="bx bxs-lock-open"></i>
          </template>
        </vs-button>

        <div class="new">
          <router-link replace to="/signup">Create New Account</router-link>
        </div>
      </div>
      <!-- <button @click="signIn">Login</button> -->
    </vs-dialog>
  </div>
</template>

<script>
import titleBar from "@/components/titleBar.vue";
import * as firebase from "firebase/app";
import "firebase/auth";
export default {
  components: {
    titleBar,
  },
  data() {
    return {
      active: true,
      email: "",
      password: "",
      error: "",
      checkbox: false,
    };
  },
  methods: {
    signIn() {
      const loading = this.$vs.loading({ type: "circles" });
      const user = firebase
        .auth()
        .signInWithEmailAndPassword(this.email, this.password)
        .then((cred) => {
          loading.close();
          console.log(cred);
          this.$router.replace({ name: "stickys" });
        })
        .catch((err) => {
          loading.close();
          const noti = this.$vs.notification({
            icon: "<box-icon type='solid' name='error'></box-icon>",
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
.auth {
  text-align: center;
  input {
    width: 100%;
  }
  .vs-icon-close {
    display: none;
  }
  .vs-dialog-content {
    background: none;
    pointer-events: none;
  }
  .vs-dialog {
    pointer-events: all;
  }
}
.vs-checkbox-mask {
  text-align: justify;
}
a {
  color: rgb(26, 92, 255);
  text-decoration: none;
  font-size: 0.8em;
}

.centerFlex {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 80vh;
  width: 90%;
}
@media (min-width: 700px) {
  .centerFlex {
    width: 50%;
  }
}
</style>