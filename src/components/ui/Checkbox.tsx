import React from 'react';

interface CheckboxProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'type' | 'onChange'> {
  onCheckedChange: () => void;
}

export const Checkbox: React.FC<CheckboxProps> = ({ onCheckedChange, ...props }) => {
  return <input type="checkbox" onChange={onCheckedChange} {...props} />;
};
