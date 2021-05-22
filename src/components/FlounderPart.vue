<template>
    <div :class="'' +
     'flounder-part ' +
      'flounder-part--'+part.color+' ' +
       'flounder-part--'+part.type+' ' +
        'flounder-part--'+part.pattern"
    >{{ part.type }}</div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import FlounderPart from '@/entity/FlounderPart';

@Component({})

export default class FlounderPartComponent extends Vue {
  @Prop(FlounderPart) part!: FlounderPart;

  constructor() {
    super();
    console.log(this.part);
  }
}

</script>

<style scoped>
  .flounder-part {
    display: inline-block;
    width: 250px;
  }

  .flounder-part--head {

  }

  .flounder-part--striped {
    border: 3px dashed black;
  }

  .flounder-part--plain {
    border: 3px solid black;
  }

  .flounder-part--red {
    background-color: red;
  }

  .flounder-part--blue {
    background-color: blue;
  }

  .flounder-part--purple {
    background-color: purple;
  }

  .flounder-part--yellow {
    background-color: yellow;
  }

  .flounder-part--orange {
    background-color: orange;
  }
</style>
