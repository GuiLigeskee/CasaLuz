// redux
import { reset } from "../Slice/authSlice";

export const useResetComponentMessage = (dispatch) => {
  return () => {
    setTimeout(() => {
      dispatch(reset());
    }, 2000);
  };
};
