const Step1 = ({ orderData, setOrderData }) => {
  return (
    <div className="space-y-6">
      <div className="mt-1">
        <label className="block text-sm font-medium text-gray-700 pb-2">
          Please Select a meal    <span className="text-red-500 font-bold text-lg">*</span>
        </label>
        <select
          id="meals"
          onChange={(e) => setOrderData({ ...orderData, meal: e.target.value })}
          value={orderData.meal || ""}
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
        >
          <option value="" disabled>
            ---
          </option>
          <option value="breakfast">Breakfast</option>
          <option value="lunch">Lunch</option>
          <option value="dinner">Dinner</option>
        </select>
      </div>

      <div className="mt-1">
        <label className="block text-sm font-medium text-gray-700 pb-2">
          Please Enter Number of people    <span className="text-red-500 font-bold text-lg">*</span>
        </label>
        <input
          onChange={(e) =>
            setOrderData({ ...orderData, people: Number(e.target.value) })
          }
          value={orderData.people}
          type="number"
          id="number"
          min={1}
          max={10}
          className="block h-14 w-full appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
        />
      </div>
    </div>
  );
};

export default Step1;
