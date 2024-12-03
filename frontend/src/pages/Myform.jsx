import { useEffect, useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getDishes } from "../slices/DishSlice";
import { addPreOrder } from "../APIs/api_path";
import { titles } from "../constants/endpoint";
import { CSVLink } from "react-csv";

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
        ["Dishes", orderData.dishes.map(dish => `${dish.name} (Servings: ${dish.servings})`).join(", ")]
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
      return (
        <div className="space-y-6">
          <div className="mt-1">
            <label className="block text-sm font-medium text-gray-700 pb-2">
              Please Select a meal{" "}
              <span className="text-red-500 font-bold text-lg">*</span>
            </label>
            <select
              id="meals"
              onChange={(e) => setOrderData({ ...orderData, meal: e.target.value })}
              value={orderData.meal || ""}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
            >
              <option value="" disabled>
                ---
              </option>
              <option value="breakfast">Breakfast</option>
              <option value="lunch">Lunch</option>
              <option value="dinner">Dinner</option>
            </select>
          </div>

          <div className="mt-1">
            <label className="block text-sm font-medium text-gray-700 pb-2">
              Please Enter Number of people{" "}
              <span className="text-red-500 font-bold text-lg">*</span>
            </label>
            <input
              onChange={(e) =>
                setOrderData({ ...orderData, people: Number(e.target.value) })
              }
              value={orderData.people}
              type="number"
              id="number"
              min={1}
              max={10}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
            />
          </div>
        </div>
      );
    } else if (page === 1) {
      console.log("orderData in step 2", orderData);
      
      return <Step2 orderData={orderData} setOrderData={setOrderData} />;
    } else if (page === 2) {
      return <Step3 orderData={orderData} setOrderData={setOrderData} />;
    } else {
      return (
        <div className="space-y-6">
      <div className="mt-1">
        <label className="block text-sm font-medium text-gray-700 pb-2">
          Meal
        </label>
        <div
          id="meal"
          className="h-14 w-full rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm bg-gray-100 text-gray-700 flex items-center"
        >
          {orderData.meal || "Not selected"}
        </div>
      </div>
      <div className="mt-1">
        <label className="block text-sm font-medium text-gray-700 pb-2">
          People
        </label>
        <div
          id="people"
          className="h-14 w-full rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm bg-gray-100 text-gray-700 flex items-center"
        >
          {orderData.people}
        </div>
      </div>
      <div className="mt-1">
        <label className="block text-sm font-medium text-gray-700 pb-2">
          Restaurant
        </label>
        <div
          id="restaurant"
          className="h-14 w-full rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm bg-gray-100 text-gray-700 flex items-center"
        >
          {orderData.restaurant || "Not selected"}
        </div>
      </div>
      <div className="mt-1">
        <label className="block text-sm font-medium text-gray-700 pb-2">
          Dishes
        </label>
        <ul
          id="dishes"
          className="space-y-2 border border-gray-300 p-3 rounded-md bg-gray-100 text-gray-700"
        >
          {orderData.dishes.length > 0 ? (
            orderData.dishes.map((entry, index) => (
              <li key={index} className="flex justify-between">
                <span>{entry.name}</span>
                <span>({entry.servings} servings)</span>
              </li>
            ))
          ) : (
            <li>No dishes selected</li>
          )}
        </ul>
      </div>
    </div>
      );
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
                if (page === 0 && orderData.meal === '') {
                  alert("Please select a meal before proceeding to the next step.");
                  return;
                }
                if (page === 1 && orderData.restaurant === '') {
                  alert("Please select a restaurant before proceeding to the next step.");
                  return;
                }
                if (page === 2 && orderData.dishes[0].name === '') {
                  alert("Please select a dish before proceeding to the next step.");
                  return;
                }
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

const Step2 = ({ orderData, setOrderData }) => {
  const mealSelected = orderData.meal;
  const [restaurants, setRestaurants] = useState([]);
  const { data } = useSelector((store) => store.dishes);

  useEffect(() => {
    const restaurants = data.data
      .filter((dish) => dish.availableMeals.includes(mealSelected))
      .map((dish) => dish.restaurant);
    const uniqueRestaurants = [...new Set(restaurants)];
    setRestaurants(uniqueRestaurants);
  }, [mealSelected]);

  return (
    <div className="space-y-6">
      <div className="mt-1">
        <label className="block text-sm font-medium text-gray-700 pb-2">
          Please Select a Restaurant{" "}
          <span className="text-red-500 font-bold text-lg">*</span>
        </label>
        <select
          id="restaurant"
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
          onChange={(e) =>
            setOrderData({ ...orderData, restaurant: e.target.value })
          }
          value={orderData.restaurant || ""}
        >
          <option value="">Select a restaurant</option>
          {restaurants.map((restaurant, index) => (
            <option key={index} value={restaurant}>
              {restaurant}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};


const Step3 = ({ orderData, setOrderData }) => {
  const restaurantSelected = orderData.restaurant;
  const [dishChoices, setDishChoices] = useState([]);
  const { data } = useSelector((store) => store.dishes);

  useEffect(() => {
    const choices = data.data
      .filter((dish) => dish.restaurant === restaurantSelected)
      .map((dish) => dish.name);
    setDishChoices(choices);
  }, [restaurantSelected, data.data]);

  const handleAddDish = () => {
    setOrderData({
      ...orderData,
      dishes: [...(orderData.dishes || []), { name: "", servings: 1 }],
    });
  };

  const handleDishChange = (index, field, value) => {
    const updatedDishes = (orderData.dishes || []).map((dish, i) =>
      i === index ? { ...dish, [field]: value } : dish
    );
    setOrderData({ ...orderData, dishes: updatedDishes });
  };

  return (
    <>
      <div className="flex flex-col gap-4">
        {(orderData.dishes || []).map((dish, index) => (
          <div key={index} className="flex flex-row gap-8 space-y-1">
            <div className="mt-1">
              <label className="block text-sm font-medium text-gray-700 pb-2">
                Select a Dish
              </label>
              <select
                id={`dish-${index}`}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
                onChange={(e) =>
                  handleDishChange(index, "name", e.target.value)
                }
                value={dish.name || ""}
              >
                <option value="">---</option>
                {dishChoices.map((name, i) => (
                  <option key={i} value={name}>
                    {name}
                  </option>
                ))}
              </select>
            </div>

            <div className="mt-0">
              <label className="block text-sm font-medium text-gray-700 pb-2">
                Enter no. of servings
              </label>
              <input
                onChange={(e) =>
                  handleDishChange(index, "servings", Number(e.target.value))
                }
                value={dish.servings || 1}
                type="number"
                id={`servings-${index}`}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
              />
            </div>
          </div>
        ))}

        <div className="pt-2 flex items-center">
          <button
            type="button"
            className="bg-blue-500 text-white p-2 rounded-lg"
            onClick={handleAddDish}
          >
            Add Dish
          </button>
        </div>
      </div>
    </>
  );
};

export default Myform;
