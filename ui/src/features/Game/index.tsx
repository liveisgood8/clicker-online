import React, { Fragment } from 'react';
import { RootState } from '../../app/store';
import { useSelector, useDispatch } from 'react-redux';
import { GameField } from '../../components/GameField';
import { sendTurnAction, turnDoneAction, repeatGameAction, leaveFromRoomAction } from './actions';
import { Modal, Button } from 'react-bootstrap';
import { push } from 'connected-react-router';

export const Game: React.FC = () => {
  const gameState = useSelector((state: RootState) => state.game);
  const dispatch = useDispatch();

  const onTurn = (index: number) => {
    dispatch(sendTurnAction(index));
    dispatch(turnDoneAction(index));
  };

  const onGameFinish = () => {
    dispatch(leaveFromRoomAction());
    dispatch(push('/'));
  };

  const onWantRepeat = () => {
    dispatch(repeatGameAction());
  };

  const gameFinishedModal = () => {
    return (
      <Modal
        show={gameState.isGameFinished}
        aria-labelledby="contained-modal-title-vcenter"
        centered
        onHide={onGameFinish}
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            Игра завершена
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="mb-3">
            <h6 className="d-inline text-secondary">Игра закончена, победил: </h6>
            <h5 className="d-inline text-primary font-weight-bold">{gameState.winner}</h5>
          </div>
          <Button variant="success" className="mr-2" onClick={onWantRepeat}>Хочу еще</Button>
          <Button variant="danger" onClick={onGameFinish}>Выйти</Button>
        </Modal.Body>
      </Modal>
    );
  };

  const enemyDisconnectedModal = () => {
    return (
      <Modal
        show
        aria-labelledby="contained-modal-title-vcenter"
        centered
        onHide={onGameFinish}
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            Игра завершена
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <h5>Твой соперник отключился</h5>
          <Button variant="success" onClick={onGameFinish}>Выйти</Button>
        </Modal.Body>
      </Modal>
    );
  };

  return (
    <Fragment>
      <div className="mb-5">
        <h5 className="d-inline text-secondary">Идентификатор комнаты: </h5>
        <h4 className="d-inline text-primary font-weight-bold">{gameState.roomId}</h4>
        {gameState.isWaitingEnemy && (
          <h6 className="text-center text-primary font-weight-bold">Ждем твоего соперника...</h6>
        )}
      </div>
      <GameField
        clickedCells={gameState.clickedCells}
        isFieldDisabled={!gameState.isTurnTime}
        fieldSize={gameState.fieldSize}
        onCellClick={onTurn}
      />
      {gameState.isGameFinished && gameFinishedModal()}
      {gameState.isEnemyDisconnected && enemyDisconnectedModal()}
    </Fragment>
  )
};