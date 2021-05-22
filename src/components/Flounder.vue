<template>
  <div class="flounder">
    I AM A FLOUNDER
    <flounder-part-component
      v-for="(part, index) in flounder.parts"
      v-bind:key="index"
      v-bind:part="part"
    >
    </flounder-part-component>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import FlounderPartComponent from '@/components/FlounderPart.vue';
import Flounder from '@/entity/Flounder';

@Component({
  components: {
    FlounderPartComponent,
  },
})

export default class FlounderComponent extends Vue {
  @Prop(Flounder) flounder!: Flounder;

  constructor() {
    super();
    console.log(this.flounder);
  }
}

</script>

<style scoped>

</style>
