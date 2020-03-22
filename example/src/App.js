import React, { useState } from "react";

import useViaCep from "use-cep-hook";

import "./App.css";

const App = () => {
  const [postalCode, setPostalCode] = useState("");

  const [loading, cep, error] = useViaCep(postalCode);

  console.log("loading, cep, error", loading, cep, error);

  return (
    <div className="form">
      <div className="field">
        <label>CEP:</label>
        <input
          onChange={e => setPostalCode(e.target.value)}
          value={postalCode}
        />
      </div>
      <ul>
        <li>Loading: {loading}</li>
        <li>Cep: {JSON.stringify(cep)}</li>
        <li>Error: {error}</li>
      </ul>
    </div>
  );
};

export default App;
