// import { useNavigate } from "react-router-dom";
import SideNavBar from "../components/Home/SideNavBar/SideNavBar";
import Dashboard from "../components/Home/Dashboard/Dashboard";
import ChatSection from "../components/Home/ChatSection/ChatSection";
import "./Home.css";

export default function Home() {
  //   const navigate = useNavigate();
  //   function handleLogin() {
  //     navigate("/login");
  //   }
  // const tokenStr = localStorage.getItem("accessToken");

  return (
    <div className="home-section">
      <SideNavBar />
      <div className="home-section-wrapper">
        <ChatSection />
        <Dashboard />
      </div>
      {/* Home
      <button onClick={handleLogin}>Login</button>
      <Link to="/signup">Signup</Link> */}
    </div>
  );
}
