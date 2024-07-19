<!--
  - Copyright (c) 2024. Selldone® Business OS™
  -
  - Author: M.Pajuhaan
  - Web: https://selldone.com
  - ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  -
  - All rights reserved. In the weave of time, where traditions and innovations intermingle, this content was crafted.
  - From the essence of thought, through the corridors of creativity, each word, and sentiment has been molded.
  - Not just to exist, but to inspire. Like an artist's stroke or a sculptor's chisel, every nuance is deliberate.
  - Our journey is not just about reaching a destination, but about creating a masterpiece.
  - Tread carefully, for you're treading on dreams.
  -->

<template>
  <!-- ████████████████████ Toolbar ████████████████████ -->

  <v-toolbar
    density="compact"
    color="#222"
    height="52"
    style="border-bottom: solid #111 thin"
  >
    <v-toolbar-title style="font-size: 12px"><b>Versions</b></v-toolbar-title>

    <u-dense-circles-users
      title="Contributors"
      :ids="histories_users"
      :size="20"
    ></u-dense-circles-users>
  </v-toolbar>

  <!-- ▆▆▆▆▆▆▆▆▆▆▆▆▆▆▆▆▆▆▆▆▆▆▆  List ▆▆▆▆▆▆▆▆▆▆▆▆▆▆▆▆▆▆▆▆▆▆▆ -->
  <v-list
    class="text-start border-between-vertical usn"
    bg-color="transparent"
    theme="dark"
    density="compact"
  >
    <v-list-item
      lines="two"
      prepend-icon="settings_backup_restore"
      ripple
      @click="
        () => {
          fetchPageData();
        }
      "
    >
      <v-list-item-title style="font-size: 0.75rem; font-weight: 500">
        Restore last saved page</v-list-item-title
      >
      <v-list-item-subtitle class="op-0-8"
        >{{ getFromNowString(page?.updated_at) }}
      </v-list-item-subtitle>
    </v-list-item>

    <v-list-item
      v-for="history in histories"
      :key="history.id"
      lines="two"
      ripple
      @click="getHistory(history.id)"
      :class="{ 'border-start-amber': current_history_id === history.id }"
    >
      <v-list-item-title style="font-size: 0.75rem; font-weight: 500">
        {{ getLocalTimeString(history.created_at) }}
      </v-list-item-title>
      <v-list-item-subtitle class="op-1-0 my-1">
        <v-avatar
          v-if="history.user_id"
          :size="24"
          class="avatar-gradient -thin -user me-2"
        >
          <v-img :src="getUserAvatar(history.user_id)" />
        </v-avatar>

        <i class="op-0-8">{{ getFromNowString(history.created_at) }}</i>
      </v-list-item-subtitle>

      <template v-slot:append>
        <v-list-item-action end class="d-flex flex-column">
          <v-btn
            icon
            variant="text"
            @click="togglePersistent(history)"
            @click.stop
            size="24"
          >
            <v-icon v-if="history.persistent" color="yellow-darken-2">
              star
            </v-icon>
            <v-icon v-else color="grey-lighten-1">star_border</v-icon>
          </v-btn>
          <small style="font-size: 9px">{{
            history.persistent ? "persistent" : "temporary"
          }}</small>
        </v-list-item-action>
      </template>
    </v-list-item>
  </v-list>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import UDenseCirclesUsers from "@selldone/components-vue/ui/dense-circles/users/UDenseCirclesUsers.vue";

export default defineComponent({
  name: "LMenuLeftVersions",
  emits: ["update:isDragged"],
  directives: {},
  components: { UDenseCirclesUsers },

  props: {
    histories: { required: true, type: Array },
    setPageFunction: { required: true, type: Function },
    fetchPageData: { required: true, type: Function },
    page: {},
  },
  data() {
    return {
      current_history_id: null,
    };
  },

  computed: {
    histories_users() {
      return this.histories
        ?.map((h) => h.user_id)
        .unique()
        .removeNulls();
    },
  },
  watch: {
    page() {
      this.current_history_id = null;
    },
  },
  created() {},

  mounted() {},
  beforeUnmount() {},
  methods: {
    getHistory(history_id) {
      this.busy_fetch = true;
      this.current_history_id = history_id;

      let url = null;
      if (this.page.shop_id)
        url = window.API.GET_PAGE_HISTORY(
          this.page.shop_id,
          this.page.id,
          history_id,
        );
      else if (this.isOfficialPage)
        url = window.ADMIN_API.GET_PAGE_HISTORY(this.page.id, history_id);
      else return;

      axios
        .get(url)
        .then(({ data }) => {
          if (data.error) {
            this.showErrorAlert(null, data.error_msg);
          } else {
            this.setPageFunction(data.content, data.css, false);

            this.showSuccessAlert(
              "Fetch completed",
              "Page successfully loaded from history.",
            );
          }
        })
        .finally(() => {
          this.busy_fetch = false;
        });
    },

    togglePersistent(history) {
      let t = this;

      let url = null;
      if (this.page.shop_id)
        url = window.API.PUT_SET_HISTORY_PERSISTENT(
          this.page.shop_id,
          this.page.id,
          history.id,
        );
      else if (this.isOfficialPage)
        url = window.ADMIN_API.PUT_SET_HISTORY_PERSISTENT(
          this.page.id,
          history.id,
        );
      else return;

      axios
        .put(url, {
          persistent: !history.persistent,
        })
        .then(({ data }) => {
          if (data.error) {
            t.showErrorAlert(null, data.error_msg);
          } else {
            history.persistent = data.persistent;
            t.showSuccessAlert(null, "Change has been applied.");
          }
        });
    },
  },
});
</script>

<style lang="scss" scoped></style>
