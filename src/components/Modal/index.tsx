import React, { useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';

import './index.scss';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
  title?: string;
  inertBackground?: boolean; // Фон модалки инертный или нет
  closeOnOverlayClick?: boolean; // Зкрывать ли при клике на оверлей
  className?: string; // Доп классы для модального окна
  variant?: 'primary' | 'error' | ''; // Варианты стилей модалки
}

const Modal: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  children,
  title,
  inertBackground = true,
  closeOnOverlayClick = true,
  className = '',
  variant = ''
}) => {
  const modalRef = useRef<HTMLDivElement>(null);

  // Закрытие по клавише Esc
  useEffect(() => {
    const handleEsc = (event: KeyboardEvent) => {
      if (event.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, [isOpen, onClose]);

  // Установка фокуса на модальное окно для доступности
  useEffect(() => {
    if (isOpen && modalRef.current) {
      modalRef.current.focus();
    }
  }, [isOpen]);

  // Управление инертностью фона
  useEffect(() => {
    if (inertBackground && isOpen) {
      document.body.style.overflow = 'hidden'; // Блокируем прокрутку
      const mainContent = document.querySelector('main');
      if (mainContent) {
        mainContent.setAttribute('inert', '');
      }
    }
    return () => {
      document.body.style.overflow = '';
      const mainContent = document.querySelector('main');
      if (mainContent) {
        mainContent.removeAttribute('inert');
      }
    };
  }, [inertBackground, isOpen]);

  if (!isOpen) return null;

  // Обработчик клика по оверлею
  const handleOverlayClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (closeOnOverlayClick && e.target === e.currentTarget) {
      onClose();
    }
  };

  return createPortal(
    <div className={`modal-overlay ${variant}`} onClick={handleOverlayClick}>
      <div
        className={`modal-content ${className}`}
        ref={modalRef}
        role="dialog"
        aria-labelledby={title ? 'modal-title' : undefined}
        tabIndex={-1}
      >
        {title && (
          <>
            <div className="modal-header">
              
              <h2 id="modal-title" className="modal-title">
                {title}
              </h2>
              <button
                className="modal-close-button"
                onClick={onClose}
                aria-label="Закрыть модальное окно"
              >
                ×
              </button>
            </div>
            <div className='line'></div>
          </>
          
        )}
        <div className="modal-body">{children}</div>
      </div>
    </div>,
    document.body
  );
};

export default Modal;