import './App.css';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import Canvas from './Canvas';
import { useState } from 'react';
import ListGroup from 'react-bootstrap/ListGroup';
import ListGroupItem from 'react-bootstrap/esm/ListGroupItem';

function App() {

  const [files, setFiles] = useState<string[]>([]);

  const onSave: React.MouseEventHandler = async (): Promise<void> => {
    const val = await window.electron.save()
    setFiles(val);
  }

  // const onSave: OnConnect = useCallback(
  //       (connection) => setEdges((eds) => addEdge(connection, eds)),
  //       [setEdges],
  //   );

  return (
    <Container fluid className='vh-100'>
      <Row className='h-100'>
        <Col sm="auto" style={{ background: 'red' }}>
          <Button variant="success" onClick={onSave}>Save</Button>
          <ListGroup>
            {files.map((item, index) => <ListGroupItem key={index}>{item}</ListGroupItem>)}
          </ListGroup>
        </Col>
        <Col>
          <Canvas />
        </Col>
      </Row>
    </Container >
  );
}

export default App;
