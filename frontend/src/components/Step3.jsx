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
  }, [restaurantSelected, data.data]);

  const handleAddDish = () => {
    setOrderData({
      ...orderData,
      dishes: [...(orderData.dishes || []), { name: "", servings: 1 }],
    });
  };

  const handleDishChange = (index, field, value) => {
    const updatedDishes = (orderData.dishes || []).map((dish, i) =>
      i === index ? { ...dish, [field]: value } : dish
    );
    setOrderData({ ...orderData, dishes: updatedDishes });
  };

  return (
    <>
      <div className="flex flex-col gap-4">
        {(orderData.dishes || []).map((dish, index) => (
          <div key={index} className="flex flex-row gap-8 space-y-1">
            <div className="mt-1">
              <label className="block text-sm font-medium text-gray-700 pb-2">
                Select a Dish
              </label>
              <select
                id={`dish-${index}`}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
                onChange={(e) =>
                  handleDishChange(index, "name", e.target.value)
                }
                value={dish.name || ""}
              >
                <option value="">---</option>
                {dishChoices.map((name, i) => (
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
                  handleDishChange(index, "servings", Number(e.target.value))
                }
                value={dish.servings || 1}
                type="number"
                id={`servings-${index}`}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
              />
            </div>
          </div>
        ))}

        <div className="pt-2 flex items-center">
          <button
            type="button"
            className="bg-blue-500 text-white p-2 rounded-lg"
            onClick={handleAddDish}
          >
            Add Dish
          </button>
        </div>
      </div>
    </>
  );
};

export default Step3;
