import { tv } from 'tailwind-variants'

export const sliderTv = tv({
  base: 'w-full',
  variants: {
    color: {
      primary: 'bg-primary-500',
      secondary: 'bg-secondary-500',
      success: 'bg-success-500',
      error: 'bg-error-500',
      warning: 'bg-warning-500',
      info: 'bg-info-500'
    },
    size: {
      small: 'h-1',
      medium: 'h-2',
      large: 'h-3'
    }
  },
  defaultVariants: {
    color: 'primary',
    size: 'medium'
  }
})
