import { Platform } from 'react-native'
import { tv } from 'tailwind-variants'

export const textTv = tv({
  base: 'font-notoSansThai text-base text-text-primary mt-[1px]', // Base styles
  variants: {
    variant: Platform.select({
      ios: {
        Header1: 'text-[19px] font-semibold',
        Header2: 'text-[19px] font-semibold',
        Title: 'text-[16px] font-semibold',
        Subtitle: 'text-[14px] font-semibold',
        Button: 'text-[14px] font-medium',
        Body: 'text-[14px] font-normal',
        CaptionSemiBold: 'text-[14px] font-semibold',
        CaptionRegular: 'text-[14px] font-normal',
        Support: 'text-[10px] font-semibold',
        Time: 'text-[10px] font-normal italic'
      },
      android: {
        Header1: `text-[21px] font-semibold`,
        Header2: 'text-[21px] font-semibold',
        Title: 'text-[18px] font-semibold',
        Subtitle: 'text-[16px] font-semibold',
        Button: 'text-[16px] font-medium',
        Body: 'text-[16px] font-normal',
        CaptionSemiBold: 'text-[16px] font-semibold',
        CaptionRegular: 'text-[16px] font-normal',
        Support: 'text-[12px] font-semibold',
        Time: 'text-[12px] font-normal italic'
      },
      default: {
        Header1: 'text-[19px] font-semibold',
        Header2: 'text-[19px] font-semibold',
        Title: 'text-[16px] font-semibold',
        Subtitle: 'text-[14px] font-semibold',
        Button: 'text-[14px] font-medium',
        Body: 'text-[14px] font-normal',
        CaptionSemiBold: 'text-[14px] font-semibold',
        CaptionRegular: 'text-[14px] font-normal',
        Support: 'text-[10px] font-semibold',
        Time: 'text-[10px] font-normal italic'
      }
    }),
    color: {
      primary: 'text-primary-500',
      secondary: 'text-secondary-500',
      success: 'text-success-500',
      error: 'text-error-500',
      warning: 'text-warning-500',
      info: 'text-info-500',
      textPrimary: 'text-text-primary',
      textSecondary: 'text-text-secondary',
      inherit: '' // Allows inherited color
    }
  },
  defaultVariants: {
    variant: 'Body', // Default variant
    color: 'textPrimary' // Default color
  }
})
