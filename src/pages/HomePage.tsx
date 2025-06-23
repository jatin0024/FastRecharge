import React from 'react';
import { Link } from 'react-router-dom';
import { CreditCard, ArrowRight, Shield, CreditCardIcon, BarChart, Clock, Zap } from 'lucide-react';
import { motion } from 'framer-motion';
import { useAuth } from '../contexts/AuthContext';

const HomePage: React.FC = () => {
  const { isAuthenticated } = useAuth();
  
  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-600 to-blue-800 pt-20 pb-16 md:pt-32 md:pb-24">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <motion.div 
              className="md:w-1/2 mb-10 md:mb-0"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <h1 className="text-4xl md:text-5xl font-bold text-white mb-4 leading-tight">
                Never Worry About <br /> FASTag Balance Again
              </h1>
              <p className="text-blue-100 text-lg mb-8 md:pr-10">
                Connect your FASTag with your bank account for automatic recharges. Set a minimum balance threshold and drive worry-free.
              </p>
              <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
                {isAuthenticated ? (
                  <Link
                    to="/dashboard"
                    className="bg-white text-blue-600 hover:bg-blue-50 font-medium py-3 px-6 rounded-md transition-colors inline-flex items-center"
                  >
                    Go to Dashboard <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                ) : (
                  <>
                    <Link
                      to="/register"
                      className="bg-white text-blue-600 hover:bg-blue-50 font-medium py-3 px-6 rounded-md transition-colors inline-flex items-center"
                    >
                      Get Started <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                    <Link
                      to="/login"
                      className="border border-white text-white hover:bg-white hover:bg-opacity-10 font-medium py-3 px-6 rounded-md transition-colors"
                    >
                      Login
                    </Link>
                  </>
                )}
              </div>
            </motion.div>
            
            <motion.div 
              className="md:w-1/2"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <img
                src="https://images.pexels.com/photos/5699516/pexels-photo-5699516.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
                alt="FASTag Auto Recharge"
                className="rounded-lg shadow-2xl"
              />
            </motion.div>
          </div>
        </div>
      </section>
      
      {/* Features Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Why Choose FastRecharge?</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Our platform simplifies FASTag management with smart features designed to enhance your driving experience.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="bg-blue-100 p-3 rounded-full inline-block mb-4">
                <Zap className="h-6 w-6 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Automatic Recharges</h3>
              <p className="text-gray-600">
                Set a minimum balance threshold and let our system automatically recharge your FASTag when the balance gets low.
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="bg-blue-100 p-3 rounded-full inline-block mb-4">
                <Shield className="h-6 w-6 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Secure Bank Integration</h3>
              <p className="text-gray-600">
                Our platform uses bank-grade security to ensure your financial information remains protected at all times.
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="bg-blue-100 p-3 rounded-full inline-block mb-4">
                <CreditCardIcon className="h-6 w-6 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Multiple FASTag Support</h3>
              <p className="text-gray-600">
                Manage multiple FASTag accounts from a single dashboard with individualized settings for each tag.
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="bg-blue-100 p-3 rounded-full inline-block mb-4">
                <BarChart className="h-6 w-6 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Transaction Analytics</h3>
              <p className="text-gray-600">
                Track your toll expenses with detailed transaction history and visualizations to manage your budget better.
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="bg-blue-100 p-3 rounded-full inline-block mb-4">
                <Clock className="h-6 w-6 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Real-time Notifications</h3>
              <p className="text-gray-600">
                Get instant alerts for low balances, successful recharges, and toll deductions to stay informed.
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="bg-blue-100 p-3 rounded-full inline-block mb-4">
                <CreditCard className="h-6 w-6 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Custom Recharge Settings</h3>
              <p className="text-gray-600">
                Personalize your recharge preferences with customizable thresholds and amounts based on your driving habits.
              </p>
            </div>
          </div>
        </div>
      </section>
      
      {/* How It Works Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">How It Works</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Setting up automatic recharges is simple and takes just a few minutes
            </p>
          </div>
          
          <div className="flex flex-col md:flex-row justify-between items-center md:space-x-8">
            <div className="mb-10 md:mb-0 md:w-1/2">
              <img
                src="https://images.pexels.com/photos/7516363/pexels-photo-7516363.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
                alt="How FastRecharge Works"
                className="rounded-lg shadow-lg"
              />
            </div>
            
            <div className="md:w-1/2 space-y-6">
              <div className="flex items-start">
                <div className="bg-blue-600 text-white rounded-full h-8 w-8 flex items-center justify-center font-bold mr-4 flex-shrink-0">1</div>
                <div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">Create Your Account</h3>
                  <p className="text-gray-600">
                    Sign up with your email, phone number, and create a secure password to get started.
                  </p>
                </div>
              </div>
              
              <div className="flex items-start">
                <div className="bg-blue-600 text-white rounded-full h-8 w-8 flex items-center justify-center font-bold mr-4 flex-shrink-0">2</div>
                <div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">Link Your FASTag</h3>
                  <p className="text-gray-600">
                    Add your FASTag details and verify your account to connect it to our platform.
                  </p>
                </div>
              </div>
              
              <div className="flex items-start">
                <div className="bg-blue-600 text-white rounded-full h-8 w-8 flex items-center justify-center font-bold mr-4 flex-shrink-0">3</div>
                <div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">Connect Bank Account</h3>
                  <p className="text-gray-600">
                    Securely link your bank account to enable automatic recharges when needed.
                  </p>
                </div>
              </div>
              
              <div className="flex items-start">
                <div className="bg-blue-600 text-white rounded-full h-8 w-8 flex items-center justify-center font-bold mr-4 flex-shrink-0">4</div>
                <div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">Set Your Preferences</h3>
                  <p className="text-gray-600">
                    Configure your minimum balance threshold and recharge amount according to your needs.
                  </p>
                </div>
              </div>
              
              <div className="mt-8">
                <Link
                  to="/register"
                  className="bg-blue-600 text-white hover:bg-blue-700 font-medium py-3 px-6 rounded-md transition-colors inline-flex items-center"
                >
                  Get Started Now <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="bg-blue-600 py-16">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">Ready to Simplify Your FASTag Experience?</h2>
          <p className="text-blue-100 max-w-2xl mx-auto mb-8">
            Join thousands of users who enjoy hassle-free highway travel with automatic FASTag recharges.
          </p>
          <div className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-4">
            <Link
              to="/register"
              className="bg-white text-blue-600 hover:bg-blue-50 font-medium py-3 px-6 rounded-md transition-colors inline-flex items-center justify-center"
            >
              Create Account <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
            <Link
              to="/about"
              className="border border-white text-white hover:bg-white hover:bg-opacity-10 font-medium py-3 px-6 rounded-md transition-colors"
            >
              Learn More
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;