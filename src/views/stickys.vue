<template>
  <div class="page stickyContainer">
    <titleBar title="Sticky Notes" />

    <addSticky v-on:addSticky="addSticky" style="position: fixed" />
    <div class="notesContainer">
      <div class="sticky" v-bind:key="sticky.id" v-for="sticky in notes">
        <note v-bind:note="sticky" v-on:updateNote="updateNote" />
      </div>
    </div>
    <confirmDelete v-on:deleteSticky="deleteSticky" />
    <addBt />
  </div>
</template>

<script>
import note from "@/components/note.vue";
import addSticky from "@/components/addSticky.vue";
import addBt from "@/components/addBt.vue";
import confirmDelete from "@/components/confirmDelete.vue";
import titleBar from "@/components/titleBar.vue";

export default {
  name: "stickys",
  methods: {
    addSticky(newNote) {
      this.notes.unshift(newNote);
      let notesStorage = JSON.parse(localStorage.getItem("stickynotes"));
      if (notesStorage) {
        notesStorage = [...this.notes];
        localStorage.setItem("stickynotes", JSON.stringify(notesStorage));
      } else {
        const newStickyStorage = [newNote];
        localStorage.setItem("stickynotes", JSON.stringify(newStickyStorage));
      }
    },
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
    addSticky,
    confirmDelete,
    addBt,
    titleBar,
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
    display: grid;
    grid-template-columns: repeat(4, 1fr);
  }
}
</style>
