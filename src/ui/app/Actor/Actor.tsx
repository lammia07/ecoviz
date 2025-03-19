import { Node, NodeProps, Handle, Position, NodeResizer } from '@xyflow/react';
import './Actor.scss';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import { useState } from 'react';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import InputGroup from 'react-bootstrap/InputGroup';
import { XOctagon, Plus } from 'react-bootstrap-icons';

import { useTranslation } from 'react-i18next';
import { EditActorDialog } from './EditActorDialog';

export class Actor {
    constructor(
        public name: string,
        public capabilities: string[],
        public assets: string[],) { }
}

type ActorNode = Node<{ actor: Actor }>;

export function ActorNode({ data, selected }: NodeProps<ActorNode>) {

    const { t } = useTranslation();

    const [show, setShow] = useState(false);
    const [actor, setActor] = useState<Actor>(data.actor);

    const handleShow = () => setShow(true);





    return (
        <div className='h-100' onDoubleClick={handleShow}>
            <NodeResizer
                color="#aaa"
                lineStyle={{ border: '1px #aaa dashed' }}
                isVisible={selected}
                minWidth={100}
                minHeight={100}
            />

            <Handle type="target" position={Position.Left} />
            <Handle type="source" position={Position.Right} />

            <div className="actor d-flex flex-column justify-content-evenly align-items-center">
                <div>{actor.name}</div>
                <hr />
                <div>
                    {actor.capabilities.map((item, index) => <div key={index}>{item}</div>)}
                </div>
                <hr />
                <div>
                    {actor.assets.map((item, index) => <div key={index}>{item}</div>)}
                </div>
            </div>

            <Handle type="target" position={Position.Top} />
            <Handle type="source" position={Position.Bottom} />

            <EditActorDialog actor={actor} saveCallback={(newValue) => {
                setShow(false);

                if (newValue) {
                    setActor(newValue);
                }
            }} show={show} />

        </div>
    );
}