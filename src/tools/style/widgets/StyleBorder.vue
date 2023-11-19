<!--
  - Copyright (c) 2023. Selldone® Business OS™
  -
  - Author: M.Pajuhaan
  - Web: https://selldone.com
  - ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  -
  - All rights reserved. In the weave of time, where traditions and innovations intermingle, this content was crafted.
  - From the essence of thought, through the corridors of creativity, each word, and sentiment has been molded.
  - Not just to exist, but to inspire. Like an artist's stroke or a sculptor's chisel, every nuance is deliberate.
  - Our journey is not just about reaching a destination, but about creating a masterpiece.
  - Tread carefully, for you're treading on dreams.
  -->

<template>

    <div class="d-flex align-items-center">
        <b class="me-2 min-width-100">{{label}}</b>
        <s-number-dimension-input dense label="Width" v-model="width" @change="updateOut" class="px-2"></s-number-dimension-input>
        <v-select :items="items" dense label="Type" v-model="type" @change="updateOut" class="px-2" filled shaped solo flat hide-details></v-select>
        <color-selector v-model="color"  @change="updateOut" class="flex-grow-0 ms-2" mode="rgba"></color-selector>

    </div>
</template>

<script>
    import ColorSelector from "@components/ui/color/ColorSelector.vue";
    import SNumberDimensionInput from "@components/ui/dimension/SNumberDimensionInput.vue";
    export default {
        name: "StyleBorder",
        components: {SNumberDimensionInput, ColorSelector},
        props:{
            value:{},
            label:{},
},

        data() {
            return {
                width: null,
                type:'solid',
                items:['none','hidden','dotted','dashed','solid','groove','groove','ridge','inset','outset','initial'],
                color:'#444',

            };
        },

        watch:{
            value(){
                this.assignValue();
            }
        },
        methods:{
            updateOut(){
                this.$emit('input',`${this.width} ${this.type} ${this.color} `)
            },
            assignValue(){
                const arr=this.value.split(" ");
                if(arr.length>0)this.width=arr[0];
                if(arr.length>1)this.type=arr[1];
                if(arr.length>2)this.color=arr.slice(2).join(' '); //Other is color rgb(xx, xx, xx) !

              //  console.log('assignValue this.color',this.color)
            }


        },
        created() {
            this.assignValue();
        }


    }
</script>

<style scoped>
.x{
    border: dashed #00a89a thin;
}
</style>