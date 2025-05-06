export interface FormData {
  step1?: { choice: 'create' | 'upload' };
  stepCreatePassword?: { password: string };
  stepCreateSaveFile?: { saved?: boolean; error?: string };
  stepUploadFile?: { fileName: string; file: File };
  stepUploadPassword?: { password: string; decryptedData?: string; success?: boolean; error?: string };
}

export interface StepProps {
  formData: FormData;
  updateFormData: (data: Partial<FormData>) => void;
}

export interface WizardStep {
  title: string;
  component: React.ComponentType<StepProps>;
}

export interface WizardFormProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: FormData) => void;
  initialData?: Partial<FormData>;
}