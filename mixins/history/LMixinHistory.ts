/*
 * Copyright (c) 2023. Selldone® Business OS™
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

import {defineComponent, inject} from "vue";
import _ from "lodash-es";
import Builder from "../../Builder.ts";
import {Section} from "../../src/section/section";
import {LUtilsLoader} from "@selldone/page-builder/utils/loader/LUtilsLoader.ts";

const DEBUG = true;

export const LMixinHistory = defineComponent({
  data() {
    return {
      builder: this.$builder
        ? this
            .$builder /*In main page editor we have no access to provider, so we set $builder in data.*/
        : (inject("$builder") as Builder),
    };
  },
  mounted() {},

  computed: {
    hasUndo() {
      return this.builder.historyIndex + 1 < this.builder.history.length;
    },
    hasRedo() {
      return this.builder.historyIndex - 1 >= 0;
    },
  },
  methods: {
    //――――――――――――――――――――――  History > Undo ――――――――――――――――――――
    goUndo() {
      if (DEBUG)
        console.log(
          "goUndo",
          this.hasUndo,
          this.builder.historyIndex,
          this.builder.history.length,
        );
      if (this.hasUndo) {
        this.builder.historyIndex++;

        this.loadLocalHistory();

        this.showNotificationAlert(
          "Undo",
          "Go back in actions.",
          undefined,
          undefined,
          undefined,
          500,
        );
      } else {
        this.showWarningAlert("Undo", "No history available.", 500);
      }
    },
    //――――――――――――――――――――――  History > Redo ――――――――――――――――――――

    goRedo() {
      if (this.hasRedo) {
        this.builder.historyIndex--;

        this.loadLocalHistory();

        this.showNotificationAlert(
          "Redo",
          "Go forward in actions.",
          undefined,
          undefined,
          undefined,
          500,
        );
      } else {
        this.showWarningAlert("Redo", "In the last state.", 500);
      }
    },

    //――――――――――――――――――――――  History > Load ――――――――――――――――――――
    loadLocalHistory() {
      const raw_sections = JSON.parse(
        this.builder.history[this.builder.historyIndex],
      ); // Keep only data, id , name

      // 1. Check section exist:
      const exists_sections: Section[] = [];
      raw_sections.forEach((raw: Section.ISection) => {
        // Keep real sections
        const found = this.builder.find(raw.uid);
        if (found) {
          exists_sections.push(found);
        }
      });
      if (DEBUG) console.log("Load Local History", "1 exists", exists_sections);

      //2. Remove all:
      this.builder.sections.splice(0, this.builder.sections.length);

      // 3. Create new section:
      let index = 0;
      raw_sections.forEach((raw: Section.ISection) => {
     /*   const found_section = exists_sections.find(
          (it) => it.uid === raw.uid,
        );

        const instance= LUtilsLoader.JsonObjectToInstance(raw);*/
        this.builder.add(raw, index, false);
       /*
        if (found_section) {
          found_section.object=instance;// 🪱 Keep data link from component <-> v-styler <-> styler component

          //found.data = raw.data;
          if (DEBUG) console.log("Load Local History", "3 Update", found_section);
          this.builder.sections.push(found_section);
        } else {
          this.builder.add(raw, index, false, false);
          if (DEBUG) console.log("Load Local History", "3 Add", raw);
        }*/
        index++;
      });
    },

    //――――――――――――――――――――――  History > Save ――――――――――――――――――――

    async onSaveHistory  () {
      const builder = this.builder as Builder;
      if (DEBUG)
        console.log(
          "📤 On Save History",
          "index",
          builder.historyIndex,
          "history",
          builder.history,
        );

      this.saveLocalHistory(
        builder.history,
        builder.sections,
        builder.historyIndex,
        () => (builder.historyIndex = 0),
      );
    },

    /**
     * @callback : Callback if history saved! must index set to zero.
     */
    saveLocalHistory: _.throttle(async function (
      local_history,
      sections: Section[],
      current_index,
      callback,
    ) {
      // Keep only data, id , name
      const filtered = sections.map(function (section: Section) {
        return section.toJson() ;
      });

      const clone = JSON.stringify(filtered).trim();
      if (
        local_history.length > current_index &&
        clone === local_history[current_index]
      ) {
        if(DEBUG)
        console.log("✖️ No changes in history");
        return;
      }

      // Remove death zone:
      if (current_index > 0) {
        if (DEBUG) console.log("Clear death zone history", current_index);
        local_history.splice(0, current_index);
      }

      local_history.unshift(clone);
      if (local_history.length > 20) local_history.length = 20;

      if (DEBUG)
        console.log(
          "✚ New history item added > Items count:",
          local_history.length,
          "History",
          local_history,
          "Current Index",
          current_index,
        );

      if (callback) callback();
    }, 2000),
  },
});
