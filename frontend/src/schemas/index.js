import * as yup from "yup";

export const step1Schema = yup.object().shape({
  meal: yup.string().required("Please select a meal."),
  people: yup
    .number()
    .positive()
    .integer()
    .required("Please enter the number of people."),
});

export const step2Schema = yup.object().shape({
  restaurant: yup
    .string()
    .min(3, "Restaurant name must be at least 3 characters long")
    .required("Please select a restaurant."),
});

export const step3Schema = yup.object().shape({
  dishes: yup
    .array()
    .of(
      yup.object().shape({
        name: yup.string().required("Dish name is required"),
        servings: yup
          .number()
          .positive()
          .integer()
          .required("Servings are required"),
      })
    )
    .min(1, "At least one dish must be added")
    .required("Dishes are required"),
});
