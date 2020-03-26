import React, { useState } from 'react';

import './App.css';

import useCepHook from "./hooks"

const App = () => {
  const [searchValue, setSearchValue] = useState("");

  const [loading, cep, error] = useCepHook(searchValue);

  return (
    <div className="container">
      <div className="columns"> 
        <div className="column is-one-quarter">
          <div className="field">
            <label className="label">CEP:</label>
            <div className="control">
              <input className="input" type="text" placeholder="000000-000" onChange={e => setSearchValue(e.target.value)} value={searchValue}/>
            </div>
          </div>
        </div>
        <div className="column">
          <ul>
            <li>Loading: {String(loading)}</li>
            <li>CEP: {JSON.stringify(cep)}</li>
            {error && error.message && <li>Error: {String(error.message)}</li>}
          </ul>
        </div>
      </div>
    </div>
  )
}

export default App;
