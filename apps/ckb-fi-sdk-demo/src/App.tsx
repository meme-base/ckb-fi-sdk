import { ToastPortal } from "./component/ToastPortal";
import Bonding from "./component/Bonding";

function App() {
  return (
    <div className="layout">
      <Bonding />

      <ToastPortal
        theme="light"
        position="top-center"
        limit={1}
        newestOnTop
        hideProgressBar
        autoClose={2500}
        closeButton={false}
        pauseOnFocusLoss={false}
      />
    </div>
  );
}

export default App;
