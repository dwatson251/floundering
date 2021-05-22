<template>
  <div>
    <global-board
      v-bind:parts="this.unownedParts"
      v-on:flounder-part-selected="givePartToPlayer($event)"
    >
    </global-board>
    <hr />
    <player-board
      v-if="activePlayer"
      v-bind:player="activePlayer"
    ></player-board>
    <hr />
    <button v-on:click="playTurn()">ROLL DICE</button>
    <hr />
    <span
      v-bind:key="key"
      v-for="(die, key) in this.diceCup.getDice()"
    >
      {{ die.getValue() }}
    </span>
  </div>
</template>

<script lang="ts">
import GlobalBoard from '@/components/GlobalBoard.vue';
import PlayerBoard from '@/components/PlayerBoard.vue';
import { Component, Vue } from 'vue-property-decorator';
import Player from '@/entity/Player';
import Die from '@/entity/Die';
import FlounderPart from '@/entity/FlounderPart';
import Flounder from '@/entity/Flounder';
import DiceCup from '@/entity/DiceCup';

@Component({
  components: {
    GlobalBoard,
    PlayerBoard,
  },
})

export default class App extends Vue {
  public diceCup: DiceCup;

  public players: Array<Player>;

  public parts: Array<FlounderPart> = [];

  public activePlayer: Player | null = null;

  constructor() {
    super();

    const availableColours = [
      'purple',
      'yellow',
      'red',
      'orange',
      'blue',
    ];

    const availablePatterns = [
      'plain',
      'striped',
    ];

    const availableParts = [
      'head',
      'torso-upper',
      'torso-lower',
      'fin-upper',
      'fin-lower',
      'tail',
    ];

    availableColours.forEach((color: string) => {
      availablePatterns.forEach((pattern: string) => {
        availableParts.forEach((part: string, index: number) => {
          this.parts.push(
            new FlounderPart(part, index + 1, color, pattern),
          );
        });
      });
    });

    this.diceCup = new DiceCup()
      .loadDie(new Die(1, 6))
      .loadDie(new Die(1, 6));

    this.players = [
      new Player('Player One'),
      new Player('Player Two'),
    ];

    const playerOneIndex = 0;
    this.activePlayer = this.players[playerOneIndex];

    this.playTurn();
  }

  givePartToPlayer(part: FlounderPart) {
    if (!this.activePlayer) {
      return;
    }

    if (!this.activePlayer.partTypeAllowance.includes(part.type)) {
      console.log("You didn't roll the right number to choose this part");
      return;
    }

    if (part.type === 'head') {
      this.activePlayer.addFlounder(new Flounder(part.color, part.pattern));
    }

    const activeFlounder = this.activePlayer.findFlounder(part.color, part.pattern);

    this.activePlayer.spendPartTypeAllowance(part.type);
    activeFlounder.addPart(part);
  }

  get unownedParts() {
    const ownedParts: FlounderPart[] = [];

    this.players.forEach((player: Player) => {
      player.flounders.forEach((flounder: Flounder) => {
        flounder.parts.forEach((part: FlounderPart) => {
          ownedParts.push(part);
        });
      });
    });

    // eslint-disable-next-line max-len
    return this.parts.filter((part: FlounderPart) => !ownedParts.find((ownedPart: FlounderPart) => part.color === ownedPart.color && part.pattern === ownedPart.pattern && part.type === ownedPart.type));
  }

  public playTurn() {
    if (this.activePlayer === null) {
      return;
    }

    if (!this.diceCup) {
      return;
    }

    this.activePlayer.resetPartTypeAllowance();

    this.diceCup.rollDice();

    if (this.diceCup.getFaceValueCount(1) > 1) {
      if (this.getFreePartCount('head') > 1) {
        for (let i = this.diceCup.getFaceValueCount(1); i > 0; i -= 1) {
          this.activePlayer.addPartTypeToAllowance('head');
        }
      }
    }
  }

  public getFreePartCount(partType: string) {
    let partCount = 0;

    this.parts.forEach((part: FlounderPart) => {
      if (part.type === partType) {
        partCount += 1;
      }
    });

    return partCount;
  }
}
</script>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
