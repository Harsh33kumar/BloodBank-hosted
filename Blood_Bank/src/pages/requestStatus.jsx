import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function RequestStatus() {
  const navigate = useNavigate();

  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);

  const host = "http://localhost/backend_bb";

  const user = JSON.parse(localStorage.getItem("user") || "{}");

  useEffect(() => {
    if (!user || user.role !== "hospital") {
      navigate("/login");
      return;
    }

    fetchRequests();
  }, []);

  const fetchRequests = async () => {
    try {
      const response = await axios.get(`${host}/getHospitalRequests.php`, {
        params: {
          hospital_name: user.username,
        },
      });

      if (response.data.status) {
        setRequests(response.data.data);
      }
    } catch (error) {
      console.error(error);
      alert("Failed to fetch requests");
    } finally {
      setLoading(false);
    }
  };

  const updateStatus = async (requestId, status) => {
    try {
      const response = await axios.post(`${host}/updateRequestStatus.php`, {
        requestId,
        status,
      });

      if (response.data.status) {
        alert("Status Updated");
        fetchRequests();
      } else {
        alert(response.data.message);
      }
    } catch (error) {
      console.error(error);
      alert("Failed to update status");
    }
  };

  const deleteRequest = async (requestId) => {
  // console.log("Deleting ID:", requestId);

  const confirmDelete = window.confirm(
    "Are you sure you want to delete this request?"
  );

    if (!confirmDelete) return;

    try {
      const response = await axios.post(`${host}/deleteRequest.php`, {
        id: requestId,
      });

      if (response.data.status) {
        alert("Request deleted successfully");
        fetchRequests();
      } else {
        alert(response.data.message);
      }
    } catch (error) {
      console.error(error);
      alert("Failed to delete request");
    }
  };

  return (
    <div className="container">
      <h2>Blood Request Management</h2>

      <table border="1" width="100%" cellPadding="10">
        <thead>
          <tr>
            <th>Receiver</th>
            <th>Email</th>
            <th>Contact</th>
            <th>Blood Group</th>
            <th>Quantity</th>
            <th>Status</th>
            <th>Action</th>
          </tr>
        </thead>

        <tbody>
          {loading ? (
            <tr>
              <td colSpan="7">Loading...</td>
            </tr>
          ) : requests.length > 0 ? (
            requests.map((request) => (
              <tr key={request.id}>
                <td>{request.receiver_name}</td>
                <td>{request.email}</td>
                <td>{request.contact}</td>
                <td>{request.requested_blood_group}</td>
                <td>{request.quantity}</td>

                <td>
                  <strong>{request.status}</strong>
                </td>

                <td>
                  <button
                    onClick={() => updateStatus(request.id, "Approved")}
                    disabled={request.status === "Approved"}
                  >
                    Approve
                  </button>{" "}
                  <button
                    onClick={() => updateStatus(request.id, "Rejected")}
                    disabled={request.status === "Rejected"}
                  >
                    Reject
                  </button>{" "}
                  <button
                    onClick={() => deleteRequest(request.id)}
                    style={{
                      backgroundColor: "red",
                      color: "white",
                      border: "none",
                      padding: "5px 10px",
                      cursor: "pointer",
                    }}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="7">No blood requests found</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}

export default RequestStatus;
