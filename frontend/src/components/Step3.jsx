import { useEffect, useState } from "react";
import { Field, ErrorMessage, Formik, Form } from "formik";
import { step3Schema } from "../schemas";
import { toast } from "react-toastify";

const Step3 = ({ values, allData, nextPage, prevPage }) => {
  const [dishChoices, setDishChoices] = useState([]);

  useEffect(() => {
    if (values.restaurant) {
      const choices = allData
        .filter((dish) => dish.restaurant === values.restaurant)
        .map((dish) => dish.name);
      setDishChoices(choices);
    }
  }, [values.restaurant, allData]);

  const calculateTotalServings = (dishes) =>
    dishes
      .filter((dish) => dish.name.trim() !== "")
      .reduce((total, dish) => total + (parseInt(dish.servings) || 0), 0);

  return (
    <Formik
      initialValues={{
        dishes: values.dishes || [{ name: "", servings: 1 }],
      }}
      validationSchema={step3Schema}
      onSubmit={(formValues) => {
        const currentTotalServings = calculateTotalServings(formValues.dishes);

        if (currentTotalServings < values.people) {
          toast.error("Dishes are less than people.");
          return;
        } else if (currentTotalServings > 10) {
          toast.error("Dishes can't be more than 10.");
          return;
        }
        nextPage(formValues);
      }}
    >
      {({ values, setFieldValue }) => {
        const selectedDishes = values.dishes.map((dish) => dish.name.trim());
        const availableChoices = dishChoices.filter(
          (choice) => !selectedDishes.includes(choice)
        );

        return (
          <Form className="space-y-6">
            <div className="flex flex-col gap-4">
              {values.dishes.map((dish, index) => (
                <div key={index} className="flex flex-row gap-8 items-center">
                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Select a Dish
                    </label>
                    <Field
                      as="select"
                      name={`dishes[${index}].name`}
                      className="bg-gray-50 w-48 border border-gray-300 rounded-lg p-1 mt-1"
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

                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Enter no. of servings
                    </label>
                    <Field
                      type="number"
                      name={`dishes[${index}].servings`}
                      min={1}
                      max={10}
                      className="bg-gray-50 border border-gray-300 rounded-lg p-1 mt-1"
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
                <button
                  type="button"
                  className="mt-4 w-12 bg-blue-500 text-white p-2 rounded-lg"
                  onClick={() => {
                    setFieldValue("dishes", [
                      ...values.dishes,
                      { name: "", servings: 1 },
                    ]);
                  }}
                >
                  Add
                </button>
              )}
            </div>

            <div className="flex justify-between pt-4">
              <button
                type="button"
                onClick={prevPage}
                className="py-2 px-4 bg-gray-400 text-white rounded-md hover:bg-gray-600"
              >
                Previous
              </button>
              <button
                type="submit"
                className="py-2 px-4 bg-red-400 text-white rounded-md hover:bg-red-700"
              >
                Next
              </button>
            </div>
          </Form>
        );
      }}
    </Formik>
  );
};

export default Step3;
