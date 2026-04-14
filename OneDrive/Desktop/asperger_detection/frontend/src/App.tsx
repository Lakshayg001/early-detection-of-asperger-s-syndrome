import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LandingPage from './pages/LandingPage';
import AssessmentWizard from './components/AssessmentWizard';
import ResultsDashboard from './pages/Dashboard';
import HistoryPage from './pages/HistoryPage';
import PDFReportViewer from './pages/ReportPage';
import Layout from './components/Layout';
import './index.css';

function App() {
  return (
    <Router>
      <div className="selection:bg-primary/20">
        <Routes>
          <Route element={<Layout />}>
            <Route path="/" element={<LandingPage />} />
            <Route path="/assessment" element={<AssessmentWizard />} />
            <Route path="/dashboard" element={<ResultsDashboard />} />
            <Route path="/history" element={<HistoryPage />} />
            <Route path="/report" element={<PDFReportViewer />} />
          </Route>
        </Routes>
      </div>
    </Router>
  );
}

export default App;
