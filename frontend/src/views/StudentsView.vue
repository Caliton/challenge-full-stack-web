<template>
  <div class="pa-4" :class="{ 'pa-6': !$vuetify.breakpoint.xs }">
    <l-title
      :title="$t('students')"
      icon="mdi-school-outline"
      :describe="$t('feelFreeToManage')"
    >
    </l-title>

    <v-spacer class="pb-1" :class="{ 'pb-4': !$vuetify.breakpoint.xs }" />
    <v-btn
      v-if="$vuetify.breakpoint.xs"
      color="blue"
      dark
      absolute
      plain
      icon
      top
      right
      class="mr-5 mt-8 btn-text-transform"
      @click="expandMobileMenu = !expandMobileMenu"
    >
      <v-icon> mdi-dots-vertical </v-icon>
    </v-btn>

    <v-row v-if="!$vuetify.breakpoint.xs" justify="space-between">
      <div class="col-md-5 col-lg-4">
        <v-text-field
          prepend-inner-icon="mdi-magnify"
          v-model="search"
          :label="$t('search')"
          rounded
          dense
          single-line
          filled
          clearable
          hide-details
          v-debounce:500ms="refresh"
        >
          <template v-slot:append-outer>
            <div class="pa-1 ml-1 row">
              <v-btn
                @click="newStudent"
                class="mr-3"
                color="grey"
                ripple
                icon
                elevation="0"
              >
                <v-icon>mdi-account-plus</v-icon>
              </v-btn>
            </div>
          </template>
        </v-text-field>
      </div>

      <div class="col-md-3 col-lg-3">
        <v-select
          rounded
          single-line
          hide-details
          filled
          v-model="sortData"
          @change="refresh"
          @click:append-outer="setOrder"
          :items="headers"
          item-text="text"
          item-value="value"
          label="Ordenar"
          :append-outer-icon="
            order === 'asc' ? 'mdi-sort-reverse-variant' : 'mdi-sort-variant'
          "
          dense
        />
      </div>

      <div class="col-md-3 col-lg-3">
        <v-tabs
          height="30"
          right
          class="pa-1"
          v-model="tab"
          @change="setTabDefault"
        >
          <v-tab href="#grid"> <v-icon small> mdi-view-grid </v-icon> </v-tab>
          <v-tab href="#table">
            <v-icon small> mdi-format-list-bulleted </v-icon>
          </v-tab>
        </v-tabs>
      </div>
    </v-row>

    <v-spacer class="pb-1" :class="{ 'pb-10': !$vuetify.breakpoint.xs }" />

    <v-tabs-items v-if="!$vuetify.breakpoint.xs" v-model="tab">
      <v-tab-item value="grid">
        <div style="max-height: 65vh; overflow: auto;">
          <v-card
            class="elevation-2 ma-4 pa-2 grey lighten-5"
            style="width: 350px; display: inline-block"
            v-for="(students, index) in data"
            :key="index"
          >
            <div class="card__title grey--text text--darken-3 py-2 ma-2">
              <v-icon>mdi-account-school</v-icon>
              {{ students.name }}
            </div>

            <div class="grey--text py-2 ma-2">
              <v-icon>mdi-qrcode</v-icon>
              {{ students.ra }}
            </div>

            <div class="grey--text py-2 ma-2">
              <v-icon>mdi-card-account-details</v-icon>
              {{ students.cpf | formatCpf }}
            </div>

            <div class="d-flex flex-row-reverse">
              <v-btn
                @click="deleteStudent(students)"
                small
                color="red"
                rounde
                icon
              >
                <v-icon small>mdi-close</v-icon>
              </v-btn>

              <v-btn
                @click="editStudent(students)"
                small
                color="blue"
                rounde
                icon
              >
                <v-icon small>mdi-pencil</v-icon>
              </v-btn>
            </div>
          </v-card>

          <v-card
            :loading="loading"
            class="pa-1 grey--text"
            v-intersect="infiniteScrolling"
          >
          </v-card>
          <!--Add here the vuetify directive -->
        </div>
      </v-tab-item>

      <v-tab-item value="table">
        <v-data-table
          :search="search"
          :headers="headers"
          :items="data"
          :loading="loading"
          :items-per-page="100"
          :page.sync="page"
          loading-text="Buscando Alunos..."
          hide-default-footer
          height="60vh"
          fixed-header
          sort-by="name"
        >
          <template v-slot:[`item.cpf`]="{ item }">
            {{ item.cpf | formatCpf }}
          </template>

          <template v-slot:[`item.actions`]="{ item }">
            <v-icon small class="mr-2" @click="editStudent(item)">
              mdi-pencil
            </v-icon>
            <v-icon small @click="deleteStudent(item)">
              mdi-delete
            </v-icon>
          </template>

          <template v-slot:no-data>
            <span class="grey--text">Nada encontrado...</span>
          </template>

          <template v-slot:[`body.append`]>
            <div class="pb-12"></div>
            <v-card
              width="100%"
              elevation="0"
              class="pa-1"
              v-intersect="infiniteScrolling"
            >
            </v-card>
          </template>
        </v-data-table>
      </v-tab-item>
    </v-tabs-items>

    <!-- ======================= MOBILE ============================== -->

    <v-card flat v-if="$vuetify.breakpoint.xs">
      <div class="row card__area">
        <v-card
          class="col-md-3 elevation-2 ma-4 pa-2 grey lighten-5"
          v-for="(students, index) in data"
          :key="index"
        >
          <div class="card__title grey--text text--darken-3 py-2 ma-2">
            <v-icon>mdi-account-school</v-icon>
            {{ students.name }}
          </div>

          <div class="grey--text py-2 ma-2">
            <v-icon>mdi-qrcode</v-icon>
            {{ students.ra }}
          </div>

          <div class="grey--text py-2 ma-2">
            <v-icon>mdi-card-account-details</v-icon>
            {{ students.cpf | formatCpf }}
          </div>

          <div class="d-flex flex-row-reverse">
            <v-btn
              @click="deleteStudent(students.ra)"
              small
              color="red"
              rounde
              icon
            >
              <v-icon small>mdi-close</v-icon>
            </v-btn>

            <v-btn
              @click="editStudent(students.ra)"
              small
              color="blue"
              rounde
              icon
            >
              <v-icon small>mdi-pencil</v-icon>
            </v-btn>
          </div>
        </v-card>

        <v-card
          class="pa-1"
          width="100%"
          elevation="0"
          :loading="loading"
          v-intersect="infiniteScrolling"
        >
        </v-card>
      </div>
    </v-card>

    <v-bottom-sheet v-model="expandMobileMenu">
      <v-sheet class="pa-6 text-right">
        <v-select
          class="mt-4 pb-3"
          rounded
          color="grey"
          single-line
          hide-details
          filled
          v-model="sortData"
          @change="refresh"
          @click:append-outer="setOrder"
          :items="headers"
          item-text="text"
          item-value="value"
          label="Ordenar"
          :append-outer-icon="
            order === 'asc' ? 'mdi-sort-reverse-variant' : 'mdi-sort-variant'
          "
          dense
        />

        <v-text-field
          prepend-inner-icon="mdi-magnify"
          v-model="search"
          label="Buscar..."
          rounded
          dense
          single-line
          filled
          clearable
          hide-details
          v-debounce:500ms="refresh"
          @click:clear="reset"
        >
        </v-text-field>

        <v-btn
          color="blue"
          dark
          rounded
          class="mt-4 text-center btn-text-transform"
          @click="newStudent"
        >
          Cadastrar novo Aluno
        </v-btn>
      </v-sheet>
    </v-bottom-sheet>

    <di-studants ref="di-students" />

    <v-dialog v-model="dialogDelete" max-width="600px">
      <v-card>
        <v-card-title class="text-h5 grey--text text--darken-1">
          {{ $t('excludeStudent') }}
        </v-card-title>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            class="btn-text-transform"
            color="grey lighten-1"
            rounded
            text
            @click="closeDelete"
          >
            {{ $t('cancel') }}
          </v-btn>

          <v-btn
            class="btn-text-transform"
            color="red darken-1"
            rounded
            text
            @click="deleteStudentConfirm(selectedStudent.ra)"
          >
            {{ $t('exclude') }}
          </v-btn>
          <v-spacer></v-spacer>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import DiStudants from '@/components/students/diStudents.vue'
export default {
  name: 'StudentsView',

  components: { DiStudants },

  data: () => ({
    dialog: false,
    dialogDelete: false,
    tab: localStorage.getItem('visualization_tab'),
    selectedStudent: {},
    search: '',
    loading: false,
    expandMobileMenu: false,
    page: 0,
    order: 'asc',
    headers: [
      { text: 'Nome', value: 'name' },
      { text: 'RA', value: 'ra' },
      { text: 'CPF', value: 'cpf' },
      { text: 'Ações', value: 'actions', sortable: false }
    ],
    sortData: {},
    data: []
  }),

  filters: {
    formatCpf: function (cpf) {
      cpf = cpf.replace(/[^\d]/g, '')
      return cpf.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4')
    }
  },

  mounted () {
    this.sortData = this.headers[0]
  },

  methods: {
    setTabDefault (tab) {
      localStorage.setItem('visualization_tab', tab)
    },

    infiniteScrolling () {
      this.page++

      const params = {
        _page: this.page,
        _limit: 10,
        _sort: this.sortData.value,
        _order: this.order,
        name_like: this.search || undefined
      }

      if (this.search) {
        params.name_like = this.search
      }

      this.loading = true

      this.$axios
        .get('students', { params })
        .then(({ data }) => {
          if (data.length && !this.isRepeat([...data, ...this.data], 'cpf')) {
            data.forEach(item => this.data.push(item))
          }
        })
        .catch(err => {
          console.log(err)
        })
        .finally(() => {
          this.loading = false
        })
    },

    isRepeat (a, key) {
      return new Set(a.map(b => b[key])).size !== a.map(b => b[key]).length
    },

    setOrder () {
      this.order = this.order === 'asc' ? 'desc' : 'asc'
      this.refresh()
    },

    refresh () {
      this.page = 0
      this.data = []
      this.infiniteScrolling()
    },

    reset () {
      this.search = ''
      this.refresh()
    },

    editStudent (item) {
      this.$refs['di-students'].show(item)
    },

    newStudent () {
      this.expandMobileMenu = false
      this.$refs['di-students'].show({})
    },

    deleteStudent (student) {
      this.selectedStudent = student
      this.dialogDelete = true
    },

    async deleteStudentConfirm () {
      try {
        this.loading = true
        const { ra } = this.selectedStudent
        await this.$axios.delete(`students/${ra}`)
        this.dialogDelete = false
      } catch (e) {
        console.log(e)
      } finally {
        this.loading = false
        this.selectedStudent = {}
      }
    },

    close () {
      this.dialog = false
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem)
        this.editedIndex = -1
      })
    },

    closeDelete () {
      this.dialogDelete = false
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem)
        this.editedIndex = -1
      })
    },

    save () {
      if (this.editedIndex > -1) {
        Object.assign(this.desserts[this.editedIndex], this.editedItem)
      } else {
        this.desserts.push(this.editedItem)
      }
      this.close()
    }
  }
}
</script>

<style lang="scss" scoped>
.btn-text-transform {
  text-transform: none !important;
}

.card__title {
  font-size: 1.3rem;
}

.card__search--mobile {
  bottom: 94px !important;
  position: absolute;
  width: 100%;
}

.card__area {
  max-height: 77vh;
  overflow: auto;
}
</style>
