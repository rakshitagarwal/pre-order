import { useEffect, useState } from "react";
import { Field, ErrorMessage } from "formik";

const Step3 = ({ values, setFieldValue, allData }) => {
  const [dishChoices, setDishChoices] = useState([]);

  useEffect(() => {
    if (values.restaurant) {
      const choices = allData
        .filter((dish) => dish.restaurant === values.restaurant)
        .map((dish) => dish.name);
      setDishChoices(choices);
    }
  }, [values.restaurant, allData]);

  const selectedDishes = values.dishes
    .filter((dish) => dish.name.trim() !== "")
    .map((dish) => dish.name);
  const availableChoices = dishChoices.filter(
    (name) => !selectedDishes.includes(name)
  );

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-1">
        {(values.dishes || []).map((dish, index) => (
          <div key={index} className="flex flex-row gap-8 space-y-1">
            <div className="mt-1">
              <label className="block text-sm font-medium text-gray-700 pb-1">
                Select a Dish
              </label>
              <Field
                as="select"
                name={`dishes[${index}].name`}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-48 p-2.5"
              >
                <option value="">---</option>
                {dishChoices
                  .filter(
                    (name) =>
                      !selectedDishes.includes(name) || name === dish.name
                  )
                  .map((name, i) => (
                    <option key={i} value={name}>
                      {name}
                    </option>
                  ))}
              </Field>
              <ErrorMessage
                name={`dishes[${index}].name`}
                component="div"
                className="text-red-500 text-sm mt-1"
              />
            </div>

            <div className="mt-0">
              <label className="block text-sm font-medium text-gray-700 pb-1">
                Enter no. of servings
              </label>
              <Field
                type="number"
                name={`dishes[${index}].servings`}
                min={1}
                max={10}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
              />
              <ErrorMessage
                name={`dishes[${index}].servings`}
                component="div"
                className="text-red-500 text-sm mt-1"
              />
            </div>
          </div>
        ))}

        {availableChoices.length > 0 && (
          <div className="pt-2 flex items-center">
            <button
              type="button"
              className="bg-blue-500 text-white p-2 rounded-lg"
              onClick={() => {
                const newDish = { name: "", servings: 1 };
                setFieldValue("dishes", [...values.dishes, newDish]);
              }}
            >
              Add
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Step3;
