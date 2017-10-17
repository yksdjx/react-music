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
						
					</div>
					<div className="media-body">
						Just Your Music
				  	</div>
				</div>
								
				
			</div>
		)
	}
})

export default Header