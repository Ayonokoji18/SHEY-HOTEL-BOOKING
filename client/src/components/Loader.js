import React, { useState } from "react";
import BeatLoader from "react-spinners/BeatLoader";

function Loader() {
  const [loading, setLoading] = useState(true);

  const override = {
    display: "block",
    margin: "0 auto",
  };

  return (
    <div>
      <div className="sweet-loading d-flex justify-content-center align-items-center vh-100">
        <BeatLoader
          color="aqua"
          loading={loading}
          style={override}
          size={50}
          aria-label="Loading Spinner"
          data-testid="loader"
        />
        {setLoading}
      </div>
    </div>
  );
}

export default Loader;
