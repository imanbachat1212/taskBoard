import React, { useEffect, useState } from "react";
import { getLogs } from "../services/api";

const Logs = () => {
  const [logs, setLogs] = useState([]);

  useEffect(() => {
    fetchLogs();
  }, []);

  const fetchLogs = async () => {
    const data = await getLogs();
    setLogs(data);
  };

  return (
    <div>
      <h1>History Logs</h1>
      <ul>
        {logs.map((log) => (
          <li key={log.id}>
            {log.message} ({new Date(log.created_at).toLocaleString()})
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Logs;
