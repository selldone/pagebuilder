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

<template xmlns:v-slot="http://www.w3.org/1999/XSL/Transform">
  <!-- ▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄ Toolbar ▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄ -->

  <v-menu
    v-if="has_edit_toolbar || has_animate_toolbar"
    :activator="$refs.container as HTMLElement"
    location="top"
    open-on-hover
    transition="slide-y-reverse-transition"
    :open-delay="0"
    :close-on-content-click="false"
  >
    <v-toolbar
      v-if="has_edit_toolbar"
      density="compact"
      rounded="lg"
      theme="dark"
      color="#111"
      style="max-width: max-content"
    >
      <v-toolbar-items>
        <template v-if="src">
          <v-btn
            @click.stop="
              setting.contain = !setting.contain;
              forceUpdate();
            "
            icon
            size="small"
          >
            <v-icon
              >{{ setting.contain ? "fullscreen_exit" : "fullscreen" }}
            </v-icon>
            <v-tooltip
              activator="parent"
              content-class="bg-black"
              text="Contain / Cover"
              location="bottom"
            ></v-tooltip>
          </v-btn>

          <v-btn @click.stop="showResize()" icon size="small">
            <v-icon> photo_size_select_large</v-icon>
            <v-tooltip
              activator="parent"
              content-class="bg-black"
              text="Size"
              location="bottom"
            ></v-tooltip>
          </v-btn>

          <v-btn @click.stop="showMasterDesignDialog()" icon size="small">
            <v-icon> architecture</v-icon>
            <v-tooltip
                activator="parent"
                content-class="bg-black"
                text="Classes & Style"
                location="bottom"
            ></v-tooltip>
          </v-btn>



          <v-btn @click.stop="showLayers()" icon size="small">
            <v-icon> layers</v-icon>
            <v-tooltip
              activator="parent"
              content-class="bg-black"
              text="Image Layers"
              location="bottom"
            ></v-tooltip>
          </v-btn>

          <v-menu open-on-hover    :close-on-content-click="false">
            <template v-slot:activator="{ props }">
              <v-btn v-bind="props" icon size="small">
                <v-icon> {{ selected_aspect.icon }}</v-icon>
              </v-btn>
            </template>

            <v-card subtitle="Aspect Ratio" class="text-start bg-black">
              <v-list
                density="compact"
                bg-color="transparent"
                class="border-between-vertical"
              >
                <v-list-item
                  v-for="(item, index) in aspects"
                  :key="index"
                  @click.stop="
                    setting.aspect = item.val;
                    forceUpdate();
                  "
                  :prepend-icon="item.icon"
                  :title="item.title"
                >
                  <template v-slot:append>
                    <v-list-item-action>
                      <v-icon color="green" v-if="setting.aspect === item.val"
                        >check
                      </v-icon>
                    </v-list-item-action>
                  </template>
                </v-list-item>

                <v-list-item
                  key="round"
                  @click.stop="
                    setting.round = !setting.round;
                    forceUpdate();
                  "
                  prepend-icon="panorama_fish_eye"
                >
                  <v-list-item-title> Circle</v-list-item-title>
                  <template v-slot:append>
                    <v-list-item-action>
                      <v-icon color="green" v-if="setting.round">check</v-icon>
                    </v-list-item-action>
                  </template>
                </v-list-item>
              </v-list>
            </v-card>
          </v-menu>

          <v-menu v-if="!noFloat" open-on-hover    :close-on-content-click="false">
            <template v-slot:activator="{ props }">
              <v-btn v-bind="props" icon size="small">
                <v-icon> {{ selected_float.icon }}</v-icon>
              </v-btn>
            </template>

            <v-card subtitle="Float Position" class="text-start bg-black">
              <v-list
                density="compact"
                bg-color="transparent"
                class="border-between-vertical"
              >
                <v-list-item
                  v-for="(item, index) in floats"
                  :key="index"
                  @click="
                    setting.float = item.val;
                    forceUpdate();
                  "
                  :prepend-icon="item.icon"
                  :title="item.title"
                >
                  <template v-slot:append>
                    <v-list-item-action>
                      <v-icon color="green" v-if="setting.float === item.val"
                        >check
                      </v-icon>
                    </v-list-item-action>
                  </template>
                </v-list-item>
              </v-list>
            </v-card>
          </v-menu>

          <v-btn @click.stop="showLink()" icon size="small">
            <v-icon>add_link</v-icon>

            <v-tooltip
              activator="parent"
              content-class="bg-black"
              text="Add Link"
              location="bottom"
            ></v-tooltip>
          </v-btn>
        </template>
        <v-btn v-else-if="has_restore" @click.stop="restoreImage()" icon size="small">
          <v-icon>settings_backup_restore</v-icon>
          <v-tooltip
            activator="parent"
            content-class="bg-black"
            text="Restore Previous Image"
            location="bottom"
          ></v-tooltip>
        </v-btn>
      </v-toolbar-items>
    </v-toolbar>
    <v-toolbar
      v-else-if="has_animate_toolbar"
      density="compact"
      rounded="lg"
      theme="dark"
      color="#111"
      style="max-width: max-content"
    >
      <span v-html="getAnimationClassesDetail()"></span>

      <v-btn
        @click.stop="showAnimationEdit()"
        title="Image Animation"
        icon
        variant="text"
      >
        <v-icon>movie_filter</v-icon>
      </v-btn>
    </v-toolbar>
  </v-menu>

  <!-- ▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄ Image ▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄ -->

  <component
    v-if="src || blobUrl || $builder.isEditing"
    v-bind="$attrs"
    :is="link && !$builder.isEditing ? 'a' : 'div'"
    ref="container"
    :class="[
      {
        uploader: $builder.isEditing,
        'force-show-strips': !src,
        'drag-over': dragOverHolder,
      },
      /*classes,*/
      !noFloat && setting.float ? `float-${setting.float}` : null,

      /*root_classes*/

      classes /*image_classes*/,

      { 'rounded-circle': setting.round }, // to keep rounded intuitive!
    ]"
    class="image-container flex-column d-flex margin-default-auto"
    target="_blank"
    :href="link"
    :style="[
      {
        // Need same size to parent!
        'aspect-ratio': setting?.aspect,
        height: size?.h,
        width: size?.w,
        'min-height': is_waiting_for_drop_image ? 200 : size?.min_h,
        'min-width': size?.min_w,
        'max-height': size?.max_h,
        'max-width': size?.max_w,
      },
      {
        animationDuration: styles?.animationDuration,
        animationDelay: styles?.animationDelay,
        animationIterationCount: styles?.animationIterationCount,
        animationDirection: styles?.animationDirection,
        animationTimingFunction: styles?.animationTimingFunction,
      },
    ]"
    v-init-data-attribute="styles"
    clonable="true"
    @click="
      $builder.onClickClone($event, $section.get(path), [
        'classes',
        'style',
        'setting',
      ]);
      init();
      $forceUpdate();
    "
  >
    <slot :src="src"></slot>

    <div
      v-if="is_dynamic_value && $builder.isEditing"
      class="absolute-bottom-start pa-2 ma-2 bg-white rounded-lg text-start text-black pen"
      style="max-height: 80%; overflow: hidden; font-size: 14px"
    >
      <b class="d-block">
        <v-icon color="#111" class="me-1">whatshot</v-icon>
        {{ src?.findAllDynamicAugmentKeys().join(" - ") }}</b
      >
      <small
        >The image url will be created by augment values which will be feed
        dynamically.</small
      >
    </div>
    <img
      v-if="
        (src || blobUrl) &&
        !noPreview &&
        show_img &&
        !missed_dynamic_value /*In live mode do not show broken dynamic urls!*/
      "
      :src="
        is_dynamic_value && $builder.isEditing
          ? require('./assets/dynamic-image-placeholder.png')
          : blobUrl
            ? blobUrl
            : getShopImagePath(src)
      "
      :style="[
        bg_cal,
        {
          'aspect-ratio': setting.aspect,
          'object-fit': setting.contain ? 'contain' : 'cover',
          height: isPercent(size.h) ? '100%' : size.h,
          width: isPercent(size.w) ? '100%' : size.w,
          'min-height': size.min_h,
          'min-width': size.min_w,
          'max-height': isPercent(size.max_h) ? '100%' : size.max_h,
          'max-width': isPercent(size.max_w) ? '100%' : size.max_w,

          // Fix animation in classes which apply to its parent! Duration and repeat of animation will be set to styles!
          // Because we like to have padding and margin and other custome style separate than classes (more flexibility)
          // 'animation-name': 'inherit',
        },
        styles,
      ]"
      :class="[
        { 'rounded-circle': setting.round },

        $builder.isEditing ? 'pen' : null,
      ]"
      class="d-block margin-default-auto"
      ref="i_image"
    />

    <div
      class="-foreground"
      :style="fg_cal"
      :class="{
        'rounded-circle': setting.round /*to keep rounded intuitive!*/,
      }"
    ></div>

    <template v-if="$builder.isEditing">
      <input
        v-if="is_input"
        ref="uploader"
        class="uploader-input"
        type="file"
        @change="updateImage"
        @dragenter="onDropEnterHolder"
        @dragleave="onDropLeaveHolder"
      />

      <v-icon size="48px" color="#fff" class="image-mark"> image</v-icon>

      <v-btn
        v-if="is_input && src && !dragOverHolder"
        icon
        class="button-delete"
        variant="flat"
        color="red"
        @click="deleteImage()"
        @click.stop
        title="Delete image"
      >
        <v-icon>close</v-icon>
      </v-btn>

      <div v-if="busy_upload" class="loader-container">
        <div class="circular-loader"></div>
      </div>
    </template>
  </component>
</template>

<script lang="ts">
import { BackgroundHelper } from "@core/helper/style/BackgroundHelper";
import { StylerHelper } from "@app-page-builder/src/helpers/StylerHelper";
import { PageBuilderMixin } from "@app-page-builder/mixins/PageBuilderMixin";
import { defineComponent } from "vue";
import { LandingHistoryMixin } from "@app-page-builder/mixins/LandingToolsMixin";

const ASPECTS = [
  { val: undefined, title: "Auto", icon: "crop_free" },
  { val: 1, title: "Square", icon: "crop_square" },
  { val: 7 / 5, title: "7:5", icon: "crop_7_5" },
  { val: 5 / 4, title: "5:4", icon: "crop_5_4" },
  { val: 3 / 2, title: "3:2", icon: "crop_3_2" },
  { val: 16 / 9, title: "16:9", icon: "crop_16_9" },
];

const FLOATS = [
  { val: undefined, title: "None", icon: "remove" },
  { val: "start", title: "Start", icon: "first_page" },
  { val: "end", title: "End", icon: "last_page" },
];

export const XUploader = defineComponent({
  name: "XUploader",
  mixins: [PageBuilderMixin, LandingHistoryMixin],

  components: {},
  inject: ["$builder", "$section"],
  props: {
    path: {
      // Path to src & setting
      type: String,
      required: true,
    },
    mode: {
      default: "input",
      type: String,
    },

    initialClasses: {
      type: Array,
    },
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
  },

  data: () => ({
    image: {},
    classes: null,
    styles: null,

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
        (this.has_image/*Image menu*/ || this.has_restore/*Restore menu*/)
      );
    },

    has_animate_toolbar() {
      return this.is_input && !this.noPreview && this.$builder.isAnimation;
    },

    has_restore(){
      return this.pre_src
    },

    original_data() {
      return this.$section.get(this.path);
    },

    is_input() {
      return this.$builder.isEditing; // this.mode === 'input'
    },
    max_w() {
      return this.size.max_w;
    },

    upload_bg_url() {
      return this.getPageBuilderUploadUrlImage();
    },
    setting() {
      const uid = this.uid;
      return this.image.setting;
    },
    size() {
      const uid = this.uid;
      return this.setting.size;
    },

    src() {
      if (this.$builder.isEditing) return this.image.src;
      return this.image.src?.applyAugment(this.augment, false);
    },
    is_dynamic_value() {
      return this.image.src?.findAllDynamicAugmentKeys()?.length;
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
      const bg = this.setting.bg;
      if (!bg) return null;
      return BackgroundHelper.CreateCompleteBackgroundStyleObject(
        bg.bg_custom,
        bg.bg_gradient,
        bg.bg_image ? this.getShopImagePath(bg.bg_image) : null,
        bg.bg_size,
        bg.bg_repeat,
        bg.bg_color,
      );
    },
    fg_cal() {
      const fg = this.setting.fg;
      if (!fg) return null;
      return BackgroundHelper.CreateCompleteBackgroundStyleObject(
        fg.bg_custom,
        fg.bg_gradient,
        fg.bg_image ? this.getShopImagePath(fg.bg_image) : null,
        fg.bg_size,
        fg.bg_repeat,
        fg.bg_color,
      );
    },

    link() {
      return this.image && this.image.link;
    },
  },
  watch: {
    image: {
      deep: true,
      handler() {
        this.$section.set(this.path, this.image);
      },
    },
    "setting.aspect"(aspect) {
      // Force rerender image when select auto aspect ration : (Fix zero height problem)
      if (!aspect) {
        this.show_img = false;
        this.$nextTick(() => {
          this.show_img = true;
        });
      }
    },

    original_data(original_data) {
      // console.log('original_data',original_data)
      this.init();
    },
  },

  mounted() {},

  methods: {
    isPercent(val) {
      return this.isString(val) && val?.includes("%");
    },

    init() {
      this.image = this.$section.get(this.path);
      // console.log('init',this.image)

      if (!this.image || !Object.keys(this.image) || !this.image.setting)
        this.image = { src: null, setting: {} };

      //  console.log('this.image.setting.size',this.image.setting.size)
      if (!this.image.setting.size) {
        this.image.setting.size = this.initialSize
          ? this.initialSize
          : { w: "100%", h: "100%", min_h: "20px", max_w: "100%" };

        this.image.setting.contain = !!this.contain;
      }

      // this.setting.contain=!this.cover
      // this.setting.aspect=this.aspectRatio

      this.classes = this.$section.get(this.path + ".classes");
      this.styles = this.$section.get(this.path + ".style");

      if (!this.classes || !Array.isArray(this.classes)) {
        this.classes = this.initialClasses ? this.initialClasses : [];
        // Auto set class image:
        //  console.log('Auto set class image',this.classes)
        this.$section.set(this.path + ".classes", this.classes);
      }

      if (this.rounded && this.setting.round === undefined) {
        this.setting.round = this.rounded;
        this.setting.aspect = 1;
      }
    },

    forceUpdate() {
      this.uid = Math.random();
      this.$forceUpdate();
      /*
      this.$nextTick(() => {
        this.$forceUpdate();

        //this.$refs.i_image.$forceUpdate();
      });
      console.log('======******======',this.setting.size)*/
    },

    //-------------------------------------------------------------

    showMasterDesignDialog() {
      this.ShowGlobalStyleEditorDialog(
        this.$refs.i_image,
        this.$refs.i_image,

        this.$section.get(this.path),
        "style",
        "classes",
        { noSize: true, prev_image: this.image.src }, // Not show size ! conflict with image size!
      );
    },

    //-------------------------------------------------------------
    showLayers() {
      this.ShowGlobalImageLayersDialog(
        this.$refs.i_image,
        this.$section,
        `${this.path}.setting`,
        this.src,
        this.setting,
        () => {
          this.forceUpdate();
        },
      );
    },

    //-------------------------------------------------------------
    showResize() {
      this.ShowGlobalImageSizeDialog(
        this.$refs.i_image,
        this.$section,
        `${this.path}.setting.size`,
        this.src,
        this.setting,
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
      this.image.src = "";
      //// this.$section.set(this.path, "");
      this.$emit("uploaded", "");
    },
    restoreImage() {
      this.image.src = this.pre_src;
      //// this.$section.set(this.path,  this.src );
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

      // this.image.src = imageURL;
      ////   this.$section.set(this.path, imageURL);

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

            /* let imageURL = response.data.files.url;
                              this.image.src = imageURL;*/
            const imageURL = response.data.files.path;
            this.image.src = imageURL;
            /////    this.$section.set(this.path, imageURL);
            this.$emit("uploaded", imageURL);
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
      this.ShowGlobalAnimationEditorDialog(
        this.$refs.i_image, // Style
        this.$el, // Class

        this.$section,
        this.path + ".style",
        this.path + ".classes",
        { noSize: true, prev_image: this.image.src }, // Not show size ! conflict with image size!
      );
    },
    getAnimationClassesDetail() {
      return StylerHelper.GetAnimationClassesDetail(this.classes, this.styles);
    },

    //----------------------------------------------------------------------------

    showLink() {
      this.ShowGlobalLinkEditorDialog(
        this.$el,
        this.$section,
        this.path + ".link",
      );
    },

    onDropEnterHolder(e) {
      //console.log('onDropEnterHolder',e)
      this.dragOverHolder = true;
    },
    onDropLeaveHolder(e) {
      // console.log('onDropLeaveHolder',e)

      this.dragOverHolder = false;
    },
  },
});
export default XUploader;
</script>
<style src="../styles/uploader.scss" lang="scss"></style>

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
  z-index: 100;
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

/*
.image-tools {
  position: absolute;
  top: 0px;
  right: 0;
  z-index: 999;
  min-width: max-content;
  opacity: 0.1;
  //transform: translateY(110%);

  &:hover {
    z-index: 999;
  }
}
*/
.image-container {
  flex-shrink: 0;
  display: block;
  position: relative;

  // transition: all 0.45s;
  /*  &:hover {
      .image-tools {
        opacity: 1;
      }
    }*/
}

.anim-inherit {
  animation-duration: inherit;
  animation-iteration-count: inherit;
  animation-direction: inherit;
  animation-timing-function: inherit;
}

.margin-default-auto {
  margin: auto;
}

.-foreground {
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
}
</style>
