import React from "react";
import "../styles/addblood.less";

function AddBlood() {

const handleSubmit = async (e) => {
  e.preventDefault();

  const user = JSON.parse(localStorage.getItem("user"));

  if (!user) {
    alert("Please login first");
    return;
  }

  const formData = new FormData(e.target);

  const payload = {
    hospital_id: user.id,
    hospital_name: user.username,
    role: user.role,
    blood_group: formData.get("bloodGroup"),
    quantity: formData.get("quantity"),
  };

  // console.log("Payload:", payload);

  try {
    const response = await fetch(
      "http://localhost/backend_bb/addblood.php",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      }
    );

    const result = await response.json();

    console.log("Server Response:", result);

    if (result.status) {
      alert(result.message);
      e.target.reset();
    } else {
      alert(result.message);
    }
  } catch (error) {
    console.error(error);
    alert("Adding blood failed: " + error.message);
  }
};

  return (
    <div className="add-blood-container">
      <div className="add-blood-card">
        <h2>Add Blood Samples</h2>

        <form onSubmit={handleSubmit} className="add-blood-form">
          <select name="bloodGroup">
            <option value="">Select Blood Group</option>
            <option value="A+">A+</option>
            <option value="A-">A-</option>
            <option value="B+">B+</option>
            <option value="B-">B-</option>
            <option value="O+">O+</option>
            <option value="O-">O-</option>
            <option value="AB+">AB+</option>
            <option value="AB-">AB-</option>
          </select>

          <input type="number" name="quantity" placeholder="Quantity (Units)" />

          <button type="submit">Add Blood</button>
        </form>
      </div>
    </div>
  );
}

export default AddBlood;
