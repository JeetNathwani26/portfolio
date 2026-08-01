# Chatbot Module - UI Component Specification

## Objective

Create a reusable **Chatbot** component that can be added to the existing application. The component should provide a modern chat interface and be easy to integrate with future AI providers.

---

# Component Name

`Chatbot`

---

# Location

```
resources/js/components/chatbot/
```

or

```
resources/views/components/chatbot/
```

(Use the project's existing UI architecture.)

---

# Features

## 1. Floating Chat Button

Display a floating button in the bottom-right corner.

Requirements:

- Fixed position
- Circular button
- Chat icon
- Opens/closes chatbot
- Smooth animation

---

## 2. Chat Window

When opened, display a chat window.

Header

- Bot Avatar
- Title
- Online status
- Close button

Example

```
🤖 AI Assistant

Online
```

---

## 3. Message Area

Scrollable message container.

Support two message types:

### User Message

- Right aligned
- Primary color bubble

### Bot Message

- Left aligned
- Neutral bubble
- Avatar

---

## 4. Input Area

Bottom input section containing

- Text input
- Send button

Pressing **Enter** should send the message.

---

## 5. Loading State

While waiting for a response

Display

```
Typing...
```

or animated three dots.

---

## 6. Empty State

When no conversation exists

Display

```
Hi 👋

How can I help you today?
```

---

## UI Layout

```
 -------------------------------------
| AI Assistant               X        |
|-------------------------------------|
|                                     |
|  🤖 Hello!                          |
|                                     |
|                    Hi               |
|                                     |
|  🤖 How can I help?                 |
|                                     |
|.....................................|
| Type your message...      [Send]    |
 -------------------------------------
```

---

# Responsive Design

Desktop

- Width: 380px
- Height: 600px

Tablet

- Width: 340px

Mobile

- Full width
- Bottom sheet style

---

# States

- Closed
- Open
- Loading
- Empty
- Error

---

# Suggested Component Structure

```
Chatbot
├── ChatButton
├── ChatWindow
├── ChatHeader
├── ChatMessages
├── ChatMessage
├── ChatInput
├── TypingIndicator
└── EmptyState
```

---

# Props (Future Ready)

```ts
messages: Message[]
loading: boolean
placeholder?: string
title?: string
avatar?: string
```

---

# Message Model

```ts
interface Message {
    id: string;
    sender: "user" | "bot";
    text: string;
    timestamp: string;
}
```

---

# UI Guidelines

- Clean and modern design
- Rounded corners
- Soft shadows
- Smooth open/close animations
- Auto-scroll to latest message
- Accessible keyboard navigation
- Dark mode compatible (if supported)

---

# Future Enhancements (Do Not Implement Now)

- File upload
- Voice input
- Markdown rendering
- Code syntax highlighting
- Image messages
- Chat history
- Conversation persistence
- AI model selection
- Streaming responses
- Suggested prompts
- Copy message action
- Regenerate response
- Feedback (👍 / 👎)

---

# Acceptance Criteria

- Floating chatbot button is visible.
- Chat window opens and closes correctly.
- Messages display in separate user/bot styles.
- Input field sends messages on button click and Enter key.
- Loading state is shown while waiting for responses.
- Layout is fully responsive.
- Component is reusable and isolated.
- No backend/API integration is required; use mock data for demonstration.

---

# Deliverables

- Reusable Chatbot UI component
- Responsive design
- Mock conversation data
- Clean, maintainable code
- Ready for future AI API integration
