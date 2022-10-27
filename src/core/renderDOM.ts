import Block from './Block'

export default function renderDOM(block: Block) {
	const root = document.querySelector('#app') as HTMLDivElement
	root!.innerHTML = ''
	root!.appendChild(block.getContent())
}
