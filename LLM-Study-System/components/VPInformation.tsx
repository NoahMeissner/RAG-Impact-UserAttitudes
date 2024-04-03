import SubmitVPButton from "./buttons/SubmitVPButton";
import DegreeProgramm from "./vp-information/DegreeProgramm";
import FirstName from "./vp-information/FirstName";
import LastName from "./vp-information/LastName";
import Martikel from "./vp-information/Matrikel";

export default function VPInformation() {
    return (
        <div className="flex felx-col justify-center">
            <div className="text-center sm:w-[50%] justify-center px-5">
                <p className="mb-3">
                    Thank you for your work so far. For the last step all you have to do is
                    answer some question pretaining to your personal demographics.
                </p>
                <div className="mb-3">
                    <p>Firstname:</p>
                    <FirstName />
                </div>
                <div className="mb-3">
                    <p>Lastname:</p>
                    <LastName />
                </div>
                <div className="mb-3">
                    <p>Degree Programm:</p>
                    <DegreeProgramm />
                </div>
                <div className="mb-3">
                    <p>Martikel:</p>
                    <Martikel />
                </div>
                <SubmitVPButton />
            </div>
        </div>
    );
}