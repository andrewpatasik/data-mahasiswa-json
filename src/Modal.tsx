import { motion } from "framer-motion";
import { useRef } from "react";
import { CloseCircleIcon } from "./assets/CloseCircleIcon";
import { DocumentTextIcon } from "./assets/DocumentText";
import { DuplicateIcon } from "./assets/DuplicateIcon";
import Backdrop from "./Backdrop";

interface modalProps {
  closeModal: Function;
  modalContent: any;
}

const dropIn = {
  hidden: {
    y: "-100vh",
    opacity: 0,
  },
  visible: {
    y: "0",
    opacity: 1,
    transition: {
      duration: 0.1,
      type: "spring",
      damping: 25,
      stiffness: 150,
    },
  },
  exit: {
    y: "100vh",
    opacity: 0,
  },
};

const Modal: React.FC<modalProps> = ({
  closeModal,
  modalContent,
}: modalProps) => {
  const textAreaRef = useRef<any>();

  const handleSalin = () => {
    let textAreaValue = textAreaRef.current?.value;
    navigator.clipboard.writeText(textAreaValue);
  };

  return (
    <Backdrop onClick={closeModal}>
      <motion.div
        variants={dropIn}
        initial="hidden"
        animate="visible"
        exit="exit"
        className="z-50 fixed w-1/2 h-1/2 inset-y-1/4 bg-gray-100 border rounded-xl p-2 flex flex-col"
      >
        <div className="flex space-x-1 items-center border-b mt-4">
          <DocumentTextIcon iconProps="w-5 h-5" />
          <h1 className="text-xl font-bold">Preview Format JSON</h1>
        </div>
        <textarea
          ref={textAreaRef}
          rows={9}
          className="mt-2 block w-full py-1.5 px-3 rounded-md border-2"
          value={JSON.stringify(modalContent, undefined, 4)}
          onChange={() => {}}
        />
        <div className="flex space-x-1 justify-center mt-auto">
          <button
            onClick={handleSalin}
            className="flex items-center space-x-1 bg-indigo-700 hover:bg-indigo-500 focus:outline-none focus:ring focus:ring-indigo-300 text-white px-3 py-2 rounded-xl my-4 "
          >
            <DuplicateIcon iconProps="w-5 h-5" />
            <span>SALIN</span>
          </button>
          <button
            onClick={() => closeModal()}
            className="flex items-center space-x-1 bg-rose-700 text-white px-3 py-2 rounded-xl my-4"
          >
            <CloseCircleIcon iconProps="w-5 h-5" />
            <span>TUTUP</span>
          </button>
        </div>
      </motion.div>
    </Backdrop>
  );
};

export default Modal;
