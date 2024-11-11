import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { CheckoutForm } from "./CheckoutForm.";
import { Dispatch, SetStateAction } from "react";

const stripePromise = loadStripe(
  "pk_test_51PsVUa094T9Rbqk5wlYTnlxijKmSClKHSYAUxVLWbCyW8GnlOTBIQsTPPXBRqRQgN33dKnIX8viIfcrBNEwvvKx900Rd9PFhZl"
);
export const PaymentComponent = ({
  setCurrentSection,
}: {
  setCurrentSection: Dispatch<SetStateAction<string>>;
}) => {
  return (
    <>
      <Elements stripe={stripePromise}>
        <CheckoutForm setCurrentSection={setCurrentSection} />
      </Elements>
      <div className=" px-8 py-6  rounded-lg font-bold w-[90dvw] sm:w-[60dvw] md:w-[50dvw] lg:w-[35dvw] flex flex-col gap-6 mb-5">
        <button
          type="submit"
          className="mt-4 py-2 bg-green-600 hover:bg-green-700 shadow-lg text-white rounded-md transition duration-200 ease-in-out cursor-pointer"
          onClick={() => setCurrentSection("Información")}
        >
          Pagar en efectivo
        </button>
      </div>
    </>
  );
};
