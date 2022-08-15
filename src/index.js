import React from 'react';
import ReactDOM from 'react-dom/client';
import Drivers from './components/Drivers';
import 'bootstrap/dist/css/bootstrap.min.css';

const App = () => {
  return (
    <div>
      <Drivers />
    </div>
  );
};

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);
