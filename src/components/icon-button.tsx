import React from "react";

type IconButtonProps = {
  children: React.ReactNode;
  className?: string;
  onClick: () => void;
};

const IconButton: React.FC<IconButtonProps> = ({ children, className, onClick }) => {
  const c = "icon-button" + (className ? " " + className : "");

  return (
    <button className={c} onClick={onClick}>
      {children}
    </button>
  );
};

export default IconButton;
