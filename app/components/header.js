import React from 'react'
import './header.less'


let Header  =  React.createClass({
	getInitialState() {
		return {
			songName: ''
		}
	},
	
	render(){
		return (
			<div className="component-header">
				<div className="media">
					<div className="media-left media-middle">
						<img src="/static/images/logo.png" width="40" className="-col-auto"/>
					</div>
					<div className="media-body">
						<h4 className="media-heading">{this.state.songName}</h4>
				  	</div>
				</div>
								
				
			</div>
		)
	}
})

export default Header