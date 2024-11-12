import { Input, InputGroup, InputGroupText } from "reactstrap";

const DateWriteInput = ({ value, setValue, label,placeholder }) => {
  // Format the input value as dd-mm-yyyy
  const formatDate = (val) => {
    // Remove non-digit characters
    const digits = val.replace(/\D/g, "");

    // Limit the length to 8 digits (ddmmyyyy)
    const limitedDigits = digits.substring(0, 8);

    // Format as dd-mm-yyyy
    const day = limitedDigits.substring(0, 2);
    const month = limitedDigits.substring(2, 4);
    const year = limitedDigits.substring(4, 8);

    let formatted = "";
    if (day) formatted += day;
    if (month) formatted += "  -  " + month;
    if (year) formatted += "  -  " + year;

    return formatted;
  };

  const handleChange = (e) => {
    const inputValue = e.target.value;
    const formattedValue = formatDate(inputValue);
    if (setValue) setValue(formattedValue);
  };

  return (
    <InputGroup>
      <InputGroupText className="bg-transparent color-7777">{label}</InputGroupText>
      <Input
        type="text"
        onChange={handleChange}
        placeholder={placeholder??"dd-mm-yyyy"}
        value={value}
        className="normal-input bg-transparent"
   
      />
    </InputGroup>
  );
};

export default DateWriteInput;
