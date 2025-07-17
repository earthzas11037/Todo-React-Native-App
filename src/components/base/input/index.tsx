import { inputTv } from '@/components/base/input/input.style'
import { Text } from '@/components/base/text'
import colors from '@/config/theme/colors'
import * as React from 'react'
import type { Control, FieldValues, Path, RegisterOptions } from 'react-hook-form'
import { useController } from 'react-hook-form'
import type { NativeSyntheticEvent, TextInputFocusEventData, TextInputProps } from 'react-native'
import { I18nManager, TextInput as NTextInput, StyleSheet, View } from 'react-native'
import { tv, VariantProps } from 'tailwind-variants'

type TextInputVariants = VariantProps<typeof inputTv>

export interface NInputProps extends TextInputVariants, Omit<TextInputProps, 'disabled'> {
  label?: string
  disabled?: boolean
  error?: boolean
  helperText?: string
  className?: string
  labelClassName?: string
  inputContainerClassName?: string
  inputClassName?: string
  helperTextClassName?: string
  startAdornment?: React.ReactNode
  endAdornment?: React.ReactNode
}

type TRule<T extends FieldValues> =
  | Omit<RegisterOptions<T>, 'disabled' | 'valueAsNumber' | 'valueAsDate' | 'setValueAs'>
  | undefined

export type RuleType<T extends FieldValues> = { [name in keyof T]: TRule<T> }
export type InputControllerType<T extends FieldValues> = {
  name: Path<T>
  control: Control<T>
  rules?: RuleType<T>
}

interface ControlledInputProps<T extends FieldValues> extends NInputProps, InputControllerType<T> {}

export const Input = React.forwardRef<NTextInput, NInputProps>((props, ref) => {
  const {
    label,
    color = 'primary',
    error,
    helperText,
    testID,
    placeholder,
    className,
    labelClassName,
    inputContainerClassName,
    inputClassName,
    helperTextClassName,
    disabled,
    startAdornment,
    endAdornment,
    onBlur: externalOnBlur,
    onFocus: externalOnFocus,
    ...inputProps
  } = props

  const id = React.useId()
  const [isFocussed, setIsFocussed] = React.useState(false)

  const handleBlur = React.useCallback(
    (e: NativeSyntheticEvent<TextInputFocusEventData>) => {
      setIsFocussed(false)
      if (externalOnBlur) {
        externalOnBlur(e)
      }
    },
    [externalOnBlur]
  )

  const handleFocus = React.useCallback(
    (e: NativeSyntheticEvent<TextInputFocusEventData>) => {
      setIsFocussed(true)
      if (externalOnFocus) {
        externalOnFocus(e)
      }
    },
    [externalOnFocus]
  )

  const styles = React.useMemo(
    () =>
      inputTv({
        error: Boolean(error),
        focused: isFocussed,
        disabled: Boolean(disabled),
        color
      }),
    [error, color, isFocussed, disabled]
  )

  return (
    <View className={styles.container({ className })}>
      {label && (
        <Text
          nativeID={`${id}-label`}
          accessibilityLabelledBy={id}
          testID={testID ? `${testID}-label` : undefined}
          className={styles.label({ className: labelClassName })}
        >
          {label}
        </Text>
      )}
      <View className={styles.inputContainer({ className: inputContainerClassName })}>
        {startAdornment && <View className='mr-2'>{startAdornment}</View>}
        <NTextInput
          accessibilityLabelledBy={`${id}-label`}
          accessibilityLabel={label}
          nativeID={id}
          testID={testID}
          ref={ref}
          placeholderTextColor={colors.text.disabled}
          placeholder={isFocussed ? undefined : placeholder}
          className={styles.input({ className: inputClassName })}
          onBlur={handleBlur}
          onFocus={handleFocus}
          selectionColor={colors.text.primary}
          autoComplete='off'
          autoCorrect={false}
          importantForAutofill='noExcludeDescendants'
          editable={!disabled}
          {...inputProps}
          style={StyleSheet.flatten([
            { writingDirection: I18nManager.isRTL ? 'rtl' : 'ltr' },
            { textAlign: I18nManager.isRTL ? 'right' : 'left' },
            inputProps.style
          ])}
        />
        {endAdornment && <View className='ml-2 justify-center'>{endAdornment}</View>}
      </View>
      {helperText && (
        <Text
          testID={testID ? `${testID}-helperText` : undefined}
          className={styles.helperText({ className: helperTextClassName })}
        >
          {helperText}
        </Text>
      )}
    </View>
  )
})

// only used with react-hook-form
export function ControlledInput<T extends FieldValues>(props: ControlledInputProps<T>) {
  const { name, control, rules, ...inputProps } = props

  const { field, fieldState } = useController({ control, name, rules })
  return (
    <Input
      ref={field.ref}
      autoCapitalize='none'
      onChangeText={field.onChange}
      value={(field.value as string) || ''}
      {...inputProps}
      error={!!fieldState.error}
      helperText={fieldState.error?.message}
    />
  )
}
