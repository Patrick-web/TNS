<template>
  <div class="note">
    <div @click="showDialog" class="bar">
      <div :class="note.color"></div>
    </div>
    <div @click="showDialog" class="content">
      <pre id="previewBox" class="txtArea">{{ note.content }}</pre>
    </div>
    <div class="center">
      <vs-dialog
        width="500px"
        scroll
        overflow-hidden
        prevent-close
        not-close
        v-model="showStickyDialog"
      >
        <template #header>
          <ColorPicker
            v-on:colorPick="changeStickyColor"
            :color="note.color"
            :showAllColors="showPicker"
            :noteID="note.localID"
          />
          <!-- <div class="cut"></div> -->
          <div class="stickyHead">
            <div class="stickyInfo">
              <p class="info date">{{ note.formattedDate }}</p>
              <span style="width: 20px"></span>
              <p class="info time">{{ note.formattedTime }}</p>
            </div>
          </div>
        </template>
        <textarea
          v-model="note.content"
          @input="updateContent"
          class="con-content sc"
        >
        </textarea>

        <template #footer>
          <div class="footer-dialog">
            <vs-button @click="saveChanges" animation-type="vertical" block>
              Close
              <template #animate>
                <i class="bx bx-collapse"></i>
              </template>
            </vs-button>
            <vs-button
              id="delBt"
              animation-type="vertical"
              danger
              @click="confirmDelete = true"
              floating
            >
              <i class="bx bx-trash"></i>
              <template #animate> Delete </template>
            </vs-button>
          </div>
        </template>
      </vs-dialog>
      <vs-dialog blur v-model="confirmDelete">
        <h4 style="text-align: center">Continue To Delete this Sticky</h4>
        <template #footer>
          <div class="con-footer">
            <vs-button @click="deleteSticky" block warn> Yes </vs-button>
            <vs-button @click="confirmDelete = false" block> Cancel </vs-button>
          </div>
        </template>
      </vs-dialog>
    </div>
  </div>
</template>

<script>
import actionsBar from "@/components/actionsBar.vue";
import StickyDialog from "@/components/StickyDialog.vue";
import ColorPicker from "@/components/ColorPicker.vue";
import { mapActions } from "vuex";

export default {
  name: "note",
  data() {
    return {
      showStickyDialog: false,
      showPicker: false,
      newColor: false,
      contentIsEdited: false,
      updateNote: false,
      confirmDelete: false,
    };
  },
  components: {
    actionsBar,
    StickyDialog,
    ColorPicker,
  },
  props: {
    note: Object,
    stickyIndex: Number,
  },
  mounted() {
    console.log(this.stickyIndex);
  },
  methods: {
    ...mapActions(["removeSticky"]),
    deleteSticky() {
      this.removeSticky(this.stickyIndex);
      window.db
        .collection("notes")
        .doc(this.note.firebaseID)
        .delete()
        .then(() => {
          console.log("Document successfully deleted!");
          const noti = this.$vs.notification({
            icon: "<i class='bx bx-trash-alt'></i>",
            position: "top-center",
            color: "warning",
            title: "Done",
            text: "Sticky has been deleted",
          });
        })
        .catch(function (error) {
          const noti = this.$vs.notification({
            icon: "< class='bx bxs-error' ></>",
            position: "top-center",
            color: "danger",
            title: "Error",
            text: err,
          });
          console.error("Error removing document: ", error);
        });
      this.confirmDelete = false;
      this.showStickyDialog = false;
    },
    textAreaAdjust() {
      const element = document.querySelector(".sc");
      if (element.scrollHeight < 300) {
        element.style.height = "1px";
        element.style.height = 1 + element.scrollHeight + "px";
      } else {
        element.style.overflow = "scroll";
      }
    },
    showDialog() {
      this.showStickyDialog = true;
      setTimeout(() => {
        this.textAreaAdjust();
      }, 0);
    },
    saveChanges() {
      if (this.updateNote) {
        window.db
          .collection("notes")
          .doc(this.note.firebaseID)
          .set(this.note)
          .then(function () {
            console.log("Document successfully updated!");
          })
          .catch(function (error) {
            console.error("Error writing document: ", error);
          });
      }
      this.updateNote = false;
      this.showStickyDialog = false;
    },
    changeStickyColor(color) {
      if (this.note.color != color) {
        this.updateNote = true;
        this.note.color = color;
      }
    },
    updateContent() {
      this.updateNote = true;
      this.textAreaAdjust();
      // this.note.content = "";
      // this.note.content = document.querySelector(".sc").textContent;
    },
  },
};
</script>

<style lang="scss">
.note {
  background: #f5f8fa;
  margin: 10px;
  margin-bottom: 20px;
  position: relative;
  max-height: 19.5vh;
  transition: 0.2s ease-in-out;
}
#delBt {
  position: absolute;
  left: 50%;
  bottom: 0%;
  transform: translate(-50%, 130%);
}
.note::before {
  content: "";
  position: absolute;
  bottom: 0px;
  right: 0%;
  width: 80%;
  height: 20px;
  background: rgba(0, 0, 0, 0.2);
  transform-origin: center;
  transform: skew(5deg) rotate(3deg);
  z-index: -1;
  filter: blur(5px);
  transition: 0.1s ease-in-out;
}
.note::after {
  content: "";
  position: absolute;
  bottom: 0px;
  left: 0%;
  width: 80%;
  height: 20px;
  background: rgba(0, 0, 0, 0.2);
  transform-origin: center;
  transform: skew(-5deg) rotate(-5deg) scale(0.5);
  z-index: -1;
  filter: blur(5px);
  opacity: 0;
  transition: 0.1s ease-in-out;
}
.bar {
  height: 10px;
  div {
    height: 100%;
    width: 100%;
  }
}
.textareaCover {
  z-index: 4;
  position: absolute;
  height: 100%;
  width: 100%;
}
.note .txtArea {
  --font-size: 1.2rem;
  width: 95%;
  max-height: 15vh;
  border: none;
  color: rgb(2, 2, 2);
  padding: 10px;
  font-family: Verdana, Geneva, Tahoma, sans-serif;
  font-weight: 300;
  font-size: var(--font-size);
  line-height: 1.4rem;
  outline: none;
  overflow: hidden;
  word-wrap: break-word;
}
#actualtxtarea {
  position: absolute;
  display: none;
}
.actions {
  position: absolute;
  width: 100%;
  bottom: 0px;
}
.sc {
  outline-color: transparent;
  background: rgba(230, 230, 250, 0.521);
  padding: 10px;
  border-radius: 10px;
  margin-top: -5px;
  max-height: 400px;
  // overflow: scroll;
  word-wrap: break-word;
}
.stickyInfo {
  width: 100%;
  display: flex;
  justify-content: space-between;
}
.vs-dialog-content {
  background: rgba(0, 0, 0, 0.473) !important;
}

.cut {
  height: 60px;
  width: 60px;
  position: absolute;
  top: 20px;
  border-radius: 20px;
  background: #7d7b7b;
  clip-path: circle(50% at 50% 50%);
  transform: translateY(-50%);
  z-index: 2;
  right: -10px;
}

@media (min-width: 600px) {
  .note {
    margin-bottom: 0px;
    width: 300px;
    min-height: 100px;
    height: 100px;
    align-self: flex-start;
    cursor: pointer;
  }
  .note:hover::after {
    transform: skew(-5deg) rotate(-5deg) scale(1);
    opacity: 1;
  }
  .note:hover::before {
    transform: skew(5deg) rotate(5deg);
  }
  .note .txtArea {
    max-height: 12.5vh;
  }
}
</style>
