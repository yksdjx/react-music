import React from 'react';
import Progress from '../components/progress'
import './player.less'
var duration =null,currentTime=0;
let Player = React.createClass({
	getInitialState() {
		return {
			progress: '-',
			play: true
		}
	},
	componentDidMount(){
		$('#player').bind($.jPlayer.event.timeupdate, (e) => {
			duration = e.jPlayer.status.duration;
			currentTime = e.jPlayer.status.currentTime;
			this.setState({
				progress: e.jPlayer.status.currentPercentAbsolute
			})
		});
	},
	componentWillUnmount() {
		$('#player').unbind($.jPlayer.event.timeupdate);
	},
	progressChangeHandler(progress){
		console.log(progress)
		$('#player').jPlayer('play',duration * progress);
	},
	controlPlay(){
		if(this.state.play){
			$('#player').jPlayer('pause');
			this.setState({
				play: false
			})
		}else{
			$('#player').jPlayer('play');
			this.setState({
				play: true
			})
		}
		
		
	},
	stop(){
		$('#player').jPlayer('pause',0);
	},
	backward(){
		currentTime = currentTime<5?5:currentTime;
		$('#player').jPlayer('play',currentTime-5);
	},
	forward(){
		$('#player').jPlayer('play',currentTime+5);
	},
	fastForward(){
		console.log($('#player').jPlayer.status)
		//$('#player').jPlayer('pause');
	},
	render() {
		var playBtn;
		if(this.state.play){
			playBtn = <span className="glyphicon  glyphicon-pause"></span>;
		}else{
			playBtn = <span className="glyphicon  glyphicon-play"></span>;
		}
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

				<div className="control">
					<button className="btn"><span className="glyphicon glyphicon-fast-backward"></span></button>
					<button className="btn"  onClick={this.backward}><span className="glyphicon glyphicon-backward"></span></button>
					<button className="btn" onClick={this.controlPlay} ref = "playBtn">
						{playBtn}
					</button>
					<button className="btn" onClick={this.stop}><span className="glyphicon glyphicon-stop"></span></button>
					<button className="btn" onClick={this.forward}><span className="glyphicon glyphicon-forward"></span></button>
					<button className="btn" onClick={this.fastForward}><span className="glyphicon glyphicon-fast-forward"></span></button>
				</div>
			</div>
		)
	}
});

export  default Player;