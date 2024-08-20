import React, { useEffect, useState } from "react";
import request from "../../server/request";

interface FormSelectProps {
  id: string;
  value: string | number;
  options?: Array<{ value: string | number; label: string }>;
  fetchOptionsUrl?: string;
  onChange: (event: React.ChangeEvent<HTMLSelectElement>) => void;
  disabled?: boolean;
  required?: boolean;
  selectClass?: string;
  defaultValue?: string;
}

const FormSelect: React.FC<FormSelectProps> = ({
  value,
  id,
  options = [],
  fetchOptionsUrl,
  onChange,
  disabled = false,
  required = false,
  selectClass = "",
  defaultValue = "",
}) => {
  const [selectOptions, setSelectOptions] = useState(options);
  const [loading, setLoading] = useState(!!fetchOptionsUrl);

  useEffect(() => {
    if (fetchOptionsUrl) {
      const fetchData = async () => {
        setLoading(true);
        try {
          const response = await request.get(fetchOptionsUrl);
          const transformedOptions = response.data.map(
            (item: { id: number; name: string }) => ({
              value: item.id,
              label: item.name,
            })
          );
          setSelectOptions(transformedOptions);
        } catch (error) {
          console.error("Error fetching select options:", error);
        } finally {
          setLoading(false);
        }
      };

      fetchData();
    }
  }, [fetchOptionsUrl]);

  return (
    <select
      id={id}
      value={value}
      onChange={onChange}
      disabled={disabled || loading}
      required={required}
      className={selectClass}
    >
      {defaultValue ? (
        <option value="default" className="font-normal">
          Barchasi
        </option>
      ) : null}
      {selectOptions.map((option) => (
        <option key={option.value} value={option.value} className="font-normal">
          {option.label}
        </option>
      ))}
    </select>
  );
};

export default FormSelect;
