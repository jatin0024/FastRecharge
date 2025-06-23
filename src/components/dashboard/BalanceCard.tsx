import React from 'react';
import { CreditCard, Wallet, AlertCircle } from 'lucide-react';
import { useFasTag } from '../../contexts/FasTagContext';
import { motion } from 'framer-motion';

const BalanceCard: React.FC = () => {
  const { fasTag, autoRechargeSettings, rechargeManually } = useFasTag();
  
  if (!fasTag) {
    return (
      <div className="bg-white rounded-lg shadow-md p-6 h-full flex flex-col justify-center items-center">
        <CreditCard className="h-12 w-12 text-gray-400 mb-4" />
        <h3 className="text-lg font-medium text-gray-700 mb-2">No FASTag Linked</h3>
        <p className="text-gray-500 text-center mb-4">Link your FASTag to view your balance and set up auto-recharge.</p>
      </div>
    );
  }
  
  const isLowBalance = fasTag.balance < autoRechargeSettings.minThreshold;
  
  return (
    <motion.div 
      className="bg-white rounded-lg shadow-md overflow-hidden"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <div className="p-6">
        <div className="flex justify-between items-start mb-4">
          <div>
            <h3 className="text-lg font-medium text-gray-700">FASTag Balance</h3>
            <p className="text-gray-500 text-sm">{fasTag.vehicleNumber}</p>
          </div>
          <CreditCard className="h-8 w-8 text-blue-600" />
        </div>
        
        <div className="flex items-baseline mb-4">
          <span className="text-3xl font-bold text-gray-900">₹{fasTag.balance}</span>
          {isLowBalance && (
            <div className="ml-2 flex items-center text-amber-600 text-sm">
              <AlertCircle className="h-4 w-4 mr-1" />
              <span>Low Balance</span>
            </div>
          )}
        </div>
        
        {isLowBalance && (
          <div className="bg-amber-50 border border-amber-200 rounded-md p-3 mb-4">
            <p className="text-amber-700 text-sm">
              Your balance is below the minimum threshold of ₹{autoRechargeSettings.minThreshold}.
              {autoRechargeSettings.isEnabled
                ? ' Auto-recharge will trigger soon.'
                : ' Enable auto-recharge in settings to avoid inconvenience.'}
            </p>
          </div>
        )}
        
        <div className="grid grid-cols-2 gap-3 mt-4">
          <button 
            onClick={() => rechargeManually(200)}
            className="bg-gray-100 hover:bg-gray-200 text-gray-800 font-medium py-2 px-4 rounded-md transition-colors text-sm flex justify-center items-center"
          >
            <span>₹200</span>
          </button>
          <button 
            onClick={() => rechargeManually(500)}
            className="bg-gray-100 hover:bg-gray-200 text-gray-800 font-medium py-2 px-4 rounded-md transition-colors text-sm flex justify-center items-center"
          >
            <span>₹500</span>
          </button>
          <button 
            onClick={() => rechargeManually(1000)}
            className="bg-gray-100 hover:bg-gray-200 text-gray-800 font-medium py-2 px-4 rounded-md transition-colors text-sm flex justify-center items-center"
          >
            <span>₹1000</span>
          </button>
          <button 
            className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-md transition-colors text-sm flex justify-center items-center"
          >
            <Wallet className="h-4 w-4 mr-1" />
            <span>Custom</span>
          </button>
        </div>
      </div>
      
      <div className="bg-gray-50 px-6 py-3 border-t border-gray-200">
        <div className="flex justify-between items-center text-sm">
          <span className="text-gray-500">Auto-Recharge</span>
          <span className={`font-medium ${autoRechargeSettings.isEnabled ? 'text-green-600' : 'text-gray-500'}`}>
            {autoRechargeSettings.isEnabled ? 'Enabled' : 'Disabled'}
          </span>
        </div>
      </div>
    </motion.div>
  );
};

export default BalanceCard;