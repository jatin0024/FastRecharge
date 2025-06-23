import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useFasTag } from '../../contexts/FasTagContext';
import { motion } from 'framer-motion';
import { CreditCard, AlertCircle, ArrowLeft } from 'lucide-react';

const LinkFasTagPage: React.FC = () => {
  const navigate = useNavigate();
  const { linkFasTag, isLoading, error } = useFasTag();
  
  const [tagId, setTagId] = useState('');
  const [vehicleNumber, setVehicleNumber] = useState('');
  const [validationErrors, setValidationErrors] = useState<Record<string, string>>({});
  
  const validateVehicleNumber = (value: string) => {
    // Simple Indian vehicle number validation: 2 letters + 2 digits + 2 letters + 4 digits
    const regex = /^[A-Z]{2}[0-9]{2}[A-Z]{1,2}[0-9]{4}$/;
    return regex.test(value.toUpperCase());
  };
  
  const validateTagId = (value: string) => {
    // Basic validation for FASTag ID (16 digit number)
    const regex = /^[0-9]{16}$/;
    return regex.test(value);
  };
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const errors: Record<string, string> = {};
    
    if (!validateTagId(tagId)) {
      errors.tagId = 'Please enter a valid 16-digit FASTag ID';
    }
    
    if (!validateVehicleNumber(vehicleNumber)) {
      errors.vehicleNumber = 'Please enter a valid vehicle registration number (e.g., MH01AB1234)';
    }
    
    if (Object.keys(errors).length > 0) {
      setValidationErrors(errors);
      return;
    }
    
    try {
      await linkFasTag(tagId, vehicleNumber.toUpperCase());
      navigate('/dashboard');
    } catch (err) {
      // Error is handled by the context
    }
  };
  
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
                <CreditCard className="h-8 w-8 text-blue-600" />
              </div>
            </div>
            <h1 className="text-2xl font-bold text-gray-900">Link Your FASTag</h1>
            <p className="text-gray-600">Connect your FASTag to enable balance monitoring and auto-recharge</p>
          </div>
          
          {error && (
            <div className="mb-6 bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-md flex items-start">
              <AlertCircle className="h-5 w-5 mr-2 flex-shrink-0 mt-0.5" />
              <span>{error}</span>
            </div>
          )}
          
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="tagId" className="block text-sm font-medium text-gray-700 mb-1">
                FASTag ID
              </label>
              <input
                id="tagId"
                type="text"
                value={tagId}
                onChange={(e) => {
                  setTagId(e.target.value);
                  if (validationErrors.tagId) {
                    const { tagId, ...rest } = validationErrors;
                    setValidationErrors(rest);
                  }
                }}
                className={`block w-full px-3 py-2 border ${
                  validationErrors.tagId ? 'border-red-300' : 'border-gray-300'
                } rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500`}
                placeholder="16-digit FASTag ID"
              />
              {validationErrors.tagId && (
                <p className="mt-1 text-sm text-red-600">{validationErrors.tagId}</p>
              )}
              <p className="mt-1 text-xs text-gray-500">
                You can find your FASTag ID on the back of your tag or in your FASTag registration documents.
              </p>
            </div>
            
            <div>
              <label htmlFor="vehicleNumber" className="block text-sm font-medium text-gray-700 mb-1">
                Vehicle Registration Number
              </label>
              <input
                id="vehicleNumber"
                type="text"
                value={vehicleNumber}
                onChange={(e) => {
                  setVehicleNumber(e.target.value.toUpperCase());
                  if (validationErrors.vehicleNumber) {
                    const { vehicleNumber, ...rest } = validationErrors;
                    setValidationErrors(rest);
                  }
                }}
                className={`block w-full px-3 py-2 border ${
                  validationErrors.vehicleNumber ? 'border-red-300' : 'border-gray-300'
                } rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500`}
                placeholder="e.g., MH01AB1234"
              />
              {validationErrors.vehicleNumber && (
                <p className="mt-1 text-sm text-red-600">{validationErrors.vehicleNumber}</p>
              )}
            </div>
            
            <div className="bg-blue-50 border border-blue-200 rounded-md p-4">
              <div className="flex">
                <div className="flex-shrink-0">
                  <AlertCircle className="h-5 w-5 text-blue-600" />
                </div>
                <div className="ml-3">
                  <h3 className="text-sm font-medium text-blue-800">Note</h3>
                  <p className="text-sm text-blue-700 mt-1">
                    For demo purposes, any valid format is accepted. In a real implementation, we would verify your FASTag details with the issuing authority.
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
                {isLoading ? 'Linking...' : 'Link FASTag'}
              </button>
            </div>
          </form>
        </motion.div>
      </div>
    </div>
  );
};

export default LinkFasTagPage;