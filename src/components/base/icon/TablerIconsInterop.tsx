import * as TablerIcons from '@tabler/icons-react-native'
import { cssInterop } from 'nativewind'

// Map each icon with cssInterop
const TablerIconsWithInterop = Object.fromEntries(
  Object.entries(TablerIcons).map(([name, Icon]) => [name, cssInterop(Icon as any, { className: 'style' })])
)

export default TablerIconsWithInterop

export { TablerIcons }
