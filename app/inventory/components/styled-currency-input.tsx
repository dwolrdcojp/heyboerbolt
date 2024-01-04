import CurrencyInput from "react-currency-input-field";
import { Input } from "@/components/ui/input"; // Your custom styled Input

export const StyledCurrencyInput = ({ ...props }) => {
  return <CurrencyInput {...props} customInput={Input} />;
};
