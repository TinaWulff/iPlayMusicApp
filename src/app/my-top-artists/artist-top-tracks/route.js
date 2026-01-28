import { cookies } from "next/headers";

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const artistId = searchParams.get("id");
  if (!artistId) {
    return new Response(JSON.stringify({ error: "Missing artist id" }), { status: 400 });
  }

  const cookieStore = await cookies();
  const accessTokenCookie = cookieStore.get("IPM_AT");

  if (!accessTokenCookie) {
    return new Response(JSON.stringify({ error: "No access token" }), { status: 401 });
  }

  const response = await fetch(`https://api.spotify.com/v1/artists/${artistId}/top-tracks?market=DK`, {
    next: { revalidate: 5*60 },
    headers: {
      'Authorization': `Bearer ${accessTokenCookie.value}`
    }
  });  

  if (!response.ok) {
    const text = await response.text();
    return new Response(JSON.stringify({ error: text }), { status: response.status });
  }

  const data = await response.json();
  return new Response(JSON.stringify({ tracks: data.tracks || [] }), {
    status: 200,
    headers: { "Content-Type": "application/json" }
  });
}

//Det her kaldes en “API route” eller “server action” i Next.js.