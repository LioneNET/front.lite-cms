import { useDispatch } from "react-redux"
import { bindActionCreators } from "redux"
import authActions from "../../../store/Auth/authActions"

const useLogin = () => {
    const dispatch = useDispatch()

    return bindActionCreators(authActions, dispatch)
}

export default useLogin