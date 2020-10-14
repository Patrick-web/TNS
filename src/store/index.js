import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    stickies: [],
  },
  getters: {
    stickies: (state) => state.stickies,
  },
  mutations: {
    addSticky(state, sticky) {
      if (window.navigator.onLine) {
        window.db.collection("notes").add(sticky)
          .then(function (docRef) {
            console.log("Document written with ID: ", docRef.id);
            sticky.firebaseID = docRef.id
          })
          .catch(function (error) {
            console.error("Error adding document: ", error);
          });
      } else {
        const staggedForUpload = JSON.parse(localStorage.getItem('stagged'))
        if (staggedForUpload) {
          staggedForUpload.push(sticky)
        } else {
          const newStage = []
          newStage.push(sticky);
          localStorage.setItem('stagged', JSON.stringify(newStage))
        }
      }
      state.stickies.unshift(sticky)
    },
    addStickyFromDB(state, sticky) {
      state.stickies.unshift(sticky)
    },
    removeSticky(state, index) {
      state.stickies.splice(index, 1)
    }
  },
  actions: {
    addSticky: (contex, sticky) => {
      contex.commit('addSticky', sticky)
    },
    addStickyFromDB(contex, sticky) {
      contex.commit('addStickyFromDB', sticky)
    },
    removeSticky(contex, index) {
      contex.commit('removeSticky', index)
    }
  },
  modules: {
  }
})
