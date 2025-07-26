import './index.css'
import { MdCheckCircleOutline } from 'react-icons/md';
import { GoCopy } from 'react-icons/go';
import { BsThreeDots } from "react-icons/bs";
import { MdOutlineKeyboardArrowLeft } from 'react-icons/md';
import { Link } from 'react-router';

function Scoreboard() {

      return (
        <section className='mobile-size scoreboard'>

            <div className="scoreboard-content">
                <Link to="/" className='go-back-link'>
                    <MdOutlineKeyboardArrowLeft/>Sair
                </Link>

                <h1 className="title">IM4S8 <GoCopy/></h1>

                <div className="scoreboard-players">
                    <h2 className="subtitle">Jogadores</h2>

                    <div className="player">
                        <p className="subtitle">20</p>
                        <p className="name">orangeknight</p>
                        <p className="username">@oragenknight</p>
                        <span className="status">
                            <MdCheckCircleOutline/>
                        </span>
                    </div>
                    
                    <div className="player">
                        <p className="subtitle">12</p>
                        <p className="name">aaa</p>
                        <p className="username">@oragenknight</p>
                        <span className="status">
                            <MdCheckCircleOutline/>
                        </span>
                    </div>
                </div>
            </div>

            <div className="answer">
                <p className='subtitle'> Resposta: apex_sloth </p>
            </div>

            <div className="buttons">
                <Link to="/video" className='button-black'>Jogar</Link>
            </div>

        </section>
    )
  
}

export default Scoreboard
