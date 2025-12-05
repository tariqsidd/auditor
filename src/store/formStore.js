import { create } from 'zustand';
import { persist } from 'zustand/middleware';

const useFormStore = create(
  persist(
    (set, get) => ({
      responses: [],
      currentResponse: null,

      createResponse: (templateId) => {
        const newResponse = {
          id: crypto.randomUUID(),
          templateId,
          answers: {},
          status: 'in_progress',
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
          completedAt: null,
          score: null,
        };
        set((state) => ({
          responses: [...state.responses, newResponse],
          currentResponse: newResponse,
        }));
        return newResponse;
      },

      updateResponse: (id, updates) => {
        set((state) => ({
          responses: state.responses.map((r) =>
            r.id === id
              ? {
                  ...r,
                  ...updates,
                  updatedAt: new Date().toISOString(),
                }
              : r
          ),
        }));
      },

      setAnswer: (responseId, questionId, answer) => {
        set((state) => ({
          responses: state.responses.map((r) =>
            r.id === responseId
              ? {
                  ...r,
                  answers: {
                    ...r.answers,
                    [questionId]: answer,
                  },
                  updatedAt: new Date().toISOString(),
                }
              : r
          ),
        }));
      },

      completeResponse: (id, score) => {
        set((state) => ({
          responses: state.responses.map((r) =>
            r.id === id
              ? {
                  ...r,
                  status: 'completed',
                  completedAt: new Date().toISOString(),
                  score,
                }
              : r
          ),
        }));
      },

      deleteResponse: (id) => {
        set((state) => ({
          responses: state.responses.filter((r) => r.id !== id),
        }));
      },

      getResponseById: (id) => {
        return get().responses.find((r) => r.id === id);
      },

      getResponsesByTemplate: (templateId) => {
        return get().responses.filter((r) => r.templateId === templateId);
      },
    }),
    {
      name: 'form-storage',
    }
  )
);

export default useFormStore;
