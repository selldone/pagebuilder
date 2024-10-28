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
  <v-btn
    @click="dialog = true"
    variant="text"
    min-width="46"
    min-height="46"
    rounded="lg"
    class="ma-1"
  >
    <v-icon>settings</v-icon>
    <v-tooltip activator="parent"
      >{{ $t("page_builder.menu.setting") }}
    </v-tooltip>
  </v-btn>

  <v-dialog
    v-model="dialog"
    scrollable
    fullscreen
    transition="dialog-bottom-transition"
  >
    <v-card>
      <v-card-title></v-card-title>
      <v-card-text>
        <!-- ============== Name ============== -->

        <div class="widget-box mb-5">
          <u-widget-header
            :title="$t('global.commons.general_config')"
            icon="tune"
          ></u-widget-header>

          <v-list-subheader
            >Adjusting the page URL and modifying the publication status of the
            page.
          </v-list-subheader>

          <v-text-field
            :counter="32"
            :label="$t('page_builder.setting.name_input')"
            v-model="page.name"
            variant="underlined"
          />

          <p dir="ltr">
            <v-icon class="me-1" size="small">link</v-icon>
            <span style="color: #777">domain.com/pages/</span
            ><span class="font-weight-black" style="color: #0288d1">{{
              encodeURIComponent(page.name)
            }}</span>
          </p>

          <u-smart-switch
            v-model="page.published"
            :false-title="$t('global.commons.draft')"
            :true-title="$t('global.commons.published')"
            class="my-3"
            false-description="This page is currently set to draft mode and is not accessible to the public."
            false-gray
            false-icon="public_off"
            true-description="This page is accessible to the public."
            true-icon="public"
          >
          </u-smart-switch>
        </div>

        <!-- ---------------------- Label ---------------------- -->
        <div class="widget-box mb-5">
          <u-widget-header
            icon="architecture"
            title="Designer"
          ></u-widget-header>

          <!-- ============== colors ============== -->
          <v-list-subheader
            >Assign color labels to quickly identify pages, and you can also
            utilize these color labels for page categorization.
          </v-list-subheader>

          <v-btn
            v-for="item in standardDesignColor"
            :key="item"
            :class="{ active: item === page.color }"
            class="me-1 color-button-ball"
            icon
            variant="text"
            @click="page.color = item"
          >
            <v-icon :color="item"> brightness_1</v-icon>
          </v-btn>

          <!-- ============== Note ============== -->
          <v-list-subheader
            >Here, you can add a note that will be visible only to
            administrators.
          </v-list-subheader>

          <v-textarea
            :counter="128"
            :label="$t('page_builder.setting.designer_note')"
            v-model="page.note"
            :rows="2"
            variant="underlined"
          />

          <!-- ━━━━━━━━━━━━━━━━━━━━━━━━ 🆑 Cluster ━━━━━━━━━━━━━━━━━━━━━━━━ -->
          <template v-if="$shop">
            <u-widget-header
              :to="{ name: 'BPageShopClassificationClusters' }"
              add-caption="Management"
              add-icon="settings"
              add-text
              icon="workspaces"
              title="Cluster"
            ></u-widget-header>

            <v-list-subheader>
              By linking this page to a cluster, you can effortlessly locate and
              manage it.
            </v-list-subheader>
            <b-cluster-input
              v-model="page.cluster_id"
              :return-object="false"
              clearable
              icon="workspaces_filled"
              no-home
            ></b-cluster-input>
          </template>

          <!-- ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ -->
        </div>

        <div class="widget-box mb-5">
          <u-widget-header icon="image" title="Image"></u-widget-header>
          <v-list-subheader
            >Upload an image for the page. This image will serve as the cover
            for SEO purposes and will also be used in the page listings.
            <s-widget-help code="Landing.SEO.Customize" inline></s-widget-help>
          </v-list-subheader>

          <!-- ============== Image ============== -->
          <s-image-uploader
            v-if="page"
            :image="getShopImagePath(page.image)"
            :server="page_image_cover_upload_url"
            auto-compact
            class="my-4"
            label="Cover image"
            max-file-size="2MB"
            @new-path="handleProcessFile"
          >
          </s-image-uploader>
        </div>

        <!-- ---------------------- Delete ---------------------- -->
        <div class="widget-box mb-5" style="border-top: solid medium red">
          <u-widget-header
            icon="error_outline"
            title="Delete page"
          ></u-widget-header>

          <v-list-subheader>
            <div>
              Deleting a page is a permanent action, so please be absolutely
              sure before proceeding. All <b>images</b> and <b>videos</b>
              uploaded on this page will also be permanently deleted. If you
              choose to create a duplicate of this page, remember to re-upload
              any images or videos to the new page.
            </div>
          </v-list-subheader>

          <u-smart-verify v-model="verify_delete" color="red"></u-smart-verify>

          <div class="widget-buttons">
            <v-btn
              :class="{ disabled: !verify_delete }"
              :loading="busy_delete"
              color="red"
              size="x-large"
              variant="text"
              @click="deletePage()"
            >
              <v-icon class="me-1" size="small">delete</v-icon>
              Delete This Page
            </v-btn>
          </div>
        </div>
      </v-card-text>
      <v-card-actions>
        <div class="widget-buttons">
          <v-btn size="x-large" variant="text" @click="dialog = false">
            <v-icon start>close</v-icon>
            {{ $t("global.actions.close") }}
          </v-btn>
        </div>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import SImageUploader from "@selldone/components-vue/ui/uploader/SImageUploader.vue";
import { standardDesignColor } from "@selldone/core-js/helper/color/ColorGenerator.ts";
import USmartSwitch from "@selldone/components-vue/ui/smart/switch/USmartSwitch.vue";
import USmartVerify from "@selldone/components-vue/ui/smart/verify/USmartVerify.vue";
import BClusterInput from "@selldone/components-vue/backoffice/cluster/input/BClusterInput.vue";
import SWidgetHelp from "@selldone/components-vue/ui/widget/help/SWidgetHelp.vue";

export default {
  name: "LMenuLeftSettingPage",
  components: {
    SWidgetHelp,
    BClusterInput,
    USmartVerify,
    USmartSwitch,
    SImageUploader,
  },
  inject: ["$builder", "$shop"],
  props: {},
  data: () => ({
    dialog: false,

    standardDesignColor: standardDesignColor,

    busy_delete: false,

    verify_delete: false,
  }),

  computed: {
    page_image_cover_upload_url() {
      if (!this.$shop) {
        // Official Selldone!
        return window.ADMIN_API.POST_UPLOAD_PAGE_COVER_IMAGE(this.page.id);
      }
      return window.API.POST_UPLOAD_PAGE_COVER_IMAGE(
        this.$shop.id,
        this.page.id,
      );
    },

    page() {
      return this.$builder.model;
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
          if (this.$shop)
            url = window.API.DELETE_PAGE(this.$shop.id, this.page.id);
          else url = window.ADMIN_API.DELETE_PAGE(this.page.id);

          this.busy_delete = true;

          axios
            .delete(url)
            .then(({ data }) => {
              if (data.error) {
                this.showErrorAlert(null, data.error_msg);
              } else {
                this.showSuccessAlert(null, "Page has been deleted!");
                this.$router.push({
                  name: this.$shop
                    ? "BPageShopPagesLandings"
                    : "AdminPage_Content_Pages",
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

<style lang="scss" scoped>
.active {
  border: solid 2px #0d0d0d;
}
</style>
