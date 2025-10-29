import React, { useState } from 'react';

interface QuizResult {
  vpnId: string;
  score: number;
  reasons: string[];
}

export default function VPNQuiz() {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [result, setResult] = useState<QuizResult | null>(null);

  const questions = [
    {
      id: 'priority',
      question: 'What matters most to you?',
      options: [
        { value: 'privacy', label: 'Maximum Privacy & Anonymity', icon: '🔒' },
        { value: 'speed', label: 'Fast Speeds for Streaming/Gaming', icon: '⚡' },
        { value: 'price', label: 'Best Value for Money', icon: '💰' },
        { value: 'features', label: 'Advanced Features & Control', icon: '⚙️' },
      ],
    },
    {
      id: 'usecase',
      question: 'Primary use case?',
      options: [
        { value: 'browsing', label: 'General Browsing & Privacy', icon: '🌐' },
        { value: 'streaming', label: 'Netflix & Streaming', icon: '📺' },
        { value: 'torrenting', label: 'Torrenting & P2P', icon: '⬇️' },
        { value: 'work', label: 'Remote Work & Security', icon: '💼' },
      ],
    },
    {
      id: 'technical',
      question: 'Technical skill level?',
      options: [
        { value: 'beginner', label: 'Beginner - Just want it to work', icon: '👋' },
        { value: 'intermediate', label: 'Intermediate - Comfortable with settings', icon: '👍' },
        { value: 'advanced', label: 'Advanced - Want full control', icon: '🚀' },
      ],
    },
    {
      id: 'budget',
      question: 'Budget per month?',
      options: [
        { value: 'free', label: 'Free (with limitations)', icon: '🆓' },
        { value: 'low', label: 'Under $5/month', icon: '💵' },
        { value: 'mid', label: '$5-10/month', icon: '💴' },
        { value: 'high', label: 'Price doesn\'t matter', icon: '💎' },
      ],
    },
  ];

  const calculateResult = (): QuizResult => {
    const scores: Record<string, { score: number; reasons: string[] }> = {
      mullvad: { score: 0, reasons: [] },
      ivpn: { score: 0, reasons: [] },
      protonvpn: { score: 0, reasons: [] },
      airvpn: { score: 0, reasons: [] },
      windscribe: { score: 0, reasons: [] },
      ovpn: { score: 0, reasons: [] },
      azirevpn: { score: 0, reasons: [] },
      torguard: { score: 0, reasons: [] },
    };

    // Scoring logic based on answers
    if (answers.priority === 'privacy') {
      scores.mullvad.score += 10;
      scores.mullvad.reasons.push('Best-in-class privacy (anonymous accounts)');
      scores.ivpn.score += 9;
      scores.ivpn.reasons.push('Ethical privacy-first approach');
      scores.protonvpn.score += 8;
      scores.protonvpn.reasons.push('Swiss privacy laws protect you');
    }

    if (answers.priority === 'speed') {
      scores.azirevpn.score += 10;
      scores.azirevpn.reasons.push('WireGuard-only for maximum speed');
      scores.mullvad.score += 8;
      scores.mullvad.reasons.push('Consistently fast speeds');
    }

    if (answers.priority === 'price') {
      scores.windscribe.score += 10;
      scores.windscribe.reasons.push('10GB free tier or $3/mo');
      scores.azirevpn.score += 9;
      scores.azirevpn.reasons.push('Only €3.75/month');
      scores.protonvpn.score += 8;
      scores.protonvpn.reasons.push('Unlimited free tier available');
    }

    if (answers.priority === 'features') {
      scores.airvpn.score += 10;
      scores.airvpn.reasons.push('Most configurable VPN available');
      scores.ivpn.score += 8;
      scores.ivpn.reasons.push('Multi-hop and anti-tracker included');
    }

    if (answers.usecase === 'streaming') {
      scores.windscribe.score += 10;
      scores.windscribe.reasons.push('Excellent Netflix unblocking');
      scores.torguard.score += 9;
      scores.torguard.reasons.push('Dedicated IPs for streaming');
      scores.protonvpn.score += 7;
      scores.protonvpn.reasons.push('Works with major streaming sites');
    }

    if (answers.usecase === 'torrenting') {
      scores.airvpn.score += 10;
      scores.airvpn.reasons.push('Port forwarding on all servers');
      scores.mullvad.score += 9;
      scores.mullvad.reasons.push('Proven no-logs, torrent-friendly');
      scores.torguard.score += 8;
      scores.torguard.reasons.push('Built for torrenting');
    }

    if (answers.technical === 'beginner') {
      scores.protonvpn.score += 10;
      scores.protonvpn.reasons.push('User-friendly apps');
      scores.windscribe.score += 8;
      scores.windscribe.reasons.push('Simple one-click interface');
    }

    if (answers.technical === 'advanced') {
      scores.airvpn.score += 10;
      scores.airvpn.reasons.push('Advanced configuration options');
      scores.mullvad.score += 8;
      scores.mullvad.reasons.push('Full control over security settings');
    }

    if (answers.budget === 'free') {
      scores.protonvpn.score += 10;
      scores.protonvpn.reasons.push('Best free tier (unlimited data)');
      scores.windscribe.score += 9;
      scores.windscribe.reasons.push('10GB/month free');
    }

    if (answers.budget === 'low') {
      scores.azirevpn.score += 10;
      scores.azirevpn.reasons.push('Only €3.75/month');
      scores.windscribe.score += 9;
      scores.windscribe.reasons.push('$3/month with build-a-plan');
      scores.mullvad.score += 8;
      scores.mullvad.reasons.push('Flat €5/month, no tricks');
    }

    // Find highest score
    const sorted = Object.entries(scores).sort((a, b) => b[1].score - a[1].score);
    const winner = sorted[0];

    return {
      vpnId: winner[0],
      score: winner[1].score,
      reasons: winner[1].reasons,
    };
  };

  const handleAnswer = (value: string) => {
    const newAnswers = { ...answers, [questions[step].id]: value };
    setAnswers(newAnswers);

    if (step < questions.length - 1) {
      setStep(step + 1);
    } else {
      // Calculate result
      setResult(calculateResult());
    }
  };

  const restart = () => {
    setStep(0);
    setAnswers({});
    setResult(null);
  };

  if (result) {
    const vpnNames: Record<string, string> = {
      mullvad: 'Mullvad VPN',
      ivpn: 'IVPN',
      protonvpn: 'ProtonVPN',
      airvpn: 'AirVPN',
      windscribe: 'Windscribe',
      ovpn: 'OVPN',
      azirevpn: 'AzireVPN',
      torguard: 'TorGuard',
    };

    return (
      <div className="bg-white rounded-2xl shadow-xl p-8 max-w-2xl mx-auto">
        <div className="text-center mb-8">
          <div className="text-6xl mb-4">🎯</div>
          <h3 className="text-3xl font-bold text-gray-900 mb-2">Your Perfect Match</h3>
          <div className="text-5xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-4">
            {vpnNames[result.vpnId]}
          </div>
        </div>

        <div className="bg-blue-50 rounded-lg p-6 mb-6">
          <h4 className="font-semibold text-gray-900 mb-3 text-lg">Why {vpnNames[result.vpnId]}?</h4>
          <ul className="space-y-2">
            {result.reasons.map((reason, i) => (
              <li key={i} className="flex items-start text-gray-700">
                <span className="text-green-500 mr-2 text-xl">✓</span>
                {reason}
              </li>
            ))}
          </ul>
        </div>

        <div className="flex gap-4">
          <a
            href={`/reviews/${result.vpnId}`}
            className="flex-1 bg-gradient-to-r from-blue-600 to-blue-700 text-white py-4 px-6 rounded-xl font-bold text-center hover:from-blue-700 hover:to-blue-800 transition-all"
          >
            Read Full Review
          </a>
          <button
            onClick={restart}
            className="px-6 py-4 border-2 border-gray-300 rounded-xl font-semibold text-gray-700 hover:border-blue-500 hover:text-blue-600 transition-colors"
          >
            Retake Quiz
          </button>
        </div>
      </div>
    );
  }

  const currentQuestion = questions[step];
  const progress = ((step + 1) / questions.length) * 100;

  return (
    <div className="bg-white rounded-2xl shadow-xl p-8 max-w-2xl mx-auto">
      {/* Progress bar */}
      <div className="mb-8">
        <div className="flex justify-between text-sm text-gray-600 mb-2">
          <span>Question {step + 1} of {questions.length}</span>
          <span>{Math.round(progress)}%</span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div
            className="bg-gradient-to-r from-blue-500 to-purple-500 h-2 rounded-full transition-all duration-300"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>

      <h3 className="text-2xl font-bold text-gray-900 mb-6">{currentQuestion.question}</h3>

      <div className="grid gap-4">
        {currentQuestion.options.map((option) => (
          <button
            key={option.value}
            onClick={() => handleAnswer(option.value)}
            className="flex items-center p-6 border-2 border-gray-200 rounded-xl hover:border-blue-500 hover:bg-blue-50 transition-all text-left group"
          >
            <span className="text-4xl mr-4">{option.icon}</span>
            <span className="text-lg font-medium text-gray-900 group-hover:text-blue-600">
              {option.label}
            </span>
          </button>
        ))}
      </div>

      {step > 0 && (
        <button
          onClick={() => setStep(step - 1)}
          className="mt-6 text-gray-600 hover:text-gray-900 font-medium"
        >
          ← Back
        </button>
      )}
    </div>
  );
}
