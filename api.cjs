require('dotenv').config()
const express = require('express')
const cors = require('cors')
const playerRouter = require('./routes/player.cjs')
const gameRouter = require('./routes/game.cjs')
const connection = require('./routes/connection.cjs')

const app = express()

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({extended: true}))

connection.connect()

app.get('/video'), async(req, res) => {
    connection.query('SELECT * FROM video', function (error, results, fields) {
        if (error) {
            console.log(error)
            return res.status(500).json({message: 'Erro listando videos'})
        } 
        return res.status(200).json(results)
    })
}

app.use('/player', playerRouter)

app.use('/game', gameRouter)

app.listen(process.env.PORT, () => console.log(`Server iniciado na porta ${process.env.PORT}`))