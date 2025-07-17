export function getRGBFromPenColor(penColor: string, opacity = 1.0) {
  if (penColor.startsWith('#')) {
    return hexToRgb(penColor, opacity)
  }
  switch (penColor) {
    case 'ORANGE':
      return `rgba(249,115,22,${opacity})`
    case 'GREEN':
      return `rgba(34,197,94,${opacity})`
    case 'PURPLE':
      return `rgba(168,85,247,${opacity})`
    default:
      return ``
  }
}

function hexToRgb(hex: string, opacity: number): string {
  hex = hex.replace('#', '')
  const r = parseInt(hex.substring(0, 2), 16)
  const g = parseInt(hex.substring(2, 4), 16)
  const b = parseInt(hex.substring(4, 6), 16)

  return `rgba(${r},${g},${b},${opacity})`
}
