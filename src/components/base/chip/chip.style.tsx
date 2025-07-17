import { tv } from 'tailwind-variants'

export const chipTv = tv({
  slots: {
    container: 'flex flex-row items-center justify-center rounded-md self-start',
    label: 'font-normal',
    icon: 'mr-1',
    deleteIcon: 'ml-1 text-white'
  },
  variants: {
    size: {
      small: {
        container: 'px-[8px] py-[2px]',
        label: 'text-sm',
        icon: '',
        deleteIcon: ''
      },
      medium: {
        container: 'px-[8px] py-[6px]',
        label: 'text-base',
        icon: '',
        deleteIcon: ''
      },
      large: {
        container: 'px-[8px] py-[10px]',
        label: 'text-lg',
        icon: '',
        deleteIcon: ''
      }
    },
    color: {
      default: {
        container: 'bg-gray-o-lighter text-text-primary',
        label: 'text-text-primary',
        icon: 'text-action-active',
        deleteIcon: ' text-action-active'
      },
      primary: {
        container: 'bg-primary-500 text-white',
        label: 'text-white',
        icon: 'text-primary-500',
        deleteIcon: 'text-primary-500'
      },
      secondary: {
        container: 'bg-secondary-500 text-white',
        label: 'text-white',
        icon: 'text-secondary-500',
        deleteIcon: 'text-secondary-500'
      },
      success: {
        container: 'bg-success-500 text-white',
        label: 'text-white',
        icon: 'text-success-500',
        deleteIcon: 'text-success-500'
      },
      error: {
        container: 'bg-error-500 text-white',
        label: 'text-white',
        icon: 'text-error-500',
        deleteIcon: 'text-error-500'
      },
      warning: {
        container: 'bg-warning-500 text-white',
        label: 'text-white',
        icon: 'text-warning-500',
        deleteIcon: 'text-warning-500'
      },
      info: {
        container: 'bg-info-500 text-white',
        label: 'text-white',
        icon: 'text-info-500',
        deleteIcon: 'text-info-500'
      }
    },
    variant: {
      filled: {
        container: ''
      },
      outlined: {
        container: 'border border-current bg-transparent',
        label: 'text-current',
        icon: 'text-current',
        deleteIcon: 'text-current'
      },
      tonal: {
        container: 'bg-gray-100 text-gray-800',
        label: 'text-gray-800'
      }
    },
    disabled: {
      true: {
        container: 'opacity-50',
        label: 'opacity-50',
        icon: 'opacity-50',
        deleteIcon: 'opacity-50'
      }
    },
    fullWidth: {
      true: {
        container: 'self-stretch'
      },
      false: {
        container: 'self-start'
      }
    }
  },
  compoundVariants: [
    {
      color: ['primary', 'secondary', 'success', 'error', 'info', 'warning'],
      variant: 'filled',
      disabled: false,
      className: {
        icon: 'text-white',
        deleteIcon: 'text-white'
      }
    },
    {
      color: 'primary',
      variant: 'outlined',
      disabled: false,
      className: {
        container: 'border-primary-500'
      }
    },
    {
      color: 'secondary',
      variant: 'outlined',
      disabled: false,
      className: {
        container: 'border-secondary-500',
        label: 'text-secondary-500'
      }
    },
    {
      color: 'success',
      variant: 'outlined',
      disabled: false,
      className: {
        container: 'border-success-500',
        label: 'text-success-500'
      }
    },
    {
      color: 'error',
      variant: 'outlined',
      disabled: false,
      className: {
        container: 'border-error-500',
        label: 'text-error-500'
      }
    },
    {
      color: 'info',
      variant: 'outlined',
      disabled: false,
      className: {
        container: 'border-info-500',
        label: 'text-info-500'
      }
    },
    {
      color: 'warning',
      variant: 'outlined',
      disabled: false,
      className: {
        container: 'border-warning-500',
        label: 'text-warning-500'
      }
    },
    {
      color: 'primary',
      variant: 'tonal',
      disabled: false,
      className: {
        container: 'bg-primary-o-main border border-primary-500',
        label: 'text-primary-500'
      }
    },
    {
      color: 'secondary',
      variant: 'tonal',
      disabled: false,
      className: {
        container: 'bg-secondary-o-main border border-secondary-500',
        label: 'text-secondary-500'
      }
    },
    {
      color: 'success',
      variant: 'tonal',
      disabled: false,
      className: {
        container: 'bg-success-o-main border border-success-500',
        label: 'text-success-500'
      }
    },
    {
      color: 'error',
      variant: 'tonal',
      disabled: false,
      className: {
        container: 'bg-error-o-main border border-error-500',
        label: 'text-error-500'
      }
    },
    {
      color: 'info',
      variant: 'tonal',
      disabled: false,
      className: {
        container: 'bg-info-o-main border border-info-500',
        label: 'text-info-500'
      }
    },
    {
      color: 'warning',
      variant: 'tonal',
      disabled: false,
      className: {
        container: 'bg-warning-o-main border border-warning-500',
        label: 'text-warning-500'
      }
    }
  ],
  defaultVariants: {
    size: 'medium',
    color: 'default',
    variant: 'filled',
    disabled: false
  }
})
