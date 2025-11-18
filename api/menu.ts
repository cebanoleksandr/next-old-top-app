import { API } from "@/api";

export async function getMenu(firstCategory: number) {
  const res = await fetch(API.topPage.find, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ firstCategory }),
    next: { revalidate: 10 },
  });
  return res.json();
}
