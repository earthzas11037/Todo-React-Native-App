import { LinearGradient as EXPOLinearGradient } from 'expo-linear-gradient'
import { cssInterop } from 'nativewind'

cssInterop(EXPOLinearGradient, { className: 'style' })

export const LinearGradient = EXPOLinearGradient
