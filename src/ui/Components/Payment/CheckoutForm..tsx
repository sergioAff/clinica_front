import { Dispatch, SetStateAction, useState } from "react";
import { useStripe, useElements, CardElement } from "@stripe/react-stripe-js";
import axios from "axios";
import clsx from "clsx";

export const CheckoutForm = ({
  setCurrentSection,
}: {
  setCurrentSection: Dispatch<SetStateAction<string>>;
}) => {
  // Get access to the stripe and elements objects

  const [paymentSuccess, setPaymentSuccess] = useState<string | null>(null);
  const [paymentError, setPaymentError] = useState<string | null>(null);

  // Function to handle form submission
  const stripe = useStripe();
  const elements = useElements();

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    // Check if Stripe and Elements are available
    if (!stripe || !elements) {
      return;
    }

    // Get the CardElement instance
    const cardElement = elements.getElement(CardElement);

    // Check if cardElement is not null
    if (!cardElement) {
      return;
    }

    try {
      // Create the token using the createToken method
      const result = await stripe.createToken(cardElement);
      if (result.token) {
        await handlePayment(result.token.id);
      } else {
        throw new Error("Fallo al crear el token");
      }
    } catch (error) {
      console.error(error);
      // Set payment error state if an error occurs
      setPaymentError(
        error instanceof Error
          ? error.message
          : "Ocurrió un error durante el pago"
      );
      setPaymentSuccess(null);
    }
  };

  // Function to handle the payment and get the token.id
  const handlePayment = async (tokenId: string) => {
    try {
      const response = await axios.post(
        "http://localhost:8000/payments/process-payment/",
        {
          token: tokenId,
        }
      );
      if (response.data.success) {
        // Set payment success state if successful
        setPaymentSuccess("Pago realizado");
        setPaymentError(null);
        setCurrentSection("Información");
      } else {
        setPaymentError("Fallo al pagar");
        setPaymentSuccess(null);
      }
    } catch (error) {
      console.error(error);
      // Set payment error state if an error occurs
      setPaymentError("Ha ocurrido un error durante el pago");
      setPaymentSuccess(null);
    }
  };
  // Render the form with CardElement and submit button
  return (
    <form
      onSubmit={handleSubmit}
      className="px-8 py-6  rounded-lg font-bold w-[90dvw] sm:w-[60dvw] md:w-[50dvw] lg:w-[35dvw] flex flex-col gap-6 mb-5"
    >
      <CardElement />
      <button
        type="submit"
        disabled={!stripe}
        className={clsx(
          `mt-4 py-2 bg-green-600 hover:bg-green-700 shadow-lg text-white rounded-md transition duration-200 ease-in-out cursor-pointer`,
          { "cursor-not-allowed bg-gray-400": !stripe }
        )}
      >
        Pagar
      </button>

      {/* Display payment error or success message if available */}
      {paymentError && (
        <div className="text-red-600 p-2 bg-red-100 border border-red-300 rounded-md">
          {paymentError}
        </div>
      )}
      {paymentSuccess && (
        <div className="text-green-600 p-2 bg-green-100 border border-green-300 rounded-md">
          {paymentSuccess}
        </div>
      )}
    </form>
  );
};
