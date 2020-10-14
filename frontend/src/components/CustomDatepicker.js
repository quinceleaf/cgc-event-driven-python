import { format } from "date-fns";
import DatePicker from "react-datepicker";

const DatePickerField = ({
  name,
  value,
  onChange,
  placeholder,
  initialValue,
}) => {
  return (
    <DatePicker
      className="focus:outline-none w-full min-w-full"
      selected={
        initialValue ? initialValue : (value && new Date(value)) || null
      }
      onChange={(val) => {
        const valStr = format(val, "yyyy-MM-dd");
        onChange(valStr);
      }}
      dateFormat="MMMM d, yyyy"
      placeholderText={placeholder}
    />
  );
};

const CustomDatepicker = ({
  name,
  value,
  onChange,
  inputId = "datepicker",
  label = "Date/Time",
  placeholder = "Select a date",
  initialValue = null,
}) => {
  return (
    <div className="mt-2 mb-2 w-full">
      <label htmlFor={inputId} className="text-sm text-gray-600">
        {label}
      </label>
      <br />
      <div className="p-2 w-full text-sm focus:outline-none rounded-md border-2 border-gray-200 ">
        <DatePickerField
          name={name}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          initialValue={initialValue}
        />
      </div>
    </div>
  );
};

export default CustomDatepicker;
