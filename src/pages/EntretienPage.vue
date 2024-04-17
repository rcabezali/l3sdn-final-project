<template>
  <div>
    <q-btn label="switch mode" color="black" @click="toggleDarkMode" />
  </div>
  <h1 id="title" class="title">Entretien</h1>
  
  <div class="chat-container">
    <div class="messageContainer">
      <div v-for="(message, index) in messages" :key="index" class="message">
        <div v-html="message"></div>
      </div>
    </div>
    <input
      v-model="newMessage"
      type="text"
      placeholder="Entrer un message..."
      class="message-input"
      @keyup.enter="sendMessage()"
    />
  </div>
</template>

<script>
import { ref, onMounted, watch} from 'vue'
import io from 'socket.io-client'
import { Cookies } from 'quasar'
import { Dark } from 'quasar'

if (!Cookies.get('L3SDNUser') || !Cookies.get('L3SDNtype')) {
  document.location.href = '/logout'
}

function createFormattedMessage(text, received, name) {
  const div = document.createElement('div')
  if (received) {
    div.classList.add('q-message', 'q-message-received')
  } else {
    div.classList.add('q-message', 'q-message-sent')
  }
  div.innerHTML = `
    <div class="q-message-container-${
      received ? 'received' : 'sent'
    } row items-end no-wrap reverse q-message-container">
      <div>
        <div class="q-message-name q-message-name--received">${name}</div>
        <div class="q-message-text ${
          received ? 'q-message-text--received' : 'q-message-text--sent'
        }">
          <div class="q-message-text-content ${
            received ? 'q-message-text-content--received' : 'q-message-text-content--sent'
          }">
            <div>${text}</div>
          </div>
        </div>
      </div>
    </div>`
  return div
}

export default {
  setup() {
    const socket = io('http://localhost:3001')

    const messages = ref([])
    const newMessage = ref('')
    let sessionId = new URL(document.URL).searchParams.get('session')
    
    socket.on('message', (message) => {
      const [sessionId, username, text] = message.split('/')
      if (message.startsWith(sessionId + '/')) {
        const received = username !== Cookies.get('L3SDNUser')
        const formattedMessage = createFormattedMessage(text, received, username)
        messages.value.push(formattedMessage.outerHTML) // Ajoutez le message à votre tableau de messages
      }
    })

    const sendMessage = () => {
      if (newMessage.value.trim() !== '') {
        socket.emit('message', sessionId + '/' + Cookies.get('L3SDNUser') + '/' + newMessage.value)
        newMessage.value = ''
      }
    }

    onMounted(() => {
      document.getElementById('title').innerText = "Salle d'entretien n°" + sessionId
    })

    return {
      messages,
      newMessage,
      sendMessage
    }
  },
  methods: {
    toggleDarkMode() {
      Dark.toggle()
    }
  }
}
</script>

<style>
body {
  overflow-y: hidden;
}

.q-message-container-received {
  position: relative;
  width: fit-content;
}

.q-message-name--received {
  position: relative;
  left: 15%;
}

.q-message-text--received {
  left: 15%;
}

.q-message-name--sent {
  position: relative;
  right: 15%;
}

.q-message-text--sent {
  right: 15%;
}

.title {
  position: relative;
  margin-left: 50%;
  transform: translateX(-50%);
  width: fit-content;
}

.container {
  position: relative;
  margin: 0 auto;
  padding: 20px;
  width: 100%;
  position: relative; /* Add relative positioning to the container */
}

.q-message-name {
  color: white;
}

.chat-container {
  position: relative;
  border: 1px solid #ccc;
  min-width: 700px;
  width: 40%;
  padding: 20px;
  left: 50%;
  transform: translateX(-50%);
  border-radius: 8px;
  height: fit-content;
  background-color: rgb(37, 18, 37);
}

.message {
  margin-bottom: 10px;
}

.messageContainer {
  overflow-y: scroll;
  overflow-x: hidden;
  height: 50vh;
  margin-bottom: 2vh;
}

.messageContainer::-webkit-scrollbar-thumb {
  background-color: rgb(50, 0, 63);
  border-radius: 10px;
  max-width: 2px;
}

.messageContainer::-webkit-scrollbar {
  background: transparent;
}

.message p {
  margin: 0;
}

.message-input {
  position: relative;
  width: calc(90%);
  border: 1px solid #ccc;
  background-color: transparent;
  padding: 10px;
  border-radius: 4px;
  left: 50%;
  transform: translateX(-50%);
  color: white;
}
</style>
