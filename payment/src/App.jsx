/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
import { useState } from "react";
import { usePaymentInputs } from "react-payment-inputs";
import images from "react-payment-inputs/images";

import { Button } from "./components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

const formSchema = z.object({
  // username: z.string().min(2).max(50),
  cardNumber: z
    .string()
    .min(16, {
      message: "Card Pattern must be in the format 1234 5678 9012 3456",
    })
    .max(19, {
      message: "Card Pattern must be in the format 1234 5678 9012 3456",
    })
    .regex(/^\d{4} \d{4} \d{4} \d{4}|\d{4} \d{4} \d{4} \d{3}$/),
  // expiryDate: z.string().refine(
  //   (value) => {
  //     // Ensure the string matches the format "MM/YY"
  //     const regex = /^(0[1-9]|1[0-2])\s*\/\s*\d{2}$/;
  //     return regex.test(value.trim());
  //   },
  //   {
  //     message: "Expiry date must be in the format MM/YY",
  //   }
  // ),
  // expiryDate: z
  //   .string()
  //   .refine(
  //     (value) => {
  //       const currentYear = new Date().getFullYear();
  //       // Ensure the string matches the format "MM/YY" with optional spaces
  //       const regex = /^(0[1-9]|1[0-2])\s*\/\s*\d{2}$/;
  //       if (!regex.test(value.trim())) {
  //         return {
  //           message: "Expiry date must be in the format MM/YY",
  //           path: [],
  //         };
  //       }

  //       // Extract month and year from the input value
  //       const [month, year] = value.trim().split("/");
  //       const formattedYear = parseInt(year, 10) + 2000; // Convert YY to YYYY format

  //       // Ensure the month is between 01 and 12
  //       if (parseInt(month, 10) < 1 || parseInt(month, 10) > 12) {
  //         // return false;
  //         // return {
  //         //   message: "Month must be between 01 and 12",
  //         //   path: ["expiryDate"],
  //         // };
  //         console.log("Month validation failed");
  //         throw new Error("Month must be between 01 and 12");
  //       }

  //       // Ensure the year is greater than the current year
  //       if (formattedYear <= currentYear) {
  //         // return false;
  //         return {
  //           message: "Year must be greater than the current year",
  //           path: ["expiryDate"],
  //         };
  //       }

  //       return true;
  //     },
  //     {
  //       message: "Expiry date must be in the format MM/YY and valid",
  //     }
  //   )
  //   .transform((val) => val.trim()), // MM/YY
  expiryDate: z
    .string()
    .refine(
      (value) => {
        const currentYear = new Date().getFullYear();
        const trimmedValue = value.trim();
        console.log("Trimmed value:", trimmedValue);

        const [month, year] = trimmedValue
          .split("/")
          .map((str) => parseInt(str, 10));

        console.log("Month:", month);
        console.log("Year:", year);

        const regex = /^(0[1-9]|1[0-2])\s*\/\s*\d{2}$/;
        if (!regex.test(trimmedValue)) {
          return false;
        }

        if (month < 1 || month > 12) {
          throw new Error("Month must be between 01 and 12");
        }

        // Adjusted the current year condition to compare against the last two digits of the current year
        const currentYearLastTwoDigits = parseInt(
          currentYear.toString().slice(-2),
          10
        );
        if (year < currentYearLastTwoDigits) {
          throw new Error("Year must be greater than the current year");
        }

        return true;
      },
      {
        message: "Expiry date must be in the format MM/YY and valid",
      }
    )
    .transform((val) => val.trim()),
  cvc: z
    .string()
    .min(3, {
      message: "CVC must be a 3 digit number",
    })
    .max(4, {
      message: "CVC must be a 3 digit number",
    })
    .regex(/^\d+$/),
});

function App() {
  const {
    meta,
    getCardNumberProps,
    getExpiryDateProps,
    getCVCProps,
    getCardImageProps,
  } = usePaymentInputs();
  const { erroredInputs, touchedInputs } = meta;

  // const [cardNumber, setCardNumber] = useState("");
  // const [expiryDate, setExpiryDate] = useState("");
  // const [cvc, setCvc] = useState("");

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      cardNumber: "",
      expiryDate: "",
      cvc: "",
    },
  });

  function onSubmit(values) {
    console.log("Form data:", values); // Log form data
    // Submit logic here
    form.reset(); // Reset form
  }

  // const handleChangeCardNumber = (e) => {
  //   const value = e.target.value;
  //   setCardNumber(value); // Update cardNumber state
  //   form.setValue("cardNumber", value); // Update form state
  //   console.log(value); // Log cardNumber value
  // };
  // const handleChangeExpiryDate = (e) => {
  //   const value = e.target.value;
  //   setExpiryDate(value);
  //   form.setValue("expiryDate", value); // Update form state
  //   console.log(value);
  // };
  // const handleChangeCVC = (e) => {
  //   const value = e.target.value;
  //   setCvc(value);
  //   form.setValue("cvc", value); // Update form state
  //   console.log(value); // Log cardNumber value
  // };

  return (
    <>
      <div className="w-full h-screen flex flex-col items-center justify-center">
        <Form onSubmit={form.handleSubmit(onSubmit)} {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="cardNumber"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Card Number </FormLabel>
                  <FormControl>
                    <div className="w-full relative">
                      <Input
                        placeholder="1234 5678 9012 3456"
                        className="w-96 border border-gray-300 rounded-md p-2 border-b-4 h-[40px]"
                        {...field}
                        {...getCardNumberProps({
                          onChange: (e) => {
                            field.onChange(e);
                            const validationResult = formSchema.safeParse({
                              cardNumber: e.target.value,
                            });
                            // console.log(validationResult);
                          },
                        })}
                        // value={cardNumber}
                      />
                      <div className="absolute right-3 top-3">
                        <svg
                          {...getCardImageProps({ images })}
                          // className="object-cover w-8 h-8"
                        />
                      </div>
                    </div>
                  </FormControl>
                  {form.formState.errors.cardNumber && (
                    <FormMessage>
                      {form.formState.errors.cardNumber.message}
                    </FormMessage>
                  )}
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="expiryDate"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Expiry Date</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Expiry Date"
                      className="w-96 border border-gray-300 rounded-md p-2 border-b-4 h-[40px]"
                      {...field}
                      {...getExpiryDateProps({
                        onChange: (e) => {
                          field.onChange(e);
                          const validationResult = formSchema.safeParse({
                            expiryDate: e.target.value,
                          });
                          // console.log(validationResult);
                        },
                      })}
                      // value={expiryDate}
                    />
                  </FormControl>
                  {form.formState.errors.expiryDate && (
                    <FormMessage>
                      {form.formState.errors.expiryDate.message}
                    </FormMessage>
                  )}
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="cvc"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Cvc Number</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Cvc Number"
                      className="w-96 border border-gray-300 rounded-md p-2 border-b-4 h-[40px]"
                      {...field}
                      {...getCVCProps({
                        onChange: (e) => {
                          field.onChange(e);
                          const validationResult = formSchema.safeParse({
                            cvc: e.target.value,
                          });
                          // console.log(validationResult);
                        },
                      })}
                      // value={cvc}
                      // onChange={(e) => {
                      //   field.onChange(e);
                      //   // Validate cvc on input change
                      //   const validationResult = formSchema.safeParse({
                      //     cvc: e.target.value,
                      //   });
                      //   console.log({ validationResult });
                      // }}
                    />
                  </FormControl>
                  {form.formState.errors.cvc && (
                    <FormMessage>
                      {form.formState.errors.cvc.message}
                    </FormMessage>
                  )}
                </FormItem>
              )}
            />
            <div className="w-full flex justify-end">
              <Button
                className="w-full flex justify-center items-center"
                type="submit"
              >
                Submit
              </Button>
            </div>
          </form>
        </Form>
      </div>
    </>
  );
}

export default App;
