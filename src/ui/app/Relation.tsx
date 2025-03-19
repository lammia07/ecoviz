import { BaseEdge, getStraightPath, EdgeProps, EdgeLabelRenderer } from '@xyflow/react';

export default function Relation({ id, sourceX, sourceY, targetX, targetY }: EdgeProps) {
    const [edgePath, labelX, labelY] = getStraightPath({
        sourceX,
        sourceY,
        targetX,
        targetY,
    });

    return (
        <>
            <BaseEdge id={id} path={edgePath} />
            <EdgeLabelRenderer>
                <div className='arrow-right' style={{
                    position: 'absolute',
                    transform: `translate(-50%, -50%) translate(${labelX}px, ${labelY}px)`,
                    pointerEvents: 'all',
                }}><span>B</span></div>
            </EdgeLabelRenderer>
        </>);
}