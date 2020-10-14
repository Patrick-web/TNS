<template>
  <div class="page stickyContainer">
    <titleBar title="Sticky Notes" />

    <div class="notesContainer">
      <note
        v-bind:key="sticky.id"
        v-for="(sticky, index) in stickies"
        v-bind:note="sticky"
        v-bind:stickyIndex="index"
        v-on:updateNote="updateNote"
      />
    </div>
    <confirmDelete v-on:deleteSticky="deleteSticky" />
    <CreateStickyDialog />
  </div>
</template>

<script>
import note from "@/components/note.vue";
import CreateStickyDialog from "@/components/CreateStickyDialog.vue";
import addBt from "@/components/addBt.vue";
import confirmDelete from "@/components/confirmDelete.vue";
import titleBar from "@/components/titleBar.vue";
import { mapActions, mapGetters } from "vuex";
export default {
  name: "stickys",
  computed: {
    ...mapGetters(["stickies"]),
  },
  methods: {
    ...mapActions(["showStickyDialog"]),
    deleteSticky(id) {
      this.notes = this.notes.filter((note) => note.id != id);
      let notesStorage;
      notesStorage = [...this.notes];
      localStorage.setItem("stickynotes", JSON.stringify(notesStorage));
    },
    updateNote() {
      setTimeout(() => {
        document
          .querySelector(".note-expanded")
          .querySelector(".saveEditBt").style.transform = "scale(0)";
      }, 500);
      const targetSticky = document.querySelector(".expand");
      const updatedNote = targetSticky.querySelector("textarea").value;
      if (updatedNote) {
        const id = targetSticky.querySelector("#noteId").textContent;
        this.notes.forEach((note) => {
          if (note.id === id) {
            note.note = updatedNote;
          }
        });

        document.body.classList.remove("note-expanded");
        document.querySelector(".expand").classList.remove("expand");
        let notesStorage;
        notesStorage = [...this.notes];
        localStorage.setItem("stickynotes", JSON.stringify(notesStorage));
      }
    },
  },
  created() {
    const stickies = JSON.parse(localStorage.getItem("stickynotes"));
    if (stickies) {
      this.notes = [...stickies];
    }
  },
  mounted() {
    document.querySelector("#nav").style.display = "flex";
  },
  data() {
    return {
      notes: [],
    };
  },
  components: {
    note,
    confirmDelete,
    addBt,
    titleBar,
    CreateStickyDialog,
  },
};
</script>

<style>
.stickyContainer {
  position: relative;
  padding-bottom: 55px;
}
.notesContainer {
  margin-top: 50px;
  height: 100vh;
  overflow-y: scroll;
  padding-bottom: 60px;
  /* margin-bottom: 90px; */
}
.more {
  width: 50px;
  position: absolute;
  right: 10px;
  top: 18px;
  display: none;
}
.deleteTarget {
  animation: slideright;
  animation-duration: 0.4s;
  animation-delay: 0.4s;
  animation-fill-mode: forwards;
}
@keyframes slideright {
  0% {
    margin-left: 10px;
    opacity: 1;
  }
  100% {
    margin-left: 100%;
    opacity: 0;
  }
}
@media (min-width: 600px) {
  .notesContainer {
    display: flex;
    flex-wrap: wrap;
    justify-content: flex-start;
  }
}
</style>
