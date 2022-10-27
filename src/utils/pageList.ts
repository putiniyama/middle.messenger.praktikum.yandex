import OnboardingPage from 'pages/onboarding'
import LoginPage from 'pages/login'
import ProfilePage from 'pages/profile'
import { BlockClass } from 'core'

export enum Pages {
	Onboarding = 'onboarding',
	Login = 'login',
	Profile = 'profile',
}

const map: Record<Pages, BlockClass<any>> = {
	[Pages.Onboarding]: OnboardingPage,
	[Pages.Login]: LoginPage,
	[Pages.Profile]: ProfilePage,
}

export const getScreenComponent = (page: Pages): BlockClass<any> => {
	return map[page]
}
