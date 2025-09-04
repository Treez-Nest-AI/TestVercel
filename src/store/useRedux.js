import { useDispatch, useSelector } from 'react-redux'

// Remove TypeScript-specific code for JS compatibility

export const useAppDispatch = () => useDispatch()
export const useAppSelector = (selector) => useSelector(selector)