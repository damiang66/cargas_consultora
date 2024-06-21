import { useDispatch, useSelector } from "react-redux";
import { setPotigian, setAmdm } from "../store/slices/principal/principalSlice";

export const usePrincipal = () => {
  const dispatch = useDispatch();
  const { potigian, amdm } = useSelector(state => state.principal);

  const onPotigian = () => {
    dispatch(setPotigian());
  };

  const onAmdm = () => {
    dispatch(setAmdm());
  };

  return {
    onAmdm,
    onPotigian,
    potigian,
    amdm
  };
}