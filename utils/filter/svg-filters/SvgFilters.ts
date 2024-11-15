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

const SVG_FILTERS =
  `    <filter id="filter_grain">
        <feTurbulence baseFrequency="0.60,0.90" result="colorNoise" />
        <feColorMatrix
                in="colorNoise"
                type="matrix"
                values=".33 .33 .33 0 0 .33 .33 .33 0 0 .33 .33 .33 0 0 0 0 0 1 0"
        />
        <feComposite operator="in" in2="SourceGraphic" result="monoNoise" />
        <feBlend in="SourceGraphic" in2="monoNoise" mode="multiply" />
    </filter>
` +
  `    <filter id="filter_squiggly">
        <feTurbulence
                id="turbulence2"
                baseFrequency="0.02"
                numOctaves="3"
                result="noise"
                seed="1"
        />
        <feDisplacementMap in="SourceGraphic" in2="noise" scale="8" />
    </filter>` +
  `    <filter id="filter_fluffy" x="0%" y="0%" width="100%" height="100%">
        <feTurbulence
                type="fractalNoise"
                baseFrequency="0.04"
                result="fluffyNoise"
                numOctaves="5"
        />
        <feColorMatrix
                in="fluffyNoise"
                type="matrix"
                values=".33 .33 .33 0 0 .33 .33 .33 0 0 .33 .33 .33 0 0 0 0 0 1 0"
        />
        <feComposite
                operator="in"
                in2="SourceGraphic"
                result="monoFluffyNoise"
        />
        <feBlend in="SourceGraphic" in2="monoFluffyNoise" mode="screen" />
    </filter>` +
  `
  <filter id="filter_gothamish" color-interpolation-filters="sRGB">
      <feComponentTransfer in="SourceGraphic" result="midtoneContrast">
        <feFuncR type="table" tableValues="0 0.05 0.1 0.2 0.3  0.5 0.7 0.8  0.9 0.95 1.0"/>
     </feComponentTransfer>
     <feColorMatrix in="midtoneContrast" result="redBWandblue" type="matrix" 
                               values="1 0 0 0 0
                                       1 0 0 0 0
                                       1 0 0 0 0.03
                                       0 0 0 1 0"/>
     <feGaussianBlur in="redBWandblue" stdDeviation="1" result="blurMask"/>
     <feComposite operator="arithmetic" in="redBWandblue" in2="blurMask" k2="1.3" k3="-0.3" result="postsharp"/>
     <feComponentTransfer result="finalImage" in="postsharp">
       <feFuncB type="table" tableValues="0 0.047 0.118 0.251 0.318 0.392 0.42 0.439 0.475 0.561 0.58 0.627 0.671 0.733 0.847 0.925 1"/>
     </feComponentTransfer>
  </filter>

` +
  `
         <filter id="filter_stained" x="0%" y="0%" width="100%" height="100%">
            <feTurbulence id="b1" type="fractalNoise" baseFrequency="0.075" numOctaves="3"/>
               <feColorMatrix type="matrix" values=".33 .33 .33 0 0 
                                                 .33 .33 .33 0 0 
                                                 .33 .33 .33 0 0 
                                                 0 0 0 1 0"/>
             <feComponentTransfer result="texture">
                <feFuncA type="discrete" tableValues="0 0 0 0 0 0 0 .15 .7 .9 1 1"/>
            </feComponentTransfer>
          <feComponentTransfer result="colored-texture">
            <feFuncR type="discrete" tableValues="0 .93 .93 .93 .93"/>
            <feFuncG type="discrete" tableValues="0 .84 .84 .84 .84"/>
            <feFuncB type="discrete" tableValues="0 .63 .63 .63 .63"/>
            </feComponentTransfer>
         
                      <feBlend in="SourceGraphic" in2="colored-texture" mode="screen" />


        </filter>     


`;

export class SvgFilters {
  static Install() {
    // Dynamically add to the root:
    if (!document.getElementById('selldone_filters')) {
      document.body.insertAdjacentHTML(
          'afterbegin',
          `<svg id="selldone_filters" aria-hidden="true" style="position: absolute; width: 0; height: 0; overflow: hidden;" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">${SVG_FILTERS}</svg>`
      );
    }
  }
}