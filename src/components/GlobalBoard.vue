<template>
  <div class="global-board">
    <flounder-part
      v-for="(part, index) in this.parts"
      v-bind:key="index"
      v-bind:part="part"
      v-on:click.native="selectPart(part)"
    ></flounder-part>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import FlounderPart from '@/components/FlounderPart.vue';

@Component({
  components: { FlounderPart },
})

export default class GlobalBoardComponent extends Vue {
  @Prop(Array) parts!: FlounderPart[];

  selectPart(part: FlounderPart) {
    console.log('Part selected', part);
    this.$emit('flounder-part-selected', part);
  }
}

</script>

<style scoped>
  .global-board {
    background-color: #DDD;
  }
</style>
