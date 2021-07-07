import React, { useState, useRef } from 'react';
import { Modal, Button, Alert, Icon } from 'rsuite';
import AvatarEditor from 'react-avatar-editor';
import { useProfile } from '../../context/profile.context';
import { useModalState } from '../../misc/custom.hooks';
import { database, storage } from '../../misc/firebase';
import ProfileAvatar from '../ProfileAvatar';
import { getUserUpdates } from '../../misc/Helper';

const fileInputTypes = '.png,.jpeg,.jpg';
const acceptedFileTypes = ['image/png', 'image/jpeg', 'image/pjpeg'];

const isValidFile = (file) => acceptedFileTypes.includes(file.type);

const getBlob = (canvas) =>
  new Promise((resolve, reject) => {
    canvas.toBlob((blob) => {
      if (blob) {
        resolve(blob);
      } else {
        reject(new Error('File process error!'));
      }
    });
  });

const AvatarUpload = () => {
  const { isOpen, open, close } = useModalState();

  const [img, setImg] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const avatarEditorRef = useRef();
  const { profile } = useProfile();

  const onFileInputChange = (ev) => {
    const currFiles = ev.target.files;

    if (currFiles.length === 1) {
      const file = currFiles[0];
      if (isValidFile(file)) {
        setImg(file);
        open();
      } else {
        Alert.warning(`Wrong file type ${file.type}`, 4000);
      }
    }
  };

  const onDeleteAvatarClick = async () => {
    if (!profile.avatar) {
      Alert.info('No avatar present', 3000);
      return;
    }
    const updates = await getUserUpdates(profile.uid, 'avatar', null, database);
    database.ref().update(updates);
  };

  const onUploadClick = async () => {
    const canvas = avatarEditorRef.current.getImageScaledToCanvas();

    setIsLoading(true);
    try {
      const blob = await getBlob(canvas);

      const avatarFileRef = storage
        .ref(`/profiles/${profile.uid}`)
        .child('avatar');

      const uploadAvatarResult = await avatarFileRef.put(blob, {
        cacheControl: `public, max-age-${3600 * 24 * 3}`,
      });

      const downloadURL = await uploadAvatarResult.ref.getDownloadURL();

      const updates = await getUserUpdates(
        profile.uid,
        'avatar',
        downloadURL,
        database
      );

      database.ref().update(updates);

      setIsLoading(false);
      close();
      Alert.info('Avatar has been uploaded', 4000);
    } catch (err) {
      setIsLoading(false);
      Alert.error(err.message, 4000);
    }
  };

  return (
    <div className="mt-3 text-center">
      <ProfileAvatar
        src={profile.avatar}
        name={profile.name}
        className="width-200 height-200 img-fullsize font-huge"
      />
      <div>
        <label
          htmlFor="avatar-upload"
          className="d-block cursor-pointer padded"
        >
          Select new avatar
          <input
            id="avatar-upload"
            type="file"
            className="d-none"
            accept={fileInputTypes}
            onChange={onFileInputChange}
          />
        </label>
        <Button
          appearance="ghost"
          className="mt-3"
          color="yellow"
          onClick={onDeleteAvatarClick}
        >
          <Icon icon="trash" />
          &nbsp; Remove Avatar
        </Button>
        <Modal show={isOpen} onHide={close}>
          <Modal.Header>
            <Modal.Title>Adjust and upload new avatar</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div className="d-flex justify-content-center align-items-center h-100">
              {img && (
                <AvatarEditor
                  ref={avatarEditorRef}
                  image={img}
                  width={200}
                  height={200}
                  border={10}
                  borderRadius={100}
                  rotate={0}
                />
              )}
            </div>
          </Modal.Body>
          <Modal.Footer>
            <Button
              block
              apperance="ghost"
              onClick={onUploadClick}
              disabled={isLoading}
            >
              Upload new avatar
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
    </div>
  );
};

export default AvatarUpload;
