import 'bootstrap/dist/css/bootstrap.min.css'
import './App.css';

import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Switch, Route } from 'react-router-dom';
import { socket, history } from './app/store';
import { push, ConnectedRouter } from 'connected-react-router';
import { StartPage } from './pages/StartPage';
import { Game } from './features/Game';
import { Row, Col } from 'react-bootstrap';
import { IncomeCommands } from './app/socket/commands';

const App: React.SFC = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    socket.on('action', (action: { type: string, payload: any }) => {
      if (action.type === IncomeCommands.ROOM_CONNECTED) {
        dispatch(push(`/game`));
      }
    });

    return () => {
      socket.off('connected');
    };
  }, [dispatch]);

  return (
    <ConnectedRouter history={history}>
      <main className="h-100 overflow-hidden">
        <Row className="h-100">
          <Col
            className="d-flex align-items-center justify-content-center flex-column h-100"
            xs={{ span: 10, offset: 1 }}
            md={{ span: 8, offset: 2 }}
            lg={{ span: 6, offset: 3 }}
          >
            <Switch>
              <Route exact path="/" component={StartPage} />
              <Route exact path="/game" component={Game} />
            </Switch>
          </Col>
        </Row>
      </main>
    </ConnectedRouter>
  );
}

export default App;
