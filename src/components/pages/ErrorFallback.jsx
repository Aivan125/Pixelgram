import React from "react";
import { motion } from "framer-motion";
import { AlertCircle } from "lucide-react";

const ErrorFallback = ({ error, resetErrorBoundary }) => {
  return (
    <div className="flex h-screen items-center justify-center bg-gradient-to-br from-blue-900 via-blue-700 to-black p-4">
      <motion.div
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-md rounded-lg bg-white p-8 shadow-2xl"
      >
        <motion.h1
          initial={{ scale: 0.5 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
          className="mb-4 text-4xl font-bold text-blue-600"
        >
          Oops!
        </motion.h1>
        <motion.div
          animate={{ rotate: [0, 10, -10, 0] }}
          transition={{ repeat: Infinity, duration: 2 }}
          className="mb-4 flex justify-center"
        >
          <AlertCircle size={80} className="text-blue-500" />
        </motion.div>
        <h2 className="mb-4 text-2xl font-semibold text-gray-800">
          Something went wrong
        </h2>
        <div className="mb-4 rounded bg-blue-100 p-3 text-sm text-blue-800">
          <strong>Error Type:</strong> {error.name}
          <br />
          <strong>Message:</strong> {error.message}
        </div>
        <p className="mb-6 text-gray-600">
          Don&apos;t worry, our team of coding ninjas is already on the case!
        </p>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={resetErrorBoundary}
          className="w-full rounded-full bg-gradient-to-r from-blue-600 to-blue-800 px-4 py-2 font-bold text-white transition-colors hover:from-blue-700 hover:to-blue-900"
        >
          Try Again
        </motion.button>
      </motion.div>
    </div>
  );
};

export default ErrorFallback;
