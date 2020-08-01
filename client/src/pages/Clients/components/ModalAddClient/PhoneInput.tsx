import React from "react";
import NumberFormat from "react-number-format";

function PhoneInput(props: any) {
  const { inputRef, ...other } = props;
  return (
    <NumberFormat
      {...other}
      getInputRef={inputRef}
      format="+7 (###) ###-####"
      mask="_"
    />
  );
}
export default PhoneInput;
