import {
  AfterViewInit,
  Component,
  ElementRef, OnInit,
  ViewChild,
} from "@angular/core";
import {WebRtcConfig} from "../../../core/configs/web-rtc.config";
import {VideoWebsocketService, Message} from "../../../core/services/video-chat/video-websocket.service";

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
  selector: 'online-meeting-component',
  templateUrl: './online-meeting.component.html',
})
export class OnlineMeetingComponent implements AfterViewInit {

  //@ts-ignore
  @ViewChild('local_video') localVideo: ElementRef;

  //@ts-ignore
  @ViewChild('remote_video', {static: false}) remoteVideo: ElementRef;

  //@ts-ignore
  private peerConnection: RTCPeerConnection;

  //@ts-ignore
  private stream: MediaStream;

  //@ts-ignore
  audioContext: AudioContext;

  inCall = false;
  isCameraEnabled = false;
  isMicrophoneEnabled = false;

  constructor(private dataService: VideoWebsocketService) {}

  switchMicrophone(){
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
        this.audioContext.close();
        this.setSoundVolume(0);
      }
    }
  }

  private setSoundVolume(vol: number){
    let allPids: any[];
    // @ts-ignore
    allPids = [...document.querySelectorAll('.pid')];
    const numberOfPidsToColor = Math.round(vol / 10);
    const pidsToColor = allPids.slice(0, numberOfPidsToColor);
    for (const pid of allPids) {
      pid.style.backgroundColor = "#e6e7e8";
    }
    for (const pid of pidsToColor) {
      // console.log(pid[i]);
      pid.style.backgroundColor = "#69ce2b";
    }
  }

  switchCamera(){
    if (this.stream){
      this.isCameraEnabled = !this.isCameraEnabled;
      this.stream.getVideoTracks()[0].enabled = this.isCameraEnabled;
      if (this.isCameraEnabled){
        this.localVideo.nativeElement.srcObject = this.stream;
      }
    }
  }

  async call(): Promise<void> {
    this.createPeerConnection();

    // Add the tracks from the local stream to the RTCPeerConnection
    this.stream.getTracks().forEach(
      track => this.peerConnection.addTrack(track, this.stream)
    );

    try {
      const offer: RTCSessionDescriptionInit = await this.peerConnection.createOffer(offerOptions);
      // Establish the offer as the local peer's current description.
      await this.peerConnection.setLocalDescription(offer);

      this.inCall = true;

      this.dataService.sendMessage({type: 'offer', data: offer});
    } catch (err) {
      // @ts-ignore
      this.handleGetUserMediaError(err);
    }
  }

  hangUp(): void {
    this.dataService.sendMessage({type: 'hangup', data: ''});
    this.closeVideoCall();
  }

  ngAfterViewInit(): void {
    this.addIncomingMessageHandler();
    this.requestMediaDevices();
  }

  private addIncomingMessageHandler(): void {
    this.dataService.connect();

    // this.transactions$.subscribe();
    this.dataService.messages$.subscribe(
      // @ts-ignore
      msg => {
        console.log('Received message: ' + msg.data);
        switch (msg.type) {
          case 'offer':
            this.handleOfferMessage(msg.data);
            break;
          case 'answer':
            this.handleAnswerMessage(msg.data);
            break;
          case 'hangup':
            this.handleHangupMessage(msg);
            break;
          case 'ice-candidate':
            this.handleICECandidateMessage(msg.data);
            break;
          default:
            console.log('unknown message of type ' + msg.type);
        }
      },
      // @ts-ignore
      error => console.log(error)
    );
  }

  /* ########################  MESSAGE HANDLER  ################################## */

  private handleOfferMessage(msg: RTCSessionDescriptionInit): void {
    console.log('handle incoming offer');
    if (!this.peerConnection) {
      this.createPeerConnection();
    }

    if (!this.stream) {
      // this.startLocalVideo();
    }

    this.peerConnection.setRemoteDescription(new RTCSessionDescription(msg))
      .then(() => {

        // add media stream to local video
        this.localVideo.nativeElement.srcObject = this.stream;

        // add media tracks to remote connection
        this.stream.getTracks().forEach(
          track => this.peerConnection.addTrack(track, this.stream)
        );

      }).then(() => {

      // Build SDP for answer message
      return this.peerConnection.createAnswer();

    }).then((answer) => {

      // Set local SDP
      return this.peerConnection.setLocalDescription(answer);

    }).then(() => {

      // Send local SDP to remote party
      this.dataService.sendMessage({type: 'answer', data: this.peerConnection.localDescription});

      this.inCall = true;

    }).catch(this.handleGetUserMediaError);
  }

  private handleAnswerMessage(msg: RTCSessionDescriptionInit): void {
    console.log('handle incoming answer');
    this.peerConnection.setRemoteDescription(msg);
  }

  private handleHangupMessage(msg: Message): void {
    this.closeVideoCall();
  }

  private handleICECandidateMessage(msg: RTCIceCandidate): void {
    const candidate = new RTCIceCandidate(msg);
    this.peerConnection.addIceCandidate(candidate).catch(this.reportError);
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

  turnOnCamera(){
    this.stream.getTracks().forEach(track => {
      track.enabled = true;
    });
    this.localVideo.nativeElement.srcObject = this.stream;
    this.isCameraEnabled = true;
  }

  turnOffCamera(): void {
    console.log('pause local stream');
    this.stream.getTracks().forEach(track => {
      track.enabled = false;
    });
    this.localVideo.nativeElement.srcObject = undefined;
    this.isCameraEnabled = false;
  }

  private createPeerConnection(): void {
    console.log('creating PeerConnection...');
    this.peerConnection = new RTCPeerConnection(WebRtcConfig.rtcPeerConfiguration);
    console.log(this.peerConnection)
    this.peerConnection.onicecandidate = this.handleICECandidateEvent;
    this.peerConnection.oniceconnectionstatechange = this.handleICEConnectionStateChangeEvent;
    this.peerConnection.onsignalingstatechange = this.handleSignalingStateChangeEvent;
    this.peerConnection.ontrack = this.handleTrackEvent;
  }

  private closeVideoCall(): void {
    console.log('Closing call');

    if (this.peerConnection) {
      console.log('--> Closing the peer connection');

      this.peerConnection.ontrack = null;
      this.peerConnection.onicecandidate = null;
      this.peerConnection.oniceconnectionstatechange = null;
      this.peerConnection.onsignalingstatechange = null;

      // Stop all transceivers on the connection
      this.peerConnection.getTransceivers().forEach(transceiver => {
        transceiver.stop();
      });

      // Close the peer connection
      this.peerConnection.close();
      // @ts-ignore
      this.peerConnection = null;

      this.inCall = false;
    }
  }

  /* ########################  ERROR HANDLER  ################################## */
  private handleGetUserMediaError(e: Error): void {
    switch (e.name) {
      case 'NotFoundError':
        alert('Unable to open your call because no camera and/or microphone were found.');
        break;
      case 'SecurityError':
      case 'PermissionDeniedError':
        // Do nothing; this is the same as the user canceling the call.
        break;
      default:
        console.log(e);
        alert('Error opening your camera and/or microphone: ' + e.message);
        break;
    }

    this.closeVideoCall();
  }

  private reportError = (e: Error) => {
    console.log('got Error: ' + e.name);
    console.log(e);
  }

  /* ########################  EVENT HANDLER  ################################## */
  private handleICECandidateEvent = (event: RTCPeerConnectionIceEvent) => {
    console.log(event);
    if (event.candidate) {
      this.dataService.sendMessage({
        type: 'ice-candidate',
        data: event.candidate
      });
    }
  }

  private handleICEConnectionStateChangeEvent = (event: Event) => {
    console.log(event);
    switch (this.peerConnection.iceConnectionState) {
      case 'closed':
      case 'failed':
      case 'disconnected':
        this.closeVideoCall();
        break;
    }
  }

  private handleSignalingStateChangeEvent = (event: Event) => {
    console.log(event);
    switch (this.peerConnection.signalingState) {
      case 'closed':
        this.closeVideoCall();
        break;
    }
  }

  private handleTrackEvent = (event: RTCTrackEvent) => {
    console.log('Remote event: ', event);
    this.remoteVideo.nativeElement.srcObject = event.streams[0];
  }
}
