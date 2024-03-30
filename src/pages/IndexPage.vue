<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated>
      <q-toolbar>
        <div id="logout" class="logout">Logout</div>
        <q-toolbar-title id="UserTitle">[Utilisateur]</q-toolbar-title>
        <div>Fonction</div>
      </q-toolbar>
    </q-header>

    <q-page-container>
      <q-page>
        <div class="lists">
          <div id="list1" class="list1">
            <div class="action">
              <div id="addBtn" class="add" @click="toggleAddPopup('on')"></div>
            </div>
            <div class="employees-list-content">
              <div class="top-menu">
                <div class="overlay"></div>
                <p class="title">Employées</p>
              </div>
              <div class="searchbar-div">
                <div class="form__group field">
                  <input
                    id="nameInput"
                    type="input"
                    class="form__field"
                    placeholder="Entrer un nom"
                    name="name"
                    required
                    @input="updateEmploye()"
                  />
                </div>
                <div class="form__group field idField">
                  <input
                    id="idInput"
                    type="input"
                    class="form__field id-field"
                    placeholder="Entrer un id"
                    name="name"
                    required
                    @input="updateEmploye()"
                  />
                </div>
              </div>
              <q-list id="employees" class="employe-list">
                <q-item
                  >NOM
                  <p>Identifiant</p></q-item
                >
              </q-list>
            </div>
          </div>
          <div id="list2" class="list2">
            <div id="actionList" class="action">
              <div id="addBtn" class="add" @click="toggleAddEntretienPopup('on')"></div>
            </div>
            <div class="entretien-list-content">
              <div class="top-menu">
                <div class="overlay"></div>
                <p class="title">Entretiens</p>
              </div>
              <q-list id="entretiens" class="entretien-list">
                <q-item class="q-item-entretien-list-title">
                  <p id="employeCategorie" class="employe">Employe</p>
                  <p class="date">Date</p>
                  <p class="status">Status</p></q-item
                >
              </q-list>
            </div>
          </div>
        </div>
        <div id="addPopup" class="add-popup popup">
          <p class="closeBtn" @click="toggleAddPopup('off')">X</p>
          <p class="title">Ajouter un/une employée</p>
          <q-form class="q-gutter-md AddForm">
            <q-input
              v-model="form.username.value"
              square
              clearable
              type="text"
              label="Prénom"
              class="AddInput"
            />
            <q-input
              v-model="form.password.value"
              square
              clearable
              type="password"
              label="Mot de passe"
              class="AddInput"
            />
            <q-card-actions class="q-px-md">
              <q-btn
                unelevated
                size="lg"
                class="full-width"
                label="Ajouter"
                color="light-blue-7"
                @click="addUser(form)"
              />
              <!-- Login btn -->
            </q-card-actions>
          </q-form>
        </div>
        <div id="addEntretienPopup" class="add-popup popup">
          <p class="closeBtn" @click="toggleAddEntretienPopup('off')">X</p>
          <p class="title">Ajouter un entretien</p>
          <q-form class="q-gutter-md AddForm">
            <q-input
              v-model="form3.username.value"
              square
              clearable
              type="text"
              label="Nom de l'employé"
              class="AddInput"
            />
            <q-input
              v-model="form3.date.value"
              square
              clearable
              type="date"
              label="Date"
              class="AddInput"
            />
            <q-input
              v-model="form3.type.value"
              square
              clearable
              type="text"
              label="Prévus/Fait/En cours"
              class="AddInput"
            />
            <q-card-actions class="q-px-md">
              <q-btn
                unelevated
                size="lg"
                class="full-width"
                label="Ajouter"
                color="light-blue-7"
                @click="addEntretien(form3)"
              />
              <!-- Login btn -->
            </q-card-actions>
          </q-form>
        </div>
        <div id="editPopup" class="edit-popup popup">
          <p class="closeBtn" @click="toggleEditPopup('off')">X</p>
          <p id="editpopup-title" class="title">Modifier un/une employé(e)</p>
          <q-form class="q-gutter-md EditForm">
            <!-- Add input fields for editing user information -->
            <q-input
              v-model="form2.username.value"
              square
              clearable
              type="text"
              label="Prénom"
              class="EditInput"
            />
            <q-input
              v-model="form2.password.value"
              square
              clearable
              type="password"
              label="Mot de passe"
              class="EditInput"
            />
            <!-- Add any other input fields as needed -->
            <q-card-actions class="q-px-md">
              <q-btn
                unelevated
                size="lg"
                class="full-width"
                label="Modifier"
                color="light-blue-7"
                @click="editUser(form2)"
              />
            </q-card-actions>
          </q-form>
        </div>
      </q-page>
    </q-page-container>
  </q-layout>
</template>

<script>
import { Cookies, useQuasar } from 'quasar'
import { defineComponent, onMounted, ref } from 'vue'

export default defineComponent({
  name: 'IndexPage',

  setup() {
    const notifier = useQuasar()
    const form = ref({
      username: {
        value: '',
        required: true
      },
      password: {
        value: '',
        required: true
      }
    })

    const form2 = ref({
      username: {
        value: '',
        required: true
      },
      password: {
        value: '',
        required: true
      }
    })

    const form3 = ref({
      username: {
        value: '',
        required: true
      },
      date: {
        value: '',
        required: true
      },
      type: {
        value: '',
        required: true
      }
    })

    const onPageLoaded = () => {
      if (Cookies.get('L3SDNUser') && Cookies.get('L3SDNtype')) {
        let username = Cookies.get('L3SDNUser')
        let type = Cookies.get('L3SDNtype')
        document.getElementById('UserTitle').innerHTML = capitalizeFirstLetter(username)
        let expiration = Cookies.get('L3SDNexpiration')
        if (Math.max(expiration, Date.now()) - Math.min(expiration, Date.now()) >= 1000 * 60 * 60) {
          document.location.href = '/logout'
        }

        if (type == 'a1VD1V3B7LhQ') {
          document.getElementById('list1').classList.add('visible')
          loadPageData()
        } else if (type == 'QOHarkKCWiNF') {
          document.getElementById('list1').classList.add('visible')
          loadPageData()
        } else if (type == '1R12gjkt4gMo') {
          document.getElementById('list2').classList.add('centered')
          document.getElementById('employeCategorie').innerText = 'Manager'
          document.getElementById('actionList').classList.add('vanish')
          loadPageData()
        }
      } else {
        document.location.href = '/login'
      }
    }

    const toggleAddPopup = async (status) => {
      if (status == 'on') {
        document.getElementById('addPopup').classList.add('popup-active')
      } else if (status == 'off') {
        document.getElementById('addPopup').classList.remove('popup-active')
      } else {
        document.getElementById('addPopup').classList.toggle('popup-active')
      }
    }

    const toggleAddEntretienPopup = async (status) => {
      if (status == 'on') {
        document.getElementById('addEntretienPopup').classList.add('popup-active')
      } else if (status == 'off') {
        document.getElementById('addEntretienPopup').classList.remove('popup-active')
      } else {
        document.getElementById('addEntretienPopup').classList.toggle('popup-active')
      }
    }

    const addEntretien = async (form3) => {
      const username = form3.username.value
      const date = form3.date.value
      const type = form3.type.value
      const managerUsername = Cookies.get('L3SDNUser')

      let response = await fetch(
        'http://localhost:3000/api/addEntretien?username=' +
          username +
          '&date=' +
          date +
          '&type=' +
          type +
          '&managerUsername=' +
          managerUsername
      )

      const responseData = await response.text()
      if (responseData !== 'Success.') {
        return notifier.notify({
          type: 'negative',
          message: 'Une erreur est survenue, pour plus de détail veuillez consulter la console.'
        })
      }
      toggleAddEntretienPopup('off')
      notifier.notify({
        type: 'positive',
        message: "L'entretien a bien été ajouter."
      })
      updateEmploye()
    }

    const capitalizeFirstLetter = (string) => {
      return string.charAt(0).toUpperCase() + string.slice(1)
    }

    const loadPageData = async () => {
      let ids = []
      let users = await fetch('src/data/users.json')
      users = await users.json()
      let username = Cookies.get('L3SDNUser')

      if (document.getElementById('employees').childNodes.length > 1) {
        return
      }

      let response

      // Load entretiens
      document.getElementById('logout').addEventListener('click', () => {
        document.location.href = '/logout'
      })
      if (Cookies.get('L3SDNtype') == 'QOHarkKCWiNF') {
        response = await fetch('http://localhost:3000/api/getEntretiens?bypassUsername=true')
      } else if (Cookies.get('L3SDNtype') == '1R12gjkt4gMo') {
        response = await fetch(
          'http://localhost:3000/api/getEntretiens?manager=' + username + '&employe=true'
        )
      } else if (Cookies.get('L3SDNtype') == 'a1VD1V3B7LhQ') {
        response = await fetch(
          'http://localhost:3000/api/getEntretiens?manager=' + username + '&employe=false'
        )
      }
      response = await response.text()
      let entretienList = document.getElementById('entretiens')

      if (!response.startsWith('An error is occured')) {
        if (
          JSON.parse(response).length !== 0 &&
          document.getElementsByClassName('q-item-entretien').length == 0
        ) {
          let var0 = JSON.parse(response)[0][0]
          let var1 = JSON.parse(response)[0][1]
          let var2 = JSON.parse(response)[0][2]
          let var3 = JSON.parse(response)[0][3]

          let item = document.createElement('div')
          let username2 = document.createElement('p')
          username2.classList.add('employe')
          let date = document.createElement('p')
          date.classList.add('date')
          let status = document.createElement('p')
          let selector = document.createElement('div')
          status.classList.add('status')
          item.classList.add('q-item')
          item.classList.add('q-item-entretien')
          item.classList.add('q-item-type')
          item.classList.add('row')
          item.classList.add('no-wrap')
          item.classList.add('q-item-list-item')
          item.classList.add('q-item-entretien-list')
          selector.classList.add('selector')
          if (Cookies.get('L3SDNtype') != '1R12gjkt4gMo') {
            let deleteBtn = document.createElement('p')
            deleteBtn.innerHTML = 'X'
            deleteBtn.classList.add('delete-btn-entretien')
            deleteBtn.addEventListener('click', async () => {
              const result = await fetch('http://localhost:3000/api/removeEntretien?id=' + var3)
              const value = await result.text()
              if (value == 'Success.') {
                notifier.notify({
                  type: 'positive',
                  message:
                    "L'entretien du " +
                    var1 +
                    ' a bien été retirer, il ne sera plus accessible pour personne.'
                })
                loadPageData()
              }
            })
            item.appendChild(deleteBtn)
          }

          selector.addEventListener('click', async () => {
            document.location.href = '/entretien?session=' + var3
          })
          username2.innerHTML = var0
          date.innerHTML = var1
          status.innerHTML = var2
          item.appendChild(username2)
          item.appendChild(date)
          item.appendChild(status)
          item.appendChild(selector)
          entretienList.appendChild(item)
        }
      }

      // load Employe
      if (Cookies.get('L3SDNtype') != '1R12gjkt4gMo') {
        Object.keys(users).forEach((index) => {
          let user = users[index]
          if (Cookies.get('L3SDNtype') == 'QOHarkKCWiNF') {
            ids.push(user.manage[index])
          } else if (user.username == username) {
            Object.keys(user.manage).forEach((index) => {
              ids.push(user.manage[index])
            })
          }
        })

        let ids2 = await fetch('src/data/ids.json')
        ids2 = await ids2.json()
        Object.keys(ids).forEach((index) => {
          let id = ids[index]

          if (ids2.hasOwnProperty(id)) {
            let item = document.createElement('q-item')
            let val = document.createElement('p')
            val.textContent = id
            item.textContent = capitalizeFirstLetter(ids2[id])
            item.classList.add('q-item')
            item.classList.add('q-item-employe')
            item.classList.add('q-item-type')
            item.classList.add('row')
            item.classList.add('no-wrap')
            item.classList.add('q-item-list-item')
            item.appendChild(val)

            // Créer un bouton de suppression
            let deleteBtn = document.createElement('div')
            deleteBtn.innerHTML = 'X'
            deleteBtn.classList.add('employe-list-delete-btn')
            deleteBtn.setAttribute('identifier', id)

            // Créer un bouton de suppression
            let editBtn = document.createElement('div')
            editBtn.innerHTML = '🖉'
            editBtn.classList.add('employe-list-edit-btn')
            editBtn.addEventListener('click', async () => {
              document.getElementById('editPopup').style.visibility = 'visible'
              document.getElementById('editpopup-title').innerHTML = "Modifier l'utilisateur " + id
            })

            item.appendChild(deleteBtn)
            item.appendChild(editBtn)
            document.getElementById('employees').appendChild(item)
            deleteBtn.addEventListener('click', async () => {
              await removeUser(deleteBtn)
            })
          }
        })
      }
    }

    async function editUser(form2) {
      let id = document
        .getElementById('editpopup-title')
        .innerHTML.replace("Modifier l'utilisateur ", '')
      let argument = '?'
      if (form2.username.value && form2.password.value) {
        argument += 'newUsername=' + form2.username.value + '&newPassword=' + form2.password.value
      } else if (form2.username.value && !form2.password.value) {
        argument += 'newUsername=' + form2.username.value
      } else if (!form2.username.value && form2.password.value) {
        argument += 'newPassword=' + form2.password.value
      }
      argument += '&id=' + id
      const result = await fetch('http://localhost:3000/api/editUser' + argument)
      const data = await result.text()
      if (data == 'Success.') {
        updateEmploye()
        toggleEditPopup('off')
        form2.username.value = ''
        form2.password.value = ''
        notifier.notify({
          type: 'positive',
          message:
            "L'utilisateur " +
            id +
            ' a bien été modifier, il lui faudra les nouveaux identifiant pour se connecter.'
        })
      } else {
        notifier.notify({
          type: 'negative',
          message: "L'utilisateur " + id + " n'a pas pus être modifier."
        })
      }
    }

    async function updateEmploye() {
      Array.from(document.getElementsByClassName('q-item-employe')).forEach((element) => {
        if (!element.innerHTML.startsWith('NOM')) {
          element.remove()
        }
      })
      await loadPageData()
      Array.from(document.getElementsByClassName('q-item-employe')).forEach((element) => {
        let bool =
          !element.innerHTML.startsWith(document.getElementById('nameInput').value) ||
          !element.querySelector('p').innerHTML.endsWith(document.getElementById('idInput').value)
        if (!element.innerHTML.startsWith('NOM') && bool) {
          element.remove()
        }
      })
    }

    const removeUser = async (element) => {
      let identifier = element.getAttribute('identifier')
      let result = await fetch('http://localhost:3000/api/deleteUserFromId?id=' + identifier)
      result = await result.text()
      if (result == 'Success.') {
        await updateEmploye()
        notifier.notify({
          type: 'positive',
          message:
            "L'utilisateur " + identifier + ' a bien été retirer, il ne pourras plus se connecter.'
        })
      } else {
        await updateEmploye()
        notifier.notify({
          type: 'negative',
          message:
            "L'utilisateur " +
            identifier +
            " n'a pas pu être retirer, veuillez réessayer plus tard."
        })
      }
    }

    const addUser = async (form) => {
      const username = form.username.value
      const password = form.password.value

      let response = await fetch(
        'http://localhost:3000/api/addUser?username=' + username + '&password=' + password
      )

      const responseData = await response.text()
      if (responseData !== 'Success.') {
        return notifier.notify({
          type: 'negative',
          message: 'Une erreur est survenue, pour plus de détail veuillez consulter la console.'
        })
      }

      const idResponse = await fetch(
        'http://localhost:3000/api/addManageToManager?managerUsername=' +
          Cookies.get('L3SDNUser') +
          '&manageUsername=' +
          username
      )

      let data2 = await idResponse.text()

      if (data2.startsWith('An error is occured')) {
        return notifier.notify({
          type: 'negative',
          message: 'Une erreur est survenue, pour plus de détail veuillez consulter la console.'
        })
      }

      const result = await fetch('http://localhost:3000/api/getIdByUser?username=' + username)
      const data = await result.text()

      if (data.startsWith('An error is occured')) {
        return notifier.notify({
          type: 'negative',
          message: 'Une erreur est survenue, pour plus de détail veuillez consulter la console.'
        })
      }
      document.location.href = '/'
    }

    const toggleEditPopup = (status) => {
      if (status == 'on') {
        document.getElementById('editPopup').style.visibility = 'visible'
      } else if (status == 'off') {
        document.getElementById('editPopup').style.visibility = 'hidden'
      } else {
        if (document.getElementById('editPopup').style.visibility == 'visible') {
          document.getElementById('editPopup').style.visibility = 'hidden'
        } else {
          document.getElementById('editPopup').style.visibility = 'visible'
        }
      }
    }

    onMounted(() => {
      onPageLoaded()
    })

    return {
      editUser,
      loadPageData,
      capitalizeFirstLetter,
      onPageLoaded,
      addUser,
      form3,
      form2,
      form,
      addEntretien,
      updateEmploye,
      toggleAddEntretienPopup,
      toggleAddPopup,
      toggleEditPopup,
      toggleLeftDrawer() {
        leftDrawerOpen.value = !leftDrawerOpen.value
      },
      notifier
    }
  }
})
</script>
<style>
.selector {
  position: absolute;
  width: 94%;
  height: 100%;
  z-index: 2;
}

.logout {
  color: red;
}

.logout:hover {
  color: rgb(150, 0, 0);
  cursor: pointer;
}

.popup {
  position: fixed;
  transform: translate(-50%, -50%);
  left: 50%;
  top: 50%;
  background-color: white;
  width: 30vh;
  height: 35vh;
  z-index: 1;
  border-radius: 20px;
  visibility: hidden;
}

.lists {
  position: absolute;
  width: 100%;
  height: 100%;
  display: flex;
}

.delete-btn-entretien {
  color: red;
  position: absolute;
  left: 99%;
}

.delete-btn-entretien:hover {
  color: rgb(200, 0, 0);
  cursor: pointer;
}

.q-item-entretien-list {
  width: 90%;
}

.q-item-entretien-list:hover {
  cursor: pointer;
  color: rgb(127, 35, 139);
}

.q-item-entretien-list-title {
  width: 90%;
}

.list1 {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  visibility: hidden;
}

.list1.visible {
  visibility: visible;
}

.list2 {
  position: absolute;
  right: 5%;
  top: 50%;
  transform: translate(-50%, -50%);
}

.list2.centered {
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  width: 30%;
  min-width: 500px;
}

.title {
  position: absolute;
  top: 4%;
  left: 5%;
  font-size: 16px;
}

.AddInput {
  position: relative;
  width: 23vh;
  left: 45%;
  transform: translate(-50%, -50%);
}

.AddForm {
  position: relative;
  top: 50%;
  transform: translateY(-50%);
}

.EditInput {
  position: relative;
  width: 23vh;
  left: 45%;
  transform: translate(-50%, -50%);
}

.EditForm {
  position: relative;
  top: 50%;
  transform: translateY(-50%);
}

.closeBtn {
  position: relative;
  left: 90%;
  top: 3%;
  font-size: 20px;
}

.closeBtn:hover {
  color: red;
  cursor: pointer;
}

.popup-active {
  visibility: visible;
}

.employe {
  position: absolute;
  left: 5%;
}

.date {
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
}

.status {
  position: absolute;
  right: 5%;
  width: fit-content;
}

.list-item {
  position: relative;
  width: 100%;
  font-size: 20px;
  width: 80%;
  left: 50%;
  transform: translateX(-50%);
  padding-bottom: 3vh;
}

.list-item:hover {
  background-color: rgba(0, 0, 0, 0.3);
  cursor: pointer;
  border-radius: 5px;
}

.list-title {
  color: white;
  text-decoration: underline;
  font-size: 20px;
}

body {
  background: #10001b;
  overflow-y: hidden;
}

.action {
  position: relative;
  width: 30%;
  height: 3vh;
  border-top-left-radius: 10px;
  border-top-right-radius: 10px;
  background-color: white;
}

.action.vanish {
  visibility: hidden;
}

.add {
  position: relative;
  transform: translateY(-50%);
  background-image: url('src/assets/add.png');
  background-size: cover;
  border-radius: 10px;
  height: 3vh;
  width: 3vh;
  top: 50%;
  transform: translateY(-50%);
}

.add:hover {
  background-color: rgb(201, 201, 201);
  cursor: pointer;
}

.employees-list-content,
.entretien-list-content {
  position: relative;
  width: 100%;
}

.employees-list-content .top-menu,
.entretien-list-content .top-menu {
  position: relative;
  border: 1px solid white;
  color: white;
  background-color: rgb(58, 58, 172);
  height: 10vh;
}

.employees-list-content .top-menu .overlay,
.entretien-list-content .top-menu .overlay {
  position: absolute;
  z-index: 1;
  background: repeating-radial-gradient(
    circle at 15%,
    transparent 0%,
    transparent 10%,
    rgba(54, 89, 219, 0.33) 10%,
    rgba(54, 89, 219, 0.33) 17%
  );
  height: 100%;
  width: 100%;
}

.employees-list-content .top-menu .title,
.entretien-list-content .top-menu .title {
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  font-size: 20px;
  z-index: 2;
}

.employees-list-content .employe-list,
.entretien-list-content .entretien-list {
  position: relative;
  border: 1px solid white;
  background-color: white;
  max-height: 60vh;
  overflow-y: auto;
}

.employees-list-content .employe-list .q-item {
  width: 100%;
  display: flex;
  gap: 33%;
}

.employees-list-content .employe-list .q-item-list-item {
  left: 50%;
  transform: translateX(-50%);
}

.entretien-list-content .employe-list .q-item-list-item {
  left: 20%;
}

.employe-list-edit-btn {
  position: absolute;
  right: 10%;
  color: blue;
}

.employe-list-edit-btn:hover {
  cursor: pointer;
}

.employees-list-content .employe-list p {
  position: absolute;
  left: 55%;
}

.employe-list-delete-btn {
  position: absolute;
  right: 10px;
  color: red;
}
.employe-list-delete-btn:hover {
  cursor: pointer;
}

@media screen and (min-width: 1001px) {
  .list1 {
    position: absolute;
    width: 30%;
    left: 5%;
  }

  .list2 {
    position: absolute;
    right: 5%;
    transform: translate(0, -50%);
    width: 30%;
  }
}

@media screen and (max-width: 1000px) {
  .lists {
    display: flex;
    flex-direction: column;
  }

  .list1,
  .list2 {
    position: relative;
    width: 40%;
    left: 50%;
    right: 0;
    transform: translate(-50%, -50%);
  }
}
</style>

<style>
.searchbar-div {
  position: relative;
  width: 100%;
  background-color: white;
  display: flex;
}
.form__group {
  position: relative;
  padding: 10px 0 0;
  width: 50%;
}
.form__field {
  font-family: inherit;
  width: 100%;
  border: 0;
  border-bottom: 2px solid #9b9b9b;
  outline: 0;
  font-size: 1.3rem;
  color: #000;
  padding: 7px 0;
  background: transparent;
  transition: border-color 0.2s;
  text-indent: 5px;
}
.form__field:placeholder-shown ~ .form__label {
  font-size: 1.3rem;
  cursor: text;
  top: 20px;
}
.form__label {
  position: absolute;
  top: 0;
  display: block;
  transition: 0.2s;
  font-size: 1rem;
  color: #9b9b9b;
}
.form__field:focus {
  padding-bottom: 6px;
  font-weight: 700;
  border-width: 3px;
  border-image: linear-gradient(to right, #11998e, #38ef7d);
  border-image-slice: 1;
}
.idField {
  border-left: 1px solid #9b9b9b;
}
.form__field:focus ~ .form__label {
  position: absolute;
  top: 0;
  display: block;
  transition: 0.2s;
  font-size: 1rem;
  color: #11998e;
  font-weight: 700;
}
/* reset input */
.form__field:required,
.form__field:invalid {
  box-shadow: none;
}
/* demo */
body {
  font-family: 'Poppins', sans-serif;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  font-size: 1.5rem;
}
</style>
