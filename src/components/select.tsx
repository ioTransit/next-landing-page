import { Combobox, Transition } from "@headlessui/react";
import clsx from "clsx";
import { Icon } from "./icon";
import { Fragment, useState } from "react";
import { useForm } from "react-hook-form";

export type SelectItem = { [k: string]: string | number; name: string };

const comboboxClassNames = {
  arrow: "h-5 w-5 text-gray-400",
  buttonContainer:
    "rounded-md capitalize w-full bg-white flex relative cursor-default select-none text-gray-700",
  button:
    "absolute inset-y-0 right-0 flex items-center justify-between pr-2 text-base",
  input:
    "w-full truncate border-none px-0 mx-2 text-base leading-5 text-gray-900 focus:ring-0 my-4",
  filteredItems: "relative cursor-default select-none px-4 py-2 text-gray-700",
  option: ({ active }: { active: boolean }) =>
    clsx(
      "capitalize text-left relative cursor-default select-none list-none py-2 pl-4 pr-2",
      active ? "bg-primary text-black bg-blue-200" : "text-gray-900"
    ),
  options:
    "absolute z-10 mt-1 max-h-60 w-full pl-0 overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black/5 focus:outline-none sm:text-sm",
};
const transitionProps = {
  as: Fragment,
  leave: "transition ease-in duration-100",
  leaveFrom: "opacity-100",
  leaveTo: "opacity-0",
};

export function Select({
  name,
  options,
  error,
  onChange,
  value,
  label
}: {
  name: string;
  options: SelectItem[];
  error?: undefined | string;
  onChange?: (e: SelectItem) => void;
  value?: SelectItem;
  label?: string;
}) {
  const { register, formState: { errors } } = useForm();

  const [selected, setSelected] = useState(
    value
      ? options.find((item) => value.name === item.name) ?? undefined
      : undefined
  );
  const [query, setQuery] = useState("");

  const filteredItem =
    query === ""
      ? options
      : options.filter((item) =>
        item.name
          .toString()
          .toLowerCase()
          .replace(/\s+/g, "")
          .includes(query.toLowerCase().replace(/\s+/g, ""))
      );

  const update = (e: SelectItem) => {
    setSelected(e);
    if (onChange) onChange(e);
  };

  return (
    <div>
      <input {...register(name)} hidden />
      <label className="pb-2">{label}</label>
      <Combobox
        value={selected}
        defaultValue={value}
        onChange={(e) => update(e)}
      >
        <div className="relative w-full">
          <div className="relative flex h-14 w-full cursor-default select-none justify-between rounded-md border bg-white text-gray-700">
            <Combobox.Button className={`${comboboxClassNames.button} w-full`}>
              <span
                className={`${comboboxClassNames.input} w-full py-2 text-left`}
              >
                {selected ? selected.name : "Select an item"}
              </span>

              <Icon
                id="ri-arrow-down-s-line"
                className={comboboxClassNames.arrow}
                aria-hidden="true"
              />
            </Combobox.Button>
          </div>
          <Transition {...transitionProps} afterLeave={() => setQuery("")}>
            <Combobox.Options className={comboboxClassNames.options}>
              {filteredItem.length === 0 && query !== "" ? (
                <div key={1234} className={comboboxClassNames.filteredItems}>
                  Nothing found.
                </div>
              ) : (
                filteredItem.map((item, i) => (
                  <Combobox.Option
                    key={i}
                    className={comboboxClassNames.option}
                    value={item}
                  >
                    {({ selected }) => (
                      <>
                        <div
                          className={clsx(
                            `block truncate text-left`,
                            selected ? "font-medium" : "font-normal"
                          )}
                        >
                          <span>{item.name}</span>
                        </div>
                      </>
                    )}
                  </Combobox.Option>
                ))
              )}
            </Combobox.Options>
          </Transition>
        </div>
      </Combobox>
      {error && <p className="text-danger break-normal px-3">{error}</p>}
    </div>
  );
}

