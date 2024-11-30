import { Input, InputGroup, InputGroupText } from "reactstrap";

const DateWriteInput = ({ value, setValue, label, placeholder }) => {
  // Format the input value as yyyy-mm-dd
  const formatDate = (val) => {
    // Remove non-digit characters
    const digits = val.replace(/\D/g, "");

    // Limit the length to 8 digits (yyyymmdd)
    const limitedDigits = digits.substring(0, 8);

    // Format as yyyy-mm-dd
    const year = limitedDigits.substring(0, 4);
    const month = limitedDigits.substring(4, 6);
    const day = limitedDigits.substring(6, 8);

    let formatted = "";
    if (year) formatted += year;
    if (month) formatted += "-" + month;
    if (day) formatted += "-" + day;

    return formatted;
  };

  const handleChange = (e) => {
    const inputValue = e.target.value;
    const formattedValue = formatDate(inputValue);
    if (setValue) setValue(formattedValue);
  };

  return (
    <InputGroup>
      <InputGroupText className="bg-transparent color-7777">
        {label}
      </InputGroupText>
      <Input
        type="text"
        onChange={handleChange}
        placeholder={placeholder ?? "yyyy-mm-dd"}
        value={value}
        className="normal-input bg-transparent"
      />
    </InputGroup>
  );
};

export default DateWriteInput;
