const express = require('express')
const bodyParser = require('body-parser')
const playlistsRouter = require('./playlists/routes')
const authRouter = require('./auth/routes')
const usersRouter = require('./users/routes')
const songRouter = require('./songs/routes')
const auth = require('./auth/middleware')

const app = express()
const port = process.env.PORT || 4000

app
  .use(bodyParser.json())
  .use(authRouter)
  .use(auth)
  .use(usersRouter)
  .use(playlistsRouter)
  .use(songRouter)
  .listen(port, () => console.log(`Listening on port ${port}`))

