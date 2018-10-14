const { Router } = require('express')
const Playlist = require('./model')
const User = require('../users/model')
const auth = require('../auth/middleware')

const router = new Router()

router.post('/playlists', auth, (req, res, next) => {
  if(!req.body.name) return res.status(422).send({
    message:"can't create a palylist without a name"
  })
  Playlist
    .create(req.body)
    .then(playlist => {
      if(playlist.userId !== req.user.id) {
        playlist.destroy().then(() => {
          return res.status(401).send({
            message: `forbidden`
          })
        })
      }else{
        return res.status(201).send(playlist)
      }  
    })
    .catch(error => next(error))
  })

router.get('/playlists', auth, (req, res, next) => {

  Playlist
    .findAll({ where: { userId: req.user.id } })
    .then(playlists => {
      res.send({ playlists })
    })
    .catch(error => next(error))
})

router.get('/playlists/:id', auth, (req, res, next) => {
  Playlist
    .findById(req.params.id,{ include: [User] })
    .then(playlist => {
      if (!playlist) {
        return res.status(404).send({
          message: `Playlist does not exist`
        })
      }
      return res.send(playlist)
    })
    .catch(error => next(error))
})

router.delete('/playlists/:id', auth, (req, res, next) => {
  Playlist
    .findById(req.params.id)
    .then(playlist => {
      if (!playlist) {
        return res.status(404).send({
          message: `Playlist does not exist`
        })
      }
      return playlist.destroy()
        .then(() => res.send({
          message: `playlist was deleted`
        }))
    })
    .catch(error => next(error))
})

module.exports = router