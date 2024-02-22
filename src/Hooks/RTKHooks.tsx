import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "./../store";

type TAppDispatch = () => AppDispatch;
type TAppSelector = TypedUseSelectorHook<RootState>;

export const useAppDispatch: TAppDispatch = useDispatch;
export const useAppSelector: TAppSelector = useSelector;
