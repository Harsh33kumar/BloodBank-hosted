// import { BrowserRouter, Routes, Route } from "react-router-dom";
// import Navbar from "./components/Navbar";
// import Login from "./pages/Login";
// import RegisterHospital from "./pages/RegisterHospital";
// import RegisterReceiver from "./pages/RegisterReceiver";
// import AddBlood from "./pages/AddBlood";
// import ViewRequest from "./pages/ViewRequest";
// import BloodSamples from "./pages/BloodSamples";
// import Dashboard from "./pages/Dashboard";
// import HospitalDashboard from "./pages/HospitalDashboard";
// import ReceiverDashboard from "./pages/ReceiverDashboard";
// import RequestBlood from "./pages/RequestBlood";
// import RequestStatus from "./pages/requestStatus";

// function App() {
//   return (
//     <BrowserRouter>
//       <Navbar />
//       <Routes>
//         <Route path="/" element={<ReceiverDashboard />} />
//         <Route path="/login" element={<Login />} />
//         <Route path="/register-hospital" element={<RegisterHospital />} />
//         <Route path="/register-receiver" element={<RegisterReceiver />} />
//         <Route path="/add-blood" element={<AddBlood />} />
//         <Route path="/blood-samples" element={<BloodSamples />} />
//         <Route path="/view-requests" element={<ViewRequest />} />
//         <Route path="/hospitaldashboard" element={<HospitalDashboard />} />
//         <Route path="/receiverdashboard" element={<ReceiverDashboard />} />
//         <Route path="/request-blood" element={<RequestBlood />} />
//         <Route path="/request-status" element={<RequestStatus />} />
//       </Routes>
//     </BrowserRouter>
//   );
// }

// export default App;


import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";

import Login from "./pages/Login";
import RegisterHospital from "./pages/RegisterHospital";
import RegisterReceiver from "./pages/RegisterReceiver";
import AddBlood from "./pages/AddBlood";
import ViewRequest from "./pages/ViewRequest";
import BloodSamples from "./pages/BloodSamples";
import HospitalDashboard from "./pages/HospitalDashboard";
import ReceiverDashboard from "./pages/ReceiverDashboard";
import RequestBlood from "./pages/RequestBlood";
import RequestStatus from "./pages/requestStatus";

import ProtectedRoute from "./components/ProtectedRoute";

function App() {
  const user = JSON.parse(localStorage.getItem("user"));

  return (
    <BrowserRouter>
      <Navbar />

      <Routes>

        {/* ================= PUBLIC ROUTES ================= */}
        <Route path="/login" element={<Login />} />
        <Route path="/register-hospital" element={<RegisterHospital />} />
        <Route path="/register-receiver" element={<RegisterReceiver />} />

        {/* Receiver dashboard & requests (accessible if NOT logged in or receiver) */}
        <Route path="/" element={<ReceiverDashboard />} />
        <Route path="/receiverdashboard" element={<ReceiverDashboard />} />
        <Route path="/request-blood" element={<RequestBlood />} />

        {/* ================= HOSPITAL ROUTES ================= */}
        <Route
          path="/hospitaldashboard"
          element={
            <ProtectedRoute allowedRoles={["hospital"]}>
              <HospitalDashboard />
            </ProtectedRoute>
          }
        />

        <Route
          path="/add-blood"
          element={
            <ProtectedRoute allowedRoles={["hospital"]}>
              <AddBlood />
            </ProtectedRoute>
          }
        />

        <Route
          path="/blood-samples"
          element={
            <ProtectedRoute allowedRoles={["hospital"]}>
              <BloodSamples />
            </ProtectedRoute>
          }
        />

        <Route
          path="/request-status"
          element={
            <ProtectedRoute allowedRoles={["hospital"]}>
              <RequestStatus />
            </ProtectedRoute>
          }
        />

        {/* ================= RECEIVER ONLY ROUTES ================= */}
        <Route
          path="/view-requests"
          element={
            <ProtectedRoute allowedRoles={["receiver"]}>
              <ViewRequest />
            </ProtectedRoute>
          }
        />

      </Routes>
    </BrowserRouter>
  );
}

export default App;