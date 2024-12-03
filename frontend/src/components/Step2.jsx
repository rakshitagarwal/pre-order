import { useEffect, useState } from "react";
import { Field, ErrorMessage } from "formik";

const Step2 = ({ values, setFieldValue, allData }) => {
  const [restaurants, setRestaurants] = useState([]);

  useEffect(() => {
    const restaurantsList = allData
      .filter((dish) => dish.availableMeals.includes(values.meal))
      .map((dish) => dish.restaurant);
    const uniqueRestaurants = [...new Set(restaurantsList)];
    setRestaurants(uniqueRestaurants);
  }, []);

  return (
    <div className="space-y-6">
      <div className="mt-1">
        <label className="block text-sm font-medium text-gray-700 pb-2">
          Please Select a Restaurant{" "}
          <span className="text-red-500 font-bold text-lg">*</span>
        </label>
        <Field
          as="select"
          name="restaurant"
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
        >
          <option value="">Select a restaurant</option>
          {restaurants.map((restaurant, index) => (
            <option key={index} value={restaurant}>
              {restaurant}
            </option>
          ))}
        </Field>
        <ErrorMessage
          name="restaurant"
          component="div"
          className="text-red-500 text-sm mt-1"
        />
      </div>
    </div>
  );
};

export default Step2;
