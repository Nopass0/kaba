import React, { useState } from 'react';

// 1. Extend the Option Type to include suboptions
type Option = {
    value: string;
    label: string;
    subOptions?: Option[];
};

type TreeSelectCustomProps = {
    options: Option[];
    onChange: (selectedValues: string[]) => void;
};

const TreeSelectCustom: React.FC<TreeSelectCustomProps> = ({ options, onChange }) => {
    // State to keep track of selected options
    const [selectedValues, setSelectedValues] = useState<string[]>(['', '', '']);

    // State to keep track of checked options (for checkboxes)
    const [checkedValues, setCheckedValues] = useState<{ [key: string]: boolean }>({});

    const handleSelectChange = (value: string, index: number) => {
        const updatedValues = [...selectedValues];
        updatedValues[index] = value;
        setSelectedValues(updatedValues);
        onChange(updatedValues);
    };

    const handleCheckboxChange = (option: Option, isChecked: boolean) => {
        // Update the checked state
        setCheckedValues({
            ...checkedValues,
            [option.value]: isChecked,
        });

        // Propagate changes to suboptions if any
        if (option.subOptions) {
            option.subOptions.forEach((subOption) => {
                handleCheckboxChange(subOption, isChecked);
            });
        }
    };

    const renderOptions = (options: Option[], depth: number = 0) => (
        <ul style={{ paddingLeft: depth * 20 }}>
            {options.map((option) => (
                <li key={option.value}>
                    <label>
                        <input
                            type="checkbox"
                            checked={checkedValues[option.value] || false}
                            onChange={(e) => handleCheckboxChange(option, e.target.checked)}
                            // Indeterminate state for half-checked
                            ref={(el) => {
                                if (el) el.indeterminate = checkedValues[option.value] === undefined;
                            }}
                        />
                        {option.label}
                    </label>
                    {option.subOptions && renderOptions(option.subOptions, depth + 1)}
                </li>
            ))}
        </ul>
    );

    return (
        <div>
            {Array.from({ length: 3 }).map((_, index) => (
                <select
                    key={index}
                    value={selectedValues[index]}
                    onChange={(e) => handleSelectChange(e.target.value, index)}
                >
                    <option value="">Select an option</option>
                    {options.map((option) => (
                        <option key={option.value} value={option.value}>
                            {option.label}
                        </option>
                    ))}
                </select>
            ))}
            {renderOptions(options)}
        </div>
    );
};

export default TreeSelectCustom;
