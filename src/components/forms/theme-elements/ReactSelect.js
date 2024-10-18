import React from 'react';
import Select from 'react-select';

const ReactSelect = ({ options, id, label, displayEmpty, error, ...rest }) => {
  // Custom styles for react-select
  const customStyles = {
    control: (provided, _state) => ({
      ...provided,
      borderColor: error ? 'red' : provided.borderColor,
    }),
    placeholder: (provided) => ({
      ...provided,
      color: '#aaa',
    }),
  };

  return (
    <Select
      id={id}
      options={options}
      styles={customStyles}
      maxMenuHeight={200}
      placeholder={displayEmpty ? label : null}
      {...rest}
    />
  );
};
 export default ReactSelect