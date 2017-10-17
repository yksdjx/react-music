import React from 'react'
import PlayerListItem from './playerListItem'

let PlayerList = React.createClass({
    
    render() {
        let listDom = null;
        let slef = this;
        listDom = this.props.musicList.map((item) => {
            console.log(item)
            return <PlayerListItem key={item.id} musicItem = {item} focus={item ===this.props.currentMusicItem} />
        }); 
        return (
            <ul className="list-group">
                {listDom}
            </ul>
        )
    }
});

export default PlayerList;