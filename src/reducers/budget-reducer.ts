import type { DraftExpense, Expense } from "../types"

export type BudgetActions = 
    { type: "add-budget", payload: { budget: number } } |
    { type: "show-modal" } |
    { type: "close-modal" } |
    { type: "add-expense", payload: { expense: DraftExpense } } |
    { type: "update-expense", payload: { expense: Expense } } |
    { type: "remove-expense", payload: { id: Expense["id"] }} |
    { type: "set-editing-id", payload: { id: Expense["id"] }}

export type BudgetState = {
    budget: number;
    modal: boolean;
    expenses: Expense[];
    editingId: Expense["id"] | null;
}

export const initialState: BudgetState = {
    budget: 0,
    modal: false,
    expenses: [],
    editingId: null
}

const createExpense = (draftExpense: DraftExpense): Expense => {
    return {
        id: crypto.randomUUID(),
        ...draftExpense
    };
}

export const budgetReducer = (
    state: BudgetState = initialState,
    action: BudgetActions
) => {
    if (action.type === "add-budget") {
        return {
            ...state,
            budget: action.payload.budget > 0 ? action.payload.budget : 0
        }
    }

    if (action.type === "show-modal") {
        return {
            ...state,
            modal: true
        }
    }

    if (action.type === "close-modal") {
        return {
            ...state,
            modal: false,
            editingId: null
        }
    }

    if (action.type === "add-expense") {
        return {
            ...state,
            expenses: [...state.expenses, createExpense(action.payload.expense)],
            modal: false
        }
    }

    if (action.type === "update-expense") {
        return {
            ...state,
            expenses: state.expenses.map(expense => expense.id === state.editingId ? action.payload.expense : expense),
            modal: false,
            editingId: null
        }
    }   

    if (action.type === "remove-expense") {
        return {
            ...state,
            expenses: state.expenses.filter(expense => expense.id !== action.payload.id)
        }
    }

    if (action.type === "set-editing-id") {
        return {
            ...state,
            editingId: action.payload.id,
            modal: true
        }
    }

    return state;
}
