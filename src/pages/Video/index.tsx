import './index.css'
import { MdOutlineKeyboardArrowLeft, MdKeyboardArrowDown } from 'react-icons/md';
import { Link } from 'react-router';
import { TikTokEmbed } from 'react-social-media-embed';


function Video() {

      return (
        <section className='mobile-size video'>
            <Link to="/" className='go-back-link'>
                <MdOutlineKeyboardArrowLeft/>Sair
            </Link>

            <div className='video-embed'>
                <TikTokEmbed url="www.tiktok.com/@txs_cesar/video/7529606179366931767" width={325} />
            </div>

            <form action="" className="video-guess">
                <div className='select'>
                    <select name="guess" id="guess">
                        <option value="orangeknight">orangeknight</option>
                    </select>
                    <MdKeyboardArrowDown className='arrow'/>
                </div>
            
                <button className="button-black">Chutar</button>
            </form>

        </section>
    )
  
}

export default Video
