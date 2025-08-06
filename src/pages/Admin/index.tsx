import './index.css'
import { FaDeleteLeft } from "react-icons/fa6";
import { useState, useEffect } from 'react'
import axios from 'axios'

function Admin() {

    const [games, setGames] = useState([]);
    const [players, setPlayers] = useState([]);
    const [videos, setVideos] = useState([]);

    const API =  import.meta.env.VITE_API

    const getGames = async() => {
        try{
        const res = await axios.get(`${API}/game`)
        const json = await res.data

        setGames(json)

        } catch(err){
            console.log('err', err.response.data.message)
        }
    }

    const getPlayers = async() => {
        try{
        const res = await axios.get(`${API}/player`)
        const json = await res.data

        setPlayers(json)

        } catch(err){
            console.log('err', err.response.data.message)
        }
    }

    const getVideos = async() => {
        try{
        const res = await axios.get(`${API}/video`)
        const json = await res.data

        setVideos(json)

        } catch(err){
            console.log('err', err.response.data.message)
        }
    }

    useEffect(()=> {
        getGames()
        getPlayers()
        getVideos()
    }, [])

    const deleteGame = async(id)=> {
        try{
            const res = await axios.delete(`${API}/game/${id}`)
            const json = await res.data
            console.log(json)
        } catch(err){
            console.log('err', err.response.data.message)
        }

        getGames()
    }

    const deletePlayer = async(id)=> {
        try{
            const res = await axios.delete(`${API}/player/${id}`)
            const json = await res.data
            console.log(json)
        } catch(err){
            console.log('err', err.response.data.message)
        }

        getPlayers()

    }

    const deleteVideo = async(id)=> {
        try{
            const res = await axios.delete(`${API}/video/${id}`)
            const json = await res.data
            console.log(json)
        } catch(err){
            console.log('err', err.response.data.message)
        }

        getVideos()
    }
        
    return (
        <section className='admin'>
            <h1 className='title'>Administração</h1>

            <h2 className="subtitle">Jogos</h2>

            {
                games.length == 0 ? 
                <p>Nenhum jogo</p>
                    :
                <>
                    <div className="table">
                        <div className="table-header">
                            <p>id_game</p>
                            <p>code</p>
                            <p>id_video</p>
                            <p>created_at</p>
                            <p>excluir</p>
                        </div>
                        { games.map((el, index) => {
                            return <div className="table-row" key={index}>
                                <p>{el.id_game}</p>
                                <p>{el.code}</p>
                                <p>{el.id_video ? el.id_video : "-"}</p>
                                <p>{el.created_at ? el.created_at : "-"}</p>
                                <p onClick={()=> deleteGame(el.id_game)}><FaDeleteLeft/></p>                       
                            </div>
                        })}
                    </div>
                </>
            }

            <h2 className="subtitle">Jogadores</h2>

            {
                players.length == 0 ? 
                <p>Nenhum jogador</p>
                    :
                <>
                    <div className="table">
                        <div className="table-header">
                            <p>id_player</p>
                            <p>id_game</p>
                            <p>username</p>
                            <p>tiktok</p>
                            <p>score</p>
                            <p>id_guess</p>
                            <p>status</p>
                            <p>created_at</p>
                            <p>excluir</p>
                        </div>
                        { players.map(((el, index) => {
                            return <div className="table-row" key={index}>
                                <p>{el.id_player}</p>
                                <p>{el.id_game}</p>
                                <p>{el.username}</p>
                                <p>{el.tiktok}</p>
                                <p>{el.score}</p>
                                <p>{el.id_guess ? el.id_guess : "-"}</p>
                                <p>{el.status}</p>
                                <p>{el.created_at ? el.created_at : "-"}</p>
                                <p onClick={()=> deletePlayer(el.id_player)}><FaDeleteLeft/></p>
                            </div>
                        }))}
                    </div>
                </>
            }


            <h2 className="subtitle">Videos</h2>

            {
                videos.length == 0 ? 
                <p>Nenhum video</p>
                    :
                <>
                    <div className="table">
                        <div className="table-header">
                            <p>id_video</p>
                            <p>id_player</p>
                            <p>url</p>
                            <p>usado</p>
                            <p>created_at</p>
                            <p>excluir</p>
                        </div>
                        { videos.map(((el, index) => {
                            return <div className="table-row" key={index}>
                                <p>{el.id_video}</p>
                                <p>{el.id_player}</p>
                                <p>{el.url}</p>
                                <p>{el.watched}</p>
                                <p>{el.created_at ? el.created_at : "-"}</p>
                                <p onClick={()=> deleteVideo(el.id_video)}><FaDeleteLeft/></p>                          
                            </div>
                        }))}
                    </div>
                </>
            }

        </section>
    )
}

export default Admin