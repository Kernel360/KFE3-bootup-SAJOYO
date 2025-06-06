import React, { useCallback, useEffect } from 'react';
import { FiX } from 'react-icons/fi';
import { Button } from '../Button/Button';

export interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  children: React.ReactNode;
  onConfirm?: () => void;
  onCancel?: () => void;
  confirmText?: string;
  cancelText?: string;
  buttonLayout?: 'horizontal' | 'vertical';
  hideActions?: boolean;
  closeOnBackdropClick?: boolean;
  closeOnEscape?: boolean;
  ariaLabel?: string;
  className?: string;
}

export const Modal: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  title,
  children,
  onConfirm,
  onCancel,
  confirmText = '확인',
  cancelText = '취소',
  buttonLayout = 'horizontal',
  hideActions = false,
  closeOnBackdropClick = true,
  closeOnEscape = true,
  ariaLabel,
  className = '',
  ...props
}) => {
  // 🔧 ESC 키 이벤트 처리
  const handleEscape = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === 'Escape' && closeOnEscape) {
        onClose();
      }
    },
    [closeOnEscape, onClose]
  );

  // 배경 클릭 시
  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget && closeOnBackdropClick) {
      onClose();
    }
  };

  // 확인
  const handleConfirm = () => {
    if (onConfirm) {
      onConfirm();
    } else {
      onClose();
    }
  };

  // 취소
  const handleCancel = () => {
    if (onCancel) {
      onCancel();
    } else {
      onClose();
    }
  };

  // 모달이 열릴 때
  useEffect(() => {
    if (!isOpen) return;

    // body 스크롤 방지
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    // ESC 키 이벤트 리스너 등록
    if (closeOnEscape) {
      document.addEventListener('keydown', handleEscape);
    }

    // 첫 번째 focusable 요소에 포커스
    const modal = document.querySelector('[data-modal="true"]');
    if (modal) {
      const focusableElements = modal.querySelectorAll(
        'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
      );
      const firstElement = focusableElements[0] as HTMLElement;
      if (firstElement) {
        setTimeout(() => firstElement.focus(), 100); // 애니메이션 후 포커스
      }
    }

    // 클린업
    return () => {
      document.body.style.overflow = originalOverflow;
      if (closeOnEscape) {
        document.removeEventListener('keydown', handleEscape);
      }
    };
  }, [isOpen, closeOnEscape, handleEscape]);

  // 모달이 닫혀있으면 렌더링하지 않음
  if (!isOpen) return null;

  return (
    <div
      className='fixed inset-0 z-[var(--z-modal-backdrop)] flex items-end justify-center'
      style={{ zIndex: 'var(--z-modal-backdrop)' }}
    >
      {/* 배경 오버레이 */}
      <div
        className='fixed inset-0 bg-[var(--modal-backdrop)] animate-fade-in'
        onClick={handleBackdropClick}
        aria-hidden='true'
      />

      {/* 바텀 모달 컨테이너 */}
      <div
        data-modal='true'
        className={`
          relative bg-white
          w-[310px] mx-auto mb-0
          pt-[30px] pb-[35px] px-[25px]
          animate-slide-up
          ${className}
        `}
        style={{
          borderRadius: '18px 18px 0px 0px',
          boxShadow: '3px 3px 15px 0px rgba(0, 0, 0, 0.10)',
          zIndex: 'var(--z-modal)',
        }}
        role='dialog'
        aria-modal='true'
        aria-label={ariaLabel || title}
        {...props}
      >
        {/* 닫기 버튼 (우상단 고정) */}
        <button
          onClick={onClose}
          className='
            absolute top-[15px] right-[15px]
            p-2 rounded-lg
            text-[var(--color-sub-body)] 
            hover:text-[var(--color-body)]
            hover:bg-[var(--color-background)]
            transition-colors duration-200
            focus:outline-none focus:ring-2 
            focus:ring-[var(--color-main)] focus:ring-offset-2
          '
          aria-label='모달 닫기'
        >
          <FiX width={20} height={20} />
        </button>

        {/* 제목 */}
        {title && (
          <div className='mb-4'>
            <h2 className='text-h2 text-[var(--color-title)] text-center'>{title}</h2>
          </div>
        )}

        {/* 본문 */}
        <div className='mb-6 text-center'>{children}</div>

        {/* 액션 버튼 */}
        {!hideActions && (onConfirm || onCancel) && (
          <div className={buttonLayout === 'vertical' ? 'space-y-3' : 'flex gap-3'}>
            {buttonLayout === 'vertical' ? (
              // 세로 레이아웃 (확인 버튼이 위에)
              <>
                {onConfirm && (
                  <Button
                    variant='primary'
                    onClick={handleConfirm}
                    className='w-full' // 패딩 제외한 전체 너비
                  >
                    {confirmText}
                  </Button>
                )}

                {onCancel && (
                  <Button variant='secondary' onClick={handleCancel} className='w-full'>
                    {cancelText}
                  </Button>
                )}
              </>
            ) : (
              // 가로 레이아웃
              <>
                {onCancel && (
                  <Button
                    variant='secondary'
                    onClick={handleCancel}
                    className='flex-1' // 동일한 너비로 분할
                  >
                    {cancelText}
                  </Button>
                )}

                {onConfirm && (
                  <Button variant='primary' onClick={handleConfirm} className='flex-1'>
                    {confirmText}
                  </Button>
                )}
              </>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Modal;
