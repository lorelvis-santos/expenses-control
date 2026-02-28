import { useState, type ChangeEvent, type SubmitEvent } from 'react';
import DatePicker from 'react-date-picker';
import "react-date-picker/dist/DatePicker.css";
import "react-calendar/dist/Calendar.css"
import { categories } from "../data/categories"
import { type DraftExpense, type Value } from '../types';
import ErrorMessage from './ErrorMessage';
import { useBudget } from '../hooks/useBudget';

export default function ExpenseForm() {
  const [error, setError] = useState("");
  const { state, dispatch } = useBudget();

  const initialExpenseState = {
    name: "",
    amount: 0,
    category: "1",
    date: new Date()
  }

  const editingExpense = state.editingId
    ? state.expenses.find(e => e.id === state.editingId)
    : null;

  const [expense, setExpense] = useState<DraftExpense>(editingExpense ? editingExpense : initialExpenseState);

  const handleChange = (e: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = e.target;
    const isAmount = ["amount"].includes(name);

    setExpense({
      ...expense,
      [name]: isAmount ? +value : value
    })
  }

  const handleChangeDate = (value: Value) => {
    setExpense({
      ...expense,
      date: value
    })
  }

  const handleSubmit = (e: SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (Object.values(expense).some(x => x == null || x == "")) {
      setError("Todos los campos son obligatorios");
      return;
    }

    if (editingExpense) {
      dispatch({ type: "update-expense", payload: { expense: {
        id: state.editingId!,
        ...expense
      } }})
    } else {
      dispatch({ type: "add-expense", payload: { expense } });
    }

    // Reseteamos el state
    setExpense(initialExpenseState);
  };

  return (
    <form className="space-y-5" onSubmit={handleSubmit}>
      <legend
        className="uppercase text-center text-2xl font-bold border-b-4 border-blue-500 py-2"
      >
        {editingExpense ? "Editando Gasto" : "Nuevo gasto"}
      </legend>

      {error && (
        <ErrorMessage>
          {error}
        </ErrorMessage>
      )}

      <div className="flex flex-col gap-2">
        <label htmlFor="name" className="text-md">
          Nombre
        </label>
        <input
          type="text"
          id="name"
          name="name"
          placeholder="Ej. Transporte"
          className="bg-slate-100 p-2 rounded-lg"
          value={expense.name}
          onChange={handleChange}
        />
      </div>

      <div className="flex flex-col gap-2">
        <label htmlFor="amount" className="text-md">
          Cantidad
        </label>
        <input
          type="number"
          id="amount"
          name="amount"
          placeholder="Ej. 300"
          className="bg-slate-100 p-2 rounded-lg"
          value={expense.amount}
          onChange={handleChange}
        />
      </div>

      <div className="flex flex-col gap-2">
        <label htmlFor="category" className="text-md">
          Categoría
        </label>
        <select
          id="category"
          name="category"
          className="bg-slate-100 p-2 rounded-lg"
          value={expense.category}
          onChange={handleChange}
        >
          <option disabled>-- Seleccione una opcion --</option>
          {categories.map(category => {
            return (
              <option
                key={category.id}
                value={category.id}
              >
                {category.name}
              </option>
            )
          })}
        </select>
      </div>

      <div className="flex flex-col gap-2">
        <label htmlFor="date" className="text-md">
          Fecha
        </label>
        <DatePicker
          className="bg-slate-100 p-2 rounded-lg border-none"
          value={expense.date}
          onChange={handleChangeDate}
        />
      </div>

      <input 
        type="submit" 
        className="bg-blue-600 hover:bg-blue-700 transition-colors rounded-lg cursor-pointer w-full p-2 text-white uppercase font-bold mt-5"
        value={`${editingExpense ? "Actualizar" : "Registrar"} gasto`}
      />
    </form>
  )
}