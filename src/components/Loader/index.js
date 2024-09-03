// components/Loader.js
import React from 'react';

const Loader = () => {
  const loaderStyles = {
    width: '100%',
    height: '100%',
    position: 'fixed',
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
    backgroundColor: 'rgba(255,255,255,.5)',
    zIndex: 9999,
  };

  const wheelStyles = {
    width: '20px',
    height: '20px',
    marginTop: '-40px',
    marginLeft: '-40px',
    position: 'absolute',
    top: '50%',
    left: '50%',
    borderWidth: '30px',
    borderRadius: '50%',
    borderStyle: 'double',
    borderColor: '#71AEDD transparent',
    animation: 'spin 1s linear infinite',
  };

  return (
    <div style={loaderStyles}>
      <div style={wheelStyles}></div>
    </div>
  );
};

export default Loader;
