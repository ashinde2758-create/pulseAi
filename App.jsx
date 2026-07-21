import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import MedicalDisclaimer from './components/MedicalDisclaimer';
import EmergencyModal from './components/EmergencyModal';
import ApiKeyModal from './components/ApiKeyModal';
import HistoryDrawer from './components/HistoryDrawer';
import ChatStudio from './components/ChatStudio';
import TriageWizard from './components/TriageWizard';
import PreventiveCare from './components/PreventiveCare';
import JargonSimplifier from './components/JargonSimplifier';
import { getSavedConsultations } from './services/storageService';
import { Sparkles, Shield, Heart, Activity } from 'lucide-react';

export default function App() {
  const [activeTab, setActiveTab] = useState('chat');
  const [isEmergencyOpen, setIsEmergencyOpen] = useState(false);
  const [emergencyKeywords, setEmergencyKeywords] = useState([]);
  const [isApiKeyOpen, setIsApiKeyOpen] = useState(false);
  const [isHistoryOpen, setIsHistoryOpen] = useState(false);
  const [historyCount, setHistoryCount] = useState(0);
  const [loadedConsultation, setLoadedConsultation] = useState(null);

  const refreshHistoryCount = () => {
    const items = getSavedConsultations();
    setHistoryCount(items.length);
  };

  useEffect(() => {
    refreshHistoryCount();
  }, []);

  const handleTriggerEmergency = (keywords = []) => {
    setEmergencyKeywords(keywords);
    setIsEmergencyOpen(true);
  };

  const handleLoadConsultation = (item) => {
    setLoadedConsultation(item);
    setActiveTab(item.mode || 'chat');
  };

  return (
    <div className="app-layout">
      {/* Top Header Navigation */}
      <Header
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        onOpenApiKeyModal={() => setIsApiKeyOpen(true)}
        onOpenHistory={() => setIsHistoryOpen(true)}
        historyCount={historyCount}
      />

      {/* Main Container */}
      <main className="main-content">
        <div className="container">
          {/* Medical & Safety Disclaimer */}
          <MedicalDisclaimer onOpenEmergency={() => handleTriggerEmergency()} />

          {/* Tab Views */}
          {activeTab === 'chat' && (
            <ChatStudio
              onTriggerEmergency={handleTriggerEmergency}
              onSaveSuccess={refreshHistoryCount}
              loadedItem={loadedConsultation}
            />
          )}

          {activeTab === 'triage' && (
            <TriageWizard
              onTriggerEmergency={handleTriggerEmergency}
              onSaveSuccess={refreshHistoryCount}
            />
          )}

          {activeTab === 'preventive' && (
            <PreventiveCare
              onSaveSuccess={refreshHistoryCount}
            />
          )}

          {activeTab === 'jargon' && (
            <JargonSimplifier
              onSaveSuccess={refreshHistoryCount}
            />
          )}
        </div>
      </main>

      {/* Footer */}
      <footer className="app-footer">
        <div className="container footer-content">
          <div className="footer-brand">
            <div className="logo-icon-wrap sm">
              <Activity size={18} className="logo-icon" />
            </div>
            <span>PulseAI Health Platform</span>
          </div>

          <div className="footer-links">
            <span>Powered by Generative AI</span>
            <span className="dot">•</span>
            <span>Educational Awareness Only</span>
            <span className="dot">•</span>
            <span>Privacy & Local Storage First</span>
          </div>

          <p className="footer-disclaimer">
            ⚠️ Disclaimer: PulseAI does not provide clinical diagnosis or prescription advice. Always seek professional advice from a doctor or medical specialist for healthcare decisions.
          </p>
        </div>
      </footer>

      {/* Modals & Drawers */}
      <EmergencyModal
        isOpen={isEmergencyOpen}
        onClose={() => setIsEmergencyOpen(false)}
        matchedKeywords={emergencyKeywords}
      />

      <ApiKeyModal
        isOpen={isApiKeyOpen}
        onClose={() => setIsApiKeyOpen(false)}
      />

      <HistoryDrawer
        isOpen={isHistoryOpen}
        onClose={() => setIsHistoryOpen(false)}
        onLoadConsultation={handleLoadConsultation}
        onRefreshCount={refreshHistoryCount}
      />
    </div>
  );
}
