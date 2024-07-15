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

import XColumnImageText from "@selldone/page-builder/components/x/column-image-text/XColumnImageText.vue";
import XRow from "@selldone/page-builder/components/x/row/XRow.vue";
import XColumn from "@selldone/page-builder/components/x/column/XColumn.vue";
import XSection from "@selldone/page-builder/components/x/section/XSection.vue";
import XContainer from "@selldone/page-builder/components/x/container/XContainer.vue";
import XButtons from "@selldone/page-builder/components/x/buttons/XButtons.vue";
import XFeederProducts from "@selldone/page-builder/components/x/feeder/products/XFeederProducts.vue";
import XText from "@selldone/page-builder/components/x/text/XText.vue";
import XUploader from "@selldone/page-builder/components/x/uploader/XUploader.vue";
import XButton from "@selldone/page-builder/components/x/button/XButton.vue";
import XProduct from "@selldone/page-builder/components/x/product/XProduct.vue";
import XLottie from "@selldone/page-builder/components/x/lottie/XLottie.vue";
import XSearch from "@selldone/page-builder/components/x/search/XSearch.vue";
import XMarquee from "@selldone/page-builder/components/x/marquee/XMarquee.vue";
import XGalleryExpandable from "@selldone/page-builder/components/x/gallery-expandable/XGalleryExpandable.vue";
import XGalleryExpandableItem
  from "@selldone/page-builder/components/x/gallery-expandable/item/XGalleryExpandableItem.vue";
import XDiv from "@selldone/page-builder/components/x/div/XDiv.vue";
import XSwiper from "@selldone/page-builder/components/x/swiper/XSwiper.vue";
import XVideoBackground from "@selldone/page-builder/components/x/video-background/XVideoBackground.vue";
import XArticle from "@selldone/page-builder/components/x/article/XArticle.vue";
import XProducts from "@selldone/page-builder/components/x/products/XProducts.vue";
import XCode from "@selldone/page-builder/components/x/code/XCode.vue";
import XProductOverview from "@selldone/page-builder/components/x/product-overview/XProductOverview.vue";
import XForm from "@selldone/page-builder/components/x/form/XForm.vue";
import XInputText from "@selldone/page-builder/components/x/input/text/XInputText.vue";
import XFeederBlogs from "@selldone/page-builder/components/x/feeder/blogs/XFeederBlogs.vue";
import {XSectionObject} from "@selldone/page-builder/components/x/section/XSectionObject.ts";
import {LModelElementTypes} from "@selldone/page-builder/models/element/LModelElement.ts";
import {XArticleObject} from "@selldone/page-builder/components/x/article/XArticleObject.ts";
import {XButtonObject} from "@selldone/page-builder/components/x/button/XButtonObject.ts";
import {XCodeObject} from "@selldone/page-builder/components/x/code/XCodeObject.ts";
import {XButtonsObject} from "@selldone/page-builder/components/x/buttons/XButtonsObject.ts";
import {XColumnObject} from "@selldone/page-builder/components/x/column/XColumnObject.ts";
import {XColumnImageTextObject} from "@selldone/page-builder/components/x/column-image-text/XColumnImageTextObject.ts";
import {XContainerObject} from "@selldone/page-builder/components/x/container/XContainerObject.ts";
import {XFeederBlogsObject} from "@selldone/page-builder/components/x/feeder/blogs/XFeederBlogsObject.ts";
import {XFeederProductsObject} from "@selldone/page-builder/components/x/feeder/products/XFeederProductsObject.ts";
import {XFormObject} from "@selldone/page-builder/components/x/form/XFormObject.ts";
import {
  XGalleryExpandableObject
} from "@selldone/page-builder/components/x/gallery-expandable/XGalleryExpandableObject.ts";
import {XInputTextObject} from "@selldone/page-builder/components/x/input/text/XInputTextObject.ts";
import {XLottieObject} from "@selldone/page-builder/components/x/lottie/XLottieObject.ts";
import {XMarqueeObject} from "@selldone/page-builder/components/x/marquee/XMarqueeObject.ts";
import {XProductObject} from "@selldone/page-builder/components/x/product/XProductObject.ts";
import {XProductOverviewObject} from "@selldone/page-builder/components/x/product-overview/XProductOverviewObject.ts";
import {XProductsObject} from "@selldone/page-builder/components/x/products/XProductsObject.ts";
import {XRowObject} from "@selldone/page-builder/components/x/row/XRowObject.ts";
import {XSearchObject} from "@selldone/page-builder/components/x/search/XSearchObject.ts";
import {XSwiperObject} from "@selldone/page-builder/components/x/swiper/XSwiperObject.ts";
import {XTextObject} from "@selldone/page-builder/components/x/text/XTextObject.ts";
import {XUploaderObject} from "@selldone/page-builder/components/x/uploader/XUploaderObject.ts";
import {XVideoBackgroundObject} from "@selldone/page-builder/components/x/video-background/XVideoBackgroundObject.ts";
import {
  XGalleryExpandableItemObject
} from "@selldone/page-builder/components/x/gallery-expandable/item/XGalleryExpandableItemObject.ts";

export class LUtilsComponents {
  static XComponents: any[] = [
    XColumnImageText,
    XRow,
    XColumn,
    XSection,
    XContainer,
    XButtons,
    XFeederProducts,
    XText,
    XUploader,
    XButton,
    XProduct,
    //XCollection,
    XLottie,
    XSearch,
    XMarquee,
    XGalleryExpandable,
    XGalleryExpandableItem,
    XDiv,
    XSwiper,
    XVideoBackground,
    XArticle,
    XProducts,
    XCode,
    XProductOverview,
    XForm,
    XInputText,
    XFeederBlogs,
  ];

  static XObjects: LModelElementTypes.IModelElement[] = [
    XArticleObject,
    XButtonObject,
    XButtonsObject,

    XCodeObject,
    // XCollectionObject,
    XColumnObject,
    XColumnImageTextObject,
    XContainerObject,
    //  XDivObject,
    XFeederBlogsObject,
    XFeederProductsObject,
    XFormObject,
    XGalleryExpandableObject,
    XInputTextObject,
    XLottieObject,
    XMarqueeObject,
    XProductObject,
    XProductOverviewObject,
    XProductsObject,
    XRowObject,
    XSearchObject,
    XSectionObject,
    XSwiperObject,
    XTextObject,
    XUploaderObject,
    XVideoBackgroundObject,
    XGalleryExpandableItemObject,
  ];

  static FindVueComponent(name: string): any {
    return LUtilsComponents.XComponents.find(
      (component) => component.name === name,
    );
  }
}
