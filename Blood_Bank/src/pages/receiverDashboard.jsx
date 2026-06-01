import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "../styles/dashboard.less";

function ReceiverDashboard() {
  const [bloodSamples, setBloodSamples] = useState([]);
  const navigate = useNavigate();

  const host = "http://localhost/backend_bb";

  useEffect(() => {
    fetchBloodSamples();
  }, []);

  const fetchBloodSamples = async () => {
    try {
      const response = await axios.get(
        `${host}/getBloodSamples.php`
      );

      if (response.data.status) {
        setBloodSamples(response.data.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleRequest = (sample) => {
    navigate("/request-blood", {
      state: {
        hospitalName: sample.hospital_name,
        bloodGroup: sample.blood_group,
        availableQuantity: sample.quantity,
      },
    });
  };

  return (
    <div className="receiver-dashboard">
      <div className="dashboard-header">
        <h1>Available Blood Samples</h1>
        <p>Find blood units available in nearby hospitals</p>
      </div>

      <div className="blood-grid">
        {bloodSamples.length > 0 ? (
          bloodSamples.map((sample) => (
            <div className="blood-card" key={sample.id}>
              <div className="blood-group">
                {sample.blood_group}
              </div>

              <div className="hospital-name">
                {sample.hospital_name}
              </div>

              <div className="quantity">
                Available: <strong>{sample.quantity} Units</strong>
              </div>

              <button
                className="request-btn"
                onClick={() => handleRequest(sample)}
              >
                Request Blood
              </button>
            </div>
          ))
        ) : (
          <div className="no-data">
            No Blood Samples Available
          </div>
        )}
      </div>
    </div>
  );
}

export default ReceiverDashboard;