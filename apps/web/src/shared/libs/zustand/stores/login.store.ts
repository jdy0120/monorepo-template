import { createStore } from "zustand/vanilla";
import { persist, createJSONStorage } from "zustand/middleware";

export type LoginState = {
  accessToken: string;
  refreshToken: string;
};

export type LoginActions = {
  setAccessToken: (accessToken: string) => void;
  setRefreshToken: (refreshToken: string) => void;
};

export type LoginStore = LoginState & LoginActions;

export const defaultInitState: LoginState = {
  accessToken: "",
  refreshToken: "",
};

export const createLoginStore = (
  initState: LoginState = defaultInitState
) => {
  return createStore<LoginStore>()(
    persist(
      (set) => ({
        ...initState,
        setAccessToken: (accessToken) => set(() => ({ accessToken })),
        setRefreshToken: (refreshToken) =>
          set(() => ({ refreshToken })),
      }),
      {
        name: "login",
        storage: createJSONStorage(() => sessionStorage),
      }
    )
  );
};
