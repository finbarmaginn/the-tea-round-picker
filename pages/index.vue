<template>
  <div class="mx-auto my-4 md:container bg-gray-75">
    <HeaderComponent />
    <div class="relative flex items-top justify-center my-4">
      <input type="text" @keyup="updateNameField" @keyup.enter="addName" placeholder="Input Name" class="p-2 border border-gray-400"
        v-bind:value="nameField" />
      <button @click="addName" class="bg-gray-700 p-2 text-gray-50">Add Name</button>
    </div>

    <div class="relative flex items-top justify-evenly my-8">
      <div>
        <ul>
          <li class="p-4 border-b border-gray-400" v-for="name in names" :key="name.id">
            <ListItemContent v-bind:name="name"></ListItemContent>
          </li>
        </ul>
      </div>

      <div class="text-center flex flex-col border-gray-400 border-r border-l">
        <button @click="getRandomName" class="relative m-4 my-2 bg-gray-700 p-2 text-gray-50"><DiceIcon v-bind:isSpinning="isSpinning" />Get Random Name</button>
        <button @click="resetEligibleNames" class="m-4 my-2 bg-gray-700 p-2 text-gray-50">Reset Eligible Names</button>
        <button @click="removeAllNames" class="m-4 my-2 bg-gray-700 p-2 text-gray-50">Remove All Names</button>
      </div>

      <div>
        <h2 class="text-center text-2xl font-bold my-10">{{ randomName.text }}</h2>
      </div>
    </div>
  </div>
</template>

<style>
body {
  overflow-y: scroll;
}
div.flex>div {
  width: 33.3333%;
}

div.flex label>div {
  display: inline;
}
</style>

<script>
export default {
  name: 'IndexPage',
  beforeMount: function () {
    const parsedStorage = JSON.parse(localStorage.getItem('names')) || []
    this.$store.commit('names/rehydrateStore', parsedStorage)
  },
  computed: {
    names() {
      return this.$store.state.names.list
    },
    nameField() {
      return this.$store.state.names.nameField
    },
    randomName() {
      return this.$store.state.names.randomName
    },
    hasMadeTea() {
      return this.$store.state.names.hasMadeTea
    },
    isSpinning() {
      return this.$store.state.dice.isSpinning
    }
  },
  methods: {
    addName() {
      if (this.nameField.length) {
        this.$store.commit('names/add', this.nameField)
        this.$store.commit('names/updateNameField', '')
        this.storeNamesLocally()
      }
    },
    updateNameField(event) {
      this.$store.commit('names/updateNameField', event.target.value)
      this.$store.commit('names/removeRandomName')
    },
    getRandomName() {
      this.$store.commit('dice/activateSpin')
      setTimeout(() => {
        this.$store.commit('dice/deactivateSpin')
        this.$store.commit('names/getRandomName')
        this.storeNamesLocally()
      }, 500);
    },
    removeAllNames() {
      this.$store.commit('names/removeAllNames')
      this.$store.commit('names/removeRandomName')
      this.storeNamesLocally()
    },
    resetEligibleNames() {
      this.$store.commit('names/resetEligibleNames')
      this.$store.commit('names/removeRandomName')
      this.storeNamesLocally()
    },
    storeNamesLocally() {
      localStorage.setItem('names', JSON.stringify(this.names))
    }
  }
}
</script>
