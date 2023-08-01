import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../../store/reducer';
import { editSubmission, deleteSubmission } from '../../store/actions';
import Modal from 'react-modal';
import './TaxSubmissions.css';

const TaxSubmissions: React.FC = () => {
  const { taxId } = useParams<{ taxId?: string }>();
  const { submissions } = useSelector((state: RootState) => state);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [modalData, setModalData] = useState<{ submissionId?: string; submissionData?: any }>({});
  const [nameFilter, setNameFilter] = useState<string>('');
  const [surnameFilter, setSurnameFilter] = useState<string>('');
  const [ageFilter, setAgeFilter] = useState<number | null>(null);
  const dispatch = useDispatch();

  const handleEdit = (submissionId: string, submissionData: any) => {
    setModalData({ submissionId, submissionData });
    setIsModalOpen(true);
  };

  const handleModalSave = () => {
    const { submissionId, submissionData } = modalData;
    if (submissionId && submissionData) {
      dispatch(editSubmission(taxId as string, submissionId, submissionData));
      setIsModalOpen(false);
    }
  };

  const handleModalCancel = () => {
    setIsModalOpen(false);
  };

  useEffect(() => {
    setIsLoading(true);
    if (taxId) {
      setIsLoading(false);
    }
  }, [taxId]);

  const filteredSubmissions = submissions[taxId as string] ? submissions[taxId as string].filter((submission: any) => {
    return (
      (nameFilter === '' || (submission.name && submission.name.includes(nameFilter))) &&
      (surnameFilter === '' || (submission.surname && submission.surname.includes(surnameFilter))) &&
      (ageFilter === null || (submission.age && Number(submission.age) === ageFilter))
    );
  }) : [];
  

  if (isLoading) {
    return <div>Cargando...</div>;
  }

  return (
    <div>
      <h1 className="submissions-title">Envíos de formulario para el impuesto {taxId}</h1>
      <div className="filter-container">
        <label>Nombre:</label>
        <input
          type="text"
          value={nameFilter}
          onChange={e => setNameFilter(e.target.value)}
          className="small-input"
        />
        <label>Apellido:</label>
        <input
          type="text"
          value={surnameFilter}
          onChange={e => setSurnameFilter(e.target.value)}
          className="small-input"
        />
        <label>Edad:</label>
        <input
          type="text"
          value={ageFilter || ''}
          onChange={e => setAgeFilter(e.target.value ? parseInt(e.target.value, 10) : null)}
          className="small-input"
        />
      </div>
      <table className="sub-table">
        <thead>
          <tr>
            <th>Envío</th>
            <th>Nombre</th>
            <th>Apellido</th>
            <th>Edad</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {filteredSubmissions.map((submission: any, index: number) => (
            <tr key={index}>
              <td>{submission.id}</td>
              <td>{submission.name}</td>
              <td>{submission.surname}</td>
              <td>{submission.age}</td>
              <td>
                <div className="container-edit">
                  <button className="btn btn-editar" onClick={() => handleEdit(submission.id, submission)}>Editar</button>
                  <button className="btn btn-eliminar" onClick={() => dispatch(deleteSubmission(taxId as string, submission.id))}>Eliminar</button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <Link to="/dashboard" className="dashboard-link">Dashboard</Link>
      <Modal
        isOpen={isModalOpen}
        onRequestClose={handleModalCancel}
        contentLabel="Editar Presentación"
        className="modal"
        overlayClassName="overlay"
      >
        <h2>Editar Presentación</h2>
        <form className="edit-form">
          {modalData.submissionData && (
            <div>
              <label>Envío:</label>
              <input
                type="text"
                value={modalData.submissionId}
                readOnly
              />
              <label>Nombre:</label>
              <input
                type="text"
                value={modalData.submissionData.name}
                onChange={(e) => setModalData((prevData) => ({ ...prevData, submissionData: { ...prevData.submissionData, name: e.target.value } }))}
              />
              <label>Apellido:</label>
              <input
                type="text"
                value={modalData.submissionData.surname}
                onChange={(e) => setModalData((prevData) => ({ ...prevData, submissionData: { ...prevData.submissionData, surname: e.target.value } }))}
              />
              <label>Edad:</label>
              <input
                type="number"
                value={modalData.submissionData.age}
                onChange={(e) => setModalData((prevData) => ({ ...prevData, submissionData: { ...prevData.submissionData, age: parseInt(e.target.value, 10) } }))}
              />
              <div className="button-group">
                <button className="btn btn-save" onClick={handleModalSave}>Guardar</button>
                <button className="btn btn-cancel" onClick={handleModalCancel}>Cancelar</button>
              </div>
            </div>
          )}
        </form>
      </Modal>
    </div>
  );
};

export default TaxSubmissions;
