import React from "react";

const Review = ({ orderData }) => {
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
};

export default Review;
