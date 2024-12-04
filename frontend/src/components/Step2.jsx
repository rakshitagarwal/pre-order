import { useEffect, useState } from "react";
import { Field, ErrorMessage, Formik, Form } from "formik";
import { step2Schema } from "../schemas";

const Step2 = ({ values, dishes, nextPage, prevPage }) => {
  const [restaurants, setRestaurants] = useState([]);

  useEffect(() => {
    const restaurantsList = dishes
      .filter((dish) => dish.availableMeals.includes(values.meal))
      .map((dish) => dish.restaurant);
    const uniqueRestaurants = [...new Set(restaurantsList)];
    setRestaurants(uniqueRestaurants);
  }, [values.meal, dishes]);

  return (
    <Formik
      initialValues={{
        restaurant: values.restaurant || "",
      }}
      validationSchema={step2Schema}
      onSubmit={(values) => {
        nextPage(values);
      }}
    >
      {({ setFieldValue }) => (
        <Form className="space-y-6">
          <div className="mt-1">
            <label className="block text-sm font-medium text-gray-700 pb-2">
              Please Select a Restaurant{" "}
              <span className="text-red-500 font-bold text-lg">*</span>
            </label>
            <Field
              as="select"
              name="restaurant"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5"
              onChange={(e) => setFieldValue("restaurant", e.target.value)}
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
      )}
    </Formik>
  );
};

export default Step2;
