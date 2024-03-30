const express = require('express')
const fs = require('fs')
const app = express()
const port = 3000

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*') // Allow requests from any origin
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE') // Allow specified HTTP methods
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization') // Allow specified headers
  next()
})

app.get('/api/addUser', (req, res) => {
  const { username, password, type } = req.query

  if (!username || !password) {
    return res.send('An error is occured.')
  }

  try {
    // Read users data from users.json
    let usersData = JSON.parse(fs.readFileSync('src/data/users.json', 'utf8'))

    // Add new user to usersData
    if (!type) {
      usersData.push({
        username: username,
        password: password,
        type: '1R12gjkt4gMo'
      })
    } else {
      usersData.push({
        username: username,
        password: password,
        type: type
      })
    }

    fs.writeFileSync('src/data/users.json', JSON.stringify(usersData, null, 4))

    let idsData = JSON.parse(fs.readFileSync('src/data/ids.json', 'utf-8'))

    idsData.max += 1
    idsData[idsData.max] = username

    fs.writeFileSync('src/data/ids.json', JSON.stringify(idsData, null, 4))

    return res.send('Success.')
  } catch (error) {
    return res.send('An error is occured.')
  }
})

app.get('/api/getEntretiens', (req, res) => {
  const { manager, bypassUsername, employe } = req.query

  if (!manager && !bypassUsername == 'true') {
    res.send('An error is occured, please specifi all the argument.')
  }

  try {
    let entretiensData = JSON.parse(fs.readFileSync('src/data/entretiens.json', 'utf8'))

    let entretienForManager = []

    Object.keys(entretiensData).forEach((index) => {
      let entretien = entretiensData[index]
      if ((entretien.manager == manager || bypassUsername == 'true') && index != 0) {
        entretienForManager.push([
          entretien.username,
          entretien.date,
          entretien.status,
          entretien.id
        ])
      } else if (employe && index != 0) {
        if (employe && manager) {
          if (entretien.username.toLowerCase() == manager.toLowerCase()) {
            entretienForManager.push([
              entretien.manager,
              entretien.date,
              entretien.status,
              entretien.id
            ])
          }
        }
      }
    })

    res.send(entretienForManager)
  } catch (error) {
    res.send('An error is occured')
  }
})

app.get('/api/removeEntretien', (req, res) => {
  const { id } = req.query

  if (!id) {
    return res.send('An error is occured, please specify all the argument.')
  }

  let entretiensData = JSON.parse(fs.readFileSync('src/data/entretiens.json', 'utf8'))

  Object.keys(entretiensData).forEach((index) => {
    let entretien = entretiensData[index]
    if (index !== 0) {
      if (entretien.id == id) {
        entretiensData.splice(index, 1)
      }
    }
  })

  fs.writeFileSync('src/data/entretiens.json', JSON.stringify(entretiensData, null, 4))

  res.send('Success.')
})

app.get('/api/addEntretien', (req, res) => {
  const { username, date, type, managerUsername } = req.query

  if (!username || !date) {
    return res.send('An error is occured, please specify all the argument.')
  }

  try {
    // Read users data from users.json
    let entretiensData = JSON.parse(fs.readFileSync('src/data/entretiens.json', 'utf8'))
    entretiensData[0] += 1

    // Add new user to usersData
    if (!type) {
      entretiensData.push({
        username: username,
        date: date,
        status: 'Prévus',
        manager: managerUsername,
        id: getCurrentEntretienId()
      })
    } else {
      entretiensData.push({
        username: username,
        date: date,
        status: type,
        manager: managerUsername,
        id: getCurrentEntretienId()
      })
    }
    fs.writeFileSync('src/data/entretiens.json', JSON.stringify(entretiensData, null, 4))
    return res.send('Success.')
  } catch (error) {
    return res.send('An error is occured, ' + error + '.')
  }
})

app.get('/api/editUser', async (req, res) => {
  const { newUsername, newPassword, id } = req.query

  if (newUsername && !newPassword && id) {
    let usersData = await JSON.parse(fs.readFileSync('src/data/users.json', 'utf8'))
    let idsData = await JSON.parse(fs.readFileSync('src/data/ids.json', 'utf8'))
    Object.keys(usersData).forEach((index) => {
      let user = usersData[index]
      let prevUsername = getUsernameById(id)
      if (user.username == prevUsername) {
        usersData[index].username = newUsername
      }
    })
    idsData[id] = newUsername
    fs.writeFileSync('src/data/users.json', JSON.stringify(usersData, null, 4))
    fs.writeFileSync('src/data/ids.json', JSON.stringify(idsData, null, 4))
    res.send('Success.')
  } else if (newPassword && !newUsername && id) {
    let usersData = await JSON.parse(fs.readFileSync('src/data/users.json', 'utf8'))
    Object.keys(usersData).forEach((index) => {
      let user = usersData[index]
      let prevUsername = getUsernameById(id)
      if (user.username == prevUsername) {
        usersData[index].password = newPassword
      }
    })
    fs.writeFileSync('src/data/users.json', JSON.stringify(usersData, null, 4))
    res.send('Success.')
  } else if (newPassword && newUsername && id) {
    let usersData = await JSON.parse(fs.readFileSync('src/data/users.json', 'utf8'))
    let idsData = await JSON.parse(fs.readFileSync('src/data/ids.json', 'utf8'))
    Object.keys(usersData).forEach((index) => {
      let user = usersData[index]
      let prevUsername = getUsernameById(id)
      if (user.username == prevUsername) {
        usersData[index].username = newUsername
        usersData[index].password = newPassword
      } else {
        res.send('An error occurred, missing argument.')
      }
    })
    idsData[id] = newUsername
    fs.writeFileSync('src/data/users.json', JSON.stringify(usersData, null, 4))
    fs.writeFileSync('src/data/ids.json', JSON.stringify(idsData, null, 4))
    res.send('Success.')
  } else {
    res.send('An error occurred, missing argument.')
  }
})

app.get('/api/addManageToManager', (req, res) => {
  const { managerUsername, manageUsername } = req.query

  if (!managerUsername || !manageUsername) {
    return res.send('An error occurred, missing argument.')
  }

  try {
    // Import json file as var
    let usersData = JSON.parse(fs.readFileSync('src/data/users.json', 'utf8'))

    let i = 0
    let id = getIdByUsername(manageUsername) // Get the ID before iterating
    if (!id) {
      return res.send('An error occurred, manageUsername not found.')
    }

    Object.keys(usersData).forEach((index) => {
      let user = usersData[index]
      if (user.username == managerUsername) {
        usersData[index].manage.push(id)
        fs.writeFileSync('src/data/users.json', JSON.stringify(usersData, null, 4))
        return res.send('Success.')
      }
      i += 1
    })
  } catch (error) {
    return res.send('An error occurred, ' + error + '.')
  }
})

app.get('/api/getIdByUser', (req, res) => {
  const { username } = req.query

  let id = getIdByUsername(username)
  if (id !== null) {
    res.send('' + id)
  } else {
    res.send('An error is occured, please try again later.')
  }
})

app.get('/api/deleteUserFromId', (req, res) => {
  const { id } = req.query

  if (!id) {
    return res.send('Une erreur est survenue, vérifiez les arguments.')
  }

  try {
    let idsData = JSON.parse(fs.readFileSync('src/data/ids.json', 'utf-8'))

    if (idsData.hasOwnProperty(id)) {
      let username = idsData[id]

      let usersData = JSON.parse(fs.readFileSync('src/data/users.json', 'utf-8'))
      Object.keys(usersData).forEach((index) => {
        let user = usersData[index]
        if (user.type == 'a1VD1V3B7LhQ') {
          let id2 = parseInt(id)
          let index2 = user.manage.indexOf(id2)
          if (index2 !== -1) {
            user.manage.splice(index2, 1)
          }
        }
      })
      usersData = usersData.filter((user) => user.username !== username)

      delete idsData[id]
      fs.writeFileSync('src/data/users.json', JSON.stringify(usersData, null, 4))
      fs.writeFileSync('src/data/ids.json', JSON.stringify(idsData, null, 4))
      return res.send('Success.')
    } else {
      return res.send("L'utilisateur avec cet ID n'existe pas.")
    }
  } catch (error) {
    return res.send('Une erreur est survenue : ' + error.message)
  }
})

function getIdByUsername(username) {
  let idsData = JSON.parse(fs.readFileSync('src/data/ids.json', 'utf-8'))
  for (let index in idsData) {
    let username2 = idsData[index]
    if (username == username2) {
      return parseInt(index)
    }
  }
  return null
}

function getEntretiensById(id) {
  let entretiens = JSON.parse(fs.readFileSync('src/data/entretiens.json', 'utf-8'))

  Object.keys(entretiens).forEach((index) => {
    let entretien = entretiens[index]
    if (entretien.id == id) {
      return entretien
    }
  })
  return null
}

function getCurrentEntretienId() {
  let entretiens = JSON.parse(fs.readFileSync('src/data/entretiens.json', 'utf-8'))
  entretiens[0] += 1
  fs.writeFileSync('src/data/entretiens.json', JSON.stringify(entretiens, null, 4))
  return parseInt(entretiens[0])
}

function getUsernameById(id) {
  let idsData = JSON.parse(fs.readFileSync('src/data/ids.json', 'utf-8'))

  if (idsData.hasOwnProperty(id)) {
    return idsData[id]
  } else {
    return null
  }
}

// Configure allowed origins for Socket.IO
const ioOptions = {
  cors: {
    origin: '*',
    methods: ['GET', 'POST']
  }
}

const http = require('http')
const socketIo = require('socket.io')
const cors = require('cors')

const expressApp = require('express')()
expressApp.use(cors())

const server = http.createServer(expressApp)
const io = socketIo(server, ioOptions)

const PORT = 3001
const messages = [] // Utilisation d'un objet pour stocker les messages par identifiant de session

io.on('connection', (socket) => {
  Object.keys(messages).forEach((index) => {
    let msg = messages[index]
    socket.emit('message', msg) // Renvoyer les messages à ce client uniquement
  })
  socket.on('message', (message) => {
    messages.push(message)

    // Diffusion du message à tous les clients
    io.emit('message', message)
  })
})

server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
