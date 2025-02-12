import React, { useEffect, useState } from "react";
import axios from "axios";

const Cases = () => {
  const [cases, setCases] = useState([]);

  useEffect(() => {
    axios.get("http://0.0.0.0:8000/cases")
      .then((response) => setCases(response.data))
      .catch((error) => console.error(error));
  }, []);

  return (
    <div>
      <h2>Legal Cases</h2>
      <ul>
        {cases.map((caseItem) => (
          <li key={caseItem.id}>{caseItem.title} - Status: {caseItem.status}</li>
        ))}
      </ul>
    </div>
  );
};

export default Cases;
