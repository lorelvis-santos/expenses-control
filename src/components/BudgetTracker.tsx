import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css"
import AmountDisplay from "./AmountDisplay";
import { useBudget } from "../hooks/useBudget";

export default function BudgetTracker() {
  const { state, totalExpenses, remainingBudget } = useBudget();

  const percentage = +((remainingBudget / state.budget) * 100).toFixed(2);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
      <div className="flex justify-center">
        <CircularProgressbar
          value={percentage}
          styles={buildStyles({
            pathColor: remainingBudget === 0 ? "#DC2626" : "#3B82F6",
            trailColor: "#F5F5F5",
            textSize: 8,
            textColor: remainingBudget === 0 ? "#DC2626" : "#3B82F6"
          })}
          text={`${percentage}% gastado`}
        />
      </div>

      <div className="flex flex-col justify-center gap-8">
        <button type="button" className="bg-pink-600 w-full p-2 text-white uppercase font-bold rounded-lg">
          Resetear App
        </button>

        <AmountDisplay
          label="Presupuesto"
          amount={state.budget}
        />

        <AmountDisplay
          label="Disponible"
          amount={remainingBudget}
        />

        <AmountDisplay
          label="Gastado"
          amount={totalExpenses}
        />
      </div>
    </div>
  )
}