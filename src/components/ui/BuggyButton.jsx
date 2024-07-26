import React, { useState } from "react";

const BuggyButton = () => {
  const [throwError, setThrowError] = useState(false);

  if (throwError) {
    throw new Error("This is a simulated error");
  }

  return (
    <button className="bg-red-600 p-2" onClick={() => setThrowError(true)}>
      Throw Error
    </button>
  );
};

export default BuggyButton;
