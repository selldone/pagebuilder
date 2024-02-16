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
import SelldonePageBuilderCore from "@app-page-builder/src";
import {Section} from "@app-page-builder/src/section";

const DEBUG = true;

export const LandingHistoryMixin = defineComponent({
  data() {
    return {
      builder: this.$builder
        ? this
            .$builder /*In main page editor we have no access to provider, so we set $builder in data.*/
        : (inject("$builder") as SelldonePageBuilderCore),
    };
  },
  mounted() {},

  computed: {
    hasUndo() {
      /* console.log(
                     "hasUndo",
                     this.builder.historyIndex,
                     this.builder.history.length,
                     this.builder.historyIndex + 1 < this.builder.history.length,
                   );*/
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
      const exists: Section[] = [];
      raw_sections.forEach((raw: Section.ISection) => {
        // Keep real sections
        const found = this.builder.find(raw.id);
        if (found && found.name === raw.name) {
          exists.push(found);
        }
      });
      if (DEBUG) console.log("goUndo", "1 exists", exists);

      //2. Remove all:
      this.builder.sections.splice(0, this.builder.sections.length);

      // 3. Create new section:
      let index = 0;
      raw_sections.forEach((raw: Section.ISection) => {
        const found = exists.find(
          (it) => it.id === raw.id && it.name === raw.name,
        );
        if (found) {
          found.data = raw.data;
          if (DEBUG) console.log("goUndo", "3 Update", found);
          this.builder.sections.push(found);
        } else {
          this.builder.add(raw, index, false,false);
          if (DEBUG) console.log("goUndo", "3 Add", raw);
        }
        index++;
      });
    },

    //――――――――――――――――――――――  History > Save ――――――――――――――――――――

    onSaveHistory() {
      const builder = this.builder as SelldonePageBuilderCore;
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
      const filtered = sections.map(function (i: Section) {
        return { name: i.name, id: i.id, uid: i.uid, data: i.data };
      });

      const clone = JSON.stringify(filtered).trim();
      if (
        local_history.length > current_index &&
        clone === local_history[current_index]
      ) {
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
