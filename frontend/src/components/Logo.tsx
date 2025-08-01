import React from "react";

type LogoProps = {
  textSize?: string;
};

function Logo({ textSize = "text-[60px]" }: LogoProps): React.ReactElement {
  return (
    <h1 className={`${textSize} font-extrabold font-luckiestGuy`}>
      HAHA QUOTES
    </h1>
  );
}

export default Logo;
