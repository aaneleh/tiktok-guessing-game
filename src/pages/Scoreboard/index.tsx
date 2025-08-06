import './index.css'
import { MdCheckCircleOutline } from 'react-icons/md';
import { GoCopy } from 'react-icons/go';
import { BsThreeDots } from "react-icons/bs";
import { MdOutlineKeyboardArrowLeft } from 'react-icons/md';
import { Link, useNavigate } from 'react-router';
import { useState, useEffect } from 'react'
import axios from 'axios'
import { useParams } from "react-router";

function Scoreboard() {

    let navigate = useNavigate();
    const paramsCode = (useParams()).code;
    
    const [answer, setAnswer] = useState<String>();
    const [players, setPlayers] = useState([]);
    
    const API =  import.meta.env.VITE_API

    useEffect(()=> {

        const getScoreboard = async() => {
            try{
                const res = await axios.get(`${API}/game/${paramsCode}`)
                const json = await res.data
                console.log(json)
                setAnswer(json.answer)
                setPlayers(json.players)

            } catch(err){
                console.log('err', err.response.data.message)
            }
        }

        getScoreboard()

    }, [])


    const exit = async() => {

        let player_id = 1; //TODO adicionar context com player_id que é retornado no create room e join room

        try{
            const res = await axios.delete(`${API}/player/${player_id}/exit`)
            //const json = await res.data
            if(res.status == 200) {
                navigate(`/`)
            }
        } catch(err){
            console.log('err', err.response.data.message)
        }

    }


    return (
        <section className='mobile-size scoreboard'>

            <div className="scoreboard-content">
                <p className='go-back-link' onClick={() => exit()}>
                    <MdOutlineKeyboardArrowLeft/>Sair
                </p>

                <h1 className="title">{paramsCode}<GoCopy/></h1>

                <div className="scoreboard-players">
                    <h2 className="subtitle">Jogadores</h2>

                    {
                        players.length == 0 ?
                            <p>Nenhum jogador</p>
                            :
                            <>
                            {
                                players.map((el, index) => {
                                    return <div className="player" key={index}>
                                        <p className="subtitle">{el.score}</p>
                                        <p className="name">{el.username}</p>
                                        <p className="username">@{el.tiktok}</p>
                                        <span className="status">
                                            {
                                                el.score == 0 ? <BsThreeDots/> 
                                                    :
                                                el.score == 1 ? <MdCheckCircleOutline/> : <span></span>
                                            }
                                        </span>
                                    </div>
                                })}
                            </>
                        
                    }
                </div>
            </div>

            <div className="answer">
                { 
                    answer != null ?
                        <p className='subtitle'> Resposta: {answer} </p>
                        : 
                        <span></span>
                }
            </div>

            <div className="buttons">
                <Link to="/video" className='button-black'>Jogar</Link>
            </div>

        </section>
    )

}

export default Scoreboard
