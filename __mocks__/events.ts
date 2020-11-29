export function createInputEvent(value: string): React.ChangeEvent<HTMLInputElement> {

  const currentTarget = document.createElement('input')

  currentTarget.value = value

  return {
    ...baseEvent,
    nativeEvent: new Event(''),
    currentTarget,
  }
}

export const baseEvent: React.BaseSyntheticEvent = {
  target: document.createElement('element'),
  nativeEvent: new Event(''),
  currentTarget: document.createElement('element'),
  bubbles: false,
  cancelable: false,
  defaultPrevented: false,
  eventPhase: 0,
  isTrusted: false,
  preventDefault: () => undefined,
  isDefaultPrevented: () => false,
  stopPropagation: () => undefined,
  isPropagationStopped: () => false,
  persist: () => undefined,
  timeStamp: 0,
  type: '',
}
