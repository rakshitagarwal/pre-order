import React from "react";

const Review = ({ orderData }) => {
  console.log("orderData", orderData);

  return (
    <div className="space-y-6">
      <div className="mt-1">
        <label className="block text-sm font-medium text-gray-700 pb-2">
          meal
        </label>
        <input
          value={orderData.meal}
          type="text"
          id="firstName"
          className="block h-14 w-full appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
        />
      </div>
      <div className="mt-1">
        <label className="block text-sm font-medium text-gray-700 pb-2">
          people
        </label>
        <input
          value={orderData.people}
          type="text"
          id="firstName"
          className="block h-14 w-full appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
        />
      </div>
      <div className="mt-1">
        <label className="block text-sm font-medium text-gray-700 pb-2">
          restaurant
        </label>
        <input
          value={orderData.restaurant}
          type="text"
          id="firstName"
          className="block h-14 w-full appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
        />
      </div>
      <div className="mt-1">
        <label className="block text-sm font-medium text-gray-700 pb-2">
          dishes
        </label>
        <input
          value={orderData.dishes}
          type="text"
          id="firstName"
          className="block h-14 w-full appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
        />
      </div>
      <div className="mt-1">
        <label className="block text-sm font-medium text-gray-700 pb-2">
          servings
        </label>
        <input
          value={orderData.servings}
          type="text"
          id="firstName"
          className="block h-14 w-full appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
        />
      </div>
    </div>
  );
};

export default Review;
