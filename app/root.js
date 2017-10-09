import React from 'react'
import Header from './components/header'
import Player from './page/player'
import 'bootstrap/dist/css/bootstrap.css'

let duration = null;
let Root = React.createClass({
	getInitialStare() {
		return {
			
		}
	},
	componentDidMount() {
		$('#player').jPlayer({
			ready: function() {
				$(this).jPlayer('setMedia', {
					mp3: 'http://www.jplayer.cn/demos/audio/ogg/%E5%B0%8F%E5%9F%8E%E5%A4%A7%E4%BA%8B.ogg'
				}).jPlayer('play');
			},
			supplied: 'mp3',
			wmode: 'window'
		});
		
	},
	componentWillUnmount() {
	},
	progressChangeHandler(progress){
		$('#player').jPlayer('play',duration * progress);
	},
	render() {
		return ( 
			<div>
				<Header />
				<Player />
			</div>
		)
	}
})

export default Root;