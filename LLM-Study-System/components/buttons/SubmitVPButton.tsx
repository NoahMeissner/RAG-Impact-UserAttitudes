'use client'
import { useDegreeProgrammStore } from "@/src/degreeprogramm";
import { useFirstNameStore } from "@/src/firstname";
import { useLastNameStore } from "@/src/lastname";
import { useMatrikelStore } from "@/src/matrikel";
import { useVPStore } from "@/src/vp";

// TODO: Need a validation logic for this


export default function SubmitVPButton() {

    const setVP = useVPStore((state) => state.setVP);

    const { matrikel } = useMatrikelStore();
    const { firstName } = useFirstNameStore();
    const { lastName } = useLastNameStore();
    const { degreeProgramm } = useDegreeProgrammStore();

    const handleclick = () => {
        setVP(false);

        const submitData = async () => {
            const response = await fetch('/api/submitStudent', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    "matrikel": matrikel,
                    "firstname": firstName,
                    "lastname": lastName,
                    "degreeProgramm": degreeProgramm,
                    "time": new Date().toDateString()
                }),
            });
        }
        submitData();
    }
    return (
        <button className='bg-custom-accent p-2 font-semibold mt-3' onClick={() => handleclick()}>SubmitVP</button>
    );
};