import { useReducer, createContext, type Dispatch, type ReactNode} from "react";
import { type BudgetState, type BudgetActions, budgetReducer, initialState } from "../reducers/budget-reducer";

type BudgetContextProps = {
    state: BudgetState;
    dispatch: Dispatch<BudgetActions>;
}

type BudgetProviderProps = {
    children: ReactNode;
}

/* eslint-disable react-refresh/only-export-components */
export const BudgetContext = createContext<BudgetContextProps>(null!);

export const BudgetProvider = ({children} : BudgetProviderProps) => {
    const [state, dispatch] = useReducer(budgetReducer, initialState);

    return (
        <BudgetContext.Provider
            value={{
                state,
                dispatch
            }}
        >
            {children}
        </BudgetContext.Provider>
    );
}
