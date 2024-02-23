import { setDoc, doc, getDocs, collection } from "firebase/firestore";
import { getBytes, getDownloadURL, getStorage, getStream, ref, uploadString } from "firebase/storage";
import { db } from "./Firebase";
import Form from "./FormModel";

    const FormController = {
        saveForm: async (participantName,
        participantDate,
        participantSignature,
        guardianName,
        guradianDate,
        guardianSignature) => {
            const storage = getStorage();
            const storageRef = ref(storage, '/' + participantName + '/participant')
            const storageRef2 = ref(storage, '/' + participantName + '/guardian' ) 

            await uploadString(storageRef, participantSignature, 'data_url').then((snapshot) => {
                console.log("Participant image uploaded!");
            })
            await uploadString(storageRef2, guardianSignature, 'data_url').then((snapshot) => {
                console.log("Guardian image uploaded")
            })
            await setDoc(doc(db, "Forms", participantName), {
                ParticipantName: participantName,
                participantDate: participantDate,
                guardianName: guardianName,
                guradianDate: guradianDate,
            }).finally(() => {
                window.location.reload(false);
                document.getElementById("root").style.cursor = 'initial'
                alert("Form Added!");
            }).catch((error) => {
                console.log("Error: " + error);
            })
        },
        retreiveParticipantSignatures: async (fullName) => {
            const storage = getStorage();
            const signatures = await getDownloadURL(ref(storage, "/" + fullName + "/participant"))
            
            
            return signatures;
        },
        retreiveGuardianSignatures: async (fullName) => {
            const storage = getStorage();
            const signatures = await getDownloadURL(ref(storage, "/" + fullName + "/guardian"))
            
            
            return signatures;
        },
        retreiveUsers: async () => {
            const users = []
            const data = (await getDocs(collection(db, "Forms"))).forEach((data)=>{
                users.push(data.data())
            })
            return Object.values(users);
        }
    }


export default FormController;