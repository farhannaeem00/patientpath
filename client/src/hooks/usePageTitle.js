import { useEffect } from 'react';

const usePageTitle = (title) => {
  useEffect(() => {
    document.title = title
      ? `${title} | PatientPath`
      : 'PatientPath | AI Triage System';
  }, [title]);
};

export default usePageTitle;
