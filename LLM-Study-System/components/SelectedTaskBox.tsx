function SelectedTaskBox({ topic }: { topic: string }) {
    return (
        <div className="flex my-5 w-full justify-center text-center">
            <h2 className="p-2 border border-neutral-900 sm:border-0">{topic}</h2>
        </div>
    )
}

export default SelectedTaskBox