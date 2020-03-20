import React, { useState } from 'react';

import useViaCep from "use-via-cep";

import './App.css';

const App = () => {
  const [postalCode, setPostalCode] = useState("");
  
  const [loading, cep, error] = useViaCep(postalCode);

  return (
    <div className="form">
      <div className="field">
        <label>
          CEP:
        </label>
        <input onChange={e => setPostalCode(e.target.value)} value={postalCode} />
      </div>
    </div>
  );
}

export default App;
