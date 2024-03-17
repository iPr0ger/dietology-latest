export class WebRtcConfig {
  static rtcPeerConfiguration = {
    iceServers: [
      {
        "urls": "stun:stun.relay.metered.ca:80"
      },
      {
        "urls": "turn:a.relay.metered.ca:80",
        "username": "287927bbd8c42de45bd3303f",
        "credential": "CqZj29N3k4e2+znU"
      },
      {
        "urls": "turn:a.relay.metered.ca:80?transport=tcp",
        "username": "287927bbd8c42de45bd3303f",
        "credential": "CqZj29N3k4e2+znU"
      },
      {
        "urls": "turn:a.relay.metered.ca:443",
        "username": "287927bbd8c42de45bd3303f",
        "credential": "CqZj29N3k4e2+znU"
      },
      {
        "urls": "turn:a.relay.metered.ca:443?transport=tcp",
        "username": "287927bbd8c42de45bd3303f",
        "credential": "CqZj29N3k4e2+znU"
      }
    ],
  }
}
