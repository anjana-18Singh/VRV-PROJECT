import React, { useState, useEffect } from 'react';

const RoleModal = ({ role, onClose, onSave }) => {
  // Initialize form data with default values or existing role data (if editing)
  const [formData, setFormData] = useState({
    name: '',
    permissions: [], // Default empty array for permissions
  });

  useEffect(() => {
    // If we are editing an existing role, populate the form with the role data
    if (role) {
      setFormData({
        name: role.name,
        permissions: role.permissions || [], // Ensure permissions exist for an existing role
      });
    }
  }, [role]);

  // Handle changes in the form fields
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    
    if (type === 'checkbox') {
      setFormData((prevData) => ({
        ...prevData,
        permissions: checked
          ? [...prevData.permissions, value] // Add permission
          : prevData.permissions.filter((perm) => perm !== value), // Remove permission
      }));
    } else {
      setFormData((prevData) => ({ ...prevData, [name]: value }));
    }
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    // Call onSave callback to send the form data to the parent component (RoleList.js)
    if (onSave){
    onSave(formData);
    }else{
        console.error('onSave function is missing!...');
    }
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h2>{role ? 'Edit Role' : 'Add Role'}</h2>
        
        <form onSubmit={handleSubmit}>
          {/* Role Name Field */}
          <div>
            <label>Role Name:</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>

          {/* Permissions Selection */}
          <div>
            <label>Permissions:</label>
            <div>
              <label>
                <input
                  type="checkbox"
                  value="Read"
                  checked={formData.permissions.includes('Read')}
                  onChange={handleChange}
                />
                Read
              </label>
              <label>
                <input
                  type="checkbox"
                  value="Write"
                  checked={formData.permissions.includes('Write')}
                  onChange={handleChange}
                />
                Write
              </label>
              <label>
                <input
                  type="checkbox"
                  value="Delete"
                  checked={formData.permissions.includes('Delete')}
                  onChange={handleChange}
                />
                Delete
              </label>
            </div>
          </div>

          {/* Action Buttons */}
          <button type="submit">{role ? 'Save Changes' : 'Add Role'}</button>
          <button type="button" onClick={onClose}>Cancel</button>
        </form>
      </div>
    </div>
  );
};

export default RoleModal;
