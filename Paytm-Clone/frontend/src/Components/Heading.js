import React from "react";

const Heading = ({ label }) => {
  return (
    <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
      {label}
    </h1>
  );
};

export default Heading;
