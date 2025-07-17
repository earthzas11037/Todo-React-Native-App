import React from 'react'
import { render, screen, fireEvent } from '@testing-library/react-native'
import { Text, View } from 'react-native'
import { Button } from '@/components/base/button'

// Mock icon ง่ายๆ สำหรับการทดสอบ
const MockStartIcon = (props: any) => <Text {...props}>StartIcon</Text>
const MockEndIcon = (props: any) => <Text {...props}>EndIcon</Text>

describe('Button Component', () => {
  // 1. ทดสอบการแสดงผลพื้นฐาน
  it('should render the label correctly', () => {
    render(<Button label='Click Me' />)
    // ใช้ getByText เพื่อหาปุ่มจากข้อความที่ผู้ใช้เห็น
    expect(screen.getByText('Click Me')).toBeOnTheScreen()
  })

  // 2. ทดสอบการทำงานของ onPress
  it('should call onPress function when pressed', () => {
    const mockOnPress = jest.fn() // สร้าง Mock Function เพื่อติดตามการเรียกใช้
    render(<Button label='Pressable' onPress={mockOnPress} />)

    fireEvent.press(screen.getByText('Pressable'))

    expect(mockOnPress).toHaveBeenCalledTimes(1)
  })

  // 3. ทดสอบสถานะ disabled
  it('should NOT call onPress when disabled', () => {
    const mockOnPress = jest.fn()
    render(<Button label='Disabled' onPress={mockOnPress} disabled />)

    fireEvent.press(screen.getByText('Disabled'))

    expect(mockOnPress).not.toHaveBeenCalled()
  })

  // 4. ทดสอบสถานะ loading
  describe('when loading', () => {
    const mockOnPress = jest.fn()
    const testID = 'loading-button'

    beforeEach(() => {
      render(<Button label='Loading...' onPress={mockOnPress} loading testID={testID} startIcon={<MockStartIcon />} />)
    })

    it('should show an ActivityIndicator', () => {
      // ใช้ testID ที่เรากำหนดไว้เพื่อหา ActivityIndicator
      expect(screen.getByTestId(`${testID}-activity-indicator`)).toBeOnTheScreen()
    })

    it('should hide the label and icons', () => {
      // queryBy... จะ return null ถ้าไม่เจอ (ไม่ทำให้เทสต์พัง)
      expect(screen.queryByText('Loading...')).toBeNull()
      expect(screen.queryByText('StartIcon')).toBeNull()
    })

    it('should NOT call onPress when pressed', () => {
      // กดที่ตัวปุ่ม (ซึ่งตอนนี้ควรเป็น ActivityIndicator)
      fireEvent.press(screen.getByTestId(testID))
      expect(mockOnPress).not.toHaveBeenCalled()
    })
  })

  // 5. ทดสอบการแสดงผล Icon
  it('should render start and end icons', () => {
    render(<Button label='Icon Button' startIcon={<MockStartIcon />} endIcon={<MockEndIcon />} />)
    expect(screen.getByText('StartIcon')).toBeOnTheScreen()
    expect(screen.getByText('EndIcon')).toBeOnTheScreen()
  })

  // 6. ทดสอบการส่งต่อ Ref
  it('should forward ref to the underlying View', () => {
    const ref = React.createRef<View>()
    // เนื่องจาก TouchableWithoutFeedback ไม่สามารถรับ ref ได้โดยตรง
    // Component ของคุณใช้ React.forwardRef<View, Props> ซึ่งหมายถึง ref ควรไปที่ View ที่หุ้มอยู่
    render(<Button label='Ref Button' ref={ref} />)

    // ตรวจสอบว่า ref ถูกผูกกับ element จริงๆ
    expect(ref.current).toBeTruthy()
  })

  // 7. ทดสอบ Variants และ Styles ด้วย Snapshot Testing
  // วิธีนี้มีประสิทธิภาพมากในการตรวจจับการเปลี่ยนแปลงของ UI ที่ไม่คาดคิด
  describe('Variants Snapshots', () => {
    it('should render correctly with primary contained variant (Gradient)', () => {
      const { toJSON } = render(<Button label='Gradient' variant='contained' color='primary' />)
      expect(toJSON()).toMatchSnapshot()
    })

    it('should render correctly with secondary outlined variant', () => {
      const { toJSON } = render(<Button label='Outlined' variant='outlined' color='secondary' size='large' />)
      expect(toJSON()).toMatchSnapshot()
    })

    it('should render correctly with error text variant', () => {
      const { toJSON } = render(<Button label='Text' variant='text' color='error' size='small' />)
      expect(toJSON()).toMatchSnapshot()
    })

    it('should render correctly when disabled', () => {
      const { toJSON } = render(<Button label='Disabled Snap' disabled />)
      expect(toJSON()).toMatchSnapshot()
    })

    it('should render correctly with fullWidth', () => {
      const { toJSON } = render(<Button label='Full Width' fullWidth />)
      expect(toJSON()).toMatchSnapshot()
    })
  })
})
