import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getTaxForm, submitTaxForm } from '../../api';
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

  useEffect(() => {
    setIsLoading(true);
    if (taxId) {
      getTaxForm(taxId)
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

    submitTaxForm(taxId as string, values)
      .then(response => {
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
    return <div>Cargando...</div>;
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
