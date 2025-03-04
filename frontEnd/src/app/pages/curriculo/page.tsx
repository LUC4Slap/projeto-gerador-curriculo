'use client';
import { NextPage } from 'next';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import ExperienciaModal from '@/app/components/experienciaModal';
import { useState } from 'react';
import { toast } from 'react-hot-toast';
import { LINKS } from '@/constants';
import Loading from '@/app/components/loading';

const Curriculo: NextPage = ({}) => {
  const [modalOpen, setModalOpen] = useState(false);
  const [loading, setLoading] = useState(false);

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
      setLoading(true);
      try {
        console.log(values);

        const response = await fetch('http://127.0.0.1:5000/gerar-curriculo', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(values),
        });

        if (response.ok) {
          cutomToast('Oba...', 'Curriculo gerado com sucesso!');
          const blob = await response.blob();
          const url = window.URL.createObjectURL(blob);

          const a = document.createElement('a');
          a.href = url;
          a.download = 'curriculo.pdf';
          document.body.appendChild(a);
          a.click();
          document.body.removeChild(a);

          window.URL.revokeObjectURL(url);
        } else {
          alert('Erro ao gerar currículo.');
        }
      } catch (error) {
        // console.error('Erro ao enviar:', error);
        // alert('Erro na requisição.');
        cutomToast('Ops...', error.message);
      } finally {
        setLoading(false);
      }
    },
  });

  const addExperiencia = (exp) => {
    formik.setFieldValue('experiencias', [
      ...formik.values.experiencias,
      {
        ...exp,
        competencias_vaga: Array.isArray(exp.competencias_vaga)
          ? exp.competencias_vaga
          : [],
      },
    ]);
  };

  const cutomToast = (status: string, message: string) => {
    return toast.custom((t) => (
      <div
        className={`${
          t.visible ? 'animate-enter' : 'animate-leave'
        } max-w-md w-full bg-white shadow-lg rounded-lg pointer-events-auto flex ring-1 ring-black ring-opacity-5`}>
        <div className="flex-1 w-0 p-4">
          <div className="flex items-start">
            <div className="flex-shrink-0 pt-0.5">
              <img
                className="h-10 w-10 rounded-full"
                src={LINKS.url_image_toast}
                alt=""
              />
            </div>
            <div className="ml-3 flex-1">
              <p className="text-sm font-medium text-gray-900">{status}</p>
              <p className="mt-1 text-sm text-gray-500">{message}</p>
            </div>
          </div>
        </div>
        <div className="flex border-l border-gray-200">
          <button
            onClick={() => toast.dismiss(t.id)}
            className="w-full border border-transparent rounded-none rounded-r-lg p-4 flex items-center justify-center text-sm font-medium text-indigo-600 hover:text-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500">
            Close
          </button>
        </div>
      </div>
    ));
  };

  return (
    <>
      {loading ? (
        <Loading />
      ) : (
        <div className="max-w-2xl mx-auto mt-10 p-5 border rounded-lg shadow-md">
          <h2 className="text-2xl font-bold mb-4 text-center">Gerar Currículo</h2>
          <form onSubmit={formik.handleSubmit} className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
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
                className="w-full p-2 border rounded text-black"
              />
              <textarea
                name="obejetivo"
                placeholder="Objetivo"
                value={formik.values.obejetivo}
                onChange={formik.handleChange}
                className="w-full p-2 border rounded text-black"
              />
              <textarea
                name="meta"
                placeholder="Meta"
                value={formik.values.meta}
                onChange={formik.handleChange}
                className="w-full p-2 border rounded text-black"
              />
              <button
                type="button"
                onClick={() => setModalOpen(true)}
                className="w-full p-2 bg-green-500 text-white rounded col-span-2">
                Adicionar Experiência
              </button>
            </div>

            <div className="mt-4 space-y-4">
              {formik.values.experiencias.map((exp, index) => (
                <div
                  key={index}
                  className="flex flex-col items-center bg-white border border-gray-200 rounded-lg shadow-sm md:flex-row md:max-w-xl hover:bg-gray-100 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700">
                  <div className="flex flex-col justify-between p-4 leading-normal w-full">
                    <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                      {exp.cargo}
                    </h5>
                    <p className="mb-2 text-lg font-medium text-gray-700 dark:text-gray-300">
                      {exp.nome_empresa}
                    </p>
                    <div className="text-gray-700 dark:text-gray-400">
                      {Array.isArray(exp.competencias_vaga) &&
                      exp.competencias_vaga.length > 0 ? (
                        <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                          {exp.competencias_vaga.map((comp, idx) => (
                            <div
                              key={idx}
                              className="bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-white px-3 py-1 rounded-md text-sm text-center">
                              {comp}
                            </div>
                          ))}
                        </div>
                      ) : (
                        <p className="text-gray-500 dark:text-gray-400">
                          Nenhuma competência informada
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>

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
      )}
    </>
  );
};

export default Curriculo;
