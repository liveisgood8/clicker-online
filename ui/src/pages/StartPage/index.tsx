import React, { useState, Fragment, FormEvent } from 'react';
import { Button, Form, Modal, Alert } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { createRoomAction, connectToRoomAction } from '../../features/Game/actions';
import { RootState } from '../../app/store';

export const StartPage: React.FC = () => {
  const [name, setName] = useState('');
  const [showRoomModal, setShowRoomModal] = useState(false);
  const [isNameErrorVisible, setNameErrorVisible] = useState(false);
  const [roomId, setRoomId] = useState(0);
  const isRoomNotExist = useSelector((state: RootState) => state.game.isRoomNotExist);
  const dispatch = useDispatch();

  const onCreateRoom = () => {
    if (!validateName()) {
      return;
    }
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
      <h2 className="text-secondary mb-5">Clicker online</h2>
      <Form.Control
        onChange={(e) => setName(e.currentTarget.value)}
        className="mb-5"
        placeholder="Введи имя"
        required
      />
      {isNameErrorVisible && (
        <Alert key="1" variant="danger" className="w-100">
          Нужно заполнить имя для начала игры!
        </Alert>
      )}
      <Button className="d-block m-2 w-100" size="lg" onClick={onCreateRoom}>
        Создать комнату
      </Button>
      <Button className="d-block m-2 w-100" size="lg" onClick={onClickConnectToRoom}>
        Подключить к комнате
      </Button>
      <Modal
        show={showRoomModal}
        aria-labelledby="contained-modal-title-vcenter"
        centered
        onHide={() => setShowRoomModal(false)}
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            Подключение к комнате
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={(e: FormEvent) => {
            e.preventDefault();
            onConnectToRoom();
          }}>
            <Form.Control
              className="mb-3"
              onChange={(e) => setRoomId(+e.currentTarget.value)}
              placeholder="Введите идентификатор комнаты"
              required
            />
            {isRoomNotExist && <h6 className="text-danger">Комната не существует</h6>}
            <Button type="submit" variant="success">Подключиться</Button>
          </Form>
        </Modal.Body>
      </Modal>
    </Fragment>
  );
};