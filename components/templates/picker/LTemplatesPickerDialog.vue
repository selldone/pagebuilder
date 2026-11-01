<template>
  <v-dialog
    :model-value="modelValue"
    :persistent="selecting"
    :fullscreen="isFullscreen"
    :max-width="isFullscreen ? undefined : 1080"
    scrollable
    :aria-label="$t('page_builder.templates.picker_title')"
    @update:model-value="setOpen"
    @after-leave="restoreFocus"
  >
    <template v-if="$slots.activator" #activator="props"
      ><slot name="activator" v-bind="props"
    /></template>
    <v-card
      v-if="modelValue"
      class="l-templates-picker text-start"
      :class="{ 'l-templates-picker--fullscreen': isFullscreen }"
    >
      <header class="l-templates-picker__header">
        <div>
          <h2>{{ $t("page_builder.templates.picker_title") }}</h2>
          <p>{{ $t("page_builder.templates.picker_subtitle") }}</p>
        </div>
        <v-btn
          icon
          variant="text"
          class="l-templates-picker__close"
          :disabled="selecting"
          :aria-label="$t('global.actions.close')"
          @click="setOpen(false)"
        >
          <v-icon size="18">close</v-icon>
          <v-tooltip activator="parent" location="top" open-on-focus>{{
            $t("global.actions.close")
          }}</v-tooltip>
        </v-btn>
      </header>
      <v-card-text class="l-templates-picker__body thin-scroll">
        <l-templates-list
          modern
          :has-raw-templates="false"
          :clickable="selectable"
          :load-from-query="false"
          :initial-preview="initialTemplate"
          @select:page="selected"
          @update:busy="selecting = $event"
        />
      </v-card-text>
      <v-card-actions class="l-templates-picker__footer">
        <v-btn variant="text" :disabled="selecting" @click="setOpen(false)">{{
          $t("global.actions.cancel")
        }}</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script lang="ts">
import LTemplatesList from "../list/LTemplatesList.vue";

export default {
  name: "LTemplatesPickerDialog",
  components: { LTemplatesList },
  emits: ["update:modelValue", "select:page"],
  props: {
    modelValue: Boolean,
    fullscreen: Boolean,
    initialTemplate: Object,
    selectable: { type: Boolean, default: true },
  },
  data: () => ({ selecting: false, returnFocus: null }),
  computed: {
    isFullscreen() {
      return this.fullscreen || this.$vuetify.display.xs;
    },
  },
  watch: {
    modelValue: {
      immediate: true,
      handler(open) {
        this.selecting = false;
        if (open && typeof document !== "undefined")
          this.returnFocus = document.activeElement;
      },
    },
  },
  methods: {
    restoreFocus() {
      if (this.modelValue) return;
      if (this.returnFocus?.isConnected) this.returnFocus.focus();
      this.returnFocus = null;
    },
    setOpen(open) {
      if (!open && this.selecting) return;
      this.$emit("update:modelValue", open);
    },
    selected(page) {
      this.$emit("select:page", page);
      this.$emit("update:modelValue", false);
    },
  },
};
</script>

<style lang="scss" scoped>
.l-templates-picker {
  border-radius: 18px;
  font-family: inherit;
  color: rgb(var(--v-theme-on-surface));
  background: rgb(var(--v-theme-surface));
  &--fullscreen {
    border-radius: 0;
  }
  &__header {
    display: flex;
    align-items: start;
    justify-content: space-between;
    gap: 20px;
    padding: 24px 26px 21px;
    border-bottom: 1px solid rgba(var(--v-theme-on-surface), 0.12);
    h2 {
      font-size: 24px;
      line-height: 32px;
      font-weight: 500;
      margin: 0;
    }
    p {
      margin: 5px 0 0;
      font-size: 13px;
      color: rgba(var(--v-theme-on-surface), 0.66);
    }
  }
  &__close {
    width: 34px;
    height: 34px;
    border: 1px solid rgba(var(--v-theme-on-surface), 0.12);
    border-radius: 9px;
    flex-shrink: 0;
  }
  &__body {
    padding: 24px !important;
  }
  &__footer {
    justify-content: flex-end;
    padding: 12px 24px;
    border-top: 1px solid rgba(var(--v-theme-on-surface), 0.12);
    .v-btn {
      min-height: 42px;
      padding-inline: 13px;
      font-size: 13px;
      font-weight: 500;
      letter-spacing: 0;
      text-transform: none;
    }
  }
  @media (max-width: 600px) {
    border-radius: 0;
    &__header {
      padding: 20px 18px;
    }
    &__body {
      padding: 18px !important;
    }
    &__close {
      width: 44px;
      height: 44px;
    }
    &__footer .v-btn {
      min-height: 44px;
    }
  }
}
</style>
