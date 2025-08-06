import './index.css'
import axios from 'axios'
import { MdOutlineKeyboardArrowLeft } from 'react-icons/md';
import { Link, useNavigate } from 'react-router';
import { useForm, type SubmitHandler } from 'react-hook-form'

type Room = {
    code: string,
    password: string,
    username: string,
    tiktok: string,
}

function JoinRoom() {

    let navigate = useNavigate();

    const API =  import.meta.env.VITE_API

    const join = async(data : Room) => {
        try{    
            const res = await axios.post(`${API}/player`, {
                code: getValues("code"),
                password: getValues("password"),
                username: getValues("username"),
                tiktok: getValues("tiktok")
            })

            const json = await res.data
            console.log(json)
            if(res.status == 200) {
                navigate(`/room/${getValues("code")}`)
            }

        } catch(err){
            console.log('err', err.response.data.message)
        }
    }
    
    const {
        register,
        getValues,
        handleSubmit,
    } = useForm<Room>()

    const onSubmit: SubmitHandler<Room> = (data) => join(data)

    return (
        <form className='mobile-size join-room' onSubmit={handleSubmit(onSubmit)}>
            <Link to="/" className='go-back-link'>
                <MdOutlineKeyboardArrowLeft/>Voltar
            </Link>

            <div className="join-room-form">
                <h1 className="title">Entrando em uma sala</h1>
                <div className="form-content">
                    <label htmlFor="username">Seu nome</label>
                    <input type="text" id="username" placeholder='Seu nome' {...register("username")}/>
                </div>
                <div className="form-content">
                    <label htmlFor="tiktok">Seu tiktok</label>
                    <input type="text" id="tiktok" placeholder='Seu tiktok' {...register("tiktok")}/>
                </div>
                <div className="form-content">
                    <label htmlFor="room">Sala</label>
                    <input type="text" id="room" placeholder='' {...register("code")}/>
                </div>
                <div className="form-content">
                    <label htmlFor="pass">Senha</label>
                    <input type="password" id="pass" placeholder='' {...register("password")}/>
                </div>
            </div>

            <div className="buttons">
                <input type="submit" value="Entrar" className='button-black cursor-pointer'/>
            </div>

        </form>
    )
  
}

export default JoinRoom