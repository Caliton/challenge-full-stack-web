<template>
  <div class="pa-6">
    <l-title
      :title="$t('Home')"
      icon="mdi-monitor-dashboard"
      :describe="$t('technicalChallenge')"
    />

    <div class="d-flex img__center justify-center align-center">
      <v-img
        lazy-src="../assets/home.gif"
        max-height="300"
        max-width="300"
        width="10%"
        src="../assets/home.gif"
      ></v-img>
    </div>
  </div>
</template>

<script>
export default {
  name: 'HomeView'
}
</script>

<style lang="scss" scoped>
.img__center {
  width: 100%;
  height: 60vh;
}
</style>
