import React, { Component } from 'react';
import './css/front.css';

class Front extends Component {
  render() {
    return (
        
        <div className="container">  
          <div className="section">
            <h1>What do you want to learn today?</h1>
            <form>
              <input placeholder="search here..."/>
              <input type="submit"/>
            </form>
          </div>
  
          <div className="section">
            <h1>How it works</h1>
            <div className="guide-container">
              <div className="guide-box">
                <i className="guide-icon far fa-heart"></i>
                <h3>Kostenlose Registrierung</h3>
                <p>Registriere dich in weniger als 2 Minuten. Werde jetzt kostenlos Mitglied bei Fiverr.</p>
              </div>
              <div className="guide-box">
                <i className="guide-icon far fa-heart"></i>
                <h3>Kostenlose Registrierung</h3>
                <p>Registriere dich in weniger als 2 Minuten. Werde jetzt kostenlos Mitglied bei Fiverr.</p>
              </div>
              <div className="guide-box">
                <i className="guide-icon far fa-heart"></i>
                <h3>Kostenlose Registrierung</h3>
                <p>Registriere dich in weniger als 2 Minuten. Werde jetzt kostenlos Mitglied bei Fiverr.</p>
              </div>
            </div>
            <button>Learn more</button>
          </div>

          <div className="section">
            <h3>Millions of services, all available for you</h3>
            <p>Willkommen beim weltweit größten Marktplatz für Kreativdienstleistungen und mehr. Werde auch du einer von Millionen von Usern, die hier Services für ihr Unternehmen bestellen!
            </p>
          </div>

          <div className="section">
            <div className="image?"></div>
          </div>
          <button>Get started!</button>
        </div>
    );
  }
}

export default Front;
