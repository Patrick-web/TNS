  <template>
  <div class="center">
    <vs-dialog
      scroll
      overflow-hidden
      not-close
      auto-width
      v-model="showStickyDialog"
    >
      <template #header>
        <h3>Introduction</h3>
      </template>
      <div class="con-content">
        Lorem ipsum dolor, sit amet consectetur adipisicing elit. Ullam
        necessitatibus velit voluptate totam commodi sunt esse, ipsa nobis
        adipisci atque sequi modi voluptates error numquam dolorum molestias
        accusamus a incidunt dignissimos facilis consequuntur officiis excepturi
        quos blanditiis. Sapiente cum dolorum, tempora cupiditate sit iure
        possimus porro quam animi unde deserunt?
      </div>
      <template #footer>
        <div class="footer-dialog">
          <vs-button block> Save Changes </vs-button>
          <vs-button block> Close </vs-button>
        </div>
      </template>
    </vs-dialog>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  computed: {
    ...mapGetters(["showStickyDialog"]),
  },
};
</script>
