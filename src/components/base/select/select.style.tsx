import { tv } from 'tailwind-variants'

export const selectTv = tv({
  slots: {
    container: '',
    label: 'text-text-primary mb-1 text-base',
    selectContainer: 'rounded-lg bg-white px-4 py-3 flex flex-row justify-between items-center',
    option: 'px-4 py-2 text-text-primary',
    helperText: 'text-base text-error-500 mt-1',
    searchInput: 'border border-neutral-300 rounded-lg px-3 py-2 mb-2'
  },
  variants: {
    focused: {
      true: {
        selectContainer: 'border-primary-500 border'
      },
      false: {
        selectContainer: 'shadow-none border border-neutral-300'
      }
    },
    error: {
      true: {
        selectContainer: 'border-error-500',
        label: 'text-error-500'
      }
    },
    disabled: {
      true: {
        label: 'text-text-disabled',
        selectContainer: 'bg-action-hover text-text-disabled border-outline-border',
        helperText: 'text-text-disabled'
      }
    }
  },
  defaultVariants: {
    focused: false,
    error: false,
    disabled: false
  }
})
