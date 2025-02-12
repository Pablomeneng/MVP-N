import React, { useEffect, useState } from "react";
import axios from "axios";

const Clients = () => {
  const [clients, setClients] = useState([]);

  useEffect(() => {
    axios.get("http://0.0.0.0:8000/clients")
      .then((response) => setClients(response.data))
      .catch((error) => console.error(error));
  }, []);

  return (
    <div>
      <h2>Clients</h2>
      <ul>
        {clients.map((client) => (
          <li key={client.id}>{client.name} - {client.email}</li>
        ))}
      </ul>
    </div>
  );
};

export default Clients;
