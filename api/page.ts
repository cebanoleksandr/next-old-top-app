import { API } from "@/api";

export async function getPage(alias: string) {
  const res = await fetch(API.topPage.byAlias + alias, {
    next: { revalidate: 10 },
  });
  if (!res.ok) {
    return null;
  }
  return res.json();
}

