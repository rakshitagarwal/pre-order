import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";

const Step3 = ({ orderData, setOrderData }) => {
  const restaurantSelected = orderData.restaurant;
  const [dishChoices, setDishChoices] = useState([]);
  const { data } = useSelector((store) => store.dishes);

  useEffect(() => {
    const choices = data.data
      .filter((dish) => dish.restaurant === restaurantSelected)
      .map((dish) => dish.name);
    setDishChoices(choices);
  }, []);

  return (
    <div className="space-y-6">
      <div className="mt-1">
        <label className="block text-sm font-medium text-gray-700 pb-2">
          Please Select a Dish
        </label>
        <select
          id="dishes"
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
          onChange={(e) =>
            setOrderData({ ...orderData, dishes: e.target.value })
          }
          value={orderData.dishes || ""}
        >
          <option value="">---</option>
          {dishChoices.map((name, index) => (
            <option key={index} value={name}>
              {name}
            </option>
          ))}
        </select>
      </div>

      <div className="mt-1">
        <label className="block text-sm font-medium text-gray-700 pb-2">
          Please Enter no. of servings
        </label>
        <input
          onChange={(e) =>
            setOrderData({ ...orderData, servings: Number(e.target.value) })
          }
          value={orderData.servings}
          type="number"
          id="servings"
          className="block h-14 w-full appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
        />
      </div>
    </div>
  );
};

export default Step3;
