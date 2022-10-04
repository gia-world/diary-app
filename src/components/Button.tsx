import React from "react";

interface ButtonType {
  text: string;
  type: "positive" | "negative";
  onClick: React.DOMAttributes<HTMLButtonElement>["onClick"];
}

const Button = ({ text, type, onClick }: ButtonType) => {
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
