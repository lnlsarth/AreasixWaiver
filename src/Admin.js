import { Document, PDFViewer, Page, Text, View, Image } from '@react-pdf/renderer';
import { useEffect, useState } from 'react';
import FormController from './FormController';
import Form from './FormModel';
function Admin(){
    const [form, setForm] = useState([])
    useEffect(() => {
        async function fetch(){
            const users = await FormController.retreiveUsers();
            const forms = await Promise.all(users.map(async (data) => {
                return new Form(
                    data.ParticipantName,
                    data.participantDate,
                    await FormController.retreiveParticipantSignatures(data.ParticipantName),
                    data.guardianName,
                    data.guradianDate,
                    await FormController.retreiveGuardianSignatures(data.ParticipantName)
                )
            }))
            setForm(forms)
        }
        fetch()
    },[])
    return(
        <div className="main" style={{
            height: '100vh',
            weight: '100vw',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
        }}>
            <PDFViewer style={{
                height: '90vh',
                width: '80vw',
                alignItems: 'center',
                justifyContent: 'center'
            }}>
                <Document style={{
                }}>
                    {
                        form.map((data, index) => {
                            return(
                                <Page size="A4" style={{
                                    display: 'flex',
                                    alignItems: 'center',
                                }}>
                                    <View style={{
                                        textAlign: 'center',
                                        padding: '5%'
                                    }}>
                                        <Text style={{
                                            fontWeight: "bold",
                                            fontSize: "24",
                                            lineHeight: 1.5,
                                            marginTop: "10%"
                                        }}>Area Six Sportsfest {"\n"}
                                            <Text style={{fontSize: '20'}}>Liability Waiver</Text>
                                        </Text>
                                    </View>
                                    <View style={{
                                        width: '80%',
                                    }}>
                                        <Text style={{
                                            fontSize: '12',
                                            lineHeight: 1.5
                                        }}>
                                            I, {data.participantName}, understand and acknowledge the risks involved in participating the Area Six Sportsfest organized by Area Six Council. These risks may include minor accidents or serious injuries.{"\n"}{"\n"}
                                            By participating in the Event, I agree to release Area Six Council, its organizers, officers and volunteers from any liability for serious injuries, damages, or losses that may occur during the Event, whether caused by negligence or otherwise.{"\n"}{"\n"}
                                            I also understand that the Area Six Council is responsible to perform first-Aid as needed and is willing to give financial support but not liable to pay for the full medical expenses incurred as a result of any Injury sustained during the Event.{"\n"}{"\n"}
                                            Participant's Name: {data.ParticipantName}{"\n"}
                                            Date: {data.participantDate}{"\n"}
                                            Participant Signature:{"\n"}
                                        </Text>
                                            <Image src={data.participantSignature} style={{
                                                width: "40%",
                                                height: "15%",
                                            }}/>
                                        <Text style={{
                                            fontSize: '12',
                                            lineHeight: 1.5
                                        }}>
                                            Parent/Guardian Name: {data.guardianName}{"\n"}
                                            Date: {data.guardianDate}{"\n"}
                                            Parent/Guardian Signature{"\n"}
                                        </Text>
            
                                        <Image src={data.guardianSignature} style={{
                                            width: "40%",
                                            height: "15%",
                                        }}/>
            
                                        
                                    </View>
                                </Page>
                            )
                        })
                    }
                </Document>
            </PDFViewer>
            
        </div>
        
    )
}

export default Admin;