import React, { useState } from 'react';
import './DeleteReview.scss';

const DeleteReview = ({ reviewId, onDelete }) => {
  const [isModalVisible, setIsModalVisible] = useState(false);

  const handleDelete = () => {
    setIsModalVisible(true);
  };

  const handleClose = () => {
    setIsModalVisible(false);
  };

  const handleConfirmDelete = () => {
    onDelete(reviewId);
    handleClose();
  };

  return (
    <>
      <button
        className='btn btn-danger'
        onClick={handleDelete}
      >
        Delete
      </button>

      <div
        className={`modal fade ${isModalVisible ? 'show d-block' : ''}`}
        tabIndex='-1'
      >
        <div className='modal-dialog modal-dialog-centered'>
          <div className='modal-content'>
            <div className='modal-header'>
              <h5 className='modal-title'>Confirm Deletion</h5>
              <button
                type='button'
                className='btn-close'
                onClick={handleClose}
              ></button>
            </div>
            <div className='modal-body'>Are you sure you wish to delete this review?</div>
            <div className='modal-footer'>
              <button
                type='button'
                className='btn btn-secondary'
                onClick={handleClose}
              >
                Cancel
              </button>
              <button
                type='button'
                className='btn btn-primary'
                onClick={handleConfirmDelete}
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      </div>

      {isModalVisible && <div className='modal-backdrop fade show'></div>}
    </>
  );
};

export default DeleteReview;
