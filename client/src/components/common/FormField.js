import React from 'react';

export default ({ input, type, label, placeholder }) => {
  return (
    <div>
      <label>{label}: </label>
      <input type={type} placeholder={placeholder} {...input} />
    </div>
  );
};
