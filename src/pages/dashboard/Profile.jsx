import React, { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import { updateProfile } from 'firebase/auth';
import { auth } from '../../firebase/firebase.config';
import Swal from 'sweetalert2';
import { User, Mail, Calendar, Save } from 'lucide-react';
import Spinner from '../../components/Spinner';

export default function Profile() {
  const { user } = useAuth();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    displayName: '',
    email: '',
    photoURL: '',
  });

  useEffect(() => {
    if (user) {
      setFormData({
        displayName: user.displayName || '',
        email: user.email || '',
        photoURL: user.photoURL || '',
      });
    }
  }, [user]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!user) return;

    setLoading(true);
    try {
      await updateProfile(auth.currentUser, {
        displayName: formData.displayName,
        photoURL: formData.photoURL || null,
      });
      
      Swal.fire({
        icon: 'success',
        title: 'Profile Updated',
        text: 'Your profile has been updated successfully!',
        showConfirmButton: false,
        timer: 2000,
      });
    } catch (error) {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: error.message || 'Failed to update profile',
      });
    } finally {
      setLoading(false);
    }
  };

  if (!user) {
    return (
      <div className="flex justify-center items-center h-64">
        <Spinner size={80} />
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-2">
          Profile Settings
        </h1>
        <p className="text-gray-600 dark:text-gray-400">
          Manage your account information and preferences.
        </p>
      </div>

      <div className="card p-8">
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Profile Picture */}
          <div className="flex flex-col items-center mb-6">
            <div className="relative">
              <img
                src={formData.photoURL || user.photoURL || 'https://uxwing.com/wp-content/themes/uxwing/download/peoples-avatars/default-avatar-profile-picture-male-icon.png'}
                alt="Profile"
                className="w-32 h-32 rounded-full border-4 border-primary-500 dark:border-primary-400 object-cover"
              />
            </div>
            <p className="mt-4 text-sm text-gray-600 dark:text-gray-400 text-center">
              Profile picture URL
            </p>
          </div>

          {/* Display Name */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              <User className="inline-block mr-2" size={16} />
              Display Name
            </label>
            <input
              type="text"
              name="displayName"
              value={formData.displayName}
              onChange={handleChange}
              className="input"
              placeholder="Enter your name"
              required
            />
          </div>

          {/* Email (Read-only) */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              <Mail className="inline-block mr-2" size={16} />
              Email Address
            </label>
            <input
              type="email"
              value={formData.email}
              className="input bg-gray-100 dark:bg-gray-700 cursor-not-allowed"
              readOnly
              disabled
            />
            <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
              Email cannot be changed
            </p>
          </div>

          {/* Photo URL */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Photo URL
            </label>
            <input
              type="url"
              name="photoURL"
              value={formData.photoURL}
              onChange={handleChange}
              className="input"
              placeholder="https://example.com/photo.jpg"
            />
            <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
              Enter a URL to your profile picture
            </p>
          </div>

          {/* Account Info */}
          <div className="border-t border-gray-200 dark:border-gray-700 pt-6">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4">
              Account Information
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
                <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400 mb-1">
                  <Calendar size={16} />
                  Member Since
                </div>
                <p className="text-base font-medium text-gray-900 dark:text-gray-100">
                  {user.metadata?.creationTime
                    ? new Date(user.metadata.creationTime).toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric',
                      })
                    : 'N/A'}
                </p>
              </div>
              <div className="p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
                <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400 mb-1">
                  <Mail size={16} />
                  Email Verified
                </div>
                <p className="text-base font-medium text-gray-900 dark:text-gray-100">
                  {user.emailVerified ? (
                    <span className="text-green-600 dark:text-green-400">Verified</span>
                  ) : (
                    <span className="text-yellow-600 dark:text-yellow-400">Not Verified</span>
                  )}
                </p>
              </div>
            </div>
          </div>

          {/* Submit Button */}
          <div className="flex justify-end pt-4">
            <button
              type="submit"
              disabled={loading}
              className="btn btn-primary px-8 py-3 flex items-center gap-2"
            >
              {loading ? (
                <>
                  <Spinner size={20} />
                  Saving...
                </>
              ) : (
                <>
                  <Save size={20} />
                  Save Changes
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

