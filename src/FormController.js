import { setDoc, collection, doc } from "firebase/firestore";
import { getStorage, ref, uploadString } from "firebase/storage";
import { db } from "./Firebase";

        const collectionRef = collection(db, "Forms");
        const storage = getStorage();
        const saveForm = async (participantName,
            participantDate,
            participantSignature,
            guardianName,
            guradianDate,
            guardianSignature) => {
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
        }


export default saveForm;