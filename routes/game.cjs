const express = require('express')
const router = express.Router()
const connection = require('./connection.cjs')

connection.connect()

function randomCode(){
    let code = String.fromCharCode(
        Math.floor(Math.random() * (90 - 65 + 1) ) + 65,
        Math.floor(Math.random() * (90 - 65 + 1) ) + 65,
        Math.floor(Math.random() * (90 - 65 + 1) ) + 65, 
        Math.floor(Math.random() * (90 - 65 + 1) ) + 65, 
        Math.floor(Math.random() * (90 - 65 + 1) ) + 65)
    return code
}


function randomVideos(){
    return [
        "https://www.tiktok.com/@youngexwives/video/7535540572623342878",
        "https://www.tiktok.com/@alanzoka/video/7535566386798578950",
        "https://www.tiktok.com/@sprinklestarr3000/video/7534133905784360247",
        "https://www.tiktok.com/@cruzhevert/video/7534551665018440967",
        "https://www.tiktok.com/@meilizzz/video/7534829245323939086"
    ]
}

//RETORNA TODAS AS SALAS
router.get('/', async(req, res) => {

    connection.query('SELECT * FROM game', function (error, results, fields) {
        if (error) {
            console.log(error)
            return res.status(500).json({message: 'Erro listando jogos'})
        } 
        return res.status(200).json(results)
    })

})

//CRIA NOVA SALA E NOVO JOGADOR
router.post('/', async(req, res) => {
    
    let code_game
    let isUnique

    do {
        code_game = randomCode();
        isUnique = true;
        connection.query('SELECT id_game FROM game WHERE code = ?', [code_game], function (error, results, fields) {
            if (error) {
                console.log(error)
                return res.status(500)
            } 
            isUnique = results.length == 0
        })
    } while (!isUnique)

    let password = req.body.password
    let id_game

    let username = req.body.username
    let tiktok = req.body.tiktok
    let id_player
    let videos

    connection.query('INSERT INTO game (code, password) VALUES (?, ?)', [code_game, password], function (error, results, fields) {
        if (error) {
            console.log(error)
            return res.status(500).json({message: 'Erro criando sala'})
        } 
        id_game = results.insertId

        connection.query('INSERT INTO player (id_game, username, tiktok) VALUES (?, ?, ?)', [id_game, username, tiktok], function (error, results, fields) {
            if (error) {
                console.log(error)
                return res.status(500).json({message: 'Erro criando jogador'})
            } 
            id_player = results.insertId
            videos = randomVideos()

            for(let i = 0; i < videos.length; i++){
                connection.query('INSERT INTO video (id_player, url, watched) VALUES (?, ?, ?)', [id_player, videos[i], 0], function (error, results, fields) {
                if (error) {
                    console.log(error)
                    return res.status(500).json({message: 'Erro adicionando video'})
                } 
            })  
            }

            return res.status(200).json({'code': code_game, 'id_game': id_game, 'id_player': id_player})
        })
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
        return res.status(200).json(results[0].url)
    })

})

//INFORMAÇÕES ATUAIS DA SALA
router.get('/:code', async(req, res) => {
    
    let answer
    let code = req.params.code

    connection.query('SELECT player.username FROM game LEFT JOIN video ON game.id_video = video.id_video LEFT JOIN player ON video.id_player = player.id_player WHERE game.code = ?', [code], function (error, results, fields) {
        if (error) {
            console.log(error)
            return res.status(500).json({message: 'Erro buscando informações do jogo'})
        } 
        console.log(results)
        if(results.length == 0) return res.status(500).json({message: 'Sala, vídeo ou resposta não encontrados'})
        answer = results[0].username

        connection.query('SELECT score, username, tiktok, status FROM player WHERE id_game = (SELECT id_game FROM game WHERE code = ? LIMIT 1)', [code], function (error, results, fields) {
            if (error) {
                console.log(error)
                return res.status(500).json({message: 'Jogadores não encontrados'})
            } 
            console.log(results)
            return res.status(200).json({'answer': answer, 'players': results})
        })
    })

})

//EXCLUIR JOGO (ADMIN)
router.delete('/:id', async(req,res)=> {
    let id_game = req.params.id

    connection.query('DELETE FROM game WHERE id_game = ?', [id_game], function (error, results, fields) {
        if (error) {
            console.log(error)
            return res.status(500).json({message: 'Erro excluindo jogo'})
        } 
        return res.status(200).json({message: 'Jogo excluido com sucesso'})
    })
})

module.exports = router