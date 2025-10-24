import React, { useState, useEffect } from 'react';
import axios from 'axios';
import AddMedicineForm from './AddMedicineForm';
import MedicineList from './components/MedicineList';
import { Toast, ToastContainer } from 'react-bootstrap';

function App() {
  const [medicines, setMedicines] = useState([]);
  const [toast, setToast] = useState({ show: false, message: '', variant: '' });

  const showToast = (message, variant = 'success') => {
    setToast({ show: true, message, variant });
    setTimeout(() => setToast({ ...toast, show: false }), 2000);
  };

  const fetchMedicines = async () => {
    try {
      const res = await axios.get('http://localhost:5000/api/medicines');
      setMedicines(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => { fetchMedicines(); }, []);

  const addMedicine = async (medicine) => {
    try {
      await axios.post('http://localhost:5000/api/medicines', medicine);
      fetchMedicines();
      showToast(`Added ${medicine.name}`);
    } catch (err) {
      console.error(err);
    }
  };

  const deleteMedicine = async (id, name) => {
    try {
      await axios.delete(`http://localhost:5000/api/medicines/${id}`);
      fetchMedicines();
      showToast(`Deleted ${name}`, 'danger');
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="container py-5">
      <h1 className="text-center mb-4 text-primary">💊 Medicine Reminder</h1>
      <AddMedicineForm onAdd={addMedicine} />
      <MedicineList medicines={medicines} onDelete={deleteMedicine} />

      <ToastContainer position="top-end" className="p-3">
        <Toast show={toast.show} bg={toast.variant}>
          <Toast.Body className="text-white">{toast.message}</Toast.Body>
        </Toast>
      </ToastContainer>
    </div>
  );
}

export default App;
