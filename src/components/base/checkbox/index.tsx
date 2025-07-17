import { MotiView } from 'moti'
import React, { useCallback, useEffect, useRef } from 'react'
import { Animated, I18nManager, Pressable, type PressableProps, View } from 'react-native'
import colors from '@/config/theme/colors'
import { Text } from '@/components/base/text'
import { VariantProps } from 'tailwind-variants'
import CustomIcon from '@/components/base/icon'
import { checkboxTv } from '@/components/base/checkbox/checkbox.style'

const SIZE = 18
const WIDTH = 50
const HEIGHT = 28
const THUMB_HEIGHT = 22
const THUMB_WIDTH = 22
const THUMB_OFFSET = 4

type CheckboxVariants = VariantProps<typeof checkboxTv>

export interface RootProps extends CheckboxVariants, Omit<PressableProps, 'onPress'> {
  onChange: (checked: boolean) => void
  checked?: boolean
  className?: string
  accessibilityLabel?: string
}

export type IconProps = {
  checked: boolean
  disabled?: boolean | null | undefined
  color?: 'primary' | 'secondary' | 'error' | 'info' | 'success' | 'warning'
}

export const Root = ({ checked = false, children, onChange, disabled, className = '', ...props }: RootProps) => {
  const handleChange = useCallback(() => {
    onChange(!checked)
  }, [onChange, checked])

  return (
    <Pressable
      onPress={handleChange}
      className={`flex-row items-center ${className} ${disabled ? 'opacity-50' : ''}`}
      accessibilityState={{ checked }}
      disabled={disabled}
      {...props}
    >
      {children}
    </Pressable>
  )
}

type LabelProps = {
  text: string
  className?: string
  testID?: string
}

const Label = ({ text, testID, className = '' }: LabelProps) => {
  return (
    <Text testID={testID} className={` ${className} pl-[6px]`}>
      {text}
    </Text>
  )
}

export const CheckboxIcon = ({ checked = false, color = 'primary', disabled }: IconProps) => {
  const _color = checked ? colors[color][500] : colors.text.disabled
  return (
    <MotiView
      style={{
        height: SIZE,
        width: SIZE,
        borderColor: _color,
        shadowColor: colors.primary[500],
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: checked ? 0.25 : 0,
        shadowRadius: 3.84,
        elevation: 5
      }}
      className='items-center justify-center rounded-[5px] border-2'
      from={{ backgroundColor: 'transparent', borderColor: '#CCCFD6' }}
      animate={{
        backgroundColor: checked ? _color : 'transparent',
        borderColor: _color
      }}
      transition={{
        backgroundColor: { type: 'timing', duration: 100 },
        borderColor: { type: 'timing', duration: 100 }
      }}
    >
      <MotiView
        from={{ opacity: 0 }}
        animate={{ opacity: checked ? 1 : 0 }}
        transition={{ opacity: { type: 'timing', duration: 100 } }}
      >
        <CustomIcon name='IconCheck' size={16} color='white' />
      </MotiView>
    </MotiView>
  )
}

const CheckboxRoot = ({ checked = false, children, ...props }: RootProps) => {
  return (
    <Root checked={checked} accessibilityRole='checkbox' {...props}>
      {children}
    </Root>
  )
}

const CheckboxBase = ({
  checked = false,
  testID,
  label,
  color = 'primary',
  ...props
}: RootProps & { label?: string }) => {
  return (
    <CheckboxRoot checked={checked} testID={testID} color={color} {...props}>
      <CheckboxIcon checked={checked} color={color} />
      {label ? <Label text={label} testID={testID ? `${testID}-label` : undefined} className='pr-2' /> : null}
    </CheckboxRoot>
  )
}

export const Checkbox = Object.assign(CheckboxBase, {
  Icon: CheckboxIcon,
  Root: CheckboxRoot,
  Label
})

export const RadioIcon = ({ checked = false, color = 'primary', disabled }: IconProps) => {
  const borderColor = checked ? colors[color][500] : disabled ? colors.gray.o.light : colors.text.disabled
  const innerColor = !disabled ? 'transparent' : checked ? colors[color][500] : colors.gray.o.light
  return (
    <View
      style={[
        {
          height: SIZE,
          width: SIZE,
          borderWidth: checked || (!checked && disabled) ? 5 : 2,
          justifyContent: 'center',
          alignItems: 'center',
          borderRadius: SIZE / 2,
          backgroundColor: 'transparent',
          shadowOffset: { width: 0, height: 2 },
          shadowRadius: 3.84,
          elevation: 5,
          borderColor: borderColor,
          shadowColor: disabled ? 'transparent' : colors[color][500],
          shadowOpacity: checked ? 0.25 : 0
        }
      ]}
    >
      {checked || disabled ? (
        <View
          style={[
            {
              height: 8,
              width: 8,
              borderRadius: 4
            },
            { backgroundColor: innerColor }
          ]}
        />
      ) : null}
    </View>
  )
}

const RadioRoot = ({ checked = false, children, ...props }: RootProps) => {
  return (
    <Root checked={checked} accessibilityRole='radio' {...props}>
      {children}
    </Root>
  )
}

const RadioBase = ({
  checked = false,
  testID,
  label,
  color = 'primary',
  disabled,
  ...props
}: RootProps & { label?: string }) => {
  return (
    <RadioRoot checked={checked} testID={testID} {...props}>
      <RadioIcon checked={checked} color={color} disabled={disabled} />
      {label ? <Label text={label} testID={testID ? `${testID}-label` : undefined} /> : null}
    </RadioRoot>
  )
}

export const Radio = Object.assign(RadioBase, {
  Icon: RadioIcon,
  Root: RadioRoot,
  Label
})

export const SwitchIcon = ({ checked = false }: IconProps) => {
  const translateX = useRef(new Animated.Value(checked ? THUMB_OFFSET : WIDTH - THUMB_WIDTH - THUMB_OFFSET)).current
  const backgroundColor = checked ? colors.primary[500] : colors.text.disabled

  useEffect(() => {
    Animated.timing(translateX, {
      toValue: checked ? THUMB_OFFSET : WIDTH - THUMB_WIDTH - THUMB_OFFSET,
      duration: 150,
      useNativeDriver: true
    }).start()
  }, [checked])

  return (
    <View className='w-[50px] justify-center'>
      <View className='overflow-hidden rounded-full'>
        <View
          style={{
            width: WIDTH,
            height: HEIGHT,
            backgroundColor
          }}
        />
      </View>
      <Animated.View
        style={{
          height: THUMB_HEIGHT,
          width: THUMB_WIDTH,
          position: 'absolute',
          backgroundColor: 'white',
          borderRadius: 13,
          right: 0,
          transform: [
            {
              translateX: I18nManager.isRTL ? translateX : Animated.multiply(translateX, -1)
            }
          ]
        }}
      />
    </View>
  )
}

const SwitchRoot = ({ checked = false, children, ...props }: RootProps) => {
  return (
    <Root checked={checked} accessibilityRole='switch' {...props}>
      {children}
    </Root>
  )
}

const SwitchBase = ({ checked = false, testID, label, ...props }: RootProps & { label?: string }) => {
  return (
    <SwitchRoot checked={checked} testID={testID} {...props}>
      <SwitchIcon checked={checked} />
      {label ? <Label text={label} testID={testID ? `${testID}-label` : undefined} /> : null}
    </SwitchRoot>
  )
}

export const Switch = Object.assign(SwitchBase, {
  Icon: SwitchIcon,
  Root: SwitchRoot,
  Label
})
