import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

import Header from './components/Header'
import Footer from './components/Footer'

function App(){

  const sayHello = () => {
    console.log('hello');
  }

  const counter = 0;

  return (
    <div className="App">
      <Header />

        -- Main app/body placeholder --<br />
        -- Main app/body placeholder --<br />
        -- Main app/body placeholder --<br />
        -- Main app/body placeholder --<br />

      <Footer />
    </div>
  );
}

export default App;
