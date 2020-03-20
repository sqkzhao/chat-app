import React from 'react';
import Chat from './components/Chat'
import './App.css';

function App() {
  return (
    <div className="container">
      <div className="card col-6 mx-auto mt-5 py-1 bg-success">
        <h1 className="text-center text-light">MERN Chat</h1>
      </div>
      <Chat />
    </div>
  );
}

export default App;
