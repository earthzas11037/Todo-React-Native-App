import React from 'react'
import { cssInterop } from 'nativewind'
import LibCollapsible, { CollapsibleProps as LibCollapsibleProps } from 'react-native-collapsible'

// Apply NativeWind integration
cssInterop(LibCollapsible, { className: 'style' })

interface CollapsibleProps extends LibCollapsibleProps {
  /**
   * Additional styles for the container
   */
  className?: string
  expanded: boolean
}

/**
 * Reusable Collapsible component with default props
 */
export const Collapsible: React.FC<CollapsibleProps> = ({ expanded, duration = 500, children, ...props }) => {
  return (
    <LibCollapsible collapsed={!expanded} duration={duration} {...props}>
      {children}
    </LibCollapsible>
  )
}
