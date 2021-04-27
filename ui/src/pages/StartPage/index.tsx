import React, { useState, Fragment, FormEvent } from 'react';
import { Button, Form, Modal, Alert } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { createRoomAction, connectToRoomAction, resetRoomExistAction } from '../../features/Game/actions';
import { RootState } from '../../app/store';
import { Logo } from '../../components/Logo';

const LOCAL_STORAGE_NAME_KEY = 'name';
export const StartPage: React.FC = () => {
  const [name, setName] = useState(localStorage.getItem(LOCAL_STORAGE_NAME_KEY) ?? '');
  const [showRoomModal, setShowRoomModal] = useState(false);
  const [isNameErrorVisible, setNameErrorVisible] = useState(false);
  const [roomId, setRoomId] = useState(0);
  const isRoomNotExist = useSelector((state: RootState) => state.game.isRoomNotExist);
  const dispatch = useDispatch();

  const onCreateRoom = () => {
    if (!validateName()) {
      return;
    }
    localStorage.setItem(LOCAL_STORAGE_NAME_KEY, name);
    dispatch(createRoomAction(name));
  };

  const onClickConnectToRoom = () => {
    if (!validateName()) {
      return;
    }
    setShowRoomModal(true);
  }

  const onConnectToRoom = () => {
    dispatch(connectToRoomAction({
      name,
      roomId,
    }));
  };

  const validateName = () => {
    if (!name) {
      setNameErrorVisible(true);
      setTimeout(() => {
        setNameErrorVisible(false);
      }, 1500);
      return false;
    }
    return true;
  };

  return (
    <Fragment>
      <Logo />
      <Form.Control
        value={name}
        onChange={(e) => setName(e.currentTarget.value)}
        placeholder="Enter your name"
        required
      />
      {isNameErrorVisible && (
        <Alert key="1" variant="danger" className="mt-2 w-100">
          Oops, you must enter your name for begginning!
        </Alert>
      )}
      <Button className="d-block m-2 mt-5 w-100" size="lg" onClick={onCreateRoom}>
        Create room
      </Button>
      <Button className="d-block m-2 w-100" size="lg" onClick={onClickConnectToRoom}>
        Connect to room
      </Button>
      <Modal
        show={showRoomModal}
        aria-labelledby="contained-modal-title-vcenter"
        centered
        onHide={() => {
          dispatch(resetRoomExistAction());
          setShowRoomModal(false);
        }}
      >
        <Modal.Body className="my-3">
          <Form onSubmit={(e: FormEvent) => {
            e.preventDefault();
            onConnectToRoom();
          }}>
            <Form.Control
              className="mb-3"
              onChange={(e) => setRoomId(+e.currentTarget.value)}
              placeholder="Enter room identifier"
              required
            />
            {isRoomNotExist && <Alert variant="danger">Room not exists</Alert>}
            <Button className="w-100" type="submit" variant="success">Connect</Button>
          </Form>
        </Modal.Body>
      </Modal>
    </Fragment>
  );
};