/*
 * Copyright (c) 2024. Selldone® Business OS™
 *
 * Author: M.Pajuhaan
 * Web: https://selldone.com
 * ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
 *
 * All rights reserved. In the weave of time, where traditions and innovations intermingle, this content was crafted.
 * From the essence of thought, through the corridors of creativity, each word, and sentiment has been molded.
 * Not just to exist, but to inspire. Like an artist's stroke or a sculptor's chisel, every nuance is deliberate.
 * Our journey is not just about reaching a destination, but about creating a masterpiece.
 * Tread carefully, for you're treading on dreams.
 */

import {App, ref, Ref} from "vue";
import {builder} from "@selldone/page-builder/Builder.types.ts";
import {SEO} from "@selldone/core-js/helper";

/**
 * Interface representing the options required to initialize the Page Builder.
 */

interface PageBuilderOptions {
  /**
   * Operational mode of the Builder. Can be "edit" or "view".
   */
  mode: builder.Mode;
  /**
   * Server-related configurations, including functions to generate upload URLs.
   */
  server: builder.IServer;
}

/**
 * Initializes the Page Builder within a Vue application.
 *
 * @param {App} app - The Vue application instance.
 * @param {PageBuilderOptions} options - Configuration options for the Page Builder.
 */
export function PageHyper(app: App, options: PageBuilderOptions) {

  // Use to create Builder.newInstance(this.$PageHyperOptions) when the builder is not completely installed
  app.config.globalProperties.$PageHyperOptions = options; // 🌴 Global object in vue components


  // Initialize the PageBuilderService with the provided options
  const $PageHyper = new PageBuilderService(app, options);

  // Provide the service instance to the Vue app for global accessibility
  app.provide("$PageHyper", $PageHyper);
}

/**
 * Service class responsible for managing the Page Builder's lifecycle and state.
 */
class PageBuilderService {
  /**
   * The Vue application instance.
   */
  private readonly app: App;
  /**
   * Configuration options for the Page Builder.
   */
  public readonly options: PageBuilderOptions;
  /**
   * Reactive reference indicating whether the Page Builder has been initialized.
   */
  public isInitialized: Ref<boolean>;

  /**
   * Creates an instance of PageBuilderService.
   *
   * @param {App} app - The Vue application instance.
   * @param {PageBuilderOptions} options - Configuration options for the Page Builder.
   */
  constructor(app: App, options: PageBuilderOptions) {
    this.app = app;
    this.options = options;
    this.isInitialized = ref(false);
  }

  /**
   * Initializes the Page Builder by dynamically importing and setting it up.
   *
   * This method ensures that the Page Builder is only initialized once.
   * It updates the `isInitialized` state upon successful initialization.
   *
   * @returns {Promise<void>} A promise that resolves when initialization is complete.
   *
   * @throws Will throw an error if the initialization fails.
   */
  public async initialize(): Promise<void> {
    // Prevent re-initialization if already initialized
    if (this.isInitialized.value) {
      return;
    }

    try {
      // Dynamically import the SetupPageBuilder function from the Page Builder module
      const { SetupPageBuilder } = await import("@selldone/page-builder");

      // Execute the setup function with the Vue app and configuration options
      SetupPageBuilder(this.app, this.options);

      // Update the initialization state to true
      this.isInitialized.value = true;
    } catch (error) {
      console.error("Failed to initialize Page Builder:", error);
      throw error;
    }
  }
}
