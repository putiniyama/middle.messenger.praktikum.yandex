import OnboardingPage from 'pages/onboarding'
import LoginPage from 'pages/login'
import ProfilePage from 'pages/profile'
import { BlockClass } from 'core'
import { SignUpPage } from 'pages/signup/signup'
import { ChatsPage } from 'pages/chats/chats'
import { PasswordPage } from 'pages/password-change/password-change'

export enum Pages {
	Onboarding = 'onboarding',
	Login = 'login',
	Profile = 'profile',
	Signup = 'signup',
	Chats = 'chats',
	Password = 'password'
}

const map: Record<Pages, BlockClass<any>> = {
	[Pages.Onboarding]: OnboardingPage,
	[Pages.Login]: LoginPage,
	[Pages.Profile]: ProfilePage,
	[Pages.Signup]: SignUpPage,
	[Pages.Chats]: ChatsPage,
	[Pages.Password]: PasswordPage
}

export const getScreenComponent = (page: Pages): BlockClass<any> => {
	return map[page]
}
