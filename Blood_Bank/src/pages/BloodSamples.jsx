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
        // console.log("Logged in user:", user);

        if (!user) {
          alert("Please login first");
          return;
        }

        const response = await axios.get(
          `http://localhost/backend_bb/view-blood-samples.php?hospital_id=${user.id}`,
        );

        // console.log(response.data);

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

  // Handle update quantity
  const handleUpdate = async (sample) => {
    const user = JSON.parse(localStorage.getItem("user"));

    try {
      const response = await axios.post(
        "http://localhost/backend_bb/update-blood-sample.php",
        {
          id: sample.id,
          quantity: sample.newQuantity,
          hospital_id: user.id,
        },
      );
      // console.log(response.data);
      if (response.data.status) {
        alert("Blood quantity updated successfully");

        setBloodSamples((prev) =>
          prev.map((item) =>
            item.id === sample.id
              ? {
                  ...item,
                  quantity: sample.newQuantity,
                }
              : item,
          ),
        );
      } else {
        alert(response.data.message);
      }
    } catch (error) {
      console.error(error);
      alert("Failed to update blood quantity");
    }
  };

  // Handle delete sample
  const handleDelete = async (id) => {
    const user = JSON.parse(localStorage.getItem("user"));

    const confirmDelete = window.confirm(
      "Are you sure you want to delete this blood sample?",
    );

    if (!confirmDelete) return;

    try {
      const response = await axios.post(
        "http://localhost/backend_bb/delete-blood-sample.php",
        {
          id,
          hospital_id: user.id,
        },
      );

      if (response.data.status) {
        alert("Blood sample deleted successfully");

        setBloodSamples((prev) => prev.filter((sample) => sample.id !== id));
      } else {
        alert(response.data.message);
      }
    } catch (error) {
      console.error(error);
      alert("Failed to delete blood sample");
    }
  };

  return (
    <div className="blood-samples-container">
      <h2 className="page-title">My Blood Samples</h2>

      <div className="table-container">
        <table className="blood-table">
          {/* <thead>
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
          </tbody> */}

          <thead>
            <tr>
              <th>Blood Group</th>
              <th>Current Quantity</th>
              <th>Update Quantity</th>
              <th>Actions</th>
            </tr>
          </thead>

          <tbody>
            {loading ? (
              <tr>
                <td colSpan="4">Loading...</td>
              </tr>
            ) : bloodSamples.length > 0 ? (
              bloodSamples.map((sample) => (
                <tr key={sample.id}>
                  <td>{sample.blood_group}</td>

                  <td>{sample.quantity}</td>

                  <td>
                    <input
                      type="number"
                      min="0"
                      value={sample.newQuantity ?? sample.quantity}
                      onChange={(e) =>
                        setBloodSamples((prev) =>
                          prev.map((item) =>
                            item.id === sample.id
                              ? {
                                  ...item,
                                  newQuantity: e.target.value,
                                }
                              : item,
                          ),
                        )
                      }
                      className="quantity-input"
                    />
                  </td>

                  <td>
                    <button
                      className="update-btn"
                      onClick={() => handleUpdate(sample)}
                    >
                      Update
                    </button>

                    <button
                      className="delete-btn"
                      onClick={() => handleDelete(sample.id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="4">No Blood Samples Found</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default BloodSamples;
