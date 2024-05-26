const HTMLTamplate = `
	<!doctype html>
	<html lang="en">
		<head>
			<meta charset="UTF-8" />
			<meta name="viewport" content="width=device-width, initial-scale=1.0" />
			<title>Tile Map Proxy</title>
		</head>
		<body>
			<div class="container">
				<h1 class="title">Tile Map Proxy</h1>
				<svg id="emoji" viewBox="0 0 72 72" xmlns="http://www.w3.org/2000/svg">
					<g id="color">
						<circle
							cx="36"
							cy="36"
							r="28"
							fill="#92D3F5"
							stroke="none"
							stroke-linecap="round"
							stroke-linejoin="round"
							stroke-miterlimit="10"
							stroke-width="2"
						/>
					</g>
					<g id="hair" />
					<g id="skin" />
					<g id="skin-shadow" />
					<g id="line">
						<circle
							cx="36"
							cy="36"
							r="28"
							fill="none"
							stroke="#000000"
							stroke-linecap="round"
							stroke-linejoin="round"
							stroke-miterlimit="10"
							stroke-width="2"
						/>
						<path
							fill="none"
							stroke="#000000"
							stroke-linecap="round"
							stroke-linejoin="round"
							stroke-miterlimit="10"
							stroke-width="2"
							d="M36,8v56c-8.5604,0-15.5-12.536-15.5-28S27.4396,8,36,8c8.5604,0,15.5,12.536,15.5,28S44.5604,64,36,64"
						/>
						<line
							x1="64"
							x2="8"
							y1="36"
							y2="36"
							fill="none"
							stroke="#000000"
							stroke-linecap="round"
							stroke-linejoin="round"
							stroke-miterlimit="10"
							stroke-width="2"
						/>
						<line
							x1="60"
							x2="12"
							y1="22"
							y2="22"
							fill="none"
							stroke="#000000"
							stroke-linecap="round"
							stroke-linejoin="round"
							stroke-miterlimit="10"
							stroke-width="2"
						/>
						<line
							x1="60"
							x2="12"
							y1="50"
							y2="50"
							fill="none"
							stroke="#000000"
							stroke-linecap="round"
							stroke-linejoin="round"
							stroke-miterlimit="10"
							stroke-width="2"
						/>
					</g>
				</svg>

				<p class="description">
					A Tile Map Proxy base on NodeJS Edge runtime. Provide a unified API that uses Google XYZ tile coordinates<br />
					It can be imported into the map browser as a custom map source. Ovital, ACGIS etc. <br />
					Feature: <br />
					1. Resolve and optimize the tile map loading network. With the power of CloudFlare global CDN and cache.<br />
					2. Help people(Chinese) that after the GFW to access the world map service(Google etc.). <br />
					3. Smooth out the differences between each Tile API and provide Google XYZ-based Tile APIs in a unified format. <br />
					4. Provides a custom **hander** interface to handle possible limitations of some APIs. e.g. CORS/Header Referer/Cookie etc.<br />
				</p>

				<h2>Usage:</h2>
				<form class="preview_params">
					Preview Parameter X: <input type="text" name="x" /> Y: <input type="text" name="y" /> Z: <input type="text" name="z" />
					<button onclick="clearXYZFromLocalStorage()">Clear cache</button>
				</form>
				<div class="div_list">{{%items%}}</div>
			</div>
		</body>
		<style>
			.preview_params input {
				width: 4rem;
				height: 1rem;
				font-size: 16px;
				margin: 0.3rem;
				padding: 0.3rem;
				background-color: #f0f0f0;
				border-radius: 10px;
			}
			img {
				max-width: 100%;
				max-height: 100%;
			}
			button {
				padding: 0.5rem;
				background-color: #f0f0f0;
				border: 1px solid #f0f0f0;
				border-radius: 5px;
				cursor: pointer;
			}
			button:hover {
				background-color: #b8b3b3;
			}
			body,
			h1,
			h2,
			h3,
			p {
				margin: 0;
				padding: 0;
			}
			html {
				background-color: beige;
				font-size: 16px;
			}

			.div_item {
				margin: 0.3rem;
				padding: 0.3rem;
				background-color: #f0f0f0;
				border-radius: 10px;
			}
			.div_item .link {
				display: flex;
				justify-content: space-between;
				align-items: center;
				margin-top: 0.3rem;
				margin-bottom: 0.3rem;
				padding: 0.3rem;
				background-color: azure;
				border-radius: 10px;
				color: gray;
			}
			.div_item span {
				overflow: auto;
				white-space: nowrap;
			}
			.div_item .source_url {
				overflow: auto;
				white-space: nowrap;
				background: yellow;
			}

			.div_item .preview {
				margin-top: 0.3rem;
				padding: 0.3rem;
				text-align: center;
			}

			.container {
				margin-left: auto;
				margin-right: auto;
				width: 100vw;
				background-color: bisque;
				box-sizing: border-box;
				padding: 1rem;
				border-radius: 10px;
			}

			@media (min-width: 780px) {
				.container {
					max-width: 80vw;
				}
			}

			.title {
				text-align: center;
				color: blueviolet;
			}

			.description {
				color: #333;
				word-wrap: break-word;
				overflow-wrap: break-word;
				background: paleturquoise;
				padding: 1rem;
				border-style: dashed;
				border-radius: 25px;
			}

			svg {
				width: 50px;
				height: 50px;
				margin: 0 auto;
				display: block;
			}

			body {
				--sb-track-color: #232e33;
				--sb-thumb-color: #6baf8d;
				--sb-size: 10px;

				scrollbar-color: var(--sb-thumb-color) var(--sb-track-color);
			}

			body::-webkit-scrollbar {
				width: var(--sb-size);
			}

			body::-webkit-scrollbar-track {
				background: var(--sb-track-color);
				border-radius: 10px;
			}

			body::-webkit-scrollbar-thumb {
				background: var(--sb-thumb-color);
				border-radius: 10px;
			}
		</style>
		<script>
			const CoordinatesKey = 'coordinates'

			function handleCopy(event) {
				const text = event.target.parentElement.querySelector('span').innerText
				navigator.clipboard.writeText(text).then(
					() => {
						alert('Copied to clipboard')
					},
					(err) => {
						console.error('Failed to copy: ', err)
					},
				)
			}

			function readXYZFromInput() {
				const x = document.querySelector('.preview_params input[name="x"]').value
				const y = document.querySelector('.preview_params input[name="y"]').value
				const z = document.querySelector('.preview_params input[name="z"]').value
				return { x, y, z }
			}
			function saveXYZtoLoaclStorage() {
				let { x, y, z } = readXYZFromInput()
				if (x === '' || y === '' || z === '') {
					return
				}
				localStorage.setItem(CoordinatesKey, JSON.stringify({ x, y, z }))
			}
			function loadXYZFromLocalStorage() {
				let { x, y, z } = JSON.parse(localStorage.getItem(CoordinatesKey)) || { x: '', y: '', z: '' }
				document.querySelector('.preview_params input[name="x"]').value = x
				document.querySelector('.preview_params input[name="y"]').value = y
				document.querySelector('.preview_params input[name="z"]').value = z
			}

			function clearXYZFromLocalStorage() {
				localStorage.removeItem(CoordinatesKey)
			}

			onload = () => {
				loadXYZFromLocalStorage()
				changePreview()
			}

			function changePreview() {
				let { x, y, z } = readXYZFromInput()

				console.log(\`Input x: \${x}, y: \${y}, z: \${z}\`)
				if (x === '' || y === '' || z === '') {
					return
				}
				saveXYZtoLoaclStorage()
				const imgs = document.querySelectorAll('.div_item .preview img')
				for (let i = 0; i < imgs.length; i++) {
					let originSrc = imgs[i].src
					let mainSrc = originSrc.split('/').slice(0, 5).join('/')
					let newSrc = mainSrc + \`/\${x}/\${y}/\${z}\`
					console.log(\`Change src: \${originSrc} to \${newSrc}\`)
					imgs[i].src = newSrc
				}
			}
			document.querySelector('.preview_params').addEventListener('input', changePreview)
		</script>
	</html>
`

export const renderItems = (mapSourceList: Array<MapSource>, hostname: string): string => {
	let html = ''
	mapSourceList.forEach((source) => {
		html += `
        <div class="div_item">
            <h3>${source.name} -- ${source.type}</h3>
            <div class="link">
                <span>${hostname}/map/${source.type}/{$x}/{$y}/{$z}</span>
                <button onclick="handleCopy(event)">copy</button>
            </div>
			Source: <p class="source_url">${source.url}</p>
            <div class="preview">
                <p>Preview:</p>
                <img src="${hostname}/map/${source.type}/1/1/1" alt="${source.name}" />
            </div>
        </div>
        `
	})
	return html
}
export const renderHTML = (replaceKey: string, content: string): string => {
	return HTMLTamplate.replace(`{{%${replaceKey}%}}`, content)
}
