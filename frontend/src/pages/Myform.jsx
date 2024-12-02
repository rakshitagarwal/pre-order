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
        ["Servings", orderData.servings],
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
    <div className="bg-gradient-to-r from-slate-100 to-red-600 w-full h-screen min-h-full flex flex-col justify-center py-36 sm:px-6 lg:px-8 z-100 mf:h-screen">
      <div></div>
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <h1 className="mt-6 text-center text-3xl font-bold tracking-tight text-gray-900">
          {titles[page]}
        </h1>
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
