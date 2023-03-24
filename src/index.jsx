import { render } from "solid-js/web";

function App() {
  return (
    <div>
      <p>Hello world!</p>
    </div>
  );
}

// a dirty trick to the app disposing
let HMRdata = {};
if (import.meta.hot) HMRdata = import.meta.hot.data;
if (HMRdata["appDisposer"]) HMRdata["appDisposer"]();
HMRdata["appDisposer"] = render(() => <App />, document.getElementById("root"));
