export const sine = ({
  start, end, speed,
}) => (t) => {
  const middle = ((start + end) / 2)
  return middle + ((middle - start) * Math.sin((t * Math.PI * 2) / speed))
}
