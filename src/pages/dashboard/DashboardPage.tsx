import React from 'react';
import { motion } from 'framer-motion';
import BalanceCard from '../../components/dashboard/BalanceCard';
import BankLinkCard from '../../components/dashboard/BankLinkCard';
import RecentTransactions from '../../components/dashboard/RecentTransactions';
import BalanceChart from '../../components/dashboard/BalanceChart';
import { useAuth } from '../../contexts/AuthContext';
import { Link } from 'react-router-dom';
import { CreditCard, Building, Settings } from 'lucide-react';
import { useFasTag } from '../../contexts/FasTagContext';

const DashboardPage: React.FC = () => {
  const { user } = useAuth();
  const { fasTag, bankAccount } = useFasTag();
  
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };
  
  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.3
      }
    }
  };
  
  return (
    <div className="bg-gray-100 min-h-screen py-8">
      <div className="container mx-auto px-4">
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-gray-900">Welcome, {user?.name}</h1>
          <p className="text-gray-600">Manage your FASTag and auto-recharge settings</p>
        </div>
        
        {(!fasTag || !bankAccount) && (
          <motion.div 
            className="bg-white rounded-lg shadow-md p-6 mb-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            <h2 className="text-lg font-semibold text-gray-800 mb-4">Complete Your Setup</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {!fasTag && (
                <Link to="/link-fastag\" className="flex items-center p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
                  <div className="bg-blue-100 p-2 rounded-full mr-4">
                    <CreditCard className="h-6 w-6 text-blue-600" />
                  </div>
                  <div>
                    <h3 className="font-medium text-gray-800">Link Your FASTag</h3>
                    <p className="text-sm text-gray-500">Connect your FASTag to enable monitoring</p>
                  </div>
                </Link>
              )}
              
              {!bankAccount && (
                <Link to="/link-bank" className="flex items-center p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
                  <div className="bg-blue-100 p-2 rounded-full mr-4">
                    <Building className="h-6 w-6 text-blue-600" />
                  </div>
                  <div>
                    <h3 className="font-medium text-gray-800">Link Bank Account</h3>
                    <p className="text-sm text-gray-500">Connect your bank for automatic recharges</p>
                  </div>
                </Link>
              )}
              
              {fasTag && bankAccount && (
                <Link to="/settings" className="flex items-center p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
                  <div className="bg-blue-100 p-2 rounded-full mr-4">
                    <Settings className="h-6 w-6 text-blue-600" />
                  </div>
                  <div>
                    <h3 className="font-medium text-gray-800">Configure Auto-Recharge</h3>
                    <p className="text-sm text-gray-500">Set up your automatic recharge preferences</p>
                  </div>
                </Link>
              )}
            </div>
          </motion.div>
        )}
        
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 lg:grid-cols-3 gap-8"
        >
          <motion.div variants={itemVariants} className="lg:col-span-2">
            <BalanceCard />
          </motion.div>
          
          <motion.div variants={itemVariants}>
            <BankLinkCard />
          </motion.div>
          
          <motion.div variants={itemVariants} className="lg:col-span-2">
            <BalanceChart />
          </motion.div>
          
          <motion.div variants={itemVariants} className="lg:col-span-1">
            <RecentTransactions />
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
};

export default DashboardPage;