import React, { useState, useEffect, useCallback,useRef } from "react";
import { Snackbar, Alert } from "@mui/material";

const useCustomToast = () => {
  const [toastQueue, setToastQueue] = useState([]);
  const [open, setOpen] = useState(false);
  const [currentToast, setCurrentToast] = useState(null);
  const snackbarRef = useRef(null);

  useEffect(() => {
    if (toastQueue.length > 0 && !open) {
      setCurrentToast(toastQueue[0]);
      setOpen(true);
      setToastQueue((prevQueue) => prevQueue.slice(1));
    }
  }, [toastQueue, open]);

  const handleClose = useCallback(() => {
    setOpen(false);
  }, []);

  const showToast = useCallback((title, severity, description, duration) => {
    setToastQueue((prevQueue) => [
      ...prevQueue,
      { 
        title, 
        description, 
        severity: severity ?? "success",
        duration: duration ?? 3000
      }
    ]);
  }, []);

  const clearToast = useCallback(() => {
    setToastQueue([]);
    setOpen(false);
    setCurrentToast(null);
  }, []);

  const getBackgroundColor = (severity) => {
    switch (severity) {
      case "success":
        return "#DEF2D6";
      case "error":
        return "#ECC8C5";
      default:
        return "blue";
    }
  };

  const getTextColor = (severity) => {
    switch (severity) {
      case "success":
        return "#5A7052";
      case "error":
        return "#B32F2D";
      default:
        return "white";
    }
  };



  const handleClickOutside = useCallback((event) => {
    if (snackbarRef.current && !snackbarRef.current.contains(event.target)) {
      handleClose();
    }
  }, [handleClose]);

  useEffect(() => {
    if (open) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [open, handleClickOutside]);



  const ToastComponent = React.memo(() => (
    currentToast && (
      <Snackbar
        open={open}
        autoHideDuration={currentToast.duration}
        onClose={handleClose}
        ref={snackbarRef} 
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      >
        <Alert
          severity={currentToast.severity}
          sx={{
            width: '100%',
            height: '100%',
            backgroundColor: getBackgroundColor(currentToast.severity),
            color: getTextColor(currentToast.severity),
            '& .MuiAlert-icon': { color: getTextColor(currentToast.severity) }
          }}
        >
          <strong>{currentToast.title}</strong>
          {currentToast.description}
        </Alert>
      </Snackbar>
    )
  ));

  return { showToast, clearToast, ToastComponent };
};

export default useCustomToast;
