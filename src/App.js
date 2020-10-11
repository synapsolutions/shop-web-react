import React from 'react';
import './App.css';
import PayButton from './components/PayButton'

function App() {
  return (
    <div className="main-container">
      <header>Synapsis Payment Demo</header>
      <div className="panel">
      <section className="tool-panel">
        <PayButton container="synap-payment-container">
        </PayButton>
      </section>
      <section className="body-panel" id="synap-payment-container"></section>
      </div>
   </div>
  );
}

export default App;
