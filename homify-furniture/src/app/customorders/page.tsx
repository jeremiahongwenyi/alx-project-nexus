"use client";

import { useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Upload, Send, Palette, Ruler, Clock, DollarSign } from "lucide-react";
import { toast } from "sonner";
import { log } from "console";

const CustomOrders = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    dimensions: "",
    material: "",
    color: "",
    budget: "",
    timeline: "",
    description: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [uploadedFiles, setUploadedFiles] = useState<File[]>([]);
  const [previewFile, setPreviewFile] = useState<{
    file: File;
    preview: string;
  } | null>(null);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const fileInputRef = useRef<HTMLInputElement>(null);

  const validateEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};

    if (!formData.name.trim()) newErrors.name = "Full name is required";
    if (!formData.email.trim()) newErrors.email = "Email is required";
    else if (!validateEmail(formData.email))
      newErrors.email = "Please enter a valid email";
    if (!formData.phone.trim()) newErrors.phone = "Phone number is required";
    if (!formData.timeline.trim()) newErrors.timeline = "Timeline is required";
    if (!formData.description.trim())
      newErrors.description = "Description is required";
    if (uploadedFiles.length === 0)
      newErrors.files = "At least one file is required";
    if (uploadedFiles.length > 5) newErrors.files = "Maximum 5 files allowed";
    if (uploadedFiles.some((file) => file.size > 10 * 1024 * 1024)) {
      newErrors.files = "File size must be less than 10MB";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const openFilePicker = () => {
    if (fileInputRef.current) {
      fileInputRef.current?.click();
    }
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    console.log("files", Array.from(files || []));

    if (files) {
      const newFiles = Array.from(files);
      setUploadedFiles((prev) => [...prev, ...newFiles]);
      // Reset the input so the same file can be selected again
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
    }
  };

  const handleViewFile = (file: File) => {
    console.log("viewing file", file);

    const reader = new FileReader();
    reader.onload = (event) => {
      setPreviewFile({
        file,
        preview: event.target?.result as string,
      });
    };
    reader.readAsDataURL(file);
  };

  const handleDeleteFile = (index: number) => {
    setUploadedFiles((prev) => prev.filter((_, i) => i !== index));
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    // Clear error for this field when user starts typing
    if (errors[name]) {
      setErrors((prev) => {
        const updated = { ...prev };
        delete updated[name];
        return updated;
      });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      toast.error("Please fix the errors in the form");
      return;
    }

    setIsSubmitting(true);

    // Simulate form submission
    await new Promise((resolve) => setTimeout(resolve, 1500));

    toast.success(
      "Request submitted successfully! We'll contact you within 24 hours.",
    );
    console.log("Form Data:", formData);
    console.log("Uploaded Files:", uploadedFiles);
    setIsSubmitting(false);
  };

  return (
    <main className="min-h-screen">
      {/* Hero Section */}
      <div className="bg-primary text-primary-foreground py-16 md:py-24">
        <div className="container text-center">
          <h1 className="font-display text-3xl md:text-5xl font-bold mb-4">
            Custom Furniture Orders
          </h1>
          <p className="text-primary-foreground/80 max-w-2xl mx-auto text-lg">
            Can't find exactly what you're looking for? Let us create your
            perfect piece.
            <p className="text-primary-foreground/80 max-w-2xl mx-auto text-lg">
              Share your vision, and our craftsmen will bring it to life.
            </p>
          </p>
        </div>
      </div>

      {/* Features */}
      <div className="bg-secondary/50 py-12">
        <div className="container">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <div className="text-center">
              <div className="w-12 h-12 mx-auto bg-primary/10 text-primary rounded-full flex items-center justify-center mb-3">
                <Palette className="h-6 w-6" />
              </div>
              <h3 className="font-medium text-sm">Custom Design</h3>
              <p className="text-xs text-muted-foreground mt-1">
                Your vision, our craft
              </p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 mx-auto bg-primary/10 text-primary rounded-full flex items-center justify-center mb-3">
                <Ruler className="h-6 w-6" />
              </div>
              <h3 className="font-medium text-sm">Perfect Fit</h3>
              <p className="text-xs text-muted-foreground mt-1">
                Made to your dimensions
              </p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 mx-auto bg-primary/10 text-primary rounded-full flex items-center justify-center mb-3">
                <Clock className="h-6 w-6" />
              </div>
              <h3 className="font-medium text-sm">Timely Delivery</h3>
              <p className="text-xs text-muted-foreground mt-1">
                2-4 weeks turnaround
              </p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 mx-auto bg-primary/10 text-primary rounded-full flex items-center justify-center mb-3">
                <DollarSign className="h-6 w-6" />
              </div>
              <h3 className="font-medium text-sm">Fair Pricing</h3>
              <p className="text-xs text-muted-foreground mt-1">
                Transparent quotes
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Form Section */}
      <div className="container py-12 md:py-16">
        <div className="max-w-sm mx-auto">
          <h2 className="font-display text-2xl md:text-3xl font-bold text-center mb-2">
            Tell Us About Your Dream Piece
          </h2>
          <p className="text-muted-foreground text-center mb-8">
            Fill out the form below and we'll get back to you with a custom
            quote.
          </p>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Contact Information */}
            <div className="space-y-4">
              <h3 className="font-semibold text-lg border-b border-border pb-2">
                Contact Information
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Full Name *</Label>
                  <Input
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    placeholder="John Doe"
                  />
                  {errors.name && (
                    <p className="text-sm text-destructive">{errors.name}</p>
                  )}
                </div>
                <div className="space-y-2">
                  <Label htmlFor="phone">Phone Number *</Label>
                  <Input
                    id="phone"
                    name="phone"
                    type="tel"
                    value={formData.phone}
                    onChange={handleInputChange}
                    placeholder="07XXXXXXXX"
                  />
                  {errors.phone && (
                    <p className="text-sm text-destructive">{errors.phone}</p>
                  )}
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email Address *</Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  placeholder="john@example.com"
                />
                {errors.email && (
                  <p className="text-sm text-destructive">{errors.email}</p>
                )}
              </div>
            </div>

            {/* Furniture Details */}
            <div className="space-y-4">
              <h3 className="font-semibold text-lg border-b border-border pb-2">
                Furniture Details
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="dimensions">Dimensions (L x W x H)</Label>
                  <Input
                    id="dimensions"
                    name="dimensions"
                    value={formData.dimensions}
                    onChange={handleInputChange}
                    placeholder="e.g., 200cm x 80cm x 75cm"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="material">Preferred Material</Label>
                  <Input
                    id="material"
                    name="material"
                    value={formData.material}
                    onChange={handleInputChange}
                    placeholder="e.g., Oak, Mahogany, Velvet"
                  />
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="color">Color Preference</Label>
                  <Input
                    id="color"
                    name="color"
                    value={formData.color}
                    onChange={handleInputChange}
                    placeholder="e.g., Navy Blue, Natural Oak"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="budget">Budget Range (KSh)</Label>
                  <Input
                    id="budget"
                    name="budget"
                    value={formData.budget}
                    onChange={handleInputChange}
                    placeholder="e.g., 50,000 - 100,000"
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="timeline">Timeline Requirements</Label>
                <Input
                  id="timeline"
                  name="timeline"
                  value={formData.timeline}
                  onChange={handleInputChange}
                  placeholder="e.g., Need by March 2026"
                />
                {errors.timeline && (
                  <p className="text-sm text-destructive">{errors.timeline}</p>
                )}
              </div>
            </div>

            {/* Description */}
            <div className="space-y-4">
              <h3 className="font-semibold text-lg border-b border-border pb-2">
                Description
              </h3>
              <div className="space-y-2">
                <Label htmlFor="description">
                  Describe your furniture idea *
                </Label>
                <Textarea
                  id="description"
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                  rows={5}
                  placeholder="Tell us about your dream furniture piece. Include any specific features, style preferences, or inspiration..."
                />
                {errors.description && (
                  <p className="text-sm text-destructive">
                    {errors.description}
                  </p>
                )}
              </div>

              {/* File Upload Placeholder */}
              <div className="border-2 border-dashed border-border rounded-lg p-6 text-center">
                <Upload className="h-10 w-10 mx-auto text-muted-foreground mb-3" />
                <p className="text-sm text-muted-foreground mb-2">
                  Upload reference images (optional)
                </p>
                <p className="text-xs text-muted-foreground">
                  JPG, PNG or PDF (max 10MB each, up to 5 files)
                </p>
                <input
                  type="file"
                  accept="image/*,application/pdf"
                  className="hidden"
                  ref={fileInputRef}
                  onChange={handleFileSelect}
                  multiple
                />
                <Button
                  variant="outline"
                  size="sm"
                  className="mt-3"
                  type="button"
                  onClick={openFilePicker}
                >
                  Choose Files
                </Button>
                {errors.files && (
                  <p className="text-sm text-destructive mt-2">
                    {errors.files}
                  </p>
                )}

                {uploadedFiles.length > 0 && (
                  <div className="mt-4 space-y-2">
                    <p className="text-sm font-medium">Uploaded Files:</p>
                    <ul className="space-y-2">
                      {uploadedFiles.map((file, index) => (
                        <li
                          key={index}
                          className="flex items-center justify-between bg-secondary p-2 rounded"
                        >
                          <button
                            type="button"
                            onClick={() => handleViewFile(file)}
                            className="text-sm text-muted-foreground truncate flex-1 text-left hover:text-primary hover:underline"
                          >
                            {file.name}
                          </button>
                          <Button
                            variant="ghost"
                            size="sm"
                            type="button"
                            onClick={() => handleDeleteFile(index)}
                            className="text-destructive hover:text-destructive"
                          >
                            Delete
                          </Button>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            </div>

            {/* Submit */}
            <Button
              type="submit"
              size="lg"
              className="w-full"
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                "Submitting..."
              ) : (
                <>
                  <Send className="h-5 w-5 mr-2" />
                  Submit Request
                </>
              )}
            </Button>

            <p className="text-xs text-muted-foreground text-center">
              By submitting this form, you agree to be contacted by our team
              regarding your custom furniture request.
            </p>
          </form>
        </div>
      </div>

      {/* File Preview Modal */}
      {previewFile && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="sticky top-0 flex items-center justify-between p-4 border-b bg-white">
              <h3 className="font-semibold truncate">
                {previewFile.file.name}
              </h3>
              <button
                onClick={() => setPreviewFile(null)}
                className="text-muted-foreground hover:text-foreground text-2xl"
              >
                ×
              </button>
            </div>
            <div className="p-4">
              {previewFile.file.type.startsWith("image/") ? (
                <img
                  src={previewFile.preview}
                  alt={previewFile.file.name}
                  className="w-full h-auto rounded"
                />
              ) : previewFile.file.type === "application/pdf" ? (
                <div className="text-center py-8">
                  <p className="text-muted-foreground mb-4">PDF Preview</p>
                  <a
                    href={previewFile.preview}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-block px-4 py-2 bg-primary text-primary-foreground rounded hover:bg-primary/90"
                  >
                    Open PDF in New Tab
                  </a>
                </div>
              ) : (
                <div className="text-center py-8 text-muted-foreground">
                  <p>Preview not available for this file type</p>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </main>
  );
};

export default CustomOrders;
