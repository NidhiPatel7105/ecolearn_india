import React, { useState, useRef } from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';

const ProofSubmissionModal = ({ isOpen, onClose, challenge, onSubmit }) => {
  const [files, setFiles] = useState([]);
  const [caption, setCaption] = useState('');
  const [location, setLocation] = useState('');
  const [isDragging, setIsDragging] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const fileInputRef = useRef(null);

  const handleDragOver = (e) => {
    e?.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e) => {
    e?.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e) => {
    e?.preventDefault();
    setIsDragging(false);
    const droppedFiles = Array.from(e?.dataTransfer?.files);
    handleFiles(droppedFiles);
  };

  const handleFileSelect = (e) => {
    const selectedFiles = Array.from(e?.target?.files);
    handleFiles(selectedFiles);
  };

  const handleFiles = (newFiles) => {
    const validFiles = newFiles?.filter(file => {
      const isValidType = file?.type?.startsWith('image/') || file?.type?.startsWith('video/');
      const isValidSize = file?.size <= 10 * 1024 * 1024; // 10MB limit
      return isValidType && isValidSize;
    });

    const filesWithPreview = validFiles?.map(file => ({
      file,
      id: Date.now() + Math.random(),
      preview: URL.createObjectURL(file),
      type: file?.type?.startsWith('image/') ? 'image' : 'video'
    }));

    setFiles(prev => [...prev, ...filesWithPreview]);
  };

  const removeFile = (fileId) => {
    setFiles(prev => {
      const fileToRemove = prev?.find(f => f?.id === fileId);
      if (fileToRemove) {
        URL.revokeObjectURL(fileToRemove?.preview);
      }
      return prev?.filter(f => f?.id !== fileId);
    });
  };

  const handleSubmit = async (e) => {
    e?.preventDefault();
    if (files?.length === 0) return;

    setIsSubmitting(true);
    
    // Simulate submission delay
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    const submissionData = {
      challengeId: challenge?.id,
      files: files?.map(f => f?.file),
      caption,
      location,
      timestamp: new Date()?.toISOString()
    };

    onSubmit(submissionData);
    
    // Cleanup
    files?.forEach(f => URL.revokeObjectURL(f?.preview));
    setFiles([]);
    setCaption('');
    setLocation('');
    setIsSubmitting(false);
    onClose();
  };

  const getCurrentLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation?.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position?.coords;
          setLocation(`${latitude?.toFixed(6)}, ${longitude?.toFixed(6)}`);
        },
        (error) => {
          console.error('Error getting location:', error);
          setLocation('Location unavailable');
        }
      );
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
      <div className="bg-card border border-border rounded-lg shadow-modal w-full max-w-2xl max-h-[90vh] overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-border">
          <div>
            <h2 className="text-xl font-heading font-semibold text-foreground">
              Submit Proof
            </h2>
            <p className="text-sm text-muted-foreground mt-1">
              {challenge?.title}
            </p>
          </div>
          <Button variant="ghost" size="icon" onClick={onClose}>
            <Icon name="X" size={20} />
          </Button>
        </div>

        {/* Content */}
        <form onSubmit={handleSubmit} className="p-6 space-y-6 overflow-y-auto max-h-[calc(90vh-140px)]">
          {/* File Upload Area */}
          <div>
            <label className="block text-sm font-medium text-foreground mb-2">
              Upload Photos/Videos *
            </label>
            <div
              className={`border-2 border-dashed rounded-lg p-6 text-center transition-colors ${
                isDragging 
                  ? 'border-primary bg-primary/5' :'border-border hover:border-primary/50'
              }`}
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onDrop={handleDrop}
            >
              <div className="flex flex-col items-center">
                <div className="w-12 h-12 bg-muted rounded-full flex items-center justify-center mb-3">
                  <Icon name="Upload" size={24} className="text-muted-foreground" />
                </div>
                <p className="text-sm text-foreground mb-1">
                  Drag and drop files here, or click to select
                </p>
                <p className="text-xs text-muted-foreground mb-3">
                  Supports images and videos up to 10MB
                </p>
                <Button 
                  type="button" 
                  variant="outline" 
                  size="sm"
                  onClick={() => fileInputRef?.current?.click()}
                >
                  Choose Files
                </Button>
              </div>
            </div>
            <input
              ref={fileInputRef}
              type="file"
              multiple
              accept="image/*,video/*"
              onChange={handleFileSelect}
              className="hidden"
            />
          </div>

          {/* File Previews */}
          {files?.length > 0 && (
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">
                Selected Files ({files?.length})
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                {files?.map((file) => (
                  <div key={file?.id} className="relative group">
                    <div className="aspect-square rounded-lg overflow-hidden bg-muted">
                      {file?.type === 'image' ? (
                        <Image
                          src={file?.preview}
                          alt="Preview"
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <video
                          src={file?.preview}
                          className="w-full h-full object-cover"
                          muted
                        />
                      )}
                    </div>
                    <button
                      type="button"
                      onClick={() => removeFile(file?.id)}
                      className="absolute -top-2 -right-2 w-6 h-6 bg-error text-error-foreground rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                    >
                      <Icon name="X" size={14} />
                    </button>
                    <div className="absolute bottom-1 left-1 px-1.5 py-0.5 bg-black/70 text-white text-xs rounded">
                      {file?.type === 'video' ? 'Video' : 'Photo'}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Caption */}
          <Input
            label="Activity Description"
            type="text"
            placeholder="Describe what you did for this challenge..."
            value={caption}
            onChange={(e) => setCaption(e?.target?.value)}
            description="Provide details about your environmental activity"
            required
          />

          {/* Location */}
          <div>
            <Input
              label="Location"
              type="text"
              placeholder="Enter location or use GPS"
              value={location}
              onChange={(e) => setLocation(e?.target?.value)}
              description="Help us verify the authenticity of your submission"
            />
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={getCurrentLocation}
              className="mt-2"
              iconName="MapPin"
              iconPosition="left"
            >
              Use Current Location
            </Button>
          </div>

          {/* Submission Guidelines */}
          <div className="bg-muted/50 rounded-lg p-4">
            <h4 className="text-sm font-medium text-foreground mb-2 flex items-center">
              <Icon name="Info" size={16} className="mr-2 text-secondary" />
              Submission Guidelines
            </h4>
            <ul className="text-xs text-muted-foreground space-y-1">
              <li>• Ensure photos/videos clearly show your environmental activity</li>
              <li>• Include yourself or identifiable elements in the submission</li>
              <li>• Provide accurate location information for verification</li>
              <li>• Write a detailed description of your activity</li>
              <li>• Submissions will be reviewed by teachers/coordinators</li>
            </ul>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center justify-end space-x-3 pt-4 border-t border-border">
            <Button 
              type="button" 
              variant="outline" 
              onClick={onClose}
              disabled={isSubmitting}
            >
              Cancel
            </Button>
            <Button 
              type="submit" 
              variant="default"
              disabled={files?.length === 0 || !caption?.trim() || isSubmitting}
              loading={isSubmitting}
              iconName="Send"
              iconPosition="left"
            >
              {isSubmitting ? 'Submitting...' : 'Submit Proof'}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ProofSubmissionModal;