export const generateId = () => Date.now()

let nameOfDragConfSource
export const setConfDragSourceName = (value) => (nameOfDragConfSource = value)
export const getConfDragSourceName = () => nameOfDragConfSource
