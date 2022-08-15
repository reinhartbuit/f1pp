import React from 'react';
import ReactDOM from 'react-dom/client';
import Drivers from './components/Drivers';
import Seasons from './components/Seasons';

const App = () => {
  return (
    <div>
      <Seasons />
    </div>
  );
};

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);
