// Builder.types.ts

/*
 * Builder Type Definitions
 *
 * This file contains all the type definitions and interfaces used by the Builder class.
 * It promotes reusability and better organization within the project.
 */

import { Section } from "./src/section/section";
import { Page } from "@selldone/core-js/models/shop/page/page.model";
import { Popup } from "@selldone/core-js/models/shop/popup/popup.model";
import { ShopMenu } from "@selldone/core-js/models/shop/design/menu.model";

/**
 * Namespace containing all Builder-related types and interfaces.
 */
export namespace builder {
  /**
   * Defines the operational modes of the Builder.
   */
  export type Mode = "edit" | "view";

  /**
   * Defines the types of models the Builder can handle.
   */
  export type ModelType = "page" | "popup" | "menu";

  /**
   * Union type representing the possible models.
   */
  export type IModel = Page | Popup | ShopMenu;

  /**
   * Function type for generating upload URLs based on model type and instance.
   */
  export type IUploadUrlFunction = (
      type: ModelType,
      model: IModel,
  ) => string | null;

  /**
   * Interface representing server-related configurations.
   */
  export interface IServer {
    uploadImageUrl: IUploadUrlFunction;
    uploadVideoUrl: IUploadUrlFunction;
  }

  /**
   * Interface representing the options for initializing the Builder.
   */
  export interface IOptions {
    mode: Mode;

    title: string;
    sections: Section[];
    style: any;
    css: IPageCss | null | undefined;
    columnsPrefix: {
      mobile: string;
      tablet: string;
      desktop: string;
      widescreen: string;
      ultrawide: string;
    };

    // Edit mode only options:
    server?: IServer;
    type?: ModelType;
    model?: IModel;
  }

  /**
   * Interface representing the internal state of the Builder.
   */
  export interface IState {
    isEditing: boolean;
    isHideExtra: boolean;
    isSorting: boolean;
    isRendered: boolean;
    showLeftMenu: boolean; // Hide side menus when styler is visible
    focusMode: boolean;
  }
}

/**
 * Type representing the CSS configuration for a page.
 */
export type IPageCss = {
  classes: { selector: string; value: string }[] | null;
  raw: string | null;
};
