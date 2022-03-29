<template>
  <div class="col">
    <v-icon class="d-block" color="grey" size="md">
      {{ icon }}
    </v-icon>
    <span class="layout__title grey--text text--darken-1">
      {{ title }}
    </span>
    <p v-if="!$vuetify.breakpoint.xs" class="layout__describe grey--text">
      {{ describe }}
    </p>
  </div>
</template>

<script>
export default {
  name: 'LayoutTitle',

  props: {
    title: {
      type: String,
      default: 'home'
    },

    describe: {
      type: String,
      default: ''
    },

    icon: {
      type: String,
      default: ''
    }
  }
}
</script>

<style>
.layout__title {
  font: 22px/36px Helvetica, Arial, sans-serif;
}

.layout__describe {
  font: 16px / 24px Helvetica, Arial, sans-serif;
}
</style>
