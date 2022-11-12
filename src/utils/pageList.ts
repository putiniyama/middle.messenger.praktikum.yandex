import OnboardingPage from '../pages/onboarding/index'
import LoginPage from '../pages/login/index'
import ProfilePage from '../pages/profile/index'
import { BlockClass } from 'core'
import SignUpPage from '../pages/signup/index'
import ChatsPage from '../pages/chats/index'
import PasswordPage from '../pages/password-change/'

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
