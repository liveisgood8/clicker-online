import { ReactComponent as LogoIcon } from './superhero.svg';

import React from 'react';
import { Link } from 'react-router-dom';

export const Logo: React.FC = () => (
  <div className="mb-5 d-flex align-items-center">
    <LogoIcon className="mr-2" width="32px" />
    <Link className="h2 text-decoration-none mb-0" to="/">ClickerOnline</Link>
  </div>
);
