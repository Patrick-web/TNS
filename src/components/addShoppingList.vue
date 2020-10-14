<template>
  <div class="addForm mainCont">
    <p class="containerTitle saveTitle">Create Shopping List</p>
    <p class="containerTitle editTitle">Edit Shopping List</p>
    <div class="formGroups">
      <div class="fgroup">
        <label class="nt">Name</label>
        <input
          v-on:keyup.enter="focusOnBudget"
          name="listName"
          id="shoppingListName"
        />
      </div>
      <div class="fgroup">
        <label class="nt">Budget</label>
        <input
          v-on:keyup.enter="emitOrEdit"
          inputmode="numeric"
          name="budget"
          id="budget"
        />
      </div>
    </div>

    <div class="save saveBtn" v-on:click="emitList">
      <p>Save</p>
      <img src="@/assets/save-white.svg" alt="" />
    </div>
    <div class="save editBtn" v-on:click="editList">
      <p>Edit</p>
      <img src="@/assets/save-white.svg" alt="" />
    </div>
  </div>
</template>

<script>
import { uuid } from "uuidv4";
export default {
  name: "addSticky",
  data() {
    return {};
  },
  methods: {
    focusOnBudget() {
      document.querySelector("#budget").focus();
    },
    emitOrEdit() {
      if (document.body.classList.contains("edittingList")) {
        this.editList();
      } else {
        this.emitList();
      }
    },
    emitList() {
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

      const listName = document.querySelector("#shoppingListName").value;
      const listBudget = document.querySelector("#budget").value;
      const newList = {
        id: uuid(),
        name: listName,
        date: date,
        budget: parseInt(listBudget),
        items: [],
      };
      document.body.classList.toggle("addingSomething");
      document.querySelector("#shoppingListName").value = "";
      document.querySelector("#budget").value = "";
      if (listName != "" && listBudget != "") {
        this.$emit("addOrEditList", newList);
      }
      this.budget = "";
      this.listName = "";
    },
    editList() {
      document.body.classList.remove("edittingList");
      document.body.classList.remove("addingSomething");
      let newName = document.querySelector("#shoppingListName");
      let newBudget = document.querySelector("#budget");
      const edittedList = {
        name: newName.value,
        budget: parseInt(newBudget.value),
      };
      newName.value = "";
      newBudget.value = "";
      const index = parseInt(JSON.parse(localStorage.getItem("tlIndex")));
      this.$emit("addOrEditList", edittedList, index);
    },
  },
};
</script>

<style>
.editTitle {
  display: none !important;
}
.mainCont {
  /* height: 40% !important; */
}
.formGroups {
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-content: center;
  height: 70%;
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

.editBtn {
  display: none;
}
.edittingList .editBtn {
  display: flex;
}
.edittingList .saveBtn {
  display: none;
}
.edittingList .editTitle {
  display: flex !important;
}
.edittingList .saveTitle {
  display: none;
}
.editBtnn .saveBtnn {
  display: none;
}
.stickyOptions {
  position: relative;
  margin-top: 10px;
  text-align: center;
}
.btnn img {
  width: 25px;
  margin-left: 10px;
}
.fgroup {
  width: 100%;
  padding: 10px;
}
.fgroup label {
  display: block;
  margin-left: 0px;
  font-weight: 300;
}
.fgroup input {
  outline: none;
  font-weight: 300;
  width: 100%;
  display: block;
  background: white;
  border: none;
  font-size: 1.3rem;
  border-bottom: 1px solid rgb(119, 119, 119);
}
.overlay {
  z-index: 6;
  position: fixed;
  height: 100%;
  width: 100%;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(48, 1, 56, 0.842);
}
@media (min-width: 700px) {
  .formGroups {
    height: 58%;
    justify-content: space-evenly;
  }
}
</style>