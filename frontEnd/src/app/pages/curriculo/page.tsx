'use client';
import { NextPage } from 'next';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import ExperienciaModal from '@/app/components/experienciaModal';
import { useState } from 'react';

const Curriculo: NextPage = ({}) => {
  const [modalOpen, setModalOpen] = useState(false);

  const formik = useFormik({
    initialValues: {
      nome: '',
      telefone: '',
      email: '',
      estado_sivil: '',
      experiencias: [],
      obejetivo: '',
      meta: '',
      competencias: [],
    },
    validationSchema: Yup.object({
      nome: Yup.string().required('Nome obrigatório'),
      telefone: Yup.string().required('Telefone obrigatório'),
      email: Yup.string()
        .email('E-mail inválido')
        .required('E-mail obrigatório'),
      estado_sivil: Yup.string().required('Estado civil obrigatório'),
      obejetivo: Yup.string().required('Objetivo obrigatório'),
      meta: Yup.string().required('Meta obrigatória'),
    }),
    onSubmit: async (values) => {
      try {
        const response = await fetch('/api/curriculo', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(values),
        });

        if (response.ok) {
          alert('Currículo enviado com sucesso!');
        } else {
          alert('Erro ao enviar currículo.');
        }
      } catch (error) {
        console.error('Erro ao enviar:', error);
        alert('Erro na requisição.');
      }
    },
  });

  const addExperiencia = (exp) => {
    formik.setFieldValue('experiencias', [...formik.values.experiencias, exp]);
  };

  return (
    <div className="max-w-2xl mx-auto mt-10 p-5 border rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-4">Cadastro de Currículo</h2>
      <form onSubmit={formik.handleSubmit} className="space-y-4">
        <input
          type="text"
          name="nome"
          placeholder="Nome"
          value={formik.values.nome}
          onChange={formik.handleChange}
          className="w-full p-2 border rounded"
        />
        <input
          type="text"
          name="telefone"
          placeholder="Telefone"
          value={formik.values.telefone}
          onChange={formik.handleChange}
          className="w-full p-2 border rounded"
        />
        <input
          type="email"
          name="email"
          placeholder="E-mail"
          value={formik.values.email}
          onChange={formik.handleChange}
          className="w-full p-2 border rounded"
        />
        <input
          type="text"
          name="estado_sivil"
          placeholder="Estado Civil"
          value={formik.values.estado_sivil}
          onChange={formik.handleChange}
          className="w-full p-2 border rounded"
        />
        <textarea
          name="obejetivo"
          placeholder="Objetivo"
          value={formik.values.obejetivo}
          onChange={formik.handleChange}
          className="w-full p-2 border rounded"
        />
        <textarea
          name="meta"
          placeholder="Meta"
          value={formik.values.meta}
          onChange={formik.handleChange}
          className="w-full p-2 border rounded"
        />
        <button
          type="button"
          onClick={() => setModalOpen(true)}
          className="w-full p-2 bg-green-500 text-white rounded">
          Adicionar Experiência
        </button>

        <ul className="mt-4">
          {formik.values.experiencias.map((exp, index) => (
            <li key={index} className="p-2 border-b">
              <strong>
                {exp.cargo} - {exp.nome_empresa}
              </strong>
              <ul className="list-disc pl-5">
                {exp.atribuicoes.map((atr, idx) => (
                  <li key={idx}>{atr}</li>
                ))}
              </ul>
            </li>
          ))}
        </ul>

        <button
          type="submit"
          className="w-full p-3 bg-blue-500 text-white rounded">
          Enviar
        </button>
      </form>

      <ExperienciaModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        onAdd={addExperiencia}
      />
    </div>
  );
};

export default Curriculo;
