import React from 'react';
import { ArrowUpRight, ArrowDownRight, ChevronRight } from 'lucide-react';
import { useFasTag } from '../../contexts/FasTagContext';
import { Link } from 'react-router-dom';

const RecentTransactions: React.FC = () => {
  const { transactions } = useFasTag();
  
  // Take only the 5 most recent transactions
  const recentTransactions = transactions.slice(0, 5);
  
  const formatDate = (date: Date) => {
    return date.toLocaleDateString('en-IN', {
      day: '2-digit',
      month: 'short',
    });
  };
  
  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-medium text-gray-700">Recent Transactions</h3>
        <Link 
          to="/transactions" 
          className="text-blue-600 hover:text-blue-800 text-sm font-medium flex items-center transition-colors"
        >
          View All <ChevronRight className="h-4 w-4 ml-1" />
        </Link>
      </div>
      
      {recentTransactions.length === 0 ? (
        <div className="text-center py-8">
          <p className="text-gray-500">No recent transactions found.</p>
        </div>
      ) : (
        <div className="space-y-4">
          {recentTransactions.map((transaction) => (
            <div key={transaction.id} className="flex items-center justify-between py-2 border-b border-gray-100 last:border-0">
              <div className="flex items-center">
                <div className={`flex-shrink-0 rounded-full p-2 mr-3 ${
                  transaction.type === 'recharge' ? 'bg-green-100' : 'bg-red-100'
                }`}>
                  {transaction.type === 'recharge' ? (
                    <ArrowUpRight className={`h-5 w-5 text-green-600`} />
                  ) : (
                    <ArrowDownRight className={`h-5 w-5 text-red-600`} />
                  )}
                </div>
                <div>
                  <p className="font-medium text-gray-800">{transaction.description}</p>
                  <p className="text-sm text-gray-500">{formatDate(transaction.date)}</p>
                </div>
              </div>
              <div className="text-right">
                <p className={`font-medium ${
                  transaction.type === 'recharge' ? 'text-green-600' : 'text-red-600'
                }`}>
                  {transaction.type === 'recharge' ? '+' : '-'}₹{transaction.amount}
                </p>
                <p className="text-xs text-gray-500">Balance: ₹{transaction.balance}</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default RecentTransactions;