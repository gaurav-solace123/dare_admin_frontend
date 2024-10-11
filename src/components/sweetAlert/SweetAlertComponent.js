import React, { useEffect } from 'react';
import Swal from 'sweetalert2';

const SweetAlertComponent = ({ title, text, onConfirm, onCancel, setAlert, title2, text2 }) => {
  useEffect(() => {
    const handleAlert = async () => {
      const result = await Swal.fire({
        title,
        text,
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, logout!",
      });

      if (result.isConfirmed) {
        await onConfirm();
        await Swal.fire({
          title: title2,
          text: text2,
          icon: "success"
        });
      } else {
        onCancel();
      }
      setAlert(false);
    };

    if (setAlert) {
      handleAlert();
    }
  }, [title, text, onConfirm, onCancel, setAlert, title2, text2]);

  return (
    <>
      {setAlert && (
        <div
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0, 
            zIndex: 1300,
            pointerEvents: 'all',
          }}
        />
      )}
    </>
  ); 
};

export default SweetAlertComponent;
