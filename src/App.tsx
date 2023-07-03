import { useRef, useState } from "react";
import { useForm, useFieldArray, UseFormRegister } from "react-hook-form";
import { DocumentTextIcon } from "./assets/DocumentText";
import Modal from "./Modal";

type FormValues = {
  mahasiswa: {
    aspek_penilaian_1: number;
    aspek_penilaian_2: number;
    aspek_penilaian_3: number;
    aspek_penilaian_4: number;
  }[];
};

// utils
const formatPenilaianHeader = (headerString: string) =>
  headerString
    .split("_")
    .map((head) => head[0].toUpperCase() + head.substring(1))
    .join(" ");

const Select = ({
  register,
  options,
  name,
  className,
}: {
  register: UseFormRegister<FormValues>;
  options: any;
  name: any;
  className: string;
}) => {
  return (
    <select {...register(name)} className={className}>
      {options.map((value: number) => (
        <option key={value} value={value}>
          {value}
        </option>
      ))}
    </select>
  );
};

function App() {
  const penilaianRef = useRef([
    "aspek_penilaian_1",
    "aspek_penilaian_2",
    "aspek_penilaian_3",
    "aspek_penilaian_4",
  ]);
  const totalMahasiswaRef = useRef(10);
  const optionsRef = useRef([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]);

  const penilaianRefValue = penilaianRef.current;
  const totalMahasiswaRefValue = totalMahasiswaRef.current;
  const optionsRefValue = optionsRef.current;

  const [modalOpen, setModalOpen] = useState(false);
  const [jsonPayload, setJsonPayload] = useState({});
  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>({
    defaultValues: {
      // default values of fields set to 10 (totalMahasiswaRefValue)
      mahasiswa: (() => {
        let fieldCollection: object[] = [];

        for (let index = 0; index < totalMahasiswaRefValue; index++) {
          fieldCollection = [
            ...fieldCollection,
            penilaianRefValue.reduce((collection, currentItem) => {
              return { ...collection, [currentItem]: 0 };
            }, {}),
          ];
        }
        return fieldCollection;
      })(),
    },
  });

  const { fields } = useFieldArray({
    name: "mahasiswa",
    control,
  });

  const close = () => setModalOpen(false);
  const open = () => setModalOpen(true);

  const submitData = (data: FormValues) => {
    open();
    const penilaianMap = data.mahasiswa.reduce(
      (collectionNilai: any, currentMahasiswa: any, index) => {
        let currentNilaiKeys = Object.keys(collectionNilai);

        currentNilaiKeys.forEach((key) => {
          collectionNilai = {
            ...collectionNilai,
            [key]: {
              ...collectionNilai[key],
              [`mahasiswa_${index + 1}`]: parseInt(currentMahasiswa[key]),
            },
          };
        });
        return { ...collectionNilai };
      },
      (() => {
        let collectionNilaiKeys = {};
        for (let index = 0; index < penilaianRefValue.length; index++) {
          collectionNilaiKeys = {
            ...collectionNilaiKeys,
            [penilaianRefValue[index]]: {},
          };
        }

        return collectionNilaiKeys;
      })()
    );

    setJsonPayload(penilaianMap);
  };

  return (
    <div className="App relative flex flex-col h-screen">
      <div className="w-1/2 grid grid-cols-5 m-4">
        <div></div>
        {penilaianRefValue.map((penilaianVal, index) => (
          <h1 key={index}>{formatPenilaianHeader(penilaianVal)}</h1>
        ))}
      </div>
      <div className="border-b w-full"></div>
      <form
        className="w-1/2 flex flex-col my-8"
        onSubmit={handleSubmit(submitData)}
      >
        {fields.map((field, index) => {
          return (
            <div key={field.id}>
              <section key={field.id} className="grid grid-cols-5 gap-4 mb-4">
                <h1 className="self-center justify-self-center">{`Mahasiswa ${
                  index + 1
                }`}</h1>
                {/* penilaian 1 */}
                <Select
                  className={
                    "bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                  }
                  name={`mahasiswa.${index}.aspek_penilaian_1`}
                  register={register}
                  options={optionsRefValue}
                />
                {/* penilaian 2 */}
                <Select
                  className={
                    "bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                  }
                  name={`mahasiswa.${index}.aspek_penilaian_2`}
                  register={register}
                  options={optionsRefValue}
                />
                {/* penilaian 3 */}
                <Select
                  className={
                    "bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                  }
                  name={`mahasiswa.${index}.aspek_penilaian_3`}
                  register={register}
                  options={optionsRefValue}
                />
                {/* penilaian 4 */}
                <Select
                  className={
                    "bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                  }
                  name={`mahasiswa.${index}.aspek_penilaian_4`}
                  register={register}
                  options={optionsRefValue}
                />
              </section>
            </div>
          );
        })}
        <div className="flex space-x-2 ml-auto">
          <button
            type="submit"
            className="flex items-center space-x-1 bg-teal-700 hover:bg-teal-500 focus:outline-none focus:ring focus:ring-teal-300 text-white px-3 py-2 rounded-xl my-4"
          >
            <DocumentTextIcon />
            <span>CETAK JSON</span>
          </button>
        </div>
      </form>
      <a href="" className="mt-auto ml-auto m-4 underline text-indigo-700 hover:text-indigo-500" target="_blank" referrerPolicy="no-referrer">Check the Repo!</a>
      {modalOpen && <Modal modalContent={jsonPayload} closeModal={close} />}
    </div>
  );
}

export default App;
