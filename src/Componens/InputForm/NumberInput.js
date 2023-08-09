import theme from "@/Helper/theme";
import { grey } from "@mui/material/colors";
import React, { useRef, useState } from "react";
import { IMaskInput } from "react-imask";

export default function NumberInput() {
  const [isFocused, setIsFocused] = useState(false);
  const ref = useRef(null);
  const inputRef = useRef(null);

  const inputStyle = {
    borderRadius: theme.spacing(1),
    width: "100%",
    height: "40px",
    fontSize: "1rem",
    paddingLeft: "0.8rem",
    paddingRight: "0.8rem",
    borderColor: isFocused ? theme.palette.primary.main : grey[400],
    borderWidth: isFocused ? 3 : "1px",
    outline: "none",
    borderStyle: "solid",
  };

  return (
    <IMaskInput
      mask={Number}
      radix="."
      value="123"
      unmask={true} // true|false|'typed'
      ref={ref}
      inputRef={inputRef} // access to nested input
      // DO NOT USE onChange TO HANDLE CHANGES!
      // USE onAccept INSTEAD
      onAccept={
        // depending on prop above first argument is
        // `value` if `unmask=false`,
        // `unmaskedValue` if `unmask=true`,
        // `typedValue` if `unmask='typed'`
        (value, mask) => console.log(value)
      }
      // ...and more mask props in a guide

      // input props also available
      placeholder="Enter number here"
    />
  );
}
