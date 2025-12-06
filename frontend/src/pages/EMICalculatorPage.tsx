import { motion } from 'framer-motion';
import EMICalculator from '../components/EMICalculator';

export default function EMICalculatorPage() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="min-h-screen bg-gradient-to-b from-blue-50 to-white py-16 px-4 sm:px-6 lg:px-8"
    >
      <div className="max-w-7xl mx-auto space-y-12">
        {/* Hero Section */}
        <div className="text-center max-w-4xl mx-auto">
          <motion.h1 
            className="text-4xl md:text-5xl font-bold text-gray-900 mb-6"
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            Smart EMI & Investment <span className="text-blue-600">Calculator</span>
          </motion.h1>
          <p className="text-xl text-gray-600 leading-relaxed">
            Plan your finances better with our comprehensive calculator. Get instant insights into your loan EMIs 
            and investment growth potential, all in one place.
          </p>
        </div>

        {/* Main Calculator Card */}
        <motion.div 
          className="bg-white rounded-2xl shadow-2xl overflow-hidden border border-gray-100 max-w-5xl mx-auto"
          initial={{ scale: 0.95, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.5 }}
        >
          <div className="p-2 bg-gradient-to-r from-blue-600 to-blue-400"></div>
          <div className="p-8">
            <EMICalculator />
          </div>
        </motion.div>

        {/* Features Grid */}
        <div className="grid gap-8 md:grid-cols-3 max-w-6xl mx-auto pt-8">
          {[
            {
              icon: (
                <svg className="h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
              ),
              title: "Smart Calculations",
              description: "Get accurate EMI breakdowns with principal and interest components clearly displayed."
            },
            {
              icon: (
                <svg className="h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                </svg>
              ),
              title: "Inflation Adjusted",
              description: "See the real value of your investment by accounting for expected inflation rates."
            },
            {
              icon: (
                <svg className="h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
              ),
              title: "Visual Insights",
              description: "Understand your loan and investment through clear, easy-to-interpret results."
            }
          ].map((feature, index) => (
            <motion.div 
              key={index}
              className="bg-white p-8 rounded-xl shadow-lg border border-gray-100 hover:shadow-xl transition-shadow"
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.3 + (index * 0.1), duration: 0.5 }}
            >
              <div className="text-blue-600 mb-4">
                {feature.icon}
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">{feature.title}</h3>
              <p className="text-gray-600 leading-relaxed">{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.div>
  );
}