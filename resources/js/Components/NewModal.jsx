import React from "react";

export default function NewModal({ isOpen, onClose, message, type }) {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
            <div className="bg-white rounded-lg shadow-lg p-6 w-96">
                <h2
                    className={`text-lg font-bold ${
                        type === "success" ? "text-green-600" : "text-red-600"
                    }`}
                >
                    {type === "success" ? "Success" : "Error"}
                </h2>
                <p className="mt-2 text-gray-700">{message}</p>
                <div className="mt-4 text-right">
                    <button
                        onClick={onClose}
                        className="inline-flex items-center rounded-md border border-blue-500 bg-transparent px-4 py-2 text-xs font-semibold uppercase tracking-widest text-blue-500 transition duration-150 ease-in-out hover:bg-blue-500 hover:text-white focus:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 active:bg-gray-900"
                    >
                        Close
                    </button>
                </div>
            </div>
        </div>
    );
}
