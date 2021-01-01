import './style';
import { h } from 'preact';
import { useEffect, useState, useRef } from 'preact/hooks';
import { createPortal } from 'preact/compat';

const isBrowser = typeof window !== 'undefined';

function Portal ({ id }) {
	const el = isBrowser ? useRef(document.createElement('div')) : null;
	return <div ref={el} id={id} />;
}

function PortalChild ({ children, renderTo }) {
	const [portalEl, setPortalEl] = useState();

	useEffect(() => {
		if (isBrowser && renderTo) {
			const el = document.getElementById(renderTo);
			setPortalEl(el);
		}
	}, [renderTo, portalEl]);

	if (portalEl)
		return createPortal(children, portalEl);
	return null;
}

export default function App (){
	return (
		<div>
			<div style={{ position: 'relative', width: '10em', left: '5em', border: '1px dashed fuchsia', color: 'fuchsia' }}>
					Portal
				<Portal id="portal" />
			</div>
			<div>Render outside Portal</div>
			<PortalChild renderTo="portal">
				<div>Render in Portal</div>
			</PortalChild>
		</div>
	);
}
