import { tv } from 'tailwind-variants'

export const checkboxTv = tv({
  base: 'flex items-center justify-center rounded-md',
  variants: {
    color: {
      primary: 'border-primary-500 bg-primary-500',
      secondary: 'border-secondary-500 bg-secondary-500',
      error: 'border-red-500 bg-red-500',
      info: 'border-blue-500 bg-blue-500',
      success: 'border-green-500 bg-green-500',
      warning: 'border-yellow-500 bg-yellow-500'
    },
    checked: {
      true: '',
      false: 'bg-transparent'
    }
  },
  defaultVariants: {
    color: 'primary',
    checked: false
  }
})
