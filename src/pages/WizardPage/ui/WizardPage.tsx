import { useState, useEffect, useCallback } from 'react';
import WizardForm from '@/components/WizardForm';
import ErrorBoundary from '@/components/ErrorBoundary';

// import { FormData } from '@/types';

import './index.scss';

const WizardPage = () => {
  const [isWizardOpen, setIsWizardOpen] = useState(false);

  // Проверка sessionStorage при загрузке
  useEffect(() => {
    const authKey = sessionStorage.getItem('authKey');
    if (!authKey) {
      setIsWizardOpen(true);
    }
  }, []);

  const handleWizardSubmit = useCallback(() => {
    alert('Аутентификация успешна!');
    setIsWizardOpen(false);
  }, []);

  const handleWizardClose = useCallback(() => {
    setIsWizardOpen(false);
  }, []);

  return (
    <div className='wizard-page'>
      <ErrorBoundary>
        <WizardForm
          isOpen={isWizardOpen}
          onClose={handleWizardClose}
          onSubmit={handleWizardSubmit}
        />
      </ErrorBoundary>
    </div>
  );
};

export default WizardPage;