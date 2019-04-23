import React from 'react';

export default ({
  input,
  type,
  label,
  placeholder,
  meta: { error, touched }
}) => {
  return (
    <div>
      <label>{label}: </label>
      <input type={type} placeholder={placeholder} {...input} />
      <div>{touched && error}</div>
    </div>
  );
};
