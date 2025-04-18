import { useState } from 'react';
import { motion } from 'framer-motion';

const MODES = ["Residential","Commercial","Tender","Insurance"];
const questions = [
  "How many rooms or zones do you need coverage for?",
  "Do you prefer ceiling or wall‑mounted speakers?",
  "Would you like Bluetooth streaming capability?",
  "Any preferred brands or budget range?"
];

export default function AudicoQuoteWidget() {
  const [mode, setMode] = useState("Residential");
  const [messages, setMessages] = useState([{ sender:"ai", text:"Hi! Let's start building your quote. What would you like help with today?" }]);
  const [input, setInput] = useState("");
  const [step, setStep] = useState(0);

  const handleSend = () => {
    if (!input.trim()) return;
    setMessages(m=>[...m,{ sender:"user", text:input }]);
    setInput("");
    const next = step+1;
    setStep(next);
    setTimeout(()=>{
      const text = next < questions.length
        ? questions[next]
        : "Great—I've added items to your quote on the right. Feel free to review!";
      setMessages(m=>[...m,{ sender:"ai", text }]);
    },300);
  };

  return (
    <div className="max-w-6xl mx-auto p-6 grid grid-cols-1 md:grid-cols-3 gap-6 font-sans">
      {/* CHAT AREA */}
      <div className="md:col-span-2 bg-white rounded-2xl shadow-lg flex flex-col h-[600px]">
        {/* Mode Tabs */}
        <div className="flex gap-3 p-4 border-b">
          {MODES.map(m=>(
            <button
              key={m}
              onClick={()=>setMode(m)}
              className={`px-4 py-2 rounded-full transition ${
                m===mode
                  ? "bg-blue-600 text-white"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
            >
              {m}
            </button>
          ))}
        </div>

        {/* Messages */}
        <div className="flex-1 p-6 overflow-y-auto space-y-4 bg-gray-50">
          {messages.map((msg,i)=>(
            <motion.div
              key={i}
              initial={{opacity:0, y:20}}
              animate={{opacity:1, y:0}}
              transition={{duration:0.25}}
              className={`max-w-[75%] p-4 rounded-xl shadow-md ${
                msg.sender==="ai"
                  ? "bg-blue-50 text-gray-900 rounded-bl-none"
                  : "bg-green-50 text-gray-900 self-end rounded-br-none"
              }`}
            >
              {msg.text}
            </motion.div>
          ))}
        </div>

        {/* Input */}
        <div className="border-t p-4 flex items-center">
          <input
            className="flex-1 border border-gray-300 rounded-l-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
            placeholder="Type your answer…"
            value={input}
            onChange={e=>setInput(e.target.value)}
            onKeyDown={e=>e.key==="Enter"&&handleSend()}
          />
          <button
            onClick={handleSend}
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-r-lg font-semibold transition"
          >
            Send
          </button>
        </div>
      </div>

      {/* QUOTE PANEL */}
      <div className="bg-white rounded-2xl shadow-lg p-6 h-[600px] overflow-y-auto">
        <h3 className="text-2xl font-bold mb-4">Your Quote</h3>
        <ul className="space-y-3">
          {/* Example placeholders */}
          <li className="flex justify-between">
            <span>Example Product 1</span><span>R1,799</span>
          </li>
          <li className="flex justify-between">
            <span>Example Product 2</span><span>R6,999</span>
          </li>
        </ul>
        <div className="mt-4 border-t pt-4 flex justify-between font-semibold">
          <span>Subtotal</span><span>R8,798</span>
        </div>
      </div>
    </div>
  );
}
