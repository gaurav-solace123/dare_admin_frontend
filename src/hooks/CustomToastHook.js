import { useState, useEffect } from "react";
import { Snackbar, Alert } from "@mui/material";

const CustomToastHook = () => {
  const [toastQueue, setToastQueue] = useState([]);
  const [open, setOpen] = useState(false);
  const [currentToast, setCurrentToast] = useState(null);

  useEffect(() => {
    if (toastQueue.length > 0 && !open) {
      setCurrentToast(toastQueue[0]);
      setOpen(true);
      setToastQueue((prevQueue) => prevQueue.slice(1));
    }
  }, [toastQueue, open]);

  const handleClose = () => {
    setOpen(false);
  };

  const showToast = (title, severity, description, duration) => {
    setToastQueue((prevQueue) => [
      ...prevQueue,
      { 
        title, 
        description, 
        severity: severity ?? "success",  // Use nullish coalescing to apply default if severity is undefined or null
        duration: duration ?? 3000        // Use default value if duration is undefined or null
      }
    ]);
  };
  

  // Function to clear the current toast
  const clearToast = () => {
    setToastQueue([]); // Clear the toast queue
    setOpen(false);    // Close the current toast
    setCurrentToast(null); // Clear the current toast
  };

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
  
  const ToastComponent = () => (
    currentToast && (
      <Snackbar
        open={open}
        autoHideDuration={currentToast.duration}
        onClose={handleClose}
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
  );
  
  return { showToast, clearToast, ToastComponent };
}  

export default CustomToastHook;
