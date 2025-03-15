import { useState } from "react";


// boolean hook
const useBoolean = () => {
  const [value, setValue] = useState(false);

  const onToggle = () => {
    setValue((prev) => !prev);
  };

  const onTrue = () => {
    setValue(true);
  };
  const onFalse = () => {
    setValue(false);
  };
  return {value,onToggle,onFalse,onTrue}
};

export default useBoolean;
