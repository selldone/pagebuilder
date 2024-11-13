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

        <!-- ――――――――――――――――――――――  Container ―――――――――――――――――――― -->

        <div class="widget-box mb-5">
          <h2>
            <v-icon class="me-1">tune</v-icon>
            {{ $t("global.commons.general_config") }}
          </h2>

          <v-list-subheader></v-list-subheader>

          <!-- ============== Published ============== -->

          <u-smart-toggle
            v-model="popup.published"
            :true-title="$t('popup_setting.published')"
            color="success"
            false-gray
            false-icon="public_off"
            true-icon="public"
          />

          <hr class="my-4" />

          <u-smart-toggle
            v-model="popup.repeat"
            :true-description="$t('popup_setting.repeat_msg')"
            :true-title="$t('popup_setting.repeat')"
            false-gray
            false-icon="repeat_one"
            true-icon="repeat"
          ></u-smart-toggle>

          <u-number-input
            v-model="popup.interval"
            :disabled="!popup.repeat"
            :label="$t('popup_setting.intervals')"
            :messages="$t('popup_setting.intervals_msg')"
            :min="0"
            :suffix="$t('global.commons.hours')"
            append-icon="sync_problem"
          ></u-number-input>
        </div>

        <div class="widget-box mb-5">
          <u-widget-header
            :title="$t('popup_setting.designer_zone')"
            icon="snippet_folder"
          ></u-widget-header>

          <v-list-subheader
            >Only admins and editors will have access to view this information.
          </v-list-subheader>

          <!-- ============== Name ============== -->
          <v-text-field
            v-model="popup.title"
            :counter="32"
            :label="$t('popup_setting.title')"
            messages=" "
            variant="underlined"
          >
            <template v-slot:message>
              <u-smart-suggestion
                v-if="!popup?.id || !popup?.title"
                :samples="$tm('suggestions.popup.title')"
                @select="(v) => (popup.title = v)"
              ></u-smart-suggestion>
            </template>
          </v-text-field>

          <!-- ============== Note ============== -->

          <v-textarea
            v-model="popup.note"
            :counter="128"
            :label="$t('popup_setting.note')"
            :rows="2"
            variant="underlined"
          />

          <!-- ============== Image ============== -->
          <s-image-uploader
            v-if="popup"
            :image="getShopImagePath(popup.image)"
            :label="$t('popup_setting.image')"
            :server="page_image_cover_upload_url"
            auto-compact
            class="mt-2 mx-auto"
            max-file-size="2MB"
            @new-path="handleProcessFile"
          >
          </s-image-uploader>
        </div>

        <!-- ━━━━━━━━━━━━━━━━━━━━━━━━ 🆑 Cluster ━━━━━━━━━━━━━━━━━━━━━━━━ -->
        <div class="widget-box mb-5">
          <u-widget-header
            :to="{ name: 'BPageShopClassificationClusters' }"
            add-caption="Management"
            add-icon="settings"
            add-text
            icon="workspaces"
            title="Cluster"
          ></u-widget-header>

          <v-list-subheader>
            By associating this popup with a cluster, you can easily manage it
            alongside other resources in a single location.
          </v-list-subheader>
          <b-cluster-input
            v-model="popup.cluster_id"
            :return-object="false"
            clearable
            icon="workspaces_filled"
            no-home
          ></b-cluster-input>
        </div>
        <!-- ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ -->

        <!-- ============== Delete ============== -->

        <div class="widget-box -red mb-5">
          <h2>
            <v-icon class="me-1">error_outline</v-icon>

            {{ $t("popup_setting.delete.title") }}
          </h2>
          <v-list-subheader>
            {{ $t("popup_setting.delete.sub_title") }}
          </v-list-subheader>

          <u-smart-verify
            v-model="check_delete"
            class="my-3"
            color="red"
          ></u-smart-verify>

          <s-widget-buttons>
            <v-btn
              :class="{ disabled: !check_delete }"
              :loading="busy_delete"
              color="red"
              size="x-large"
              @click="
                NotificationService.openDeleteAlert(() => {
                  deletePopup();
                })
              "
            >
              <v-icon class="me-1">delete</v-icon>

              {{ $t("popup_setting.delete.action") }}
            </v-btn>
          </s-widget-buttons>
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

<script lang="ts">
import SImageUploader from "@selldone/components-vue/ui/uploader/SImageUploader.vue";
import UNumberInput from "@selldone/components-vue/ui/number/input/UNumberInput.vue";
import USmartToggle from "@selldone/components-vue/ui/smart/toggle/USmartToggle.vue";
import USmartVerify from "@selldone/components-vue/ui/smart/verify/USmartVerify.vue";
import BClusterInput from "@selldone/components-vue/backoffice/cluster/input/BClusterInput.vue";
import USmartSuggestion from "@selldone/components-vue/ui/smart/suggestion/USmartSuggestion.vue";
import SWidgetButtons from "@selldone/components-vue/ui/widget/buttons/SWidgetButtons.vue";
import NotificationService from "@selldone/components-vue/plugins/notification/NotificationService.ts";

export default {
  name: "LMenuLeftSettingPopup",
  components: {
    SWidgetButtons,
    USmartSuggestion,
    BClusterInput,
    USmartVerify,
    USmartToggle,
    UNumberInput,
    SImageUploader,
  },
  inject: ["$builder", "$shop"],

  props: {},
  data: () => ({
    busy_delete: false,
    check_delete: false,

    dialog: false,
  }),

  computed: {
    NotificationService() {
      return NotificationService
    },
    popup() {
      return this.$builder.model;
    },
    page_image_cover_upload_url() {
      return window.API.POST_UPLOAD_POPUP_COVER_IMAGE(
        this.$shop.id,
        this.popup.id,
      );
    },
  },
  methods: {
    handleProcessFile(path) {
      this.popup.image = path;
    },
    deletePopup() {
      this.busy_delete = true;

      axios
        .delete(window.API.DELETE_POPUP(this.$shop.id, this.popup.id))
        .then(({ data }) => {
          if (data.error) {
            NotificationService.showErrorAlert(null, data.error_msg);
          } else {
            NotificationService.showSuccessAlert(
              null,
              this.$t("popup_setting.notifications.delete"),
            );
            this.$router.push({ name: "BPageShopPagesPopups" });
          }
        })
        .catch((error) => {
          NotificationService.showLaravelError(error);
        })
        .finally(() => {
          this.busy_delete = false;
        });
    },
  },
};
</script>

<style lang="scss" scoped>
.active {
  border: solid 2px #0d0d0d;
}
</style>
