import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { useFasTag } from '../../contexts/FasTagContext';
import { useAuth } from '../../contexts/AuthContext';
import { Settings, CreditCard, Building, Bell, Shield, Info, Save, Check } from 'lucide-react';

const SettingsPage: React.FC = () => {
  const { user } = useAuth();
  const { 
    fasTag, 
    bankAccount, 
    autoRechargeSettings, 
    updateAutoRechargeSettings 
  } = useFasTag();
  
  const [isEnabled, setIsEnabled] = useState(autoRechargeSettings.isEnabled);
  const [minThreshold, setMinThreshold] = useState(autoRechargeSettings.minThreshold.toString());
  const [rechargeAmount, setRechargeAmount] = useState(autoRechargeSettings.rechargeAmount.toString());
  const [isUpdated, setIsUpdated] = useState(false);
  
  const handleToggleAutoRecharge = () => {
    setIsEnabled(prev => !prev);
    setIsUpdated(false);
  };
  
  const handleSaveSettings = () => {
    updateAutoRechargeSettings({
      isEnabled,
      minThreshold: parseInt(minThreshold),
      rechargeAmount: parseInt(rechargeAmount),
    });
    
    setIsUpdated(true);
    
    // Reset the updated status after 3 seconds
    setTimeout(() => {
      setIsUpdated(false);
    }, 3000);
  };
  
  return (
    <div className="bg-gray-100 min-h-screen py-8">
      <div className="container mx-auto px-4 max-w-4xl">
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-gray-900">Settings</h1>
          <p className="text-gray-600">Manage your account and auto-recharge preferences</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Sidebar */}
          <div className="md:col-span-1">
            <nav className="bg-white rounded-lg shadow-md overflow-hidden">
              <div className="p-4 bg-blue-50 border-b border-blue-100">
                <div className="flex items-center space-x-3">
                  <div className="bg-blue-600 rounded-full h-10 w-10 flex items-center justify-center text-white font-medium">
                    {user?.name.charAt(0) || 'U'}
                  </div>
                  <div>
                    <p className="font-medium text-gray-900">{user?.name}</p>
                    <p className="text-sm text-gray-500">{user?.email}</p>
                  </div>
                </div>
              </div>
              
              <div className="p-2">
                <a href="#auto-recharge" className="flex items-center px-3 py-2 text-blue-600 bg-blue-50 rounded-md font-medium">
                  <Settings className="h-5 w-5 mr-3" />
                  Auto-Recharge
                </a>
                <a href="#linked-accounts" className="flex items-center px-3 py-2 text-gray-700 hover:bg-gray-50 rounded-md">
                  <CreditCard className="h-5 w-5 mr-3" />
                  Linked Accounts
                </a>
                <a href="#notifications" className="flex items-center px-3 py-2 text-gray-700 hover:bg-gray-50 rounded-md">
                  <Bell className="h-5 w-5 mr-3" />
                  Notifications
                </a>
                <a href="#security" className="flex items-center px-3 py-2 text-gray-700 hover:bg-gray-50 rounded-md">
                  <Shield className="h-5 w-5 mr-3" />
                  Security
                </a>
              </div>
            </nav>
          </div>
          
          {/* Main content */}
          <div className="md:col-span-3 space-y-8">
            {/* Auto-Recharge Settings */}
            <motion.section 
              id="auto-recharge"
              className="bg-white rounded-lg shadow-md overflow-hidden"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
            >
              <div className="border-b border-gray-200 px-6 py-4">
                <h2 className="text-xl font-semibold text-gray-800">Auto-Recharge Settings</h2>
              </div>
              
              <div className="p-6">
                {(!fasTag || !bankAccount) ? (
                  <div className="bg-amber-50 border border-amber-200 rounded-md p-4 mb-6">
                    <div className="flex">
                      <div className="flex-shrink-0">
                        <Info className="h-5 w-5 text-amber-600" />
                      </div>
                      <div className="ml-3">
                        <h3 className="text-sm font-medium text-amber-800">Incomplete Setup</h3>
                        <div className="mt-2 text-sm text-amber-700">
                          <p>You need to link both your FASTag and bank account to enable auto-recharge.</p>
                          {!fasTag && (
                            <div className="mt-3">
                              <Link 
                                to="/link-fastag" 
                                className="text-amber-800 font-medium hover:text-amber-900 underline"
                              >
                                Link your FASTag
                              </Link>
                            </div>
                          )}
                          {!bankAccount && (
                            <div className="mt-3">
                              <Link 
                                to="/link-bank" 
                                className="text-amber-800 font-medium hover:text-amber-900 underline"
                              >
                                Link your bank account
                              </Link>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                ) : (
                  <>
                    <div className="flex justify-between items-center mb-6">
                      <div>
                        <h3 className="text-lg font-medium text-gray-900">Enable Auto-Recharge</h3>
                        <p className="text-gray-500 text-sm">Automatically recharge your FASTag when balance falls below threshold</p>
                      </div>
                      <button 
                        onClick={handleToggleAutoRecharge}
                        className={`relative inline-flex flex-shrink-0 h-6 w-11 border-2 border-transparent rounded-full cursor-pointer transition-colors ease-in-out duration-200 focus:outline-none ${
                          isEnabled ? 'bg-blue-600' : 'bg-gray-200'
                        }`}
                        role="switch"
                        aria-checked={isEnabled}
                      >
                        <span 
                          className={`pointer-events-none inline-block h-5 w-5 rounded-full bg-white shadow transform ring-0 transition ease-in-out duration-200 ${
                            isEnabled ? 'translate-x-5' : 'translate-x-0'
                          }`} 
                        />
                      </button>
                    </div>
                    
                    <div className="space-y-6">
                      <div>
                        <label htmlFor="min-threshold" className="block text-sm font-medium text-gray-700 mb-1">
                          Minimum Balance Threshold (₹)
                        </label>
                        <div className="relative">
                          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <span className="text-gray-500">₹</span>
                          </div>
                          <input
                            type="number"
                            id="min-threshold"
                            value={minThreshold}
                            onChange={(e) => setMinThreshold(e.target.value)}
                            min="100"
                            max="1000"
                            step="100"
                            disabled={!isEnabled}
                            className="block w-full pl-7 pr-12 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 disabled:bg-gray-100 disabled:text-gray-500"
                          />
                          <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                            <span className="text-gray-500">INR</span>
                          </div>
                        </div>
                        <p className="mt-1 text-xs text-gray-500">
                          Auto-recharge will trigger when your balance falls below this amount.
                        </p>
                      </div>
                      
                      <div>
                        <label htmlFor="recharge-amount" className="block text-sm font-medium text-gray-700 mb-1">
                          Recharge Amount (₹)
                        </label>
                        <div className="relative">
                          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <span className="text-gray-500">₹</span>
                          </div>
                          <input
                            type="number"
                            id="recharge-amount"
                            value={rechargeAmount}
                            onChange={(e) => setRechargeAmount(e.target.value)}
                            min="200"
                            max="5000"
                            step="100"
                            disabled={!isEnabled}
                            className="block w-full pl-7 pr-12 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 disabled:bg-gray-100 disabled:text-gray-500"
                          />
                          <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                            <span className="text-gray-500">INR</span>
                          </div>
                        </div>
                        <p className="mt-1 text-xs text-gray-500">
                          This amount will be added to your FASTag when auto-recharge is triggered.
                        </p>
                      </div>
                      
                      <div className="flex justify-end">
                        <button
                          onClick={handleSaveSettings}
                          className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                        >
                          {isUpdated ? (
                            <>
                              <Check className="mr-1.5 h-4 w-4" />
                              Saved
                            </>
                          ) : (
                            <>
                              <Save className="mr-1.5 h-4 w-4" />
                              Save Settings
                            </>
                          )}
                        </button>
                      </div>
                    </div>
                  </>
                )}
              </div>
            </motion.section>
            
            {/* Linked Accounts */}
            <motion.section 
              id="linked-accounts"
              className="bg-white rounded-lg shadow-md overflow-hidden"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 0.1 }}
            >
              <div className="border-b border-gray-200 px-6 py-4">
                <h2 className="text-xl font-semibold text-gray-800">Linked Accounts</h2>
              </div>
              
              <div className="p-6 space-y-6">
                <div>
                  <h3 className="text-lg font-medium text-gray-900 mb-4 flex items-center">
                    <CreditCard className="h-5 w-5 mr-2 text-blue-600" />
                    FASTag
                  </h3>
                  
                  {fasTag ? (
                    <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
                      <div className="flex justify-between items-center">
                        <div>
                          <p className="font-medium text-gray-900">{fasTag.vehicleNumber}</p>
                          <p className="text-gray-500 text-sm">Tag ID: {fasTag.tagId}</p>
                        </div>
                        <Link 
                          to="/link-fastag" 
                          className="text-sm text-blue-600 hover:text-blue-800 font-medium"
                        >
                          Change
                        </Link>
                      </div>
                    </div>
                  ) : (
                    <div className="text-center py-6 border border-dashed border-gray-300 rounded-lg">
                      <CreditCard className="h-12 w-12 text-gray-400 mx-auto mb-3" />
                      <p className="text-gray-500 mb-4">No FASTag linked to your account</p>
                      <Link 
                        to="/link-fastag" 
                        className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700"
                      >
                        Link FASTag
                      </Link>
                    </div>
                  )}
                </div>
                
                <div>
                  <h3 className="text-lg font-medium text-gray-900 mb-4 flex items-center">
                    <Building className="h-5 w-5 mr-2 text-blue-600" />
                    Bank Account
                  </h3>
                  
                  {bankAccount ? (
                    <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
                      <div className="flex justify-between items-center">
                        <div>
                          <p className="font-medium text-gray-900">{bankAccount.bankName}</p>
                          <p className="text-gray-500 text-sm">
                            Account: {'•'.repeat(bankAccount.accountNumber.length - 4) + bankAccount.accountNumber.slice(-4)}
                          </p>
                        </div>
                        <Link 
                          to="/link-bank" 
                          className="text-sm text-blue-600 hover:text-blue-800 font-medium"
                        >
                          Change
                        </Link>
                      </div>
                    </div>
                  ) : (
                    <div className="text-center py-6 border border-dashed border-gray-300 rounded-lg">
                      <Building className="h-12 w-12 text-gray-400 mx-auto mb-3" />
                      <p className="text-gray-500 mb-4">No bank account linked</p>
                      <Link 
                        to="/link-bank" 
                        className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700"
                      >
                        Link Bank Account
                      </Link>
                    </div>
                  )}
                </div>
              </div>
            </motion.section>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SettingsPage;