import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { FormSubmission } from '@/types/form.types';

interface DataStore {
  submissions: FormSubmission[];
  drafts: FormSubmission[];

  // Actions
  saveSubmission: (submission: FormSubmission) => void;
  saveDraft: (draft: FormSubmission) => void;
  updateSubmission: (id: string, data: Record<string, any>) => void;
  deleteSubmission: (id: string) => void;
  getSubmissionById: (id: string) => FormSubmission | undefined;
  getSubmissionsByFormId: (formId: string) => FormSubmission[];
}

export const useDataStore = create<DataStore>()(
  persist(
    (set, get) => ({
      submissions: [],
      drafts: [],

      saveSubmission: (submission) =>
        set((state) => ({
          submissions: [...state.submissions.filter(s => s.id !== submission.id), { ...submission, status: 'submitted' }],
          drafts: state.drafts.filter((d) => d.id !== submission.id),
        })),

      saveDraft: (draft) =>
        set((state) => {
          const existingIndex = state.drafts.findIndex((d) => d.id === draft.id);
          if (existingIndex >= 0) {
            const newDrafts = [...state.drafts];
            newDrafts[existingIndex] = { ...draft, status: 'draft' };
            return { drafts: newDrafts };
          }
          return { drafts: [...state.drafts, { ...draft, status: 'draft' }] };
        }),

      updateSubmission: (id, data) =>
        set((state) => ({
          submissions: state.submissions.map((sub) =>
            sub.id === id ? { ...sub, data, submittedAt: new Date().toISOString() } : sub
          ),
          drafts: state.drafts.map((draft) =>
            draft.id === id ? { ...draft, data, submittedAt: new Date().toISOString() } : draft
          ),
        })),

      deleteSubmission: (id) =>
        set((state) => ({
          submissions: state.submissions.filter((sub) => sub.id !== id),
          drafts: state.drafts.filter((draft) => draft.id !== id),
        })),

      getSubmissionById: (id) => {
        const state = get();
        return state.submissions.find((sub) => sub.id === id) || 
               state.drafts.find((draft) => draft.id === id);
      },

      getSubmissionsByFormId: (formId) => {
        const state = get();
        return [...state.submissions, ...state.drafts].filter((sub) => sub.formId === formId);
      },
    }),
    {
      name: 'data-storage',
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