
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { RefreshCw } from 'lucide-react';

interface CaptchaProps {
  onVerify: (isValid: boolean) => void;
  isVerified: boolean;
}

const Captcha: React.FC<CaptchaProps> = ({ onVerify, isVerified }) => {
  const [captchaText, setCaptchaText] = useState('');
  const [userInput, setUserInput] = useState('');
  const [canvasRef, setCanvasRef] = useState<HTMLCanvasElement | null>(null);

  const generateCaptcha = () => {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let result = '';
    for (let i = 0; i < 6; i++) {
      result += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    setCaptchaText(result);
    setUserInput('');
    onVerify(false);
    return result;
  };

  const drawCaptcha = (canvas: HTMLCanvasElement, text: string) => {
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    // Set background
    ctx.fillStyle = '#f8f9fa';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    
    // Add noise lines
    for (let i = 0; i < 5; i++) {
      ctx.strokeStyle = `rgba(${Math.random() * 255}, ${Math.random() * 255}, ${Math.random() * 255}, 0.3)`;
      ctx.beginPath();
      ctx.moveTo(Math.random() * canvas.width, Math.random() * canvas.height);
      ctx.lineTo(Math.random() * canvas.width, Math.random() * canvas.height);
      ctx.stroke();
    }
    
    // Draw text
    ctx.font = '24px Arial';
    ctx.fillStyle = '#333';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    
    // Add slight rotation and position variation to each character
    for (let i = 0; i < text.length; i++) {
      ctx.save();
      const x = (canvas.width / text.length) * i + (canvas.width / text.length) / 2;
      const y = canvas.height / 2 + (Math.random() - 0.5) * 10;
      ctx.translate(x, y);
      ctx.rotate((Math.random() - 0.5) * 0.3);
      ctx.fillText(text[i], 0, 0);
      ctx.restore();
    }
  };

  useEffect(() => {
    const text = generateCaptcha();
    if (canvasRef) {
      drawCaptcha(canvasRef, text);
    }
  }, [canvasRef]);

  const handleRefresh = () => {
    const text = generateCaptcha();
    if (canvasRef) {
      drawCaptcha(canvasRef, text);
    }
  };

  const handleInputChange = (value: string) => {
    setUserInput(value);
    const isValid = value.toLowerCase() === captchaText.toLowerCase();
    onVerify(isValid);
  };

  return (
    <div className="space-y-2">
      <Label htmlFor="captcha">Security Check</Label>
      <div className="flex items-center space-x-2">
        <canvas
          ref={setCanvasRef}
          width={150}
          height={50}
          className="border rounded bg-gray-50 dark:bg-gray-800"
        />
        <Button
          type="button"
          variant="outline"
          size="sm"
          onClick={handleRefresh}
          className="p-2"
        >
          <RefreshCw className="w-4 h-4" />
        </Button>
      </div>
      <Input
        id="captcha"
        type="text"
        placeholder="Enter the text shown above"
        value={userInput}
        onChange={(e) => handleInputChange(e.target.value)}
        className={isVerified ? "border-green-500" : ""}
      />
      {isVerified && (
        <p className="text-sm text-green-600 dark:text-green-400">✓ Verification successful</p>
      )}
    </div>
  );
};

export default Captcha;
