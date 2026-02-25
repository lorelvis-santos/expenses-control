import { useState, useMemo, type ChangeEvent } from "react"

export default function BudgetForm() {
  const [budget, setBudget] = useState(0);

  const handleChange = (e: ChangeEvent<HTMLInputElement, HTMLInputElement>) => {
    setBudget(e.target.valueAsNumber);
  }

  const isValid = useMemo(() => {
    return !isNaN(budget) || budget <= 0;
  }, [budget]);

  return (
    <form className="space-y-5">
      <div className="flex flex-col space-y-5">
        <label htmlFor="budget" className="text-3xl text-blue-600 font-bold">
          Ingresa tu presupuesto
        </label>
        <input 
          id="budget"
          type="number"
          className="w-full bg-white border border-gray-200 p-2"
          placeholder=""
          name="budget"
          onChange={handleChange}
        />
      </div>
      <input
        type="submit"
        value="Definir presupuesto"
        className="bg-blue-600 hover:bg-blue-700 transition-colors cursor-pointer w-full p-2 text-white font-black uppercase disabled:opacity-70 disabled:cursor-not-allowed"
        disabled={!isValid}
      />
    </form>
  )
}