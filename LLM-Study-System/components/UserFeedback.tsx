export default function UserFeedback({feedbackText}: {feedbackText: string}) {
    return (
        <div className="flex flex-col">
            <div className="flex justify-center place-self-center bg-custom-secondary w-3/5 p-2">
                <p>{feedbackText}</p>
            </div>
        </div>
    )
}