import Likertscale from "./Likertscale";

function QuestionElement({ question }) {
    // How do we struct this right? I mean what is the best solution for mobile devices? Change Likert to Dropdown menue?
    return (
        <div className="flex-col border border-neutral-900 p-5 mb-3">
            <div className="flex text-center justify-center mb-3">
                <h2>{question}</h2>
            </div>
            <Likertscale topic={question} valuation={false} />
        </div>
    );
}

export default QuestionElement