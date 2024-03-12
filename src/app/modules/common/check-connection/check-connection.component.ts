import {Component, ElementRef, ViewChild} from "@angular/core";


const mediaConstraints = {
  audio: true,
  video: {width: 1280, height: 720}
  // video: {width: 1280, height: 720} // 16:9
  // video: {width: 960, height: 540}  // 16:9
  // video: {width: 640, height: 480}  //  4:3
  // video: {width: 160, height: 120}  //  4:3
};

const offerOptions = {
  offerToReceiveAudio: true,
  offerToReceiveVideo: true
};


@Component({
  selector: 'check-connection',
  templateUrl: './check-connection.component.html',
})
export class CheckConnectionComponent {
  @ViewChild('local_video') localVideo: ElementRef | undefined;
  @ViewChild('volume_test') volumeTest: ElementRef | undefined;

  isMicrophoneMenuOpened: boolean = false;
  isCameraMenuOpened: boolean = false;
  isOutputMenuOpened: boolean = false;

  private stream: MediaStream | undefined;
  audioContext: AudioContext | undefined;

  isCameraEnabled = false;
  isMicrophoneEnabled = false;

  constructor() {
    this.requestMediaDevices().then(() => {
      this.stream!.getAudioTracks()[0].enabled = this.isMicrophoneEnabled;
      if (this.stream){
        this.isMicrophoneEnabled = !this.isMicrophoneEnabled;
        this.stream.getAudioTracks()[0].enabled = this.isMicrophoneEnabled;
        if (this.isMicrophoneEnabled){
          this.audioContext = new AudioContext();
          const analyser = this.audioContext.createAnalyser();
          const microphone = this.audioContext.createMediaStreamSource(this.stream);
          const scriptProcessor = this.audioContext.createScriptProcessor(2048, 1, 1);

          analyser.smoothingTimeConstant = 0.8;
          analyser.fftSize = 1024;

          microphone.connect(analyser);
          analyser.connect(scriptProcessor);
          scriptProcessor.connect(this.audioContext.destination);
          scriptProcessor.onaudioprocess = () => {
            const array = new Uint8Array(analyser.frequencyBinCount);
            analyser.getByteFrequencyData(array);
            const arraySum = array.reduce((a, value) => a + value, 0);
            const average = arraySum / array.length;
            this.setSoundVolume(Math.round(average))
          };
        }
        else{
          this.audioContext!.close();
          this.setSoundVolume(0);
        }
      }
    });
  }

  private async requestMediaDevices(): Promise<void> {
    try {
      this.stream = await navigator.mediaDevices.getUserMedia(mediaConstraints);
      // pause all tracks
      // this.pauseLocalVideo();
    } catch (e) {
      console.error(e);
      // @ts-ignore
      alert(`getUserMedia() error: ${e.name}`);
    }
  }

  switchMicrophone(){
    console.log(this.stream)
    if (this.stream){
      this.isMicrophoneEnabled = !this.isMicrophoneEnabled;
      this.stream.getAudioTracks()[0].enabled = this.isMicrophoneEnabled;
      if (this.isMicrophoneEnabled){
        this.audioContext = new AudioContext();
        const analyser = this.audioContext.createAnalyser();
        const microphone = this.audioContext.createMediaStreamSource(this.stream);
        const scriptProcessor = this.audioContext.createScriptProcessor(2048, 1, 1);

        analyser.smoothingTimeConstant = 0.8;
        analyser.fftSize = 1024;

        microphone.connect(analyser);
        analyser.connect(scriptProcessor);
        scriptProcessor.connect(this.audioContext.destination);
        scriptProcessor.onaudioprocess = () => {
          const array = new Uint8Array(analyser.frequencyBinCount);
          analyser.getByteFrequencyData(array);
          const arraySum = array.reduce((a, value) => a + value, 0);
          const average = arraySum / array.length;
          this.setSoundVolume(Math.round(average))
        };
      }
      else{
        this.audioContext!.close();
        this.setSoundVolume(0);
      }
    }
  }

  private setSoundVolume(vol: number){
    let allPids = [...this.volumeTest?.nativeElement.children];
    const numberOfPidsToColor = Math.round(vol / 10);
    const pidsToColor = allPids.slice(0, numberOfPidsToColor);
    for (const pid of allPids) {
      pid.style.backgroundColor = "#e6e7e8";
    }
    for (const pid of pidsToColor) {
      pid.style.backgroundColor = "#69ce2b";
    }
  }

  switchCamera(){
    if (this.stream){
      this.isCameraEnabled = !this.isCameraEnabled;
      this.stream.getVideoTracks()[0].enabled = this.isCameraEnabled;
      this.stream.getAudioTracks().forEach(track => track.enabled = this.isCameraEnabled);
      if (this.isCameraEnabled){
        this.localVideo!.nativeElement.srcObject = this.stream;
      }
    }
  }
}
