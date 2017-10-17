import React from 'react'
import Header from './components/header'
import Player from './page/player'
import 'bootstrap/dist/css/bootstrap.css'
import PlayerList from './page/playerList'
import { MUSIC_LIST } from './config/music_list'
import { Router, IndexRoute, Link, Route, hashHistory } from 'react-router'
import Pubsub from 'pubsub-js'

let duration = null;
let App = React.createClass({
	getInitialState() {
		return {
			musicList:MUSIC_LIST,
			currentMusicItem:MUSIC_LIST[0]
		}
	},
	playMusic(musicItem){
		$('#player').jPlayer('setMedia', {
			mp3: musicItem.file
		}).jPlayer('play');
		this.setState({
			currentMusicItem:musicItem
		});
	},
	playNext( type = 'next'){
		let index = this.findMusicIndex(this.state.currentMusicItem);
		let newIndex=null,musicListLength = this.state.musicList.length;
		if(type === 'next'){
			newIndex = (index+1) % musicListLength;
		}else{
			newIndex = (index-1 +musicListLength ) % musicListLength;
		}
		this.playMusic(this.state.musicList[newIndex])
	},
	findMusicIndex(musicItem){
		return this.state.musicList.indexOf(musicItem)
	},
	componentDidMount() {
		var self = this;
		$('#player').jPlayer({
			ready: function() {
				$(this).jPlayer('setMedia', {
					mp3: self.state.currentMusicItem.file
				}).jPlayer('play');
			},
			supplied: 'mp3',
			wmode: 'window'
		});
		$('#player').bind($.jPlayer.event.ended,(e) => {
			this.playNext();
		})
		this.playMusic(this.state.currentMusicItem);
		Pubsub.subscribe('DELETE_MUSIC',(msg,musicItem) => {
			this.setState({
				musicList:this.state.musicList.filter(item =>{
					return item !== musicItem
				})
			})
		});
		Pubsub.subscribe('PLAY_MUSIC',(msg,musicItem) => {
			this.playMusic(musicItem)
		});
		Pubsub.subscribe('PLAY_PREV',(msg,musicItem) => {
			this.playNext('prev')
		});
		Pubsub.subscribe('PLAY_NEXT',(msg,musicItem) => {
			this.playNext('next')
		});

		
	},
	componentWillUnmount() {
		Pubsub.unsubscribe('DELETE_MUSIC');
		Pubsub.unsubscribe('PLAY_MUSIC');
		Pubsub.unsubscribe('PLAY_PREV');
		Pubsub.unsubscribe('PLAY_NEXT');
		$('#player').unbind($.jPlayer.event.ended)
	},
	progressChangeHandler(progress){
		$('#player').jPlayer('play',duration * progress);
	},
	render() {
		return ( 
			<div>
				<Header />
				{React.cloneElement(this.props.children,this.state)}
			</div>
		)
	}
})


let Root = React.createClass({
	render() {
		return (
			<Router history={hashHistory}>
				<Route path="/" component={App}>
					<IndexRoute component={Player}></IndexRoute>
					<Route path="/list" component={PlayerList}></Route>
				</Route>
			</Router>
		);

	}
})

export default Root;