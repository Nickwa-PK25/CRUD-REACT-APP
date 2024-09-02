import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function UpdateUser() {
  const { id } = useParams();
  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  const [image, setImage] = useState("");
  const [newImage, setNewImage] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get(`http://localhost:3001/getUser/${id}`)
      .then((res) => {
        setName(res.data.name);
        setAge(res.data.age);
        setImage(res.data.image);
      })
      .catch((err) => console.log(err));
  }, [id]);

  const Update = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("name", name);
    formData.append("age", age);
    if (newImage) {
      formData.append("image", newImage);
    } else if (image) {
      formData.append("image", image);
    }

    axios
      .put(`http://localhost:3001/updateUser/${id}`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((res) => {
        console.log(res);
        navigate("/");
      })
      .catch((err) => console.log(err));
  };

  return (
    <div>
      <div className="d-flex vh-100 bg-warning-subtle justify-content-center align-items-center">
        <div className="w-50 bg-white rounded p-3">
          <form onSubmit={Update}>
            <h2>Update User</h2>
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
              {image && (
                <img
                  src={`http://localhost:3001/${image}`}
                  alt="Current"
                  style={{ width: "100px" }}
                />
              )}
              <input
                type="file"
                className="form-control"
                onChange={(e) => setNewImage(e.target.files[0])}
              />
            </div>
            <button className="btn btn-success">Update</button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default UpdateUser;





