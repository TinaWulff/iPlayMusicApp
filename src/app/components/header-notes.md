
## Complex navigation med { useRouter } hook:
https://nextjs.org/docs/app/api-reference/functions/use-router


```js
'use client'
 
import { useRouter } from 'next/navigation'
 
export default function Page() {
  const router = useRouter()
 
  return (
    <button type="button" onClick={() => router.push('/dashboard')}>
      Dashboard
    </button>
  )
}

```

### useRouter()
* router.push(href: string, { scroll: boolean }):
Perform a client-side navigation to the provided route. Adds a new entry into the browser's history stack.

* router.replace(href: string, { scroll: boolean }):
Perform a client-side navigation to the provided route without adding a new entry into the browser’s history stack.

* router.refresh():
Refresh the current route. Making a new request to the server, re-fetching data requests, and re-rendering Server Components. The client will merge the updated React Server Component payload without losing unaffected client-side React (e.g. useState) or browser state (e.g. scroll position).

* router.prefetch(href: string, options?: { onInvalidate?: () => void }): Prefetch the provided route for faster client-side transitions. The optional onInvalidate callback is called when the prefetched data becomes stale.

* ### router.back(): Navigate back to the previous route in the browser’s history stack.

* router.forward(): Navigate forwards to the next page in the browser’s history stack.

--------------------------------------------------------------------------------

## statevariabler forklaringer

Her er forskellen på:
```js
onClick={() => setShowSearch(!showSearch)}
&
onClick={() => setShowSearch((s) => !s)}
```
### 1. Med updater function (best practice):
```js
setShowSearch((s) => !s)
```

Her bruger du en arrow function direkte som argument til setShowSearch.
(s) => !s betyder: “Tag den nuværende værdi (s) og returnér det modsatte”.

### 2. Uden updater function:

```js
setShowSearch(!showSearch)
```

Her kalder du setShowSearch med en værdi, ikke en funktion.
!showSearch beregnes med det samme, og resultatet sendes ind.

Du bruger altså altid en arrow function, når du skriver (s) => !s.
Når du bare skriver !showSearch, er det ikke en funktion, men en værdi.

Kort sagt:

(s) => !s er en arrow function (funktionspil).
!showSearch er bare en værdi, ikke en funktion.
Du behøver kun arrow function, når du vil bruge den “tidligere” værdi direkte i opdateringen!

---------------------------------------------------------------------------------


## Eksempler på array methods:

* .map()
* .filter()
* .reduce()
* .forEach()
* .find()
* .some()
* .every()
* .slice()
* .join()
* .push()
* .pop()
* .shift()
* .unshift()
* .sort()
* .reverse()

## Eksempler på string methods:

* .split()
* .slice()
* .toUpperCase()
* .toLowerCase()
* .replace()
* .trim()
* .includes()