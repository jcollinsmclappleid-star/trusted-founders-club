import { headers } from "next/headers";
import { isIndexableHost } from "@/lib/site";

export async function requestHost() {
  const headerList = await headers();
  const raw = headerList.get("x-forwarded-host") ?? headerList.get("host") ?? "";
  return raw.split(",")[0].trim().toLowerCase().replace(/:\d+$/, "");
}

export async function indexingAllowed() {
  return isIndexableHost(await requestHost());
}
