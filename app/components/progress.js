import React from 'react'
import './progress.less'

let Progress  =  React.createClass({
	getDfaultProps(){
		return {
			barColor:'#f29348'
		}
	},
	changeProgress(e){
		let progressBar = this.refs.progressBar;
		let progress = (e.clientX - progressBar.getBoundingClientRect().left) / progressBar.clientWidth;
		this.props.onProgressChange && this.props.onProgressChange(progress)
	},
	render(){
		return (
			<div className="component-progress" onClick={this.changeProgress} ref = "progressBar">
				<div className="progress"  style={{ width: `${this.props.progress}%`,background:this.props.barColor}}></div>
				
			</div>
			)
	}
})

export default Progress