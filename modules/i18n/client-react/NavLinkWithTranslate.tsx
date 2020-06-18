import React, { ReactNode } from 'react';
import { NavLink } from 'react-router-dom';
import { TranslateFunction } from '@restapp/i18n-client-react';

interface NavLinkProps {
  children?: ReactNode;
  path: string;
  className?: string;
  i18nKey?: string;
  t?: TranslateFunction;
}

const NavLinkWithTranslate = ({ i18nKey, t, path, className = 'nav-link', children }: NavLinkProps) => (
  <NavLink to={path} className={className} activeClassName="active">
    {t ? t(i18nKey || 'navLink') : children}
  </NavLink>
);

export default NavLinkWithTranslate;
