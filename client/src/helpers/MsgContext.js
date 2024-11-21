import { createContext, useContext } from "react";

const BannerContext = createContext();

export const BannerProvider = BannerContext.Provider;

export const useBanner = () => {
  const context = useContext(BannerContext);
  if (context === undefined) {
    throw new Error("banner not sent");
  }
  return context;
};
