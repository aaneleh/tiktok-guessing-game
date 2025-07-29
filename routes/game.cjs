const express = require('express')
const router = express.Router()
const connection = require('./connection.cjs')

connection.connect()

//RETORNA TODAS AS SALAS
router.get('/'), async(req, res) => {

    connection.query('SELECT * FROM game', function (error, results, fields) {
        if (error) {
            console.log(error)
            return res.status(500).json({message: 'Erro listando jogos'})
        } 
        return res.status(200).json(results)
    })

}

//CRIA NOVA SALA E NOVO JOGADOR
router.post('/', async(req, res) => {
    
    let code_game = 'ABCDEF';
    let password = req.body.password
    let id_game

    let username = req.body.username
    let tiktok = req.body.tiktok

    connection.query('INSERT INTO game (code, password) VALUES (?, ?)', [code_game, password], function (error, results, fields) {
        if (error) {
            console.log(error)
            return res.status(500).json({message: 'Erro criando sala'})
        } 
        id_game = results.insertId
    })

    connection.query('INSERT INTO player (id_game, username, tiktok) VALUES (?, ?, ?)', [id_game, username, tiktok], function (error, results, fields) {
        if (error) {
            console.log(error)
            return res.status(500).json({message: 'Erro criando jogador'})
        } 
        return res.status(200).json({'id_game': id_game, 'id_player': results.insertId})
    })

})

//INFORMAÇÕES ATUAIS DA SALA
router.get('/:code', async(req, res) => {
    
    let answer
    let code = req.params.code
/* 
SELECT username FROM player WHERE id_player = (SELECT id_player FROM video WHERE = (SELECT id_video FROM game WHERE code = ? LIMIT 1) LIMIT 1)
    
SELECT player.username FROM game LEFT JOIN video ON game.id_video = video.id_video LEFT JOIN player ON video.id_player = player.id_player WHERE game.code = ?
*/
    connection.query('SELECT username FROM player WHERE id_player =(SELECT id_player FROM video WHERE = (SELECT id_video FROM game WHERE code = ? LIMIT 1) LIMIT 1)', [code], function (error, results, fields) {
        if (error) {
            console.log(error)
            return res.status(500).json({message: 'Sala, vídeo ou resposta não encontrados'})
        } 
        console.log(results)
        answer = results[0].username
    })

    connection.query('SELECT score, username, tiktok, status FROM player WHERE id_game = (SELECT id_game FROM game WHERE code = ? LIMIT 1)', [code], function (error, results, fields) {
        if (error) {
            console.log(error)
            return res.status(500).json({message: 'Jogadores não encontrados'})
        } 
        console.log(results)
        return res.status(200).json({'answer': answer, 'players': results})
    })

})

//URL DO VÍDEO ATUALMENTE SORTEADO DA SALA
router.get('/:code/urlvideo', async(req, res) => {
    
    let code = req.params.code

    connection.query('SELECT video.url FROM video LEFT JOIN game ON video.id_video = game.id_video WHERE game.code = ?', [code], function (error, results, fields) {
        if (error) {
            console.log(error)
            return res.status(500).json({message: 'Video não encontrado'})
        } 
        console.log(results)
        return res.status(200).json(results[0].url)
    })

})


module.exports = router