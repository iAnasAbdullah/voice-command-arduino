
var speech_result;
var port;

function click_to_record() {

    if (port == null){
        console.log("Please choose a COM port first");
        return;
    }
    window.SpeechRecognition = window.webkitSpeechRecognition;
    const recognition = new SpeechRecognition();
    recognition.lang = "ar-AE";
    recognition.interimResults = true;

    recognition.addEventListener('result', e => {
        
        const transcript = Array.from(e.results)
            .map(result => result[0])
            .map(result => result.transcript)
            .join('')

        recognition.onspeechend = function (){
                console.log(transcript);
                speech_result = transcript;
                writing();
        }


        
        });

        recognition.start();
}

async function connection(){
    //catching a DOM Exception
    try {
        // Prompt user to select any serial port.
        port = await navigator.serial.requestPort();
        
        // Wait for the serial port to open.
        await port.open({ baudRate: 9600 });
        console.log("successfully connected");
    }catch(DOMException){
        console.log("You did not choose a COM port, please choose one of the presented COM ports");
    }

}


async function writing(){
        
        const writer = port.writable.getWriter(); //preparing the port to be writable
        let word = "";
        
        const split_sentence = new Array(speech_result.split(" ")); //initiating an array that splits all the words coming from the speech

        //looping through the speech to find some key words
        for (let i = 0; i < split_sentence[0].length; i++){
            if (split_sentence[0][i] == "يمين" || split_sentence[0][i] == "اليمين"){
                word = "R";
                break;
            }
            else if (split_sentence[0][i] == "يسار" || split_sentence[0][i] == "اليسار"){
                word = "L";
                break;
            }
            else if (split_sentence[0][i] == "منتصف" || split_sentence[0][i] == "المنتصف"){
                word = "M";
                break;
            }

            if (i == split_sentence[0].length - 1){
                console.log("we could not acknowledge what you said, please try again.");
            }
        }
            
        
        const toUnit8Array = new TextEncoder(); //initiating a text encoder

        
        encodedResult = toUnit8Array.encode(word); //encoding the message we want to send to the arduino
        
        
        //console.log("encoded (" + word + ") into " + encodedResult)
        
        
        await writer.write(encodedResult);              //
        const data = new Uint8Array(encodedResult);     //writing to the arduino
        decodedresult = new TextDecoder().decode(data); //
        
        
        //console.log("data has been sent, " + decodedresult);
        
        
        writer.releaseLock(); // Allow the serial port to be closed later.
        
        //console.log("closed writing...");
        //reading();
    
}





// async function reading(){
//     const reader = port.readable.getReader();

//     // Listen to data coming from the serial device.
//     while (true) {
//     const { value, done } = await reader.read();
//     if (done) {
//         // Allow the serial port to be closed later.
//         reader.releaseLock();
//         break;
//     }

//     decodedresult = new TextDecoder().decode(value);
//     console.log("data has been received : " + decodedresult);
//     }   
// }

