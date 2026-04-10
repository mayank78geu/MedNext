import React, { useState } from "react";

const ERROR_IMG_SRC = "data:image/svg+xml;base64,...";

const Img = (props) => {
  const [didError, setDidError] = useState(false);

  const handleError = () => setDidError(true);

  const { src, alt, style, className, ...rest } = props;

  return didError ? (
    <div className={`bg-gray-100 ${className || ""}`} style={style}>
      <img src={ERROR_IMG_SRC} alt="Error" {...rest} />
    </div>
  ) : (
    <img src={src} alt={alt} className={className} style={style} {...rest} onError={handleError} />
  );
};

export default Img;