import "./App.css";
import Siderbar from "./components/siderbar";
import Home from "./pages/home";
import { RxAvatar } from "react-icons/rx";

function App() {
  return (
    <>
      <div className="md:hidden flex bg-gray-200 p-4 w-[89%] items-center hover:text-blue-700 space-x-4 text-gray-600">
        <RxAvatar className="text-2xl" />
        <span>School</span>
      </div>
      <div className="flex">
        <Siderbar />
        <Home />
      </div>
    </>
  );
}

export default App;
