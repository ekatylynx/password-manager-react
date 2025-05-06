export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  placeholder?: string;
  className?: string;
  value?: string;
  variant?: 'primary' | 'danger' | 'outline' | 'gray';
  inputType?: string;
}