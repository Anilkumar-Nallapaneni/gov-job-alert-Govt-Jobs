import { useEffect } from 'react';

export function useDocumentTitle(title: string) {
  useEffect(() => {
    const originalTitle = document.title;
    document.title = `${title} - Gov Job Alert`;

    return () => {
      document.title = originalTitle;
    };
  }, [title]);
}

export function useScrollToTop() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
}