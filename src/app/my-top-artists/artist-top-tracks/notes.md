# Noter til at forstå API route fetching

## 1. Server fetch i page.jsx (server component)

Kører kun på serveren, før siden sendes til browseren.  
Henter ALT data på én gang, inden brugeren ser siden.  
Kan ramme rate limit, hvis du henter meget data (fx top tracks for 50 artists på én gang).  
Ikke interaktiv: Brugeren kan ikke “klikke for at hente mere” – alt er hentet på forhånd.

## 2. API route + fetch fra client component (“on demand”)

Når brugeren klikker på en artist, laver browseren et fetch-kald til din API route (fx /api/artist-top-tracks?id=…).  
Din API route kører på serveren, hver gang der klikkes – altså “on demand”.  
Henter kun data for den artist, der klikkes på – ikke for alle på én gang.  
Interaktiv: Brugeren bestemmer, hvornår data hentes (ved klik).

## Hvorfor virker det?

Fordi browseren kun beder om data, når det er nødvendigt (når du klikker).  
Din API route fungerer som en “dør” til serveren: Browseren spørger → din server spørger Spotify → svar sendes tilbage til browseren.  
Det er stadig et server-kald, men det sker først, når brugeren klikker – ikke på forhånd.

## Kort sagt:

- **Server fetch i page.jsx:** Alt data hentes før siden vises, ikke interaktivt, kan give rate limit.
- **API route + client fetch:** Data hentes kun, når brugeren klikker, ét ad gangen, interaktivt og undgår rate limit.

# API Route: artist-top-tracks

Denne route bruges til at hente top tracks for en given artist fra Spotify, når brugeren klikker på en artist i UI'et.

## Brug

- **Endpoint:** `/api/artist-top-tracks?id=ARTIST_ID`
- **Metode:** GET
- **Returnerer:**
  - `{ tracks: [...] }` hvis succes
  - `{ error: ... }` hvis fejl

## Eksempel på fetch fra client component

```js
fetch('/api/artist-top-tracks?id=123')
  .then(res => res.json())
  .then(data => console.log(data.tracks));
```

## Noter

- Henter access token fra cookies (kun på serveren)
- Returnerer fejl hvis artist-id mangler
- Returnerer fejl hvis token mangler eller Spotify svarer med fejl
- Undgår CORS og rate limit-problemer ved kun at hente tracks for én artist ad gangen

---

## Korrekt brug af cookies i Next.js 14+ API routes

For at læse cookies i en API route i App Router skal du bruge **await cookies()** og derefter `.get()` på det returnerede cookieStore:

```js
import { cookies } from 'next/headers';

export async function GET(request) {
  const cookieStore = await cookies();
  const accessTokenCookie = cookieStore.get('IPM_AT');
  // ... resten af din kode
}
```

Se mere i Next.js dokumentationen: https://nextjs.org/docs/app/api-reference/functions/cookies

```js
import { cookies } from 'next/headers'
 
export async function GET(request: NextRequest) {
  const cookieStore = await cookies()
  const token = cookieStore.get('token')
}
```
---

*Sidst opdateret: 2026-01-21*

