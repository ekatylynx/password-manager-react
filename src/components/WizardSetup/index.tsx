import React, { useState, useCallback } from 'react';
import InputFile from '@/components/InputFile';
import { encrypt, decrypt } from '@vtfk/encryption';

import { StepProps } from '@/types';

import './index.scss';

export const Step1Welcome: React.FC<StepProps> = ({ updateFormData }) => {
  const [selected, setSelected] = useState<'create' | 'upload'>('create');

  // Добавлен useCallback для избежания лишних перерендеров
  const handleChoice = useCallback((choice: 'create' | 'upload') => {
    setSelected(choice);
    updateFormData({ step1: { choice } });
  }, [updateFormData]);

  return (
    <div>
      <h3 className='wizard-subtitle'>Выберите действие:</h3>
      <div className='wizard-choice'>
        <button
          className={'wizard-button button-choice' + (selected === 'create' ? ' btn-selected' : '')}
          onClick={() => { 
            handleChoice('create');
            setSelected('create');
          }}
        >
          Создать новый файл паролей
        </button>
        <button
          className={'wizard-button button-choice' + (selected === 'upload' ? ' btn-selected' : '')}
          onClick={() => {
            handleChoice('upload');
            setSelected('upload');
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

  const handlePasswordChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const newPassword = e.target.value;
    setPassword(newPassword);
    setError('');
    updateFormData({ stepCreatePassword: { password: newPassword } });
  }, [updateFormData]);

  return (
    <div className='wizard-download'>
      <h3 className='wizard-subtitle'>Введите пароль-фразу</h3>
      <p className='wizard-warning'>Нажмите, чтобы скачать зашифрованный файл data.aes256.</p>
      <label>
        <p className='wizard-label'>Пароль:</p>
        <input
          type='password'
          value={password}
          onChange={handlePasswordChange}
          placeholder='******'
          className={`wizard-input phrase-input ${error ? 'wizard-input-error' : ''}`}
        />
      </label>
      {error && <p className='wizard-error'>{error}</p>}
    </div>
  );
};

export const StepCreateSaveFile: React.FC<StepProps> = ({ formData, updateFormData }) => {
  const handleSave = useCallback(async () => {
    try {
      const password = formData.stepCreatePassword?.password;
      if (!password) throw new Error('Пароль не указан');

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
      const errorMessage = err instanceof Error ? err.message : 'Не удалось сохранить файл';
      console.error('Ошибка сохранения файла:', err);
      updateFormData({ stepCreateSaveFile: { error: errorMessage } });
    }
  }, [formData.stepCreatePassword?.password, updateFormData]);

  return (
    <div className='wizard-download'>
      <h3 className='wizard-subtitle'>Сохраните файл</h3>
      <p className='wizard-warning'>Нажмите, чтобы скачать зашифрованный файл data.aes256.</p>
      <button className='wizard-button next' onClick={handleSave}>
        Скачать файл
      </button>
      {formData.stepCreateSaveFile?.error && (
        <p className='wizard-error'>{formData.stepCreateSaveFile.error}</p>
      )}
    </div>
  );
};

export const StepUploadFile: React.FC<StepProps> = ({ formData, updateFormData }) => {
  const handleFileChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      updateFormData({ stepUploadFile: { fileName: file.name, file } });
    }
  }, [updateFormData]);

  return (
    <div>
      <h3 className='wizard-subtitle'>Загрузите файл</h3>
      <InputFile
        placeholder='Загрузить файл .aes256'
        onChange={handleFileChange}
        accept='.aes256'
        variant='primary'
      />
      {formData.stepUploadFile?.fileName && <p>Выбран: {formData.stepUploadFile.fileName}</p>}
    </div>
  );
};

export const StepUploadPassword: React.FC<StepProps> = ({ formData, updateFormData }) => {
  const [password, setPassword] = useState(formData.stepUploadPassword?.password || '');
  const [error, setError] = useState('');

  const handlePasswordChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
    setError('');
  }, []);

  const handleDecrypt = useCallback(async () => {
    try {
      const file = formData.stepUploadFile?.file;
      if (!file) {
        console.error('formData.stepUploadFile is undefined or missing file:', formData.stepUploadFile);
        throw new Error('Файл не загружен');
      }
      if (!password) throw new Error('Пароль не указан');

      const reader = new FileReader();
      reader.onload = async (event) => {
        const encryptedData = event.target?.result as string;
        try {
          const decrypted = await decrypt(encryptedData, password);
          updateFormData({
            stepUploadPassword: { password, decryptedData: decrypted, success: true },
          });
        } catch {
          setError('Неверный пароль или повреждённый файл');
          updateFormData({ stepUploadPassword: { password, error: 'Ошибка расшифровки' } });
        }
      };
      reader.onerror = () => {
        setError('Ошибка чтения файла');
        updateFormData({ stepUploadPassword: { password, error: 'Ошибка чтения файла' } });
      };
      reader.readAsText(file);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Неизвестная ошибка';
      setError(errorMessage);
      console.error('Ошибка в handleDecrypt:', errorMessage, 'formData:', formData); // Отладочный лог
    }
  }, [formData, password, updateFormData]); // Изменили зависимость на formData

  return (
    <div>
      <h3 className='wizard-subtitle'>Введите пароль для расшифровки</h3>
      <label>
        <p className='wizard-label'>Пароль:</p>
        {/* <br /> */}
        <input
          type='password'
          value={password}
          onChange={handlePasswordChange}
          placeholder='*******'
          className={`wizard-input phrase-input ${error ? 'wizard-input-error' : ''}`}
        />
      </label>
      <button className='wizard-button next' onClick={handleDecrypt}>
        Расшифровать
      </button>
      {error && <p className='wizard-error'>{error}</p>}
    </div>
  );
};