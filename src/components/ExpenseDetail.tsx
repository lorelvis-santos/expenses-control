import { useMemo } from "react"
import {
  LeadingActions,
  SwipeableList,
  SwipeableListItem,
  SwipeAction,
  TrailingActions
} from "react-swipeable-list"
import "react-swipeable-list/dist/styles.css"
import type { Expense } from "../types"
import { formatDate } from "../utils"
import AmountDisplay from "./AmountDisplay"
import { categories } from "../data/categories"
import { useBudget } from "../hooks/useBudget"

type ExpenseDetailProps = {
    expense: Expense
}

export default function ExpenseDetail({expense}: ExpenseDetailProps) {
  const category = useMemo(() => categories.find(c => c.id === expense.category), [expense]);
  const { dispatch } = useBudget();

  const leadingActions = () => (
    <LeadingActions>
      <SwipeAction
        onClick={() => console.log("editando...")}
      >
        Editar
      </SwipeAction>
    </LeadingActions>
  );

  const trailingActions = () => (
    <TrailingActions>
      <SwipeAction
        onClick={() => dispatch({ type:"remove-expense", payload: {id: expense.id}})}
        destructive={true}
      >
        Eliminar
      </SwipeAction>
    </TrailingActions>
  );

  return (
    <SwipeableList>
      <SwipeableListItem
        maxSwipe={0.6}
        threshold={0.3}
        leadingActions={leadingActions()}
        trailingActions={trailingActions()}
      >
        <div className="bg-white shadow-lg p-10 w-full border-b rounded-lg border-gray-200 flex gap-5 items-center justify-between">
          <div className="flex gap-5">
            <div className="w-20">
              <img src={`icono_${category?.icon}.svg`} alt={`Icono de ${category?.name}`} />
            </div>

            <div>
              <p className="text-sm font-bold uppercase text-slate-500">{category?.name}</p>
              <p className="">{expense.name}</p>
              <p className="text-slate-600 text-xs mt-2">{expense.date ? formatDate(expense.date?.toString()) : "N/A"}</p>
            </div>
          </div>

          <AmountDisplay 
            amount={expense.amount}
          />
        </div>
      </SwipeableListItem>
    </SwipeableList>
  )
}