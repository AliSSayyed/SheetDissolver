import { useState, useRef } from 'react';
import { Upload } from 'lucide-react';

interface UploadCardProps {
  onSubmit: (file: File, startPage: number, endPage: number) => void;
}

export function UploadCard({ onSubmit }: UploadCardProps) {
  const [file, setFile] = useState<File | null>(null);
  const [startPage, setStartPage] = useState<string>('');
  const [endPage, setEndPage] = useState<string>('');
  const [errors, setErrors] = useState<string[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile && selectedFile.type === 'application/pdf') {
      setFile(selectedFile);
      setErrors([]);
    } else {
      setFile(null);
      setErrors(['Please select a valid PDF file']);
    }
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    const droppedFile = e.dataTransfer.files[0];
    if (droppedFile && droppedFile.type === 'application/pdf') {
      setFile(droppedFile);
      setErrors([]);
    } else {
      setErrors(['Please drop a valid PDF file']);
    }
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
  };

  const validate = (): boolean => {
    const newErrors: string[] = [];

    if (!file) {
      newErrors.push('Please upload a PDF file');
    }

    if (!startPage || !endPage) {
      newErrors.push('Both page fields are required');
    } else {
      const start = parseInt(startPage);
      const end = parseInt(endPage);

      if (start < 1) {
        newErrors.push('Start page must be at least 1');
      }

      if (end < start) {
        newErrors.push('End page must be greater than or equal to start page');
      }

      if (end - start + 1 > 3) {
        newErrors.push('Page range cannot exceed 3 pages');
      }
    }

    setErrors(newErrors);
    return newErrors.length === 0;
  };

  const handleSubmit = () => {
    if (validate() && file) {
      onSubmit(file, parseInt(startPage), parseInt(endPage));
    }
  };

  return (
    <div className="min-h-screen bg-black flex items-center justify-center px-4">
      <div
        className="w-full max-w-2xl bg-black border border-[#1F1F1F] rounded-2xl p-16"
        style={{ borderRadius: '16px' }}
      >
        <h1 className="text-5xl font-serif text-white mb-12 text-center">
          Balance Sheet Analyzer
        </h1>

        <div
          className="border-2 border-white border-dashed rounded-lg p-12 mb-8 text-center cursor-pointer hover:border-opacity-70 transition-all"
          onDrop={handleDrop}
          onDragOver={handleDragOver}
          onClick={() => fileInputRef.current?.click()}
        >
          <input
            ref={fileInputRef}
            type="file"
            accept="application/pdf"
            onChange={handleFileChange}
            className="hidden"
          />
          <Upload className="w-12 h-12 text-white mx-auto mb-4" />
          {file ? (
            <p className="text-white text-lg">{file.name}</p>
          ) : (
            <>
              <p className="text-white text-lg mb-2">
                Drop your PDF here or click to browse
              </p>
              <p className="text-[#999999] text-sm">
                Consolidated Balance Sheet or SEC Release
              </p>
            </>
          )}
        </div>

        <div className="grid grid-cols-2 gap-6 mb-8">
          <div>
            <label className="block text-white text-sm mb-2">
              Start Page
            </label>
            <input
              type="number"
              min="1"
              value={startPage}
              onChange={(e) => setStartPage(e.target.value)}
              className="w-full bg-[#0D0D0D] text-white border border-[#2A2A2A] rounded-lg px-4 py-3 focus:outline-none focus:border-[#FF5733] transition-colors"
              placeholder="1"
            />
          </div>
          <div>
            <label className="block text-white text-sm mb-2">
              End Page
            </label>
            <input
              type="number"
              min="1"
              value={endPage}
              onChange={(e) => setEndPage(e.target.value)}
              className="w-full bg-[#0D0D0D] text-white border border-[#2A2A2A] rounded-lg px-4 py-3 focus:outline-none focus:border-[#FF5733] transition-colors"
              placeholder="3"
            />
          </div>
        </div>

        {errors.length > 0 && (
          <div className="mb-6">
            {errors.map((error, index) => (
              <p key={index} className="text-[#FF3333] text-sm mb-1">
                {error}
              </p>
            ))}
          </div>
        )}

        <button
          onClick={handleSubmit}
          className="w-full bg-[#FF5733] text-white font-semibold py-4 rounded-lg hover:brightness-110 transition-all text-lg"
        >
          Analyze Balance Sheet
        </button>

        <p className="text-[#666666] text-xs text-center mt-6">
          Maximum page range: 3 pages (inclusive)
        </p>
      </div>
    </div>
  );
}
