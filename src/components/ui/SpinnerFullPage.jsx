import { Spinner } from "@nextui-org/spinner";
import { motion } from "framer-motion";

const SpinnerFullPage = ({ message = "Loading..." }) => {
  return (
    <motion.div
      className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-gray-950"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
    >
      <motion.div
        initial={{ scale: 0.5, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 0.2, duration: 0.5 }}
      >
        <Spinner size="lg" color="secondary" />
      </motion.div>
      <motion.p
        className="mt-4 text-lg font-medium text-secondary"
        initial={{ y: 10, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.4, duration: 0.5 }}
      >
        {message}
      </motion.p>
    </motion.div>
  );
};

export default SpinnerFullPage;
