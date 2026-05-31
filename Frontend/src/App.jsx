// import { useEffect, useState } from 'react'
// import './App.css'
// import axios from 'react'

// function App() {
//   const [jokes, setJokes] = useState([])

//   useEffect (()=> {
//     axios.get("http://localhost.3000/jokes")
//     .then((response.data) =>{
//       setJokes(response.data)
//     }
//   )
//   .catch((error) => {
//     console.log(error) 
//   })
//   }
// )

//   return (
//     <div>
//       <h1>chai Aur Full stack</h1>
//       <p>JOKES: {jokes.length}</p>
//       {
//         jokes.map((joke, index) => {   
//           <div key={joke.id}>          
//             <h3>{joke.title}</h3>     
//             <p>{joke.content}</p>      
//           </div>
// })
//       }
//     </div>
//   )
// }

// export default App