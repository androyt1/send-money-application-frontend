import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Select from 'react-select';
import { getAllBanksAction } from '../../redux/slices/paystack/getAllBanksSlice';

const SelectBankOptions = props => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getAllBanksAction());
  }, [dispatch]);

  const banks = useSelector(state => state?.banks);
  const { allBanks, error, loading } = banks;

  //Get the id and names and pass to react select
  const allBanksList =
    allBanks &&
    allBanks?.data?.map(bank => {
      return {
        label: bank?.name,
        value: bank?.code,
      };
    });
  const handleChange = value => {
    // this is going to call setFieldValue and manually update values.user
    props.onChange('bank', value);
  };

  const handleBlur = () => {
    // this is going to call setFieldTouched and manually update touched.user
    props.onBlur('bank', true);
  };

  return (
    <div style={{ margin: '1rem 0' }}>
      {loading ? (
        <h3 className='text-base text-yellow-600'>
          Banks list are loading please wait....😀
        </h3>
      ) : (
        <Select
          id='bank'
          options={allBanksList}
          onChange={handleChange}
          onBlur={handleBlur}
          value={props.value}
        />
      )}

      {props.error && props.touched && (
        <div style={{ color: 'red', marginTop: '.5rem' }}>{props.error}</div>
      )}
    </div>
  );
};

export default SelectBankOptions;
