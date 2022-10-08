require('babel-core/register')
import { Block, renderDOM, registerComponent } from './core'

import './app.css'

import Button from './components/button'
import Chat from './components/chat'
import Input from './components/input'
import ErrorComponent from './components/error'
import ControlledInput from './components/controlledInput'
import { LoginPage } from 'pages/login/login'
import { ProfilePage } from 'pages/profile/profile'
import { SignUpPage } from 'pages/signup/signup'
import { PasswordChangePage } from 'pages/password-change/password-change'
// import { OnboardingPage } from './pages/onboarding/onboarding'
import { ChatsPage } from './pages/chats/chats'

registerComponent(Button)
registerComponent(Chat)
registerComponent(Input)
registerComponent(ErrorComponent)
registerComponent(ControlledInput)
// registerComponent(Layout)

document.addEventListener('DOMContentLoaded', () => {
	renderDOM(new LoginPage())
	//renderDOM(new ProfilePage())
})

export function signUpPage() {
	renderDOM(new SignUpPage())
}

export function chatsPage() {
	renderDOM(new ChatsPage())
}

export function profilePage() {
	renderDOM(new ProfilePage())
}

export function passwordChangePage() {
	renderDOM(new PasswordChangePage())
}
