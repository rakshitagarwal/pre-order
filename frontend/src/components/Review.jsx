import React, { useRef, useState } from "react";
import { Formik, Form } from "formik";
import { addPreOrder } from "../APIs/api_path";
import { toast } from "react-toastify";
import { CSVLink } from "react-csv";

const Review = ({ values, prevPage }) => {
  const csvLinkRef = useRef();
  const [csvData, setCsvData] = useState([]);

  const submitOrder = async (formValues) => {
    try {
      const { meal, people, restaurant, dishes } = formValues;
      await addPreOrder({ meal, people, restaurant, dishes });
      toast("Pre-order added successfully");

      setCsvData([
        ["Field", "Value"],
        ["Meal", meal],
        ["People", people],
        ["Restaurant", restaurant],
        [
          "Dishes",
          dishes
            .map((dish) => `${dish.name} (Servings: ${dish.servings})`)
            .join(", "),
        ],
      ]);
      setTimeout(() => csvLinkRef.current.link.click(), 100);
    } catch (error) {
      toast("Pre-order failed");
      console.error(error);
    }
  };

  return (
    <Formik
      initialValues={values}
      onSubmit={(formValues) => submitOrder(formValues)}
    >
      {() => (
        <Form className="space-y-3">
          <div className="mt-1">
            <label className="block text-sm font-medium text-gray-700 pb-1">
              Meal
            </label>
            <div
              id="meal"
              className="h-10 w-full rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm bg-gray-100 text-gray-700 flex items-center"
            >
              {values.meal || "Not selected"}
            </div>
          </div>

          <div className="mt-0">
            <label className="block text-sm font-medium text-gray-700 pb-1">
              People
            </label>
            <div
              id="people"
              className="h-10 w-full rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm bg-gray-100 text-gray-700 flex items-center"
            >
              {values.people}
            </div>
          </div>

          <div className="mt-0">
            <label className="block text-sm font-medium text-gray-700 pb-1">
              Restaurant
            </label>
            <div
              id="restaurant"
              className="h-10 w-full rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm bg-gray-100 text-gray-700 flex items-center"
            >
              {values.restaurant || "Not selected"}
            </div>
          </div>

          <div className="mt-0">
            <label className="block text-sm font-medium text-gray-700 pb-1">
              Dishes
            </label>
            <ul
              id="dishes"
              className="space-y-0 border border-gray-300 p-3 rounded-md bg-gray-100 text-gray-700"
            >
              {values.dishes.length > 0 &&
                values.dishes.map((entry, index) => (
                  <li key={index} className="flex justify-between">
                    <span>{entry.name}</span>
                    <span>{entry.servings}</span>
                  </li>
                ))}
            </ul>
          </div>

          <div className="flex justify-between mt-4">
            <button
              type="button"
              onClick={prevPage}
              className="py-2 px-4 bg-gray-400 text-white rounded-md hover:bg-gray-600"
            >
              Previous
            </button>
            <button
              type="submit"
              className="py-2 px-4 bg-blue-500 text-white rounded-md hover:bg-blue-700"
            >
              Submit
            </button>
          </div>
          <CSVLink
            data={csvData}
            filename="order_data.csv"
            className="hidden"
            ref={csvLinkRef}
          />
        </Form>
      )}
    </Formik>
  );
};

export default Review;
