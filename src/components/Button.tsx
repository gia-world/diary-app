import React from "react";

interface Props {
  text: string;
  type: "positive" | "negative" | null;
  onClick: React.DOMAttributes<HTMLButtonElement>["onClick"];
}

const Button = ({ text, type, onClick }: Props) => {
  // const btnType = ["positive", "negative"].includes(type) ? type : "default";
  const btnType = type ? type : "default";
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
