import { useReducer, useMemo, createContext, type Dispatch, type ReactNode} from "react";
import { type BudgetState, type BudgetActions, budgetReducer, initialState } from "../reducers/budget-reducer";

type BudgetContextProps = {
    state: BudgetState;
    dispatch: Dispatch<BudgetActions>;
    totalExpenses: number;
    remainingBudget: number;
}

type BudgetProviderProps = {
    children: ReactNode;
}

/* eslint-disable react-refresh/only-export-components */
export const BudgetContext = createContext<BudgetContextProps>(null!);

export const BudgetProvider = ({children} : BudgetProviderProps) => {
    const [state, dispatch] = useReducer(budgetReducer, initialState);

    const totalExpenses = useMemo(() => state.expenses.reduce((total, expense) => total + expense.amount, 0), [state.expenses]);
    const remainingBudget = state.budget - totalExpenses;

    const contextValue = useMemo(() => ({
        state,
        dispatch,
        totalExpenses,
        remainingBudget
    }), [
        state, 
        dispatch, 
        totalExpenses, 
        remainingBudget]
    );

    return (
        <BudgetContext.Provider
            value={contextValue}
        >
            {children}
        </BudgetContext.Provider>
    );
}
