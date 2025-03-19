import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import { useState } from 'react';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import InputGroup from 'react-bootstrap/InputGroup';
import { XOctagon, Plus } from 'react-bootstrap-icons';

import { useTranslation } from 'react-i18next';
import { Actor } from './Actor';

interface EditActorProps {
    actor: Actor,
    saveCallback: (actor: Actor | null) => void,
    show: boolean,
};


interface ArrayTextControlProps {
    label: string,
    placeholder: string,
    values: string[],
    setValues: (value: string[]) => void
};

function ArrayTextControl({ label, placeholder, values, setValues }: ArrayTextControlProps) {
    const { t } = useTranslation();



    return (<>
        <div>test</div>
        <Form.Group className="mb-3" as={Row}>
            <Form.Label column sm={2}>{label}</Form.Label>
            <Col sm={10}>
                {values.map((item, index) => {
                    return (<InputGroup className='mb-2'>
                        <Form.Control
                            type="text"
                            placeholder={placeholder}
                            value={item} onChange={(e) => {
                                const result = [...values];
                                result[index] = e.target.value;
                                setValues(result);
                            }} />
                        <Button variant="outline-danger" onClick={_ => {
                            const result = [...values];
                            result.splice(index, 1)
                            setValues(result);
                        }} aria-label={t('Remove')}>
                            <XOctagon size={20} />
                        </Button>
                    </InputGroup>)
                })}
                <Button variant="outline-secondary" onClick={_ => setValues([...values, ""])} aria-label={t('Add')}>
                    <Plus />
                </Button>
            </Col>
        </Form.Group></>);
}


export function EditActorDialog({ actor, saveCallback, show }: EditActorProps) {
    const { t } = useTranslation();

    const handleClose = () => saveCallback(null);
    const handleSave = () => saveCallback(new Actor(name, capabilities, assets));

    const [name, setName] = useState<string>(actor.name);
    const [capabilities, setCapabilities] = useState<string[]>(actor.capabilities);
    const [assets, setAssets] = useState<string[]>(actor.assets);

    return (
        <Modal show={show} onHide={handleClose} size='lg' backdrop="static">
            <Modal.Header closeButton>
                <Modal.Title>{t('Actor')}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <Form.Group className="mb-3">
                        <Form.Label>{t('Name')}</Form.Label>
                        <Form.Control type="text" placeholder={t("Name of the actor")} value={name} onChange={(e) => setName(e.target.value)} />
                    </Form.Group>
                    <ArrayTextControl label={t('Capabilities')} placeholder={t("Capability of the actor")} values={capabilities} setValues={setCapabilities} />

                    <ArrayTextControl label={t('Assets')} placeholder={t("Assets of the actor")} values={assets} setValues={setAssets} />
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                    Close
                </Button>
                <Button variant="primary" onClick={handleSave}>
                    Save Changes
                </Button>
            </Modal.Footer>
        </Modal>
    );
}