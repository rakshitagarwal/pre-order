import { useEffect, useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getDishes } from "../slices/DishSlice";
import { addPreOrder } from "../APIs/api_path";
import { titles } from "../constants/endpoint";
import { CSVLink } from "react-csv";
import { toast } from "react-toastify";

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
  const [restaurants, setRestaurants] = useState([]);
  const [dishChoices, setDishChoices] = useState([]);
  const { data } = useSelector((store) => store.dishes);

  const totalServings = orderData.dishes.filter(dish => dish.name.trim() !== '').reduce((total, dish) => total + dish.servings, 0);

  useEffect(() => {
    const fetchData = async () => {
      await dispatch(getDishes());
    };
    fetchData();
  }, [dispatch]);

  useEffect(() => {
    if (orderData.meal) {
      const restaurantsList = data.data
        .filter((dish) => dish.availableMeals.includes(orderData.meal))
        .map((dish) => dish.restaurant);
      setRestaurants([...new Set(restaurantsList)]);
    }
  }, [orderData.meal, data]);

  useEffect(() => {
    if (orderData.restaurant) {
      const choices = data.data
        .filter((dish) => dish.restaurant === orderData.restaurant)
        .map((dish) => dish.name);
      setDishChoices(choices);
    }
  }, [orderData.restaurant, data]);

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
    } else if (page === 2) {
      const selectedDishes = orderData.dishes.filter(dish => dish.name.trim() !== '').map(dish => dish.name);
      const availableChoices = dishChoices.filter((name) => !selectedDishes.includes(name));

      return (
        <div className="flex flex-col gap-4">
          {(orderData.dishes || []).map((dish, index) => (
            <div key={index} className="flex flex-row gap-8 space-y-1">
              <div className="mt-1">
                <label className="block text-sm font-medium text-gray-700 pb-2">
                  Select a Dish
                </label>
                <select
                  id={`dish-${index}`}
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-48 p-2.5 "
                  onChange={(e) =>
                    setOrderData((prevState) => {
                      const newDishes = [...prevState.dishes];
                      newDishes[index].name = e.target.value;
                      return {
                        ...prevState,
                        dishes: newDishes,
                      };
                    })
                  }
                  value={dish.name || ""}
                >
                  <option value="">---</option>
                  {dishChoices
                    .filter((name) => !selectedDishes.includes(name) || name === dish.name)
                    .map((name, i) => (
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
                    setOrderData((prevState) => {
                      const newDishes = [...prevState.dishes];
                      newDishes[index].servings = Number(e.target.value);
                      return {
                        ...prevState,
                        dishes: newDishes,
                      };
                    })
                  }
                  value={dish.servings || 1}
                  type="number"
                  id={`servings-${index}`}
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
                />
              </div>
            </div>
          ))}
          {
            availableChoices.length > 0 && (
              <div className="pt-2 flex items-center">
                <button
                  type="button"
                  className="bg-blue-500 text-white p-2 rounded-lg"
                  onClick={() => {
                    setOrderData((prevState) => {
                      const newDishes = [...prevState.dishes];
                      newDishes.push({ name: "", servings: 1 });
                      return {
                        ...prevState,
                        dishes: newDishes,
                      };
                    });
                  }}
                >
                  Add
                </button>
              </div>
            )
          }
        </div>
      );
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
                  toast("Please select a meal before proceeding to the next step.");
                  return;
                }
                if (page === 1 && orderData.restaurant === '') {
                  toast("Please select a restaurant before proceeding to the next step.");
                  return;
                }
                if (page === 2 && orderData.dishes.some(dish => dish.name === "")) {
                  toast("Please select dish name before proceeding to the next step.");
                  return;
                }
                if (page === 2 && (totalServings > 10 || totalServings < orderData.people)) {
                  toast("total number of dishes issue");
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

export default Myform;
