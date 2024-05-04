import React from 'react';
import { CheckCircleIcon, XCircleIcon } from '@heroicons/react/24/solid';

export default function TablaMembresias() {
  const xIcon = <XCircleIcon className="h-10 w-10 text-red-400" aria-hidden="true" />;
  const vIcon = <CheckCircleIcon className="h-10 w-10 text-green-400" aria-hidden="true" />;

  return (
    <div className="bg-gray-200 bg-opacity-30 p-4 rounded-lg">
      <table className="w-full border-hidden border-gray-300">
        <thead className="bg-gray-100">
          <tr>
            <th className="border border-gray-300 px-4 py-2">Plan</th>
            <th className="border border-gray-300 px-4 py-2">GYM</th>
            <th className="border border-gray-300 px-4 py-2">Personalizado</th>
            <th className="border border-gray-300 px-4 py-2">Crossfit</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td className="border border-gray-300 px-4 py-2">CARACTERISTICA 1:*********</td>
            <td className="border border-gray-300 px-4 py-2 text-center">{vIcon}</td>
            <td className="border border-gray-300 px-4 py-2 text-center">{vIcon}</td>
            <td className="border border-gray-300 px-4 py-2 text-center">{vIcon}</td>
          </tr>
          <tr>
            <td className="border border-gray-300 px-4 py-2">CARACTERISTICA 2:*********</td>
            <td className="border border-gray-300 px-4 py-2 text-center">{vIcon}</td>
            <td className="border border-gray-300 px-4 py-2 text-center">{vIcon}</td>
            <td className="border border-gray-300 px-4 py-2 text-center">{vIcon}</td>
          </tr>
          <tr>
            <td className="border border-gray-300 px-4 py-2">CARACTERISTICA 3:*********</td>
            <td className="border border-gray-300 px-4 py-2 text-center">{xIcon}</td>
            <td className="border border-gray-300 px-4 py-2 text-center">{vIcon}</td>
            <td className="border border-gray-300 px-4 py-2 text-center">{vIcon}</td>
          </tr>
          <tr>
            <td className="border border-gray-300 px-4 py-2">CARACTERISTICA 4:*********</td>
            <td className="border border-gray-300 px-4 py-2 text-center">{xIcon}</td>
            <td className="border border-gray-300 px-4 py-2 text-center">{vIcon}</td>
            <td className="border border-gray-300 px-4 py-2 text-center">{xIcon}</td>
          </tr>
          <tr>
            <td className="border border-gray-300 px-4 py-2 text-center">CARACTERISTICA 5:*********</td>
            <td className="border border-gray-300 px-4 py-2 text-center">{xIcon}</td>
            <td className="border border-gray-300 px-4 py-2 text-center">{vIcon}</td>
            <td className="border border-gray-300 px-4 py-2 text-center">{xIcon}</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}
