import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Modal from '@/components/Modal';
import {
  Step1Welcome,
  StepCreatePassword,
  StepCreateSaveFile,
  StepUploadFile,
  StepUploadPassword
} from '@/components/WizardSetup';
import './index.scss';
// TODO: Навести порядок и прикрутить типы
interface WizardStep {
  title: string;
  component: React.ReactElement;
}

interface WizardFormProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: Record<string, any>) => void;
  initialData?: Record<string, any>;
}

const WizardForm: React.FC<WizardFormProps> = ({
  isOpen,
  onClose,
  onSubmit,
  initialData = {}
}) => {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState<Record<string, any>>(initialData);

  const getSteps = (): WizardStep[] => {
    const baseSteps: WizardStep[] = [
      { title: 'Вы здесь впервые?', component: <Step1Welcome /> }
    ];

    if (formData.step1?.choice === 'create') {
      return [
        ...baseSteps,
        { title: 'Введите пароль', component: <StepCreatePassword /> },
        { title: 'Сохраните файл', component: <StepCreateSaveFile /> }
      ];
    }
    if (formData.step1?.choice === 'upload') {
      return [
        ...baseSteps,
        { title: 'Загрузите файл', component: <StepUploadFile /> },
        { title: 'Введите пароль', component: <StepUploadPassword /> }
      ];
    }
    return baseSteps;
  };

  const steps = React.useMemo(() => getSteps(), [formData.step1?.choice]);

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      onSubmit(formData);
      sessionStorage.setItem('authKey', 'authenticated');
      navigate('/');
      onClose();
    }
  };

  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const updateFormData = (data: Record<string, any>) => {
    setFormData((prev) => ({ ...prev, ...data }));
  };

  const isFirstStep = currentStep === 0;
  const isLastStep = currentStep === steps.length - 1;

  // Валидация шага
  const isStepValid = () => {
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
  };

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
          {React.cloneElement(steps[currentStep].component, {
            formData,
            updateFormData
          })}
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
};

export default WizardForm;