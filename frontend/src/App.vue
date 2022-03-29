<template>
  <div>
    <v-app>
      <v-main v-if="isDesktop">
        <v-select
          v-model="lo"
          :items="items"
          flat
          dense
          item-color="red"
          solo
          class="grey--text app__language"
          single-line
          hide-details
          filled
          height="30px"
          label="Standard"
          item-text="label"
          item-value="value"
          @change="setLocale"
        />
        <side-bar />

        <router-view class="home-section" />
      </v-main>

      <v-main v-if="$vuetify.breakpoint.xs">
        <bottom-bar />
      </v-main>
    </v-app>
  </div>
</template>

<script>
import sideBar from './components/layout/sidebar.vue'
import bottomBar from './components/layout/bottombar.vue'

export default {
  components: { sideBar, bottomBar },
  name: 'App',

  data: () => ({
    items: [
      { label: 'Portugues', value: 'pt' },
      { label: 'Inglês', value: 'en' }
    ],

    lo: {}
  }),

  computed: {
    isDesktop: function () {
      return ['xl', 'lg', 'md', 'sm'].includes(this.$vuetify.breakpoint.name)
    }
  },

  mounted () {
    this.$i18n.locale = localStorage.getItem('locale')
    this.lo = this.items.find(el => el.value === localStorage.getItem('locale'))
  },

  methods: {
    setLocale (lo) {
      localStorage.setItem('locale', lo)
      this.$i18n.locale = localStorage.getItem('locale')
    }
  }
}
</script>

<style lang="scss">
.home-section {
  position: relative;
  // background: #e4e9f7;
  min-height: 100vh;
  top: 0;
  left: 78px;
  width: calc(100% - 78px);
  transition: all 0.5s ease;
  z-index: 2;
}

.sidebar.open ~ .home-section {
  left: 250px;
  width: calc(100% - 250px);
}

.home-section .text {
  display: inline-block;
  color: white;
  font-size: 25px;
  font-weight: 500;
  margin: 18px;
}

.app__language {
  width: 150px;
  float: right;
  z-index: 99999;
}

.btn-text-transform {
  text-transform: none !important;
}

/* width */
::-webkit-scrollbar {
  width: 5px;
  height: 5px;
}

/* Track */
::-webkit-scrollbar-track {
  background: none;
}

/* Handle */
::-webkit-scrollbar-thumb {
  background: #c4c4c4;
  width: 5px;
}

/* Handle on hover */
::-webkit-scrollbar-thumb:hover {
  background: #a9a9a9;
}
</style>
