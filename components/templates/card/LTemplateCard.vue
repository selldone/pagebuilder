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
  <v-card
    v-if="modern"
    class="l-template-card-modern text-start"
    :class="{ 'l-template-card-modern--previewing': previewing }"
    :min-width="minWidth"
    :aria-busy="!!loading"
    variant="flat"
  >
    <component
      :is="previewing ? 'div' : 'button'"
      :type="previewing ? undefined : 'button'"
      class="l-template-card-modern__preview"
      :class="{ 'l-template-card-modern__preview--static': previewing }"
      :aria-label="
        previewing
          ? undefined
          : `${$t('global.commons.preview')} · ${template.name}`
      "
      :disabled="previewing ? undefined : disabled || !!loading"
      @click.stop="!previewing && $emit('preview', template)"
    >
      <v-img
        v-if="template.image"
        :src="getShopImagePath(template.image)"
        :aspect-ratio="previewing ? 1.28 : 1.52"
        :max-height="previewing ? 420 : undefined"
        :cover="!previewing"
        alt=""
      >
        <template #placeholder>
          <div class="l-template-card-modern__unavailable">
            <v-icon size="28" aria-hidden="true">layers</v-icon>
          </div>
        </template>
        <template #error>
          <div class="l-template-card-modern__unavailable">
            <v-icon size="28" aria-hidden="true">layers</v-icon>
            <span>{{ $t("page_builder.templates.preview_unavailable") }}</span>
          </div>
        </template>
      </v-img>
      <div v-else class="l-template-card-modern__empty-image">
        <v-icon size="28" aria-hidden="true">layers</v-icon>
        <span>{{ $t("page_builder.templates.preview_unavailable") }}</span>
      </div>
    </component>
    <u-loading-progress v-if="loading" />
    <div class="l-template-card-modern__content">
      <h3 dir="auto">{{ template.name }}</h3>
      <div class="l-template-card-modern__flags">
        <span v-if="template.premium">
          <v-icon size="13" aria-hidden="true">auto_awesome</v-icon>
          {{ $t("page_builder.templates.premium") }}
        </span>
        <span v-if="template.hot">
          <v-icon size="13" aria-hidden="true">local_fire_department</v-icon>
          {{ $t("page_builder.templates.hot") }}
        </span>
      </div>
      <div v-if="$slots.details" class="l-template-card-modern__details">
        <slot name="details" />
      </div>
      <div class="l-template-card-modern__actions">
        <v-btn
          v-if="!previewing"
          class="l-template-card-modern__action l-template-card-modern__action--preview"
          color="primary"
          variant="text"
          :disabled="disabled || !!loading"
          @click.stop="$emit('preview', template)"
        >
          {{ $t("global.commons.preview") }}
          <v-icon end size="16" aria-hidden="true">visibility</v-icon>
        </v-btn>
        <v-btn
          v-if="need_become_premium"
          class="l-template-card-modern__action"
          color="primary"
          variant="flat"
          :disabled="disabled || !!loading"
          @click.stop="selectTemplate"
        >
          <v-icon start size="16" aria-hidden="true">auto_awesome</v-icon>
          {{ $t("global.actions.become_premium") }}
        </v-btn>
        <v-btn
          v-else-if="selection || clickable"
          class="l-template-card-modern__action"
          color="primary"
          variant="flat"
          :loading="!!loading"
          :disabled="disabled || !!loading"
          @click.stop="selectTemplate"
        >
          {{ $t("page_builder.templates.select") }}
          <v-icon end size="16" aria-hidden="true">check</v-icon>
        </v-btn>
        <v-btn
          v-else-if="!in_shop_mode && !to"
          class="l-template-card-modern__action"
          :href="`/magic-links/shop:pages:template?template_id=${template.id}`"
          target="_blank"
          rel="noopener noreferrer"
          color="primary"
          variant="flat"
          :disabled="disabled || !!loading"
          @click.stop
        >
          {{ $t("global.actions.deploy_now") }}
          <v-icon end size="16" aria-hidden="true">north_east</v-icon>
        </v-btn>
        <v-btn
          v-else
          class="l-template-card-modern__action"
          :to="
            to || {
              name: 'BPageLandingEditor',
              params: { page_id: 'new' },
              query: { template_id: template.id },
            }
          "
          color="primary"
          variant="flat"
          :disabled="disabled || !!loading"
          @click.stop
        >
          <v-icon start size="16" aria-hidden="true">upload_file</v-icon>
          {{ $t("global.actions.deploy_now") }}
        </v-btn>
      </div>
    </div>
  </v-card>
  <v-card
    v-else
    :class="{
      //'widget-hover pp': clickable /*We are in teh shop!*/,
    }"
    :disabled="!!loading"
    :min-width="minWidth"
    :ripple="clickable"
    :to="need_become_premium ? undefined : to"
    class="rounded-2rem position-relative overflow-hidden pa-2 border"
    @click="need_become_premium ? showNeedSubscribePremium() : $emit('select')"
    :variant="variant"
    :style="!clickable && !to ? 'cursor: initial' : undefined"
  >
    <v-img
      :src="getShopImagePath(template.image)"
      aspect-ratio="1"
      class="rounded-2rem"
      cover
    >
      <template v-slot:placeholder>
        <v-icon class="center-absolute op-0-3" size="48">layers</v-icon>
      </template>
      <div class="ma-2 absolute-bottom-end">
        <v-chip
          v-if="template.premium"
          class="ma-1"
          color="#673AB7"
          size="x-small"
          variant="flat"
          title="This template is accessible exclusively for premium users who have subscribed to premium content."
        >
          <v-icon start>auto_awesome</v-icon>
          premium
        </v-chip>
        <v-chip
          v-if="template.hot"
          class="ma-1"
          color="#D32F2F"
          size="x-small"
          variant="flat"
        >
          <v-icon start>local_fire_department</v-icon>
          hot
        </v-chip>
      </div>
    </v-img>
    <u-loading-progress v-if="loading"></u-loading-progress>
    <v-card-title class="text-subtitle-2">
      {{ template.name }}
    </v-card-title>
    <v-card-actions>
      <div class="widget-buttons">
        <v-btn
          v-if="template.preview"
          :href="template.preview"
          :size="size"
          target="_blank"
          variant="outlined"
          @click.stop
          >{{ $t("global.commons.preview") }}
          <v-icon end>open_in_new</v-icon>
        </v-btn>

        <v-btn
          v-if="need_become_premium"
          color="#000"
          :size="size"
          variant="elevated"
          @click="showNeedSubscribePremium()"
        >
          <v-icon start>auto_awesome</v-icon>

          {{ $t("global.actions.become_premium") }}
        </v-btn>

        <v-btn
          v-else-if="!in_shop_mode"
          :href="`/magic-links/shop:pages:template?template_id=${template.id}`"
          color="#000"
          :size="size"
          target="_blank"
          variant="elevated"
        >
          <v-icon start>upload_file</v-icon>

          {{ $t("global.actions.deploy_now") }}
        </v-btn>
        <v-btn
          v-else-if="in_shop_mode"
          :to="{
            name: 'BPageLandingEditor',
            params: { page_id: 'new' },
            query: { template_id: template.id },
          }"
          color="#000"
          :size="size"
          variant="elevated"
        >
          <v-icon start>upload_file</v-icon>

          {{ $t("global.actions.deploy_now") }}
        </v-btn>
      </div>
    </v-card-actions>
  </v-card>
</template>

<script lang="ts">
import { BEventBusMixin } from "@selldone/components-vue/utils/events/BEventBusMixin.ts";

export default {
  name: "LTemplateCard",
  mixins: [BEventBusMixin],
  components: {},
  emits: ["select", "preview"],
  props: {
    modern: Boolean,
    selection: Boolean,
    previewing: Boolean,
    disabled: Boolean,
    template: {
      type: Object,
      require: true,
    },
    to: {},

    loading: {},

    clickable: Boolean,
    variant: {
      default: "outlined",
    },
    minWidth: {},

    size: {
      default: "large",
    },
  },
  data() {
    return {};
  },

  computed: {
    user() {
      return this.USER();
    },
    need_become_premium() {
      return this.template.premium && !this.user?.premium;
    },

    in_shop_mode() {
      return !!this.$route.params.shop_id;
    },
  },

  watch: {},
  created() {},
  mounted() {},

  updated() {},

  beforeUnmount() {},
  methods: {
    selectTemplate() {
      if (this.disabled || this.loading) return;
      if (this.need_become_premium) {
        this.showNeedSubscribePremium();
        return;
      }
      this.$emit("select");
    },
  },
};
</script>

<style lang="scss" scoped>
.l-template-card-modern {
  display: flex;
  flex-direction: column;
  min-width: 0;
  height: 100%;
  overflow: clip;
  border: 1px solid rgba(var(--v-theme-on-surface), 0.12);
  border-radius: 13px;
  background: rgb(var(--v-theme-surface));
  color: rgb(var(--v-theme-on-surface));
  font-family: inherit;

  &__preview {
    display: block;
    width: 100%;
    padding: 0;
    border: 0;
    background: rgba(var(--v-theme-on-surface), 0.04);
    color: rgba(var(--v-theme-on-surface), 0.62);
    cursor: pointer;
    text-align: start;
  }
  &__preview:disabled,
  &__preview--static {
    cursor: default;
  }
  &__preview:focus-visible {
    outline: 2px solid rgb(var(--v-theme-primary));
    outline-offset: -3px;
  }
  &__unavailable,
  &__empty-image {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 8px;
    font-size: 12px;
    line-height: 19px;
    font-weight: 400;
  }
  &__unavailable {
    position: absolute;
    inset: 0;
  }
  &__empty-image {
    aspect-ratio: 1.52;
  }
  &__content {
    display: flex;
    flex-direction: column;
    flex: 1;
    min-width: 0;
    padding: 14px;
  }
  h3 {
    margin: 0;
    font-size: 14px;
    font-weight: 500;
    line-height: 21px;
    letter-spacing: 0;
    overflow-wrap: anywhere;
  }
  &__flags {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    gap: 4px 10px;
    min-height: 24px;
    margin-block-start: 9px;
    color: rgba(var(--v-theme-on-surface), 0.62);
    font-size: 11px;
    line-height: 17px;
    span {
      display: inline-flex;
      align-items: center;
      gap: 4px;
    }
  }
  &__actions {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    justify-content: space-between;
    gap: 7px;
    margin-block-start: auto;
    padding-block-start: 8px;
  }
  &__action {
    --v-btn-height: 35px;
    min-height: 35px;
    height: auto;
    min-width: 0;
    padding: 6px 10px;
    border-radius: 9px;
    font-family: inherit;
    font-size: 12px;
    font-weight: 500;
    line-height: 20px;
    letter-spacing: 0;
    text-indent: 0;
    text-transform: none;
    white-space: normal;
    :deep(.v-btn__content) {
      white-space: normal;
      font: inherit;
      letter-spacing: inherit;
      text-indent: inherit;
    }
  }
  &__action--preview {
    padding-inline: 6px;
  }

  &--previewing {
    display: grid;
    grid-template-columns: minmax(0, 1fr) 224px;
    align-items: start;
    gap: 26px;
    height: auto;
    border: 0;
    border-radius: 0;
    background: transparent;

    .l-template-card-modern__preview {
      overflow: hidden;
      padding: 12px;
      border: 1px solid rgba(var(--v-theme-on-surface), 0.12);
      border-radius: 13px;
    }
    .l-template-card-modern__content {
      padding: 7px 0 0;
    }
    h3 {
      font-size: 22px;
      line-height: 29px;
    }
    .l-template-card-modern__flags {
      margin-block: 12px 18px;
    }
    .l-template-card-modern__details {
      font-size: 13px;
      line-height: 21px;
    }
    .l-template-card-modern__actions {
      margin-block-start: 18px;
      padding: 0;
    }
    .l-template-card-modern__action {
      width: 100%;
      min-height: 42px;
    }
    .l-template-card-modern__empty-image {
      aspect-ratio: 1.28;
      max-height: 420px;
    }
  }

  @media (max-width: 700px) {
    &--previewing {
      grid-template-columns: minmax(0, 1fr);
      gap: 19px;
    }
    &--previewing .l-template-card-modern__content {
      padding: 0;
    }
  }

  @media (max-width: 600px) {
    &__content {
      padding: 11px;
    }
    h3 {
      font-size: 13px;
      line-height: 19px;
    }
    &__flags {
      min-height: 29px;
      gap: 3px 7px;
      margin-block-start: 6px;
    }
    &__actions {
      gap: 3px;
    }
    &__action {
      width: 100%;
    }
    &--previewing h3 {
      font-size: 20px;
      line-height: 27px;
    }
  }
  @media (max-width: 600px), (pointer: coarse) {
    &__action {
      min-height: 44px;
    }
    &--previewing .l-template-card-modern__action {
      min-height: 44px;
    }
  }
}
</style>
