import { useDispatch } from "react-redux"
import { bindActionCreators } from "redux"
import { categoryActions } from "../../../store/Category/categoryActions"

const useCategory = () => {
    const dispatch = useDispatch()
    return bindActionCreators(categoryActions, dispatch)
}

export default useCategory