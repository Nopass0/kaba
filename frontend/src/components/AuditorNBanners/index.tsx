import React from 'react'
import s from './index.module.scss'
import Row from '../Row'
import Col from '../Col'
import NavLabel from '../NavLabel/index'
import Line from '../Line'
import Label from '../Label'
import AuditorNBannersComponent from '../AudNBanComponent/index'

interface IAuditorNBanners {
	className?: string // Added className prop
	style?: React.CSSProperties
}

const AuditorNBanners: React.FC<IAuditorNBanners> = ({
	style,
	className,
}: IAuditorNBanners) => {
	return (
		<div className={s.wrapper + ' ' + className} style={style}>
			<Row width="560px">
				<Col className={s.AuditorWrapper} width="248px">
					<Row className={s.AuditorHeader} width="248px">
						<NavLabel text="Аудитории" />
						<a href="#!" className={s.blueLink}>
							Перейти
						</a>
					</Row>
					<Line width="560px" className={s.Line} />
					<Col width="248px">
						<NavLabel className={s.navLabel} text="курсы английского языка" />
						<Label isMini={true} text="ID 5748296013" />
					</Col>
					<Line width="280px" className={s.Line_Aud_1} />
					<Line width="280px" className={s.Line} />
					<Col width="248px">
						<NavLabel className={s.navLabel} text="курсы английского языка" />
						<Label isMini={true} text="ID 5748296013" />
					</Col>
					<Line width="280px" className={s.Line_Aud_2} />
				</Col>

				{/* Banners */}
				<Col className={s.BannerWrapper} width="248px">
					<Row className={s.BannerHeader} width="248px">
						<NavLabel text="Баннеры" />
						<a href="#!" className={s.blueLink}>
							Перейти
						</a>
					</Row>
					<Line width="0px" className={s.Line} />
					<Col width="248px">
						<NavLabel className={s.navLabel} text="семинар по ведению блога…" />
						<Label isMini={true} text="ID 5748296013" />
					</Col>
					<Line width="280px" className={s.Line_Ban} />
					<AuditorNBannersComponent
						title="семинар по ведению блога…"
						id="5748296013"
					/>
					<Line width="280px" className={s.Line_Ban} />
					<AuditorNBannersComponent
						title="семинар по ведению блога…"
						id="5748296013"
					/>
					<Line width="280px" className={s.Line_Ban} />
					<AuditorNBannersComponent
						title="семинар по ведению блога…"
						id="5748296013"
					/>
					<Line width="280px" className={s.Line_Ban} />
					<AuditorNBannersComponent
						title="семинар по ведению блога…"
						id="5748296013"
					/>
					<Line width="280px" className={s.Line_Ban} />
					<AuditorNBannersComponent
						title="семинар по ведению блога…"
						id="5748296013"
					/>
				</Col>
			</Row>
			<Line width="393px" className={s.LineHeight} />
		</div>
	)
}

export default AuditorNBanners
