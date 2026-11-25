import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './components/Home';
import ProjectDetail from './components/ProjectDetail';
import ServicesPage from './components/ServicesPage';
import Podcast from './components/Podcast';
import About from './components/About';
import DigitalTransformation from './components/DigitalTransformation';
import TechTalent from './components/TechTalent';
import AuditPage from './components/AuditPage';
import IndustriesPage from './components/IndustriesPage';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/audit" element={<AuditPage />} />
        <Route path="/diagnostic" element={<AuditPage />} />
        <Route path="/industries" element={<IndustriesPage />} />
        <Route path="/services" element={<ServicesPage />} />
        <Route path="/digital-transformation" element={<DigitalTransformation />} />
        <Route path="/tech-talent" element={<TechTalent />} />
        <Route path="/podcast" element={<Podcast />} />
        <Route path="/project/:id" element={<ProjectDetail />} />
        <Route path="*" element={<Home />} />
      </Routes>
    </BrowserRouter>
  );
}
