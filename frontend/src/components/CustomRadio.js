import React from "react";

const CustomRadio = ({ label, choices, setPreference }) => {
  return (
    <div>
      {label}
      {choices.map((choice) => {
        <div key={choice.text}>
          <input
            type="radio"
            name="choice"
            checked={false}
            onChange={setPreference(choice.value)}
          />
          {choice.text}
        </div>;
      })}
    </div>
  );
};

export default CustomRadio;
