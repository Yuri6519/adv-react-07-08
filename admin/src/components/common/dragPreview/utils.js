const layerStyles = {
  position: 'fixed',
  pointerEvents: 'none',
  zIndex: 100,
  width: '100%',
  height: '100%'
}

export const getLayerStyle = (props) => {
  const { initialClientOffset } = props
  if (!initialClientOffset) {
    return {
      display: 'none'
    }
  }
  const { x } = initialClientOffset

  const res = { ...layerStyles, left: x, top: 0 }
  return res
}

export const getItemStyles = (props) => {
  const { currentOffset } = props
  if (!currentOffset) {
    return {
      display: 'none'
    }
  }
  const { x, y } = currentOffset

  const transform = `translate(${x}px, ${y}px)`
  return {
    transform,
    WebkitTransform: transform
  }
}
