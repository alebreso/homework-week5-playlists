const Sequelize = require('sequelize')
const sequelize = require('../db')
const Playlist = require('../Playlists/model')

const Song = sequelize.define('Songs', {
  songTitle: {
    type: Sequelize.STRING,
    field: 'title',
    allowNull: false
  },
  artistName: {
    type: Sequelize.STRING,
    field: 'artis_name',
    allowNull: false
  },
  albumTitle: {
    type: Sequelize.STRING,
    field:'album_title',
    allowNull: true
  },
  playlistId: {
    type: Sequelize.INTEGER,
    field: 'playlist_id'
  },
}, {
  timestamps: false,
  tableName: 'songs'
})

Song.belongsTo(Playlist)

module.exports = Song