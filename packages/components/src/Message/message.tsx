import * as React from 'react';
import { createRoot } from 'react-dom/client';
import styles from './message.module.css';
import type {
  InternalMessage,
  MessageConfig,
  MessageInstance,
  MessageType,
} from './types';

function cn(...args: (string | false | undefined | null)[]): string {
  return args.filter(Boolean).join(' ');
}

const SuccessIcon = () => (
  <svg viewBox="64 64 896 896" width="1em" height="1em" fill="currentColor">
    <path d="M512 64C264.6 64 64 264.6 64 512s200.6 448 448 448 448-200.6 448-448S759.4 64 512 64zm193.5 301.7l-210.6 292a31.8 31.8 0 01-51.7 0L318.5 484.9c-3.8-5.3 0-12.7 6.5-12.7h46.9c10.2 0 19.9 4.9 25.9 13.3l71.2 98.8 157.2-218c6-8.3 15.6-13.3 25.9-13.3H699c6.5 0 10.3 7.4 6.5 12.7z" />
  </svg>
);

const ErrorIcon = () => (
  <svg viewBox="64 64 896 896" width="1em" height="1em" fill="currentColor">
    <path d="M512 64C264.6 64 64 264.6 64 512s200.6 448 448 448 448-200.6 448-448S759.4 64 512 64zm165.4 618.2l-66-.3L512 563.4l-99.3 118.4-66.1.3c-4.4 0-8-3.5-8-8 0-1.9.7-3.7 1.9-5.2l130.1-155L340.5 359a8.32 8.32 0 01-1.9-5.2c0-4.4 3.6-8 8-8l66.1.3L512 464.6l99.3-118.4 66-.3c4.4 0 8 3.5 8 8 0 1.9-.7 3.7-1.9 5.2L553.5 514l130 155c1.2 1.5 1.9 3.3 1.9 5.2 0 4.4-3.6 8-8 8z" />
  </svg>
);

const InfoIcon = () => (
  <svg viewBox="64 64 896 896" width="1em" height="1em" fill="currentColor">
    <path d="M512 64C264.6 64 64 264.6 64 512s200.6 448 448 448 448-200.6 448-448S759.4 64 512 64zm32 664h-64V456h64v272zm0-352h-64V312h64v64z" />
  </svg>
);

const WarningIcon = () => (
  <svg viewBox="64 64 896 896" width="1em" height="1em" fill="currentColor">
    <path d="M512 64C264.6 64 64 264.6 64 512s200.6 448 448 448 448-200.6 448-448S759.4 64 512 64zm-32 232h64v272h-64V296zm32 440a48.01 48.01 0 010-96 48.01 48.01 0 010 96z" />
  </svg>
);

const iconMap: Record<MessageType, React.ReactNode> = {
  success: <SuccessIcon />,
  error: <ErrorIcon />,
  info: <InfoIcon />,
  warning: <WarningIcon />,
  loading: <span className={styles.spinner} />,
};

const iconClassMap: Record<MessageType, string> = {
  success: styles.iconSuccess,
  error: styles.iconError,
  info: styles.iconInfo,
  warning: styles.iconWarning,
  loading: styles.iconLoading,
};

let messageContainer: HTMLDivElement | null = null;
let reactRoot: ReturnType<typeof createRoot> | null = null;
let messages: InternalMessage[] = [];
let counter = 0;

function getContainer(): HTMLDivElement {
  if (!messageContainer) {
    messageContainer = document.createElement('div');
    document.body.appendChild(messageContainer);
    reactRoot = createRoot(messageContainer);
  }
  return messageContainer;
}

function renderMessages() {
  getContainer();

  const MessageList: React.FC<{ items: InternalMessage[] }> = ({ items }) => (
    <div className={styles.container}>
      {items.map((msg) => (
        <div key={msg.id} className={styles.notice}>
          <div className={cn(styles.content, msg.className)} style={msg.style}>
            <span className={cn(styles.icon, iconClassMap[msg.type])}>
              {msg.icon ?? iconMap[msg.type]}
            </span>
            <span>{msg.content}</span>
          </div>
        </div>
      ))}
    </div>
  );

  reactRoot?.render(<MessageList items={[...messages]} />);
}

function addMessage(
  type: MessageType,
  config: React.ReactNode | MessageConfig,
  duration?: number,
) {
  const cfg: MessageConfig =
    typeof config === 'object' &&
    config !== null &&
    !React.isValidElement(config)
      ? (config as MessageConfig)
      : { content: config as React.ReactNode };

  const id = cfg.key ?? `tzz-msg-${++counter}`;
  const dur = cfg.duration ?? duration ?? 3;

  const existing = messages.findIndex((m) => m.id === id);
  const msg: InternalMessage = {
    id,
    type,
    content: cfg.content,
    duration: dur,
    icon: cfg.icon,
    className: cfg.className,
    style: cfg.style,
    onClose: cfg.onClose,
  };

  if (existing >= 0) {
    messages[existing] = msg;
  } else {
    messages.push(msg);
  }
  renderMessages();

  if (dur > 0) {
    setTimeout(() => {
      removeMessage(id); // eslint-disable-line
    }, dur * 1000);
  }
}

function removeMessage(id: string) {
  const idx = messages.findIndex((m) => m.id === id);
  if (idx >= 0) {
    const msg = messages[idx];
    messages.splice(idx, 1);
    renderMessages();
    msg.onClose?.();
  }
}

function destroyAll(key?: string) {
  if (key) {
    removeMessage(key);
  } else {
    messages = [];
    renderMessages();
  }
}

export const message: MessageInstance = {
  info: (content, duration) => addMessage('info', content, duration),
  success: (content, duration) => addMessage('success', content, duration),
  error: (content, duration) => addMessage('error', content, duration),
  warning: (content, duration) => addMessage('warning', content, duration),
  loading: (content, duration) => addMessage('loading', content, duration),
  destroy: destroyAll,
};
