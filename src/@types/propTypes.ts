import type { NavigateFunction } from "react-router";

export interface NoteData {
  id: number;
  title: string;
  description: string;
}

export type HeaderProp = {
  navigate: NavigateFunction;
};

export type NotesProp = {
  navigate: NavigateFunction;
  isLoading: boolean;
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>;
  isRefresh: number;
  setIsRefresh: React.Dispatch<React.SetStateAction<number>>;
  showDelete: boolean;
  handleDelete: () => Promise<void>;
};

export type HomeProp = {
  toggleCreateModal: () => void;
  toggleEditModal: () => void;
  toggleDeleteModal: () => void;
};

export type NoteCardProp = {
  notedata: NoteData;
  navigate: NavigateFunction;
  setIsRefresh: React.Dispatch<React.SetStateAction<number>>;
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>;
};

export type FormModalProp = {
  formTitle: string;
  buttonLabel: string;
  navigate: NavigateFunction;
  id: string | null;
  functionLogic: (title: string, description: string) => Promise<void>;
};

export type DeleteNoteProp = {
  navigate: NavigateFunction;
  handleDelete: () => Promise<void>;
};
