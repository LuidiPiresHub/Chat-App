import { motion } from 'framer-motion';
import { FieldError } from 'react-hook-form';

interface IFormError {
  fieldError: FieldError | undefined
}

export default function FormError({ fieldError }: IFormError) {
  if (!fieldError) return;
  return (
    <motion.span
      initial={{ opacity: 0, y: -5 }}
      animate={{ opacity: 1, y: 0 }}
      className='text-red-500'
    >
      {fieldError.message}
    </motion.span>
  );
}
