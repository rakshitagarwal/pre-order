import React from "react";

const Review = ({ values }) => {
  return (
    <div className="space-y-3">
      <div className="mt-1">
        <label className="block text-sm font-medium text-gray-700 pb-1">
          Meal
        </label>
        <div
          id="meal"
          className="h-10 w-full rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm bg-gray-100 text-gray-700 flex items-center"
        >
          {values.meal || "Not selected"}
        </div>
      </div>
      <div className="mt-0">
        <label className="block text-sm font-medium text-gray-700 pb-1">
          People
        </label>
        <div
          id="people"
          className="h-10 w-full rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm bg-gray-100 text-gray-700 flex items-center"
        >
          {values.people}
        </div>
      </div>
      <div className="mt-0">
        <label className="block text-sm font-medium text-gray-700 pb-1">
          Restaurant
        </label>
        <div
          id="restaurant"
          className="h-10 w-full rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm bg-gray-100 text-gray-700 flex items-center"
        >
          {values.restaurant || "Not selected"}
        </div>
      </div>
      <div className="mt-0">
        <label className="block text-sm font-medium text-gray-700 pb-1">
          Dishes
        </label>
        <ul
          id="dishes"
          className="space-y-0 border border-gray-300 p-3 rounded-md bg-gray-100 text-gray-700"
        >
          {values.dishes.length > 0 ? (
            values.dishes.map((entry, index) => (
              <li key={index} className="flex justify-between">
                <span>{entry.name}</span>
                <span>{entry.servings}</span>
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
