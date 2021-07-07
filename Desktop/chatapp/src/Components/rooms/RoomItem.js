import React from 'react';
import TimeAgo from 'timeago-react';
import ProfileAvatar from '../ProfileAvatar';

const RoomItem = ({ room }) => {
  const { createdAt, name, lastMessage } = room;

  const acceptedImgTypes = ['image/png', 'image/jpeg', 'image/pjpeg'];

  const isFile = 'file' in lastMessage;

  const isAudio =
    isFile && !lastMessage.file.contentType.localeCompare('audio/mp3');

  const isText = 'text' in lastMessage;

  const isImage =
    isFile && acceptedImgTypes.includes(lastMessage.file.contentType);

  const isDoc = !isImage && !isAudio && !isText;

  return (
    <div>
      <div className="d-flex justify-content-between align-items-center">
        <h3 className="text-disappear">{name}</h3>

        <TimeAgo
          datetime={
            lastMessage ? new Date(lastMessage.createdAt) : new Date(createdAt)
          }
          className="font-normal text-black-45"
        />
      </div>

      <div className="d-flex align-items-center text-black-70">
        {lastMessage ? (
          <>
            <div className="d-flex align-items-center">
              <ProfileAvatar
                src={lastMessage.author.avatar}
                name={lastMessage.author.name}
                size="sm"
              />
            </div>

            <div className="text-disappear ml-2">
              <div className="italic">{lastMessage.author.name}</div>
              {isAudio && (
                <span className="font-bolder">
                  Audio message : <i>{lastMessage.file.name}</i>
                </span>
              )}
              {isText && <span>{lastMessage.text}</span>}
              {isImage && (
                <span className="font-bolder">
                  Image : <i>{lastMessage.file.name}</i>
                </span>
              )}
              {isDoc && (
                <span className="font-bolder">
                  Document : <i>{lastMessage.file.name}</i>
                </span>
              )}
            </div>
          </>
        ) : (
          <span>No messages yet...</span>
        )}
      </div>
    </div>
  );
};
export default RoomItem;
