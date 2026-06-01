import React, { useState, useEffect } from "react";
import axios from "axios";
import "../styles/bloodsamples.less";

function BloodSamples() {
  const [bloodSamples, setBloodSamples] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBloodSamples = async () => {
      try {
        const user = JSON.parse(localStorage.getItem("user"));

        if (!user) {
          alert("Please login first");
          return;
        }

        const response = await axios.get(
          `http://localhost/backend_bb/view-blood-samples.php?hospital_id=${user.id}`
        );

        console.log(response.data);

        if (response.data.status) {
          setBloodSamples(response.data.data);
        } else {
          alert(response.data.message);
        }
      } catch (error) {
        console.error(error);
        alert("Failed to fetch blood samples");
      } finally {
        setLoading(false);
      }
    };

    fetchBloodSamples();
  }, []);

  return (
    <div className="blood-samples-container">
      <h2 className="page-title">My Blood Samples</h2>

      <div className="table-container">
        <table className="blood-table">
          <thead>
            <tr>
              <th>Blood Group</th>
              <th>Quantity</th>
            </tr>
          </thead>

          <tbody>
            {loading ? (
              <tr>
                <td colSpan="2">Loading...</td>
              </tr>
            ) : bloodSamples.length > 0 ? (
              bloodSamples.map((sample) => (
                <tr key={sample.id}>
                  <td>{sample.blood_group}</td>
                  <td>{sample.quantity}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="2">No Blood Samples Found</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default BloodSamples;