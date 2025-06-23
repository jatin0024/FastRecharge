import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useFasTag } from '../../contexts/FasTagContext';
import { motion } from 'framer-motion';
import { Building, AlertCircle, ArrowLeft, Lock } from 'lucide-react';

const LinkBankPage: React.FC = () => {
  const navigate = useNavigate();
  const { linkBankAccount, isLoading, error } = useFasTag();
  
  const [bankName, setBankName] = useState('');
  const [accountNumber, setAccountNumber] = useState('');
  const [confirmAccountNumber, setConfirmAccountNumber] = useState('');
  const [ifscCode, setIfscCode] = useState('');
  const [validationErrors, setValidationErrors] = useState<Record<string, string>>({});
  
  const validateIfscCode = (value: string) => {
    // IFSC code validation: 4 alphabets followed by 0 and 6 alphanumeric characters
    const regex = /^[A-Z]{4}0[A-Z0-9]{6}$/;
    return regex.test(value);
  };
  
  const validateAccountNumber = (value: string) => {
    // Basic validation for account number (numeric, 9-18 digits)
    const regex = /^\d{9,18}$/;
    return regex.test(value);
  };
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const errors: Record<string, string> = {};
    
    if (!bankName) {
      errors.bankName = 'Bank name is required';
    }
    
    if (!validateAccountNumber(accountNumber)) {
      errors.accountNumber = 'Please enter a valid account number (9-18 digits)';
    }
    
    if (accountNumber !== confirmAccountNumber) {
      errors.confirmAccountNumber = 'Account numbers do not match';
    }
    
    if (!validateIfscCode(ifscCode)) {
      errors.ifscCode = 'Please enter a valid IFSC code';
    }
    
    if (Object.keys(errors).length > 0) {
      setValidationErrors(errors);
      return;
    }
    
    try {
      await linkBankAccount(bankName, accountNumber, ifscCode);
      navigate('/dashboard');
    } catch (err) {
      // Error is handled by the context
    }
  };
  
  const bankOptions = [
    { value: '', label: 'Select a bank' },
    { value: 'State Bank of India', label: 'State Bank of India' },
    { value: 'HDFC Bank', label: 'HDFC Bank' },
    { value: 'ICICI Bank', label: 'ICICI Bank' },
    { value: 'Axis Bank', label: 'Axis Bank' },
    { value: 'Kotak Mahindra Bank', label: 'Kotak Mahindra Bank' },
    { value: 'Bank of Baroda', label: 'Bank of Baroda' },
    { value: 'Punjab National Bank', label: 'Punjab National Bank' },
    { value: 'Canara Bank', label: 'Canara Bank' },
    { value: 'Yes Bank', label: 'Yes Bank' },
    { value: 'IndusInd Bank', label: 'IndusInd Bank' },
  ];
  
  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="container mx-auto max-w-md">
        <motion.div 
          className="bg-white p-8 rounded-lg shadow-md"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          <div className="mb-6">
            <button
              onClick={() => navigate(-1)}
              className="inline-flex items-center text-blue-600 hover:text-blue-800 transition-colors"
            >
              <ArrowLeft className="h-4 w-4 mr-1" /> Back
            </button>
          </div>
          
          <div className="text-center mb-8">
            <div className="flex justify-center mb-4">
              <div className="bg-blue-100 p-3 rounded-full">
                <Building className="h-8 w-8 text-blue-600" />
              </div>
            </div>
            <h1 className="text-2xl font-bold text-gray-900">Link Bank Account</h1>
            <p className="text-gray-600">Connect your bank account to enable automatic recharges</p>
          </div>
          
          {error && (
            <div className="mb-6 bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-md flex items-start">
              <AlertCircle className="h-5 w-5 mr-2 flex-shrink-0 mt-0.5" />
              <span>{error}</span>
            </div>
          )}
          
          <div className="mb-6 flex items-center justify-center bg-green-50 border border-green-200 p-3 rounded-md">
            <Lock className="h-5 w-5 text-green-600 mr-2" />
            <span className="text-green-700 text-sm">Your banking information is secure and encrypted</span>
          </div>
          
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="bankName" className="block text-sm font-medium text-gray-700 mb-1">
                Bank Name
              </label>
              <select
                id="bankName"
                value={bankName}
                onChange={(e) => {
                  setBankName(e.target.value);
                  if (validationErrors.bankName) {
                    const { bankName, ...rest } = validationErrors;
                    setValidationErrors(rest);
                  }
                }}
                className={`block w-full px-3 py-2 border ${
                  validationErrors.bankName ? 'border-red-300' : 'border-gray-300'
                } rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500`}
              >
                {bankOptions.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
              {validationErrors.bankName && (
                <p className="mt-1 text-sm text-red-600">{validationErrors.bankName}</p>
              )}
            </div>
            
            <div>
              <label htmlFor="accountNumber" className="block text-sm font-medium text-gray-700 mb-1">
                Account Number
              </label>
              <input
                id="accountNumber"
                type="text"
                value={accountNumber}
                onChange={(e) => {
                  setAccountNumber(e.target.value);
                  if (validationErrors.accountNumber) {
                    const { accountNumber, ...rest } = validationErrors;
                    setValidationErrors(rest);
                  }
                }}
                className={`block w-full px-3 py-2 border ${
                  validationErrors.accountNumber ? 'border-red-300' : 'border-gray-300'
                } rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500`}
                placeholder="Enter your account number"
              />
              {validationErrors.accountNumber && (
                <p className="mt-1 text-sm text-red-600">{validationErrors.accountNumber}</p>
              )}
            </div>
            
            <div>
              <label htmlFor="confirmAccountNumber" className="block text-sm font-medium text-gray-700 mb-1">
                Confirm Account Number
              </label>
              <input
                id="confirmAccountNumber"
                type="text"
                value={confirmAccountNumber}
                onChange={(e) => {
                  setConfirmAccountNumber(e.target.value);
                  if (validationErrors.confirmAccountNumber) {
                    const { confirmAccountNumber, ...rest } = validationErrors;
                    setValidationErrors(rest);
                  }
                }}
                className={`block w-full px-3 py-2 border ${
                  validationErrors.confirmAccountNumber ? 'border-red-300' : 'border-gray-300'
                } rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500`}
                placeholder="Confirm your account number"
              />
              {validationErrors.confirmAccountNumber && (
                <p className="mt-1 text-sm text-red-600">{validationErrors.confirmAccountNumber}</p>
              )}
            </div>
            
            <div>
              <label htmlFor="ifscCode" className="block text-sm font-medium text-gray-700 mb-1">
                IFSC Code
              </label>
              <input
                id="ifscCode"
                type="text"
                value={ifscCode}
                onChange={(e) => {
                  setIfscCode(e.target.value.toUpperCase());
                  if (validationErrors.ifscCode) {
                    const { ifscCode, ...rest } = validationErrors;
                    setValidationErrors(rest);
                  }
                }}
                className={`block w-full px-3 py-2 border ${
                  validationErrors.ifscCode ? 'border-red-300' : 'border-gray-300'
                } rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500`}
                placeholder="e.g., SBIN0123456"
              />
              {validationErrors.ifscCode && (
                <p className="mt-1 text-sm text-red-600">{validationErrors.ifscCode}</p>
              )}
              <p className="mt-1 text-xs text-gray-500">
                The IFSC code is an 11-character code that identifies the bank branch (e.g., SBIN0123456).
              </p>
            </div>
            
            <div className="bg-blue-50 border border-blue-200 rounded-md p-4">
              <div className="flex">
                <div className="flex-shrink-0">
                  <AlertCircle className="h-5 w-5 text-blue-600" />
                </div>
                <div className="ml-3">
                  <h3 className="text-sm font-medium text-blue-800">Note</h3>
                  <p className="text-sm text-blue-700 mt-1">
                    For demo purposes, any valid format is accepted. In a real implementation, we would verify your bank details through a secure banking interface.
                  </p>
                </div>
              </div>
            </div>
            
            <div>
              <button
                type="submit"
                disabled={isLoading}
                className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors disabled:bg-blue-300"
              >
                {isLoading ? 'Linking...' : 'Link Bank Account'}
              </button>
            </div>
          </form>
        </motion.div>
      </div>
    </div>
  );
};

export default LinkBankPage;