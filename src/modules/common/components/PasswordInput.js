import React, {PropTypes} from 'react';


const TextInput = ({label, value, placeholder, name, onChange, error}) => {
  return (
    <div className="form-group">
      <label htmlFor={name}>{label}</label>
      {!!error && <span className="error-msg">{error}</span>}
      <input
        type="password"
        className="form-control"
        placeholder={placeholder}
        name={name}
        value={value}
        onChange={onChange}
        />
    </div>
  );
};

TextInput.propTypes = {
  label: PropTypes.string.isRequired,
  value: PropTypes.string,
  placeholder: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  error: PropTypes.string
};

export default TextInput;
