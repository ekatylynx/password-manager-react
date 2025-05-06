import React, { useState } from 'react';
import InputFile from '@/components/InputFile';
import { encrypt, decrypt } from '@vtfk/encryption';

import './index.scss';

// TODO: Починить типы и навести порядок

interface StepProps {
  formData: Record<string, any>;
  updateFormData: (data: Record<string, any>) => void;
}

export const Step1Welcome: React.FC<StepProps> = ({ updateFormData }) => {
  const handleChoice = (choice: 'create' | 'upload') => {
    updateFormData({ step1: { choice } });
  };
  const [selected, setSelected] = useState("create");

  return (
    <div>
      <h3 className='wizard-subtitle'>Выберите дальнейшее действие:</h3>
      <div className="wizard-choice">
        <button
          className={"wizard-button button-choice" + (selected === "create" ? " btn-selected" : "")}
          onClick={() => { 
            handleChoice('create');
            setSelected("create");
          }}
        >
          Создать новый файл паролей
        </button>
        <button
          className={"wizard-button button-choice" + (selected === "upload" ? " btn-selected" : "")}
          onClick={() => {
            handleChoice('upload');
            setSelected("upload");
          }}
        >
          Загрузить файл
        </button>
        <span className='wizard-warning'>Обратите внимание, что загружать файлы можно только формата aes256!</span>
      </div>
    </div>
  );
};

export const StepCreatePassword: React.FC<StepProps> = ({ formData, updateFormData }) => {
  const [password, setPassword] = useState(formData.stepCreatePassword?.password || '');
  const [error, setError] = useState('');

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
    setError('');
    updateFormData({ stepCreatePassword: { password: e.target.value } });
  };

  return (
    <div className='wizard-download'>
      <h3 className='wizard-subtitle'>Введите пароль-фразу</h3>
      <p className='wizard-warning'>Нажмите, чтобы скачать зашифрованный файл data.aes256.</p>
      <label>
        <p className='wizard-label'>Пароль:</p>
        <input
          type="password"
          value={password}
          onChange={handlePasswordChange}
          placeholder="******"
          className={`wizard-input phrase-input ${error ? 'wizard-input-error' : ''}`}
        />
      </label>
      {error && <p className="wizard-error">{error}</p>}
    </div>
  );
};

export const StepCreateSaveFile: React.FC<StepProps> = ({ formData, updateFormData }) => {
  const handleSave = async () => {
    try {
      const password = formData.stepCreatePassword?.password;
      if (!password) throw new Error('Пароль не указан');

      // Создаём пустой файл
      const content = '';
      const encrypted = await encrypt(content, password);
      const blob = new Blob([encrypted], { type: 'application/octet-stream' });
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = 'data.aes256';
      link.click();
      URL.revokeObjectURL(url);

      updateFormData({ stepCreateSaveFile: { saved: true } });
    } catch (err) {
      console.error('Ошибка сохранения файла:', err);
      updateFormData({ stepCreateSaveFile: { error: 'Не удалось сохранить файл' } });
    }
  };

  return (
    <div className='wizard-download'>
      <h3 className='wizard-subtitle'>Сохраните файл</h3>
      <p className='wizard-warning'>Нажмите, чтобы скачать зашифрованный файл data.aes256.</p>
      <button className="wizard-button next" onClick={handleSave}>
        Скачать файл
      </button>
      {formData.stepCreateSaveFile?.error && (
        <p className="wizard-error">{formData.stepCreateSaveFile.error}</p>
      )}
    </div>
  );
};

export const StepUploadFile: React.FC<StepProps> = ({ formData, updateFormData }) => {
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      updateFormData({ stepUploadFile: { fileName: file.name, file } });
    }
  };

  return (
    <div>
      <h3 className='wizard-subtitle'>Загрузите файл</h3>
      <InputFile
        placeholder="Загрузить файл .aes256"
        onChange={handleFileChange}
        accept=".aes256"
        variant="primary"
      />
      {formData.stepUploadFile?.fileName && <p>Выбран: {formData.stepUploadFile.fileName}</p>}
    </div>
  );
};

export const StepUploadPassword: React.FC<StepProps> = ({ formData, updateFormData }) => {
  const [password, setPassword] = useState(formData.stepUploadPassword?.password || '');
  const [error, setError] = useState('');

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
    setError('');
  };

  const handleDecrypt = async () => {
    try {
      const file = formData.stepUploadFile?.file;
      if (!file) throw new Error('Файл не загружен');
      if (!password) throw new Error('Пароль не указан');

      const reader = new FileReader();
      reader.onload = async (event) => {
        const encryptedData = event.target?.result as string;
        try {
          const decrypted = await decrypt(encryptedData, password);
          updateFormData({
            stepUploadPassword: { password, decryptedData: decrypted, success: true }
          });
        } catch (err) {
          setError('Неверный пароль или повреждённый файл');
          updateFormData({ stepUploadPassword: { error: 'Ошибка расшифровки' } });
        }
      };
      reader.readAsText(file);
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div>
      <h3 className='wizard-subtitle'>Введите пароль для расшифровки</h3>
      <label>
        <p className='wizard-label'>Пароль:</p>
        {/* <br /> */}
        <input
          type="password"
          value={password}
          onChange={handlePasswordChange}
          placeholder="*******"
          className={`wizard-input phrase-input ${error ? 'wizard-input-error' : ''}`}
        />
      </label>
      <button className="wizard-button next" onClick={handleDecrypt}>
        Расшифровать
      </button>
      {error && <p className="wizard-error">{error}</p>}
    </div>
  );
};