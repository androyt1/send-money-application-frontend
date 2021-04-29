import { useEffect } from 'react';
import { useFormik } from 'formik';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import * as Yup from 'yup';
import SelectBankOptions from './SelectBankOption';
import { getAllBanksAction } from '../../redux/slices/paystack/getAllBanksSlice';
import DisplayVerifiedDetails from '../../components/DisplayVerifiedDetails';
import { verifyAccountNumberAction } from '../../redux/slices/paystack/verifyAccountNumberSlice';
import ErrorComponent from '../../components/ErrorComponent';

//Validation
const formSchema = Yup.object({
  accountNumber: Yup.number().required('Account Number is required'),
  bank: Yup.object().required('Select your bank is required'),
});

const VerifyAccountNumber = () => {
  const dispatch = useDispatch();
  //Fech All Banks
  useEffect(() => {
    dispatch(getAllBanksAction());
  }, [dispatch]);

  const formik = useFormik({
    initialValues: {
      accountNumber: '',
      bank: '',
    },
    onSubmit: values => {
      console.log(values.bank.value);
      let data = {
        accountNumber: values?.accountNumber,
        bankCode: values?.bank?.value,
      };
      console.log(data);
      dispatch(verifyAccountNumberAction(data));
    },
    validationSchema: formSchema,
  });

  //Get verified account details
  const accountNumber = useSelector(state => state?.accountNumber);
  const { accountNumberVerified, loading } = accountNumber;
  return (
    <>
      <div className='min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8'>
        <div className='sm:mx-auto sm:w-full sm:max-w-md'>
          <img
            className='mx-auto h-12 w-auto'
            src='https://tailwindui.com/img/logos/workflow-mark-indigo-600.svg'
            alt='Workflow'
          />
          <h2 className='mt-6 text-center text-3xl font-extrabold text-gray-900'>
            Verify Your Account Number
          </h2>

          <p className='mt-2 text-center text-sm text-gray-600'>
            <a className='font-medium text-indigo-600 hover:text-indigo-500'>
              Select your Bank and Account Number
            </a>
          </p>
          {accountNumberVerified?.status ? (
            <DisplayVerifiedDetails
              accountNumber={accountNumberVerified?.data?.account_number}
              name={accountNumberVerified?.data?.account_name}
            />
          ) : accountNumberVerified?.error ? (
            <div className='text-red-500 text-center mt-3'>
              <ErrorComponent message={accountNumberVerified?.error} />
            </div>
          ) : (
            ''
          )}
        </div>

        <div className='mt-8 sm:mx-auto sm:w-full sm:max-w-md'>
          <div className='bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10'>
            <form className='space-y-6' onSubmit={formik.handleSubmit}>
              <SelectBankOptions
                value={formik.values.bank}
                onChange={formik.setFieldValue}
                onBlur={formik.setFieldTouched}
                error={formik.errors.bank}
                touched={formik.touched.bank}
              />
              <div>
                <label
                  htmlFor='account'
                  className='block text-sm font-medium text-gray-700'>
                  Account Number
                </label>
                <div className='mt-1'>
                  <input
                    value={formik.values?.accountNumber}
                    onChange={formik.handleChange('accountNumber')}
                    onBlur={formik.handleBlur('accountNumber')}
                    id='account'
                    name='email'
                    type='text'
                    autoComplete='account'
                    className='appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm'
                  />
                  <div className='text-red-500'>
                    {formik.touched.accountNumber &&
                      formik.errors.accountNumber}
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
              {accountNumberVerified?.data && !loading && (
                <div className='mt-2'>
                  <Link
                    to={`/create-transfer-receipt?accountNumber=${formik?.values?.accountNumber}&bankCode=${formik.values?.bank?.value}`}>
                    <button
                      type='submit'
                      className='w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-green-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500'>
                      Continue
                    </button>
                  </Link>
                </div>
              )}
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default VerifyAccountNumber;
