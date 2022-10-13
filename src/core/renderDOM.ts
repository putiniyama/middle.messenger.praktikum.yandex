import Block from './Block'

export default function renderDOM(block: Block, root: HTMLDivElement) {
	root!.innerHTML = ''
	root!.appendChild(block.getContent())
}
