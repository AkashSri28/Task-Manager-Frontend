// DeleteModal.jsx
import React from 'react';
import '../styles/DeleteModal.css';

function DeleteModal({ handleCloseDeleteModal, handleDelete }) {
  return (
    <div className="delete-modal">
      <div className="delete-modal-content">
        <h2>Are you sure you want to delete?</h2>
        <div className="delete-modal-buttons">
          <button onClick={handleDelete}>Yes, Delete</button>
          <button onClick={handleCloseDeleteModal}>Cancel</button>
        </div>
      </div>
    </div>
  );
}

export default DeleteModal;
