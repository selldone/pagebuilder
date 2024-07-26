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

import {LModelElement} from "@selldone/page-builder/models/element/LModelElement.ts";
import {LModelBackground} from "@selldone/page-builder/models/background/LModelBackground.ts";
import {XArticleObjectData} from "@selldone/page-builder/components/x/article/XArticleObjectData.ts";

export class XArticleObject extends LModelElement<XArticleObjectData> {
  public static ComponentName = "XArticle";
  public static Info = {
    group: "Text",
    icon: "article",
    title: "Article",
  };

  constructor(
    background: LModelBackground | null,
    style: any,
    classes: string[] | null,
    children: LModelElement<any>[] | null,
    data: XArticleObjectData | null,
    props: any,
  ) {
    super(
      XArticleObject.ComponentName,
      background,
      style,
      classes,
      children,
      data ? data : new XArticleObjectData({}),
      props,
    );
  }

  // ━━━━━━━━━━━━━━━━━ 🥪 Instance ━━━━━━━━━━━━━━━━━
  static NewInstance() {
    return new XArticleObject(null, null, null, null, null, null);
  }

  // ━━━━━━━━━━━━━━━━━ 🫘 Seed ━━━━━━━━━━━━━━━━━

  static Seed(): XArticleObject {
    const instance = this.NewInstance();
    instance.data.setBody(`
    <h1>
      <b>Hello world.</b>
    </h1>
    <h2>We are Selldoners.</h2>
    <p>The #1 operating system for fast-growing companies.</p>
    
    <h2>Our Mission</h2>
    <p>Our mission is to provide the best tools and support for companies looking to scale quickly and efficiently.</p>
    
    <h3>Why Choose Us?</h3>
    <ul>
      <li><b>Innovation:</b> We continuously innovate to bring you the best solutions.</li>
      <li><b>Support:</b> Our support team is available 24/7 to assist you.</li>
      <li><b>Scalability:</b> Our system grows with your business.</li>
    </ul>
    
    <h3>Contact Us</h3>
    <p>If you have any questions or need further information, please don't hesitate to contact us.</p>
    
    <p>Thank you for choosing Selldoners!</p>
  `);
    return instance;
  }

  // ━━━━━━━━━━━━━━━━━ 🍢 Migration ━━━━━━━━━━━━━━━━━
  /**
   * Migrate from V1 to V2
   * @param old
   * @constructor
   */

  static MigrateOld(old: any): XArticleObject {
    const data = new XArticleObjectData({ body: old.body });

    return new XArticleObject(null, null, null, [], data, null);
  }

  // ━━━━━━━━━━━━━━━━━ Interpreter ━━━━━━━━━━━━━━━━━

  public static JsonToInstance(json: Record<string, any>): XArticleObject {
    return this._JsonToInstance(json, XArticleObjectData);
  }
}
