import {Game}  from 'phaser'
Object.defineProperty(Game.prototype,'lifeCycle',{
    value:{
        awakes: [],
        starts: [],
        updates: []
    }
})
export default Game