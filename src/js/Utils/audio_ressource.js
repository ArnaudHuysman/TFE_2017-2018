
import BufferLoader from './loader'

import gsap from 'gsap';
var TweenMax = gsap.TweenMax;

class Audio {
  constructor(buffer, ctx, audio){

    this.buffer = buffer;
    this.context = ctx;

    this.name = audio.name;
    this.type = audio.type;
    this.on = false;
    this.mute = false;

    this.createSource();
  }

  createSource(){
    let source = this.context.createBufferSource();
    let gainNode = this.context.createGain ? this.context.createGain() : this.context.createGainNode();
    source.buffer = this.buffer;
    source.loop = true;
    source.connect(gainNode);
    gainNode.connect(this.context.destination);

    this.source =  source;
    this.gainNode = gainNode;
  }

  play(loop){
    if(!this.on){
      this.source.start(0);
      this.gainNode.gain.value = 0;
      this.source.loop = loop;
      this.on = true;
    }
  }

  stop(){
    if(this.on){
      this.source.stop(0);
      this.on = false;
    }
  }


}

export default class AudioRessource{
  constructor(audios,callback){

      this.callback = callback;
      this.audios = audios;

      this.audiosSrc = this.audios.map(audio => audio.src );
      this.audioContext = new AudioContext();

      this.bufferLoader = new BufferLoader(
        this.audioContext,
        this.audiosSrc,
        this.load.bind(this)
      );

      this.bufferLoader.load();
  }

  load(bufferList){
    this.sources = bufferList.map((buffer, i) => {
        return new Audio(buffer, this.audioContext, this.audios[i]);
      })
    this.callback();
  }

  play(name, loop){
    let source = this.getSource(name);
    source.play(loop);
  }

  stop(name){

    let source = this.getSource(name);

    source.stop();
  }

  mix(time, name1, name2){
    let source1 = this.getSource(name1);

    TweenMax.to( source1.gainNode.gain, time , {
      value : 1,
      ease: Power2.easeOut
    })

    if(name2){
      let source2 = this.getSource(name2);

      TweenMax.to( source2.gainNode.gain, time , {
        value : 0,
        ease: Power2.easeIn
      })
    }
  }

  getSource(name){
    let source
    this.sources.map(src => {
      if(src.name === name ) source = src;
    });
    return source;
  }
}
