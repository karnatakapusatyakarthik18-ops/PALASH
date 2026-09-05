import React, { useState } from 'react';
import { Wifi, WifiOff, RefreshCw, Share2, CheckCircle2, ShieldCheck, ArrowRight, Laptop, Tablet, Radio } from 'lucide-react';

export const MeshSyncSimulator: React.FC = () => {
  const [isSyncing, setIsSyncing] = useState(false);
  const [syncProgress, setSyncProgress] = useState(0);
  const [lastSyncTime, setLastSyncTime] = useState('आज, 10:30 AM');

  const nodes = [
    { id: '1', name: 'उलीहातू प्रा.वि. (Ulihatu)', status: 'synced', files: 48, battery: '85%' },
    { id: '2', name: 'तोरपा प्रा.वि. (Torpa)', status: isSyncing ? 'syncing' : 'synced', files: 48, battery: '92%' },
    { id: '3', name: 'मुरहू प्रा.वि. (Murhu)', status: 'synced', files: 48, battery: '78%' },
    { id: '4', name: 'कर्रा प्रा.वि. (Karra)', status: isSyncing ? 'syncing' : 'ready', files: 42, battery: '89%' }
  ];

  const handleStartSync = () => {
    setIsSyncing(true);
    setSyncProgress(0);

    const interval = setInterval(() => {
      setSyncProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setIsSyncing(false);
          setLastSyncTime('अभी-अभी (Just Now)');
          return 100;
        }
        return prev + 25;
      });
    }, 400);
  };

  return (
    <div className="max-w-5xl mx-auto space-y-6">
      {/* Title & Stats */}
      <div className="bg-white rounded-3xl border border-orange-100 p-6 shadow-md space-y-3">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="space-y-1">
            <h2 className="text-xl md:text-2xl font-black text-slate-800 flex items-center space-x-2">
              <Radio className="w-6 h-6 text-orange-600 animate-pulse" />
              <span>ऑफ़लाइन क्लस्टर मेश सिंक (Peer-to-Peer Offline Sync)</span>
            </h2>
            <p className="text-xs text-slate-500">
              शून्य इंटरनेट वाले सुदूर जनजातीय क्षेत्रों में टैबलेट-टू-टैबलेट (Wi-Fi Direct / हॉटस्पॉट) पाठ्यचर्या एवं ऑडियो साझाकरण।
            </p>
          </div>

          <button
            onClick={handleStartSync}
            disabled={isSyncing}
            className={`px-5 py-2.5 rounded-xl text-xs font-black shadow-md flex items-center space-x-2 transition-all ${
              isSyncing
                ? 'bg-amber-500 text-white animate-pulse'
                : 'bg-gradient-to-r from-orange-600 to-rose-600 hover:from-orange-700 text-white hover:scale-105 active:scale-95'
            }`}
          >
            <RefreshCw className={`w-4 h-4 ${isSyncing ? 'animate-spin' : ''}`} />
            <span>{isSyncing ? `सिंक जारी है (${syncProgress}%)...` : 'स्थानीय मेश सिंक प्रारंभ करें'}</span>
          </button>
        </div>

        {/* Sync Summary Metrics */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-3 border-t border-slate-100 text-xs">
          <div className="bg-slate-50 p-3 rounded-xl border border-slate-200">
            <span className="text-slate-400 font-bold block">इंटरनेट डेटा उपयोग:</span>
            <strong className="text-emerald-700 text-sm font-black">0 KB (शून्य डेटा)</strong>
          </div>
          <div className="bg-slate-50 p-3 rounded-xl border border-slate-200">
            <span className="text-slate-400 font-bold block">स्थानीय मेश गति:</span>
            <strong className="text-slate-800 text-sm font-black">54 Mbps (Wi-Fi P2P)</strong>
          </div>
          <div className="bg-slate-50 p-3 rounded-xl border border-slate-200">
            <span className="text-slate-400 font-bold block">साझा की गई सामग्री:</span>
            <strong className="text-slate-800 text-sm font-black">48 कार्यपत्रक, 120 ऑडियो</strong>
          </div>
          <div className="bg-slate-50 p-3 rounded-xl border border-slate-200">
            <span className="text-slate-400 font-bold block">अंतिम सिंक समय:</span>
            <strong className="text-orange-950 text-sm font-black">{lastSyncTime}</strong>
          </div>
        </div>
      </div>

      {/* Visual Mesh Network Map */}
      <div className="bg-gradient-to-br from-slate-900 via-slate-850 to-slate-950 rounded-3xl p-6 md:p-8 text-white shadow-2xl border-4 border-slate-800 relative overflow-hidden">
        <div className="flex items-center justify-between pb-6 border-b border-white/10">
          <div className="flex items-center space-x-2 text-xs text-emerald-400 font-bold">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-ping"></span>
            <span>क्लस्टर हॉटस्पॉट मेश सक्रिय (Local Ad-Hoc Network)</span>
          </div>
          <span className="text-xs bg-white/10 px-3 py-1 rounded-full font-mono text-slate-300">
            SSID: PALASH_CLUSTER_KHUNTI
          </span>
        </div>

        <div className="py-8 grid grid-cols-1 md:grid-cols-3 gap-8 items-center">
          {/* Master Hub Tablet */}
          <div className="md:col-span-1 flex flex-col items-center text-center space-y-3 bg-white/10 backdrop-blur-md p-6 rounded-3xl border border-white/20 shadow-xl">
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-orange-500 to-rose-600 flex items-center justify-center text-white shadow-lg ring-4 ring-orange-400/40 animate-pulse">
              <Laptop className="w-8 h-8" />
            </div>
            <div>
              <span className="text-[10px] font-black uppercase text-amber-300 bg-black/40 px-2.5 py-0.5 rounded-full">
                मास्टर हब (BRC खूंटी)
              </span>
              <h3 className="font-black text-white text-base mt-1">संकुल समन्वयक टैबलेट</h3>
              <p className="text-xs text-slate-300 mt-0.5">सामग्री स्रोत (Master Node)</p>
            </div>
            <span className="text-[10px] text-emerald-300 font-mono">192.168.43.1 (ब्रॉडकास्ट)</span>
          </div>

          {/* Connection Waves Animation */}
          <div className="hidden md:flex flex-col items-center justify-center space-y-2 text-center text-xs text-slate-400">
            <Share2 className={`w-8 h-8 text-orange-400 ${isSyncing ? 'animate-bounce' : ''}`} />
            <span className="font-bold">{isSyncing ? 'डेटा पैकेट प्रसारण...' : 'स्थानीय मेश लिंक'}</span>
            <div className="w-32 h-1 bg-gradient-to-r from-orange-500 via-amber-400 to-emerald-500 rounded-full"></div>
          </div>

          {/* Cluster Satellite School Tablets */}
          <div className="md:col-span-1 space-y-3">
            {nodes.map((node) => (
              <div
                key={node.id}
                className="bg-white/5 hover:bg-white/10 p-3 rounded-2xl border border-white/10 flex items-center justify-between text-xs transition-all"
              >
                <div className="flex items-center space-x-2.5">
                  <Tablet className="w-4 h-4 text-slate-300 shrink-0" />
                  <div>
                    <h4 className="font-black text-white">{node.name}</h4>
                    <span className="text-[10px] text-slate-400">बैटरी: {node.battery} • {node.files} फाइल्स</span>
                  </div>
                </div>

                <div className="flex items-center space-x-1">
                  {node.status === 'synced' && (
                    <span className="text-[10px] font-bold text-emerald-400 flex items-center space-x-1">
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      <span>सिंक पूर्ण</span>
                    </span>
                  )}
                  {node.status === 'syncing' && (
                    <span className="text-[10px] font-bold text-amber-300 animate-pulse">
                      सिंकिंग...
                    </span>
                  )}
                  {node.status === 'ready' && (
                    <span className="text-[10px] text-slate-400">
                      तैयार
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
