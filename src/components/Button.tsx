import React from "react";

interface Button {
  text: string;
  type?: any; //? what to use???
  onClick: React.DOMAttributes<HTMLButtonElement>["onClick"];
}

const Button = ({ text, type, onClick }: Button) => {
  const btnType = ["positive", "negative"].includes(type) ? type : "default";
  return (
    <button className={["Btn", `Btn_${btnType}`].join(" ")} onClick={onClick}>
      {text}
    </button>
  );
};
Button.defaultProps = {
  type: "default",
};
export default Button;
