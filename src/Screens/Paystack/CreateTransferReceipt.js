import React from 'react';
import queryString from 'query-string';
import * as Yup from 'yup';
import { useFormik } from 'formik';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { createTransferReceiptAction } from '../../redux/slices/paystack/createTransferReceiptSlice';

//Validation
const formSchema = Yup.object({
  recipient: Yup.string().required('Recipient  is required'),
  description: Yup.string().required('Description is required'),
});

const CreateTransferReceipt = props => {
  const dispatch = useDispatch();
  const parsed = queryString.parse(props.location.search);
  //console.log(parsed?.accountNumber);
  console.log(parsed?.accountNumber);
  console.log(parsed?.bankCode);

  const formik = useFormik({
    initialValues: {
      recipient: '',
      description: '',
    },
    onSubmit: values => {
      let data = {
        accountNumber: parsed?.accountNumber,
        bankCode: parsed?.bankCode,
        name: values?.recipient,
        description: values?.description,
      };
      console.log(values);
      console.log(parsed?.accountNumber);
      console.log(parsed?.bankCode);

      dispatch(createTransferReceiptAction(data));
    },
    validationSchema: formSchema,
  });
  return (
    <div>
      <div className='min-h-screen bg-gray-900 flex flex-col justify-center py-12 sm:px-6 lg:px-8'>
        <div className='sm:mx-auto sm:w-full sm:max-w-md'>
          <img
            className='mx-auto h-12 w-auto'
            src='https://tailwindui.com/img/logos/workflow-mark-indigo-600.svg'
            alt='Workflow'
          />
          <h2 className='mt-6 text-center text-3xl font-extrabold text-gray-900'>
            Send Money
          </h2>

          {/* <p className='mt-2 text-center text-sm text-gray-600'>
            <a className='font-medium text-indigo-600 hover:text-indigo-500'>
              Select your Bank and Account Number
            </a>
          </p> */}
        </div>

        <div className='mt-8 sm:mx-auto sm:w-full sm:max-w-md'>
          <div className='bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10'>
            <form className='space-y-6' onSubmit={formik.handleSubmit}>
              <div>
                <label
                  htmlFor='recipient'
                  className='block text-sm font-medium text-gray-700'>
                  Recipient
                </label>
                <div className='mt-1'>
                  <input
                    value={formik.values?.recipient}
                    onChange={formik.handleChange('recipient')}
                    onBlur={formik.handleBlur('recipient')}
                    id='recipient'
                    name='recipient'
                    type='text'
                    autoComplete='recipient'
                    className='appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm'
                  />
                  <div className='text-red-500'>
                    {formik.touched.recipient && formik.errors.recipient}
                  </div>
                </div>
              </div>

              <div>
                <label
                  htmlFor='recipient'
                  className='block text-sm font-medium text-gray-700'>
                  Description
                </label>
                <div className='mt-1'>
                  <input
                    value={formik.values?.description}
                    onChange={formik.handleChange('description')}
                    onBlur={formik.handleBlur('description')}
                    id='recipient'
                    name='recipient'
                    type='text'
                    autoComplete='recipient'
                    className='appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm'
                  />
                  <div className='text-red-500'>
                    {formik.touched.description && formik.errors.description}
                  </div>
                </div>
              </div>

              <div className='flex items-center justify-between'>
                <div className='text-sm'>
                  <Link
                    to={'/'}
                    className='font-medium text-indigo-600 hover:text-indigo-500'>
                    Report a problem?
                  </Link>
                </div>
              </div>

              <div>
                <button
                  type='submit'
                  className='w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500'>
                  Verify
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateTransferReceipt;
