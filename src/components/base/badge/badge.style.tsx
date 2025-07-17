import { tv } from 'tailwind-variants'

export const badgeTv = tv({
  slots: {
    container: 'relative inline-flex items-center self-start',
    badge: 'absolute flex items-center justify-center',
    content: 'text-center text-xs whitespace-nowrap text-nowrap'
  },
  variants: {
    size: {
      small: {
        badge: 'px-[4px] py-[2px]'
      },
      medium: {
        badge: 'px-2 py-[2px]'
      },
      large: {
        badge: 'px-2 py-[2px]'
      }
    },
    color: {
      primary: {
        badge: 'bg-primary-500',
        content: 'text-white'
      },
      secondary: {
        badge: 'bg-secondary-500',
        content: 'text-white'
      },
      error: {
        badge: 'bg-error-500',
        content: 'text-white'
      },
      warning: {
        badge: 'bg-warning-500',
        content: 'text-white'
      },
      info: {
        badge: 'bg-info-500',
        content: 'text-white'
      },
      success: {
        badge: 'bg-success-500',
        content: 'text-white'
      }
    },
    variant: {
      dot: {
        badge: 'h-2 w-2 p-0 rounded-full top-[-2px] right-[-2px]',
        content: 'hidden'
      },
      standard: {
        badge: 'rounded-[4px] top-[-8px] right-[-8px]',
        content: 'mt-[1px]'
      },
      tonal: {
        badge: 'rounded-[4px] top-[-6px] right-[-6px]',
        content: 'mt-[1px]'
      }
    },
    invisible: {
      true: {
        badge: 'hidden'
      }
    }
  },
  compoundVariants: [
    {
      variant: 'tonal',
      color: 'primary',
      className: {
        badge: 'bg-primary-o-light',
        content: 'text-primary-500'
      }
    },
    {
      variant: 'tonal',
      color: 'secondary',
      className: {
        badge: 'bg-secondary-o-light',
        content: 'text-secondary-500'
      }
    },
    {
      variant: 'tonal',
      color: 'success',
      className: {
        badge: 'bg-success-o-light',
        content: 'text-success-500'
      }
    },
    {
      variant: 'tonal',
      color: 'error',
      className: {
        badge: 'bg-error-o-light',
        content: 'text-error-500'
      }
    },
    {
      variant: 'tonal',
      color: 'warning',
      className: {
        badge: 'bg-warning-o-light',
        content: 'text-warning-500'
      }
    },
    {
      variant: 'tonal',
      color: 'info',
      className: {
        badge: 'bg-info-o-light',
        content: 'text-info-500'
      }
    }
  ],
  defaultVariants: {
    size: 'medium',
    color: 'primary',
    variant: 'standard',
    invisible: false
  }
})
