'use client';
import { useState } from 'react';

interface ConfirmPageProps {
  bank: string;
  branch: string;
  accountName: string;
  accountNumber: string;
  fileName: string;
  onBack: () => void;
}

export default function ConfirmPage({ bank, branch, accountName, accountNumber, fileName, onBack }: ConfirmPageProps) {
  const [status, setStatus] = useState<string | null>(null);

  const handleSaveDraft = () => setStatus('Draft');
  const handleSubmit = () => setStatus('Submitted');

  return (
    <div className="bg-white rounded shadow p-8">
      {/* Title with green lines */}
      <div className="flex items-center justify-center mb-6">
        <div className="flex-1 h-0.5 bg-green-400" />
        <h3 className="text-lg font-bold mx-4 text-green-700 text-center whitespace-nowrap">Fund Withdraw Option</h3>
        <div className="flex-1 h-0.5 bg-green-400" />
      </div>
      {/* Confirmation grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
        <div className="col-span-1 lg:col-span-1">
          <label className="block mb-1 font-medium">Bank</label>
          <div className="border rounded px-3 py-2 bg-gray-50">{bank}</div>
        </div>
        <div className="col-span-1 lg:col-span-1">
          <label className="block mb-1 font-medium">Select Branch</label>
          <div className="border rounded px-3 py-2 bg-gray-50">{branch}</div>
        </div>
        <div className="col-span-1 lg:col-span-1">
          <label className="block mb-1 font-medium">Account Name</label>
          <div className="border rounded px-3 py-2 bg-gray-50">{accountName}</div>
        </div>
        <div className="col-span-1 lg:col-span-1">
          <label className="block mb-1 font-medium">Account Number</label>
          <div className="border rounded px-3 py-2 bg-gray-50">{accountNumber}</div>
        </div>
        <div className="col-span-1 lg:col-span-1">
          <label className="block mb-1 font-medium">Proof of Bank Account</label>
          <div className="border rounded px-3 py-2 bg-gray-50 text-green-600 underline cursor-pointer">{fileName ? fileName : 'No file uploaded'}</div>
        </div>
      </div>
      <div className="flex justify-end gap-4 mt-8">
        <button type="button" onClick={onBack} className="bg-gray-200 text-gray-700 px-6 py-2 rounded font-semibold">Back</button>
        <button type="button" onClick={handleSaveDraft} className="bg-green-300 text-green-800 px-6 py-2 rounded font-semibold">Save as Draft</button>
        <button type="button" onClick={handleSubmit} className="bg-green-600 text-white px-6 py-2 rounded font-semibold hover:bg-green-700">Submit</button>
      </div>
      {status && (
        <div className="mt-6 text-center text-lg font-bold text-green-700">
          Application {status === 'Draft' ? 'saved as draft.' : 'submitted successfully!'}
        </div>
      )}
    </div>
  );
} 