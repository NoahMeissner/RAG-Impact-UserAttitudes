import { useOccupationStore } from "@/src/occupation";
import { useVPStore } from "@/src/vp";
import VPInformation from "../VPInformation";
import { useSurveyIDStore } from "@/src/surveyid";

/*
    TODO:
    FIll in SurveyID, as we have written in the information consent that users can contact us if their data should be deleted.
    Turn showVP into a Zustand. The logic of the Zustand needs to be moved to the Submition Buttons;
*/

export default function EndPage() {
    const occupationStore = useOccupationStore();
    const vpStore = useVPStore()
    const { surveyID } = useSurveyIDStore();
    let showVP = vpStore['vp'];

    return (
        <>
            <div className="text-center place-items-center mb-3">
                <h1>Thank you for participating!</h1>
            </div>
            <div className="px-5 flex justify-center">
                <div className="task-box mb-3 max-w-prose place-items-center px-5 border border-neutral-900">
                    <p className="text-padding text-center">
                        Your SurveyID is: { surveyID }
                        <br />
                        If you have any questions or comments about the study, please do not hesitate to contact us.
                        <br />
                        Noah Meissner: noah.meissner@stud.uni-regensburg.de
                        <br />
                        Felix Hornberger: Felix.Hornberger@stud.uni-regensburg.de
                    </p>
                </div>
            </div>
            {showVP && <VPInformation />}
        </>
    );

}