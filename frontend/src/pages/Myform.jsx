import { useEffect, useRef, useState } from "react";
import Step1 from "../components/Step1";
import Step2 from "../components/Step2";
import Step3 from "../components/Step3";
import Review from "../components/Review";
import { useDispatch } from "react-redux";
import { getDishes } from "../slices/DishSlice";
import { addPreOrder } from "../APIs/api_path";
import { titles } from "../constants/endpoint";
import { CSVLink } from "react-csv";

const Myform = () => {
  const dispatch = useDispatch();
  const [page, setPage] = useState(0);
  const [orderData, setOrderData] = useState({
    meal: "",
    people: 1,
    restaurant: "",
    dishes: [],
  });
  const csvLinkRef = useRef();
  const [csvData, setCsvData] = useState([]);

  const submitOrder = async (e) => {
    e.preventDefault();
    try {
      await addPreOrder(orderData);
      alert("order added");
      const csvContent = [
        ["Field", "Value"],
        ["Meal", orderData.meal],
        ["People", orderData.people],
        ["Restaurant", orderData.restaurant],
        ["Dishes", orderData.dishes],
      ];
      setCsvData(csvContent);

      setTimeout(() => {
        csvLinkRef.current.link.click();
      }, 100);
    } catch (error) {
      alert("order failed");
      console.log(error);
    }
  };

  const PageDisplay = () => {
    if (page === 0) {
      return <Step1 orderData={orderData} setOrderData={setOrderData} />;
    } else if (page === 1) {
      return <Step2 orderData={orderData} setOrderData={setOrderData} />;
    } else if (page === 2) {
      return <Step3 orderData={orderData} setOrderData={setOrderData} />;
    } else {
      return <Review orderData={orderData} />;
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      await dispatch(getDishes());
    };
    fetchData();
  }, []);

  return (
    <div className="bg-black w-full h-screen min-h-full flex flex-col justify-center py-36 sm:px-6 lg:px-8 z-100 mf:h-screen">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <div className="text-sm font-medium text-center text-gray-500 border-b border-gray-200 dark:text-gray-400 dark:border-gray-700">
          <ul className="flex flex-wrap -mb-px">
            {["Step 1", "Step 2", "Step 3", "Review"].map((step, index) => (
              <li className="me-2" key={index}>
                <span
                  className={`inline-block p-4 ${
                    page === index
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
              className="flex cursor-pointer w-full justify-center rounded-md border border-transparent bg-[#BF202F] py-2 px-4 text-sm font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
            >
              Prev
            </button>
            <button
              onClick={(e) => {
                if (page === titles.length - 1) {
                  submitOrder(e);
                } else {
                  setPage((currPage) => currPage + 1);
                }
              }}
              className="flex cursor-pointer w-full justify-center rounded-md border border-transparent bg-[#BF202F] py-2 px-4 text-sm font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
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
