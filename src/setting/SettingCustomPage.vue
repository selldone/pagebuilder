<!--
  - Copyright (c) 2023. Selldone® Business OS™
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
  <div class="py-5">
    <!-- ============== Name ============== -->

    <div class="widget-box mb-5">
      <s-widget-header
        :title="$t('global.commons.general_config')"
        icon="tune"
      ></s-widget-header>

      <v-list-subheader
        >Adjusting the page URL and modifying the publication status of the
        page.</v-list-subheader
      >

      <v-text-field
        :model-value="name"
        @update:model-value="(val) => $emit('update:name', val)"
        :counter="32"
        :label="$t('page_builder.setting.name_input')"
      />

      <p dir="ltr">
        <v-icon size="small" class="me-1">link</v-icon>
        <span style="color: #777">domain.com/pages/</span
        ><span style="color: #0288d1" class="font-weight-black">{{
          encodeURIComponent(name)
        }}</span>
      </p>

      <s-smart-switch
        class="my-3"
        v-model="page.published"
        :true-title="$t('global.commons.published')"
        true-icon="public"
        :false-title="$t('global.commons.draft')"
        false-icon="public_off"
        false-gray
        true-description="This page is accessible to the public."
        false-description="This page is currently set to draft mode and is not accessible to the public."
      >
      </s-smart-switch>
    </div>

    <!-- ---------------------- Label ---------------------- -->
    <div class="widget-box mb-5">
      <s-widget-header title="Designer" icon="architecture"></s-widget-header>

      <!-- ============== colors ============== -->
      <v-list-subheader
        >Assign color labels to quickly identify pages, and you can also utilize
        these color labels for page categorization.</v-list-subheader
      >

      <v-btn
        v-for="item in colors"
        :key="item"
        icon
        class="me-1 color-button-ball"
        :class="{ active: item === color }"
        @click="$emit('update:color', item)"
      >
        <v-icon :color="item"> brightness_1</v-icon>
      </v-btn>

      <!-- ============== Note ============== -->
      <v-list-subheader
        >Here, you can add a note that will be visible only to
        administrators.</v-list-subheader
      >

      <v-textarea
        :model-value="note"
        @update:model-value="(val) => $emit('update:note', val)"
        :color="SaminColorLight"
        :counter="128"
        :label="$t('page_builder.setting.designer_note')"
        :rows="2"
      />

      <!-- ━━━━━━━━━━━━━━━━━━━━━━━━ 🆑 Cluster ━━━━━━━━━━━━━━━━━━━━━━━━ -->
      <s-widget-header
        title="Cluster"
        icon="workspaces"
        add-text
        add-caption="Management"
        add-icon="settings"
        :to="{ name: 'BPageShopClassificationClusters' }"
      ></s-widget-header>

      <v-list-subheader>
        By linking this page to a cluster, you can effortlessly locate and
        manage it.
      </v-list-subheader>
      <b-cluster-input
        :value="clusterId"
        @input="(val) => $emit('update:clusterId', val)"
        :return-object="false"
        clearable
        no-home
        icon="workspaces_filled"
      ></b-cluster-input>
      <!-- ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ -->
    </div>

    <div class="widget-box mb-5">
      <s-widget-header title="Image" icon="image"></s-widget-header>
      <v-list-subheader
        >Upload an image for the page. This image will serve as the cover for
        SEO purposes and will also be used in the page
        listings.</v-list-subheader
      >

      <!-- ============== Image ============== -->
      <s-image-uploader
        v-if="page"
        class="my-4"
        label="Cover image"
        :server="page_image_cover_upload_url"
        max-file-size="2MB"
        :image="getShopImagePath(page.image)"
        @new-path="handleProcessFile"
        auto-compact
      >
      </s-image-uploader>
    </div>

    <!-- ---------------------- Delete ---------------------- -->
    <div class="widget-box mb-5" style="border-top: solid medium red">
      <s-widget-header
        title="Delete page"
        icon="error_outline"
      ></s-widget-header>

      <v-list-subheader>
        <div>
          Deleting a page is a permanent action, so please be absolutely sure
          before proceeding. All <b>images</b> and <b>videos</b>
          uploaded on this page will also be permanently deleted. If you choose
          to create a duplicate of this page, remember to re-upload any images
          or videos to the new page.
        </div>
      </v-list-subheader>

      <s-smart-check-verify-action
        color="red"
        v-model="verify_delete"
      ></s-smart-check-verify-action>

      <div class="widget-buttons">
        <v-btn
          color="red"
          variant="text"
          @click="deletePage()"
          :loading="busy_delete"
          size="x-large"
          :class="{ disabled: !verify_delete }"
        >
          <v-icon size="small" class="me-1">delete</v-icon>
          Delete This Page
        </v-btn>
      </div>
    </div>
  </div>
</template>

<script>
import SImageUploader from "@components/uploader/SImageUploader.vue";
import { standardDesignColor } from "@core/helper/color/ColorGenerator";
import SSmartSwitch from "@components/smart/SSmartSwitch.vue";
import SSmartCheckVerifyAction from "@components/smart/SSmartCheckVerifyAction.vue";
import BClusterInput from "@components/backoffice/cluster/BClusterInput.vue";

export default {
  name: "SettingCustomPage",
  components: {
    BClusterInput,
    SSmartCheckVerifyAction,
    SSmartSwitch,
    SImageUploader,
  },
  props: {
    shop: {
      required: false,
      type: Object,
    },
    isOfficialPage: {
      required: false,
      type: Boolean,
      default: false,
    },
    page: {
      required: true,
      type: Object,
    },

    name: {},

    color: {},
    note: {},
    direction: {},
    clusterId: {},
  },
  data: () => ({
    colors: standardDesignColor,

    busy_delete: false,

    verify_delete: false,
  }),

  computed: {
    page_image_cover_upload_url() {
      if (this.shop)
        return window.API.POST_UPLOAD_PAGE_COVER_IMAGE(
          this.$route.params.shop_id,
          this.page.id,
        );
      // Official Samin!
      else
        return this.isOfficialPage
          ? window.ADMIN_API.POST_UPLOAD_PAGE_COVER_IMAGE(this.page.id)
          : false;
    },
  },
  methods: {
    handleProcessFile(path) {
      this.page.image = path;
      //this.$forceUpdate();
    },
    deletePage() {
      this.openDangerAlert(
        "Delete page",
        `Do you want to delete the ${this.page.title} page?`,
        this.$t("global.actions.delete"),
        () => {
          let url = null;
          if (this.shop)
            url = window.API.DELETE_PAGE(
              this.$route.params.shop_id,
              this.page.id,
            );
          else if (this.isOfficialPage)
            url = window.ADMIN_API.DELETE_PAGE(this.page.id);
          else return;

          this.busy_delete = true;

          axios
            .delete(url)
            .then(({ data }) => {
              if (data.error) {
                this.showErrorAlert(null, data.error_msg);
              } else {
                this.showSuccessAlert(null, "Page has been deleted!");
                this.$router.push({
                  name: this.shop
                    ? "BPageShopPagesLandings"
                    : this.isOfficialPage
                      ? "AdminPage_Content_Pages"
                      : null,
                });
              }
            })
            .catch((error) => {
              this.showLaravelError(error);
            })
            .finally(() => {
              this.busy_delete = false;
            });
        },
      );
    },
  },
};
</script>

<style scoped lang="scss">
.active {
  border: solid 2px #0d0d0d;
}
</style>
