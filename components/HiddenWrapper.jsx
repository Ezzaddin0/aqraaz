"use client"
import { usePathname } from 'next/navigation';

const HiddenWrapper = ({ children }) => {
  const pathName = usePathname().split('/')[2];
  const hiddenPaths = ['/login', 'login', '/signup', 'signup', '/en/studio', 'studio'];
  const isHidden = hiddenPaths.includes(pathName);

  return (
    <div className={isHidden ? 'hidden' : ''}>
      {children}
    </div>
  );
};

export default HiddenWrapper;