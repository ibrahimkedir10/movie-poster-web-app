// note the name of the class must be capitalized 
class MyshortsDisplay extends React.Component {
   constructor(props) {
      super(props)
      this.state = {
         selectedIndices: [3, 7],
         shorts: [],
         isLoading: true
      }
   }

   handleChange = e => {
      // I could change selctedIndices "directly" but it was not affecting the page
      // so I made a copy, changed the copy, and then used the copy to set the state
      let copy = this.state.selectedIndices;
      if (e.target.checked) {
         //add to selectedIndices
         copy.push(e.target.value);
         copy.sort(function (a, b) { return a - b });
         //sort() assumes strings ("10"<"9") -- added anonymous "compare" function to force number (9<10)
      } else {
         //remove from selectedIndices
         copy = copy.filter(function (element) {
            return element != e.target.value;
         });
      }
      this.setState({ selectedIndices: copy });
   }

   //note the JSON has a slightly different structure than before
   componentDidMount() {
      fetch('IMDB.json')
         .then(response => response.json())
         .then(data => {
            this.setState({ shorts: data["shorts"], isLoading: false })
            document.getElementById("short_3").checked = true;
            document.getElementById("short_7").checked = true;
         })
   }

   render() {
      // The following code use React Fragment
      // Recall .map() is a way to loop over an array 
      // React requires you to pass in the key={} prop
      // https://reactjs.org/docs/lists-and-keys.html 

      /*
         we cannot do the real rendering until the data file is read (asynchronously) 
         hence the introduction of the isLoading attribute of the state 
      */
      if (this.state.isLoading) {
         return (<p>Loading ....</p>)
      } else {
         return (
            <>
               <h2>Create an Oscar-Nominated Shorts Festival</h2>
               {
                  this.state.shorts.map((short, i) => {
                     return (
                        <div key={"div_check_" + i}>
                           <span key={"span_" + i}>{short.movieTitle}</span>
                           <input key={"check_" + i} id={"short_" + i} type="checkbox" name="short" value={i} onChange={this.handleChange} />
                           <label key={"label_" + i} htmlFor={"short_" + i}>
                              <span key={"span_" + i}>{short.movieDirector}</span> ({short.movieStars})
                           </label>
                        </div>
                     )//match return of the if inside map 
                  }
                  )
               }
               <br /><br />
               <h2>shortss Selected</h2>
               {
                  this.state.selectedIndices.map((index, i) => (
                      // couldnt get the image to show up 
                   
                     <img src= {this.state.shorts[index].moviePoster} key = {"poster_" + i} hight="200" width="200" />
                  ))
               }
            </>
         ) //match return in else of isLoading 
      } //match else of isLoading
   } //match render
} //end MyBookDisplay class

ReactDOM.render(<MyshortsDisplay />, document.querySelector('#divshortsDisplay'))

//document.getElementById("book_3").checked = true;
//document.getElementById("book_7").checked = true;
// NOT HERE BECAUSE READING FILE -- see componentDidMount