import React from 'react'
import { View, Pressable, Dimensions, Modal as RNModal, TouchableWithoutFeedback, Animated } from 'react-native'
import CustomIcon from '@/components/base/icon'
import { Text } from '@/components/base/text'
import SafeAreaWrapper from '@/components/ui/SafeAreaWrapper'
import KeyboardAwareScrollViewWapper from '@/components/ui/KeyboardAwareScrollViewWapper'
import { modalStyles } from '@/components/base/modal/modal.style'

interface ModalProps {
  isVisible: boolean
  onClose: () => void
  classNameOverlay?: string
  classNameContainer?: string
  children: React.ReactNode
  onModalHide?: () => void
  coverScreen?: boolean
  useKeyboardAware?: boolean
}

const Modal: React.FC<ModalProps> & {
  Title: React.FC<TitleProps>
  Content: React.FC<ContentProps>
  Actions: React.FC<ActionsProps>
} = ({
  isVisible,
  onClose,
  children,
  classNameOverlay,
  classNameContainer,
  onModalHide,
  coverScreen,
  useKeyboardAware
}) => {
  const styles = modalStyles()

  const { width, height } = Dimensions.get('window')
  return (
    // TODO
    <RNModal visible={isVisible} transparent animationType='fade' statusBarTranslucent>
      <View className={styles.overlay({ className: classNameOverlay })}>
        <TouchableWithoutFeedback onPress={onClose}>
          <Animated.View className='flex-1 bg-[#2F2B3D80] absolute top-0 bottom-0 left-0 right-0' />
        </TouchableWithoutFeedback>

        {useKeyboardAware ? (
          <KeyboardAwareScrollViewWapper className='w-full' contentContainerStyle={{ flex: 1 }}>
            <SafeAreaWrapper className='flex-1 justify-center items-center w-full'>
              <View className={styles.container({ className: classNameContainer })} style={{ maxHeight: '100%' }}>
                {children}
              </View>
            </SafeAreaWrapper>
          </KeyboardAwareScrollViewWapper>
        ) : (
          <SafeAreaWrapper className='flex-1 justify-center items-center w-full'>
            <View className={styles.container({ className: classNameContainer })} style={{ maxHeight: '100%' }}>
              {children}
            </View>
          </SafeAreaWrapper>
        )}
      </View>
    </RNModal>

    // <RNModal
    //   isVisible={isVisible}
    //   // swipeDirection={['down']}
    //   swipeThreshold={100}
    //   // backdropColor={'#2F2B3D80'}
    //   propagateSwipe={true}
    //   hideModalContentWhileAnimating={true}
    //   useNativeDriverForBackdrop={true}
    //   animationIn={'fadeIn'}
    //   animationOut={'fadeOut'}
    //   // animationIn='slideInUp'
    //   // animationOut='slideOutDown'
    //   onModalHide={() => {
    //     onModalHide ? onModalHide() : null
    //   }}
    //   deviceWidth={width}
    //   coverScreen={coverScreen === undefined ? true : false}
    //   onSwipeComplete={() => {
    //     onClose()
    //   }}
    //   onBackdropPress={() => {
    //     onClose()
    //   }}
    // >
    //   {/* <SafeAreaWrapper className={styles.overlay({ className: classNameOverlay })}> */}
    //   <View className={styles.container({ className: classNameContainer })}>{children}</View>
    //   {/* </SafeAreaWrapper> */}
    // </RNModal>
  )
}

// Title Subcomponent
interface TitleProps {
  children: React.ReactNode
  onClose?: () => void
  className?: string
  classNameTitle?: string
  classNameCloseButton?: string
  hideButton?: boolean
}
Modal.Title = ({ children, onClose, className, classNameTitle, classNameCloseButton, hideButton }: TitleProps) => {
  const styles = modalStyles()
  return (
    <View className={styles.header({ className })}>
      <Text variant='Title' className={styles.title({ className: classNameTitle })}>
        {children}
      </Text>
      {onClose && !hideButton && (
        <Pressable onPress={onClose}>
          <CustomIcon name='IconX' size={20} className={styles.closeButton({ className: classNameCloseButton })} />
        </Pressable>
      )}
    </View>
  )
}

interface ContentProps {
  children: React.ReactNode
  className?: string
}
Modal.Content = ({ children, className }: ContentProps) => {
  const styles = modalStyles()
  return <View className={styles.content({ className })}>{children}</View>
}

interface ActionsProps {
  children: React.ReactNode
  className?: string
}
Modal.Actions = ({ children, className }: ActionsProps) => {
  const styles = modalStyles()
  return (
    <View className={styles.actions({ className })}>
      {React.Children.map(children, (child: any) =>
        React.cloneElement(
          child as React.ReactElement,
          {
            className: `flex-1 ${child.props.className || ''}`
          } as any
        )
      )}
    </View>
  )
}

export default Modal
