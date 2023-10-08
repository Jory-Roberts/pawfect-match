import React, { useState } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import './DogVisit.scss';

const DogVisit = ({ dogID, user }) => {
  const [showForm, setShowForm] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [modalMessage, setModalMessage] = useState('');

  const formik = useFormik({
    initialValues: {
      scheduled_date: '',
    },
    validationSchema: Yup.object({
      scheduled_date: Yup.date().required('Please select a date and time'),
    }),
    onSubmit: async (values) => {
      const payload = {
        dog_id: dogID,
        scheduled_date: `${values.scheduled_date}:00`,
      };
      try {
        console.log('Payload sent to the server', payload);
        const response = await fetch(`/visits/${user.id}/${dogID}`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(payload),
        });

        const data = await response.json();
        console.log(data);
        console.log('Response status', response.status);
        if (!response.ok) {
          setModalMessage(data.error);
          setIsModalVisible(true);
        } else {
          setModalMessage('Visit scheduled successfully!');
          setIsModalVisible(true);
          setShowForm(false);
        }
      } catch (error) {
        setModalMessage(error.message);
        setIsModalVisible(true);
      }
    },
  });

  return (
    <div>
      <button
        className='btn btn-outline-primary mx-2'
        onClick={() => setShowForm(!showForm)}
      >
        Come See Me!
      </button>

      {showForm && (
        <form onSubmit={formik.handleSubmit}>
          <div>
            <label htmlFor='scheduled_date'>Select Date & Time:</label>
            <input
              type='datetime-local'
              id='scheduled_date'
              name='scheduled_date'
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.scheduled_date}
            />
            {formik.touched.scheduled_date && formik.errors.scheduled_date && <div>{formik.errors.scheduled_date}</div>}
          </div>
          <button type='submit'>Schedule Visit</button>
        </form>
      )}

      {isModalVisible && (
        <>
          <div
            className={`modal fade ${isModalVisible ? 'show d-block' : ''}`}
            tabIndex='-1'
          >
            <div className='modal-dialog modal-dialog-centered'>
              <div className='modal-content'>
                <div className='modal-header'>
                  <h5 className='modal-title'>Visit Notification</h5>
                  <button
                    type='button'
                    className='btn-close'
                    onClick={() => setIsModalVisible(false)}
                  ></button>
                </div>
                <div className='modal-body'>{modalMessage}</div>
                <div className='modal-footer'>
                  <button
                    type='button'
                    className='btn btn-secondary'
                    onClick={() => setIsModalVisible(false)}
                  >
                    Close
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className='modal-backdrop fade show'></div>
        </>
      )}
    </div>
  );
};

export default DogVisit;
