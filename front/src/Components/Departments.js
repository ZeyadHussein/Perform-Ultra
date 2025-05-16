import React, { useState, useEffect } from "react";
import axios from "axios";
import Sidebar from "./Sidebar";
import "../Styles/Departments.css";
import { FaUsers, FaBullhorn, FaLaptopCode, FaPlus, FaSave, FaEdit, FaTrash } from "react-icons/fa";

const API_BASE_URL = "http://localhost:5000/api"; // Backend URL

const departmentIcons = {
  "Human Resources": <FaUsers />,
  "Marketing": <FaBullhorn />,
  "IT Support": <FaLaptopCode />,
};

const Departments = () => {
  const [departments, setDepartments] = useState([]);
  const [newDepartment, setNewDepartment] = useState("");
  const [editingDepartment, setEditingDepartment] = useState(null);
  const [editName, setEditName] = useState("");

  // 🔹 Fetch Departments from Backend
  useEffect(() => {
    axios.get(`${API_BASE_URL}/departments`)
      .then(response => setDepartments(response.data))
      .catch(error => console.error("Error fetching departments:", error));
  }, []);

  // 🔹 Add Department
  const addDepartment = () => {
    if (!newDepartment.trim()) {
      alert("Department name cannot be empty");
      return;
    }

    if (departments.some(dept => dept.Department_name.toLowerCase() === newDepartment.toLowerCase())) {
      alert("Department already exists");
      return;
    }

    axios.post(`${API_BASE_URL}/add-department`, { 
        Department_ID: Date.now(), // Temporary ID
        Department_name: newDepartment 
      })
      .then(response => {
        setDepartments([...departments, { Department_ID: response.data.departmentId, Department_name: newDepartment }]);
        setNewDepartment("");
      })
      .catch(error => console.error("Error adding department:", error));
  };

  // 🔹 Delete Department
  const deleteDepartment = (id) => {
    if (window.confirm("Are you sure you want to delete this department?")) {
      axios.delete(`${API_BASE_URL}/delete-department/${id}`)
        .then(() => {
          setDepartments(departments.filter(dept => dept.Department_ID !== id));
        })
        .catch(error => console.error("Error deleting department:", error));
    }
  };

  // 🔹 Update Department
  const updateDepartment = () => {
    if (!editName.trim()) {
      alert("Department name cannot be empty");
      return;
    }

    axios.put(`${API_BASE_URL}/update-department/${editingDepartment}`, { Department_name: editName })
      .then(() => {
        setDepartments(departments.map(dept =>
          dept.Department_ID === editingDepartment ? { ...dept, Department_name: editName } : dept
        ));
        setEditingDepartment(null);
        setEditName("");
      })
      .catch(error => console.error("Error updating department:", error));
  };

  return (
    <div className="departments-page">
      <Sidebar />
      <div className="departments-container">
        <h1>Departments</h1>

        {/* Add Department Section */}
        <div className="add-department">
          <input
            type="text"
            placeholder="Enter Department Name"
            value={newDepartment}
            onChange={(e) => setNewDepartment(e.target.value)}
          />
          <button onClick={addDepartment}>
            <FaPlus /> Add
          </button>
        </div>

        {/* Departments Table */}
        <table>
          <thead>
            <tr>
              <th>Icon</th>
              <th>Department</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {departments.map((dept) => (
              <tr key={dept.Department_ID}>
                <td className="icon-cell">
                  {departmentIcons[dept.Department_name] || "❓"}
                </td>
                <td>
                  {editingDepartment === dept.Department_ID ? (
                    <input
                      type="text"
                      value={editName}
                      onChange={(e) => setEditName(e.target.value)}
                    />
                  ) : (
                    dept.Department_name
                  )}
                </td>
                <td>
                  {editingDepartment === dept.Department_ID ? (
                    <button onClick={updateDepartment}>
                      <FaSave /> Save
                    </button>
                  ) : (
                    <>
                      <button
                        onClick={() => {
                          setEditingDepartment(dept.Department_ID);
                          setEditName(dept.Department_name);
                        }}
                      >
                        <FaEdit /> Edit
                      </button>
                      <button onClick={() => deleteDepartment(dept.Department_ID)}>
                        <FaTrash /> Delete
                      </button>
                    </>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Departments;
