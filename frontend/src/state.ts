import { Draft, produce } from "immer";
import { createContext, useContext, useMemo, useState } from "react";
import { Message } from "./types";

export interface Field {
  key: string;
  messages: Message[];
  value: string;
}

export type State = {
  messages: Field[];
};

export interface StateManager {
  readonly state: Readonly<State>;
  setState: (state: State) => void;
  updateState: (callback: (draft: Draft<State>) => void) => void;
}

export const StateManagerContext = createContext<StateManager | null>(null);

/**
 * Use only *ONCE* in whole app!!!
 */

const getGroupGreetingMessage = (key: string): Field => ({
  key: key,
  messages: [
    {
      role: "assistant",
      content: `Cześć, jestem Tax Assistant 👋 W tym chacie mozesz zadać pytania na temat ${key}`,
    } as Message,
  ],
  value: "",
});

export const useCreateStateManager = (): StateManager => {
  const [state, setState] = useState<State>(() => ({
    messages: [
      getGroupGreetingMessage("PESEL"),
      getGroupGreetingMessage("Imie"),
    ],
  }));

  return useMemo(
    () => ({
      state,
      setState,
      updateState: (callback) => {
        setState(produce(state, callback));
      },
    }),
    [state]
  );
};

/**
 * Use everywhere the State is needed.
 */
export const useStateManager = (): StateManager => {
  const res = useContext(StateManagerContext);
  if (!res)
    throw new Error("Provide state manager somewhere up the hierarchy!");
  return res;
};
