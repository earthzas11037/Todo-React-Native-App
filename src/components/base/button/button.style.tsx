import { tv } from 'tailwind-variants'

export const buttonTv = tv({
  slots: {
    container: 'flex flex-row items-center justify-center rounded-lg px-4',
    label: 'font-notoSansThai text-base font-medium',
    indicator: 'h-6 text-white',
    icon: ''
  },
  variants: {
    size: {
      small: {
        container: 'px-4 py-2',
        label: 'text-[12px]'
      },
      medium: {
        container: 'px-5 py-3',
        label: 'text-[12px]'
      },
      large: {
        container: 'px-6 py-4',
        label: 'text-[14px]'
      }
    },
    color: {
      primary: {
        container: 'bg-primary-500',
        label: 'text-white',
        indicator: 'text-white',
        icon: 'text-white'
      },
      secondary: {
        container: 'bg-secondary-500',
        label: 'text-white',
        indicator: 'text-white',
        icon: 'text-white'
      },
      success: {
        container: 'bg-success-500',
        label: 'text-white',
        icon: 'text-white'
      },
      error: {
        container: 'bg-error-500',
        label: 'text-white',
        icon: 'text-white'
      },
      info: {
        container: 'bg-info-500',
        label: 'text-white',
        icon: 'text-white'
      },
      warning: {
        container: 'bg-warning-500',
        label: 'text-white',
        icon: 'text-white'
      }
    },
    variant: {
      contained: {
        container: '',
        label: 'text-white',
        icon: 'text-white'
      },
      outlined: {
        container: 'border bg-transparent',
        label: 'text-primary-500',
        indicator: 'text-primary-500',
        icon: 'text-primary-500'
      },
      text: {
        container: 'bg-transparent',
        label: 'text-primary-500',
        indicator: 'text-primary-500',
        icon: 'text-primary-500'
      },
      tonal: {
        container: 'bg-primary-o-main',
        label: 'text-primary-500',
        icon: 'text-primary-500'
      }
    },
    disabled: {
      true: {
        container: '',
        label: '',
        indicator: ''
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
      disabled: true,
      className: {
        container: 'opacity-45'
      }
    },
    // {
    //   color: 'primary',
    //   variant: ['contained', 'text'],
    //   disabled: true,
    //   className: {
    //     container: 'bg-primary-o-light',
    //     label: 'text-primary-500',
    //     icon: 'text-primary-500'
    //   }
    // },
    // {
    //   color: 'secondary',
    //   variant: ['contained', 'text'],
    //   disabled: true,
    //   className: {
    //     container: 'bg-secondary-o-main',
    //     label: 'text-secondary-900',
    //     icon: 'text-secondary-900'
    //   }
    // },
    // {
    //   color: 'success',
    //   variant: ['contained', 'text'],
    //   disabled: true,
    //   className: {
    //     container: 'bg-success-o-main',
    //     label: 'text-success-900',
    //     icon: 'text-success-900'
    //   }
    // },
    // {
    //   color: 'error',
    //   variant: ['contained', 'text'],
    //   disabled: true,
    //   className: {
    //     container: 'bg-error-o-main',
    //     label: 'text-error-900',
    //     icon: 'text-error-900'
    //   }
    // },
    // {
    //   color: 'info',
    //   variant: ['contained', 'text'],
    //   disabled: true,
    //   className: {
    //     container: 'bg-info-o-main',
    //     label: 'text-info-900',
    //     icon: 'text-info-900'
    //   }
    // },
    // {
    //   color: 'warning',
    //   variant: ['contained', 'text'],
    //   disabled: true,
    //   className: {
    //     container: 'bg-warning-o-main',
    //     label: 'text-warning-900',
    //     icon: 'text-warning-900'
    //   }
    // },
    ////
    // {
    //   color: 'primary',
    //   variant: 'outlined',
    //   disabled: true,
    //   className: {
    //     container: 'border-0 opacity-45',
    //     label: 'text-white',
    //     icon: 'text-white'
    //   }
    // },
    // {
    //   color: 'secondary',
    //   variant: 'outlined',
    //   disabled: true,
    //   className: {
    //     container: 'bg-secondary-500 border-0 opacity-45',
    //     label: 'text-white',
    //     icon: 'text-white'
    //   }
    // },
    // {
    //   color: 'success',
    //   variant: 'outlined',
    //   disabled: true,
    //   className: {
    //     container: 'bg-success-500 border-0 opacity-45',
    //     label: 'text-white',
    //     icon: 'text-white'
    //   }
    // },
    // {
    //   color: 'error',
    //   variant: 'outlined',
    //   disabled: true,
    //   className: {
    //     container: 'bg-error-500 border-0 opacity-45',
    //     label: 'text-white',
    //     icon: 'text-white'
    //   }
    // },
    // {
    //   color: 'info',
    //   variant: 'outlined',
    //   disabled: true,
    //   className: {
    //     container: 'bg-info-500 border-0 opacity-45',
    //     label: 'text-white',
    //     icon: 'text-white'
    //   }
    // },
    // {
    //   color: 'warning',
    //   variant: 'outlined',
    //   disabled: true,
    //   className: {
    //     container: 'bg-warning-500 border-0 opacity-45',
    //     label: 'text-white',
    //     icon: 'text-white'
    //   }
    // },
    ////
    {
      color: 'primary',
      variant: 'outlined',
      // disabled: false,
      className: {
        container: 'border-primary-500',
        label: 'text-primary-500',
        icon: 'text-primary-500'
      }
    },
    {
      color: 'secondary',
      variant: 'outlined',
      // disabled: false,
      className: {
        container: 'border-secondary-500',
        label: 'text-secondary-500',
        icon: 'text-secondary-500'
      }
    },
    {
      color: 'success',
      variant: 'outlined',
      // disabled: false,
      className: {
        container: 'border-success-500',
        label: 'text-success-500',
        icon: 'text-success-500'
      }
    },
    {
      color: 'error',
      variant: 'outlined',
      // disabled: false,
      className: {
        container: 'border-error-500',
        label: 'text-error-500',
        icon: 'text-error-500'
      }
    },
    {
      color: 'info',
      variant: 'outlined',
      // disabled: false,
      className: {
        container: 'border-info-500',
        label: 'text-info-500',
        icon: 'text-info-500'
      }
    },
    {
      color: 'warning',
      variant: 'outlined',
      // disabled: false,
      className: {
        container: 'border-warning-500',
        label: 'text-warning-500',
        icon: 'text-warning-500'
      }
    },
    ////
    {
      color: 'primary',
      variant: 'text',
      disabled: false,
      className: {
        container: 'border-primary-500'
      }
    },
    {
      color: 'secondary',
      variant: 'text',
      disabled: false,
      className: {
        label: 'text-secondary-500',
        icon: 'text-secondary-500'
      }
    },
    {
      color: 'success',
      variant: 'text',
      disabled: false,
      className: {
        label: 'text-success-500',
        icon: 'text-success-500'
      }
    },
    {
      color: 'error',
      variant: 'text',
      disabled: false,
      className: {
        label: 'text-error-500',
        icon: 'text-error-500'
      }
    },
    {
      color: 'info',
      variant: 'text',
      disabled: false,
      className: {
        label: 'text-info-500',
        icon: 'text-info-500'
      }
    },
    {
      color: 'warning',
      variant: 'text',
      disabled: false,
      className: {
        label: 'text-warning-500',
        icon: 'text-warning-500'
      }
    },
    ////
    {
      color: 'primary',
      variant: 'tonal',
      disabled: false,
      className: {
        container: 'bg-primary-o-main'
      }
    },
    {
      color: 'secondary',
      variant: 'tonal',
      disabled: false,
      className: {
        container: 'bg-secondary-o-main',
        label: 'text-secondary-500',
        icon: 'text-secondary-500'
      }
    },
    {
      color: 'success',
      variant: 'tonal',
      disabled: false,
      className: {
        container: 'bg-success-o-main',
        label: 'text-success-500',
        icon: 'text-success-500'
      }
    },
    {
      color: 'error',
      variant: 'tonal',
      disabled: false,
      className: {
        container: 'bg-error-o-main',
        label: 'text-error-500',
        icon: 'text-error-500'
      }
    },
    {
      color: 'info',
      variant: 'tonal',
      disabled: false,
      className: {
        container: 'bg-info-o-main',
        label: 'text-info-500',
        icon: 'text-info-500'
      }
    },
    {
      color: 'warning',
      variant: 'tonal',
      disabled: false,
      className: {
        container: 'bg-warning-o-main',
        label: 'text-warning-500',
        icon: 'text-warning-500'
      }
    }
  ],
  defaultVariants: {
    variant: 'contained',
    size: 'medium',
    color: 'primary',
    disabled: false
  }
})
