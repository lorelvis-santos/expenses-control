import { useMemo } from "react";
import { useBudget } from "../hooks/useBudget";
import ExpenseDetail from "./ExpenseDetail";

export default function ExpenseList() {
  const { state } = useBudget();
  const filteredExpenses = state.currentCategoryId ? state.expenses.filter(expense => expense.category === state.currentCategoryId) : state.expenses;
  const isEmpty = useMemo(() => filteredExpenses.length === 0, [filteredExpenses]);

  return (
    <div className="mt-10 bg-white shadow-lg rounded-lg p-10">
      {isEmpty ? <p className="text-gray-600 font-bold text-xl">No hay gastos registrados</p> : (
        <>
          <p className="text-gray-600 text-xl font-bold pb-5">Listado de Gastos</p>

          {filteredExpenses.map(expense => (
            <ExpenseDetail
              key={expense.id}
              expense={expense}
            />
          ))}
        </>
      )}
    </div>
  );
}