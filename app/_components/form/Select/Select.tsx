import { Fragment } from "react";
import { Listbox, Transition } from "@headlessui/react";
import { CheckIcon, ChevronUpDownIcon } from "@heroicons/react/20/solid";
import clsx from "clsx";

export type Option<T = string> = { value: T; label: string };

interface Props<T = string> {
  label: string;
  value: Option<T>;
  onChange: (option: Option<T>) => void;
  options: Option<T>[];
  disabled?: boolean;
}

export function Select<T>({
  value,
  onChange,
  options,
  label,
  disabled,
}: Props<T>) {
  return (
    <div>
      <label className="text-sm font-semibold text-zinc-800">{label}</label>
      <Listbox value={value} onChange={onChange}>
        <div
          className={clsx(
            "relative mt-1",
            disabled && "opacity-40 pointer-events-none"
          )}
        >
          <Listbox.Button className="relative w-full cursor-default border border-zinc-900 rounded-lg bg-white py-2 pl-3 pr-10 text-left focus:outline-none focus-visible:border-zinc-500 focus-visible:ring-2 focus-visible:ring-white/75 focus-visible:ring-offset-2 focus-visible:ring-offset-zinc-300 sm:text-sm">
            <span className="block truncate font-medium text-zinc-900">
              {value.label}
            </span>
            <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
              <ChevronUpDownIcon
                className="h-5 w-5 text-zinc-900"
                aria-hidden="true"
              />
            </span>
          </Listbox.Button>
          <Transition
            as={Fragment}
            leave="transition ease-in duration-100"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Listbox.Options className="absolute mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black/5 focus:outline-none sm:text-sm z-10 border border-zinc-50">
              {options.map((option) => (
                <Listbox.Option
                  key={String(option.value)}
                  className={({ active }) =>
                    `relative cursor-default select-none py-2 pl-10 pr-4 ${
                      active ? "bg-zinc-50 text-zinc-900" : "text-zinc-700"
                    }`
                  }
                  value={option}
                >
                  {({ selected }) => (
                    <>
                      <span
                        className={`block truncate text-zinc-900 ${
                          selected ? "font-medium" : "font-normal"
                        }`}
                      >
                        {option.label}
                      </span>
                      {selected ? (
                        <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-zinc-900">
                          <CheckIcon className="h-5 w-5" aria-hidden="true" />
                        </span>
                      ) : null}
                    </>
                  )}
                </Listbox.Option>
              ))}
            </Listbox.Options>
          </Transition>
        </div>
      </Listbox>
    </div>
  );
}
