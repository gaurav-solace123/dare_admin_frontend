import { useState, useEffect } from "react";
import { Snackbar, Alert } from "@mui/material";

const useCustomToast = () => {
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

  const showToast = (title, severity = "success", description, duration = 3000) => {
    setToastQueue((prevQueue) => [
      ...prevQueue,
      { title, description, severity, duration }
    ]);
  };

  // Function to clear the current toast
  const clearToast = () => {
    setToastQueue([]); // Clear the toast queue
    setOpen(false);    // Close the current toast
    setCurrentToast(null); // Clear the current toast
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
            backgroundColor: currentToast.severity === "success" ? "#DEF2D6" : currentToast.severity === "error" ? "#ECC8C5" : "blue",
            color: currentToast.severity === "success" ? "#5A7052" : currentToast.severity === "error" ? "#B32F2D" : "white",
            '& .MuiAlert-icon': { color: currentToast.severity === "success" ? "#5A7052" : currentToast.severity === "error" ? "#B32F2D" : "white" }
          }}
        >
          <strong>{currentToast.title}</strong>
          {currentToast.description}
        </Alert>
      </Snackbar>
    )
  );

  return { showToast, clearToast, ToastComponent };
};

export default useCustomToast;
