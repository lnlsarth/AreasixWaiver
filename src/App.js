
import { useRef, useState } from 'react';
import './App.css';
import CanvasDraw from "react-canvas-draw";
import saveForm from './FormController';
function App() {
  const windowHeight = useRef(window.innerHeight)
  const windowWidth = useRef(window.innerWidth)

  const phoneWidth = 430;
  const ipadWidth = 820;


  console.log("height: " + windowHeight.current)
  console.log("weight: " + windowWidth.current)

  const [participantName, setParticipantName] = useState("");
  const [participantDate, setParticipantDate] = useState("");
  const [guardianName, setGuardianName] = useState("");
  const [guradianDate, setGuardianDate] = useState("");

  const canvas1 = useRef();
  const canvas2 = useRef();


  return (
    <div className='main' style={{
      width: windowWidth >= phoneWidth ? '60vw' : '90vw',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      overflow: 'hidden',
      flexDirection: 'column',
      boxShadow:
                  "0 13px 27px -5px rgba(50, 50, 93, 0.25),    0 8px 16px -8px rgba(0, 0, 0, 0.3)"
    }}>
      <div style={{
        width: '90%',
        height: '90%',
        lineHeight: 2,
      }}>
          <h1 style={{
            textAlign: 'center'
          }}>Area six Sportsfest</h1>
          <h2 style={{
            textAlign: 'center'
          }}>Waiver Form</h2>
          <p>I, <input type='text' placeholder='Juan Dela Cruz' style={{
            textAlign: 'center',
          }}
          onChange={(e) => {
            setParticipantName(e.target.value);
            console.log("name: "+ e.target.value);
          }}
          /> 
              , understand and acknowledge the risks involved in participating the Area Six Sportsfest organized by Area Six Council. These risks may include minor accidents or serious injuries.<br/><br/> 

              By participating in the Event, I agree to release Area Six Council, its organizers, officers and volunteers from any liability for serious injuries, damages, or losses that may occur during the Event, whether caused by negligence or otherwise.<br/><br/>

              I also understand that the Area Six Council is responsible to perform first-Aid as needed and is willing to give financial support [Amount as agreed by the Area Six Officers] but not liable to pay for the full medical expenses incurred as a result of any Injury sustained during the Event.<br/><br/>

              Participant's Name: {participantName}<br/><br/>
            Date: <input type='date' style={{
                        textAlign: 'center'
                      }}
                      onChange={(e) => setParticipantDate(e.target.value)}/> <br/><br/>
            Participant Signature:
            <CanvasDraw
              ref={canvas1}
              style={{
                boxShadow:
                  "0 13px 27px -5px rgba(50, 50, 93, 0.25),    0 8px 16px -8px rgba(0, 0, 0, 0.3)"
              }}
              lazyRadius={0}
              brushRadius={1.5}
              hideGridX={true}
              gridLineWidth={3}
              immediateLoading={false}
              canvasHeight={200}
              canvasWidth={windowWidth >= phoneWidth ? 500 : 300}
              className='participantSignature'
            /><br/>
            Parent/Guardian Name: <input type='text' placeholder='Juan Dela Cruz' style={{
              textAlign: 'center'
            }}
            onChange={(e) => {
              setGuardianName(e.target.value)
            }}/><br/><br/>
            Date: <input type='date' style={{
                        textAlign: 'center'
                      }}
                      onChange={(e) => {
                        setGuardianDate(e.target.value)
                      }}/> <br/><br/>
            Parent/Guardian Signature (if participant is under 18 years old):<br/>
            <CanvasDraw
              ref={canvas2}
              style={{
                boxShadow:
                  "0 13px 27px -5px rgba(50, 50, 93, 0.25),    0 8px 16px -8px rgba(0, 0, 0, 0.3)"
              }}
              lazyRadius={0}
              brushRadius={1.5}
              hideGridX={true}
              gridLineWidth={3}
              immediateLoading={false}
              canvasHeight={200}
              canvasWidth={windowWidth >= phoneWidth ? 500 : 300}
            />
          </p>
      </div>
      <div style={{
        width: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '5%'
      }}>
        <button style={{
          margin: "5%"
        }} onClick={() => {
          canvas1.current.clear();
          canvas2.current.clear();
        }}>Clear Signatures</button>
        <button id='saving' style={{
          margin: "5%"
        }} onClick={() => {

          if (participantName === ""){
            alert("Please fill the blanks")
          }else {
            document.getElementById("saving").style.display = 'none';
            document.getElementById("root").style.cursor = 'wait';
            const canvas1Url = canvas1.current.getDataURL();
            const canvas2Url = canvas2.current.getDataURL();
            saveForm(participantName, participantDate, canvas1Url, guardianName, guradianDate, canvas2Url);
          }
        }}>Submit Form</button>
      </div>
    </div>
  );
}

export default App;
