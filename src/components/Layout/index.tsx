import React, { FC, useEffect, useState } from "react";
import { Snackbar } from "@material-ui/core";
import Alert from "@material-ui/lab/Alert";

import { configActions } from "redux/actions";
import { useAppSelector, useAppDispatch } from "redux/store";

const Layout: FC = ({ children }) => {
  const [visible, setVisible] = useState<boolean>(false);
  const dispatch = useAppDispatch();
  const { statusNotification } = useAppSelector((state) => state.config);
  useEffect(() => {
    if (statusNotification.show) {
      setVisible(true);
      const timeOutId = setTimeout(() => {
        setVisible(false);
        dispatch(
          configActions.setNotification({
            show: false,
            message: "",
            type: "info",
          })
        );
      }, 500);
      return () => clearTimeout(timeOutId);
    }
  }, [statusNotification]);

  const handleClose = () => {
    setVisible(false);
  };

  return (
    <div>
      {children || null}
      <Snackbar open={visible} autoHideDuration={6000} onClose={handleClose}>
        <Alert onClose={handleClose} severity={statusNotification.type}>
          {statusNotification.message || ""}
        </Alert>
      </Snackbar>
    </div>
  );
};

export default Layout;