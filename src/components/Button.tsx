import React from "react";

interface button {
  text: string;
  type?: string;
  onClick: React.DOMAttributes<HTMLButtonElement>["onClick"];
}

const Button = ({ text, type, onClick }: button) => {
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
