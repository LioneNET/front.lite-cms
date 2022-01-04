import { useDispatch } from "react-redux";
import { bindActionCreators } from "redux";
import fileActions from './../../../store/File/fileActions';

const useFileManager = () => {
  const dispatch = useDispatch()
  return bindActionCreators(fileActions, dispatch)
}

export default useFileManager