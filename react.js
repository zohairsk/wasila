import React, { useState, useEffect } from "react";

function Charities() {
  const [organisations, setOrganisations] = useState({});

  useEffect(() => {
    fetch("http://localhost:8080/api/organisation")
      .then((res) => res.json())
      .then((data) => setOrganisations(data))
      .catch((error) => console.log(error));
  }, []);

  return (
    <div>
      <h1>Charities</h1>
      <ul>
        {organisations.map((org) => (
          <>
            <p>{org.name}</p>
            <p>{org.weblink}</p>
          </>
          
        ))}
      </ul>
    </div>
  );
}

export default Charities;
