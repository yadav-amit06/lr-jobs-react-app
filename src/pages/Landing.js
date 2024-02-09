import React from 'react'
import main from '../assets/images/main.svg';
import Wrapper from '../assets/wrappers/LandingPage';
import { Logo } from '../components';
import { Link } from 'react-router-dom';


const Landing = () => { 
  return (
    <Wrapper>
        <nav>
            <Logo />
        </nav>
        <div className='container page'>
            {/* info */}
            <div className='info'>
                <h1>
                    Job <span>Tracking</span> App
                </h1>
                
                <p>
                    Plaid forage hammock ascot offal organic asymmetrical fixie. Skateboard direct trade 
                    etsy gentrify gluten-free tonx. Lumbersexual actually stumptown mlkshk pitchfork
                    affogato. 
                </p>
                <Link to="/register" className='btn btn-hero'>Login/Register</Link>
            </div>
            <img src={main} className='img main-img' alt='jobify main img'/>
        </div>
    </Wrapper>
  )
}

export default Landing