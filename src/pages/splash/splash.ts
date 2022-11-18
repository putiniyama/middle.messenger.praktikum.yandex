import { Block } from '../../core'

type SplashPageProps = {}

export class SplashPage extends Block<SplashPageProps> {
	static componentName = 'SplashPage'

	render() {
		return `
    <div class="authorization">
      <div class="authorization__wrapper">
			<h1 class='authorization__title'>Загрузка...</h1>		
      </div>
    </div>
    `
	}
}

export default SplashPage
