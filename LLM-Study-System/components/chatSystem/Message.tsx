import * as DOMPurify from 'dompurify';

function Message({ id, user, message }: { id: number, user: string, message: string }) {

    const formattedMessage = message.replace(/\n/g, '<br>');
    const sanitizedMessage = DOMPurify.sanitize(formattedMessage);

    if (id % 2 == 0) {
        return (
            <div className="mb-2.5 bg-chat-bg-user px-2.5 py-1 text-custom-bg" id={`message-${id}`}>
                <span className="font-semibold">{user}:</span>
                <br />
                <span className="m-px break-words" dangerouslySetInnerHTML={{ __html: sanitizedMessage }}></span>
            </div>
        )
    }

    return (
        <div className="mb-2.5 bg-chat-bg-system px-2.5 py-1 text-custom-bg" id={`message-${id}`}>
            <span className="font-semibold">{user}:</span>
            <br />
            <span className="m-px break-words" dangerouslySetInnerHTML={{ __html: sanitizedMessage }}></span>
        </div>
    )
}

export default Message