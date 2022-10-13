import { renderDOM, registerComponent } from './core'

import './app.css'

import HTTPTransport from './api'

import Button from './components/button'
import Chat from './components/chat'
import Input from './components/input'
import ErrorComponent from './components/error'
import ControlledInput from './components/controlledInput'
import { LoginPage } from 'pages/login/login'
import { ProfilePage } from 'pages/profile/profile'
import { SignUpPage } from 'pages/signup/signup'
import { PasswordChangePage } from 'pages/password-change/password-change'
import { ChatsPage } from './pages/chats/chats'
import { title } from 'process'

require('babel-core/register')

registerComponent(Button)
registerComponent(Chat)
registerComponent(Input)
registerComponent(ErrorComponent)
registerComponent(ControlledInput)

const root = document.querySelector('#app') as HTMLDivElement

document.addEventListener('DOMContentLoaded', () => {
	renderDOM(new LoginPage(), root)
	// new HTTPTransport().get('https://localhost:1234', {
	// 	title: ['asd', '4uiutr'],
	// })
})

export function signUpPage() {
	renderDOM(new SignUpPage(), root)
}

export function chatsPage() {
	renderDOM(new ChatsPage(), root)
}

export function profilePage() {
	renderDOM(new ProfilePage(), root)
}

export function passwordChangePage() {
	renderDOM(new PasswordChangePage(), root)
}
