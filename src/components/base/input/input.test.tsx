import React from 'react'
import { render, screen, fireEvent } from '@testing-library/react-native'
import { Text, TextInput } from 'react-native'
import { Input } from '@/components/base/input'

// Mock Adornment ง่ายๆ
const MockAdornment = ({ text }: { text: string }) => <Text>{text}</Text>

describe('Input (Presentational Component)', () => {
  // 1. การแสดงผลพื้นฐาน
  it('should render label, placeholder, and helper text correctly', () => {
    render(<Input label='Username' placeholder='Enter your username' helperText='This is a hint' />)
    expect(screen.getByText('Username')).toBeOnTheScreen()
    expect(screen.getByPlaceholderText('Enter your username')).toBeOnTheScreen()
    expect(screen.getByText('This is a hint')).toBeOnTheScreen()
  })

  // 2. การโต้ตอบของผู้ใช้
  it('should call onChangeText when user types', () => {
    const mockOnChangeText = jest.fn()
    render(<Input label='Test' onChangeText={mockOnChangeText} />)

    const input = screen.getByLabelText('Test') // ค้นหา Input จาก Label ที่เชื่อมกัน
    fireEvent.changeText(input, 'hello world')

    expect(mockOnChangeText).toHaveBeenCalledWith('hello world')
  })

  it('should call onFocus and onBlur callbacks', () => {
    const mockOnFocus = jest.fn()
    const mockOnBlur = jest.fn()
    render(<Input label='Focus Test' onFocus={mockOnFocus} onBlur={mockOnBlur} />)

    const input = screen.getByLabelText('Focus Test')

    fireEvent(input, 'focus')
    expect(mockOnFocus).toHaveBeenCalledTimes(1)

    fireEvent(input, 'blur')
    expect(mockOnBlur).toHaveBeenCalledTimes(1)
  })

  // 3. ทดสอบ Props ที่เป็นสถานะ
  it('should be non-editable when disabled', () => {
    render(<Input label='Disabled Test' disabled />)
    const input = screen.getByLabelText('Disabled Test')
    expect(input).toHaveProp('editable', false)
  })

  it('should display helper text when error prop is true', () => {
    render(<Input label='Error Test' error helperText='Invalid input' />)
    const helperText = screen.getByText('Invalid input')
    expect(helperText).toBeOnTheScreen()
    // คุณสามารถเช็ค style เพิ่มเติมได้ถ้าต้องการ แต่ snapshot จะครอบคลุมส่วนนี้
  })

  // 4. ทดสอบ Adornments
  it('should render start and end adornments', () => {
    render(
      <Input
        label='Adornment Test'
        startAdornment={<MockAdornment text='START' />}
        endAdornment={<MockAdornment text='END' />}
      />
    )
    expect(screen.getByText('START')).toBeOnTheScreen()
    expect(screen.getByText('END')).toBeOnTheScreen()
  })

  // 5. ทดสอบ Ref Forwarding
  it('should forward ref to the underlying TextInput', () => {
    const ref = React.createRef<TextInput>()
    render(<Input label='Ref Test' ref={ref} />)
    expect(ref.current).toBeTruthy()
  })

  // 6. Snapshot Testing สำหรับ Styles และ Variants
  describe('Snapshot for Variants', () => {
    it('renders correctly with error state', () => {
      const { toJSON } = render(<Input label='Error' error helperText='Error!' />)
      expect(toJSON()).toMatchSnapshot()
    })

    it('renders correctly when focused', () => {
      const { toJSON } = render(<Input label='Focused' />)
      // จำลองการ focus เพื่อให้ snapshot จับ state ที่ถูกต้อง
      fireEvent(screen.getByLabelText('Focused'), 'focus')
      expect(toJSON()).toMatchSnapshot()
    })

    it('renders correctly when disabled', () => {
      const { toJSON } = render(<Input label='Disabled' disabled />)
      expect(toJSON()).toMatchSnapshot()
    })
  })
})
