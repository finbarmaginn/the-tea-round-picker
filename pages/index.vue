<template>
  <div>
    <div class="relative flex items-top justify-center bg-gray-100 sm:pt-0">
      <h1 class="text-3xl font-bold m-4">The Tea Round Picker</h1>
    </div>
    <div class="relative flex items-top justify-left bg-gray-100 sm:p-4">
      <input type="text" @keyup="updateNameField" @keyup.enter="addName" placeholder="Input Name" class="p-2"
        v-bind:value="nameField" />
      <button @click="addName" class="bg-gray-700 m-2 p-2 text-gray-50">Add Name</button>
    </div>
    <div class="relative flex items-top justify-evenly bg-gray-100 sm:p-4">
      <div>
        <ul>
          <li v-for="name in names" :key="name.id">
            <button @click="removeName(name)" class="align-middle">
              <closeIcon />
            </button>
            <label for="name.id" class="align-middle">
              <div v-if="name.hasMadeTea"><strike>{{ name.text }}</strike></div>
              <div v-else>{{ name.text }}</div>
            </label>
          </li>
        </ul>
      </div>

      <div class="text-center">
        <button @click="getRandomName" class="bg-gray-700 m-2 p-2 text-gray-50">Get Random Name</button>
        <button @click="removeAllNames" class="bg-gray-700 m-2 p-2 text-gray-50">Remove All Names</button>
      </div>

      <div class="text-right">
        <h2 class="align-middle text-2xl font-bold m4">{{ randomName.text }}</h2>
      </div>
    </div>
  </div>
</template>

<style>
div.flex>div {
  width: 33.3333%;
}
div.flex label > div {
  display: inline;
}
</style>

<script>
export default {
  name: 'IndexPage',
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
      }
    },
    removeName(name) {
      this.$store.commit('names/remove', name)
    },
    updateNameField(event) {
      this.$store.commit('names/updateNameField', event.target.value)
    },
    getRandomName() {
      this.$store.commit('names/getRandomName')
    },
    removeAllNames() {
      this.$store.commit('names/removeAllNames')
    }
  }
}
</script>
