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

const Myform = () => {
  const dispatch = useDispatch();
  const csvLinkRef = useRef();
  const [orderData, setOrderData] = useState({
    meal: "",
    people: 1,
    restaurant: "",
    dishes: [{ name: "", servings: 1 }],
  });
  const [page, setPage] = useState(0);
  const [csvData, setCsvData] = useState([]);
  const { data } = useSelector((store) => store.dishes);

  const totalServings = orderData.dishes.filter(dish => dish.name.trim() !== '').reduce((total, dish) => total + dish.servings, 0);

  useEffect(() => {
    const fetchData = async () => {
      await dispatch(getDishes());
    };
    fetchData();
  }, [dispatch]);

  const submitOrder = async (e) => {
    e.preventDefault();
    try {
      await addPreOrder(orderData);
      toast("pre-order added successfully");
      const csvContent = [
        ["Field", "Value"],
        ["Meal", orderData.meal],
        ["People", orderData.people],
        ["Restaurant", orderData.restaurant],
        ["Dishes", orderData.dishes.map(dish => `${dish.name} (Servings: ${dish.servings})`).join(", ")]
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

  const validatePage = () => {
    if (page === 0 && orderData.meal === '') {
      toast("Please select a meal first");
      return false;
    }
    if (page === 1 && orderData.restaurant === '') {
      toast("Please select a restaurant first");
      return false;
    }
    if (page === 2) {
      if (orderData.dishes.some(dish => dish.name === "")) {
        toast("Please select dish name first");
        return false;
      }
      if (totalServings < orderData.people) {
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

  const PageDisplay = () => {
    if (page === 0) return <Step1 {...{ orderData, setOrderData }} />   
    else if (page === 1) return <Step2 {...{ orderData, setOrderData }} allData={data} /> 
    else if (page === 2) return <Step3 {...{ orderData, setOrderData }} allData={data} />
    else return <Review {...{orderData}} />
  };

  return (
    <div className="bg-black w-full h-screen min-h-full flex flex-col justify-center py-36 sm:px-6 lg:px-8 z-100 mf:h-screen">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <div className="text-sm font-medium text-center text-gray-500 border-b border-gray-200 dark:text-gray-400 dark:border-gray-700">
          <ul className="flex flex-wrap -mb-px">
            {titles.map((step, index) => (
              <li className="me-2" key={index}>
                <span
                  className={`inline-block p-4 ${page === index
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
          <div>{PageDisplay()}</div>
          <div className="flex flex-row gap-3 pt-8">
            <button
              disabled={page === 0}
              onClick={() => {
                setPage((currPage) => currPage - 1);
              }}
              className="flex cursor-pointer w-full justify-center rounded-md border bg-[#BF202F] py-2 px-4 text-sm font-medium text-white hover:bg-orange-700 "
            >
              Prev
            </button>
            <button
              onClick={(e) => {
                if (!validatePage()) return;

                if (page === titles.length - 1) {
                  submitOrder(e);
                } else {
                  setPage((currPage) => currPage + 1);
                }
              }}
              className="flex cursor-pointer w-full justify-center rounded-md border bg-[#BF202F] py-2 px-4 text-sm font-medium text-white hover:bg-orange-700 "
            >
              {page === titles.length - 1 ? "Submit" : "Next"}
            </button>
          </div>
          <CSVLink
            data={csvData}
            filename="order_data.csv"
            className="hidden"
            ref={csvLinkRef}
          />
        </div>
      </div>
    </div>
  );
};

export default Myform;
