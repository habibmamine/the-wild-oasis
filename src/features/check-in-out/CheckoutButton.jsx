/* eslint-disable react/prop-types */
import Button from "../../ui/Button";
import useCheckout from "./useCheckout";

function CheckoutButton({ bookingId }) {
  const { isCheckingOut, mutateCheckout } = useCheckout();
  return (
    <Button
      variation="primary"
      size="small"
      onClick={() => mutateCheckout(bookingId)}
      disabled={isCheckingOut}
    >
      Check out
    </Button>
  );
}

export default CheckoutButton;
