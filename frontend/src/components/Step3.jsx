import React, { useEffect, useState } from "react";

const Step3 = ({ orderData, setOrderData , allData}) => {
  const [dishChoices, setDishChoices] = useState([]);

  useEffect(() => {
    if (orderData.restaurant) {
      const choices = allData.data
        .filter((dish) => dish.restaurant === orderData.restaurant)
        .map((dish) => dish.name);
      setDishChoices(choices);
    }
  }, [orderData.restaurant, allData]);

  const selectedDishes = orderData.dishes.filter(dish => dish.name.trim() !== '').map(dish => dish.name);
  const availableChoices = dishChoices.filter((name) => !selectedDishes.includes(name));

  return (
    <div className="flex flex-col gap-4">
      {(orderData.dishes || []).map((dish, index) => (
        <div key={index} className="flex flex-row gap-8 space-y-1">
          <div className="mt-1">
            <label className="block text-sm font-medium text-gray-700 pb-2">
              Select a Dish
            </label>
            <select
              id={`dish-${index}`}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-48 p-2.5 "
              onChange={(e) =>
                setOrderData((prevState) => {
                  const newDishes = [...prevState.dishes];
                  newDishes[index].name = e.target.value;
                  return {
                    ...prevState,
                    dishes: newDishes,
                  };
                })
              }
              value={dish.name || ""}
            >
              <option value="">---</option>
              {dishChoices
                .filter((name) => !selectedDishes.includes(name) || name === dish.name)
                .map((name, i) => (
                  <option key={i} value={name}>
                    {name}
                  </option>
                ))}
            </select>
          </div>

          <div className="mt-0">
            <label className="block text-sm font-medium text-gray-700 pb-2">
              Enter no. of servings
            </label>
            <input
              onChange={(e) =>
                setOrderData((prevState) => {
                  const newDishes = [...prevState.dishes];
                  newDishes[index].servings = Number(e.target.value);
                  return {
                    ...prevState,
                    dishes: newDishes,
                  };
                })
              }
              value={dish.servings || 1}
              type="number"
              id={`servings-${index}`}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
            />
          </div>
        </div>
      ))}
      {
        availableChoices.length > 0 && (
          <div className="pt-2 flex items-center">
            <button
              type="button"
              className="bg-blue-500 text-white p-2 rounded-lg"
              onClick={() => {
                setOrderData((prevState) => {
                  const newDishes = [...prevState.dishes];
                  newDishes.push({ name: "", servings: 1 });
                  return {
                    ...prevState,
                    dishes: newDishes,
                  };
                });
              }}
            >
              Add
            </button>
          </div>
        )
      }
    </div>
  );
};

export default Step3;
