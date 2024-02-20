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

export default {
  Minimal: `<div  style="width: 18rem; min-height: 100%;" class="d-flex flex-column">
<div class="card ma-2" style="background-color: #fafafa;min-height: 100%;">
                    <img src="{category.icon}" class="card-img-top" alt="{category.description}" style="aspect-ratio: 1;object-fit: cover;">
                    <div class="card-body mt-2 pb-3">
                        <h5 class="card-title single-line my-3">{category.title}</h5>
               

                        <a href="{url}" class="btn btn-primary" target="_blank">Open Category</a>
                    </div>
                </div>
</div>`,

  Curvy_Card: `<div  style="width: 18rem; min-height: 100%;" class="d-flex flex-column">
<div class="card ma-2 pa-3" style="background-color: #fff;min-height: 100%;border-radius: 12px;">
                    <img src="{category.icon}" class="card-img-top" alt="{category.description}" style="aspect-ratio: 1;object-fit: cover;box-shadow: 0px 10px 50px 5px rgba(113, 112, 112, 0.24); border-radius: 12px; margin-bottom: 16px;">
                    <div class="card-body mt-2 pb-3">
                        <h5 class="card-title single-line my-3">{category.title}</h5>
               

                        <a href="{url}" class="btn btn-primary" target="_blank" style="padding: 12px 16px;background: #d70000;color: #fff;border-radius: 12px;display: block;">Open Category</a>
                    </div>
                </div>
</div>`,
};
