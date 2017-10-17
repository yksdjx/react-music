import React from 'react'
import Pubsub from 'pubsub-js'

let PlayerListItem = React.createClass({
    playMusic(musicItem){
        Pubsub.publish('PLAY_MUSIC',musicItem)
    },
    deleteMusic(musicItem,e){
        e.stopPropagation();
        Pubsub.publish('DELETE_MUSIC',musicItem)
    },
    render() {
        let musicItem = this.props.musicItem;
        return (
            <li onClick={this.playMusic.bind(this,musicItem)} key={musicItem.id} className={`list-group-item ${this.props.focus?'list-group-item-success':''}`} >
                {musicItem.title} - {musicItem.artist}
                <button onClick={this.deleteMusic.bind(this,musicItem)} type="button" className="close"><span aria-hidden="true">×</span></button>
            </li>
        )
    }
});
export default PlayerListItem;