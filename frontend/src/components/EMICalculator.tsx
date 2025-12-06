import { useState } from 'react';
import { motion } from 'framer-motion';
import { PrimaryButton } from './PrimaryButton';

const EMICalculator = () => {
  const [principal, setPrincipal] = useState(1000000);
  const [interestRate, setInterestRate] = useState(8.5);
  const [tenure, setTenure] = useState(20);
  const [inflation, setInflation] = useState(6);
  const [showResults, setShowResults] = useState(false);

  const calculateEMI = () => {
    const monthlyRate = interestRate / 12 / 100;
    const months = tenure * 12;
    const emi = (principal * monthlyRate * Math.pow(1 + monthlyRate, months)) / (Math.pow(1 + monthlyRate, months) - 1);
    return emi.toFixed(2);
  };

  const calculateFutureValue = () => {
    const years = tenure;
    const futureValue = principal * Math.pow(1 + (interestRate - inflation) / 100, years);
    return futureValue.toFixed(2);
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0,
    }).format(amount);
  };

  return (
    <div className="glass p-8 max-w-4xl mx-auto">
      <h2 className="text-3xl font-bold mb-6 text-center">EMI & Investment Calculator</h2>
      <p className="text-center text-gray-600 mb-8">Calculate your monthly payments and investment returns with our easy-to-use calculator</p>
      
      <div className="grid md:grid-cols-2 gap-6">
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Loan Amount (₹)</label>
            <input
              type="range"
              min="100000"
              max="50000000"
              step="100000"
              value={principal}
              onChange={(e) => setPrincipal(Number(e.target.value))}
              className="w-full h-1.5 bg-gray-200 rounded-full appearance-none cursor-pointer accent-blue-600"
            />
            <div className="flex justify-between text-xs text-gray-500">
              <span>1L</span>
              <span>50L</span>
              <span>1Cr</span>
              <span>5Cr</span>
            </div>
            <input
              type="number"
              value={principal}
              onChange={(e) => setPrincipal(Number(e.target.value))}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Interest Rate (% p.a.)</label>
            <input
              type="range"
              min="1"
              max="20"
              step="0.1"
              value={interestRate}
              onChange={(e) => setInterestRate(Number(e.target.value))}
              className="w-full h-1.5 bg-gray-200 rounded-full appearance-none cursor-pointer accent-blue-600"
            />
            <input
              type="number"
              value={interestRate}
              onChange={(e) => setInterestRate(Number(e.target.value))}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Loan Tenure (Years)</label>
            <input
              type="range"
              min="1"
              max="30"
              value={tenure}
              onChange={(e) => setTenure(Number(e.target.value))}
              className="w-full h-1.5 bg-gray-200 rounded-full appearance-none cursor-pointer accent-blue-600"
            />
            <div className="flex justify-between text-xs text-gray-500">
              <span>1Y</span>
              <span>5Y</span>
              <span>10Y</span>
              <span>20Y</span>
              <span>30Y</span>
            </div>
            <input
              type="number"
              value={tenure}
              onChange={(e) => setTenure(Number(e.target.value))}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Expected Inflation Rate (% p.a.)</label>
            <input
              type="range"
              min="0"
              max="15"
              step="0.1"
              value={inflation}
              onChange={(e) => setInflation(Number(e.target.value))}
              className="w-full h-1.5 bg-gray-200 rounded-full appearance-none cursor-pointer accent-blue-600"
            />
            <input
              type="number"
              value={inflation}
              onChange={(e) => setInflation(Number(e.target.value))}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            />
          </div>

          <div className="mt-8 text-center">
            <PrimaryButton 
              onClick={() => setShowResults(true)}
              className="px-8 py-3 text-lg"
            >
              Calculate Now
            </PrimaryButton>
          </div>
        </div>

        {showResults && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="glass p-8 mt-8"
          >
            <h3 className="text-2xl font-bold mb-6 text-center">Your Results</h3>
            
            <div className="space-y-4">
              <div className="flex justify-between items-center py-3 border-b border-gray-100">
                <span className="text-gray-700">Monthly EMI:</span>
                <span className="font-bold text-lg">₹{calculateEMI()}</span>
              </div>
              <div className="flex justify-between items-center py-3 border-b border-gray-100">
                <span className="text-gray-700">Total Payment:</span>
                <span className="font-bold">
                  {formatCurrency(Number(calculateEMI()) * tenure * 12)}
                </span>
              </div>
              <div className="flex justify-between items-center py-3 border-b border-gray-100">
                <span className="text-gray-700">Total Interest:</span>
                <span className="font-bold">
                  {formatCurrency(Number(calculateEMI()) * tenure * 12 - principal)}
                </span>
              </div>
              <div className="pt-4 mt-4 border-t border-gray-100">
                <div className="flex justify-between items-center py-2">
                  <span className="text-gray-700">Future Value (Adjusted for Inflation):</span>
                  <span className="font-bold text-green-600 text-lg">
                    {formatCurrency(Number(calculateFutureValue()))}
                  </span>
                </div>
                <p className="text-sm text-gray-500 mt-1 text-right">
                  Projected value in {tenure} years
                </p>
              </div>
            </div>

            <div className="mt-8 pt-6 border-t border-gray-100">
              <h4 className="text-lg font-semibold mb-4 text-center">Loan Summary</h4>
              <div className="grid grid-cols-3 gap-4">
                <div className="bg-blue-50 p-4 rounded-xl text-center">
                  <div className="text-blue-600 font-bold text-2xl">{tenure}</div>
                  <div className="text-xs uppercase tracking-wider text-gray-500 mt-1">Years</div>
                </div>
                <div className="bg-green-50 p-4 rounded-xl text-center">
                  <div className="text-green-600 font-bold text-2xl">{interestRate}%</div>
                  <div className="text-xs uppercase tracking-wider text-gray-500 mt-1">Interest</div>
                </div>
                <div className="bg-purple-50 p-4 rounded-xl text-center">
                  <div className="text-purple-600 font-bold text-2xl">{inflation}%</div>
                  <div className="text-xs uppercase tracking-wider text-gray-500 mt-1">Inflation</div>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </div>

      {!showResults && (
        <div className="mt-8 p-4 bg-blue-50/50 rounded-xl border border-blue-100">
          <p className="text-sm text-blue-700 text-center">
            <span className="font-medium">Tip:</span> Adjust the sliders to see how different loan amounts, interest rates, and tenures affect your EMI and investment returns.
          </p>
        </div>
      )}
    </div>
  );
};

export default EMICalculator;
