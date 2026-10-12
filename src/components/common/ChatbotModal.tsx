import React, { useState, useRef, useEffect } from 'react';
import {
  MessageSquare,
  X,
  Send,
  Cpu,
  CheckCircle2,
  Sparkles,
  Bot,
  User,
  ArrowRight,
  RefreshCw
} from 'lucide-react';
import { storageService } from '../../services/storage';
import { useToast } from '../../context/ToastContext';

interface ChatbotModalProps {
  isOpen: boolean;
  onClose: () => void;
}

interface ChatMessage {
  id: string;
  sender: 'bot' | 'user';
  text: string;
  time: string;
}

const COURSES_OPTIONS = [
  'Advanced RTL Design & Microarchitecture with Verilog',
  'SystemVerilog & UVM Verification Mastery',
  'SoC Interconnects & Protocols: AXI4, APB, AHB5',
  'Static Timing Analysis (STA), Linting & CDC Signoff',
  'RISC-V 32-bit Core Microarchitecture from Scratch',
  'Complete Silicon RTL-to-GDSII Physical Design Flow',
  'Need Mentor Guidance to Decide'
];

export const ChatbotModal: React.FC<ChatbotModalProps> = ({ isOpen, onClose }) => {
  const { showToast } = useToast();
  const [step, setStep] = useState<number>(1);
  const [inputVal, setInputVal] = useState('');
  const [isCompleted, setIsCompleted] = useState(false);

  // Form State
  const [formData, setFormData] = useState({
    name: '',
    yearOfPassout: '',
    experienceLevel: '',
    courseInterest: '',
    phone: '',
    message: ''
  });

  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'm-0',
      sender: 'bot',
      text: 'Hello! Welcome to Design Silicon VLSI. I am your course advisor assistant. I can help identify the best VLSI learning path for your career and connect you with our technical trainers. What is your full name?',
      time: 'Just now'
    }
  ]);

  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, step]);

  if (!isOpen) return null;

  const handleSend = (overrideText?: string) => {
    const textToSend = (overrideText !== undefined ? overrideText : inputVal).trim();
    if (!textToSend && step !== 6) return;

    const userMsg: ChatMessage = {
      id: `u-${Date.now()}`,
      sender: 'user',
      text: textToSend || '(No question specified)',
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    const newMessages = [...messages, userMsg];
    setMessages(newMessages);
    setInputVal('');

    // Handle steps
    if (step === 1) {
      setFormData(prev => ({ ...prev, name: textToSend }));
      setStep(2);
      setTimeout(() => {
        setMessages(prev => [
          ...prev,
          {
            id: `b-${Date.now()}`,
            sender: 'bot',
            text: `Pleasure to meet you, ${textToSend}! What is your graduation / passout year?`,
            time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
          }
        ]);
      }, 400);
    } else if (step === 2) {
      setFormData(prev => ({ ...prev, yearOfPassout: textToSend }));
      setStep(3);
      setTimeout(() => {
        setMessages(prev => [
          ...prev,
          {
            id: `b-${Date.now()}`,
            sender: 'bot',
            text: 'Are you a fresher, or do you have prior work experience in hardware / software?',
            time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
          }
        ]);
      }, 400);
    } else if (step === 3) {
      setFormData(prev => ({ ...prev, experienceLevel: textToSend }));
      setStep(4);
      setTimeout(() => {
        setMessages(prev => [
          ...prev,
          {
            id: `b-${Date.now()}`,
            sender: 'bot',
            text: 'Which VLSI domain or course are you most interested in?',
            time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
          }
        ]);
      }, 400);
    } else if (step === 4) {
      setFormData(prev => ({ ...prev, courseInterest: textToSend }));
      setStep(5);
      setTimeout(() => {
        setMessages(prev => [
          ...prev,
          {
            id: `b-${Date.now()}`,
            sender: 'bot',
            text: 'Please share your Phone or WhatsApp number so our faculty can share the curriculum PDF and upcoming batch demo schedule.',
            time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
          }
        ]);
      }, 400);
    } else if (step === 5) {
      setFormData(prev => ({ ...prev, phone: textToSend }));
      setStep(6);
      setTimeout(() => {
        setMessages(prev => [
          ...prev,
          {
            id: `b-${Date.now()}`,
            sender: 'bot',
            text: 'Do you have any specific query or question for our trainers? (You can type your message or click Skip)',
            time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
          }
        ]);
      }, 400);
    } else if (step === 6) {
      const finalMsg = textToSend || 'Looking for batch details & guidance.';
      const finalFormData = { ...formData, message: finalMsg };
      setFormData(finalFormData);
      setStep(7);
      setIsCompleted(true);

      // Submit lead to storage
      storageService.submitChatLead({
        name: finalFormData.name,
        yearOfPassout: finalFormData.yearOfPassout,
        experienceLevel: finalFormData.experienceLevel,
        courseInterest: finalFormData.courseInterest,
        phone: finalFormData.phone,
        message: finalMsg,
        conversation: newMessages.map(m => ({
          sender: m.sender,
          text: m.text,
          time: m.time
        }))
      });

      showToast('Lead captured successfully! Admin notified.', 'success');

      setTimeout(() => {
        setMessages(prev => [
          ...prev,
          {
            id: `b-${Date.now()}`,
            sender: 'bot',
            text: 'Thank you! Our Design Silicon VLSI team will contact you shortly with the complete course blueprint and lab setup guidance.',
            time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
          }
        ]);
      }, 400);
    }
  };

  const handleReset = () => {
    setStep(1);
    setIsCompleted(false);
    setFormData({
      name: '',
      yearOfPassout: '',
      experienceLevel: '',
      courseInterest: '',
      phone: '',
      message: ''
    });
    setMessages([
      {
        id: 'm-0',
        sender: 'bot',
        text: 'Hello! Welcome to Design Silicon VLSI. What is your full name?',
        time: 'Just now'
      }
    ]);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-end sm:justify-end p-0 sm:p-6 bg-slate-950/60 backdrop-blur-sm animate-fade-in">
      <div className="w-full sm:w-[440px] h-[92vh] sm:h-[620px] max-h-[92vh] bg-slate-950 border border-sky-500/30 rounded-t-2xl sm:rounded-2xl shadow-2xl flex flex-col overflow-hidden relative">
        {/* Subtle Silicon Grid Background */}
        <div className="absolute inset-0 silicon-grid opacity-20 pointer-events-none" />

        {/* Header */}
        <div className="bg-gradient-to-r from-slate-900 via-slate-900 to-sky-950 p-4 border-b border-sky-500/20 flex items-center justify-between relative z-10">
          <div className="flex items-center gap-3">
            <div className="relative w-9 h-9 rounded-xl bg-gradient-to-br from-sky-400 to-cyan-500 flex items-center justify-center text-slate-950 font-black shadow-md shadow-cyan-500/30">
              <Bot className="w-5 h-5 text-slate-950" />
              <div className="absolute -top-0.5 -right-0.5 w-2.5 h-2.5 bg-emerald-400 rounded-full border-2 border-slate-900 animate-pulse" />
            </div>
            <div>
              <div className="text-sm font-bold text-white flex items-center gap-2">
                <span>VLSI Course Advisor</span>
                <span className="text-[10px] font-mono px-1.5 py-0.2 rounded bg-sky-500/20 text-sky-300 border border-sky-500/30">
                  Lead Assistant
                </span>
              </div>
              <div className="text-[11px] text-slate-400">
                Design Silicon VLSI &bull; Real Time Response
              </div>
            </div>
          </div>

          <div className="flex items-center gap-1">
            <button
              onClick={handleReset}
              className="p-1.5 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 transition"
              title="Restart Conversation"
            >
              <RefreshCw className="w-4 h-4" />
            </button>
            <button
              onClick={onClose}
              className="p-1.5 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 transition"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Step Progress Pill */}
        <div className="bg-slate-900/90 border-b border-slate-800 px-4 py-2 flex items-center justify-between text-xs font-mono text-slate-400 z-10">
          <span>{isCompleted ? 'Submission Complete' : `Step ${step} of 6`}</span>
          <div className="w-32 bg-slate-800 rounded-full h-1.5 overflow-hidden">
            <div
              className="bg-cyan-400 h-full transition-all duration-300"
              style={{ width: `${isCompleted ? 100 : (step / 6) * 100}%` }}
            />
          </div>
        </div>

        {/* Chat Messages Body */}
        <div className="flex-1 overflow-y-auto p-4 space-y-3 relative z-10">
          {messages.map((msg) => (
            <div
              key={msg.id}
              className={`flex items-start gap-2.5 ${
                msg.sender === 'user' ? 'flex-row-reverse' : ''
              }`}
            >
              <div
                className={`w-7 h-7 rounded-lg flex items-center justify-center shrink-0 text-xs ${
                  msg.sender === 'user'
                    ? 'bg-sky-500 text-slate-950 font-bold'
                    : 'bg-slate-800 border border-sky-500/30 text-cyan-400'
                }`}
              >
                {msg.sender === 'user' ? <User className="w-4 h-4" /> : <Bot className="w-4 h-4" />}
              </div>

              <div
                className={`max-w-[80%] rounded-2xl p-3 text-xs leading-relaxed ${
                  msg.sender === 'user'
                    ? 'bg-sky-600 text-white rounded-tr-none'
                    : 'bg-slate-900/90 border border-slate-800 text-slate-200 rounded-tl-none shadow-md'
                }`}
              >
                <div className="whitespace-pre-wrap">{msg.text}</div>
                <div
                  className={`text-[9px] mt-1 text-right ${
                    msg.sender === 'user' ? 'text-sky-200' : 'text-slate-500'
                  }`}
                >
                  {msg.time}
                </div>
              </div>
            </div>
          ))}

          {/* Quick Option Buttons for Steps */}
          {!isCompleted && step === 2 && (
            <div className="flex flex-wrap gap-1.5 pt-1 pl-9">
              {['2027', '2026', '2025', '2024', '2023 or Earlier'].map((yr) => (
                <button
                  key={yr}
                  onClick={() => handleSend(yr)}
                  className="px-2.5 py-1 text-xs bg-slate-900 border border-sky-500/40 hover:border-cyan-400 text-cyan-300 rounded-lg hover:bg-sky-950 transition"
                >
                  {yr}
                </button>
              ))}
            </div>
          )}

          {!isCompleted && step === 3 && (
            <div className="flex flex-wrap gap-1.5 pt-1 pl-9">
              {['Fresher (No experience)', '1-2 Years Experience', '3+ Years Experience'].map((lvl) => (
                <button
                  key={lvl}
                  onClick={() => handleSend(lvl)}
                  className="px-2.5 py-1 text-xs bg-slate-900 border border-sky-500/40 hover:border-cyan-400 text-cyan-300 rounded-lg hover:bg-sky-950 transition"
                >
                  {lvl}
                </button>
              ))}
            </div>
          )}

          {!isCompleted && step === 4 && (
            <div className="flex flex-col gap-1.5 pt-1 pl-9">
              {COURSES_OPTIONS.map((c) => (
                <button
                  key={c}
                  onClick={() => handleSend(c)}
                  className="text-left px-2.5 py-1.5 text-xs bg-slate-900 border border-slate-800 hover:border-cyan-400 text-slate-300 hover:text-white rounded-lg hover:bg-slate-850 transition"
                >
                  &bull; {c}
                </button>
              ))}
            </div>
          )}

          {isCompleted && (
            <div className="bg-emerald-950/40 border border-emerald-500/40 rounded-xl p-3.5 text-center text-xs text-emerald-200 space-y-1.5">
              <CheckCircle2 className="w-6 h-6 text-emerald-400 mx-auto" />
              <div className="font-semibold text-emerald-300">Lead Record Created</div>
              <p className="text-[11px] text-slate-300">
                Our admissions advisor has received your request and will reach out via WhatsApp/Call at{' '}
                <span className="font-mono text-cyan-300">{formData.phone}</span>.
              </p>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* Input Bar */}
        <div className="p-3 bg-slate-900/95 border-t border-slate-800 relative z-10">
          {!isCompleted ? (
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSend();
              }}
              className="flex items-center gap-2"
            >
              <input
                type={step === 5 ? 'tel' : 'text'}
                placeholder={
                  step === 1
                    ? 'Type your full name...'
                    : step === 2
                    ? 'E.g. 2025, 2026...'
                    : step === 3
                    ? 'Fresher or experienced...'
                    : step === 4
                    ? 'Type course name or click above...'
                    : step === 5
                    ? 'Enter 10-digit mobile number...'
                    : 'Any question (or press Enter to skip)...'
                }
                value={inputVal}
                onChange={(e) => setInputVal(e.target.value)}
                autoFocus
                className="flex-1 bg-slate-950 border border-slate-700 focus:border-cyan-400 rounded-xl px-3.5 py-2 text-xs text-slate-100 placeholder-slate-500 focus:outline-none"
              />

              {step === 6 && (
                <button
                  type="button"
                  onClick={() => handleSend('No additional message')}
                  className="px-2.5 py-2 text-xs text-slate-400 hover:text-white bg-slate-800 rounded-xl"
                >
                  Skip
                </button>
              )}

              <button
                type="submit"
                className="p-2.5 rounded-xl bg-gradient-to-r from-sky-500 to-cyan-500 text-slate-950 font-bold hover:brightness-110 transition shadow-md shadow-cyan-500/20"
              >
                <Send className="w-4 h-4" />
              </button>
            </form>
          ) : (
            <div className="flex items-center justify-between text-xs text-slate-400">
              <span>Ready for another inquiry?</span>
              <button
                onClick={handleReset}
                className="text-cyan-400 hover:underline font-medium"
              >
                Start New Chat
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
