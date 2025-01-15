import ReactDOM from "react-dom";
import { ToastContainer, ToastContainerProps } from "react-toastify";

export const ToastPortal = (props: ToastContainerProps) => {
  const toastRoot = document.getElementById("toast-root") as HTMLElement;
  return ReactDOM.createPortal(<ToastContainer {...props} />, toastRoot);
};
