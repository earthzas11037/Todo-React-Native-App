import { tv } from 'tailwind-variants'

export const tagTv = tv({
  slots: {
    container: 'flex flex-row items-center justify-center rounded-full px-3 py-1 self-start',
    label: 'font-medium',
    icon: 'mr-1'
  },
  variants: {
    size: {
      small: {
        container: 'text-sm px-2',
        label: 'text-xs',
        icon: ''
      },
      medium: {
        container: 'text-base px-3',
        label: 'text-sm',
        icon: ''
      },
      large: {
        container: 'text-lg px-4',
        label: 'text-base',
        icon: ''
      }
    },
    color: {
      default: {
        container: 'bg-[#EEEDF0] text-white',
        label: 'text-text-primary',
        icon: 'text-text-primary'
      },
      primary: {
        container: 'bg-primary-500 text-white',
        label: 'text-white',
        icon: 'text-white'
      },
      secondary: {
        container: 'bg-secondary-500 text-white',
        label: 'text-white',
        icon: 'text-white'
      },
      success: {
        container: 'bg-success-500 text-white',
        label: 'text-white',
        icon: 'text-white'
      },
      error: {
        container: 'bg-error-500 text-white',
        label: 'text-white',
        icon: 'text-white'
      },
      warning: {
        container: 'bg-warning-500 text-white',
        label: 'text-white',
        icon: 'text-white'
      },
      info: {
        container: 'bg-info-500 text-white',
        label: 'text-white',
        icon: 'text-white'
      }
    },
    variant: {
      filled: {
        container: ''
      },
      outlined: {
        container: 'border border-current bg-transparent',
        label: 'text-current',
        icon: 'text-current'
      },
      tonal: {
        container: 'bg-gray-100 text-gray-800',
        label: 'text-gray-800'
      }
    },
    disabled: {
      true: {
        container: 'opacity-50 pointer-events-none',
        label: 'opacity-50',
        icon: 'opacity-50'
      }
    }
  },
  defaultVariants: {
    size: 'medium',
    color: 'default',
    variant: 'filled',
    disabled: false
  }
})
