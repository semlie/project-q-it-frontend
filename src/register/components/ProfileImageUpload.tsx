import { Camera, Upload, X } from 'lucide-react';

interface ProfileImageUploadProps {
  profileImage: File | null;
  profileImagePreview: string;
  onImageChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onRemove: () => void;
}

export default function ProfileImageUpload({
  profileImage,
  profileImagePreview,
  onImageChange,
  onRemove,
}: ProfileImageUploadProps) {
  return (
    <div className="space-y-3">
      <label className="block text-sm font-medium text-gray-700 text-right">תמונת פרופיל (אופציונלי)</label>
      <div className="flex items-center gap-4">
        {profileImagePreview ? (
          <div className="relative">
            <img
              src={profileImagePreview}
              alt="Profile preview"
              className="w-24 h-24 rounded-full object-cover border-4 border-cyan-500 shadow-lg"
            />
            <button
              type="button"
              onClick={onRemove}
              className="absolute -top-2 -right-2 w-8 h-8 bg-red-500 hover:bg-red-600 text-white rounded-full flex items-center justify-center shadow-lg transition-all"
            >
              <X size={16} />
            </button>
          </div>
        ) : (
          <div className="w-24 h-24 rounded-full bg-gray-100 flex items-center justify-center border-2 border-dashed border-gray-300">
            <Camera size={32} className="text-gray-400" />
          </div>
        )}
        <label className="flex-1 cursor-pointer">
          <div className="w-full py-4 px-4 !bg-white border border-gray-200 rounded-2xl hover:border-cyan-500 transition-all text-gray-600 flex items-center justify-between group">
            <Upload size={20} className="text-gray-400 group-hover:text-cyan-500 transition-colors" />
            <span className="text-sm">{profileImage ? profileImage.name : 'בחר תמונה'}</span>
            <Camera size={20} className="text-gray-400 group-hover:text-cyan-500 transition-colors" />
          </div>
          <input type="file" accept="image/*" onChange={onImageChange} className="hidden" />
        </label>
      </div>
    </div>
  );
}
