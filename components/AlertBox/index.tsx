import React, { useEffect } from "react";
import { IAlertBox } from "./AlertBox.props";

const AlertBox = ({ alertStatus, setAlertStatus }: IAlertBox) => {
  useEffect(() => {
    const alertBoxTimeout = setTimeout(() => {
      setAlertStatus({ ...alertStatus, show: false });
    }, 2500);
    return () => clearTimeout(alertBoxTimeout);
  }, [alertStatus, setAlertStatus]);
  return (
    alertStatus.show && (
      <div className="absolute text-center text-accent text-2xl z-10 top-[3%] left-[25%] w-2/4 outline-none overflow-x-hidden overflow-y-auto bg-primary border-4 rounded-xl border-accent cursor-pointer" onClick={() => setAlertStatus({...alertStatus, show:false})}>
        <p className="flex justify-center items-center p-2">
          {alertStatus.msg}
        </p>
      </div>
    )
  );
};

export default AlertBox;
