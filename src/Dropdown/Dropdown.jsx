import { useEffect, useRef } from "react";
import SlimSelect from "slim-select";
import "slim-select/styles";
import "./Dropdown.css";

export const Dropdown = ({
  options = [],
  value,
  onChange,
  placeholder = "choose",
}) => {
  const selectRef = useRef(null);
  const slimRef = useRef(null);
  const onChangeRef = useRef(onChange);

  useEffect(() => {
    onChangeRef.current = onChange;
  }, [onChange]);

  useEffect(() => {
    if (!selectRef.current) return;

    const data = options.map((item) => ({
      text: item.label,
      value: item.value,
    }));

    slimRef.current = new SlimSelect({
      select: selectRef.current,
      data: [
        { text: placeholder, value: "", placeholder: true },
        ...data,
      ],
      settings: {
        showSearch: false,
        placeholderText: placeholder,
      },
      events: {
        afterChange: (selected) => {
          const next = selected?.[0]?.value ?? "";
          onChangeRef.current?.(next);
        },
      },
    });

    if (value) {
      slimRef.current.setSelected(value, false);
    }

    return () => {
      slimRef.current?.destroy();
      slimRef.current = null;
    };
  }, [options, placeholder]);

  useEffect(() => {
    if (!slimRef.current || value == null) return;
    slimRef.current.setSelected(String(value), false);
  }, [value]);

  return (
    <div className="dropdown">
      <select ref={selectRef}></select>
    </div>
  );
};