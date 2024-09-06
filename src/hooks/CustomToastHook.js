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

  const showToast = (title, description, severity = "success", duration = 3000) => {
    setToastQueue((prevQueue) => [
      ...prevQueue,
      { title, description, severity, duration }
    ]);
  };

  const ToastComponent = () => (
    currentToast && (
      <Snackbar
        open={open}
        autoHideDuration={currentToast.duration}
        onClose={handleClose}
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      >
        <Alert onClose={handleClose} severity={currentToast.severity} sx={{ width: '100%',height:'100%' }}>
          <strong>{currentToast.title}</strong>
          {currentToast.description}
        </Alert>
      </Snackbar>
    )
  );

  return { showToast, ToastComponent };
};

export default useCustomToast;
