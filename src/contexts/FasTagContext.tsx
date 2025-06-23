import React, { createContext, useContext, useState, ReactNode } from 'react';

// Define the FASTag type
type FasTag = {
  id: string;
  tagId: string;
  vehicleNumber: string;
  balance: number;
  isLinked: boolean;
};

// Define the bank account type
type BankAccount = {
  id: string;
  bankName: string;
  accountNumber: string;
  ifscCode: string;
  isLinked: boolean;
};

// Define the auto-recharge settings type
type AutoRechargeSettings = {
  isEnabled: boolean;
  minThreshold: number;
  rechargeAmount: number;
};

// Define the transaction type
type Transaction = {
  id: string;
  date: Date;
  amount: number;
  type: 'recharge' | 'deduction';
  description: string;
  balance: number;
};

// Define the context type
type FasTagContextType = {
  fasTag: FasTag | null;
  bankAccount: BankAccount | null;
  autoRechargeSettings: AutoRechargeSettings;
  transactions: Transaction[];
  linkFasTag: (tagId: string, vehicleNumber: string) => Promise<void>;
  linkBankAccount: (bankName: string, accountNumber: string, ifscCode: string) => Promise<void>;
  updateAutoRechargeSettings: (settings: Partial<AutoRechargeSettings>) => void;
  rechargeManually: (amount: number) => Promise<void>;
  isLoading: boolean;
  error: string | null;
};

// Create the context with default values
const FasTagContext = createContext<FasTagContextType>({
  fasTag: null,
  bankAccount: null,
  autoRechargeSettings: {
    isEnabled: false,
    minThreshold: 300,
    rechargeAmount: 500,
  },
  transactions: [],
  linkFasTag: async () => {},
  linkBankAccount: async () => {},
  updateAutoRechargeSettings: () => {},
  rechargeManually: async () => {},
  isLoading: false,
  error: null,
});

// Hook to use the FASTag context
export const useFasTag = () => useContext(FasTagContext);

// Provider component
export const FasTagProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [fasTag, setFasTag] = useState<FasTag | null>(null);
  const [bankAccount, setBankAccount] = useState<BankAccount | null>(null);
  const [autoRechargeSettings, setAutoRechargeSettings] = useState<AutoRechargeSettings>({
    isEnabled: false,
    minThreshold: 300,
    rechargeAmount: 500,
  });
  const [transactions, setTransactions] = useState<Transaction[]>([
    {
      id: '1',
      date: new Date(2023, 6, 15),
      amount: 75,
      type: 'deduction',
      description: 'Toll Payment - NH8',
      balance: 425,
    },
    {
      id: '2',
      date: new Date(2023, 6, 10),
      amount: 500,
      type: 'recharge',
      description: 'Manual Recharge',
      balance: 500,
    },
  ]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  // Link FASTag function
  const linkFasTag = async (tagId: string, vehicleNumber: string) => {
    setIsLoading(true);
    setError(null);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // For demo purposes, we'll create a mock FASTag
      const mockFasTag: FasTag = {
        id: '1',
        tagId,
        vehicleNumber,
        balance: 425,
        isLinked: true,
      };
      setFasTag(mockFasTag);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setIsLoading(false);
    }
  };

  // Link bank account function
  const linkBankAccount = async (bankName: string, accountNumber: string, ifscCode: string) => {
    setIsLoading(true);
    setError(null);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // For demo purposes, we'll create a mock bank account
      const mockBankAccount: BankAccount = {
        id: '1',
        bankName,
        accountNumber,
        ifscCode,
        isLinked: true,
      };
      setBankAccount(mockBankAccount);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setIsLoading(false);
    }
  };

  // Update auto-recharge settings
  const updateAutoRechargeSettings = (settings: Partial<AutoRechargeSettings>) => {
    setAutoRechargeSettings(prev => ({ ...prev, ...settings }));
  };

  // Manual recharge function
  const rechargeManually = async (amount: number) => {
    setIsLoading(true);
    setError(null);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Update FASTag balance
      if (fasTag) {
        const newBalance = fasTag.balance + amount;
        setFasTag({ ...fasTag, balance: newBalance });
        
        // Add transaction
        const newTransaction: Transaction = {
          id: Date.now().toString(),
          date: new Date(),
          amount,
          type: 'recharge',
          description: 'Manual Recharge',
          balance: newBalance,
        };
        
        setTransactions(prev => [newTransaction, ...prev]);
      } else {
        throw new Error('No FASTag linked');
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setIsLoading(false);
    }
  };

  const value = {
    fasTag,
    bankAccount,
    autoRechargeSettings,
    transactions,
    linkFasTag,
    linkBankAccount,
    updateAutoRechargeSettings,
    rechargeManually,
    isLoading,
    error,
  };

  return <FasTagContext.Provider value={value}>{children}</FasTagContext.Provider>;
};