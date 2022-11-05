<template>
  <div class="mx-auto my-4 md:container bg-gray-75">
    <div class="relative flex items-top justify-center">
      <h1 class="text-3xl font-bold m-4">The Tea Round Picker</h1>
    </div>
    <div class="relative flex items-top justify-center my-4">
      <input type="text" @keyup="updateNameField" @keyup.enter="addName" placeholder="Input Name" class="p-2 border"
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
        <button @click="getRandomName" class="relative m-4 my-2 bg-gray-700 p-2 text-gray-50"><DiceIcon />Get Random Name</button>
        <button @click="resetEligibleNames" class="m-4 my-2 bg-gray-700 p-2 text-gray-50">Reset Eligible Names</button>
        <button @click="removeAllNames" class="m-4 my-2 bg-gray-700 p-2 text-gray-50">Remove All Names</button>
      </div>

      <div>
        <h2 class="text-center align-middle text-2xl font-bold m4">{{ randomName.text }}</h2>
      </div>
    </div>
  </div>
</template>

<style>
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
      this.$store.commit('names/getRandomName')
      this.storeNamesLocally()
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
