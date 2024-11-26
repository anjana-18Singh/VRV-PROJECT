import React, { useState, useEffect } from 'react';

const RoleModal = ({ role, onClose, onSave }) => {
  const [formData, setFormData] = useState({
    name: '',
    permissions: [],
  });

  useEffect(() => {
    if (role) {
      setFormData({
        name: role.name,
        permissions: role.permissions,
      });
    }
  }, [role]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    if (type === 'checkbox') {
      setFormData((prevData) => ({
        ...prevData,
        permissions: checked
          ? [...prevData.permissions, value]
          : prevData.permissions.filter((perm) => perm !== value),
      }));
    } else {
      setFormData((prevData) => ({ ...prevData, [name]: value }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(formData); // Save the role
  };

  return (
    <div className="modal">
      <div className="modal-content">
        <h2>{role ? 'Edit Role' : 'Add Role'}</h2>
        <form onSubmit={handleSubmit}>
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
          <button type="submit">{role ? 'Save Changes' : 'Add Role'}</button>
          <button type="button" onClick={onClose}>Cancel</button>
        </form>
      </div>
    </div>
  );
};

export default RoleModal;
