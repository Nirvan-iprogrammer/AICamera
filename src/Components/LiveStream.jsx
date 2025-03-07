import React, { useEffect, useState } from "react";

const LiveStream = () => {
  const [imageSrc, setImageSrc] = useState(null);
  const [alerts, setAlerts] = useState({
    intrusion: false,
    fire: false,
    crowd_alert: false,
  });

  useEffect(() => {
    const ws = new WebSocket("ws://localhost:8000/ws"); // Replace with actual WebSocket URL

    ws.onopen = () => {
      console.log("Connected to WebSocket server");
    };

    ws.onmessage = (event) => {
      const data = JSON.parse(event.data); // Parse JSON message

      // Update image source
      if (data.frame) {
        setImageSrc(`data:image/jpeg;base64,${data.frame}`);
      }

      // Update alerts
      setAlerts({
        intrusion: data.intrusion || false,
        fire: data.fire || false,
        crowd_alert: data.crowd_alert || false,
      });
    };

    ws.onerror = (error) => {
      console.error("WebSocket error:", error);
    };

    ws.onclose = () => {
      console.log("WebSocket connection closed");
    };

    return () => {
      ws.close();
    };
  }, []);

  return (
    <div style={{ textAlign: "center", padding: "20px" }}>
      <h2>Live CCTV Stream</h2>

      {imageSrc ? (
        <img
          src={imageSrc}
          alt="Live Stream"
          style={{
            width: "100%",
            maxHeight: "600px",
            border: "2px solid black",
            borderRadius: "10px",
          }}
        />
      ) : (
        <p>Connecting to live stream...</p>
      )}

      {/* Alert Messages */}
      <div style={{ marginTop: "20px" }}>
        {alerts.intrusion && <p style={{ color: "red" }}>🚨 Intrusion Detected!</p>}
        {alerts.fire && <p style={{ color: "orange" }}>🔥 Fire Detected!</p>}
        {alerts.crowd_alert && <p style={{ color: "blue" }}>👥 Crowd Limit Exceeded!</p>}
      </div>
    </div>
  );
};

export default LiveStream;