import { Text } from '@/components/base/text'
import colors from '@/config/theme/colors'
import * as React from 'react'
import { View, TouchableOpacity, ActivityIndicator, Pressable } from 'react-native'
import { VariantProps } from 'tailwind-variants'
import useDebounce from '@/hooks/useDebounce'
import Modal from '@/components/base/modal'
import { Input } from '@/components/base/input'
import ScrollViewWapper from '@/components/ui/ScrollViewWapper'
import CustomIcon from '@/components/base/icon'
import { twMerge } from 'tailwind-merge'
import { selectTv } from '@/components/base/select/select.style'

type SelectVariants = VariantProps<typeof selectTv>

interface Option {
  label: string
  value: string | number
}

interface SelectProps extends SelectVariants {
  label?: string
  placeholder?: string
  value?: string | number
  onChange?: (value: string | number) => void
  onSelect?: (value: string) => void // for string
  fetchOptions: (query: string) => Promise<Option[]>
  defaultOptions?: Option[]
  error?: boolean
  helperText?: string
  disabled?: boolean
}

export const Select: React.FC<SelectProps> = ({
  label,
  placeholder = 'Select an option',
  value,
  onChange,
  onSelect,
  fetchOptions,
  defaultOptions = [],
  error = false,
  helperText,
  disabled = false
}) => {
  const [isFocused, setIsFocused] = React.useState(false)
  const [selectedValue, setSelectedValue] = React.useState<string | number>(value || '')
  const [selectedValueString, setSelectedValueString] = React.useState<string>('')
  const [showModal, setShowModal] = React.useState(false)
  const [searchQuery, setSearchQuery] = React.useState('')
  const [options, setOptions] = React.useState<Option[]>(defaultOptions)
  const [loading, setLoading] = React.useState(false)

  const debouncedQuery = useDebounce(searchQuery, 500)

  React.useEffect(() => {
    value && setSelectedValue(value)
  }, [value])

  React.useEffect(() => {
    if (debouncedQuery) {
      setLoading(true)
      fetchOptions(debouncedQuery)
        .then(setOptions)
        .finally(() => setLoading(false))
    } else {
      setOptions(defaultOptions)
    }
  }, [debouncedQuery, defaultOptions])

  const styles = selectTv({ focused: isFocused, error, disabled })

  const handleChange = (item: Option) => {
    setSelectedValue(item.value)
    onChange?.(item.value)
    setShowModal(false)
    setSelectedValueString('')
  }

  const handleSelect = () => {
    setSelectedValueString(searchQuery)
    onSelect?.(searchQuery)
    setShowModal(false)
  }

  const _value = options.find(x => x.value == selectedValue)
  return (
    <View className={styles.container()}>
      {label && <Text className={styles.label()}>{label}</Text>}
      <TouchableOpacity
        disabled={disabled}
        className={styles.selectContainer()}
        onPress={() => setShowModal(true)}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
      >
        <Text
          variant='Body'
          className={twMerge(_value || selectedValueString ? 'text-text-primary' : 'text-text-disabled')}
        >
          {selectedValueString || _value?.label || placeholder}
        </Text>
        <CustomIcon name='IconChevronDown' size={16} />
      </TouchableOpacity>
      {helperText && <Text className={styles.helperText()}>{helperText}</Text>}

      <Modal useKeyboardAware isVisible={showModal} onClose={() => setShowModal(false)}>
        <Modal.Title onClose={() => setShowModal(false)}>เลือก</Modal.Title>
        <Modal.Content className='gap-2'>
          <View className=''>
            <Input
              placeholder='ค้นหา'
              value={searchQuery}
              onChangeText={setSearchQuery}
              endAdornment={
                (loading && <ActivityIndicator color={colors.primary[500]} />) ||
                (!loading && searchQuery && (
                  <Pressable onPress={handleSelect}>
                    <Text>เลือก</Text>
                  </Pressable>
                ))
              }
              //   className={styles.searchInput()}
            />

            <ScrollViewWapper useInsetBottom={false} showsVerticalScrollIndicator={false} className='mt-2'>
              <View>
                {options.map((option, index) => {
                  return (
                    <TouchableOpacity key={option.value} onPress={() => handleChange(option)}>
                      <Text variant='Body' className={styles.option()}>
                        {option.label}
                      </Text>
                    </TouchableOpacity>
                  )
                })}
              </View>
            </ScrollViewWapper>
          </View>
        </Modal.Content>
      </Modal>
    </View>
  )
}
