import { starterVueSection } from "@selldone/page-builder/components/templates/list/StarterVueSections.ts";

const roasterGuide = `
<style>
  .daybreak-roaster {
    padding: clamp(40px, 7vw, 88px) clamp(20px, 5vw, 64px);
    background: #fff8ef;
    color: #432518;
    text-align: start;
  }
  .daybreak-roaster .daybreak-guide-inner {
    max-inline-size: 1120px;
    margin-inline: auto;
  }
  .daybreak-roaster h2 {
    max-inline-size: 20ch;
    margin: 0 0 28px;
    font: 400 clamp(32px, 4.5vw, 54px)/1.08 Georgia, serif;
    letter-spacing: -0.045em;
  }
  .daybreak-roaster .daybreak-guide-cards {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(min(100%, 235px), 1fr));
    gap: 14px;
  }
  .daybreak-roaster article {
    padding: clamp(20px, 3vw, 32px);
    border: 1px solid #e8cdb8;
    border-radius: 16px;
    background: #f7e1cf;
  }
  .daybreak-roaster article::before {
    content: "";
    display: block;
    inline-size: 28px;
    block-size: 2px;
    margin-block-end: 20px;
    background: #8e3e28;
  }
  .daybreak-roaster h3 {
    margin: 0 0 8px;
    font-size: 20px;
    line-height: 1.2;
  }
  .daybreak-roaster p {
    margin: 0;
    font-size: 16px;
    line-height: 1.55;
  }
</style>
<template>
  <section class="daybreak-roaster">
    <div class="daybreak-guide-inner">
      <h2>{{ properties.title }}</h2>
      <div class="daybreak-guide-cards">
        <article v-for="(card, index) in properties.cards" :key="index">
          <h3>{{ card.title }}</h3>
          <p>{{ card.description }}</p>
        </article>
      </div>
    </div>
  </section>
</template>
`;

const pourOverRecipe = `
<style>
  .daybreak-brew {
    padding: clamp(44px, 8vw, 96px) clamp(20px, 5vw, 64px);
    background: #322017;
    color: #fff2e4;
    text-align: start;
  }
  .daybreak-brew .daybreak-brew-layout {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(min(100%, 310px), 1fr));
    align-items: center;
    gap: clamp(28px, 6vw, 76px);
    max-inline-size: 1120px;
    margin-inline: auto;
  }
  .daybreak-brew h2 {
    margin: 0 0 12px;
    font: 400 clamp(36px, 5vw, 62px)/1.05 Georgia, serif;
    letter-spacing: -0.045em;
  }
  .daybreak-brew p,
  .daybreak-brew li {
    margin: 0;
    font-size: 16px;
    line-height: 1.55;
  }
  .daybreak-brew dl {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(min(100%, 76px), 1fr));
    gap: 8px;
    margin: 24px 0 0;
  }
  .daybreak-brew dl > div {
    padding: 12px 10px;
    border-radius: 10px;
    background: #513327;
  }
  .daybreak-brew dt {
    color: #f2cfb5;
    font-size: 13px;
  }
  .daybreak-brew dd {
    margin: 0;
    font: 400 clamp(20px, 2.75vw, 32px)/1.2 Georgia, serif;
  }
  .daybreak-brew ol {
    padding: 0;
    padding-inline-start: 1.5rem;
    margin: 0;
    list-style-type: decimal;
  }
  .daybreak-brew li {
    padding: 12px 0;
    padding-inline-start: 8px;
    border-block-start: 1px solid #765347;
  }
  .daybreak-brew li::marker {
    color: #f2c09e;
    font-weight: 700;
  }
  .daybreak-brew li strong {
    display: block;
    margin-block-end: 3px;
  }
</style>
<template>
  <section class="daybreak-brew">
    <div class="daybreak-brew-layout">
      <div>
        <h2>{{ properties.title }}</h2>
        <p>{{ properties.introduction }}</p>
        <dl>
          <div v-for="(measurement, index) in properties.measurements" :key="index">
            <dt>{{ measurement.title }}</dt>
            <dd>{{ measurement.value }}</dd>
          </div>
        </dl>
      </div>
      <ol>
        <li v-for="(step, index) in properties.steps" :key="index">
          <strong>{{ step.title }}</strong>
          {{ step.description }}
        </li>
      </ol>
    </div>
  </section>
</template>
`;

const shoppingFaq = `
<style>
  .daybreak-faq {
    padding: clamp(44px, 8vw, 88px) clamp(20px, 5vw, 64px);
    background: #fff8ef;
    color: #432518;
    text-align: start;
  }
  .daybreak-faq .daybreak-faq-layout {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(min(100%, 290px), 1fr));
    gap: clamp(20px, 5vw, 64px);
    max-inline-size: 1120px;
    margin-inline: auto;
  }
  .daybreak-faq h2 {
    margin: 0 0 10px;
    font: 400 clamp(32px, 4.5vw, 54px)/1.08 Georgia, serif;
    letter-spacing: -0.045em;
  }
  .daybreak-faq p {
    margin: 0;
    max-inline-size: 54ch;
    font-size: 16px;
    line-height: 1.55;
  }
  .daybreak-faq details {
    border-block-start: 1px solid #ddc3ae;
  }
  .daybreak-faq details:last-child {
    border-block-end: 1px solid #ddc3ae;
  }
  .daybreak-faq summary {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 12px;
    min-block-size: 48px;
    padding: 12px;
    list-style: none;
    font-size: 16px;
    font-weight: 650;
    line-height: 1.35;
    cursor: pointer;
  }
  .daybreak-faq summary::-webkit-details-marker {
    display: none;
  }
  .daybreak-faq summary:hover {
    background: #f7e1cf;
  }
  .daybreak-faq summary:focus-visible {
    outline: 2px solid #8e3e28;
    outline-offset: -2px;
  }
  .daybreak-faq .daybreak-faq-marker::before {
    content: "+";
    display: block;
    inline-size: 16px;
    color: #8e3e28;
    text-align: center;
  }
  .daybreak-faq details[open] .daybreak-faq-marker::before {
    content: "−";
  }
  .daybreak-faq details p {
    padding: 0 12px 14px;
  }
</style>
<template>
  <section class="daybreak-faq">
    <div class="daybreak-faq-layout">
      <div>
        <h2>{{ properties.title }}</h2>
        <p>{{ properties.introduction }}</p>
      </div>
      <div>
        <details v-for="(question, index) in properties.questions" :key="index">
          <summary>
            {{ question.title }}
            <span class="daybreak-faq-marker" aria-hidden="true"></span>
          </summary>
          <p>{{ question.answer }}</p>
        </details>
      </div>
    </div>
  </section>
</template>
`;

export const ShopCollectionSections = [
  starterVueSection(
    "Roaster's guide",
    roasterGuide,
    {
      title: "From our roaster to your cup",
      cards: [
        {
          title: "Read the tasting notes",
          description:
            "Look for citrus and florals if you like a bright cup, or cocoa and toasted nuts if you prefer a rounder finish.",
        },
        {
          title: "Choose for your routine",
          description:
            "For coffee you drink with milk, try a roast with caramel or chocolate notes that still come through in the cup.",
        },
        {
          title: "Make the last cup count",
          description:
            "Pick a bag size you can use while it’s fresh. Seal it between brews and grind just what you need.",
        },
      ],
    },
    {
      title: { key: "title", title: "Heading", type: "string" },
      cards: {
        key: "cards",
        title: "Guide cards",
        type: "array",
        structure: {
          title: { key: "title", title: "Card heading", type: "string" },
          description: {
            key: "description",
            title: "Card text",
            type: "string",
          },
        },
      },
    },
  ),
  starterVueSection(
    "Pour-over recipe",
    pourOverRecipe,
    {
      title: "Your first pour-over",
      introduction:
        "Start with this single-cup recipe, then adjust the grind to suit your taste.",
      measurements: [
        { title: "Water", value: "250 ml" },
        { title: "Coffee", value: "15 g" },
        { title: "Total time", value: "3–4 min" },
      ],
      steps: [
        {
          title: "Rinse the filter",
          description:
            "Discard the rinse water and add the medium-ground coffee.",
        },
        {
          title: "Let it bloom",
          description:
            "Wet the grounds with about 45 ml of hot water and wait 30 seconds.",
        },
        {
          title: "Pour in stages",
          description:
            "Add the remaining water in slow circles. Let the coffee drain before serving.",
        },
      ],
    },
    {
      title: { key: "title", title: "Heading", type: "string" },
      introduction: {
        key: "introduction",
        title: "Recipe introduction",
        type: "string",
      },
      measurements: {
        key: "measurements",
        title: "Measurements",
        type: "array",
        structure: {
          title: { key: "title", title: "Measurement name", type: "string" },
          value: { key: "value", title: "Amount or time", type: "string" },
        },
      },
      steps: {
        key: "steps",
        title: "Brewing steps",
        type: "array",
        structure: {
          title: { key: "title", title: "Step heading", type: "string" },
          description: {
            key: "description",
            title: "Instructions",
            type: "string",
          },
        },
      },
    },
  ),
  starterVueSection(
    "Shopping FAQ",
    shoppingFaq,
    {
      title: "Good to know",
      introduction: "A few things to check before choosing your next bag.",
      questions: [
        {
          title: "Which roast should I start with?",
          answer:
            "For a first bag, a balanced roast with caramel or cocoa notes is an easy starting point. Pick a lighter, fruit-forward roast if you enjoy a brighter finish.",
        },
        {
          title: "Should I buy whole bean or ground coffee?",
          answer:
            "Choose whole beans if you grind at home. For ground coffee, check the product’s grind options and pick the one that fits your brewer.",
        },
        {
          title: "Where should I store an opened bag?",
          answer:
            "Keep it in a cool, dry cupboard with the bag tightly sealed. An airtight container also works.",
        },
        {
          title: "Where can I check delivery options?",
          answer:
            "Enter your delivery address at checkout to check the options for your order. Review the shipping cost and any delivery estimate before paying.",
        },
      ],
    },
    {
      title: { key: "title", title: "Heading", type: "string" },
      introduction: {
        key: "introduction",
        title: "FAQ introduction",
        type: "string",
      },
      questions: {
        key: "questions",
        title: "Questions and answers",
        type: "array",
        structure: {
          title: { key: "title", title: "Question", type: "string" },
          answer: { key: "answer", title: "Answer", type: "string" },
        },
      },
    },
  ),
];
