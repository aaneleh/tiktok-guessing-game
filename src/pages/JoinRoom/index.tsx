import './index.css'
import { MdOutlineKeyboardArrowLeft } from 'react-icons/md';
import { Link } from 'react-router';

function JoinRoom() {

      return (
        <section className='mobile-size join-room'>
            <Link to="/" className='go-back-link'>
                <MdOutlineKeyboardArrowLeft/>Voltar
            </Link>

            <div className="join-room-content">
                <h1 className="title">Criando uma sala</h1>
                
                <form className='join-room-form'>
                    <div className="form-content">
                        <label htmlFor="username">Seu nome</label>
                        <input type="text" name="username" id="username" placeholder='Seu nome' />
                    </div>
                    <div className="form-content">
                        <label htmlFor="tiktok">Seu tiktok</label>
                        <input type="text" name="tiktok" id="tiktok" placeholder='Seu tiktok' />
                    </div>
                    <div className="form-content">
                        <label htmlFor="room">Sala</label>
                        <input type="text" name="room" id="room" placeholder='' />
                    </div>
                    <div className="form-content">
                        <label htmlFor="pass">Senha</label>
                        <input type="password" name="pass" id="pass" placeholder='' />
                    </div>
                </form>
            </div>

            <div className="buttons">
                <Link to="/room/1" className='button-black'>
                    Entrar
                </Link>
            </div>

        </section>
    )
  
}

export default JoinRoom
