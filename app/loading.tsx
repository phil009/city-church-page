import React from "react";
import ClipLoader from "react-spinners/ClipLoader";

const Loading = () => {
  return (
    <div className="absolute w-full h-full bg-white">
      <ClipLoader size={50} color="#ec2424" />
    </div>
  );
};

export default Loading;
