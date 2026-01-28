

export default async function PlaylistItems({ tracks }) {
  
  return (
 
    <ul className="ml-4 font-normal">
      {tracks.map((item) => (
        <li key={item.track.id}>{item.track.name}</li>
      ))}
    </ul>

  );
}



//Når du bruger map til at lave en liste af JSX-elementer,
// skal du returnere et element for hver iteration.
// Hvis du bruger curly braces ({ }), skal du skrive return eksplicit:
// 
// songs.map((song) => {
// return <li>{song.name}</li>
// });

// Hvis du bruger parenteser ( ) direkte efter =>, returneres udtrykket automatisk:
// 
//  songs.map((song) => (
//  <li>{song.name}</li>
//  ));

