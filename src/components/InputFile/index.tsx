import React, { useRef, useState } from "react";
import './index.scss';
import { InputProps } from "@/helpersTypes/index";


const InputFile: React.FC<InputProps> = ({
  placeholder,
  onChange,
  // inputType = 'file',
  className = '',
  variant = '',
  accept = '.aes256',
  ...props
}) => {
  
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [fileName, setFileName] = useState('');

  const handleButtonClick = () => {
    fileInputRef.current?.click();
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setFileName(file.name);
    }
    onChange?.(e);
  };

  return (
    <div className={`file-wrapper ${variant} ${className}`}>
      <input
        type="file"
        ref={fileInputRef}
        className="file-input"
        onChange={handleChange}
        accept={accept}
        {...props}
      />
      <button
        type="button"
        className="file-button"
        onClick={handleButtonClick}
      >
        {/* <IconUpload size={18} className="file-icon" /> */}
        <span>{fileName || placeholder || 'Выберите файл'}</span>
      </button>
    </div>
  );
};

export default InputFile;