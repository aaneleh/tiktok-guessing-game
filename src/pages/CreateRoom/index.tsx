import './index.css'
import axios from 'axios'
import { MdOutlineKeyboardArrowLeft } from 'react-icons/md';
import { Link, useNavigate } from 'react-router';
import { useForm, type SubmitHandler } from 'react-hook-form'

type Room = {
    password: string,
    username: string,
    tiktok: string,
}

function CreateRoom() {

    let navigate = useNavigate();

    const API =  import.meta.env.VITE_API

    const create = async(data : Room) => {
        try{    
            const res = await axios.post(`${API}/game`, {
                password: getValues("password"),
                username: getValues("username"),
                tiktok: getValues("tiktok")
            })

            const json = await res.data
            console.log(json)
            if(res.status == 200) {
                navigate(`/room/${json.code}`)
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

    const onSubmit: SubmitHandler<Room> = (data) => create(data)

    return (
        <form className='mobile-size create-room' onSubmit={handleSubmit(onSubmit)}>
            <Link to="/" className='go-back-link'>
                <MdOutlineKeyboardArrowLeft/>Voltar
            </Link>

            <div className="create-room-content">
                <h1 className="title">Criando uma sala</h1>
            
                <div className="form-content">
                    <label htmlFor="username">Seu nome</label>
                    <input type="text" id="username" placeholder='Seu nome'  {...register("username")}/>
                </div>
                <div className="form-content">
                    <label htmlFor="tiktok">Seu tiktok</label>
                    <input type="text" id="tiktok" placeholder='Seu tiktok' {...register("tiktok")}/>
                </div>
                <div className="form-content">
                    <label htmlFor="pass">Senha</label>
                    <input type="password" id="pass" placeholder=''  {...register("password")}/>
                </div>
            </div>

            <div className="buttons">
                <input type="submit" value="Criar" className='button-black cursor-pointer' />
            </div>

        </form>
    )
  
}

export default CreateRoom
