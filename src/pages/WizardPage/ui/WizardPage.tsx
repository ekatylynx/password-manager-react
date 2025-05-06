import { useState, useEffect } from 'react';
// import InputFile from '@/components/InputFile';
import WizardForm from '@/components/WizardForm';
import { InputProps } from '@/helpersTypes';
import ErrorBoundary from '@/components/ErrorBoundary';

import './index.scss';

const WizardPage = () => {
  const [fileName, setFileName] = useState('');
  const [isWizardOpen, setIsWizardOpen] = useState(false);

  // Проверка sessionStorage при загрузке
  useEffect(() => {
    const authKey = sessionStorage.getItem('authKey');
    if (!authKey) {
      setIsWizardOpen(true);
    }
  }, []);

  const handleFileChange: InputProps['onChange'] = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      setFileName(file.name);
    }
  };

  const handleWizardSubmit = (data: Record<string, any>) => {
    console.log('Финальные данные:', data);
    // alert('Аутентификация успешна! Данные: ' + JSON.stringify(data));
    alert('Аутентификация успешна!');
    // authKey сохраняется в WizardForm
    setIsWizardOpen(false);
  };

  const handleWizardClose = () => {
    setIsWizardOpen(false);
  };

  return (
    <div style={{ padding: '20px' }}>
      {/*
      // TODO: Надо подумать над тем, чтобы добавить доп. 
      инпут для повторной загрузки файла после
      wizard формы.
      TODO: Навести порядок в этом файле и прикрутить типы
      */}
      {/* <h1>Менеджер паролей</h1> */}
      {/* <InputFile
        placeholder="Загрузить файл .aes256"
        onChange={handleFileChange}
        variant="primary"
        accept=".aes256"
      />
      {fileName && <p>Выбран файл: {fileName}</p>}
      <button onClick={() => setIsWizardOpen(true)}>Открыть пошаговую форму</button>
      */}
      <ErrorBoundary>
        <WizardForm
          isOpen={isWizardOpen}
          onClose={handleWizardClose}
          onSubmit={handleWizardSubmit}
          initialData={{
            step1: {},
            stepCreatePassword: {},
            stepCreateSaveFile: {},
            stepUploadFile: {},
            stepUploadPassword: {}
          }}
        />
      </ErrorBoundary>
    </div>
  );
};

export default WizardPage;