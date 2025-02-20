import React, { useState } from "react";

const SearchableDropdown = ({ options, onChange, placeholder = "Select an option" }) => {
    const [searchTerm, setSearchTerm] = useState("");
    const [isOpen, setIsOpen] = useState(false);
    const [selected, setSelected] = useState(null);

    // Filter options based on the search term
    const filteredOptions = options.filter((option) =>
        option.label.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const handleSelect = (option) => {
        setSelected(option);
        setSearchTerm("");
        setIsOpen(false);
        if (onChange) {
            onChange(option.value); // Pass the value to the parent
        }
    };

    return (
        <div className="relative w-full mt-1">
            {/* Dropdown Trigger */}
            <div
                className="w-full p-2 border rounded cursor-pointer bg-white"
                onClick={() => setIsOpen((prev) => !prev)}
            >
                {selected ? (
                    <span>{selected.label}</span>
                ) : (
                    <span className="text-gray-700">{placeholder}</span>
                )}
            </div>

            {/* Dropdown Content */}
            {isOpen && (
                <div className="absolute z-10 w-full mt-2 bg-white border rounded shadow-lg">
                    {/* Search Input */}
                    <div className="p-2">
                        <input
                            type="text"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            placeholder="Search..."
                            className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
                        />
                    </div>

                    {/* Options */}
                    <ul className="max-h-48 overflow-y-auto">
                        {filteredOptions.length > 0 ? (
                            filteredOptions.map((option) => (
                                <li
                                    key={option.value}
                                    onClick={() => handleSelect(option)}
                                    className="p-2 hover:bg-gray-100 cursor-pointer"
                                >
                                    {option.label}
                                </li>
                            ))
                        ) : (
                            <li className="p-2 text-gray-500">No results found</li>
                        )}
                    </ul>
                </div>
            )}
        </div>
    );
};

export default SearchableDropdown;
