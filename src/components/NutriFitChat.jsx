import { useContext, useEffect, useRef, useState } from 'react';
import { AppContext } from '../AppContext';
import { getNutriFitAiResponse, formatAssistantMessage } from '../lib/nutrifitAi';
import '../pages/nutrifit.css';

function MessageContent({ text }) {
  const lines = formatAssistantMessage(text);
  return (
    <>
      {lines.map(line => (
        <div key={line.key} style={{ marginBottom: line.parts.some(p => p.text.trim()) ? 4 : 0 }}>
          {line.parts.map(part =>
            part.bold
              ? <strong key={part.key}>{part.text}</strong>
              : <span key={part.key}>{part.text}</span>,
          )}
        </div>
      ))}
    </>
  );
}

function AssistantAvatar() {
  return (
    <div className="nf-chat-avatar" aria-hidden>
      N
    </div>
  );
}

export default function NutriFitChat({ labels, initialMessage, onInitialMessageSent }) {
  const { lang } = useContext(AppContext);
  const [messages, setMessages] = useState([
    { role: 'assistant', text: labels.welcome },
  ]);
  const [input, setInput] = useState('');
  const [typing, setTyping] = useState(false);
  const bottomRef = useRef(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, typing]);

  const sendText = async text => {
    if (!text || typing) return;

    const history = [...messages.slice(1), { role: 'user', text }];
    setMessages(prev => [...prev, { role: 'user', text }]);
    setTyping(true);

    try {
      const reply = await getNutriFitAiResponse(history, lang);
      setMessages(prev => [...prev, { role: 'assistant', text: reply }]);
    } catch (err) {
      const fallback = err instanceof Error ? err.message : labels.errorGeneric;
      setMessages(prev => [...prev, { role: 'assistant', text: fallback }]);
    } finally {
      setTyping(false);
    }
  };

  useEffect(() => {
    if (!initialMessage) return;
    onInitialMessageSent?.();
    sendText(initialMessage);
  }, [initialMessage]);

  const send = async e => {
    e.preventDefault();
    const text = input.trim();
    if (!text || typing) return;
    setInput('');
    await sendText(text);
  };

  const handleSuggestion = async prompt => {
    if (typing) return;
    await sendText(prompt);
  };

  return (
    <div className="nf-chat-panel">
      <div className="nf-chat-head">
        <div className="nf-chat-brand">
          <AssistantAvatar />
          <div>
            <h2 className="nf-chat-title">{labels.title}</h2>
            <p className="nf-chat-desc">{labels.desc}</p>
          </div>
        </div>
      </div>

      <div className="nf-chat-box">
        <div className="nf-chat-bar">
          <AssistantAvatar />
          <div>
            <div className="nf-chat-bar-name">{labels.assistantName}</div>
            <div className="nf-chat-bar-status">
              <span className="nf-status-dot" />
              {labels.status}
            </div>
          </div>
        </div>

        <div className="nf-chat-messages">
          {messages.map((msg, i) => (
            <div
              key={i}
              className={`nf-msg-row nf-msg-row--${msg.role === 'user' ? 'user' : 'ai'}`}
            >
              {msg.role === 'assistant' && <AssistantAvatar />}
              <div className={`nf-bubble nf-bubble--${msg.role === 'user' ? 'user' : 'ai'}`}>
                <div className={msg.role === 'user' ? 'nf-badge--user' : 'nf-badge--ai'}>
                  {msg.role === 'user' ? labels.userLabel : labels.assistantName}
                </div>
                <MessageContent text={msg.text} />
              </div>
            </div>
          ))}

          {typing && (
            <div className="nf-msg-row nf-msg-row--ai">
              <AssistantAvatar />
              <div className="nf-bubble nf-bubble--ai">
                <div className="nf-badge--ai">{labels.assistantName}</div>
                <div className="nf-typing">
                  <span className="nf-typing-dot" />
                  <span className="nf-typing-dot" style={{ animationDelay: '.15s' }} />
                  <span className="nf-typing-dot" style={{ animationDelay: '.3s' }} />
                </div>
              </div>
            </div>
          )}
          <div ref={bottomRef} />
        </div>

        <div className="nf-suggestions">
          <span className="nf-suggestions-title">{labels.suggestionsTitle}</span>
          <div className="nf-chip-row">
            {labels.suggestions.map(item => (
              <button
                key={item.label}
                type="button"
                className="nf-chip"
                disabled={typing}
                onClick={() => handleSuggestion(item.prompt)}
              >
                {item.label}
              </button>
            ))}
          </div>
        </div>

        <form onSubmit={send} className="nf-chat-form">
          <input
            className="nf-chat-input"
            value={input}
            onChange={e => setInput(e.target.value)}
            placeholder={labels.placeholder}
            disabled={typing}
          />
          <button type="submit" className="nf-chat-send" disabled={typing || !input.trim()}>
            {labels.send}
          </button>
        </form>
      </div>

      <p className="nf-chat-disclaimer">{labels.disclaimer}</p>
    </div>
  );
}
