import React from 'react';
import Progress from '../components/progress'
import './player.less'
var duration =null;
let Player = React.createClass({
	getInitialState() {
		return {
			progress: '-'
		}
	},
	componentDidMount(){
		$('#player').bind($.jPlayer.event.timeupdate, (e) => {
			duration = e.jPlayer.status.duration;
			this.setState({
				progress: e.jPlayer.status.currentPercentAbsolute
			})
		});
	},
	componentWillUnmount() {
		$('#player').unbind($.jPlayer.event.timeupdate);
	},
	progressChangeHandler(progress){
		$('#player').jPlayer('play',duration * progress);
	},
	render() {
		return (
			<div className="player-page">
				<Progress 
					progress = {
						this.state.progress
					} 
					onProgressChange = { this.progressChangeHandler}
					barColor = "#f00"
				>
				</Progress>
			</div>
		)
	}
});

export  default Player;