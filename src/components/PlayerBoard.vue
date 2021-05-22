<template>
  <div class="player-board">
    Player Name: {{ player.name }}
    <flounder-component
      v-for="(flounder, index) in player.flounders"
      v-bind:key="index"
      v-bind:flounder="flounder"
    ></flounder-component>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import FlounderComponent from '@/components/Flounder.vue';
import Player from '@/entity/Player';

@Component({
  components: {
    FlounderComponent,
  },
})

export default class PlayerBoardComponent extends Vue {
  @Prop(Player) player!: Player;

  constructor() {
    super();
    console.log(this.player);
  }
}

</script>

<style scoped>
  .player-board {
    background-color: #222;
    color: white;
  }
</style>
