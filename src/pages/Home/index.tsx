import './index.css'
import { Link } from 'react-router';

function Home() {

      return (
        <section className='mobile-size home'>
            <div className="instructions">
                <h1 className='title'>Tiktok<br/>Guessing Game</h1>

                <div className="instructions-content">
                    <h2 className='subtitle'>Como jogar</h2>
                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut et massa mi. Aliquam in hendrerit urna.</p>
                </div>
                
                <div className="instructions-content">
                    <h2 className='subtitle'>Objetivo</h2>
                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut et massa mi. Aliquam in hendrerit urna.</p>
                </div>
            </div>
            
            <div className="buttons">
                <Link to="/join" className='button-black'> Entrar </Link>
                <Link to="/create" className='button-transparent'> Criar sala </Link>
            </div>
        </section>
    )
  
}

export default Home
