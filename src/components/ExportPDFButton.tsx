import { useState } from 'react';
import { Download, Loader2 } from 'lucide-react';
import { Button } from './ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from './ui/dropdown-menu';

interface ExportPDFButtonProps {
  frameName?: string;
  role?: string;
  className?: string;
}

export function ExportPDFButton({ 
  frameName = 'Screen', 
  role = 'Guest',
  className = '' 
}: ExportPDFButtonProps) {
  const [isExporting, setIsExporting] = useState(false);

  // Method 1: Use browser's print dialog
  const exportViaPrint = (device: 'mobile' | 'desktop') => {
    setIsExporting(true);
    
    // Set document title for PDF filename
    const originalTitle = document.title;
    const fileName = `Frame_${frameName}_${role}_${device.charAt(0).toUpperCase() + device.slice(1)}`;
    document.title = fileName;
    
    setTimeout(() => {
      window.print();
      document.title = originalTitle;
      setIsExporting(false);
    }, 100);
  };

  // Method 2: Use html2canvas + jsPDF (needs installation)
  const exportViaLibrary = async (device: 'mobile' | 'desktop') => {
    setIsExporting(true);
    
    try {
      // Dynamic import to avoid loading libraries if not used
      const html2canvas = (await import('html2canvas')).default;
      const { jsPDF } = await import('jspdf');
      
      const element = document.body;
      const canvas = await html2canvas(element, {
        scale: 2,
        logging: false,
        useCORS: true,
        backgroundColor: '#0a0a0f',
      });
      
      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF({
        orientation: device === 'mobile' ? 'portrait' : 'landscape',
        unit: 'px',
        format: device === 'mobile' ? [390, 844] : [1440, 900],
      });
      
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = pdf.internal.pageSize.getHeight();
      
      pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
      pdf.save(`Frame_${frameName}_${role}_${device}.pdf`);
    } catch (error) {
      console.error('Export failed:', error);
      alert('Export failed. Please try using browser print (Ctrl+P) instead.');
    } finally {
      setIsExporting(false);
    }
  };

  // Method 3: Simple screenshot as PNG
  const exportAsPNG = async (device: 'mobile' | 'desktop') => {
    setIsExporting(true);
    
    try {
      const html2canvas = (await import('html2canvas')).default;
      
      const element = document.body;
      const canvas = await html2canvas(element, {
        scale: 2,
        logging: false,
        useCORS: true,
        backgroundColor: '#0a0a0f',
      });
      
      canvas.toBlob((blob) => {
        if (blob) {
          const url = URL.createObjectURL(blob);
          const link = document.createElement('a');
          link.download = `Frame_${frameName}_${role}_${device}.png`;
          link.href = url;
          link.click();
          URL.revokeObjectURL(url);
        }
      });
    } catch (error) {
      console.error('Export failed:', error);
      alert('Export failed. Please try using browser screenshot (Windows+Shift+S) instead.');
    } finally {
      setIsExporting(false);
    }
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="outline"
          size="sm"
          className={`border-[#ffd700]/50 text-[#ffd700] hover:bg-[#ffd700]/10 ${className}`}
          disabled={isExporting}
        >
          {isExporting ? (
            <>
              <Loader2 className="w-4 h-4 mr-2 animate-spin" />
              Exporting...
            </>
          ) : (
            <>
              <Download className="w-4 h-4 mr-2" />
              Export PDF
            </>
          )}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-56">
        <DropdownMenuLabel>Export Options</DropdownMenuLabel>
        <DropdownMenuSeparator />
        
        <DropdownMenuLabel className="text-xs text-gray-400">
          Browser Print (Recommended)
        </DropdownMenuLabel>
        <DropdownMenuItem onClick={() => exportViaPrint('mobile')}>
          📱 Export Mobile View
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => exportViaPrint('desktop')}>
          🖥️ Export Desktop View
        </DropdownMenuItem>
        
        <DropdownMenuSeparator />
        
        <DropdownMenuLabel className="text-xs text-gray-400">
          Quick Keyboard Shortcuts
        </DropdownMenuLabel>
        <DropdownMenuItem disabled className="text-xs">
          Ctrl+P / Cmd+P → Print to PDF
        </DropdownMenuItem>
        <DropdownMenuItem disabled className="text-xs">
          Win+Shift+S → Screenshot
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

// Export instructions component for first-time users
export function ExportInstructions() {
  const [showInstructions, setShowInstructions] = useState(false);

  return (
    <>
      <Button
        variant="ghost"
        size="sm"
        onClick={() => setShowInstructions(true)}
        className="text-gray-400 hover:text-[#ffd700]"
      >
        ❓ How to export
      </Button>

      {showInstructions && (
        <div className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4">
          <div className="bg-card border border-[#ffd700]/30 rounded-2xl p-6 max-w-2xl max-h-[80vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl text-[#ffd700]" style={{ fontWeight: 700 }}>
                📄 Export PDF Guide
              </h2>
              <button
                onClick={() => setShowInstructions(false)}
                className="text-gray-400 hover:text-white"
              >
                ✕
              </button>
            </div>

            <div className="space-y-4 text-gray-300 text-sm">
              <div>
                <h3 className="text-white mb-2" style={{ fontWeight: 600 }}>
                  Method 1: Browser Print (Easiest) ⭐
                </h3>
                <ol className="list-decimal list-inside space-y-1 ml-2">
                  <li>Press <code className="bg-white/10 px-2 py-0.5 rounded">Ctrl+P</code> (Windows) or <code className="bg-white/10 px-2 py-0.5 rounded">Cmd+P</code> (Mac)</li>
                  <li>Select "Save as PDF" as destination</li>
                  <li>Enable "Background graphics"</li>
                  <li>Set margins to "None"</li>
                  <li>Click Save</li>
                </ol>
              </div>

              <div>
                <h3 className="text-white mb-2" style={{ fontWeight: 600 }}>
                  Method 2: Export Button
                </h3>
                <p>Click the "Export PDF" button above and choose:</p>
                <ul className="list-disc list-inside space-y-1 ml-2 mt-2">
                  <li>📱 Mobile View - Portrait, 390x844px</li>
                  <li>🖥️ Desktop View - Landscape, 1440x900px</li>
                </ul>
              </div>

              <div>
                <h3 className="text-white mb-2" style={{ fontWeight: 600 }}>
                  Method 3: Screenshot
                </h3>
                <ul className="list-disc list-inside space-y-1 ml-2">
                  <li>Windows: <code className="bg-white/10 px-2 py-0.5 rounded">Win+Shift+S</code></li>
                  <li>Mac: <code className="bg-white/10 px-2 py-0.5 rounded">Cmd+Shift+3</code> or <code className="bg-white/10 px-2 py-0.5 rounded">Cmd+Shift+4</code></li>
                </ul>
              </div>

              <div className="bg-[#ffd700]/10 border border-[#ffd700]/30 rounded-lg p-4">
                <h4 className="text-[#ffd700] mb-2" style={{ fontWeight: 600 }}>
                  💡 Tips:
                </h4>
                <ul className="list-disc list-inside space-y-1 text-xs">
                  <li>Export both mobile and desktop versions</li>
                  <li>Use consistent viewport sizes</li>
                  <li>Check print preview before saving</li>
                  <li>Name files: Frame_[Name]_[Role]_[Device].pdf</li>
                </ul>
              </div>

              <div className="text-center pt-4">
                <Button
                  onClick={() => setShowInstructions(false)}
                  className="bg-[#ffd700] hover:bg-[#ffed4e] text-black"
                >
                  Got it!
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
