import { motion } from "framer-motion";
import { ReactElement } from "react";

interface BackdropProps {
    children: ReactElement,
    onClick: Function 
}
const Backdrop:React.FC<BackdropProps> = ({ children, onClick }:BackdropProps) => {
 
  return (
    <motion.div
      className="absolute flex flex-col items-center w-full h-full backdrop-blur-sm z-0"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      {children}
    </motion.div>
  );
};

export default Backdrop;