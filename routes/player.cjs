const express = require('express')
const router = express.Router()
const connection = require('./connection.cjs')

connection.connect()

//RETORNA TODOS OS JOGADORES
router.get('/', async(req, res) => {

    connection.query('SELECT * FROM player', function (error, results, fields) {
        if (error) {
            console.log(error)
            return res.status(500).json({message: 'Erro listando jogadores'})
        } 
        return res.status(200).json(results)
    })

})

//CRIA NOVO JOGADOR E INSERE ELE NA SALA ESCOLHIDA
router.post('/', async(req, res) => {

    let code_game = req.body.code
    let password = req.body.password
    let id_game

    //GET ID_GAME FROM CODE_GAME
    connection.query('SELECT id_game FROM game WHERE code = ? AND password = ?', [code_game, password], function (error, results, fields) {
        if (error) {
            console.log(error)
            return res.status(500).json({message: 'Sala não encontrada'})
        } 
        console.log(results[0])
        id_game = results[0].id_game;
    })

    let username = req.body.username
    let tiktok = req.body.tiktok

    connection.query('INSERT INTO player (id_game, username, tiktok) VALUES (?, ?, ?)', [id_game, username, tiktok], function (error, results, fields) {
        if (error) {
            console.log(error)
            return res.status(500).json({message: 'Erro criando jogador'})
        } 
        return res.status(200).json({'id_game': id_game, 'id_player': results.insertId})
    })

})

//ATUALIZA STATUS DO JOGADOR PARA 2
router.patch('/:id/ready', async(req, res) => {
    
    let id_player = req.params.id

    connection.query('UPDATE player SET status = 2 WHERE id_player = ?', [id_player], function (error, results, fields) {
        if (error) {
            console.log(error)
            return res.status(500).json({message: 'Erro atualizando jogador'})
        }
        return res.status(200)
    })

})

//ATUALIZA ID_GUESS DO JOGADOR E TAMBÉM SEU STATUS PARA 1
router.patch('/:id/guess', async(req, res) => {
   
    let id_player = req.params.id
    let id_guess = req.req.id

    connection.query('UPDATE player SET id_guess = ? WHERE id_player = ?', [id_guess, id_player], function (error, results, fields) {
        if (error) {
            console.log(error)
            return res.status(500).json({message: 'Erro atualizando jogador'})
        }
    })

    connection.query('UPDATE player SET status = 1 WHERE id_player = ?', [id_player], function (error, results, fields) {
        if (error) {
            console.log(error)
            return res.status(500).json({message: 'Erro atualizando jogador'})
        }
    })

    return res.status(200)

})

//DELETA JOGADOR QUANDO ELE SAI DA SALA
router.delete('/:id', async(req, res) => {
    
    let id_player = req.params.id

    connection.query('DELETE FROM player WHERE id_player = ?', [id_player], function (error, results, fields) {
        if (error) {
            console.log(error)
            return res.status(500).json({message: 'Erro excluindo jogador'})
        }
        return res.status(200)
    })

})

module.exports = router