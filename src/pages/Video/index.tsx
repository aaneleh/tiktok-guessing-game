import './index.css'
import { MdOutlineKeyboardArrowLeft } from 'react-icons/md';
import { Link } from 'react-router';
import { TikTokEmbed } from 'react-social-media-embed';


function Video() {

      return (
        <section className='mobile-size video'>
            <Link to="/" className='go-back-link'>
                <MdOutlineKeyboardArrowLeft/>Voltar
            </Link>

            <h1 className="title">VIDEO</h1>

            <div style={{ display: 'flex', justifyContent: 'center' }}>
                <TikTokEmbed url="www.tiktok.com/@txs_cesar/video/7529606179366931767" width={325} />
            </div>

        </section>
    )
  
}

export default Video
