import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function CreateUser() {
    const [name, setName] = useState("");
    const [age, setAge] = useState("");
    const [image, setImage] = useState(null);
    const navigate = useNavigate();

  const Submit = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("name", name);
    formData.append("age", age);
    if (image) {
      formData.append("image", image);
    }

    axios.post("http://localhost:3001/createUser", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    })
    .then(res => {
        console.log(res);
        navigate("/");
    })
    .catch(err => console.log(err))
  }

  return (
    <div>
      <div className="d-flex vh-100 bg-secondary justify-content-center align-items-center">
        <div className="w-50 bg-white rounded p-3">
          <form onSubmit={Submit}>
            <h2>Add User</h2>
            <div className="mb-2">
              <label htmlFor="name">Name</label>
              <input
                type="text"
                placeholder="Enter Name"
                className="form-control"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div className="mb-2">
              <label htmlFor="age">Age</label>
              <input
                type="text"
                placeholder="Enter Age"
                className="form-control"
                value={age}
                onChange={(e) => setAge(e.target.value)}
              />
            </div>
            <div className="mb-2">
              <label htmlFor="image">Image</label>
              <input
                type="file"
                className="form-control"
                onChange={(e) => setImage(e.target.files[0])}
              />
            </div>
            <button className="btn btn-success">Submit</button>
          </form>
        </div>
      </div>
    </div>
  );
}
export default CreateUser;







