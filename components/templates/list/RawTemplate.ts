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

import type { Page } from "@selldone/core-js/models";
import { SetupService } from "@selldone/core-js/server/SetupService.ts";
import { XArticleObject } from "@selldone/page-builder/components/x/article/XArticleObject.ts";
import { XButtonObject } from "@selldone/page-builder/components/x/button/XButtonObject.ts";
import { XButtonsObject } from "@selldone/page-builder/components/x/buttons/XButtonsObject.ts";
import {
  XFormObject,
  XFormObjectTypes,
} from "@selldone/page-builder/components/x/form/XFormObject.ts";
import type { XSectionObject } from "@selldone/page-builder/components/x/section/XSectionObject.ts";
import { XTextObject } from "@selldone/page-builder/components/x/text/XTextObject.ts";
import { XUploaderObject } from "@selldone/page-builder/components/x/uploader/XUploaderObject.ts";
import { LSectionArticle } from "@selldone/page-builder/sections/article/LSectionArticle.ts";
import { LSectionFormNewsletter } from "@selldone/page-builder/sections/form/newsletter/LSectionFormNewsletter.ts";
import { LSectionHeroHorizontal } from "@selldone/page-builder/sections/hero/horizontal/LSectionHeroHorizontal.ts";
import { LSectionHeroVertical } from "@selldone/page-builder/sections/hero/vertical/LSectionHeroVertical.ts";
import { LSectionStoreListing } from "@selldone/page-builder/sections/store/listing/LSectionStoreListing.ts";
import { LSectionTextThreeColumns } from "@selldone/page-builder/sections/text/three-columns/LSectionTextThreeColumns.ts";
import { LSectionTextTwoColumns } from "@selldone/page-builder/sections/text/two-columns/LSectionTextTwoColumns.ts";
import { ShopCollectionSections } from "@selldone/page-builder/components/templates/list/ShopCollectionSections.ts";
import { StarterVueSections } from "@selldone/page-builder/components/templates/list/StarterVueSections.ts";

const artworkPath = "/assets/img/landing-starters/";

type SectionSeed = { label: string; Seed: () => XSectionObject };
type Copy = readonly [title: string, body: string];

interface StarterDesign {
  id: keyof typeof StarterVueSections | "collection";
  name: string;
  description: string;
  layout: "split" | "stacked" | "image-first";
  palette: readonly [
    hero: string,
    text: string,
    accent: string,
    details: string,
  ];
  serif?: boolean;
  eyebrow: string;
  headline: string;
  intro: string;
  action: string;
  imageAlt: string;
  detailsTitle: string;
  details: readonly [Copy, Copy] | readonly [Copy, Copy, Copy];
  closing: Copy;
  article?: boolean;
  newsletter?: boolean;
  products?: boolean;
}

export class RawTemplate {
  readonly id: string;
  readonly name: string;
  readonly description: string;
  readonly image: string;
  readonly sections: SectionSeed[];

  constructor(private readonly design: StarterDesign) {
    this.id = design.id;
    this.name = design.name;
    this.description = design.description;
    this.image = `${artworkPath}${design.id}-preview.webp`;
    this.sections = [
      design.layout === "stacked"
        ? LSectionHeroVertical
        : LSectionHeroHorizontal,
      design.details.length === 2
        ? LSectionTextTwoColumns
        : LSectionTextThreeColumns,
      ...(design.products ? [LSectionStoreListing] : []),
      ...(design.id === "collection"
        ? ShopCollectionSections
        : StarterVueSections[design.id]),
      design.article ? LSectionArticle : LSectionFormNewsletter,
    ];
  }

  public generate(
    { productsPlaceholder }: { productsPlaceholder?: string } = {},
  ): Page.IContent {
    const design = this.design;
    const [background, text, accent, detailsBackground] = design.palette;
    const [hero, details, ...remaining] = this.sections.map((section) =>
      section.Seed(),
    );
    const closing = remaining[remaining.length - 1];
    const sectionIds = this.sections.map(
      () => `auto_${Math.round(Math.random() * 99999999999)}`,
    );
    const targetIndex = design.products
      ? 2
      : design.newsletter || design.article
        ? sectionIds.length - 1
        : 1;
    const [heroRow] = hero.children[0].children;
    const [copyColumn, imageColumn] = heroRow.children;
    const [headline, intro, actions] = copyColumn.children as [
      XTextObject,
      XTextObject,
      XButtonsObject,
    ];
    const [artwork] = imageColumn.children as [XUploaderObject];
    const stacked = design.layout === "stacked";
    const alignment = stacked ? "center" : "start";
    const headingStyle = {
      fontFamily: design.serif ? "Georgia, serif" : "inherit",
      fontWeight: design.serif ? "400" : "750",
      letterSpacing: design.serif ? "-0.045em" : "-0.055em",
    };

    hero.classes = ["d-flex"];
    hero.background.bg_color = background;
    hero.style = {
      paddingBlock: stacked
        ? "clamp(26px, 4vw, 56px)"
        : "clamp(32px, 4.5vw, 72px)",
      color: text,
    };
    heroRow.style = stacked
      ? { flexDirection: "column", alignItems: "center" }
      : { alignItems: "center" };
    copyColumn.style = stacked
      ? { textAlign: alignment, width: "100%", maxWidth: "800px" }
      : { textAlign: alignment, flex: "1 1 min(100%, 320px)" };
    imageColumn.style = stacked
      ? { width: "100%", maxWidth: "760px" }
      : { flex: "1 1 min(100%, 320px)" };
    const eyebrow = XTextObject.Seed(design.eyebrow, "p");
    eyebrow.style = {
      fontSize: "0.75rem",
      fontWeight: "700",
      letterSpacing: "0.16em",
      marginBottom: "16px",
    };
    copyColumn.addChild(eyebrow, 0);
    headline.data.setValue(design.headline);
    headline.style = {
      ...headingStyle,
      fontSize: stacked
        ? "clamp(2.5rem, 5vw, 4.75rem)"
        : "clamp(2.5rem, 6vw, 5.375rem)",
      lineHeight: "0.98",
      hyphens: "none",
      marginBlockStart: "0",
    };
    intro.data.setValue(design.intro);
    intro.style = {
      fontSize: "clamp(1rem, 1.55vw, 1.25rem)",
      lineHeight: "1.6",
      marginBlock: stacked ? "16px 18px" : "20px 24px",
      maxWidth: "44ch",
      marginInline: stacked ? "auto" : undefined,
    };
    actions.data.setJustify(alignment);
    const button = XButtonObject.Seed();
    button.data
      .setContent(design.action)
      .setHref(`#${sectionIds[targetIndex]}`)
      .setColor(accent)
      .setSize("large")
      .setVariant("flat")
      .setRounded(design.serif ? "pill" : "sm");
    actions.addChild(button);

    // Saved pages need a stable platform URL even on custom shop domains.
    artwork.data.setSrc(
      new URL(`${artworkPath}${this.id}.webp`, SetupService.MainServiceUrl())
        .href,
    );
    artwork.data.alt = design.imageAlt;
    artwork.data.setting.setAspect(stacked ? 2.8 : 1.28);
    artwork.style = {
      width: "100%",
      borderRadius: design.serif ? "4px" : "16px",
      overflow: "hidden",
    };
    if (design.layout === "image-first") heroRow.children.reverse();

    details.background.bg_color = detailsBackground;
    details.style = {
      color: "#231f1a",
      paddingBlock: "clamp(30px, 5vw, 68px)",
    };
    const [detailsHeading, detailsRow] = details.children[0].children;
    (detailsHeading as XTextObject).data.setValue(design.detailsTitle);
    detailsHeading.style = {
      ...headingStyle,
      fontSize: "clamp(1.75rem, 4vw, 3.5rem)",
    };
    detailsRow.children.forEach((column, index) => {
      column.style = { flex: "1 1 min(100%, 220px)" };
      const [title, body] = column.children as [XTextObject, XTextObject];
      title.data.setValue(design.details[index][0]);
      title.style = { fontSize: "1.25rem", fontWeight: "700" };
      body.data.setValue(design.details[index][1]);
      body.style = { fontSize: "1rem", lineHeight: "1.6" };
    });

    if (design.products) {
      const [listing] = remaining;
      listing.background.bg_color = "#fffaf5";
      listing.style = {
        color: text,
        paddingBlock: "clamp(30px, 5vw, 68px)",
      };

      const [container] = listing.children;
      if (productsPlaceholder) {
        // Keep the section and its anchor without loading or tracking shop products.
        const placeholder = XTextObject.Seed(productsPlaceholder, "p");
        placeholder.style = {
          paddingBlock: "24px",
          textAlign: "center",
        };
        container.children = [placeholder];
      }
      const heading = XTextObject.Seed("The coffee collection", "h2");
      heading.style = {
        ...headingStyle,
        fontSize: "clamp(1.75rem, 4vw, 3.5rem)",
        marginBlockEnd: "20px",
      };
      container.addChild(heading, 0);
    }

    closing.background.bg_color = background;
    closing.style = { color: text, paddingBlock: "clamp(36px, 6vw, 84px)" };
    if (design.article) {
      const [article] = closing.children[0].children as [XArticleObject];
      // This is authored sample copy, never merchant input.
      article.data.setBody(
        `<h2>${design.closing[0]}</h2><p>${design.closing[1]}</p>`,
      );
    } else {
      const [title, body, form] = closing.children[0].children[0].children[0]
        .children as [XTextObject, XTextObject, XFormObject];
      title.data.setValue(design.closing[0]);
      title.style = {
        ...headingStyle,
        fontSize: "clamp(1.75rem, 4vw, 3.5rem)",
      };
      body.data.setValue(design.closing[1]);
      const submit = XButtonObject.Seed().setLabel(
        XFormObjectTypes.LABELS.ACTION,
      );
      submit.data
        .setContent("Subscribe")
        .setColor(accent)
        .setSize("large")
        .setVariant("flat");
      submit.classes = ["mt-5"];
      form.addChild(submit);
      form.children[0].data.setPlaceholder("you@example.com");
    }

    return {
      title: this.name,
      sections: [hero, details, ...remaining].map((object, index) => ({
        label: this.sections[index].label,
        uid: sectionIds[index],
        // The native v2 builder uses one root object per section.
        object: object as unknown as Page.ISection["object"],
      })),
    };
  }

  public static readonly List = [
    new RawTemplate({
      id: "studio",
      name: "Brand Studio",
      description: "Introduce your brand, its craft, and what makes it yours.",
      layout: "split",
      palette: ["#f4eee5", "#28211c", "#362719", "#fffaf3"],
      serif: true,
      eyebrow: "FIELDWORK STUDIO",
      headline: "Objects for slower days.",
      intro: "Quiet, useful ceramics made to be part of your everyday rituals.",
      action: "Explore the studio",
      imageAlt: "Sculptural ivory ceramics in warm sunlight",
      detailsTitle: "Made with intention",
      details: [
        [
          "The material",
          "Warm, tactile stoneware shaped to feel as good as it looks.",
        ],
        [
          "The process",
          "Each piece is finished by hand in small, considered batches.",
        ],
      ],
      closing: [
        "Notes from the studio",
        "Hear when new pieces leave the kiln, and get a closer look at how we make them.",
      ],
    }),
    new RawTemplate({
      id: "campaign",
      name: "Product Launch",
      description:
        "Reveal a new release and give visitors a reason to come back.",
      layout: "stacked",
      palette: ["#161a16", "#f1f4eb", "#d8fa68", "#e9efde"],
      eyebrow: "PACE / SERIES 01",
      headline: "Find your fast.",
      intro: "A running shoe for the days you want to go a little further.",
      action: "Explore the launch",
      imageAlt: "Chartreuse performance running shoes on a dark track plinth",
      detailsTitle: "Built for the next mile",
      details: [
        [
          "Light on your feet",
          "A breathable upper designed for everyday miles.",
        ],
        [
          "Ready to move",
          "A responsive feel from warm-up to the last stretch.",
        ],
        ["Grip where it counts", "A textured outsole made for city routes."],
      ],
      closing: [
        "Get the launch note",
        "Leave your email for release news and availability.",
      ],
    }),
    new RawTemplate({
      id: "collection",
      name: "Shop Collection",
      description:
        "Set the scene for a collection and bring in products from your store.",
      layout: "split",
      palette: ["#f7e1cf", "#432518", "#8e3e28", "#fff0e3"],
      serif: true,
      eyebrow: "DAYBREAK COFFEE",
      headline: "Better mornings start here.",
      intro:
        "A small collection of everyday roasts, from bright and balanced to deep and mellow.",
      action: "Shop the collection",
      imageAlt:
        "Three coffee bags and a short espresso on a terracotta counter",
      detailsTitle: "Find your first cup",
      details: [
        [
          "Bright & clean",
          "A light, lively choice for filter coffee and slow mornings.",
        ],
        ["Soft & balanced", "An easy everyday roast with a rounded finish."],
        ["Dark & mellow", "A deeper profile that holds its own with milk."],
      ],
      closing: [
        "Fresh from the roaster",
        "Hear about new blends and seasonal releases.",
      ],
      products: true,
    }),
    new RawTemplate({
      id: "story",
      name: "Editorial Story",
      description:
        "Lead with photography and tell your story in an editable article.",
      layout: "image-first",
      palette: ["#ebe8dc", "#323827", "#394632", "#f7f5ed"],
      serif: true,
      eyebrow: "ROOM NOTES / ISSUE 01",
      headline: "A room to come home to.",
      intro:
        "A closer look at the light, texture, and everyday details that make a space feel familiar.",
      action: "Read the story",
      imageAlt: "Olive sofa and travertine table in a sunlit modern room",
      detailsTitle: "Inside the room",
      details: [
        [
          "Texture with purpose",
          "Natural linen and warm timber invite you to slow down.",
        ],
        [
          "Light through the day",
          "The room takes on a different character as the sun moves.",
        ],
      ],
      closing: [
        "Space for the everyday",
        "Start with the things you reach for every day. Give each object a place, leave room for changing light, and let the room reflect the way you actually live.",
      ],
      article: true,
    }),
    new RawTemplate({
      id: "event",
      name: "Event Program",
      description:
        "Introduce an event, outline its agenda, and collect interest.",
      layout: "image-first",
      palette: ["#edf0ff", "#172047", "#273da6", "#f5f6fc"],
      eyebrow: "COMMON GROUND / DESIGN FORUM",
      headline: "Good ideas need a room.",
      intro:
        "A day of talks, practical workshops, and conversations with people who make things.",
      action: "Explore the program",
      imageAlt: "Cobalt auditorium seating in a daylight-filled concrete venue",
      detailsTitle: "What’s on the program",
      details: [
        [
          "Morning talks",
          "Short perspectives from people working across design and craft.",
        ],
        [
          "Afternoon workshops",
          "Make, test and discuss an idea in a small group.",
        ],
        [
          "Open conversation",
          "Close the day by comparing notes and meeting other attendees.",
        ],
      ],
      closing: [
        "Get event updates",
        "Get the date, venue details, and registration information when they’re announced.",
      ],
    }),
    new RawTemplate({
      id: "newsletter",
      name: "Newsletter Signup",
      description:
        "Explain what readers will get and collect emails with the built-in form.",
      layout: "stacked",
      palette: ["#edf2df", "#283525", "#334e36", "#f8f9f1"],
      serif: true,
      eyebrow: "THE SATURDAY EDIT",
      headline: "A good read for slow mornings.",
      intro: "A brief letter about things worth reading, making, and keeping.",
      action: "Join the mailing list",
      imageAlt: "An open botanical print magazine beside a green mug",
      detailsTitle: "In every issue",
      details: [
        ["One good story", "A short piece to read over your first coffee."],
        [
          "A few things to keep",
          "Thoughtful picks to save for later or share with a friend.",
        ],
      ],
      closing: [
        "The next issue is yours",
        "Enter your email to get the next edition in your inbox.",
      ],
      newsletter: true,
    }),
  ];
}
