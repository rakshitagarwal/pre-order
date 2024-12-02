import { useEffect, useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getDishes } from "../slices/DishSlice";
import { addPreOrder } from "../APIs/api_path";
import { titles } from "../constants/endpoint";
import { CSVLink } from "react-csv";
import { toast } from "react-toastify";
import Step1 from "../components/Step1";
import Step2 from "../components/Step2";
import Step3 from "../components/Step3";
import Review from "../components/Review";
import { Formik, Form } from "formik";

const Myform = () => {
  const dispatch = useDispatch();
  const csvLinkRef = useRef();
  const [csvData, setCsvData] = useState([]);
  const { data } = useSelector((store) => store.dishes);

  useEffect(() => {
    dispatch(getDishes());
  }, [dispatch]);

  const submitOrder = async (values) => {
    try {
      const { meal, people, restaurant, dishes } = values;
      await addPreOrder({ meal, people, restaurant, dishes });
      toast("Pre-order added successfully");

      setCsvData([
        ["Field", "Value"],
        ["Meal", meal],
        ["People", people],
        ["Restaurant", restaurant],
        ["Dishes", dishes.map((dish) => `${dish.name} (Servings: ${dish.servings})`).join(", ")],
      ]);
      setTimeout(() => csvLinkRef.current.link.click(), 100);
    } catch (error) {
      toast("Pre-order failed");
      console.error(error);
    }
  };

  const PageDisplay = (values, setFieldValue) => {
    switch (values.page) {
      case 0: return <Step1 setFieldValue={setFieldValue} />;
      case 1: return <Step2 values={values} allData={data} />;
      case 2: return <Step3 values={values} setFieldValue={setFieldValue} allData={data} />;
      default: return <Review values={values} />;
    }
  };

  const handleNext = (values, setFieldValue) => {
    const totalServings = values.dishes
      .filter((dish) => dish.name.trim() !== "")
      .reduce((total, dish) => total + dish.servings, 0);

    const validations = [
      values.page === 0 && values.meal === "",
      values.page === 0 && (values.people === null || values.people === 0),
      values.page === 1 && values.restaurant === "",
      values.page === 2 && values.dishes.some((dish) => dish.name === ""),
      values.page === 2 && totalServings < values.people,
      values.page === 2 && totalServings > 10,
    ];

    const errorMessages = [
      "Please select a meal first",
      "Please enter people coming",
      "Please select a restaurant first",
      "Please select dish name first",
      "Total dishes is less than people",
      "Total dishes can't be more than 10",
    ];

    for (let i = 0; i < validations.length; i++) {
      if (validations[i]) {
        toast(errorMessages[i]);
        return;
      }
    }
    setFieldValue("page", values.page + 1);
  };

  return (
    <Formik
      initialValues={{
        meal: "",
        people: null,
        restaurant: "",
        dishes: [{ name: "", servings: 1 }],
        page: 0,
      }}
      onSubmit={(values, { setSubmitting }) => {
        if (values.page === titles.length - 1) {
          submitOrder(values);
        }
        setSubmitting(false);
      }}
    >
      {({ values, setFieldValue, submitForm }) => (
        <div className="bg-[#2F3D7E] w-full h-screen flex flex-col justify-center py-36 sm:px-6 lg:px-8 z-100 mf:h-screen">
          <div className="sm:mx-auto sm:w-full sm:max-w-md">
            <div className="text-sm font-medium text-center text-gray-500 border-b border-gray-200 dark:text-gray-400 dark:border-gray-700">
              <ul className="flex flex-wrap -mb-px">
                {titles.map((step, index) => (
                  <li className="me-2" key={index}>
                    <span className={`inline-block p-4 ${values.page === index ? "text-white border-b-2 border-white" : "border-b-2 border-transparent text-gray-400"}`}>
                      {step}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="mt-2 sm:mx-auto sm:w-full sm:max-w-md">
            <div className="bg-[#FAEAEB] py-4 px-4 shadow sm:rounded-lg sm:px-10">
              <Form autoComplete="off">
                <div>{PageDisplay(values, setFieldValue)}</div>
                <div className="grid grid-cols-2 gap-4 pt-4">
                  <div>
                    {values.page > 0 && (
                      <button
                        type="button"
                        onClick={() => setFieldValue("page", values.page - 1)}
                        className="w-full py-2 px-4 bg-red-400 text-white rounded-md hover:bg-red-700"
                      >
                        Previous
                      </button>
                    )}
                  </div>
                  <div>
                    <button
                      type="button"
                      onClick={values.page < titles.length - 1 ? () => handleNext(values, setFieldValue) : () => { submitForm(); setFieldValue("page", 3); }}
                      className="w-full py-2 px-4 bg-red-400 text-white rounded-md hover:bg-red-700"
                    >
                      {values.page < titles.length - 1 ? "Next" : "Submit"}
                    </button>
                  </div>
                </div>
                <CSVLink data={csvData} filename="order_data.csv" className="hidden" ref={csvLinkRef} />
              </Form>
            </div>
          </div>
        </div>
      )}
    </Formik>
  );
};

export default Myform;
