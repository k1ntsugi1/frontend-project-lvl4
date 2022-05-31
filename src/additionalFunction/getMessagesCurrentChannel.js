
export const getMessagesCurrentChannel = (currentChannelId, messages) => {
    return messages.filter(({channelId}) => (currentChannelId === channelId ))
};