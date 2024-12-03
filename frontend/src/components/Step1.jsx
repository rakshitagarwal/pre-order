import { Field, ErrorMessage } from "formik";

const Step1 = ({ setFieldValue }) => {
  return (
    <div className="space-y-6">
      <div className="mt-1">
        <label className="block text-sm font-medium text-gray-700 pb-2">
          Please Select a meal{" "}
          <span className="text-red-500 font-bold text-lg">*</span>
        </label>
        <Field
          as="select"
          name="meal"
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5"
          onChange={(e) => setFieldValue("meal", e.target.value)}
        >
          <option value="" disabled>
            ---
          </option>
          <option value="breakfast">Breakfast</option>
          <option value="lunch">Lunch</option>
          <option value="dinner">Dinner</option>
        </Field>
        <ErrorMessage
          name="meal"
          component="div"
          className="text-red-500 text-sm mt-1"
        />
      </div>

      <div className="mt-1">
        <label className="block text-sm font-medium text-gray-700 pb-2">
          Please Enter Number of people{" "}
          <span className="text-red-500 font-bold text-lg">*</span>
        </label>
        <Field
          type="number"
          name="people"
          min={1}
          max={10}
          step={1}
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5"
          onChange={(e) => {
            const value = Math.floor(Number(e.target.value));
            setFieldValue("people", value);
          }}
        />
        <ErrorMessage
          name="people"
          component="div"
          className="text-red-500 text-sm mt-1"
        />
      </div>
    </div>
  );
};

export default Step1;
