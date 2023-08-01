import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { getTaxForm, submitTaxForm } from '../../api';
import { addSubmission } from '../../store/actions';
import { BeatLoader } from "react-spinners";
import './TaxForm.css'; 

interface InputField {
  id: string;
  label: string;
  placeholder: string;
  type: string;
  maxLength?: number;
}

const TaxForm: React.FC = () => {
  const { taxId } = useParams<{ taxId?: string }>();
  const [form, setForm] = useState<InputField[]>([]);
  const [values, setValues] = useState<{ [key: string]: string | number }>({});
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    setIsLoading(true);
    if (taxId) {
      new Promise(resolve => setTimeout(resolve, 200))
        .then(() => getTaxForm(taxId))
        .then(response => {
          setForm(response.data.inputFields);
        })
        .catch(error => {
          console.log(error);
        })
        .finally(() => {
          setIsLoading(false);
        });
    }
  }, [taxId]);
  

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>, fieldId: string) => {
    setValues(prevValues => ({ ...prevValues, [fieldId]: event.target.value }));
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
  
    const allFieldsFilled = form.every(field => values[field.id]);
    if (!allFieldsFilled) {
      alert('Por favor, rellene todos los campos.');
      return;
    }
  
    setIsLoading(true);
  
    new Promise(resolve => setTimeout(resolve, 2000))
      .then(() => submitTaxForm(taxId as string, values))
      .then(response => {
        dispatch(addSubmission(taxId as string, response.data));
        navigate('/dashboard');
        setIsSubmitted(true);
        alert('Datos enviados correctamente');
      })
      .catch(error => {
        console.error('Failed to submit tax form: ', error);
        alert('Hubo un error al enviar los datos');
      })
      .finally(() => {
        setIsLoading(false);
      });
  };
  

  if (isLoading) {
    return (
      <div className="spinner-container">
        <BeatLoader color="#0fd48e" loading={isLoading} size={20} />
        <div>Cargando...</div>
      </div>
    );
  }
  
  

  if (isSubmitted) {
    return <div>Formulario enviado exitosamente!</div>;
  }

  return (
    <div className="form-container">
      <h2 className="form-title">Formulario para el impuesto {taxId}</h2>
      <form onSubmit={handleSubmit}>
        {form.map(field => (
          <div key={field.id}>
            <label>
              {field.label}:
              <input
                type={field.type}
                placeholder={field.placeholder}
                maxLength={field.maxLength}
                value={values[field.id] || ''}
                onChange={event => handleChange(event, field.id)}
                required
              />
            </label>
          </div>
        ))}
        <button type="submit">Enviar</button>
      </form>
    </div>
  );
};

export default TaxForm;
