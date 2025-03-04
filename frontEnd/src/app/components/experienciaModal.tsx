/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';
import { useFormik } from 'formik';
import * as Yup from 'yup';

const ExperienciaModal = ({ isOpen, onClose, onAdd }) => {
  // Esquema de validação
  const validationSchema = Yup.object().shape({
    nome_empresa: Yup.string().required('Nome da empresa é obrigatório'),
    data_inicio: Yup.string().required('Data de início é obrigatória'),
    cargo: Yup.string().required('Cargo é obrigatório'),
    data_saida: Yup.string()
      .nullable()
      .when('atual', (atual, schema) =>
        !atual ? schema.required('Data de saída é obrigatória') : schema
      ),
  });

  // Formik
  const formik = useFormik({
    initialValues: {
      nome_empresa: '',
      data_inicio: '',
      data_saida: '',
      atual: false,
      competencias_vaga: [],
      atribuicoes: '',
      novaCompetencia: '',
      cargo: '',
    },
    validationSchema,
    onSubmit: (values) => {
      onAdd(values);
      onClose();
      formik.resetForm();
    },
  });

  // Adiciona uma competência ao array
  const addCompetencia = () => {
    if (formik.values.novaCompetencia.trim() !== '') {
      formik.setFieldValue('competencias_vaga', [
        ...formik.values.competencias_vaga,
        formik.values.novaCompetencia,
      ]);
      formik.setFieldValue('novaCompetencia', '');
    }
  };

  // Remove uma competência específica
  const removeCompetencia = (index: any) => {
    const newCompetencias = formik.values.competencias_vaga.filter(
      (_, i) => i !== index
    );
    formik.setFieldValue('competencias_vaga', newCompetencias);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-96">
        <h2 className="text-xl font-bold mb-4">Adicionar Experiência</h2>
        <form onSubmit={formik.handleSubmit} className="space-y-3">
          <div className="grid grid-cols-2 gap-4">
            {/* Nome da empresa */}
            <input
              type="text"
              name="nome_empresa"
              placeholder="Nome da Empresa"
              {...formik.getFieldProps('nome_empresa')}
              className="w-full p-2 border rounded text-black col-span-2"
            />
            {formik.touched.nome_empresa && formik.errors.nome_empresa && (
              <p className="text-red-500 text-sm">
                {formik.errors.nome_empresa}
              </p>
            )}

            {/* Data de início */}
            <input
              type="date"
              name="data_inicio"
              placeholder="Data Início"
              {...formik.getFieldProps('data_inicio')}
              className="w-full p-2 border rounded"
            />
            {formik.touched.data_inicio && formik.errors.data_inicio && (
              <p className="text-red-500 text-sm">
                {formik.errors.data_inicio}
              </p>
            )}

            {/* Data de saída */}
            <input
              type="date"
              name="data_saida"
              placeholder="Data Saída"
              {...formik.getFieldProps('data_saida')}
              className="w-full p-2 border rounded"
              disabled={formik.values.atual} // Desativa se for emprego atual
            />
            {formik.touched.data_saida && formik.errors.data_saida && (
              <p className="text-red-500 text-sm">{formik.errors.data_saida}</p>
            )}

            {/* Emprego atual */}
            <div className="flex items-center gap-2 col-span-2">
              <input
                type="checkbox"
                name="atual"
                checked={formik.values.atual}
                onChange={(e) => {
                  formik.setFieldValue('atual', e.target.checked);
                  if (e.target.checked) {
                    formik.setFieldValue('data_saida', ''); // Limpa data de saída
                  }
                }}
              />
              <label>Emprego Atual</label>
            </div>

            {/* Cargo */}
            <input
              type="text"
              name="cargo"
              placeholder="Cargo"
              {...formik.getFieldProps('cargo')}
              className="w-full p-2 border rounded text-black"
            />
            {formik.touched.cargo && formik.errors.cargo && (
              <p className="text-red-500 text-sm">{formik.errors.cargo}</p>
            )}

            {/* Atribuições */}
            <input
              type="text"
              name="atribuicoes"
              placeholder="Atribuições"
              {...formik.getFieldProps('atribuicoes')}
              className="w-full p-2 border rounded text-black"
            />

            {/* Competências */}
            <div className="col-span-2">
              <label className="block text-sm font-medium">Competências:</label>
              <div className="flex gap-2">
                <input
                  type="text"
                  name="novaCompetencia"
                  placeholder="Digite uma competência"
                  value={formik.values.novaCompetencia}
                  onChange={formik.handleChange}
                  className="w-full p-2 border rounded text-black"
                />
                <button
                  type="button"
                  onClick={addCompetencia}
                  className="bg-green-500 text-white p-2 rounded text-black">
                  +
                </button>
              </div>
              <ul className="mt-2">
                {formik.values.competencias_vaga.map((comp, index) => (
                  <li
                    key={index}
                    className="flex justify-between items-center p-1 border-b text-black">
                    {comp}
                    <button
                      type="button"
                      onClick={() => removeCompetencia(index)}
                      className="text-red-500 text-sm">
                      ❌
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Botões */}
          <div className="flex justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              className="p-2 border rounded">
              Cancelar
            </button>
            <button
              type="submit"
              className="p-2 bg-blue-500 text-white rounded">
              Adicionar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ExperienciaModal;
