import { createClient } from "pexels";

const client = createClient(process.env.PEXELS_API_KEY!);

export async function getDestinationImage(query: string) {
  try {
    const result = await client.photos.search({ query, per_page: 1 });
    if ("photos" in result && result.photos.length > 0) {
      // Use high quality URL
      return result.photos[0].src.large2x;
    }
    return null;
  } catch (error) {
    console.error("Error fetching image:", error);
    return null;
  }
}
