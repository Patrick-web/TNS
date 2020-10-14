<template>
  <div class="main-container">
    <transition
      enter-active-class="animated fadeInUp"
      leave-active-class="animated fadeOutDown veryFast"
    >
      <router-view />
    </transition>
    <div class="cover"></div>
    <div class="navWrapper">
      <navbar />
    </div>
  </div>
</template>

<script>
import titleBar from "@/components/titleBar.vue";
import navbar from "@/components/navbar.vue";
export default {
  components: {
    navbar,
    titleBar,
  },
  methods: {},
  created() {
    // alert("rendered")
    if (this.$router.currentRoute.path != "/") {
      this.$router.push("/");
    }
    document.body.classList.add("view=Notes");
  },
};
</script>

<style>
@import "./assets/animate.css";
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  font-family: Arial, Helvetica, sans-serif;
}
body {
  background: #f5f5f5;
  position: relative;
  height: 100vh;
  width: 100%;
  overflow: hidden;
}
::-webkit-scrollbar {
  display: none;
}
.navWrapper {
  position: relative;
  height: 100vh;
  width: 100vw;
}
img:hover {
  cursor: pointer;
}
.page {
  position: absolute !important;
  width: 100vw;
  z-index: 2;
}
.addingSomething .addImg {
  transform: rotate(225deg);
  margin-left: -2px;
  margin-top: -2px;
}
.addingSomething #nav {
  display: none;
}
#alert,
#sticky {
  position: absolute;
  width: 40px;
  padding: 5px;
}
#alert {
  left: 10px;
}
#sticky {
  right: 10px;
  width: 50px;
}
.cover {
  position: fixed;
  top: 0;
  height: 100vh;
  background: rgba(64, 0, 70, 0.356);
  width: 100%;
  transform: scaleY(0);
  transform-origin: bottom;
  transition: 50ms;
  z-index: -1;
}
.note-expanded .cover {
  transform: scaleY(1);
}
.listExpanded .cover {
  transform: scaleY(1);
}
.note-expanded #addBt {
  display: none;
}
</style>
