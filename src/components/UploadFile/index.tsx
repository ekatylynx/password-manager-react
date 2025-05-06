export const UploadFile = () => {
  return (
        <div>
          <p>Upload File</p>
        </div>
      );
};

// TODO: Подумать над судьбой этого компонента

// import React from "react";

// import { decrypt } from "@vtfk/encryption";

// import './index.scss';
// // import Input from "@components/Input";
// import InputFile from "@/components/InputFile";

// interface UploadFileProps {
//   passphrase: string;
//   onFileLoad: (content: PasswordEntry[]) => void;
//   onError: (error: string) => void;
// }

// export const UploadFile: React.FC = ({ passphrase, onFileLoad, onError }: UploadFileProps) => {
//   const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
//     const file = event.target.files?.[0];
//     if (!file) return;

//     if (!file.name.endsWith(".aes256")) {
//       onError("Выберите файл с расширением .aes256");
//       return;
//     }

//     const reader = new FileReader();
//     reader.onload = (e) => {
//       try {
//         const decrypted = decrypt(e.target.result as string, passphrase);
//         const content = JSON.parse(decrypted) as PasswordEntry[];
//         onFileLoad(content);
//       } catch (err) {
//         onError(`Ошибка: ${err.message}`);
//       }
//     };
//     reader.readAsText(file);
//   };
//   return (
//     <div>
//       <p>Upload File</p>
//       <InputFile
//         placeholder="Выберите зашифрованный файл"
//         inputType="file"
//         accept=".aes256"
//         onChange={handleFileChange}
//         variant="primary"
//       />
//     </div>
//   );
// };

// export default UploadFile;
