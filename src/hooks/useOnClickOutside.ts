

export function useOnClickOutside(ref, handler) {

  // handler for pointer events
  const listener = (e) => {
    if (!ref.value || ref.value?.contains(e.target)) {
      return;
    }
    handler(e);
  };

  // runner to add event listeners
  const runner = () => {
    document.addEventListener("click", listener);
    document.addEventListener("touch", listener);
    return () => {
      document.removeEventListener("click", listener);
      document.removeEventListener("touch", listener);
    };
  }

  const stop = watchEffect(runner);
  stop();
}
