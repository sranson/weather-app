
String.prototype.removeCharAt = function (i) {
    var dateTime = this.split(''); // convert to an array
    dateTime.splice(i - 1 , 1); // remove 1 element from the array (adjusting for non-zero-indexed counts)
    return dateTime.join(''); // reconstruct the string
}


function formatAPIDate(unformattedDate) {
    //console.log(unformattedDate);                     //THIS GETS DATA!!!!!!!
let formattedDate = unformattedDate.removeCharAt(12);
formattedDate = formattedDate.removeCharAt(12);
formattedDate = formattedDate.removeCharAt(12);            
formattedDate = formattedDate.removeCharAt(12);                              
formattedDate = formattedDate.removeCharAt(12);                            
formattedDate = formattedDate.removeCharAt(12);                                
formattedDate = formattedDate.removeCharAt(12);                               
formattedDate = formattedDate.removeCharAt(12);                                 
formattedDate = formattedDate.removeCharAt(12);                                    
formattedDate = formattedDate.removeCharAt(12);  
formattedDate = formattedDate.trim();
//console.log(formattedDate);                             //THIS WORKS - PASS IT BACK TO MAIN JS FILE
do5DayForecastWork(formattedDate);
}