import {
  createContext,
  type PropsWithChildren,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import * as v from "valibot";

import { useProtectedUser } from "@/modules/auth/user-context";

const getBookmarksStorageKey = (userId: string) => {
  return `bookmarks-${userId}`;
};

type BookmarksHistoryContextValue = {
  ids: string[];
  addToHistory: (id: string) => void;
};

const BookmarksHistoryContext =
  createContext<BookmarksHistoryContextValue | null>(null);

const getHistoryFromStorage = (userId: string) => {
  if (typeof window === "undefined") {
    return [];
  }

  const key = getBookmarksStorageKey(userId);
  const value = window.localStorage.getItem(key);

  const parsed = v.safeParse(
    v.pipe(v.string(), v.parseJson(), v.array(v.string())),
    value,
  );

  return parsed.success ? parsed.output : [];
};

const BookmarksHistoryProviderInner = ({ children }: PropsWithChildren) => {
  const user = useProtectedUser();
  const [ids, setIds] = useState(() => getHistoryFromStorage(user.id));

  const addToHistory = useCallback((id: string) => {
    setIds((state) => {
      const newState = [...state];
      const index = newState.indexOf(id);

      if (index !== -1) {
        newState.splice(index, 1);
      }

      newState.push(id);

      if (newState.length > 20) {
        newState.splice(0, 1);
      }

      return newState;
    });
  }, []);

  const value = useMemo(() => ({ addToHistory, ids }), [ids, addToHistory]);

  return (
    <BookmarksHistoryContext.Provider value={value}>
      {children}
    </BookmarksHistoryContext.Provider>
  );
};

export const BookmarksHistoryProvider = ({ children }: PropsWithChildren) => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  return (
    <BookmarksHistoryProviderInner key={String(isMounted)}>
      {children}
    </BookmarksHistoryProviderInner>
  );
};

export const useBookmarksHistory = () => {
  const context = useContext(BookmarksHistoryContext);

  if (!context) {
    throw new Error("BookmarksHistoryContext is not defined");
  }

  return context;
};
