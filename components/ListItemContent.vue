<template>
  <div>
    <button @click="removeName(name)" class="align-middle">
      <CloseIcon v-bind:hasMadeTea="name.hasMadeTea"></CloseIcon>   
    </button>
    <label :for="name.id" class="align-middle">
      <div class="m-2 text-gray-400" v-if="name.hasMadeTea"><strike>{{ name.text }}</strike></div>
      <div class="m-2" v-else><strong>{{ name.text }}</strong></div>
    </label>
  </div>
</template> 

<script>
export default {
  name: 'ListItemContent',
  computed: {
    names() {
      return this.$store.state.names.list
    },
    name() {
      return this.$attrs.name
    }
  },
  methods: {
    removeName(name) {
      this.$store.commit('names/remove', name)
      this.$store.commit('names/removeRandomName')
      this.storeNamesLocally()
    },
    storeNamesLocally() {
      localStorage.setItem('names', JSON.stringify(this.names))
    }
  }
}
</script>