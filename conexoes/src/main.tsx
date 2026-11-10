import React from 'react';
import { createRoot } from 'react-dom/client';
import { App } from './App';

const raiz = document.getElementById('raiz');
if (raiz) createRoot(raiz).render(<App />);
