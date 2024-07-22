<!--
  - Copyright (c) 2023-2024. Selldone® Business OS™
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

<template xmlns:v-slot="http://www.w3.org/1999/XSL/Transform">

  <component
    :is="link && !$builder.isEditing ? 'a' : 'div'"
    v-if="src || blobUrl || $builder.isEditing"
    @mouseenter="showToolbar"
    ref="i_image"
    v-data-x="object.style"
    :class="[
      {
        uploader: $builder.isEditing,
        'force-show-strips': !src,
        'drag-over': dragOverHolder,
      },
      /*classes,*/
      !noFloat && setting.float ? `float-${setting.float}` : null,

      { 'rounded-circle': setting.round }, // to keep rounded intuitive!

      /*root_classes*/
      object.classes /*image_classes*/,
    ]"
    :href="link"
    :style="[
      {
        // Need same size to parent!
        'aspect-ratio': setting?.aspect,

        animationDuration: object.style?.animationDuration,
        animationDelay: object.style?.animationDelay,
        animationIterationCount: object.style?.animationIterationCount,
        animationDirection: object.style?.animationDirection,
        animationTimingFunction: object.style?.animationTimingFunction,

        'object-fit': setting.contain ? 'contain' : 'cover',
        'min-height': is_waiting_for_drop_image ? 200 : object.style?.minHeight,
        'min-width': is_waiting_for_drop_image ? 200 : object.style?.minWidth,

        // Fix animation in classes which apply to its parent! Duration and repeat of animation will be set to styles!
        // Because we like to have padding and margin and other custome style separate than classes (more flexibility)
        // 'animation-name': 'inherit',
      },
      background_style,
      object.style,
    ]"
    class="image-container"
    cloneable="true"
    target="_blank"
    v-bind="$attrs"
    @click="
      $builder.onClickClone($event, object, [
        'classes',
        'style',
        'data.setting',
      ]);
      init();
      $forceUpdate();
    "
    @dragover="handleDragOver"
    @drop="handleDrop"
  >
    <slot :src="src"></slot>

    <!-- ▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄ Image ▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄ -->

    <img
      v-if="
        (src || blobUrl) &&
        !noPreview &&
        show_img &&
        !missed_dynamic_value /*In live mode do not show broken dynamic urls!*/
      "
      :src="
        is_dynamic_value && $builder.isEditing
          ? require('../../../components/x/uploader/assets/dynamic-image-placeholder.png')
          : blobUrl
            ? blobUrl
            : getShopImagePath(src)
      "
      style="
        flex-grow: 1;
        aspect-ratio: inherit;
        object-fit: inherit;
        border-radius: inherit;
        height: 100%;
        width: 100%;
      "
    />

    <!-- ▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄ Foreground ▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄ -->

    <div :style="fg_cal" class="-foreground"></div>

    <!-- ▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄ Dynamic Image ▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄ -->
    <div
      v-if="is_dynamic_value && $builder.isEditing"
      class="absolute-bottom-start pa-2 ma-2 bg-white rounded-lg text-start text-black pen"
      style="max-height: 80%; overflow: hidden; font-size: 14px"
    >
      <b class="d-block">
        <v-icon class="me-1" color="#111">whatshot</v-icon>
        {{ src?.findAllDynamicAugmentKeys().join(" - ") }}</b
      >
      <small
        >The image url will be created by augment values which will be feed
        dynamically.</small
      >
    </div>

    <!-- ▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄ Actions Buttons ▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄ -->

    <template v-if="$builder.isEditing">
      <input
        v-if="is_input"
        ref="uploader"
        class="uploader-input"
        type="file"
        @change="updateImage"
        @dragenter="onDropEnterHolder"
        @dragleave="onDropLeaveHolder"
        :accept="accept"
      />

      <v-icon class="image-mark" color="#fff" size="48px"> image</v-icon>

      <v-btn
        v-if="is_input && src && !dragOverHolder"
        class="button-delete"
        color="red"
        icon
        title="Delete image"
        variant="flat"
        @click="deleteImage()"
        @click.stop
      >
        <v-icon>close</v-icon>
      </v-btn>

      <div v-if="busy_upload" class="loader-container">
        <div class="circular-loader"></div>
      </div>
    </template>
  </component>
</template>

<script>
import { defineComponent } from "vue";
import { LMixinEvents } from "../../../mixins/events/LMixinEvents";
import DataXDirective from "../../../directives/DataXDirective";
import { LUtilsClasses } from "../../../utils/classes/LUtilsClasses";
import { XUploaderObject } from "@selldone/page-builder/components/x/uploader/XUploaderObject";
import { XLottieObject } from "@selldone/page-builder/components/x/lottie/XLottieObject.ts";
import LMixinXComponent from "@selldone/page-builder/mixins/x-component/LMixinXComponent.ts";

const ASPECTS = [
  { val: undefined, title: "Auto", icon: "crop_free" },
  { val: 1, title: "Square", icon: "crop_square" },
  { val: 7 / 5, title: "7:5", icon: "crop_7_5" },
  { val: 5 / 4, title: "5:4", icon: "crop_5_4" },
  { val: 3 / 2, title: "3:2", icon: "crop_3_2" },
  { val: 16 / 9, title: "16:9", icon: "crop_16_9" },
  { val: 2, title: "2:1", icon: "crop_square" },
];

const FLOATS = [
  { val: undefined, title: "None", icon: "remove" },
  { val: "start", title: "Start", icon: "first_page" },
  { val: "end", title: "End", icon: "last_page" },
];

export default defineComponent({
  name: "XUploader",
  mixins: [LMixinEvents, LMixinXComponent],
  directives: {
    "data-x": DataXDirective,
  },

  components: {},
  inject: ["$builder", "$section"],
  props: {
    object: {
      type: XUploaderObject,
    },
    mode: {
      default: "input",
      type: String,
    },
    /*
        initialClasses: {
          type: Array,
        },*/
    initialSize: {},
    /*
    cover: {          // Prefer default value!
      type: Boolean,
      default: false
    },

    aspectRatio: {
      default: undefined
    },*/

    noPreview: {
      type: Boolean,
      default: false,
    },
    noFloat: {
      // Not support float!
      type: Boolean,
      default: false,
    },
    rounded: {
      type: Boolean,
      default: false,
    },

    contain: {
      // initial contain
      type: Boolean,
      default: false,
    },

    augment: {
      // Extra information to show to dynamic show in page content
    },

    fileKey: {
      default: "photo",
    },

    accept: {
      default: "image/png, image/jpeg, image/gif",
    },
  },

  data: () => ({
    //-----------------------

    busy_upload: false,
    blobUrl: null,

    //--------------------
    pre_src: null,
    aspects: ASPECTS,
    floats: FLOATS,
    //--------------------

    uid: null, // For update computes!

    //-----------------------
    show_img: true, // fix aspect ration in auto mode problem (height set to zero!)

    dragOverHolder: false, // Drag over input.
  }),
  created() {
    this.init();
  },

  computed: {
    has_image() {
      return this.src || this.blobUrl;
    },

    is_waiting_for_drop_image() {
      return this.is_input && !this.has_image;
    },

    has_edit_toolbar() {
      return (
        !this.$builder.isHideExtra /*Hide extra edit buttons*/ &&
        this.is_input &&
        !this.noPreview &&
        !this.$builder.isAnimation &&
        !this.$builder.isTracking &&
        (this.has_image /*Image menu*/ || this.has_restore) /*Restore menu*/
      );
    },

    has_animate_toolbar() {
      return this.is_input && !this.noPreview && this.$builder.isAnimation;
    },

    has_restore() {
      return this.pre_src;
    },

    is_input() {
      return this.$builder.isEditing; // this.mode === 'input'
    },

    upload_bg_url() {
      return this.$builder.getImageUploadUrl();
    },
    setting() {
      return this.object.data?.setting;
    },

    src() {
      if (this.$builder.isEditing) return this.object.data.src;
      return this.object.data.src?.applyAugment(this.augment, false);
    },
    is_dynamic_value() {
      return this.object.data?.src?.findAllDynamicAugmentKeys()?.length;
    },
    missed_dynamic_value() {
      // Some dynamic values not exist in augment!
      return (
        !this.$builder.isEditing &&
        this.src?.findAllDynamicAugmentKeys()?.length
      );
    },

    selected_aspect() {
      if (!this.setting) return this.aspects[0];

      const obj = this.aspects.find((it) => it.val === this.setting.aspect);
      return obj ? obj : this.aspects[0];
    },
    selected_float() {
      if (!this.setting) return this.floats[0];

      const obj = this.floats.find((it) => it.val === this.setting.float);
      return obj ? obj : this.floats[0];
    },
    /*  hasDefaultSlot() {
      return !!this.$slots.default;
    }*/

    //----------------------
    bg_cal() {
      return this.object.background?.generate();
    },

    fg_cal() {
      return this.setting.fg?.generate();
    },

    link() {
      return this.object.data.link;
    },

    animations() {
      return LUtilsClasses.GetAnimations(this.object.classes);
    },
    hovers() {
      return LUtilsClasses.GetHovers(this.object.classes);
    },
    threshold() {
      return LUtilsClasses.GetThreshold(this.object.style);
    },
  },
  watch: {
    "setting.aspect"(aspect) {
      // Force rerender image when select auto aspect ration : (Fix zero height problem)
      if (!aspect) {
        this.show_img = false;
        this.$nextTick(() => {
          this.show_img = true;
        });
      }
    },

    object() {
      this.init();
    },
  },

  mounted() {},

  methods: {
    isPercent(val) {
      return this.isString(val) && val?.includes("%");
    },

    init() {
      if (
        !this.object ||
        !(
          this.object instanceof XUploaderObject ||
          this.object instanceof XLottieObject
        )
      ) {
        console.error(
          "Invalid object in the image uploader! Type:",
          typeof this.object,
          "Object: ",
          this.object,
        );
        return;
      }
    },

    forceUpdate() {
      this.uid = Math.random();
      this.$forceUpdate();
    },

    //-------------------------------------------------------------

    showMasterDesignDialog() {
      this.ShowLSettingsClassStyle(
        this.$refs.i_image,
        this.$refs.i_image,

        this.object,
        {
          /*noSize: true,*/ prev_image: this.object.data.src,
          exclude: ["typeface", "grid"],
        }, // Not show size ! conflict with image size!
      );
    },

    //-------------------------------------------------------------
    showLayers() {
      this.ShowLSettingsImageLayers(
        this.$refs.i_image,
        this.object,
        this.src,
        () => {
          this.forceUpdate();
        },
      );
    },

    //-------------------------------------------------------------
    showResize() {
      this.ShowLSettingsImageSize(
        this.$refs.i_image,
        this.object,
        this.src,
        () => {
          this.$nextTick(() => {
            this.forceUpdate();
          });
        },
      );
    },

    //-------------------------------------------------------------

    deleteImage() {
      this.pre_src = this.src;
      this.object.data.src = "";
      this.$emit("uploaded", "");
    },
    restoreImage() {
      this.object.data.src = this.pre_src;
      this.$emit("uploaded", this.src);
      this.pre_src = null;
    },

    updateImage() {
      /*if (!this.$route.params.page_id) {
        this.showWarningAlert(null, "ابتدا این صفحه را ذخیره نمایید.");
        return;
      }*/

      this.dragOverHolder = false;

      this.busy_upload = true;

      const file = this.$refs.uploader.files[0];
      if (!file) return;

      // Preview image before upload:
      this.blobUrl = URL.createObjectURL(file);

      let formData = new FormData();
      formData.append(this.fileKey, file);

      let url = this.upload_bg_url;
      axios
        .post(url, formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        })
        .then((response) => {
          if (!response.data.error) {
            this.showSuccessAlert(null, `Image uploaded successfully.`);

            const imageURL = response.data.files.path;
            this.object.data.src = imageURL;

            this.$emit("uploaded", imageURL);

            const item = response.data.files.item; // Item in database
            const asset_images = this.$builder.getAssets()?.images;

            if (item && asset_images) {
              this.AddOrUpdateItemByID(asset_images, item);
              // console.log('Add new item to asset',asset_images,item)
            }
          } else {
            this.showErrorAlert(null, response.data.error_msg);
          }
        })
        .catch((error) => {
          this.showLaravelError(error);
        })
        .finally(() => {
          this.busy_upload = false;
          this.blobUrl = null;
        });
    },

    //----------------------------------------------------------------------------

    showAnimationEdit() {
      this.ShowLSettingsAnimation(
        this.$refs.i_image, // Style
        this.$refs.i_image, // Class

        this.object,
        "style",
        "classes",
        {
          /* noSize: true,*/ prev_image: this.object.data.src,
          exclude: ["typeface"],
        }, // Not show size ! conflict with image size!
      );
    },

    //----------------------------------------------------------------------------

    showLink() {
      this.ShowLSettingsLink(this.$refs.i_image, this.object, "link");
    },

    onDropEnterHolder() {
      this.dragOverHolder = true;
    },
    onDropLeaveHolder() {
      this.dragOverHolder = false;
    },
    //----------------------------------------------------------------------------
    handleDragOver(event) {
      event.preventDefault();

      const data_url = event.dataTransfer.getData("text/plain");
      if (this.isValidUrl(data_url)) {
        event.preventDefault();
      }
    },
    handleDrop(event) {
      const data_url = event.dataTransfer.getData("text/plain");

      if (this.isValidUrl(data_url)) {
        event.preventDefault();
        this.processImageUrl(data_url);
      }
    },
    isValidUrl(string) {
      if (!string) return false;
      try {
        if (string?.startsWith("shops_")) return true; // image path!

        const url = new URL(string);
        return url.protocol === "http:" || url.protocol === "https:";
      } catch (_) {
        return false;
      }
    },

    processImageUrl(url) {
      console.log("Dropped image URL:", url);
      this.pre_src = url;
      this.object.data.setSrc(url);
      this.dragOverHolder = false;

      // Add your logic to handle the URL (e.g., display the image)
    },

    showToolbar(){
      this.ShowUploaderToolbar(this.noPreview, this.augment, this.object, this.blobUrl, this.has_restore,this.restoreImage)
    }
  },
});
</script>

<style lang="scss" scoped>
.uploader {
  position: relative;
  cursor: pointer;
  outline: none;
  transition: all 0.65s;
  min-width: 64px;
  min-height: 64px;

  &:hover {
    background-color: #444;
    box-shadow: 0px 10px 50px 0px rgba(0, 0, 0, 0.2);
    transition: all 0.3s;

    background-image: repeating-linear-gradient(
      45deg,
      #ccc,
      #ccc 10px,
      #dbdbdb 10px,
      #dbdbdb 20px
    );

    .image-mark {
      opacity: 1;
    }

    .button-delete {
      opacity: 1;
    }
  }

  &.force-show-strips {
    min-height: 64px;
    background-color: rgba(166, 166, 166, 0.73);
    box-shadow: 0px 10px 50px 0px rgba(120, 120, 120, 0.2);
    transition: all 0.3s;
    opacity: 0.5;
    border-radius: 12px;
    background-image: repeating-linear-gradient(
      45deg,
      #999,
      #999 10px,
      #dbdbdb 10px,
      #dbdbdb 20px
    );

    &:hover {
      opacity: 1;
    }

    .image-mark {
      opacity: 1;
    }
  }
}

.image-mark {
  transition: opacity 0.5s;

  position: absolute !important;
  top: 50%;
  left: 50%;
  /* bring your own prefixes */
  transform: translate(-50%, -50%);
  opacity: 0;
}

.uploader-input {
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  width: 100%;
  opacity: 0;
  z-index: 10;
  cursor: pointer;
}

.drag-over {
  transition: all 0.2s ease-in-out;
  border-radius: 12px;
  border: solid #0288d1 4px;
  background: #fff;
}

.uploader {
  /*    img {
        width: 100%;

        display: block;
        min-width: 48px;
        min-height: 48px;

    }*/
}

.uploader:hover {
  box-shadow: 0 0 0 4px #0288d1;
}

.button-delete {
  margin: 0;
  z-index: 100;
  position: absolute !important;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  opacity: 0;
}

.loader-container {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 120px;
  height: 120px;
  max-width: 100%;
  max-height: 100%;
}

.image-container {
  overflow: hidden;
  flex-shrink: 0;
  position: relative;
  flex-direction: column;
  display: flex;
  margin: auto;
}

.anim-inherit {
  animation-duration: inherit;
  animation-iteration-count: inherit;
  animation-direction: inherit;
  animation-timing-function: inherit;
}

.-foreground {
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
}
</style>
