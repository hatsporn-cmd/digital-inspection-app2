import React, { useState } from 'react';
import { 
  LayoutDashboard, 
  Layers, 
  ClipboardCheck, 
  FileText, 
  FolderTree, 
  Bot, 
  CheckCircle2, 
  XCircle, 
  Clock, 
  AlertTriangle, 
  Upload, 
  Mic, 
  Globe, 
  Search, 
  Filter, 
  Building2, 
  DoorClosed, 
  Camera, 
  FileCheck, 
  ArrowRight,
  ShieldAlert,
  CheckSquare,
  Sparkles,
  Wifi,
  ChevronRight
} from 'lucide-react';

export default function App() {
  // --- STATE MANAGEMENT ---
  const [lang, setLang] = useState('TH'); // 'TH' | 'EN'
  const [activeTab, setActiveTab] = useState('dashboard'); // dashboard | floors | inspections | records | documents | ai | handover
  const [selectedFloor, setSelectedFloor] = useState('8');
  const [selectedRoom, setSelectedRoom] = useState('801');
  const [selectedZone, setSelectedZone] = useState('Bathroom');

  // Form State for Inspection Submission
  const [formFloor, setFormFloor] = useState('8');
  const [formRoom, setFormRoom] = useState('801');
  const [formCategory, setFormCategory] = useState('Architecture');
  const [formDate, setFormDate] = useState(new Date().toISOString().split('T')[0]);
  const [formInspector, setFormInspector] = useState('วิศวกร ธนโชค (Site Engineer)');
  const [formStatus, setFormStatus] = useState('Ready For Inspection');
  const [formComments, setFormComments] = useState('');
  const [uploadedFiles, setUploadedFiles] = useState([]);
  const [aiValidationResult, setAiValidationResult] = useState(null);

  // AI Assistant States
  const [aiVoicePrompt, setAiVoicePrompt] = useState('');
  const [isRecording, setIsRecording] = useState(false);

  // --- DICTIONARY FOR BILINGUAL SUPPORT ---
  const t = {
    TH: {
      platformTitle: "ระบบตรวจงานและส่งมอบพื้นที่ดิจิทัล",
      projectName: "โครงการโรงแรมบูติก บางกอก สุขุมวิท 5",
      liveSync: "ซิงก์ข้อมูลเรียลไทม์ 🟢 | อัปเดตล่าสุด: เมื่อสักครู่",
      menu: {
        dashboard: "แดชบอร์ดผู้บริหาร",
        floors: "สถานะตามชั้น (Floor Status)",
        inspections: "ตรวจงานห้องพัก (Room Inspections)",
        records: "ประวัติการตรวจ (Inspection Records)",
        documents: "ศูนย์เอกสาร (Document Center)",
        ai: "ผู้ช่วย AI (AI Assistant)",
        handover: "แดชบอร์ดส่งมอบ (Handover Dashboard)"
      },
      status: {
        passed: "ผ่านการตรวจ",
        failed: "ไม่ผ่านการตรวจ",
        ready: "พร้อมตรวจ",
        gray: "ยังไม่ส่งตรวจ"
      },
      common: {
        floor: "ชั้น",
        room: "ห้อง",
        status: "สถานะ",
        inspector: "ผู้ตรวจสอบ",
        date: "วันที่ตรวจ",
        submit: "ส่งข้อมูล (Submit)",
        saveDraft: "บันทึกร่าง (Save Draft)",
        required: "* จำเป็นต้องกรอก"
      }
    },
    EN: {
      platformTitle: "Digital Inspection & Handover Platform",
      projectName: "Boutique Bangkok Sukhumvit 5 Hotel Project",
      liveSync: "Live Sync 🟢 | Last updated: Just now",
      menu: {
        dashboard: "Executive Dashboard",
        floors: "Floor Status",
        inspections: "Room Inspections",
        records: "Inspection Records",
        documents: "Documents Center",
        ai: "AI Assistant",
        handover: "Handover Dashboard"
      },
      status: {
        passed: "Passed",
        failed: "Failed",
        ready: "Ready For Inspection",
        gray: "Not Submitted"
      },
      common: {
        floor: "Floor",
        room: "Room",
        status: "Status",
        inspector: "Inspector",
        date: "Inspection Date",
        submit: "Submit",
        saveDraft: "Save Draft",
        required: "* Required"
      }
    }
  };

  // --- MOCK ROOM INVENTORY DATABASE ---
  const roomDatabase = {
    8: [
      { id: '801', type: 'E', status: 'Failed', issue: 'Missing Mix Valve', inspector: 'ธนโชค (Site Eng)', date: '2026-10-24' },
      { id: '802', type: 'E', status: 'Passed', issue: null, inspector: 'หัศภรณ์ (Project Eng)', date: '2026-10-23' },
      { id: '803', type: 'E', status: 'Passed', issue: null, inspector: 'ธนโชค (Site Eng)', date: '2026-10-23' },
      { id: '804', type: 'E', status: 'Ready', issue: null, inspector: '-', date: '-' },
      { id: '805', type: 'E', status: 'Not Submitted', issue: null, inspector: '-', date: '-' },
      { id: '806', type: 'E', status: 'Passed', issue: null, inspector: 'รติมา (QA)', date: '2026-10-22' },
      { id: '807', type: 'E', status: 'Passed', issue: null, inspector: 'ธนโชค (Site Eng)', date: '2026-10-22' },
      { id: '808', type: 'E', status: 'Ready', issue: null, inspector: '-', date: '-' },
      { id: '809', type: 'E', status: 'Passed', issue: null, inspector: 'สวรส (MEP Eng)', date: '2026-10-21' },
      { id: '810', type: 'E', status: 'Passed', issue: null, inspector: 'ธนโชค (Site Eng)', date: '2026-10-21' },
      { id: '811', type: 'E', status: 'Passed', issue: null, inspector: 'ภัทรวดี (Arch Eng)', date: '2026-10-20' },
      { id: '812', type: 'E', status: 'Ready', issue: null, inspector: '-', date: '-' },
      { id: '818', type: 'A', status: 'Passed', issue: null, inspector: 'ธนโชค (Site Eng)', date: '2026-10-20' },
      { id: '819', type: 'S2', status: 'Passed', issue: null, inspector: 'หัศภรณ์ (Project Eng)', date: '2026-10-19' },
      { id: '821', type: 'D', status: 'Ready', issue: null, inspector: '-', date: '-' },
      { id: '822', type: 'S1', status: 'Passed', issue: null, inspector: 'ธนโชค (Site Eng)', date: '2026-10-19' },
      { id: '824', type: 'C', status: 'Passed', issue: null, inspector: 'รติมา (QA)', date: '2026-10-18' },
      { id: '825', type: 'H', status: 'Passed', issue: null, inspector: 'ธนโชค (Site Eng)', date: '2026-10-18' },
      { id: '826', type: 'A', status: 'Passed', issue: null, inspector: 'สวรส (MEP Eng)', date: '2026-10-17' },
      { id: '829', type: 'A', status: 'Passed', issue: null, inspector: 'ธนโชค (Site Eng)', date: '2026-10-17' },
    ],
    7: [
      { id: '701', type: 'E', status: 'Passed', issue: null, inspector: 'ธนโชค (Site Eng)', date: '2026-10-16' },
      { id: '702', type: 'E', status: 'Passed', issue: null, inspector: 'หัศภรณ์ (Project Eng)', date: '2026-10-16' },
      { id: '706', type: 'E', status: 'Failed', issue: 'Ceiling Defect', inspector: 'รติมา (QA)', date: '2026-10-15' },
      { id: '713', type: 'A', status: 'Passed', issue: null, inspector: 'ธนโชค (Site Eng)', date: '2026-10-14' },
    ],
    6: [
      { id: '601', type: 'E', status: 'Passed', issue: null, inspector: 'ธนโชค (Site Eng)', date: '2026-10-12' },
      { id: '613', type: 'A', status: 'Failed', issue: 'Plumbing Issue', inspector: 'สวรส (MEP Eng)', date: '2026-10-11' },
    ],
    5: [ { id: '501', type: 'E', status: 'Passed', issue: null, inspector: 'ธนโชค', date: '2026-10-10' } ],
    4: [ { id: '401', type: 'E', status: 'Ready', issue: null, inspector: '-', date: '-' } ],
    3: [ 
      { id: '301', type: 'E', status: 'Passed', issue: null, inspector: 'ธนโชค', date: '2026-10-08' },
      { id: '302', type: 'E', status: 'Passed', issue: null, inspector: 'หัศภรณ์', date: '2026-10-08' },
      { id: '303', type: 'E', status: 'Ready', issue: null, inspector: '-', date: '-' },
      { id: '304', type: 'E', status: 'Not Submitted', issue: null, inspector: '-', date: '-' },
      { id: '305', type: 'E', status: 'Passed', issue: null, inspector: 'ธนโชค', date: '2026-10-07' },
      { id: '306', type: 'E', status: 'Passed', issue: null, inspector: 'รติมา', date: '2026-10-07' },
      { id: '307', type: 'E', status: 'Ready', issue: null, inspector: '-', date: '-' },
      { id: '308', type: 'E', status: 'Passed', issue: null, inspector: 'สวรส', date: '2026-10-06' },
      { id: '309', type: 'E', status: 'Passed', issue: null, inspector: 'ธนโชค', date: '2026-10-06' },
      { id: '313', type: 'A', status: 'Passed', issue: null, inspector: 'ภัทรวดี', date: '2026-10-05' },
      { id: '320', type: 'B2', status: 'Ready', issue: null, inspector: '-', date: '-' },
      { id: '321', type: 'D', status: 'Passed', issue: null, inspector: 'ธนโชค', date: '2026-10-04' },
    ],
    2: [ { id: '217', type: 'A', status: 'Passed', issue: null, inspector: 'ธนโชค', date: '2026-10-02' } ],
    1: [ { id: '121', type: 'D', status: 'Ready', issue: null, inspector: '-', date: '-' } ]
  };

  // Helper status color mapping
  const getStatusColor = (status) => {
    switch (status) {
      case 'Passed': return 'bg-emerald-500 text-white border-emerald-600';
      case 'Failed': return 'bg-rose-500 text-white border-rose-600';
      case 'Ready For Inspection':
      case 'Ready': return 'bg-blue-500 text-white border-blue-600';
      default: return 'bg-slate-200 text-slate-700 border-slate-300';
    }
  };

  const getStatusBgColor = (status) => {
    switch (status) {
      case 'Passed': return 'bg-emerald-50 border-emerald-200 text-emerald-700';
      case 'Failed': return 'bg-rose-50 border-rose-200 text-rose-700';
      case 'Ready For Inspection':
      case 'Ready': return 'bg-blue-50 border-blue-200 text-blue-700';
      default: return 'bg-slate-50 border-slate-200 text-slate-600';
    }
  };

  // Handle Simulated File Upload with AI Photo Validation
  const handleFileUpload = (e) => {
    const files = Array.from(e.target.files);
    if (files.length > 0) {
      setUploadedFiles(prev => [...prev, ...files]);
      // Trigger AI Photo Validation Simulation
      setAiValidationResult({
        status: 'success',
        message: 'AI Validated: Evidence is clear & high quality',
        detectedWork: 'Mix Valve / Plumbing Installation',
        confidence: '96.4%'
      });
    }
  };

  // Check if Form is valid for submission
  const isFormValid = formFloor && formRoom && formCategory && formDate && formInspector && formStatus && uploadedFiles.length > 0;

  return (
    <div className="min-h-screen bg-slate-100 font-sans text-slate-800 flex flex-col">
      
      {/* TOP HEADER */}
      <header className="bg-[#002B49] text-white shadow-md border-b border-blue-900 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 py-3 flex flex-col md:flex-row justify-between items-center gap-3">
          <div className="flex items-center gap-3">
            <div className="bg-blue-600 p-2 rounded-lg text-white font-bold flex items-center gap-2">
              <Building2 className="w-6 h-6" />
              <span className="tracking-wider">SYNTEC</span>
            </div>
            <div>
              <h1 className="text-lg font-bold flex items-center gap-2">
                Digital Inspection & Handover Platform
                <span className="text-xs bg-blue-800 text-blue-200 px-2 py-0.5 rounded">Enterprise v2.0</span>
              </h1>
              <p className="text-xs text-blue-200">{t[lang].projectName}</p>
            </div>
          </div>

          <div className="flex items-center gap-4">
            {/* Real-time Indicator */}
            <div className="hidden lg:flex items-center gap-2 bg-blue-950 px-3 py-1.5 rounded-full border border-blue-800 text-xs text-emerald-400 font-medium">
              <span className="relative flex h-2.5 w-2.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500"></span>
              </span>
              {t[lang].liveSync}
            </div>

            {/* Language Switcher */}
            <div className="bg-blue-900 p-1 rounded-lg flex items-center border border-blue-700 text-xs font-semibold">
              <button 
                onClick={() => setLang('TH')} 
                className={`px-3 py-1 rounded ${lang === 'TH' ? 'bg-blue-600 text-white shadow' : 'text-blue-300 hover:text-white'}`}
              >
                TH
              </button>
              <button 
                onClick={() => setLang('EN')} 
                className={`px-3 py-1 rounded ${lang === 'EN' ? 'bg-blue-600 text-white shadow' : 'text-blue-300 hover:text-white'}`}
              >
                EN
              </button>
            </div>
          </div>
        </div>

        {/* MAIN NAVIGATION BAR */}
        <nav className="bg-[#001E35] border-t border-blue-900 px-4 overflow-x-auto">
          <div className="max-w-7xl mx-auto flex gap-1 py-2 text-sm whitespace-nowrap">
            {[
              { id: 'dashboard', label: t[lang].menu.dashboard, icon: LayoutDashboard },
              { id: 'floors', label: t[lang].menu.floors, icon: Layers },
              { id: 'inspections', label: t[lang].menu.inspections, icon: ClipboardCheck, highlight: true },
              { id: 'records', label: t[lang].menu.records, icon: FileCheck },
              { id: 'documents', label: t[lang].menu.documents, icon: FolderTree },
              { id: 'ai', label: t[lang].menu.ai, icon: Bot },
              { id: 'handover', label: t[lang].menu.handover, icon: CheckCircle2 }
            ].map((tab) => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-all ${
                    tab.highlight 
                      ? 'bg-blue-600 text-white shadow-lg shadow-blue-900/50 ring-2 ring-blue-400' 
                      : isActive 
                        ? 'bg-blue-800 text-white' 
                        : 'text-slate-300 hover:bg-blue-900/50 hover:text-white'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  {tab.label}
                </button>
              );
            })}
          </div>
        </nav>
      </header>

      {/* MAIN CONTAINER CONTENT */}
      <main className="flex-1 max-w-7xl w-full mx-auto p-4 md:p-6">
        
        {/* --- PAGE 1: EXECUTIVE DASHBOARD --- */}
        {activeTab === 'dashboard' && (
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-xl font-bold text-slate-900">{t[lang].menu.dashboard}</h2>
              <span className="text-xs text-slate-500 bg-white px-3 py-1 rounded-full border shadow-sm">
                Boutique Bangkok Sukhumvit 5 Hotel
              </span>
            </div>

            {/* Summary Cards */}
            <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
              {[
                { title: 'Total Rooms', val: '158', color: 'border-slate-300 bg-white text-slate-800' },
                { title: 'Passed Rooms', val: '124', color: 'border-emerald-300 bg-emerald-50 text-emerald-800' },
                { title: 'Failed Rooms', val: '6', color: 'border-rose-300 bg-rose-50 text-rose-800' },
                { title: 'Ready For Inspection', val: '18', color: 'border-blue-300 bg-blue-50 text-blue-800' },
                { title: 'Not Submitted', val: '10', color: 'border-slate-300 bg-slate-50 text-slate-600' },
              ].map((card, idx) => (
                <div key={idx} className={`p-4 rounded-xl border shadow-sm ${card.color}`}>
                  <p className="text-xs font-semibold opacity-80">{card.title}</p>
                  <p className="text-2xl font-bold mt-1">{card.val}</p>
                </div>
              ))}
            </div>

            {/* Critical Defect Rooms Alert Box */}
            <div className="bg-white rounded-xl p-5 border border-rose-200 shadow-sm">
              <div className="flex items-center gap-2 text-rose-600 font-bold mb-3">
                <ShieldAlert className="w-5 h-5" />
                <h3>Critical Rooms / ห้องที่ต้องแก้ไขเร่งด่วน</h3>
              </div>
              <div className="grid md:grid-cols-3 gap-4">
                {[
                  { room: 'Room 801', issue: 'Missing Mix Valve (ขัดข้องระบบน้ำ)', floor: 'Floor 8', status: 'Failed' },
                  { room: 'Room 613', issue: 'Plumbing Leak (ท่อน้ำรั่วซึม)', floor: 'Floor 6', status: 'Failed' },
                  { room: 'Room 706', issue: 'Ceiling Defect (โครงฝ้าไม่ได้ระดับ)', floor: 'Floor 7', status: 'Failed' }
                ].map((crit, idx) => (
                  <div key={idx} className="bg-rose-50/50 p-3.5 rounded-lg border border-rose-100 flex justify-between items-center">
                    <div>
                      <span className="font-bold text-rose-900">{crit.room}</span>
                      <p className="text-xs text-rose-700 mt-0.5">{crit.issue}</p>
                      <span className="text-[10px] bg-rose-200 text-rose-800 px-2 py-0.5 rounded mt-1 inline-block">{crit.floor}</span>
                    </div>
                    <button 
                      onClick={() => { setSelectedRoom(crit.room.replace('Room ', '')); setSelectedFloor(crit.floor.replace('Floor ', '')); setActiveTab('records'); }}
                      className="bg-white text-rose-600 hover:bg-rose-600 hover:text-white p-2 rounded-lg border border-rose-200 transition text-xs font-semibold shadow-sm"
                    >
                      Inspect
                    </button>
                  </div>
                ))}
              </div>
            </div>

            {/* Charts & Breakdown Grid */}
            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-white p-5 rounded-xl border shadow-sm">
                <h3 className="font-bold text-slate-800 mb-4">Inspection Result Summary (Passed vs Failed)</h3>
                <div className="space-y-3">
                  <div>
                    <div className="flex justify-between text-sm mb-1 font-medium"><span>Passed (88%)</span><span className="text-emerald-600">124 Rooms</span></div>
                    <div className="w-full bg-slate-100 h-3 rounded-full overflow-hidden"><div className="bg-emerald-500 h-full w-[88%]"></div></div>
                  </div>
                  <div>
                    <div className="flex justify-between text-sm mb-1 font-medium"><span>Failed (4%)</span><span className="text-rose-600">6 Rooms</span></div>
                    <div className="w-full bg-slate-100 h-3 rounded-full overflow-hidden"><div className="bg-rose-500 h-full w-[4%]"></div></div>
                  </div>
                  <div>
                    <div className="flex justify-between text-sm mb-1 font-medium"><span>Ready For Inspection (8%)</span><span className="text-blue-600">18 Rooms</span></div>
                    <div className="w-full bg-slate-100 h-3 rounded-full overflow-hidden"><div className="bg-blue-500 h-full w-[8%]"></div></div>
                  </div>
                </div>
              </div>

              <div className="bg-white p-5 rounded-xl border shadow-sm flex flex-col justify-between">
                <div>
                  <h3 className="font-bold text-slate-800 mb-2">Platform Focus Statement</h3>
                  <p className="text-sm text-slate-600 leading-relaxed">
                    ระบบนี้มุ่งเน้นการติดตามสถานะการตรวจงาน (Inspection Status), ประวัติหลักฐาน (Evidence & History), และความพร้อมในการส่งมอบพื้นที่ (Handover Readiness) โดย<strong>ไม่มีการบันทึกเปอร์เซ็นต์ความคืบหน้า (Progress %)</strong> เพื่อความแม่นยำสูงสุดในการควบคุมคุณภาพงานก่อสร้าง Main Contractor
                  </p>
                </div>
                <div className="mt-4 pt-4 border-t flex justify-between items-center text-xs text-slate-500">
                  <span>Standard: Syntec Quality Control</span>
                  <button onClick={() => setActiveTab('floors')} className="text-blue-600 font-semibold hover:underline flex items-center gap-1">
                    View Floor Status <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* --- PAGE 2: FLOOR STATUS VIEW --- */}
        {activeTab === 'floors' && (
          <div className="space-y-6">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
              <div>
                <h2 className="text-xl font-bold text-slate-900">{t[lang].menu.floors}</h2>
                <p className="text-xs text-slate-500">Select floor to review room inspection status color codes (Reference Floor 3 layout).</p>
              </div>
              
              {/* Floor Tabs 1-8 */}
              <div className="flex bg-white p-1 rounded-xl border shadow-sm overflow-x-auto max-w-full">
                {['8', '7', '6', '5', '4', '3', '2', '1'].map((fl) => (
                  <button
                    key={fl}
                    onClick={() => setSelectedFloor(fl)}
                    className={`px-4 py-2 rounded-lg text-sm font-bold transition ${selectedFloor === fl ? 'bg-[#002B49] text-white shadow' : 'text-slate-600 hover:bg-slate-100'}`}
                  >
                    Floor {fl}
                  </button>
                ))}
              </div>
            </div>

            {/* Legend */}
            <div className="bg-white p-3 rounded-xl border shadow-sm flex flex-wrap gap-4 items-center text-xs font-semibold">
              <span className="text-slate-500 font-bold">Legend:</span>
              <div className="flex items-center gap-1.5"><span className="w-3.5 h-3.5 bg-emerald-500 rounded"></span> Passed (ผ่าน)</div>
              <div className="flex items-center gap-1.5"><span className="w-3.5 h-3.5 bg-rose-500 rounded"></span> Failed (ไม่ผ่าน)</div>
              <div className="flex items-center gap-1.5"><span className="w-3.5 h-3.5 bg-blue-500 rounded"></span> Ready (พร้อมตรวจ)</div>
              <div className="flex items-center gap-1.5"><span className="w-3.5 h-3.5 bg-slate-300 rounded"></span> Not Submitted (ยังไม่ส่ง)</div>
            </div>

            {/* Floor Room Grid */}
            <div className="bg-white p-6 rounded-xl border shadow-sm">
              <div className="flex justify-between items-center mb-4">
                <h3 className="font-bold text-slate-800 text-lg">Floor {selectedFloor} Room Arrangement Map</h3>
                <span className="text-xs bg-blue-50 text-blue-700 px-3 py-1 rounded-full border border-blue-200">
                  Total Rooms on Floor: {roomDatabase[selectedFloor]?.length || 0} Units
                </span>
              </div>

              {selectedFloor === '3' && (
                <div className="mb-4 bg-amber-50 border border-amber-200 p-3 rounded-lg text-xs text-amber-800 flex items-center gap-2">
                  <AlertTriangle className="w-4 h-4 flex-shrink-0" />
                  <span>Showing Floor 3 layout mapped with engineering drawing reference ID00428-A2-06 (North & South Wing Corridor configuration).</span>
                </div>
              )}

              <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8 gap-3">
                {(roomDatabase[selectedFloor] || []).map((room) => {
                  const colorClass = getStatusColor(room.status);
                  return (
                    <button
                      key={room.id}
                      onClick={() => { setSelectedRoom(room.id); setActiveTab('records'); }}
                      className={`p-3 rounded-xl border flex flex-col items-center justify-center transition-all hover:scale-105 shadow-sm ${colorClass}`}
                    >
                      <span className="text-lg font-black">{room.id}</span>
                      <span className="text-[10px] opacity-90 uppercase mt-0.5">Type {room.type}</span>
                      <span className="text-[9px] mt-1 bg-black/20 px-1.5 py-0.5 rounded font-medium">{room.status}</span>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        )}

        {/* --- PAGE 3 & 4: ROOM INSPECTIONS & INSPECTION RECORDS (SPLIT VIEW) --- */}
        {activeTab === 'records' && (
          <div className="space-y-6">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 bg-white p-4 rounded-xl border shadow-sm">
              <div>
                <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2">
                  Room Inspection Records & Details: Room {selectedRoom}
                </h2>
                <p className="text-xs text-slate-500">Floor {selectedFloor} | Boutique Bangkok Sukhumvit 5 Hotel</p>
              </div>

              {/* Room Quick Switcher */}
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold text-slate-600">Select Room:</span>
                <select 
                  value={selectedRoom} 
                  onChange={(e) => setSelectedRoom(e.target.value)}
                  className="bg-slate-50 border border-slate-300 rounded-lg px-3 py-1.5 text-sm font-semibold focus:ring-2 focus:ring-blue-500"
                >
                  {(roomDatabase[selectedFloor] || roomDatabase['8']).map(r => (
                    <option key={r.id} value={r.id}>Room {r.id} (Type {r.type}) - {r.status}</option>
                  ))}
                </select>
              </div>
            </div>

            {/* SPLIT VIEW LAYOUT */}
            <div className="grid lg:grid-cols-12 gap-6">
              
              {/* LEFT SIDE: Interactive 2D Room Plan View */}
              <div className="lg:col-span-5 bg-white p-5 rounded-xl border shadow-sm flex flex-col">
                <h3 className="font-bold text-slate-800 mb-3 flex items-center gap-2">
                  <Layers className="w-4 h-4 text-blue-600" />
                  Interactive 2D Room Layout View
                </h3>
                <p className="text-xs text-slate-500 mb-4">Click specific room zones to filter checklist items.</p>

                {/* Simulated 2D Architectural Room Box Layout */}
                <div className="bg-slate-900 p-4 rounded-xl flex-1 min-h-[320px] flex flex-col gap-3 relative text-white border-2 border-slate-700">
                  <div className="absolute top-2 right-2 text-[10px] bg-blue-600 px-2 py-0.5 rounded uppercase font-bold">
                    Room {selectedRoom} Map
                  </div>

                  <div className="grid grid-cols-2 gap-3 flex-1">
                    {/* Entrance */}
                    <button 
                      onClick={() => setSelectedZone('Entrance')}
                      className={`p-3 rounded-lg border-2 flex flex-col justify-between transition ${selectedZone === 'Entrance' ? 'ring-2 ring-white' : ''} ${selectedRoom === '801' ? 'bg-emerald-600/80 border-emerald-400' : 'bg-slate-800 border-slate-600'}`}
                    >
                      <span className="text-xs font-bold">Entrance (ทางเข้า)</span>
                      <span className="text-[10px] bg-black/30 px-2 py-0.5 rounded w-max">Passed</span>
                    </button>

                    {/* Bathroom */}
                    <button 
                      onClick={() => setSelectedZone('Bathroom')}
                      className={`p-3 rounded-lg border-2 flex flex-col justify-between transition ${selectedZone === 'Bathroom' ? 'ring-2 ring-white' : ''} ${selectedRoom === '801' ? 'bg-rose-600/90 border-rose-400 animate-pulse' : 'bg-emerald-600/80 border-emerald-400'}`}
                    >
                      <span className="text-xs font-bold">Bathroom (ห้องน้ำ)</span>
                      <span className="text-[10px] bg-black/30 px-2 py-0.5 rounded w-max">{selectedRoom === '801' ? 'Failed (Mix Valve)' : 'Passed'}</span>
                    </button>
                  </div>

                  <div className="grid grid-cols-2 gap-3 flex-1">
                    {/* Bedroom */}
                    <button 
                      onClick={() => setSelectedZone('Bedroom')}
                      className={`p-3 rounded-lg border-2 flex flex-col justify-between transition ${selectedZone === 'Bedroom' ? 'ring-2 ring-white' : ''} bg-emerald-600/80 border-emerald-400`}
                    >
                      <span className="text-xs font-bold">Bedroom (ห้องนอน)</span>
                      <span className="text-[10px] bg-black/30 px-2 py-0.5 rounded w-max">Passed</span>
                    </button>

                    {/* Balcony */}
                    <button 
                      onClick={() => setSelectedZone('Balcony')}
                      className={`p-3 rounded-lg border-2 flex flex-col justify-between transition ${selectedZone === 'Balcony' ? 'ring-2 ring-white' : ''} bg-blue-600/80 border-blue-400`}
                    >
                      <span className="text-xs font-bold">Balcony (ระเบียง)</span>
                      <span className="text-[10px] bg-black/30 px-2 py-0.5 rounded w-max">Ready</span>
                    </button>
                  </div>
                </div>

                <div className="mt-4 p-3 bg-slate-50 rounded-lg border text-xs text-slate-600">
                  <span className="font-bold text-slate-800 block mb-1">Active Zone Focus: {selectedZone}</span>
                  Showing inspection items specific to {selectedZone} area of Room {selectedRoom}.
                </div>
              </div>

              {/* RIGHT SIDE: Chronological Inspection Checklist & Timeline */}
              <div className="lg:col-span-7 bg-white p-5 rounded-xl border shadow-sm">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="font-bold text-slate-800 flex items-center gap-2">
                    <ClipboardCheck className="w-4 h-4 text-blue-600" />
                    Inspection Checklist & History Timeline
                  </h3>
                  <span className="text-xs bg-emerald-50 text-emerald-700 px-2.5 py-1 rounded-full font-semibold border border-emerald-200">
                    {selectedRoom === '801' ? 'Status: FAILED' : 'Status: PASSED'}
                  </span>
                </div>

                {/* Timeline list */}
                <div className="space-y-4 max-h-[500px] overflow-y-auto pr-2">
                  
                  {/* Architecture Section */}
                  <div className="border rounded-lg p-3.5 bg-slate-50/50">
                    <h4 className="text-xs font-bold text-blue-900 uppercase tracking-wider mb-2">1. Architecture / งานสถาปัตยกรรม</h4>
                    <div className="space-y-2 text-xs">
                      {[
                        { task: 'ฉาบผนัง (Wall Plastering)', status: 'Passed' },
                        { task: 'สกิมผนังห้องพัก (Skim Coat)', status: 'Passed' },
                        { task: 'ทาสีรองพื้น & สีจริง (Primer & Paint Coat)', status: 'Passed' },
                        { task: 'ปูกระเบื้องห้องน้ำ (Bathroom Tile)', status: 'Passed' },
                        { task: 'ติดตั้งประตูบานหน้าห้องและห้องน้ำ (Doors Installation)', status: 'Passed' }
                      ].map((item, idx) => (
                        <div key={idx} className="flex justify-between items-center bg-white p-2 rounded border shadow-sm">
                          <span className="font-medium text-slate-700">✅ {item.task}</span>
                          <span className="text-[10px] bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded font-bold">Passed</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* MEP Section */}
                  <div className="border rounded-lg p-3.5 bg-slate-50/50">
                    <h4 className="text-xs font-bold text-blue-900 uppercase tracking-wider mb-2">2. MEP / งานระบบสุขาภิบาลและไฟฟ้า</h4>
                    <div className="space-y-2 text-xs">
                      <div className="flex justify-between items-center bg-white p-2 rounded border shadow-sm">
                        <span className="font-medium text-slate-700">
                          {selectedRoom === '801' ? '❌ ติดตั้งสต็อปวาล์ว / Mix Valve' : '✅ ติดตั้งสต็อปวาล์ว / Mix Valve'}
                        </span>
                        <span className={`text-[10px] px-2 py-0.5 rounded font-bold ${selectedRoom === '801' ? 'bg-rose-100 text-rose-800' : 'bg-emerald-100 text-emerald-800'}`}>
                          {selectedRoom === '801' ? 'FAILED (Missing)' : 'Passed'}
                        </span>
                      </div>
                      <div className="flex justify-between items-center bg-white p-2 rounded border shadow-sm">
                        <span className="font-medium text-slate-700">✅ ติดตั้งโถสุขภัณฑ์ & สายชำระ (Toilet & Bidet)</span>
                        <span className="text-[10px] bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded font-bold">Passed</span>
                      </div>
                      <div className="flex justify-between items-center bg-white p-2 rounded border shadow-sm">
                        <span className="font-medium text-slate-700">✅ ติดตั้งท่อร้อยสายไฟ & ทดสอบวงจร (Electrical Conduit)</span>
                        <span className="text-[10px] bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded font-bold">Passed</span>
                      </div>
                    </div>
                  </div>

                  {/* Handover Stage */}
                  <div className="border rounded-lg p-3.5 bg-slate-50/50">
                    <h4 className="text-xs font-bold text-blue-900 uppercase tracking-wider mb-2">3. Handover / การส่งมอบพื้นที่</h4>
                    <div className="space-y-2 text-xs">
                      <div className="flex justify-between items-center bg-white p-2 rounded border shadow-sm">
                        <span className="font-medium text-slate-700">⚠️ ส่งตรวจเปิด End Product (Open Inspection)</span>
                        <span className="text-[10px] bg-blue-100 text-blue-800 px-2 py-0.5 rounded font-bold">Pending</span>
                      </div>
                    </div>
                  </div>

                </div>
              </div>

            </div>
          </div>
        )}

        {/* --- PAGE 5: INSPECTION SUBMISSION FORM --- */}
        {activeTab === 'inspections' && (
          <div className="bg-white p-6 rounded-xl border shadow-sm max-w-4xl mx-auto space-y-6">
            <div className="border-b pb-4">
              <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2">
                <ClipboardCheck className="w-6 h-6 text-blue-600" />
                Inspection Submission Form / แบบฟอร์มส่งตรวจงาน
              </h2>
              <p className="text-xs text-slate-500 mt-1">Fill out inspection details and upload evidence photos with AI verification.</p>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              
              {/* Floor * */}
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Floor / ชั้น <span className="text-rose-500">* Required</span>
                </label>
                <select 
                  value={formFloor} 
                  onChange={(e) => setFormFloor(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-300 rounded-lg p-2.5 text-sm font-medium focus:ring-2 focus:ring-blue-500"
                >
                  {['8', '7', '6', '5', '4', '3', '2', '1'].map(f => <option key={f} value={f}>Floor {f}</option>)}
                </select>
              </div>

              {/* Room Number * */}
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Room Number / หมายเลขห้อง <span className="text-rose-500">* Required</span>
                </label>
                <input 
                  type="text" 
                  value={formRoom}
                  onChange={(e) => setFormRoom(e.target.value)}
                  placeholder="e.g. 801"
                  className="w-full bg-slate-50 border border-slate-300 rounded-lg p-2.5 text-sm font-medium focus:ring-2 focus:ring-blue-500"
                />
              </div>

              {/* Inspection Category * */}
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Inspection Category / หมวดหมู่งาน <span className="text-rose-500">* Required</span>
                </label>
                <select 
                  value={formCategory}
                  onChange={(e) => setFormCategory(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-300 rounded-lg p-2.5 text-sm font-medium focus:ring-2 focus:ring-blue-500"
                >
                  <option value="Architecture">Architecture (งานสถาปัตยกรรม)</option>
                  <option value="MEP">MEP & Plumbing (งานระบบสุขาภิบาล)</option>
                  <option value="Electrical">Electrical (งานไฟฟ้า)</option>
                  <option value="Final Inspection">Final Handover Inspection</option>
                </select>
              </div>

              {/* Inspection Date * */}
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Inspection Date / วันที่ตรวจ <span className="text-rose-500">* Required</span>
                </label>
                <input 
                  type="date" 
                  value={formDate}
                  onChange={(e) => setFormDate(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-300 rounded-lg p-2.5 text-sm font-medium focus:ring-2 focus:ring-blue-500"
                />
              </div>

              {/* Inspector * */}
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Inspector Name / ผู้ตรวจสอบ <span className="text-rose-500">* Required</span>
                </label>
                <input 
                  type="text" 
                  value={formInspector}
                  onChange={(e) => setFormInspector(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-300 rounded-lg p-2.5 text-sm font-medium focus:ring-2 focus:ring-blue-500"
                />
              </div>

              {/* Inspection Status * */}
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Inspection Status / ผลการตรวจ <span className="text-rose-500">* Required</span>
                </label>
                <select 
                  value={formStatus}
                  onChange={(e) => setFormStatus(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-300 rounded-lg p-2.5 text-sm font-bold focus:ring-2 focus:ring-blue-500 text-blue-700"
                >
                  <option value="Ready For Inspection">Ready For Inspection (พร้อมตรวจ)</option>
                  <option value="Passed">Passed (ผ่านการตรวจ)</option>
                  <option value="Failed">Failed (ไม่ผ่านการตรวจ)</option>
                </select>
              </div>

            </div>

            {/* Comments */}
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Comments / Defect Description / ข้อเสนอแนะหรือข้อบกพร่อง</label>
              <textarea 
                rows="3" 
                value={formComments}
                onChange={(e) => setFormComments(e.target.value)}
                placeholder="Enter details if failed or remarks..."
                className="w-full bg-slate-50 border border-slate-300 rounded-lg p-3 text-sm focus:ring-2 focus:ring-blue-500"
              ></textarea>
            </div>

            {/* Attachments & AI Photo Validation */}
            <div className="border-2 border-dashed border-slate-300 rounded-xl p-6 bg-slate-50 text-center space-y-3">
              <Upload className="w-10 h-10 text-slate-400 mx-auto" />
              <div>
                <p className="text-sm font-bold text-slate-700">Attach Photos, PDF, or Digital RI Documents <span className="text-rose-500">*</span></p>
                <p className="text-xs text-slate-500 mt-1">Supports camera capture or file explorer upload (.jpg, .png, .pdf)</p>
              </div>

              <input 
                type="file" 
                multiple 
                onChange={handleFileUpload} 
                className="mx-auto block text-xs text-slate-500 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-xs file:font-bold file:bg-blue-600 file:text-white hover:file:bg-blue-700 cursor-pointer"
              />

              {/* AI Real-time validation alert */}
              {aiValidationResult && (
                <div className="mt-4 bg-emerald-50 border border-emerald-200 p-3 rounded-lg text-left flex items-start gap-3">
                  <Sparkles className="w-5 h-5 text-emerald-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="text-xs font-bold text-emerald-900">{aiValidationResult.message}</p>
                    <p className="text-[11px] text-emerald-700 mt-0.5">Detected Trade: {aiValidationResult.detectedWork} | Confidence: {aiValidationResult.confidence}</p>
                  </div>
                </div>
              )}
            </div>

            {/* Action Buttons with Mandatory Logic */}
            <div className="flex justify-end gap-3 pt-4 border-t">
              <button 
                type="button"
                className="px-5 py-2.5 rounded-lg border border-slate-300 text-slate-700 font-semibold text-sm hover:bg-slate-100 transition"
              >
                {t[lang].common.saveDraft}
              </button>
              
              <button 
                type="button"
                disabled={!isFormValid}
                onClick={() => alert('Inspection Submitted Successfully & Synced to Cloud!')}
                className={`px-6 py-2.5 rounded-lg font-bold text-sm shadow-md transition flex items-center gap-2 ${
                  isFormValid 
                    ? 'bg-blue-600 text-white hover:bg-blue-700 cursor-pointer' 
                    : 'bg-slate-300 text-slate-500 cursor-not-allowed'
                }`}
              >
                {!isFormValid && <AlertTriangle className="w-4 h-4" />}
                {t[lang].common.submit}
              </button>
            </div>
            {!isFormValid && (
              <p className="text-xs text-rose-500 text-right">⚠️ Please fill in all required fields (*) and upload at least one photo evidence to enable Submit.</p>
            )}
          </div>
        )}

        {/* --- PAGE 6: DOCUMENT CENTER --- */}
        {activeTab === 'documents' && (
          <div className="bg-white p-6 rounded-xl border shadow-sm space-y-6">
            <div className="flex justify-between items-center border-b pb-4">
              <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2">
                <FolderTree className="w-6 h-6 text-blue-600" />
                Document Center / ศูนย์รวมเอกสารและรูปภาพ
              </h2>
              <div className="flex gap-2">
                <div className="relative">
                  <Search className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                  <input type="text" placeholder="Search room or file..." className="pl-9 pr-4 py-2 border rounded-lg text-sm bg-slate-50" />
                </div>
              </div>
            </div>

            {/* Directory tree structure preview */}
            <div className="grid md:grid-cols-3 gap-6">
              <div className="border rounded-xl p-4 bg-slate-50">
                <h3 className="font-bold text-slate-800 text-sm mb-3 flex items-center gap-2">
                  <FolderTree className="w-4 h-4 text-blue-600" /> Project Directory
                </h3>
                <ul className="space-y-2 text-xs font-medium text-slate-600">
                  <li className="p-2 bg-blue-50 text-blue-900 rounded font-bold">📂 Boutique Sukhumvit 5 Hotel</li>
                  <li className="pl-4 py-1">📁 Floor 1 - 8 (Master Inventory)</li>
                  <li className="pl-4 py-1">📁 Digital RI Inspection PDFs</li>
                  <li className="pl-4 py-1">📁 Photo Evidence Archives</li>
                </ul>
              </div>

              <div className="md:col-span-2 border rounded-xl p-4">
                <h3 className="font-bold text-slate-800 text-sm mb-3">Recent Uploaded Evidence & Reports</h3>
                <div className="space-y-3">
                  {[
                    { name: 'Room_801_MixValve_Defect.jpg', category: 'MEP Evidence', date: '24 Oct 2026', size: '2.4 MB' },
                    { name: 'RI_Doc_Floor8_Room802.pdf', category: 'Digital RI Record', date: '23 Oct 2026', size: '1.1 MB' },
                    { name: 'Room_613_Plumbing_Check.jpg', category: 'Architecture', date: '21 Oct 2026', size: '3.0 MB' },
                  ].map((doc, idx) => (
                    <div key={idx} className="flex justify-between items-center p-3 border rounded-lg hover:bg-slate-50 transition">
                      <div className="flex items-center gap-3">
                        <FileText className="w-5 h-5 text-blue-600" />
                        <div>
                          <p className="text-xs font-bold text-slate-800">{doc.name}</p>
                          <span className="text-[10px] text-slate-500">{doc.category} • {doc.date}</span>
                        </div>
                      </div>
                      <span className="text-xs bg-slate-100 text-slate-700 px-2 py-1 rounded font-medium">{doc.size}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* --- PAGE 7: AI ASSISTANT --- */}
        {activeTab === 'ai' && (
          <div className="bg-white p-6 rounded-xl border shadow-sm space-y-6">
            <div className="border-b pb-4">
              <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2">
                <Bot className="w-6 h-6 text-blue-600" />
                AI Assistant / ผู้ช่วยอัจฉริยะหน้างาน
              </h2>
              <p className="text-xs text-slate-500 mt-1">AI-powered photo verification, voice-to-text reporting, and automatic inspection summary.</p>
            </div>

            <div className="grid md:grid-cols-3 gap-6">
              
              {/* AI Tool 1 */}
              <div className="border rounded-xl p-5 bg-gradient-to-br from-blue-50/50 to-white flex flex-col justify-between">
                <div>
                  <div className="bg-blue-600 text-white p-2 rounded-lg w-max mb-3"><Sparkles className="w-5 h-5" /></div>
                  <h3 className="font-bold text-slate-800 text-sm">1. Photo Quality Validation</h3>
                  <p className="text-xs text-slate-600 mt-1">Verify if uploaded photos clearly show the installed construction element or defect.</p>
                </div>
                <button onClick={() => alert('AI Photo Model Loaded. Ready to test upload.')} className="mt-4 w-full bg-blue-600 text-white py-2 rounded-lg text-xs font-bold hover:bg-blue-700 transition">
                  Test Photo AI
                </button>
              </div>

              {/* AI Tool 2 */}
              <div className="border rounded-xl p-5 bg-gradient-to-br from-purple-50/50 to-white flex flex-col justify-between">
                <div>
                  <div className="bg-purple-600 text-white p-2 rounded-lg w-max mb-3"><Mic className="w-5 h-5" /></div>
                  <h3 className="font-bold text-slate-800 text-sm">2. Bilingual Voice-to-Text</h3>
                  <p className="text-xs text-slate-600 mt-1">Convert Thai and English voice notes into professional inspection reports instantly.</p>
                </div>
                <button 
                  onClick={() => setIsRecording(!isRecording)} 
                  className={`mt-4 w-full py-2 rounded-lg text-xs font-bold text-white transition ${isRecording ? 'bg-rose-600 animate-pulse' : 'bg-purple-600 hover:bg-purple-700'}`}
                >
                  {isRecording ? 'Listening... (Tap to Stop)' : 'Start Voice Note'}
                </button>
              </div>

              {/* AI Tool 3 */}
              <div className="border rounded-xl p-5 bg-gradient-to-br from-emerald-50/50 to-white flex flex-col justify-between">
                <div>
                  <div className="bg-emerald-600 text-white p-2 rounded-lg w-max mb-3"><Bot className="w-5 h-5" /></div>
                  <h3 className="font-bold text-slate-800 text-sm">3. Automatic Summary Generator</h3>
                  <p className="text-xs text-slate-600 mt-1">Generate AI verdict summaries for failed or passed room inspections.</p>
                </div>
                <div className="mt-4 p-2.5 bg-white rounded border text-[11px] text-slate-700">
                  <strong>Example AI Summary:</strong><br/>
                  Result: <span className="text-rose-600 font-bold">FAILED</span><br/>
                  Reason: Mix Valve not installed.<br/>
                  Recommendation: Resubmit after MEP fix.
                </div>
              </div>

            </div>
          </div>
        )}

        {/* --- PAGE 8: HANDOVER DASHBOARD --- */}
        {activeTab === 'handover' && (
          <div className="space-y-6">
            <div className="flex justify-between items-center bg-white p-4 rounded-xl border shadow-sm">
              <div>
                <h2 className="text-xl font-bold text-slate-900">{t[lang].menu.handover}</h2>
                <p className="text-xs text-slate-500">Area handover readiness control and building heatmaps.</p>
              </div>
              <div className="bg-emerald-50 text-emerald-800 px-4 py-2 rounded-xl border border-emerald-200 font-bold text-sm flex items-center gap-2">
                <CheckCircle2 className="w-5 h-5 text-emerald-600" />
                Handover Status: READY FOR HANDOVER / พร้อมส่งมอบพื้นที่
              </div>
            </div>

            {/* Handover Summary Metrics */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="bg-white p-4 rounded-xl border shadow-sm">
                <p className="text-xs font-bold text-slate-500">Ready For Handover</p>
                <p className="text-2xl font-black text-emerald-600 mt-1">124 Units</p>
              </div>
              <div className="bg-white p-4 rounded-xl border shadow-sm">
                <p className="text-xs font-bold text-slate-500">Pending Inspection</p>
                <p className="text-2xl font-black text-blue-600 mt-1">18 Units</p>
              </div>
              <div className="bg-white p-4 rounded-xl border shadow-sm">
                <p className="text-xs font-bold text-slate-500">Failed Rooms (Rework)</p>
                <p className="text-2xl font-black text-rose-600 mt-1">6 Units</p>
              </div>
              <div className="bg-white p-4 rounded-xl border shadow-sm">
                <p className="text-xs font-bold text-slate-500">Total Building Readiness</p>
                <p className="text-2xl font-black text-slate-800 mt-1">78.5% Units Cleared</p>
              </div>
            </div>

            {/* Floor Summary Handover Table */}
            <div className="bg-white rounded-xl border shadow-sm overflow-hidden">
              <div className="p-4 border-b bg-slate-50 font-bold text-sm text-slate-800">
                Floor Summary & Area Release Status
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-left text-sm">
                  <thead className="bg-slate-100 text-slate-700 text-xs">
                    <tr>
                      <th className="p-3">Floor</th>
                      <th className="p-3">Total Rooms</th>
                      <th className="p-3">Passed</th>
                      <th className="p-3">Failed</th>
                      <th className="p-3">Area Release Status</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y text-xs">
                    {['8', '7', '6', '5', '4', '3', '2', '1'].map((fl, idx) => (
                      <tr key={fl} className="hover:bg-slate-50">
                        <td className="p-3 font-bold">Floor {fl}</td>
                        <td className="p-3">20 Units</td>
                        <td className="p-3 text-emerald-600 font-bold">18</td>
                        <td className="p-3 text-rose-600 font-bold">{fl === '8' ? '1' : fl === '7' ? '1' : '0'}</td>
                        <td className="p-3">
                          <span className="bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded font-bold">Released for Handover</span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

      </main>

      {/* FOOTER */}
      <footer className="bg-white border-t mt-12 py-4 text-center text-xs text-slate-500">
        <p>Digital Inspection & Handover Platform • Boutique Bangkok Sukhumvit 5 Hotel Project • Syntec Construction PCL</p>
      </footer>
    </div>
  );
}