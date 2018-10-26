import React, { Component } from 'react';
import './css/GetStarted.css';

class GetStarted extends Component {
  render() {
    return (
        
        <div className="container">  
          <div className="section">
            <h1>Want to share your knowledge and make an extra buck?</h1>
          	<button>Get started</button>
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
            <br/>
            <button>Learn more</button>
          </div>

          <div className="section">
            <h3>Millions of services, all available for you</h3>
            <p>Willkommen beim weltweit größten Marktplatz für Kreativdienstleistungen und mehr. Werde auch du einer von Millionen von Usern, die hier Services für ihr Unternehmen bestellen!
            </p>
          </div>

          <div className="section imagex">
          	<button>Get started</button>
          </div>
        </div>
    );
  }
}

export default GetStarted;
