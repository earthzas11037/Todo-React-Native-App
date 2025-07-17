import { tv } from 'tailwind-variants'

export const inputTv = tv({
  slots: {
    container: '',
    label: 'text-text-primary mb-1 text-base',
    inputContainer: 'rounded-lg bg-white px-4 py-2 min-h-[50px] flex flex-row',
    input: 'flex-1 font-notoSansThai text-[14px] font-normal leading-normal',
    helperText: 'text-base text-error-500 mt-1'
  },
  variants: {
    focused: {
      true: {
        inputContainer: 'border-primary-500 border'
      },
      false: {
        inputContainer: 'shadow-none border border-neutral-300'
      }
    },
    color: {
      primary: {
        label: '',
        inputContainer: '',
        helperText: ''
      },
      secondary: {
        label: 'text-secondary-500',
        inputContainer: 'border-secondary-500',
        helperText: 'text-secondary-500'
      },
      error: {
        label: 'text-error-500',
        inputContainer: 'border-error-500',
        helperText: 'text-error-500'
      },
      info: {
        label: 'text-info-500',
        inputContainer: 'border-info-500',
        helperText: 'text-info-500'
      },
      success: {
        label: 'text-success-500',
        inputContainer: 'border-success-500',
        helperText: 'text-success-500'
      },
      warning: {
        label: 'text-warning-500',
        inputContainer: 'border-warning-500',
        helperText: 'text-warning-500'
      }
    },
    error: {
      true: {
        inputContainer: 'border-error-500',
        label: 'text-error-500'
      }
    },
    disabled: {
      true: {
        label: 'text-text-disabled',
        inputContainer: 'bg-action-hover text-text-disabled border-outline-border',
        input: 'text-text-disabled',
        helperText: 'text-text-disabled'
      }
    }
  },
  compoundVariants: [
    {
      color: ['secondary', 'error', 'info', 'success', 'warning'],
      focused: true,
      className: {
        inputContainer: 'shadow-none'
      }
    }
  ],
  defaultVariants: {
    focused: false,
    error: false,
    disabled: false
  }
})
