import './style.css';
import fieldImage from './field.png';

import React from 'react';
import { Row, Col, Container } from 'react-bootstrap';

interface IGameFieldProps {
  isFieldDisabled: boolean;
  fieldSize: number;
  clickedCells: number[];
  onCellClick: (index: number) => void;
}

export const GameField: React.FC<IGameFieldProps> = (props) => {
  const onCellClick = (index: number) => {
    if (props.isFieldDisabled) {
      return;
    }

    props.onCellClick(index);
  };

  const getCells = () => {
    const cells: JSX.Element[] = []

    for (let i = 0; i < props.fieldSize; i++) {
      const rowCells: JSX.Element[] = [];
      for (let j = 0; j < props.fieldSize; j++) {
        const index = i * props.fieldSize + j;
        rowCells.push((
          <Col
            className={'d-flex align-items-center justify-content-center cell' +
              (props.clickedCells.indexOf(index) !== -1 ? ' clicked' : '')}
            key={j}
            onClick={() => onCellClick(index)}
          >
            <img
              src={fieldImage}
              alt=""
              style={{ maxWidth: '50%', maxHeight: '50%' }}
            />
          </Col>
        ));
      }
      cells.push((
        <Row key={i}>
          {rowCells}
        </Row>
      ))
    }

    return cells;
  };

  return (
    <div id="field-container" className={props.isFieldDisabled ? 'disabled' : 'enabled'}>
      <Container>
        {getCells()}
      </Container>
    </div>
  )
};