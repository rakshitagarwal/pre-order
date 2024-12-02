import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getDishes } from "../slices/DishSlice";

const Step2 = ({ orderData, setOrderData }) => {
  const dispatch = useDispatch();
  const mealSelected = orderData.meal;
  const [restaurants, setRestaurants] = useState([]);
  const { data } = useSelector((store) => store.dishes);

  useEffect(() => {
    const fetchData = async () => {
      await dispatch(getDishes());
    };
    fetchData();
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
          Please Select a Restaurant
        </label>
        <select
          id="restaurant"
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
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
