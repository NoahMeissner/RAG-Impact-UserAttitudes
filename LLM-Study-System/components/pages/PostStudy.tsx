import SubmitButton from "@/components/buttons/SubmitButton";
import Occupation from "../demographics/Occupation";
import Education from "../demographics/Education";
import Gender from "../demographics/Gender";
import AgeInput from "../demographics/AgeInput";

export default function PostStudy() {
    return (
        <div className="flex flex-col">
            <div className="flex-coloum sm:justify-center sm:place-self-center p-2 text-center sm:w-[50%]">
                <p className="mb-3">
                    Thank you for your work so far. For the last step all you have to do is
                    answer some question pretaining to your personal demographics.
                </p>
                <div className="mb-3 text-left">
                    <p>How old are you?</p>
                    <AgeInput></AgeInput>
                </div>
                <div className="mb-3 text-left">
                    <p> What gender do you identify with? </p>
                    <Gender></Gender>
                </div>
                <div className="mb-3 text-left">
                    <p>What&apos;s your highest level of education?</p>
                    <Education></Education>
                </div>
                <div className="mb-3 text-left">
                    <p>
                        What&apos;s your current occupation? (e.g.: if you are currently studying
                        at a university insert &apos;Student&apos;) (Please enter &apos;Student&apos; if you need the VP hours)
                    </p>
                    <Occupation></Occupation>
                </div>
                <SubmitButton></SubmitButton>
            </div>
        </div>
    );
};