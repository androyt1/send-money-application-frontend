import React from 'react';

const DisplayVerifiedDetails = ({ accountNumber, name }) => {
  return (
    <div className='bg-gray-900 mt-2 p-2'>
      <div className='w-full '>
        <div className='text-center'>
          <h2 className='text-base font-semibold text-green-600 tracking-wide '>
            Account Number Verified
          </h2>
          <p className='mt-1  font-extrabold text-gray-400 '>
            Account Number: {accountNumber}
          </p>
          <p className='max-w-xl mt-5 mx-auto text-xl text-gray-400'>
            Account Name: {name}
          </p>
        </div>
      </div>
    </div>
  );
};

export default DisplayVerifiedDetails;
