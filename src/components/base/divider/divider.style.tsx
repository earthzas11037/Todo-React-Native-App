import { tv } from 'tailwind-variants'

export const dividerTv = tv({
  slots: {
    container: 'flex items-center justify-center w-full',
    line: 'flex-1 border-t',
    label: 'px-2 text-sm font-normal'
  },
  variants: {
    orientation: {
      horizontal: {
        container: 'flex-row',
        line: ''
      },
      vertical: {
        container: 'flex-col h-full w-auto',
        line: 'border-l h-full'
      }
    },
    color: {
      default: {
        line: 'border-divider',
        label: 'text-primary'
      },
      primary: {
        line: 'border-primary-500',
        label: 'text-primary-500'
      },
      secondary: {
        line: 'border-secondary-500',
        label: 'text-secondary-500'
      },
      success: {
        line: 'border-success-500',
        label: 'text-success-500'
      },
      error: {
        line: 'border-error-500',
        label: 'text-error-500'
      },
      warning: {
        line: 'border-warning-500',
        label: 'text-warning-500'
      },
      info: {
        line: 'border-info-500',
        label: 'text-info-500'
      }
    },
    thickness: {
      thin: {
        line: 'border-[0.5px]'
      },
      medium: {
        line: 'border-[1px]'
      },
      thick: {
        line: 'border-[1.5px]'
      }
    },
    variant: {
      solid: {
        line: ''
      },
      dashed: {
        // line: 'border-dashed' // Not working
      },
      dotted: {
        // line: 'border-dotted' // Not working
      }
    }
  },
  defaultVariants: {
    orientation: 'horizontal',
    color: 'default',
    thickness: 'thin',
    variant: 'solid'
  }
})
