// redux
// import { resetMessage } from "../Slice/authSlice";

export const useResetComponentMessage = (dispatch) => {
  return () => {
    setTimeout(() => {
      dispatch(resetMessage());
    }, 2000);
  };
};
