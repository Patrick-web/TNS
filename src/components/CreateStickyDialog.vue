<template>
  <div class="StickyDiaolog">
    <vs-dialog width="300px" not-center v-model="showDialog">
      <template #header>
        <h4 class="not-margin">Go ahead, Write!!</h4>
      </template>

      <div class="con-content">
        <textarea
          @keyup="textAreaAdjust()"
          placeholder="Begin here..."
          v-model="note"
          name=""
          style="overflow: hidden"
          id="stickyBox"
        ></textarea>
      </div>

      <template #footer>
        <div class="con-footer">
          <vs-button @click="createSticky" flat block> Am Done </vs-button>
          <vs-button @click="showDialog = false" danger block flat>
            Cancel
          </vs-button>
        </div>
      </template>
    </vs-dialog>
    <vs-button
      v-if="!showDialog"
      @click="showDialog = true"
      id="fab"
      circle
      icon
      floating
    >
      <i class="bx bx-plus"></i>
    </vs-button>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import { uuid } from "uuidv4";

export default {
  data: () => ({
    active: false,
    active2: false,
    active3: false,
    input1: "",
    note: "",
    showDialog: false,
  }),
  methods: {
    ...mapActions(["addSticky"]),
    textAreaAdjust() {
      const element = document.querySelector("#stickyBox");
      if (element.scrollHeight < 300) {
        element.style.height = "1px";
        element.style.height = 1 + element.scrollHeight + "px";
      } else {
        element.style.overflow = "scroll";
      }
    },
    createSticky() {
      const newSticky = {
        content: this.note,
        createdAt: new Date.today(),
        formattedDate: new Date.today().toString("MMMM dS, yyyy"),
        formattedTime: `${new Date().getHours()}:${new Date().getMinutes()} ${new Date().toString(
          "tt"
        )}`,
        color: "clr1",
        localID: uuid(),
      };
      console.log(newSticky);
      this.addSticky(newSticky);
      this.note = "";
      this.showDialog = false;
    },
  },
  computed: {},
  mounted() {},
};
</script>

<style>
textarea {
  background: rgb(244, 247, 248);
  border: none;
  width: 100%;
  border-radius: 10px;
  padding: 5px;
  outline: none;
}
#fab {
  position: fixed;
  z-index: 3;
  bottom: 100px;
  left: 50%;
  transform: translateX(-60%) scale(1.5);
  font-size: 1.3em;
}
</style>