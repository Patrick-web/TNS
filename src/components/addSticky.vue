<template>
  <div class="addForm">
    <p class="containerTitle">Create Sticky Note</p>
    <p class="nt">Sticky</p>
    <textarea v-model="note" name="" id="noteEntry"></textarea>

    <div class="save" v-on:click="saveNote">
      <p>Save</p>
      <img src="@/assets/save-white.svg" alt="" />
    </div>
  </div>
</template>

<script>
import { uuid } from "uuidv4";
export default {
  name: "addSticky",
  data() {
    return {
      note: "",
    };
  },
  methods: {
    saveNote() {
      console.log(uuid());
      const today = new Date();
      const date = `${today.getDate()}-${
        today.getMonth() + 1
      }-${today.getFullYear()}`;
      const timeOfDay = today.getHours() > 12 ? "PM" : "AM";
      const hour =
        today.getHours() > 12 ? today.getHours() - 12 : today.getHours();
      const minutes =
        today.getMinutes() < 10 ? `0${today.getMinutes()}` : today.getMinutes();
      const time = `${hour}:${minutes} ${timeOfDay}`;
      const newNote = {
        note: this.note,
        date: date,
        time: time,
        id: uuid(),
      };
      document.body.classList.toggle("addingSomething");
      document.querySelector("#noteEntry").value = "";
      if (this.note != "") {
        this.$emit("addSticky", newNote);
      }
    },
  },
};
</script>

<style lang="scss">
.addForm {
  background: linear-gradient(150deg, #ffffff, rgb(255, 255, 255));
  height: 280px;
  width: 94vw;
  margin: auto;
  margin-left: 10px;
  padding: 0px;
  border-radius: 2px;
  text-align: center;
  border-radius: 20px;
  overflow: hidden;
  left: 50%;
  top: -50%;
  transform: translate(-50%, -50%);
  transition: 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275);
  z-index: 8;
  position: fixed;
}
.containerTitle {
  background: rgb(146, 0, 243);
  font-family: Arial, Helvetica, sans-serif;
  font-size: 1.3rem;
  color: white;
  padding: 8px;
  border-radius: 0px;
  font-weight: 300;
  width: 100%;
  margin: 0px;
  margin-top: 0px;
}
.nt {
  color: rgb(49, 49, 49);
  margin-bottom: 5px;
  font-size: 1.3rem;
  text-align: left;
  margin-top: 5px;
  margin-left: 10px;
  font-weight: 300;
}
#noteEntry {
  width: 94%;
  height: 50%;
  background: rgb(216, 216, 216);
  border-radius: 0px;
  padding: 10px;
  color: rgb(34, 34, 34);
  font-size: 1.2rem;
  outline: none;
  border: none;
  font-weight: 300;
}
.save {
  padding: 5px;
  width: 120px;
  background: rgb(1, 180, 120);
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 1.6rem;
  color: white;
  border-radius: 20px;
  text-align: center;
}
.stickyOptions {
  position: relative;
  margin-top: 0px;
  text-align: center;
  display: flex;
  justify-content: center;
  align-items: center;
}
.save img {
  width: 25px;
  margin-left: 10px;
}
@media (min-width: 600px) {
  .addForm {
    width: 50%;
    height: 80%;
  }
  .addingSomething .addSticky {
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
  }
  #noteEntry {
    height: 58%;
    width: 100%;
    background: rgb(255, 255, 255);
  }
  .save {
    margin: 0;
    border-radius: 0;
    width: 100%;
    height: 15%;
    margin-top: -5px;
    cursor: pointer;
    font-weight: 800;
    overflow: hidden;
    img {
      transform: translateX(-200%) translateY(200%);
      transition: 0.1s;
    }
    p {
      transform: translateX(20%);
      transition: 0.1s;
    }
  }
  .save:hover {
    p {
      transform: translateY(-200%) translateX(20%);
    }
    img {
      transform: scale(1.1) translateX(-150%) translateY(0%);
    }
  }
  .nt {
    display: none;
  }
  .containerTitle {
    height: 150px;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: default;
    box-shadow: 2px 2px 5px rgba(0, 0, 0, 0.349);
    font-weight: 800;
  }
}
</style>