import React from "react";
import { Link } from "react-router-dom";

function Notfoundd() {
  return (
    <div>
      <div className="flex flex-col gap-2" style={{ color: "black" }}>
        404 Not found
      </div>

      <Link to="/">Home from link</Link>
      {/* //this actually goint to perform cliet side loading only not the whole page load */}
      {/* <a href="/">Home from A tag</a> */}
    </div>
  );
}

export default Notfoundd;
