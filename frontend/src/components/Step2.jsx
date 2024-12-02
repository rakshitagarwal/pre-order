import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";

const Step2 = ({ orderData, setOrderData }) => {
  const mealSelected = orderData.meal;
  const [restaurants, setRestaurants] = useState([]);
  const { data } = useSelector((store) => store.dishes);

  useEffect(() => {
    const restaurants = data.data
      .filter((dish) => dish.availableMeals.includes(mealSelected))
      .map((dish) => dish.restaurant);
    const uniqueRestaurants = [...new Set(restaurants)];
    setRestaurants(uniqueRestaurants);
  }, [mealSelected]);

  return (
    <div className="space-y-6">
      <div className="mt-1">
        <label className="block text-sm font-medium text-gray-700 pb-2">
          Please Select a Restaurant    <span className="text-red-500 font-bold text-lg">*</span>
        </label>
        <select
          id="restaurant"
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
          onChange={(e) =>
            setOrderData({ ...orderData, restaurant: e.target.value })
          }
          value={orderData.restaurant || ""}
        >
          <option value="">Select a restaurant</option>
          {restaurants.map((restaurant, index) => (
            <option key={index} value={restaurant}>
              {restaurant}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};

export default Step2;
