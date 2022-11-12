export default function Comment( comment ) {
    const timestamp = comment.comment.createdOn
    const date = new Intl.DateTimeFormat('en-US', {year: 'numeric', month: '2-digit',day: '2-digit', hour: '2-digit', minute: '2-digit', second: '2-digit'}).format(timestamp)
    
    return (
        <div className="card bg-base-100 shadow-xl mb-4">
            <div className="card-body">
            <div className="avatar-group -space-x-6">
                <div className="avatar mr-9">
                    <div className="w-12">
                    <img src={comment.comment.profilePicture} />
                    </div>
                </div>
            <h2 className="card-title">{comment.comment.author}</h2>
            </div>
            <p>{comment.comment.content}</p>
            <p>Create at: {date}</p>
            
            </div>
        </div>
    )
}