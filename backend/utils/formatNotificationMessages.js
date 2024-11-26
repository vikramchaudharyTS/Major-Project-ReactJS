// Utility function to format notification message
export const formatNotificationMessage = (notification) => {
    const { from, type, targetId } = notification;

    switch (type) {
        case 'follow':
            return `${from.username} followed you!`;

        case 'like':
            return `${from.username} liked your post.`;

        case 'like_comment':
            return `${from.username} liked your comment.`;

        case 'comment':
            return `${from.username} commented on your post.`;

        case 'reply_comment':
            return `${from.username} replied to your comment.`;

        default:
            return 'You have a new notification.';
    }
};
