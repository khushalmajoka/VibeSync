import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./components/Home";
import Room from "./components/Room";
import PageNotFound from "./components/PageNotFound";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setRoomId } from "./store/roomSlice";

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    if (window.location.pathname.startsWith("/room/")) {
      const roomId = window.location.pathname.substring(6);
      dispatch(setRoomId(roomId));
    }
  });

  return (
    <div className="min-h-screen bg-abstract-white-and-gray-overlap-circles">
      <Router>
        <Routes>
          <Route path="/" exact element={<Home />} />
          <Route path="/room/:roomId" element={<Room />} />
          <Route path="*" element={<PageNotFound />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
