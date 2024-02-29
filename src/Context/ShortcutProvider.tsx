import {
  ReactNode,
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import { isSameArray } from "../helper/helper";

type TShortcutContextValues = {};

const ShortcutContext = createContext<TShortcutContextValues | null>(null);

type Props = {
  children: ReactNode;
};

const defaultUserShortcuts = {
  save: {
    keystroke: ["control", "s"],
    action: () => console.log("Save"),
  },
  // \\ === \ (because \ is used to escape)
  hideEditor: {
    keystroke: ["control", "\\"],
    action: () => console.log("Hide Editor"),
  },
  preview: {
    keystroke: ["control", "p"],
    action: () => console.log("Preview"),
  },
};

type TShortcutActions = keyof typeof defaultUserShortcuts;
type TShortcutValues = {
  keystroke: string[];
  action: () => void;
};
type TShortcut = Record<TShortcutActions, TShortcutValues>;

export function ShortcutProvider({ children }: Props) {
  const [pressedKeys, setPressedKeys] = useState<string[]>([]);
  const [previousKey, setPreviousKey] = useState<string | null>(null);

  // Store the user defined shortcuts
  const [userShortcuts, setUserShortcuts] = useState<TShortcut>(
    () => defaultUserShortcuts
  );

  const handleKeydown = useCallback(
    (e: KeyboardEvent) => {
      // If the same key as the previous one is pressed (usually when user holds the key instead of pressing) and disable shortcuts if user is inputting on the form (not on the BODY element)
      if (previousKey === e.key || (e.target as HTMLElement).tagName !== "BODY")
        return;

      // Checks if the keystroke combination exist in the userShortcuts object
      const isValidKeystroke = Object.values(userShortcuts).some((shortcut) =>
        isSameArray(shortcut.keystroke, [...pressedKeys, e.key])
      );

      // Prevents default browser shortcut from overiding application shortcut.
      if (isValidKeystroke) e.preventDefault();

      // Update the state
      setPressedKeys((current) => [...current, e.key.toLowerCase()]);
      setPreviousKey(e.key);
    },
    [previousKey, pressedKeys, userShortcuts]
  );

  const handleKeyup = useCallback(
    (e: KeyboardEvent) => {
      if ((e.target as HTMLElement).tagName !== "BODY") return;

      setPressedKeys((current) =>
        popSpecificElement(current, e.key.toLowerCase())
      );

      // Keep in mind that at this point of the code the pressedKey state has not been updated key so we have to take into account to element that is about to be removed.
      if (pressedKeys.length <= 2) {
        setPreviousKey(null);
      } else {
        setPreviousKey(pressedKeys[pressedKeys.length - 2]);
      }
    },
    [pressedKeys]
  );

  // Register the event handlers
  useEffect(() => {
    window.addEventListener("keydown", handleKeydown);
    window.addEventListener("keyup", handleKeyup);
    return () => {
      window.removeEventListener("keydown", handleKeydown);
      window.removeEventListener("keyup", handleKeyup);
    };
  }, [pressedKeys, previousKey, handleKeyup, handleKeydown]);

  // Trigger the shortcut action
  useEffect(() => {
    const shortcut = Object.values(userShortcuts).find((shortcut) =>
      isSameArray(shortcut.keystroke, pressedKeys)
    );
    console.log(shortcut?.action());

    // console.log(previousKey);
  }, [pressedKeys, userShortcuts]);

  return (
    <ShortcutContext.Provider value={{}}>{children}</ShortcutContext.Provider>
  );
}

export function useShortcut() {
  const context = useContext(ShortcutContext);
  if (!context)
    throw new Error("useShortcut must be called inside its provider's scope");
  return context;
}

/**
 * Removes specific element by checking from the end to the start  of an array.
 * @param array
 * @param target - Element to be removed
 *
 * @param array with the removed element
 */
function popSpecificElement<T>(array: T[], target: T) {
  const newArray = array.slice();

  for (let i = newArray.length - 1; i >= 0; i--) {
    if (newArray[i] !== target) continue;
    newArray.splice(i, 1);
    return newArray;
  }

  // TEMP

  console.log("Target not found");
  return newArray;
}
