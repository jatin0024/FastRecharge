import React from 'react';
import { Building, LinkIcon } from 'lucide-react';
import { useFasTag } from '../../contexts/FasTagContext';
import { Link } from 'react-router-dom';

const BankLinkCard: React.FC = () => {
  const { bankAccount } = useFasTag();
  
  if (!bankAccount) {
    return (
      <div className="bg-white rounded-lg shadow-md p-6 h-full">
        <div className="flex flex-col items-center justify-center h-full text-center">
          <Building className="h-12 w-12 text-gray-400 mb-4" />
          <h3 className="text-lg font-medium text-gray-700 mb-2">No Bank Account Linked</h3>
          <p className="text-gray-500 mb-4">Link your bank account to enable automatic recharges.</p>
          <Link 
            to="/link-bank" 
            className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-md transition-colors inline-flex items-center"
          >
            <LinkIcon className="h-4 w-4 mr-2" />
            Link Bank Account
          </Link>
        </div>
      </div>
    );
  }
  
  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <div className="flex justify-between items-start mb-4">
        <h3 className="text-lg font-medium text-gray-700">Linked Bank Account</h3>
        <Building className="h-6 w-6 text-blue-600" />
      </div>
      
      <div className="space-y-3">
        <div>
          <p className="text-sm text-gray-500">Bank Name</p>
          <p className="font-medium text-gray-800">{bankAccount.bankName}</p>
        </div>
        
        <div>
          <p className="text-sm text-gray-500">Account Number</p>
          <p className="font-medium text-gray-800">
            {'•'.repeat(bankAccount.accountNumber.length - 4) + bankAccount.accountNumber.slice(-4)}
          </p>
        </div>
        
        <div>
          <p className="text-sm text-gray-500">IFSC Code</p>
          <p className="font-medium text-gray-800">{bankAccount.ifscCode}</p>
        </div>
      </div>
      
      <div className="mt-6 flex justify-end">
        <Link
          to="/link-bank"
          className="text-blue-600 hover:text-blue-800 text-sm font-medium transition-colors"
        >
          Change Bank Account
        </Link>
      </div>
    </div>
  );
};

export default BankLinkCard;