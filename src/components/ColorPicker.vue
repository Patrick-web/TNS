<template>
  <div :id="showAllColors" class="colorPicker">
    <div
      class="invisible"
      v-if="!showAllColors"
      @click="showAllColors = true"
    ></div>
    <div
      @click="selectColor('clr1')"
      v-if="color == 'clr1' || showAllColors"
      class="colorBlock clr1"
    ></div>
    <div
      @click="selectColor('clr2')"
      v-if="color == 'clr2' || showAllColors"
      class="colorBlock clr2"
    ></div>
    <div
      @click="selectColor('clr3')"
      v-if="color == 'clr3' || showAllColors"
      class="colorBlock clr3"
    ></div>
    <div
      @click="selectColor('clr4')"
      v-if="color == 'clr4' || showAllColors"
      class="colorBlock clr4"
    ></div>
    <div
      @click="selectColor('clr5')"
      v-if="color == 'clr5' || showAllColors"
      class="colorBlock clr5"
    ></div>
    <vs-button
      v-if="showAllColors"
      @click="showAllColors = false"
      id="closePicker"
      relief
      icon
      danger
    >
      <i class="bx bx-x"></i>
    </vs-button>
  </div>
</template>

<script>
export default {
  data() {
    return {
      showAllColors: false,
    };
  },
  methods: {
    selectColor(color) {
      this.$emit("colorPick", color);
      this.showAllColors = false;
    },
  },
  props: {
    color: String,
  },
};
</script>

<style>
#closePicker {
  position: absolute;
  top: 0;
  right: 0;
  transform: translate(130%, -5%);
}
.colorPicker {
  position: absolute;
  top: 0px;
  right: 0px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 50px;
  transition: 0.2s ease;
  transform: translate(0%, -50%);
  box-shadow: 0px 0px 5px rgba(0, 0, 0, 0.247);
  height: 50px;
  width: 50px;
}
.invisible {
  position: absolute;
  width: 100%;
  height: 100%;
  z-index: 4;
  background: none;
}
#true {
  transform: translate(-50%, -100%);
  background: #ffffff;
  left: 50%;
  height: 40px;
  width: 70%;
  top: 20px;
  right: -5px;
  box-shadow: 2px 2px 5px rgba(0, 0, 0, 0.5);
}
.colorBlock {
  height: 30px;
  width: 30px;
  border-radius: 20px;
  clip-path: circle(50% at 50% 50%);
  transform: translateY(-50%);
  cursor: pointer;
  z-index: 3;
  margin-left: 10px;
  margin-right: 10px;
  margin-top: 30px;
  transition: 0.2s ease;
}
.clr1 {
  background: #1dcaff;
}
.clr2 {
  background: #f4947e;
}
.clr3 {
  background: rgb(245, 208, 46);
}
.clr4 {
  background: #000000;
}
.clr5 {
  background: #9200e7;
}
@media (min-width: 700px) {
  #true {
    transform: translate(-50%, -150%);
    background: #ffffff;
    left: 50%;
    height: 60px;
    width: 350px;
    top: 20px;
    right: -5px;
    box-shadow: 2px 2px 5px rgba(0, 0, 0, 0.5);
  }
  .colorPicker {
    height: 55px;
    width: 55px;
  }
  .colorBlock {
    margin-top: 35px;
    height: 35px;
    width: 35px;
  }
  #closePicker {
    transform: translate(130%, 20%);
  }
}
</style>