import type { FC } from 'react';
import { RouterProvider } from 'react-router-dom';
import { router } from './routes';
import { SkillBridgeProvider } from './context/SkillBridgeContext';

export const App: FC = () => {
  return (
    <SkillBridgeProvider>
      <RouterProvider router={router} />
    </SkillBridgeProvider>
  );
};

export default App;

