import { useEffect, useState } from "react";
import Step1 from "../formviews/Step1";
import Step2 from "../formviews/Step2";
import Step3 from "../formviews/Step3";
import Review from "../formviews/Review";
import { useDispatch } from "react-redux";
import { getDishes } from "../slices/DishSlice";

const Myform = () => {
  const dispatch = useDispatch();
  const [page, setPage] = useState(0);
  const [orderData, setOrderData] = useState({
    meal: "",
    people: "",
    restaurant: "",
    dishes: "",
    servings: "",
  });

  const submitOrder = async (e) => {
    const { meal, people, restaurant, dishes, servings } = orderData;
    e.preventDefault();
    try {
      // API Call
      alert("order added");
    } catch (error) {
      alert("order failed");
      console.log(error);
    }
  };

  const titles = ["Step 1", "Step 2", "Step 3", "Review"];

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
  },[]);

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
                  alert("Form Submitted");
                  submitOrder(e);
                  console.log(orderData);
                } else {
                  setPage((currPage) => currPage + 1);
                }
              }}
              className="flex cursor-pointer w-full justify-center rounded-md border border-transparent bg-[#BF202F] py-2 px-4 text-sm font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
            >
              {page === titles.length - 1 ? "Submit" : "Next"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Myform;
