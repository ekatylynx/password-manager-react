import React, { useState, useCallback, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import Modal from '@/components/Modal';
import {
  Step1Welcome,
  StepCreatePassword,
  StepCreateSaveFile,
  StepUploadFile,
  StepUploadPassword
} from '@/components/WizardSetup';

// Типы
import { FormData, WizardFormProps, WizardStep } from '@/types';

import './index.scss';

// eslint-disable-next-line react/display-name
const WizardForm: React.FC<WizardFormProps> = React.memo(
  // eslint-disable-next-line react/prop-types
  ({ isOpen, onClose, onSubmit, initialData = {} }) => {
    const navigate = useNavigate();
    const [currentStep, setCurrentStep] = useState(0);
    const [formData, setFormData] = useState<FormData>(initialData);

    const updateFormData = useCallback((data: Partial<FormData>) => {
      setFormData((prev) => {
        const newData = { ...prev, ...data };
        return newData;
      });
    }, []);

  const getSteps = useCallback((): WizardStep[] => {
    const baseSteps: WizardStep[] = [
      {
        title: 'Вы здесь впервые?',
        component: Step1Welcome,
      },
    ];

    if (formData.step1?.choice === 'create') {
      return [
        ...baseSteps,
        {
          title: 'Введите пароль',
          component: StepCreatePassword,
        },
        {
          title: 'Сохраните файл',
          component: StepCreateSaveFile,
        },
      ];
    }
    if (formData.step1?.choice === 'upload') {
      return [
        ...baseSteps,
        {
          title: 'Загрузите файл',
          component: StepUploadFile,
        },
        {
          title: 'Введите пароль',
          component: StepUploadPassword,
        },
      ];
    }
    return baseSteps;
  }, [formData]);

  const steps = useMemo(() => getSteps(), [getSteps]);

  const handleNext = useCallback(() => {
    if (currentStep < steps.length - 1) {
      // Проверка файла перед переходом
      if (formData.step1?.choice === 'upload' && currentStep === 1) {
        if (!formData.stepUploadFile?.file) {
          console.error('Файл отсутствует при переходе к StepUploadPassword');
          return;
        }
      }
      setCurrentStep(currentStep + 1);
    } else {
      onSubmit(formData);
      sessionStorage.setItem('authKey', 'authenticated');
      navigate('/');
      onClose();
    }
  }, [currentStep, steps.length, onSubmit, formData, navigate, onClose]);

  const handleBack = useCallback(() => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  }, [currentStep]);

  const isStepValid = useCallback(() => {
    if (currentStep === 0) return !!formData.step1?.choice;
    if (formData.step1?.choice === 'create') {
      if (currentStep === 1) return !!formData.stepCreatePassword?.password;
      if (currentStep === 2) return !!formData.stepCreateSaveFile?.saved;
    }
    if (formData.step1?.choice === 'upload') {
      if (currentStep === 1) return !!formData.stepUploadFile?.file;
      if (currentStep === 2) return !!formData.stepUploadPassword?.success;
    }
    return false;
  }, [currentStep, formData]);

  const isFirstStep = currentStep === 0;
  const isLastStep = currentStep === steps.length - 1;

  const CurrentStepComponent = steps[currentStep].component;

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={steps[currentStep].title}
      variant="primary"
      inertBackground={true}
      closeOnOverlayClick={false}
    >
      <div className="wizard-form">
        <div className="wizard-progress">
          {steps.map((step, index) => (
            <div
              key={step.title}
              className={`wizard-step ${index === currentStep ? 'active' : ''} ${
                index < currentStep ? 'completed' : ''
              }`}
              data-step={index + 1}
            >
              <span className="wizard-step-number">{index + 1}</span>
              <span className="wizard-step-title">{step.title}</span>
            </div>
          ))}
        </div>
        <div className="wizard-content">
          <CurrentStepComponent formData={formData} updateFormData={updateFormData} />
        </div>
        <div className="wizard-buttons">
          {!isFirstStep && (
            <button className="wizard-button back" onClick={handleBack}>
              Назад
            </button>
          )}
          <button
            className="wizard-button next"
            onClick={handleNext}
            disabled={!isStepValid()}
          >
            {isLastStep ? 'Завершить' : 'Далее'}
          </button>
        </div>
      </div>
    </Modal>
  );
  }
);

export default WizardForm;