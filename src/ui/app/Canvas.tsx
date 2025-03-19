'use client'

import React, { useCallback } from 'react';
import {
    ReactFlow,
    MiniMap,
    Controls,
    Background,
    useNodesState,
    useEdgesState,
    addEdge,
    OnConnect,
    BackgroundVariant,
    NodeTypes,
    EdgeTypes,
} from '@xyflow/react';

import '@xyflow/react/dist/style.css';
import { Actor, ActorNode } from './Actor/Actor';
import Relation from './Relation';

const initialNodes = [
    { id: '1', type: 'actor', position: { x: 100, y: 200 }, data: { actor: new Actor('name', ['cajlkfjdsaölp1', 'caplkfjdsaö lkfjdsaölf lkfdsjöljf2'], ['asset1', 'asset2']) } },
    { id: '2', type: 'actor', position: { x: 200, y: 500 }, data: { actor: new Actor('name', ['capjölkdaölf1', 'cajflkdsaölflkjfdsa ö p2'], ['asset1', 'asset2']) } },
];
const initialEdges: any[] = [
    { id: 'e1-2', type: 'relation', source: '1', target: '2' }
];

const nodeTypes: NodeTypes = { actor: ActorNode };
const edgeTypes: EdgeTypes = { relation: Relation };

export default function App() {
    const [nodes, _, onNodesChange] = useNodesState(initialNodes);
    const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);

    const onConnect: OnConnect = useCallback(
        (connection) => setEdges((eds) => addEdge(connection, eds)),
        [setEdges],
    );

    return (
        <div className='w-100 h-100'>
            <ReactFlow
                nodes={nodes}
                nodeTypes={nodeTypes}
                onNodesChange={onNodesChange}

                edges={edges}
                edgeTypes={edgeTypes}
                onEdgesChange={onEdgesChange}

                onConnect={onConnect}
            >
                <Controls />
                <MiniMap />
                <Background variant={BackgroundVariant.Lines} gap={12} size={1} />
            </ReactFlow>
        </div>
    );
}