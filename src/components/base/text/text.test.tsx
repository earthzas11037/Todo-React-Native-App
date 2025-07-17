import React from 'react'
import { render, screen } from '@testing-library/react-native'
import { I18nManager, Text as RNText } from 'react-native'
import { Text } from '@/components/base/text' // ⚠️ แก้ path ให้ตรงโปรเจกต์คุณ

describe('Text (Presentational Component)', () => {
  afterEach(() => {
    jest.clearAllMocks()
    I18nManager.isRTL = false // รีเซ็ตค่า RTL ทุกเคส
  })

  /* -------------------------------------------------------------------------- */
  /* การแสดงผลพื้นฐาน                                                         */
  /* -------------------------------------------------------------------------- */
  it('should render children correctly', () => {
    render(<Text>สวัสดี</Text>)
    expect(screen.getByText('สวัสดี')).toBeOnTheScreen()
  })

  /* -------------------------------------------------------------------------- */
  /* ทดสอบค่า defaultVariants                                                 */
  /* -------------------------------------------------------------------------- */
  it('should apply default variant (Body) & color (textPrimary)', () => {
    render(<Text>Default</Text>)
    const node = screen.UNSAFE_getByType(RNText)

    expect(node.props.className).toContain('text-[14px]') // Body
    expect(node.props.className).toContain('text-text-primary') // textPrimary
  })

  /* -------------------------------------------------------------------------- */
  /* ทดสอบการ Override variant & color                                        */
  /* -------------------------------------------------------------------------- */
  it('should apply custom variant Header1 and secondary color', () => {
    render(
      <Text variant='Header1' color='secondary'>
        Header
      </Text>
    )
    const node = screen.UNSAFE_getByType(RNText)

    expect(node.props.className).toContain('text-[19px]')
    expect(node.props.className).toContain('text-secondary-500')
  })

  /* -------------------------------------------------------------------------- */
  /* ทดสอบการรวม className ภายนอก                                           */
  /* -------------------------------------------------------------------------- */
  it('should merge extra className properly', () => {
    render(<Text className='underline'>Underline</Text>)
    expect(screen.UNSAFE_getByType(RNText).props.className).toContain('underline')
  })

  /* -------------------------------------------------------------------------- */
  /* ทดสอบ ref forwarding                                                     */
  /* -------------------------------------------------------------------------- */
  it('should forward ref to underlying RNText', () => {
    const ref = React.createRef<RNText>()
    render(<Text ref={ref}>Ref test</Text>)
    expect(ref.current).toBeTruthy()
    expect(ref.current?.props.children).toBe('Ref test')
  })

  /* -------------------------------------------------------------------------- */
  /* Snapshot Testing (Variants & States)                                     */
  /* -------------------------------------------------------------------------- */
  describe('Snapshots for variants / states', () => {
    it('renders Header1 / primary variant correctly', () => {
      const { toJSON } = render(
        <Text variant='Header1' color='primary'>
          Header
        </Text>
      )
      expect(toJSON()).toMatchSnapshot()
    })

    it('renders Body / error color correctly', () => {
      const { toJSON } = render(
        <Text variant='Body' color='error'>
          Error text
        </Text>
      )
      expect(toJSON()).toMatchSnapshot()
    })

    it('renders CaptionRegular with custom className', () => {
      const { toJSON } = render(
        <Text variant='CaptionRegular' className='italic'>
          Caption
        </Text>
      )
      expect(toJSON()).toMatchSnapshot()
    })
  })
})
