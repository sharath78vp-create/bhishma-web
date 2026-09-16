import type { FC, ReactNode } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useSkillBridge } from '../../context/SkillBridgeContext';

interface RoleGuardProps {
  children: ReactNode;
  allowedRole?: 'student' | 'trainer' | 'institute' | 'intelligence';
}

export const RoleGuard: FC<RoleGuardProps> = ({ children, allowedRole }) => {
  const { currentRole, isAuthenticated } = useSkillBridge();
  const location = useLocation();

  // If not authenticated, redirect to login
  if (!isAuthenticated) {
    return <Navigate to="/login" replace state={{ from: location }} />;
  }

  // If role is specified and does not match current authenticated role, lock user to their currentRole portal
  if (allowedRole && currentRole !== allowedRole) {
    const rolePaths: Record<string, string> = {
      student: '/student',
      trainer: '/trainer',
      institute: '/institute',
      intelligence: '/intelligence'
    };

    const targetPortal = rolePaths[currentRole] || '/student';
    return <Navigate to={targetPortal} replace />;
  }

  return <>{children}</>;
};
