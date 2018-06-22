import {keys}  from './utils';
import { ArmStandAnimation, ArmShootAnimation, LegStandAnimation } from '../Heroes/animations'

export function updateMvt(){

  let mvt = {
    x : 0,
    y : 0
  }

  let nbrKeyPressed = 0;

  let speed = 0; 

  let lgt = Object.keys(Key._pressed).length;

  speed = lgt > 1 ? 2 : 2.5;

  if(Key.isDown(90)) mvt.y = speed;
  if(Key.isDown(83)) mvt.y = -speed;
  if(Key.isDown(68)) mvt.x = speed;
  if(Key.isDown(81)) mvt.x = -speed;

  return mvt;
}


export const Key = {
  _pressed: {},

  LEFT: 81,
  UP: 90,
  RIGHT: 68,
  DOWN: 83,

  isDown: function(keyCode) {
    return this._pressed[keyCode]
  },

  onKeydown: function(event) {
    this._pressed[event.keyCode] = true;
  },

  onKeyup: function(event) {
    delete this._pressed[event.keyCode];
  }
}
