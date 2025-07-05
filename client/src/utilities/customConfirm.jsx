// Este archivo fue renombrado de customConfirm.js a customConfirm.jsx para soportar JSX correctamente en Vite.
import { Dialog } from "@headlessui/react";
import { Fragment, useState } from "react";

export function useCustomConfirm() {
  const [isOpen, setIsOpen] = useState(false);
  const [onConfirm, setOnConfirm] = useState(() => () => {});
  const [message, setMessage] = useState("");
  const [title, setTitle] = useState("");

  function show({ title, message, onConfirm }) {
    setTitle(title);
    setMessage(message);
    setOnConfirm(() => onConfirm);
    setIsOpen(true);
  }

  function ConfirmModal() {
    return (
      <Dialog open={isOpen} onClose={() => setIsOpen(false)} as={Fragment}>
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40">
          <Dialog.Panel className="bg-white dark:bg-gray-800 rounded-xl p-8 max-w-md w-full shadow-xl border dark:border-gray-700">
            <Dialog.Title className="text-xl font-bold mb-2 text-center text-red-600 dark:text-red-400">
              {title}
            </Dialog.Title>
            <Dialog.Description className="mb-6 text-center text-gray-700 dark:text-gray-300">
              {message}
            </Dialog.Description>
            <div className="flex gap-4 justify-center">
              <button
                className="px-4 py-2 rounded-lg bg-red-600 hover:bg-red-700 text-white font-semibold shadow"
                onClick={() => {
                  setIsOpen(false);
                  onConfirm();
                }}
              >
                Sí, eliminar
              </button>
              <button
                className="px-4 py-2 rounded-lg bg-gray-200 hover:bg-gray-300 text-gray-700 font-semibold dark:bg-gray-700 dark:text-gray-200 dark:hover:bg-gray-600"
                onClick={() => setIsOpen(false)}
              >
                Cancelar
              </button>
            </div>
          </Dialog.Panel>
        </div>
      </Dialog>
    );
  }

  return { show, ConfirmModal };
}
