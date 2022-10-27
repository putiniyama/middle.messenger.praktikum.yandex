export function refErrors(
	inputName: string,
	context: any,
	error: string | undefined
) {
	if (inputName === 'login') {
		context.refs.loginInputRef.refs.errorRef.setProps({ text: error })
	}
	if (inputName === 'password') {
		context.refs.passwordInputRef.refs.errorRef.setProps({ text: error })
	}

	if (inputName === 'first_name') {
		context.refs.firstNameInputRef.refs.errorRef.setProps({ text: error })
	}

	if (inputName === 'second_name') {
		context.refs.secondNameInputRef.refs.errorRef.setProps({ text: error })
	}

	if (inputName === 'email') {
		context.refs.emailInputRef.refs.errorRef.setProps({ text: error })
	}

	if (inputName === 'phone') {
		context.refs.phoneInputRef.refs.errorRef.setProps({ text: error })
	}

	if (inputName === 'message') {
		context.refs.messageInputRef.refs.errorRef.setProps({ text: error })
	}

	if (inputName === 'name_view') {
		context.refs.nameViewInputRef.refs.errorRef.setProps({ text: error })
	}

	if (inputName === 'password_old') {
		context.refs.passOldInputRef.refs.errorRef.setProps({ text: error })
	}

	if (inputName === 'password_new') {
		context.refs.passNewInputRef.refs.errorRef.setProps({ text: error })
	}

	if (inputName === 'password_verynew') {
		context.refs.passVeryNewInputRef.refs.errorRef.setProps({ text: error })
	}
}
