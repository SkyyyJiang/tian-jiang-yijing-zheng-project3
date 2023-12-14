import React from "react";
import { useActiveUser } from "../context/ActiveUserContext";

import NavBar from "./NavBar";
import CreateStatus from "./CreateStatus";
import DisplayStatus from "./DisplayStatus";

export default function Home() {
  const { activeUsername } = useActiveUser();

  return (
    <div>
      <NavBar />
      <div className="spacing"></div>
      <div className="post-container">
        {activeUsername && <CreateStatus username={activeUsername} />}
        <DisplayStatus activeUsername={activeUsername} searchUsername={null} />
      </div>
    </div>
  );
}
