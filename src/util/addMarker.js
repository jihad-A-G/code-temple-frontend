import '../assets/style.css'
const  addMarker = (session, lineNumber, backgroundColor) =>{
    const range = new ace.Range(lineNumber, 0, lineNumber, 1);
    const markerId = session.addMarker(range, `highlight-${backgroundColor}`, "fullLine");
   
    // Add CSS for the highlight class
    const style = document.createElement('style');
    style.type = 'text/css';
    if(backgroundColor === 'lightgreen'){
        style.innerHTML = `.highlight-${backgroundColor} { background-color: rgba(46, 160, 67, 0.15); }`;

    }else{
        style.innerHTML = `.highlight-${backgroundColor} { background-color: rgba(248, 81, 73, 0.1); }`;

    }
    document.head.appendChild(style);
   }
   

   export default addMarker