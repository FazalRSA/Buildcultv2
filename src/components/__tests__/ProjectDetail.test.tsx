import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter, Routes, Route } from 'react-router-dom';
import ProjectDetail from '../ProjectDetail';
import { PROJECTS } from '../../constants';

const renderProjectDetail = (initialRoute: string) => {
  return render(
    <MemoryRouter initialEntries={[initialRoute]}>
      <Routes>
        <Route path="/" element={<div>Home Page Mock</div>} />
        <Route path="/project/:id" element={<ProjectDetail />} />
        <Route path="/project" element={<ProjectDetail />} />
      </Routes>
    </MemoryRouter>
  );
};

describe('ProjectDetail', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe('when project is not found', () => {
    it('renders "Project Not Found" state when given a non-existent project ID', () => {
      renderProjectDetail('/project/non-existent-id');

      expect(screen.getByRole('heading', { level: 1, name: /project not found/i })).toBeInTheDocument();
      expect(screen.getByRole('button', { name: /return to base/i })).toBeInTheDocument();
    });

    it('renders "Project Not Found" state when given special characters or empty string ID', () => {
      renderProjectDetail('/project/%20');

      expect(screen.getByRole('heading', { level: 1, name: /project not found/i })).toBeInTheDocument();
      expect(screen.getByRole('button', { name: /return to base/i })).toBeInTheDocument();
    });

    it('navigates to home page when "Return to Base" button is clicked in Not Found view', async () => {
      const user = userEvent.setup();
      renderProjectDetail('/project/unknown-id');

      const returnButton = screen.getByRole('button', { name: /return to base/i });
      await user.click(returnButton);

      expect(screen.getByText('Home Page Mock')).toBeInTheDocument();
    });
  });

  describe('when project is found', () => {
    it('renders project details correctly for a valid project ID', () => {
      const validProject = PROJECTS[0]; // e.g. cyber-shell
      renderProjectDetail(`/project/${validProject.id}`);

      expect(screen.getByRole('heading', { level: 1, name: validProject.title })).toBeInTheDocument();
      expect(screen.getByText(validProject.category)).toBeInTheDocument();
      expect(screen.getByText(validProject.caseStudy)).toBeInTheDocument();
    });

    it('scrolls to top on mount', () => {
      const validProject = PROJECTS[0];
      renderProjectDetail(`/project/${validProject.id}`);

      expect(window.scrollTo).toHaveBeenCalledWith(0, 0);
    });

    it('navigates to home page when "BACK TO ARCHIVE" button is clicked', async () => {
      const user = userEvent.setup();
      const validProject = PROJECTS[0];
      renderProjectDetail(`/project/${validProject.id}`);

      const backButton = screen.getByRole('button', { name: /back to archive/i });
      await user.click(backButton);

      expect(screen.getByText('Home Page Mock')).toBeInTheDocument();
    });

    it('renders live project link with correct href', () => {
      const validProject = PROJECTS[0];
      renderProjectDetail(`/project/${validProject.id}`);

      const liveProjectLinks = screen.getAllByRole('link', { name: /live project/i });
      expect(liveProjectLinks[0]).toHaveAttribute('href', validProject.liveUrl);
    });

    it('opens live project URL in new tab when "VISIT SITE" button is clicked', async () => {
      const windowOpenSpy = vi.spyOn(window, 'open').mockImplementation(() => null);
      const user = userEvent.setup();
      const validProject = PROJECTS[0];
      renderProjectDetail(`/project/${validProject.id}`);

      const visitSiteButton = screen.getByRole('button', { name: /visit site/i });
      await user.click(visitSiteButton);

      expect(windowOpenSpy).toHaveBeenCalledWith(validProject.liveUrl, '_blank', 'noopener,noreferrer');
      windowOpenSpy.mockRestore();
    });
  });
});
