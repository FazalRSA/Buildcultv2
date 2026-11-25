import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import App, { AppRoutes } from './App';
import { PROJECTS } from './constants';

describe('App Routing', () => {
  test('renders Home page at root route ("/")', () => {
    render(
      <MemoryRouter initialEntries={['/']}>
        <AppRoutes />
      </MemoryRouter>
    );

    expect(screen.getByRole('heading', { name: /BUILD CULT/i })).toBeInTheDocument();
  });

  test('renders ServicesPage at "/services"', () => {
    render(
      <MemoryRouter initialEntries={['/services']}>
        <AppRoutes />
      </MemoryRouter>
    );

    expect(screen.getByRole('heading', { name: /CORE SERVICES/i })).toBeInTheDocument();
  });

  test('renders Podcast page at "/podcast"', () => {
    render(
      <MemoryRouter initialEntries={['/podcast']}>
        <AppRoutes />
      </MemoryRouter>
    );

    expect(screen.getByRole('heading', { name: /The Build Cult Broadcast/i })).toBeInTheDocument();
  });

  test('renders ProjectDetail page at "/project/:id" for a valid project', () => {
    const validProject = PROJECTS[0];
    render(
      <MemoryRouter initialEntries={[`/project/${validProject.id}`]}>
        <AppRoutes />
      </MemoryRouter>
    );

    expect(screen.getByRole('heading', { name: new RegExp(validProject.title, 'i') })).toBeInTheDocument();
  });

  test('renders Home page as fallback for unknown routes', () => {
    render(
      <MemoryRouter initialEntries={['/some/non-existent-route']}>
        <AppRoutes />
      </MemoryRouter>
    );

    expect(screen.getByRole('heading', { name: /BUILD CULT/i })).toBeInTheDocument();
  });

  test('App component renders without crashing with BrowserRouter', () => {
    render(<App />);

    expect(screen.getByRole('heading', { name: /BUILD CULT/i })).toBeInTheDocument();
  });
});
