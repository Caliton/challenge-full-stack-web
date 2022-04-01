<template>
  <v-row justify="center">
    <v-dialog v-model="dialog" persistent max-width="900px">
      <v-card>
        <v-card-title class="mb-6">
          <span class="text-h5 grey--text text--darken-2">{{
            isEdit ? $t('editStudents') : $t('newStudent')
          }}</span>
        </v-card-title>
        <v-card-text>
          <v-container>
            <v-row class="text-center align-center">
              <v-col
                v-if="!$vuetify.breakpoint.xs"
                cols="6"
                class="justify-self-center"
              >
                <v-img
                  v-if="isEdit"
                  lazy-src="../../assets/edit_students.png"
                  max-height="280"
                  max-width="280"
                  width="100%"
                  class="text-center"
                  src="../../assets/edit_students.png"
                ></v-img>

                <v-img
                  v-else
                  lazy-src="../../assets/add_students.png"
                  max-height="300"
                  max-width="300"
                  width="100%"
                  class="text-center"
                  src="../../assets/add_students.png"
                ></v-img>
              </v-col>

              <v-col
                :cols="!$vuetify.breakpoint.xs ? 6 : 12"
                class="text-right"
              >
                <v-row>
                  <v-text-field
                    v-model="student.name"
                    prepend-inner-icon="mdi-account-school"
                    filled
                    sole
                    rounded
                    :label="$t('name') + '*'"
                    required
                    :error-messages="nameErrors"
                  >
                  </v-text-field>
                </v-row>

                <v-row>
                  <v-text-field
                    v-model="student.email"
                    prepend-inner-icon="mdi-email"
                    filled
                    sole
                    rounded
                    label="Email*"
                    required
                    :error-messages="emailErrors"
                  >
                  </v-text-field>
                </v-row>

                <v-row>
                  <v-text-field
                    v-model="student.ra"
                    :disabled="isEdit"
                    prepend-inner-icon="mdi-qrcode"
                    filled
                    sole
                    rounded
                    label="RA"
                    required
                    :error-messages="raErrors"
                  >
                  </v-text-field>
                </v-row>

                <v-row>
                  <v-text-field
                    v-model="student.cpf"
                    :disabled="isEdit"
                    prepend-inner-icon="mdi-card-account-details"
                    filled
                    sole
                    rounded
                    label="CPF*"
                    v-mask="'###.###.###-##'"
                    :error-messages="cpfErrors"
                    required
                  >
                  </v-text-field>
                </v-row>

                <small>*{{ $t('required') }}</small>
              </v-col>
            </v-row>
          </v-container>
        </v-card-text>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            class="btn-text-transform"
            color="grey lighten-1"
            rounded
            text
            @click="dialog = false"
          >
            {{ $t('cancel') }}
          </v-btn>
          <v-btn
            class="btn-text-transform"
            color="blue darken-1"
            text
            rounded
            @click="saveStudent"
          >
            {{ $t('save') }}
          </v-btn>
        </v-card-actions>
      </v-card>

      <v-overlay absolute :value="loading">
        <v-progress-circular indeterminate color="blue"></v-progress-circular>
      </v-overlay>

      <v-snackbar
        v-model="notifier"
        :timeout="3000"
        :color="notifierStyle.color"
      >
        <v-icon>{{ notifierStyle.icon }}</v-icon>
        <span class="ml-4">{{ $t(notifierStyle.message) }}</span>
      </v-snackbar>
    </v-dialog>
  </v-row>
</template>

<script>
import {
  required,
  requiredIf,
  maxLength,
  email
} from 'vuelidate/lib/validators'
import validateCPF from '../../function/validyCPF.js'

export default {
  name: 'DiStudents',
  data: () => ({
    dialog: false,
    isEdit: false,
    loading: false,
    notifierStyle: {
      message: 'saveSuccess',
      color: 'green',
      icon: 'mdi-account-check'
    },

    notifier: false,

    student: {
      ra: '',
      cpf: '',
      email: '',
      name: ''
    }
  }),

  filters: {
    formatCpf: function (cpf) {
      cpf = cpf.replace(/[^\d]/g, '')
      return cpf.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4')
    }
  },

  validations: {
    student: {
      ra: {
        required: requiredIf(function () {
          return !this.isEdit
        }),
        maxLength: maxLength(20)
      },
      cpf: {
        required: requiredIf(function () {
          return !this.isEdit
        })
      },
      email: { required, email },
      name: { required, maxLength: maxLength(100) }
    }
  },

  computed: {
    raErrors () {
      const errors = []
      if (!this.$v.student.ra.$dirty) return errors

      !this.$v.student.ra.maxLength && errors.push(this.$t('errorRaMustLenght'))

      !this.$v.student.ra.required && errors.push(this.$t('required'))
      return errors
    },

    nameErrors () {
      const errors = []
      if (!this.$v.student.name.$dirty) return errors
      !this.$v.student.name.maxLength && errors.push(this.$t('errorNameMust'))
      !this.$v.student.name.required && errors.push(this.$t('required'))
      return errors
    },

    emailErrors () {
      const errors = []
      if (!this.$v.student.email.$dirty) return errors
      !this.$v.student.email.required && errors.push(this.$t('required'))
      !this.$v.student.email.email && errors.push(this.$t('mustEmail'))
      return errors
    },

    cpfErrors () {
      const errors = []
      if (!this.$v.student.cpf.$dirty) return errors

      const checking = !this.validateCPF(this.student.cpf) && !this.isEdit
      !this.$v.student.cpf.required && errors.push(this.$t('required'))
      checking && errors.push(this.$t('CPFInvalid'))
      return errors
    }
  },

  methods: {
    show (item) {
      this.student = {}
      this.resetStudent()
      if (item.ra) {
        this.getStudent(item.ra)
        this.isEdit = true
      }

      this.dialog = true
    },

    hide () {
      this.$emit('on-hide')
      this.dialog = false
    },

    cancel () {
      this.$emit('on-cancel')
      this.dialog = false
    },

    async getStudent (ra) {
      try {
        this.loading = true
        const { data } = await this.$axios.get(`students/${ra}`)
        this.student = { ...data }
      } catch (e) {
        this.triggerNotifier({
          message: 'Teste',
          icon: 'mdi-qrcode',
          color: 'red'
        })
      } finally {
        this.loading = false
      }
    },

    triggerNotifier (props) {
      console.log('Fui disparado')
      this.notifierStyle = props || this.notifierStyle
      this.notifier = true
    },

    async saveStudent () {
      try {
        if (this.invalidFields()) {
          return
        }

        const request = this.$axios[this.isEdit ? 'patch' : 'post']

        const { createdAt, updatedAt, ra, cpf, ...data } = this.student
        const sendData = data
        sendData.cpf = cpf.replace(/[^\d]/g, '')

        if (!this.isEdit) {
          sendData.ra = ra
        }

        this.loading = true

        await request(this.isEdit ? `students/${ra}` : 'students', sendData)

        this.hide()
      } catch (e) {
        console.log(e.response.data.error)
        this.triggerNotifier({
          message: e.response.data.error,
          icon: 'mdi-qrcode',
          color: 'red'
        })
      } finally {
        this.loading = false
      }
    },

    validateCPF (cpf) {
      if (!cpf) return false
      const sanitizeCPF = cpf.replace(/[^\w\s]/gi, '')

      return validateCPF(sanitizeCPF)
    },

    invalidFields () {
      this.$v.student.$touch()
      return this.$v.student.$error || !this.validateCPF(this.student.cpf)
    },

    resetStudent () {
      this.student = {
        ra: '',
        email: '',
        cpf: '',
        name: ''
      }

      this.isEdit = false

      this.$v.student.$reset()
    }
  }
}
</script>
