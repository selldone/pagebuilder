import type { XCodeObject } from "@selldone/page-builder/components/x/code/XCodeObject.ts";
import { XCodeObjectDataTypes } from "@selldone/page-builder/components/x/code/XCodeObjectData.ts";
import { LSectionHtml } from "@selldone/page-builder/sections/html/LSectionHtml.ts";

export function starterVueSection(
  label: string,
  templateWithStyle: string,
  defaults: Record<string, unknown>,
  structure: Record<string, unknown>,
) {
  const defaultsJson = JSON.stringify(defaults).replaceAll("<", "\\u003c");
  const structureJson = JSON.stringify(structure).replaceAll("<", "\\u003c");
  const source = `${templateWithStyle.trim()}
<script>
export default {
  props: {
    properties: {
      type: Object,
      default: () => (${defaultsJson}),
      structure: () => (${structureJson})
    }
  }
}
</script>`;

  return {
    label,
    Seed() {
      const section = LSectionHtml.Seed();
      const code = section.children[0] as XCodeObject;
      code.data
        .setCode(source)
        .setMode(XCodeObjectDataTypes.Mode.MODE_VUE)
        .setProperties(JSON.parse(defaultsJson));
      return section;
    },
  };
}

type Colors = readonly [
  surface: string,
  ink: string,
  card: string,
  border: string,
  accent: string,
];

type SectionCopy = {
  label: string;
  name: string;
  title: string;
  intro: string;
  colors: Colors;
};

function textField(key: string, title: string) {
  return { key, title, type: "string" };
}

function baseStyle(copy: SectionCopy) {
  const [surface, ink, card, border, accent] = copy.colors;
  const root = `.${copy.name}`;
  return `
  ${root} {
    --starter-card: ${card};
    --starter-border: ${border};
    --starter-accent: ${accent};
    padding: clamp(32px, 7vw, 88px) clamp(20px, 5vw, 64px);
    background: ${surface};
    color: ${ink};
    text-align: start;
    overflow-wrap: anywhere;
  }
  ${root} .starter-inner {
    max-inline-size: 1120px;
    margin-inline: auto;
  }
  ${root} h2 {
    max-inline-size: 24ch;
    margin: 0 0 12px;
    font: 400 clamp(30px, 5vw, 54px)/1.08 Georgia, serif;
    letter-spacing: -0.04em;
  }
  ${root} p {
    margin: 0;
    max-inline-size: 56ch;
    font-size: 16px;
    line-height: 1.6;
  }`;
}

const heading = `<h2>{{ properties.title }}</h2>
        <p v-if="properties.intro">{{ properties.intro }}</p>`;
const headingFields = {
  title: textField("title", "Section heading"),
  intro: textField("intro", "Introduction"),
};

function cards(copy: SectionCopy, items: { title: string; text: string }[]) {
  const root = `.${copy.name}`;
  return starterVueSection(
    copy.label,
    `<template>
  <section class="${copy.name}">
    <div class="starter-inner">
      <header>
        ${heading}
      </header>
      <ul v-if="properties.items.length" class="starter-cards">
        <li v-for="(item, index) in properties.items" :key="index">
          <h3>{{ item.title }}</h3>
          <p>{{ item.text }}</p>
        </li>
      </ul>
    </div>
  </section>
</template>
<style>
${baseStyle(copy)}
  ${root} .starter-cards {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(min(100%, 228px), 1fr));
    gap: 12px;
    padding: 0;
    margin: 28px 0 0;
    list-style: none;
  }
  ${root} li {
    padding: clamp(18px, 3vw, 30px);
    border: 1px solid var(--starter-border);
    border-radius: 14px;
    background: var(--starter-card);
  }
  ${root} h3 {
    color: var(--starter-accent);
    margin: 0 0 12px;
    font-size: 21px;
    font-weight: 650;
    line-height: 1.25;
  }
</style>`,
    { title: copy.title, intro: copy.intro, items },
    {
      ...headingFields,
      items: {
        key: "items",
        title: "Cards",
        type: "array",
        structure: {
          title: textField("title", "Card heading"),
          text: textField("text", "Card text"),
        },
      },
    },
  );
}

function fieldNotes(
  copy: SectionCopy,
  rows: { label: string; text: string }[],
) {
  const root = `.${copy.name}`;
  return starterVueSection(
    copy.label,
    `<template>
  <section class="${copy.name}">
    <div class="starter-inner starter-split">
      <header>
        ${heading}
      </header>
      <dl v-if="properties.rows.length">
        <div v-for="(row, index) in properties.rows" :key="index">
          <dt>{{ row.label }}</dt>
          <dd>{{ row.text }}</dd>
        </div>
      </dl>
    </div>
  </section>
</template>
<style>
${baseStyle(copy)}
  ${root} .starter-split {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(min(100%, 300px), 1fr));
    gap: clamp(24px, 6vw, 72px);
  }
  ${root} dl {
    margin: 0;
    background: var(--starter-card);
    border: 1px solid var(--starter-border);
    border-radius: 14px;
  }
  ${root} dl > div {
    display: grid;
    grid-template-columns: minmax(75px, 1fr) minmax(0, 2.4fr);
    gap: 8px 16px;
    padding: 14px clamp(12px, 3vw, 24px);
  }
  ${root} dl > div + div {
    border-block-start: 1px solid var(--starter-border);
  }
  ${root} dt, ${root} dd {
    margin: 0;
    font-size: 16px;
    line-height: 1.55;
  }
  ${root} dt {
    color: var(--starter-accent);
    font-weight: 650;
  }
</style>`,
    { title: copy.title, intro: copy.intro, rows },
    {
      ...headingFields,
      rows: {
        key: "rows",
        title: "Rows",
        type: "array",
        structure: {
          label: textField("label", "Row label"),
          text: textField("text", "Row text"),
        },
      },
    },
  );
}

function questions(
  copy: SectionCopy,
  items: { question: string; answer: string }[],
) {
  const root = `.${copy.name}`;
  return starterVueSection(
    copy.label,
    `<template>
  <section class="${copy.name}">
    <div class="starter-inner starter-split">
      <header>
        ${heading}
      </header>
      <div class="starter-questions">
        <details v-for="(item, index) in properties.items" :key="index">
          <summary>{{ item.question }}<span aria-hidden="true"></span></summary>
          <p>{{ item.answer }}</p>
        </details>
      </div>
    </div>
  </section>
</template>
<style>
${baseStyle(copy)}
  ${root} .starter-split {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(min(100%, 288px), 1fr));
    gap: clamp(24px, 6vw, 72px);
  }
  ${root} details {
    border-block-end: 1px solid var(--starter-border);
  }
  ${root} details:first-child {
    border-block-start: 1px solid var(--starter-border);
  }
  ${root} summary {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 12px;
    min-block-size: 48px;
    padding: 12px;
    list-style: none;
    cursor: pointer;
    font-size: 16px;
    font-weight: 650;
  }
  ${root} summary::-webkit-details-marker {
    display: none;
  }
  ${root} summary:hover {
    background: var(--starter-card);
  }
  ${root} summary:focus-visible {
    outline: 2px solid var(--starter-accent);
    outline-offset: -2px;
  }
  ${root} summary span::before {
    content: "+";
    color: var(--starter-accent);
  }
  ${root} details[open] summary span::before {
    content: "−";
  }
  ${root} details p {
    padding: 0 12px 14px;
  }
</style>`,
    { title: copy.title, intro: copy.intro, items },
    {
      ...headingFields,
      items: {
        key: "items",
        title: "Questions",
        type: "array",
        structure: {
          question: textField("question", "Question"),
          answer: textField("answer", "Answer"),
        },
      },
    },
  );
}

type StarterVueId = "studio" | "campaign" | "story" | "event" | "newsletter";

export const StarterVueSections: Record<
  StarterVueId,
  ReturnType<typeof starterVueSection>[]
> = {
  studio: [
    fieldNotes(
      {
        label: "Ceramic process",
        name: "fieldwork-starter-process",
        title: "From clay to cupboard.",
        intro:
          "A piece takes shape slowly, from the first pull on the wheel to the last firing.",
        colors: ["#eae0d2", "#34261c", "#f9f3eb", "#dbccba", "#71452c"],
      },
      [
        {
          label: "Shape",
          text: "Work the clay on the wheel until the form sits comfortably in the hand.",
        },
        {
          label: "Glaze",
          text: "Choose a glaze that brings out the texture of the clay.",
        },
        {
          label: "Fire",
          text: "Fire the glazed piece, then let it cool before checking the rim and base.",
        },
      ],
    ),
    questions(
      {
        label: "Stoneware care",
        name: "fieldwork-starter-care",
        title: "Living with stoneware.",
        intro: "Simple care for objects you reach for every day.",
        colors: ["#fbf7f0", "#34261c", "#f1e7d9", "#dfd0be", "#71452c"],
      },
      [
        {
          question: "How should I wash my piece?",
          answer:
            "Use warm water, gentle soap and a soft sponge. Check the care notes for your piece before putting it in the dishwasher.",
        },
        {
          question: "Can it go in the oven?",
          answer:
            "Check the care notes for your piece first. Avoid sudden temperature changes, such as moving a chilled dish into a hot oven.",
        },
        {
          question: "Why does the glaze vary?",
          answer:
            "Glaze can pool more thickly in some spots than others, so the finish may vary slightly between pieces.",
        },
      ],
    ),
  ],
  campaign: [
    cards(
      {
        label: "Training rhythm",
        name: "pace-starter-training",
        title: "Make it your everyday pair.",
        intro: "Work the shoe into the miles you already run.",
        colors: ["#1c211b", "#f5f7ef", "#292f26", "#4a5344", "#d8fa68"],
      },
      [
        {
          title: "Easy miles",
          text: "Start with a route you know and keep the pace comfortable. Notice how the shoe feels as you settle in.",
        },
        {
          title: "Quicker efforts",
          text: "After an easy warm-up, try a few short strides to see how the shoe feels at a faster pace.",
        },
        {
          title: "Weekend loop",
          text: "Once the fit feels right on short runs, try it on a longer familiar route.",
        },
      ],
    ),
    questions(
      {
        label: "Fit questions",
        name: "pace-starter-fit",
        title: "Fit & first miles.",
        intro: "Check the details that matter before heading out.",
        colors: ["#ecf1e2", "#20271c", "#dfe8d1", "#cad4bf", "#435433"],
      },
      [
        {
          question: "How should the heel feel?",
          answer:
            "Look for a secure heel without pressure or rubbing. Try walking in the socks you normally run in.",
        },
        {
          question: "How much toe room do I need?",
          answer:
            "Make sure your toes can move freely and do not touch the end of the shoe as you walk.",
        },
        {
          question: "Where do I check sizes?",
          answer:
            "Use the product’s size guide and measure both feet. Compare the length of your longer foot with the guide.",
        },
      ],
    ),
  ],
  story: [
    fieldNotes(
      {
        label: "Room palette",
        name: "room-notes-starter-palette",
        title: "A palette that settles in.",
        intro:
          "Muted colors and natural finishes make the room feel cohesive as the light changes.",
        colors: ["#dde1d1", "#2e392b", "#f0f0e5", "#c5cab9", "#38533b"],
      },
      [
        {
          label: "Walls",
          text: "A warm white makes the most of daylight and gives quieter colors a clear backdrop.",
        },
        {
          label: "Textiles",
          text: "Tones from olive to oat give the room depth without pulling attention away from the window.",
        },
        {
          label: "Accents",
          text: "A piece of timber or a small ceramic adds a warmer note to the softer greens.",
        },
      ],
    ),
    cards(
      {
        label: "Ideas to try at home",
        name: "room-notes-starter-ideas",
        title: "Three changes to try at home.",
        intro: "Start with what you already have and see how the space feels.",
        colors: ["#f8f6ee", "#2e392b", "#eceee2", "#d7dccb", "#38533b"],
      },
      [
        {
          title: "Move one light",
          text: "Bring a lamp next to your usual chair and see how the room feels in the evening.",
        },
        {
          title: "Clear a surface",
          text: "Take everything off a table, then return only the pieces you use or enjoy seeing.",
        },
        {
          title: "Test a fabric",
          text: "Put a swatch near the window and look at it in daylight and under a lamp.",
        },
      ],
    ),
  ],
  event: [
    fieldNotes(
      {
        label: "Forum schedule",
        name: "common-ground-starter-schedule",
        title: "The day at a glance.",
        intro:
          "Make room for a talk that interests you, a hands-on session and a conversation.",
        colors: ["#1c2651", "#f0f3ff", "#263366", "#46588f", "#c3d0ff"],
      },
      [
        {
          label: "10:00",
          text: "Opening talks on the design decisions behind everyday objects.",
        },
        {
          label: "13:00",
          text: "Small-group session to sketch, test and discuss an idea.",
        },
        {
          label: "16:00",
          text: "Conversation about what participants would do differently next time.",
        },
      ],
    ),
    questions(
      {
        label: "Visit questions",
        name: "common-ground-starter-visit",
        title: "Plan your visit.",
        intro: "A few things to check as you get ready for the forum.",
        colors: ["#f3f5ff", "#1c2651", "#e6ebff", "#d2daf3", "#314690"],
      },
      [
        {
          question: "Where can I find the venue details?",
          answer:
            "The event update will include the date, venue and registration details once they are announced.",
        },
        {
          question: "Do I need a portfolio?",
          answer:
            "A portfolio is optional. Bring a notebook if you want to keep track of ideas from the sessions.",
        },
        {
          question: "What about access needs?",
          answer:
            "Check the venue information when it is posted, and use the event contact included with registration to ask about your needs.",
        },
      ],
    ),
  ],
  newsletter: [
    cards(
      {
        label: "Sample edition",
        name: "saturday-edit-starter-sample",
        title: "A page from the Saturday Edit.",
        intro: "A few things to read or try with your first coffee.",
        colors: ["#e6edda", "#293b2c", "#f3f6eb", "#cad6bf", "#37583a"],
      },
      [
        {
          title: "Read",
          text: "Why the small public garden you pass each day might be worth a closer look.",
        },
        {
          title: "Make",
          text: "Press a leaf between the pages of a notebook and turn it into a bookmark.",
        },
        {
          title: "Keep",
          text: "Save one line from something you read this week. See what it reminds you of later.",
        },
      ],
    ),
    questions(
      {
        label: "Subscription questions",
        name: "saturday-edit-starter-subscription",
        title: "Before you subscribe.",
        intro: "What to expect from the letter and how to get your first copy.",
        colors: ["#f8f9f1", "#293b2c", "#e9efdf", "#d5dfca", "#37583a"],
      },
      [
        {
          question: "What will land in my inbox?",
          answer:
            "A short story, something you can make, and a few things to keep or share.",
        },
        {
          question: "Do I need to set aside much time?",
          answer:
            "You can read an edition in one sitting, or save an idea for the weekend.",
        },
        {
          question: "How do I get the next edition?",
          answer:
            "Enter your email in the signup form below to get the next edition when it is sent.",
        },
      ],
    ),
  ],
};
