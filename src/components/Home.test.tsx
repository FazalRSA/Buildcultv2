import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { describe, it, expect } from 'vitest';
import Home from './Home';

describe('Home Page Component', () => {
  it('renders without crashing and displays essential sections and subcomponents', () => {
    render(
      <MemoryRouter>
        <Home />
      </MemoryRouter>
    );

    // 1. Navigation bar brand and links
    expect(screen.getAllByText(/BUILD/i).length).toBeGreaterThan(0);
    expect(screen.getAllByText(/CULT/i).length).toBeGreaterThan(0);

    // 2. Navigation items
    expect(screen.getAllByText('Services').length).toBeGreaterThan(0);
    expect(screen.getAllByText('Podcast').length).toBeGreaterThan(0);
    expect(screen.getAllByText('Manifesto').length).toBeGreaterThan(0);
    expect(screen.getByText('Initiate')).toBeInTheDocument();

    // 3. Hero section content
    expect(screen.getAllByText(/Engineering Devotion/i).length).toBeGreaterThan(0);
    expect(screen.getByText(/Join the Ritual/i)).toBeInTheDocument();

    // 4. Marquee banner text
    expect(screen.getAllByText(/Radical Labor/i).length).toBeGreaterThan(0);

    // 5. Services section
    expect(screen.getByText('SACRED')).toBeInTheDocument();
    expect(screen.getByText('LABOR')).toBeInTheDocument();

    // 6. Manifesto section
    expect(screen.getByText('THE LORE')).toBeInTheDocument();
    expect(screen.getByText('SACRED PRINCIPLES')).toBeInTheDocument();
    expect(screen.getByText('CRAFT IS RELIGION')).toBeInTheDocument();

    // 7. Main layout container
    const mainElement = screen.getByRole('main');
    expect(mainElement).toBeInTheDocument();
  });
});
