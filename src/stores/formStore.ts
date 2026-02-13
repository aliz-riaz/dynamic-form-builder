import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { FormSchema } from '@/types/form.types';

interface FormStore {
  forms: FormSchema[];
  activeFormId: string | null;
  
  // Actions
  addForm: (form: FormSchema) => void;
  updateForm: (id: string, form: FormSchema) => void;
  deleteForm: (id: string) => void;
  setActiveForm: (id: string | null) => void;
  getFormById: (id: string) => FormSchema | undefined;
}

export const useFormStore = create<FormStore>()(
  persist(
    (set, get) => ({
      forms: [],
      activeFormId: null,

      addForm: (form) =>
        set((state) => ({
          forms: [...state.forms, form],
        })),

      updateForm: (id, updatedForm) =>
        set((state) => ({
          forms: state.forms.map((form) =>
            form.id === id ? updatedForm : form
          ),
        })),

      deleteForm: (id) =>
        set((state) => ({
          forms: state.forms.filter((form) => form.id !== id),
          activeFormId: state.activeFormId === id ? null : state.activeFormId,
        })),

      setActiveForm: (id) =>
        set({ activeFormId: id }),

      getFormById: (id) => {
        return get().forms.find((form) => form.id === id);
      },
    }),
    {
      name: 'form-storage',
      storage: createJSONStorage(() => {
        if (typeof window !== 'undefined') {
          return localStorage;
        }
        return {
          getItem: () => null,
          setItem: () => {},
          removeItem: () => {},
        };
      }),
    }
  )
);