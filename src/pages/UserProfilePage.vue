<template>
  <q-page padding>
    <div v-if="userAuthenticated">Hello World</div>
    <div v-else>Identification incorrecte.</div>
  </q-page>
</template>

<script>
export default {
  data() {
    return {
      userAuthenticated: false,
      users: [
        {
          user_id: 'dev1',
          nom: 'NomDev1',
          prenom: 'PrenomDev1',
          adresse: 'Adresse 1',
          numero_tel: '0123456781',
          job: 'développeur',
          manager_id: 'cp1',
          managing_id: null,
          password: 'devpassword1'
        },
        {
          user_id: 'dev2',
          nom: 'NomDev2',
          prenom: 'PrenomDev2',
          adresse: 'Adresse 2',
          numero_tel: '0123456782',
          job: 'développeur',
          manager_id: 'cp1',
          managing_id: null,
          password: 'devpassword2'
        },
        {
          user_id: 'dev3',
          nom: 'NomDev3',
          prenom: 'PrenomDev3',
          adresse: 'Adresse 3',
          numero_tel: '0123456783',
          job: 'développeur',
          manager_id: 'cp1',
          managing_id: null,
          password: 'devpassword3'
        },
        {
          user_id: 'dev4',
          nom: 'NomDev4',
          prenom: 'PrenomDev4',
          adresse: 'Adresse 4',
          numero_tel: '0123456784',
          job: 'développeur',
          manager_id: 'cp2',
          managing_id: null,
          password: 'devpassword4'
        },
        {
          user_id: 'dev5',
          nom: 'NomDev5',
          prenom: 'PrenomDev5',
          adresse: 'Adresse 5',
          numero_tel: '0123456785',
          job: 'développeur',
          manager_id: 'cp2',
          managing_id: null,
          password: 'devpassword5'
        },
        {
          user_id: 'dev6',
          nom: 'NomDev6',
          prenom: 'PrenomDev6',
          adresse: 'Adresse 6',
          numero_tel: '0123456786',
          job: 'développeur',
          manager_id: 'cp2',
          managing_id: null,
          password: 'devpassword6'
        },
        {
          user_id: 'dev7',
          nom: 'NomDev7',
          prenom: 'PrenomDev7',
          adresse: 'Adresse 7',
          numero_tel: '0123456787',
          job: 'développeur',
          manager_id: 'cp3',
          managing_id: null,
          password: 'devpassword7'
        },
        {
          user_id: 'dev8',
          nom: 'NomDev8',
          prenom: 'PrenomDev8',
          adresse: 'Adresse 8',
          numero_tel: '0123456788',
          job: 'développeur',
          manager_id: 'cp3',
          managing_id: null,
          password: 'devpassword8'
        },
        {
          user_id: 'dev9',
          nom: 'NomDev9',
          prenom: 'PrenomDev9',
          adresse: 'Adresse 9',
          numero_tel: '0123456789',
          job: 'développeur',
          manager_id: 'cp3',
          managing_id: null,
          password: 'devpassword9'
        },

        {
          user_id: 'cp1',
          nom: 'NomCP1',
          prenom: 'PrenomCP1',
          adresse: 'Adresse CP 1',
          numero_tel: '0234567891',
          job: 'chef de projet',
          manager_id: 'rh1',
          managing_id: ['dev1', 'dev2', 'dev3'],
          password: 'cppassword1'
        },
        {
          user_id: 'cp2',
          nom: 'NomCP2',
          prenom: 'PrenomCP2',
          adresse: 'Adresse CP 2',
          numero_tel: '0234567892',
          job: 'chef de projet',
          manager_id: 'rh1',
          managing_id: ['dev4', 'dev5', 'dev6'],
          password: 'cppassword2'
        },
        {
          user_id: 'cp3',
          nom: 'NomCP3',
          prenom: 'PrenomCP3',
          adresse: 'Adresse CP 3',
          numero_tel: '0234567893',
          job: 'chef de projet',
          manager_id: 'rh2',
          managing_id: ['dev7', 'dev8', 'dev9'],
          password: 'cppassword3'
        },
        {
          user_id: 'rh1',
          nom: 'NomRH1',
          prenom: 'PrenomRH1',
          adresse: 'Adresse RH 1',
          numero_tel: '0345678901',
          job: 'RH',
          manager_id: 'dir1',
          managing_id: ['cp1', 'cp2'],
          password: 'rhpassword1'
        },
        {
          user_id: 'rh2',
          nom: 'NomRH2',
          prenom: 'PrenomRH2',
          adresse: 'Adresse RH 2',
          numero_tel: '0345678902',
          job: 'RH',
          manager_id: 'dir1',
          managing_id: ['cp3'],
          password: 'rhpassword2'
        },

        {
          user_id: 'dir1',
          nom: 'NomDir',
          prenom: 'PrenomDir',
          adresse: 'Adresse du directeur',
          numero_tel: '0456789012',
          job: 'directeur',
          manager_id: null,
          managing_id: ['rh1', 'rh2'],
          password: 'dirpassword'
        }
      ]
    }
  },
  methods: {
    checkAuthentication() {
      const userId = this.$route.params.userId
      const password = this.$route.query.password
      const foundUser = this.users.find((u) => u.user_id === userId && u.password === password)
      this.userAuthenticated = !!foundUser
    }
  },
  mounted() {
    this.checkAuthentication()
  }
}
</script>
