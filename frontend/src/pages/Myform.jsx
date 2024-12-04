import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getDishes } from "../slices/DishSlice";
import Step1 from "../components/Step1";
import Step2 from "../components/Step2";
import Step3 from "../components/Step3";
import Review from "../components/Review";
import { titles } from "../constants/endpoint";

const Myform = () => {
  const dispatch = useDispatch();
  const { data } = useSelector((store) => store.dishes);
  const [formValues, setFormValues] = useState({
    meal: "",
    people: "",
    restaurant: "",
    dishes: [{ name: "", servings: 1 }],
    page: 0,
  });

  useEffect(() => {
    dispatch(getDishes());
  }, [dispatch]);

  const PageDisplay = () => {
    switch (formValues.page) {
      case 0:
        return <Step1 values={formValues} nextPage={handleNextPage} />;
      case 1:
        return (
          <Step2
            values={formValues}
            nextPage={handleNextPage}
            prevPage={handlePrevPage}
            dishes={data}
          />
        );
      case 2:
        return (
          <Step3
            values={formValues}
            nextPage={handleNextPage}
            prevPage={handlePrevPage}
            dishes={data}
          />
        );
      default:
        return <Review values={formValues} prevPage={handlePrevPage} />;
    }
  };

  const handleNextPage = (values) => {
    setFormValues((prevValues) => ({
      ...prevValues,
      ...values,
      page: prevValues.page + 1,
    }));
  };

  const handlePrevPage = () => {
    setFormValues((prevValues) => ({
      ...prevValues,
      page: prevValues.page - 1,
    }));
  };

  return (
    <div className="bg-[#2F3D7E] w-full h-screen flex flex-col items-center pt-24 sm:px-6 lg:px-8">
      <div
        className="fixed top-4 left-0 right-0 z-10 bg-[#2F3D7E] sm:mx-auto sm:w-full sm:max-w-md shadow-md"
      >
        <div className="text-sm font-medium text-center text-gray-500 border-b border-gray-200 dark:text-gray-400 dark:border-gray-700">
          <ul className="flex flex-wrap -mb-px">
            {titles.map((step, index) => (
              <li className="me-2" key={index}>
                <span
                  className={`inline-block p-4 ${formValues.page === index
                      ? "text-white border-b-2 border-white"
                      : "border-b-2 border-transparent text-gray-400"
                    }`}
                >
                  {step}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </div>
      <div className="mt-0 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-[#FAEAEB] py-4 px-4 shadow sm:rounded-lg sm:px-10">
          {PageDisplay()}
        </div>
      </div>
    </div>
  );
};

export default Myform;
