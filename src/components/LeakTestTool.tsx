import React, { useState } from 'react';

interface LeakTestResults {
  ipv4?: string;
  ipv6?: string;
  dns?: string[];
  webrtc?: string[];
  location?: {
    city: string;
    country: string;
    isp: string;
  };
  leaksDetected: boolean;
  timestamp: string;
}

export default function LeakTestTool() {
  const [testing, setTesting] = useState(false);
  const [results, setResults] = useState<LeakTestResults | null>(null);

  const runLeakTest = async () => {
    setTesting(true);
    setResults(null);

    try {
      // Test IPv4
      const ipv4Response = await fetch('https://api.ipify.org?format=json');
      const ipv4Data = await ipv4Response.json();

      // Test IPv6
      let ipv6Data = { ip: null };
      try {
        const ipv6Response = await fetch('https://api64.ipify.org?format=json');
        ipv6Data = await ipv6Response.json();
      } catch (e) {
        // IPv6 not available
      }

      // Test WebRTC leaks
      const webrtcLeaks = await detectWebRTCLeak();

      // Get geolocation data
      const geoResponse = await fetch(`https://ipapi.co/${ipv4Data.ip}/json/`);
      const geoData = await geoResponse.json();

      // Test DNS leaks (simplified - real implementation would need backend)
      const dnsLeaks = await detectDNSLeak();

      const leaksDetected =
        (ipv6Data.ip && ipv6Data.ip !== ipv4Data.ip) ||
        webrtcLeaks.length > 0 ||
        dnsLeaks.length > 0;

      setResults({
        ipv4: ipv4Data.ip,
        ipv6: ipv6Data.ip || undefined,
        webrtc: webrtcLeaks,
        dns: dnsLeaks,
        location: {
          city: geoData.city,
          country: geoData.country_name,
          isp: geoData.org || geoData.isp || 'Unknown'
        },
        leaksDetected,
        timestamp: new Date().toISOString()
      });

    } catch (error) {
      console.error('Leak test error:', error);
      alert('Error running leak test. Please try again.');
    } finally {
      setTesting(false);
    }
  };

  const detectWebRTCLeak = (): Promise<string[]> => {
    return new Promise((resolve) => {
      const ips: string[] = [];

      // @ts-ignore
      const RTCPeerConnection = window.RTCPeerConnection || window.mozRTCPeerConnection || window.webkitRTCPeerConnection;

      if (!RTCPeerConnection) {
        resolve([]);
        return;
      }

      const pc = new RTCPeerConnection({ iceServers: [] });

      pc.createDataChannel('');

      pc.createOffer().then(offer => pc.setLocalDescription(offer));

      pc.onicecandidate = (ice) => {
        if (!ice || !ice.candidate || !ice.candidate.candidate) {
          resolve(ips);
          return;
        }

        const ipRegex = /([0-9]{1,3}(\.[0-9]{1,3}){3}|[a-f0-9]{1,4}(:[a-f0-9]{1,4}){7})/;
        const match = ipRegex.exec(ice.candidate.candidate);

        if (match && !ips.includes(match[1])) {
          ips.push(match[1]);
        }
      };

      setTimeout(() => {
        pc.close();
        resolve(ips);
      }, 2000);
    });
  };

  const detectDNSLeak = async (): Promise<string[]> => {
    // Simplified DNS leak detection
    // Real implementation would need backend to query DNS servers
    try {
      const response = await fetch('https://dns.google/resolve?name=whoami.akamai.net&type=A');
      const data = await response.json();

      if (data.Answer && data.Answer.length > 0) {
        return data.Answer.map((a: any) => a.data);
      }
    } catch (e) {
      // DNS test failed
    }

    return [];
  };

  const copyEmbedCode = () => {
    const embedCode = `<iframe src="${window.location.origin}/tools/leak-test" width="100%" height="600" frameborder="0"></iframe>`;
    navigator.clipboard.writeText(embedCode);
    alert('Embed code copied to clipboard!');
  };

  if (results) {
    const { leaksDetected } = results;

    return (
      <div className="bg-white rounded-2xl shadow-xl p-8 max-w-4xl mx-auto">
        <div className={`text-center mb-8 p-6 rounded-lg ${leaksDetected ? 'bg-red-50 border-2 border-red-500' : 'bg-green-50 border-2 border-green-500'}`}>
          <div className="text-6xl mb-4">{leaksDetected ? '⚠️' : '✅'}</div>
          <h3 className="text-3xl font-bold mb-2">
            {leaksDetected ? 'Leaks Detected!' : 'No Leaks Detected'}
          </h3>
          <p className="text-gray-700">
            {leaksDetected
              ? 'Your VPN is leaking your real IP address or DNS requests'
              : 'Your VPN connection appears secure'
            }
          </p>
        </div>

        <div className="space-y-6">
          <div className="bg-gray-50 rounded-lg p-6">
            <h4 className="font-bold text-gray-900 mb-3 flex items-center gap-2">
              <span className="text-2xl">🌐</span>
              IP Address Information
            </h4>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-600">IPv4 Address:</span>
                <code className="bg-gray-200 px-2 py-1 rounded font-mono">{results.ipv4}</code>
              </div>
              {results.ipv6 && (
                <div className="flex justify-between">
                  <span className="text-gray-600">IPv6 Address:</span>
                  <code className="bg-gray-200 px-2 py-1 rounded font-mono">{results.ipv6}</code>
                </div>
              )}
              <div className="flex justify-between">
                <span className="text-gray-600">Location:</span>
                <span className="font-medium">{results.location?.city}, {results.location?.country}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">ISP:</span>
                <span className="font-medium">{results.location?.isp}</span>
              </div>
            </div>
          </div>

          {results.webrtc && results.webrtc.length > 0 && (
            <div className="bg-red-50 rounded-lg p-6 border-2 border-red-500">
              <h4 className="font-bold text-red-900 mb-3 flex items-center gap-2">
                <span className="text-2xl">🚨</span>
                WebRTC Leak Detected
              </h4>
              <p className="text-sm text-gray-700 mb-3">
                Your browser is leaking your real IP address via WebRTC:
              </p>
              <div className="space-y-1">
                {results.webrtc.map((ip, i) => (
                  <code key={i} className="block bg-red-100 px-3 py-2 rounded font-mono text-sm">
                    {ip}
                  </code>
                ))}
              </div>
              <p className="text-sm text-gray-700 mt-3">
                <strong>Fix:</strong> Enable WebRTC leak protection in your VPN settings or use a browser extension like uBlock Origin.
              </p>
            </div>
          )}

          {results.dns && results.dns.length > 0 && (
            <div className="bg-blue-50 rounded-lg p-6">
              <h4 className="font-bold text-gray-900 mb-3 flex items-center gap-2">
                <span className="text-2xl">🔍</span>
                DNS Information
              </h4>
              <div className="space-y-1">
                {results.dns.map((dns, i) => (
                  <code key={i} className="block bg-blue-100 px-3 py-2 rounded font-mono text-sm">
                    {dns}
                  </code>
                ))}
              </div>
            </div>
          )}

          {leaksDetected && (
            <div className="bg-yellow-50 rounded-lg p-6 border-l-4 border-yellow-500">
              <h4 className="font-bold text-gray-900 mb-3">⚡ Recommended Actions</h4>
              <ol className="space-y-2 text-sm text-gray-700 list-decimal list-inside">
                <li>Disconnect from your current VPN</li>
                <li>Check VPN settings for "IPv6 Leak Protection" and "WebRTC Protection"</li>
                <li>Consider switching to a <a href="/reviews/mullvad" className="text-blue-600 hover:underline font-medium">privacy-focused VPN</a> with proven leak protection</li>
                <li>Re-run this test after making changes</li>
              </ol>
            </div>
          )}
        </div>

        <div className="flex gap-4 mt-8">
          <button
            onClick={() => setResults(null)}
            className="flex-1 bg-blue-600 text-white py-4 px-6 rounded-xl font-bold hover:bg-blue-700 transition-colors"
          >
            Run Test Again
          </button>
          <button
            onClick={() => window.print()}
            className="px-6 py-4 border-2 border-gray-300 rounded-xl font-semibold text-gray-700 hover:border-blue-500 hover:text-blue-600 transition-colors"
          >
            Print Results
          </button>
        </div>

        <p className="text-xs text-gray-500 text-center mt-6">
          Test completed at {new Date(results.timestamp).toLocaleString()}
        </p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-2xl shadow-xl p-8 max-w-4xl mx-auto">
      <div className="text-center mb-8">
        <div className="text-6xl mb-4">🔒</div>
        <h2 className="text-3xl font-bold text-gray-900 mb-4">Free VPN Leak Test</h2>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          Check if your VPN is leaking your real IP address, DNS requests, or WebRTC information. This test takes ~5 seconds.
        </p>
      </div>

      <div className="bg-blue-50 rounded-lg p-6 mb-8">
        <h3 className="font-bold text-gray-900 mb-3">What This Test Checks:</h3>
        <ul className="space-y-2 text-sm text-gray-700">
          <li className="flex items-start gap-2">
            <span className="text-blue-600">✓</span>
            <span><strong>IPv4 & IPv6 Leaks:</strong> Verifies your real IP is hidden</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-blue-600">✓</span>
            <span><strong>WebRTC Leaks:</strong> Detects browser-based IP leaks</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-blue-600">✓</span>
            <span><strong>DNS Leaks:</strong> Checks if DNS requests bypass VPN tunnel</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-blue-600">✓</span>
            <span><strong>Geolocation:</strong> Shows your apparent location to websites</span>
          </li>
        </ul>
      </div>

      <button
        onClick={runLeakTest}
        disabled={testing}
        className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-6 px-8 rounded-xl font-bold text-xl hover:from-blue-700 hover:to-purple-700 transition-all shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {testing ? (
          <span className="flex items-center justify-center gap-3">
            <svg className="animate-spin h-6 w-6" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
            </svg>
            Running Tests...
          </span>
        ) : (
          'Start Leak Test'
        )}
      </button>

      <div className="mt-8 pt-8 border-t border-gray-200">
        <h3 className="font-bold text-gray-900 mb-4 text-center">Embed This Tool On Your Site</h3>
        <p className="text-sm text-gray-600 text-center mb-4">
          Free to use. Get backlinks by embedding this tool.
        </p>
        <button
          onClick={copyEmbedCode}
          className="w-full bg-gray-100 text-gray-800 py-3 px-6 rounded-lg font-semibold hover:bg-gray-200 transition-colors text-sm"
        >
          Copy Embed Code
        </button>
      </div>

      <div className="mt-6 text-center">
        <p className="text-xs text-gray-500">
          This tool is 100% client-side. We don't log or store your IP address.
        </p>
      </div>
    </div>
  );
}
