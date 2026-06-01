import React, { useEffect, useState } from "react";
import "../styles/viewrequest.less";
import axios from "axios";

function ViewRequest() {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);

  const user = JSON.parse(localStorage.getItem("user") || "{}");
  const username = user.username || "";
  const userEmail = user.email || "";

  const host = "http://localhost/backend_bb";


const fetchBloodRequests = async () => {
  try {
    const response = await axios.get(
      `${host}/getUserRequests.php`,
      {
        params: {
          receiverId: user.id,
          email: userEmail,
          username: username,
        },
      }
    );

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
  useEffect(() => {
    fetchBloodRequests();
  }, []);


  return (
    <div className="request-container">
      <h2 className="request-title">My Blood Requests</h2>

      <div className="table-wrapper">
        <table className="request-table">
          <thead>
            <tr>
              <th>Hospital</th>
              <th>Blood Group</th>
              <th>Quantity</th>
              <th>Status</th>
            </tr>
          </thead>

          <tbody>
            {loading ? (
              <tr>
                <td colSpan="4">Loading...</td>
              </tr>
            ) : requests.length > 0 ? (
              requests.map((request) => (
                <tr key={request.id}>
                  <td>{request.hospital_name}</td>
                  <td>{request.blood_group}</td>
                  <td>{request.quantity} Unit(s)</td>
                  <td>
                    <span
                      className={`status ${request.status.toLowerCase()}`}
                    >
                      {request.status}
                    </span>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="4">
                  No blood requests found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default ViewRequest;