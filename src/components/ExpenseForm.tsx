import { categories } from "../data/categories"

export default function ExpenseForm() {
  return (
    <form className="space-y-5">
      <legend
        className="uppercase text-center text-2xl font-bold border-b-4 border-blue-500 py-2"
      >
        Nuevo gasto
      </legend>

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
        >
          <option disabled selected>-- Seleccione una opcion --</option>
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

      <input 
        type="submit" 
        className="bg-blue-600 hover:bg-blue-700 transition-colors rounded-lg cursor-pointer w-full p-2 text-white uppercase font-bold mt-5"
        value="Registrar gasto"
      />
    </form>
  )
}