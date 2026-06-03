const STORAGE_KEY = 'apetiflow-speech-enabled'

const queue: string[] = []
let isSpeaking = false

export function isSpeechSupported(): boolean {
  return typeof window !== 'undefined' && 'speechSynthesis' in window
}

export function isSpeechEnabled(): boolean {
  if (!isSpeechSupported()) return false
  const stored = localStorage.getItem(STORAGE_KEY)
  if (stored === null) return true
  return stored === 'true'
}

export function setSpeechEnabled(enabled: boolean): void {
  localStorage.setItem(STORAGE_KEY, String(enabled))
  if (!enabled) {
    window.speechSynthesis?.cancel()
    queue.length = 0
    isSpeaking = false
  }
}

function pickPortugueseVoice(): SpeechSynthesisVoice | undefined {
  const voices = window.speechSynthesis.getVoices()
  return (
    voices.find((v) => v.lang === 'pt-BR') ??
    voices.find((v) => v.lang.startsWith('pt')) ??
    voices[0]
  )
}

function processQueue(): void {
  if (isSpeaking || queue.length === 0 || !isSpeechEnabled()) return

  const text = queue.shift()!
  const utterance = new SpeechSynthesisUtterance(text)
  utterance.lang = 'pt-BR'
  utterance.rate = 1.08
  utterance.pitch = 1
  utterance.volume = 1

  const voice = pickPortugueseVoice()
  if (voice) utterance.voice = voice

  isSpeaking = true

  utterance.onend = () => {
    isSpeaking = false
    processQueue()
  }

  utterance.onerror = () => {
    isSpeaking = false
    processQueue()
  }

  window.speechSynthesis.speak(utterance)
}

/** Enfileira frase — um anúncio por vez, sem cortar o anterior */
export function speakAnnouncement(text: string): void {
  if (!isSpeechSupported() || !isSpeechEnabled()) return
  queue.push(text)
  processQueue()
}

/** Chrome/Edge carregam vozes de forma assíncrona */
export function warmupSpeechVoices(): void {
  if (!isSpeechSupported()) return
  window.speechSynthesis.getVoices()
  window.speechSynthesis.addEventListener('voiceschanged', () => {
    window.speechSynthesis.getVoices()
  })
}
