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
    const fetchData = async () => {
      await dispatch(getDishes());
    };
    fetchData();
  }, [dispatch]);

  const submitOrder = async (values) => {
    try {
      delete values.page;
      await addPreOrder(values);
      toast("pre-order added successfully");
      const csvContent = [
        ["Field", "Value"],
        ["Meal", values.meal],
        ["People", values.people],
        ["Restaurant", values.restaurant],
        ["Dishes", values.dishes.map(dish => `${dish.name} (Servings: ${dish.servings})`).join(", ")]
      ];
      setCsvData(csvContent);

      setTimeout(() => {
        csvLinkRef.current.link.click();
      }, 100);
    } catch (error) {
      toast("pre-order failed");
      console.log(error);
    }
  };

  const validatePage = (values) => {
    const totalServings = values.dishes.filter(dish => dish.name.trim() !== '').reduce((total, dish) => total + dish.servings, 0);

    if (values.page === 0 && values.meal === '') {
      toast("Please select a meal first");
      return false;
    }
    if (values.page === 1 && values.restaurant === '') {
      toast("Please select a restaurant first");
      return false;
    }
    if (values.page === 2) {
      if (values.dishes.some(dish => dish.name === "")) {
        toast("Please select dish name first");
        return false;
      }
      if (totalServings < values.people) {
        toast("Total dishes is less than people");
        return false;
      }
      if (totalServings > 10) {
        toast("Total dishes can't be more than 10");
        return false;
      }
    }
    return true;
  };

  const PageDisplay = (values, setFieldValue) => {
    if (values.page === 0) return <Step1 {...{ values, setFieldValue }} />;
    else if (values.page === 1) return <Step2 {...{ values, setFieldValue, allData: data }} />;
    else if (values.page === 2) return <Step3 {...{ values, setFieldValue, allData: data }} />;
    else return <Review {...{ values }} />;
  };

  return (
    <Formik
      initialValues={{
        meal: "",
        people: 1,
        restaurant: "",
        dishes: [{ name: "", servings: 1 }],
        page: 0
      }}
      validate={validatePage}
      onSubmit={(values, { setSubmitting }) => {
        if (values.page === titles.length - 1) {
          submitOrder(values);
        }
        setSubmitting(false);
      }}
    >
      {({ values, setFieldValue, submitForm }) => (
        <div className="bg-black w-full h-screen min-h-full flex flex-col justify-center py-36 sm:px-6 lg:px-8 z-100 mf:h-screen">
          <div className="sm:mx-auto sm:w-full sm:max-w-md">
            <div className="text-sm font-medium text-center text-gray-500 border-b border-gray-200 dark:text-gray-400 dark:border-gray-700">
              <ul className="flex flex-wrap -mb-px">
                {titles.map((step, index) => (
                  <li className="me-2" key={index}>
                    <span
                      className={`inline-block p-4 ${values.page === index
                        ? "text-blue-600 border-b-2 border-blue-600 dark:text-blue-500 dark:border-blue-500"
                        : "border-b-2 border-transparent hover:text-gray-600 hover:border-gray-300 dark:hover:text-gray-300"
                        } rounded-t-lg`}
                    >
                      {step}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
            <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
              <Form>
                <div>{PageDisplay(values, setFieldValue)}</div>
                <div className="flex flex-row gap-3 pt-8">
                  <button
                    type="button"
                    disabled={values.page === 0}
                    onClick={() => {
                      setFieldValue('page', values.page - 1);
                    }}
                    className="flex cursor-pointer w-full justify-center rounded-md border bg-[#BF202F] py-2 px-4 text-sm font-medium text-white hover:bg-orange-700 "
                  >
                    Prev
                  </button>
                  {
                    values.page < titles.length - 1 ? (
                      <button
                        type="button"
                        onClick={() => {
                          if (!validatePage(values)) return;
                          else setFieldValue('page', values.page + 1);
                        }}
                        className="flex cursor-pointer w-full justify-center rounded-md border bg-[#BF202F] py-2 px-4 text-sm font-medium text-white hover:bg-orange-700 "
                      >
                        Next
                      </button>
                      ) : (
                      <button
                        type="button"
                        onClick={() => {
                          submitForm();  // This will trigger the form submission and call onSubmit
                        }}
                        className="flex cursor-pointer w-full justify-center rounded-md border bg-[#BF202F] py-2 px-4 text-sm font-medium text-white hover:bg-orange-700 "
                      >
                        Submit
                      </button>)
                  }

                </div>
                <CSVLink
                  data={csvData}
                  filename="order_data.csv"
                  className="hidden"
                  ref={csvLinkRef}
                />
              </Form>
            </div>
          </div>
        </div>
      )}
    </Formik>
  );
};

export default Myform;
