import React from "react";
import './index.scss';
import { InputProps } from "@/helpersTypes/index";

const Input: React.FC<InputProps> = ({
  placeholder,
  onChange,
  value,
  inputType,
  className = "",
  variant = '',
  ...props
}) => {

  return (
    <input 
      {...props} // передаем все остальные пропсы, включая onChange
      className={`input ${variant}`}
      placeholder={placeholder} 
      value={value} // значение поля должно быть привязано
      onChange={onChange} // передаем onChange в input
      type={inputType}
    />
  );
};

export default Input;
