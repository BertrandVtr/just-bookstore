import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "./store";
import { selectCartItems, selectTotal } from "./cartSlice";
import { createSelector } from "@reduxjs/toolkit";
import { calculateDiscounts } from "../utils/discountService";

export const useAppDispatch = useDispatch.withTypes<AppDispatch>();
export const useAppSelector = useSelector.withTypes<RootState>();

export const useCartTotal = () => {
    const totalWithoutDiscount = useAppSelector(selectTotal);

    const { totalDiscount, sagaDiscount, pairedDiscount } = useAppSelector(createSelector([selectCartItems], cartItems => calculateDiscounts(cartItems)));

    const total = totalWithoutDiscount - totalDiscount;

    return {
        total,
        totalWithoutDiscount,
        totalDiscount,
        sagaDiscount,
        pairedDiscount,
    }
}
