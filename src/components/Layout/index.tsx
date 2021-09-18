import React, { FC, useEffect, useState } from "react";
import { Snackbar } from "@material-ui/core";
import Alert from "@material-ui/lab/Alert";

// import { configActions } from "redux/actions";
import { useAppSelector } from "redux/store";

const Layout: FC = ({ children }) => {
  const [visible, setVisible] = useState<boolean>(false);
  const { statusNotification } = useAppSelector((state) => state.config);

  useEffect(() => {
    if (statusNotification.show) {
      setVisible(true);
      const timeoutId = setTimeout(() => {
        setVisible(false);
      }, 2500);
      return () => clearTimeout(timeoutId);
    }
  }, [statusNotification]);

  const handleClose = () => {
    setVisible(false);
  };

  return (
    <div>
      {children || null}
      <Snackbar
        open={visible}
        onClose={handleClose}
        anchorOrigin={{
          horizontal: "right",
          vertical: "top",
        }}
      >
        <Alert onClose={handleClose} severity={statusNotification.type}>
          {statusNotification.message ||
            "Something went wrong.Please try again!"}
        </Alert>
      </Snackbar>
    </div>
  );
};

export default Layout;
