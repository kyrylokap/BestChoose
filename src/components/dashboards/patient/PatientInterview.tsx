import { patientInterview } from "@/data/dashboard-data";
import { ArrowLeft, Bot, Send } from "lucide-react";
import { useState } from "react";

type ChatMessage = {
  id: string;
  author: "ai" | "user";
  text: string;
  time: string;
};

type Props = {
  onBack: () => void;
};



export default function PatientInterview({ onBack }: Props) {
  const { chatMessages, chatInput, setChatInput, isResponding, sendMessage } =
    useChatLogic(patientInterview.initialMessages);

  return (
    <section className="flex flex-col overflow-hidden rounded-3xl bg-white shadow-sm ring-1 ring-slate-100 h-[600px]">
      <ChatHeader onBack={onBack} title={patientInterview.title} />

      <div className="flex-1 flex flex-col gap-4 overflow-y-auto px-6 py-6 scroll-smooth">
        {chatMessages.map((msg) => (
          <MessageBubble key={msg.id} message={msg} />
        ))}

        {isResponding && (
          <div className="flex items-center gap-2 rounded-2xl bg-slate-50 px-4 py-2 text-xs text-slate-500 self-start animate-pulse">
            AI is analyzing the response...
          </div>
        )}
      </div>

      <ChatInputArea
        value={chatInput}
        onChange={setChatInput}
        onSend={sendMessage} 
        placeholder={patientInterview.inputPlaceholder}
      />
    </section>
  );
}


function useChatLogic(initialMessages: ChatMessage[]) {
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>(initialMessages);
  const [chatInput, setChatInput] = useState("");
  const [isResponding, setIsResponding] = useState(false);

  const sendMessage = () => {
    if (!chatInput.trim()) return;

    const userMsg: ChatMessage = {
      id: Date.now().toString(),
      author: "user",
      text: chatInput.trim(),
      time: new Date().toLocaleTimeString("pl-PL", {
        hour: "2-digit",
        minute: "2-digit",
      }),
    };

    setChatMessages((prev) => [...prev, userMsg]);
    setChatInput("");
    setIsResponding(true);

    setTimeout(() => {
      const aiMsg: ChatMessage = {
        id: (Date.now() + 1).toString(),
        author: "ai",
        text: "Thank you for the information. Are there any additional symptoms, such as fever or cough?",
        time: new Date().toLocaleTimeString("pl-PL", {
          hour: "2-digit",
          minute: "2-digit",
        }),
      };
      setChatMessages((prev) => [...prev, aiMsg]);
      setIsResponding(false); 
    }, 1200);
  };

  return {
    chatMessages,
    chatInput,
    setChatInput, 
    isResponding,
    sendMessage, 
  };
}


const ChatHeader = ({ onBack, title }: { onBack: () => void; title: string }) => (
  <header className="flex items-center gap-4 border-b border-slate-100 px-6 py-4">
    <button
      onClick={onBack}
      className="rounded-full p-2 text-slate-500 hover:bg-slate-100 transition"
    >
      <ArrowLeft className="h-5 w-5" />
    </button>
    <div className="flex h-12 w-12 items-center justify-center rounded-full bg-blue-100 text-blue-600">
      <Bot className="h-6 w-6" />
    </div>
    <div>
      <p className="text-sm text-slate-500">Medical History</p>
      <h3 className="text-lg font-semibold text-slate-900">{title}</h3>
    </div>
  </header>
);

const MessageBubble = ({ message }: { message: ChatMessage }) => {
  const isUser = message.author === "user";
  return (
    <div className={`flex ${isUser ? "justify-end" : "justify-start"}`}>
      <div
        className={`max-w-lg rounded-3xl px-5 py-3 text-sm ${
          isUser ? "bg-blue-600 text-white" : "bg-slate-100 text-slate-800"
        }`}
      >
        <p>{message.text}</p>
        <span
          className={`mt-2 block text-xs ${
            isUser ? "text-white/70" : "text-slate-500"
          }`}
        >
          {message.time}
        </span>
      </div>
    </div>
  );
};

const ChatInputArea = ({
  value,
  onChange,
  onSend,
  placeholder,
}: {
  value: string;
  onChange: (val: string) => void;
  onSend: () => void;
  placeholder: string;
}) => (
  <div className="border-t border-slate-100 bg-slate-50/60 px-6 py-4">
    <div className="flex items-center gap-3 rounded-2xl bg-white px-4 shadow-sm ring-1 ring-slate-100">
      <input
        className="flex-1 border-none bg-transparent py-3 text-sm outline-none placeholder:text-slate-400 text-slate-900"
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            e.preventDefault();
            onSend();
          }
        }}
      />
      <button
        onClick={onSend}
        disabled={!value.trim()}
        className="rounded-xl bg-blue-600 p-2 text-white transition hover:bg-blue-700 disabled:bg-slate-300"
      >
        <Send className="h-5 w-5" />
      </button>
    </div>
  </div>
);

