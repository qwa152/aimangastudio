import React, { useState } from 'react';
import { MenuIcon, XIcon, BookOpenIcon, GlobeIcon, VideoIcon, ArrowLeftIcon, KeyIcon } from './icons';
import { useLocalization } from '../hooks/useLocalization';
import { Language } from '../i18n/locales';

interface HeaderProps {
  isSidebarOpen: boolean; onToggleSidebar: () => void; language: Language; setLanguage: (language: Language) => void;
  onOpenApiKeyModal?: () => void; hasApiKey?: boolean; onShowMangaViewer: () => void; onShowWorldview: () => void;
  currentView: 'manga-editor' | 'video-producer'; onSetView: (view: 'manga-editor' | 'video-producer') => void;
}

export function Header({ isSidebarOpen, onToggleSidebar, language, setLanguage, onOpenApiKeyModal, hasApiKey, onShowMangaViewer, onShowWorldview, currentView, onSetView }: HeaderProps): React.ReactElement {
  const { t } = useLocalization();
  const [isLangOpen, setIsLangOpen] = useState(false);
  const languages: { key: Language; name: string }[] = [{ key: 'zh', name: t('chinese') }, { key: 'en', name: t('english') }, { key: 'ja', name: t('japanese') }];
  return (
    <header className="studio-header">
      <div className="header-brand-group">
        <button onClick={currentView === 'video-producer' ? () => onSetView('manga-editor') : onToggleSidebar} className="ink-icon-button" aria-label={currentView === 'video-producer' ? t('backToEditor') : '切换侧栏'}>
          {currentView === 'video-producer' ? <ArrowLeftIcon className="w-5 h-5" /> : isSidebarOpen ? <XIcon className="w-5 h-5" /> : <MenuIcon className="w-5 h-5" />}
        </button>
        <div className="brand-seal" aria-hidden="true"><span>漫</span></div>
        <div className="brand-copy"><div className="brand-title">云墨 <strong>AI 国漫</strong></div><div className="brand-subtitle">东方叙事 · 智绘成篇</div></div>
      </div>
      <nav className="header-actions" aria-label="创作工具">
        <button onClick={onShowWorldview} className="header-tool"><span className="tool-glyph">设</span><span>{t('worldviewSettings')}</span></button>
        <button onClick={onShowMangaViewer} className="header-tool"><BookOpenIcon className="w-4 h-4" /><span>{t('viewCollection')}</span></button>
        <button onClick={() => onSetView('video-producer')} className={`header-tool ${currentView === 'video-producer' ? 'active' : ''}`}><VideoIcon className="w-4 h-4" /><span>{t('aiVideoProducer')}</span></button>
        {onOpenApiKeyModal && <button onClick={onOpenApiKeyModal} className="header-tool key-tool"><KeyIcon className="w-4 h-4" /><span>{hasApiKey ? '模型已连接' : t('setApiKey')}</span><i className={hasApiKey ? 'status-live' : 'status-idle'} /></button>}
        <div className="language-menu"><button onClick={() => setIsLangOpen(v => !v)} className="ink-icon-button" aria-label={t('language')}><GlobeIcon className="w-5 h-5" /></button>
          {isLangOpen && <div className="language-popover">{languages.map(item => <button key={item.key} onClick={() => { setLanguage(item.key); setIsLangOpen(false); }} className={language === item.key ? 'selected' : ''}>{item.name}</button>)}</div>}
        </div>
      </nav>
    </header>
  );
}
