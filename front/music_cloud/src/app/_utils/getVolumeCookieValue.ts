import { cookies } from "next/headers";

export const getVolumeCookieValue = () => {
  const cookiesStore = cookies();
  const volumeValue = Number(cookiesStore.get("volume")?.value) || 100;

  return volumeValue;
};
