import { useEffect, useState } from "react";
import api from "./lib/api";

function App() {
  const [ping, setPing] = useState<string>("");

  useEffect(() => {
    api
      .get("/ping")
      .then((res) => setPing(JSON.stringify(res.data)))
      .catch((err) => setPing("Error: " + err.message));
  }, []);

  return (
    <>
      <div className="flex-col  items-center justify-center mt-10 text-center">
        <div className="text-3xl font-bold underline">hello umore</div>
        <div className="mt-4">Server response: {ping || "Loading..."}</div>
      </div>
    </>
  );
}
export default App;
