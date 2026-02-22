import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Plus, X, AlertCircle } from 'lucide-react';

interface TaskFormData {
  title: string;
  description: string;
  category: string;
  budget: string;
  estimatedTime: string;
  skillsRequired: string[];
  workersNeeded: string;
  attachments: File[];
}

interface AddTaskProps {
  user: any;
  onNavigate: (page: string) => void;
}

const CATEGORIES = ['Data Entry', 'Content Writing', 'Transcription', 'Image Labeling', 'Research', 'Design', 'Programming', 'Testing', 'Translation', 'Other'];

export const AddTask: React.FC<AddTaskProps> = ({ user, onNavigate }) => {
  const [formData, setFormData] = useState<TaskFormData>({
    title: '',
    description: '',
    category: '',
    budget: '',
    estimatedTime: '',
    skillsRequired: [],
    workersNeeded: '1',
    attachments: [],
  });

  const [skillInput, setSkillInput] = useState('');
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitSuccess, setSubmitSuccess] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const handleAddSkill = () => {
    if (skillInput.trim() && !formData.skillsRequired.includes(skillInput.trim())) {
      setFormData(prev => ({
        ...prev,
        skillsRequired: [...prev.skillsRequired, skillInput.trim()]
      }));
      setSkillInput('');
    }
  };

  const handleRemoveSkill = (skill: string) => {
    setFormData(prev => ({
      ...prev,
      skillsRequired: prev.skillsRequired.filter(s => s !== skill)
    }));
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFormData(prev => ({
        ...prev,
        attachments: [...prev.attachments, ...Array.from(e.target.files || [])]
      }));
    }
  };

  const handleRemoveFile = (index: number) => {
    setFormData(prev => ({
      ...prev,
      attachments: prev.attachments.filter((_, i) => i !== index)
    }));
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    
    if (!formData.title.trim()) newErrors.title = 'Task title is required';
    if (!formData.description.trim()) newErrors.description = 'Description is required';
    if (!formData.category) newErrors.category = 'Category is required';
    if (!formData.budget) newErrors.budget = 'Budget is required';
    if (parseFloat(formData.budget) <= 0) newErrors.budget = 'Budget must be greater than 0';
    if (!formData.estimatedTime) newErrors.estimatedTime = 'Estimated time is required';
    if (!formData.workersNeeded) newErrors.workersNeeded = 'Number of workers is required';
    if (parseInt(formData.workersNeeded) <= 0) newErrors.workersNeeded = 'Must need at least 1 worker';
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) return;

    try {
      const taskData = {
        ...formData,
        budget: parseFloat(formData.budget),
        workersNeeded: parseInt(formData.workersNeeded),
      };
      
      // API call would go here
      console.log('Task created:', taskData);
      
      setSubmitSuccess(true);
      setTimeout(() => {
        setSubmitSuccess(false);
        onNavigate('tasks');
      }, 2000);
    } catch (err) {
      console.error('Error creating task:', err);
    }
  };

  if (!user) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-20 text-center">
        <h2 className="text-2xl font-bold mb-4 text-zinc-900 dark:text-white">Login Required</h2>
        <p className="text-zinc-600 dark:text-zinc-400 mb-6">You need to be logged in to create a task.</p>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 min-h-screen bg-white dark:bg-zinc-950 transition-colors">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-zinc-900 dark:text-white mb-2">Create a New Task</h1>
          <p className="text-zinc-600 dark:text-zinc-400">Post a task and get it completed by our talented workers.</p>
        </div>

        {submitSuccess && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-6 p-4 bg-emerald-50 dark:bg-emerald-900/20 border border-emerald-200 dark:border-emerald-800 rounded-lg"
          >
            <p className="text-emerald-800 dark:text-emerald-300 font-medium">Task created successfully! Redirecting...</p>
          </motion.div>
        )}

        <form onSubmit={handleSubmit} className="bg-white dark:bg-zinc-900 rounded-2xl border border-zinc-200 dark:border-zinc-800 shadow-sm dark:shadow-lg p-8 space-y-6 transition-colors">
          
          {/* Task Title */}
          <div>
            <label className="block text-sm font-semibold text-zinc-900 dark:text-white mb-2">
              Task Title *
            </label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleInputChange}
              placeholder="What needs to be done?"
              className="w-full px-4 py-3 border border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-800 text-zinc-900 dark:text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-colors"
            />
            {errors.title && (
              <p className="mt-1 text-sm text-red-600 dark:text-red-400 flex items-center gap-1">
                <AlertCircle size={16} /> {errors.title}
              </p>
            )}
          </div>

          {/* Description */}
          <div>
            <label className="block text-sm font-semibold text-zinc-900 dark:text-white mb-2">
              Description *
            </label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleInputChange}
              placeholder="Provide detailed instructions..."
              rows={5}
              className="w-full px-4 py-3 border border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-800 text-zinc-900 dark:text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-colors resize-none"
            />
            {errors.description && (
              <p className="mt-1 text-sm text-red-600 dark:text-red-400 flex items-center gap-1">
                <AlertCircle size={16} /> {errors.description}
              </p>
            )}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Category */}
            <div>
              <label className="block text-sm font-semibold text-zinc-900 dark:text-white mb-2">
                Category *
              </label>
              <select
                name="category"
                value={formData.category}
                onChange={handleInputChange}
                className="w-full px-4 py-3 border border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-800 text-zinc-900 dark:text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-colors cursor-pointer"
              >
                <option value="">Select a category</option>
                {CATEGORIES.map(cat => (
                  <option key={cat} value={cat}>{cat}</option>
                ))}
              </select>
              {errors.category && (
                <p className="mt-1 text-sm text-red-600 dark:text-red-400 flex items-center gap-1">
                  <AlertCircle size={16} /> {errors.category}
                </p>
              )}
            </div>

            {/* Budget */}
            <div>
              <label className="block text-sm font-semibold text-zinc-900 dark:text-white mb-2">
                Budget (USD) *
              </label>
              <div className="relative">
                <span className="absolute left-4 top-3 text-zinc-500 dark:text-zinc-400">$</span>
                <input
                  type="number"
                  name="budget"
                  value={formData.budget}
                  onChange={handleInputChange}
                  placeholder="0.00"
                  step="0.01"
                  min="0"
                  className="w-full pl-8 pr-4 py-3 border border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-800 text-zinc-900 dark:text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-colors"
                />
              </div>
              {errors.budget && (
                <p className="mt-1 text-sm text-red-600 dark:text-red-400 flex items-center gap-1">
                  <AlertCircle size={16} /> {errors.budget}
                </p>
              )}
            </div>

            {/* Estimated Time */}
            <div>
              <label className="block text-sm font-semibold text-zinc-900 dark:text-white mb-2">
                Estimated Time to Complete *
              </label>
              <select
                name="estimatedTime"
                value={formData.estimatedTime}
                onChange={handleInputChange}
                className="w-full px-4 py-3 border border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-800 text-zinc-900 dark:text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-colors cursor-pointer"
              >
                <option value="">Select time</option>
                <option value="5-mins">5 minutes</option>
                <option value="15-mins">15 minutes</option>
                <option value="30-mins">30 minutes</option>
                <option value="1-hour">1 hour</option>
                <option value="2-hours">2 hours</option>
                <option value="4-hours">4 hours</option>
                <option value="8-hours">8 hours</option>
                <option value="1-day">1 day</option>
                <option value="multiple-days">Multiple days</option>
              </select>
              {errors.estimatedTime && (
                <p className="mt-1 text-sm text-red-600 dark:text-red-400 flex items-center gap-1">
                  <AlertCircle size={16} /> {errors.estimatedTime}
                </p>
              )}
            </div>

            {/* Workers Needed */}
            <div>
              <label className="block text-sm font-semibold text-zinc-900 dark:text-white mb-2">
                Number of Workers Needed *
              </label>
              <input
                type="number"
                name="workersNeeded"
                value={formData.workersNeeded}
                onChange={handleInputChange}
                min="1"
                className="w-full px-4 py-3 border border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-800 text-zinc-900 dark:text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-colors"
              />
              {errors.workersNeeded && (
                <p className="mt-1 text-sm text-red-600 dark:text-red-400 flex items-center gap-1">
                  <AlertCircle size={16} /> {errors.workersNeeded}
                </p>
              )}
            </div>
          </div>

          {/* Skills Required */}
          <div>
            <label className="block text-sm font-semibold text-zinc-900 dark:text-white mb-2">
              Required Skills (Optional)
            </label>
            <div className="flex gap-2 mb-3">
              <input
                type="text"
                value={skillInput}
                onChange={(e) => setSkillInput(e.target.value)}
                onKeyPress={(e) => {
                  if (e.key === 'Enter') {
                    e.preventDefault();
                    handleAddSkill();
                  }
                }}
                placeholder="Add a skill..."
                className="flex-1 px-4 py-3 border border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-800 text-zinc-900 dark:text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-colors"
              />
              <button
                type="button"
                onClick={handleAddSkill}
                className="px-4 py-3 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg font-medium transition-colors flex items-center gap-2"
              >
                <Plus size={18} />
              </button>
            </div>
            {formData.skillsRequired.length > 0 && (
              <div className="flex flex-wrap gap-2">
                {formData.skillsRequired.map(skill => (
                  <div
                    key={skill}
                    className="bg-emerald-100 dark:bg-emerald-900/30 text-emerald-800 dark:text-emerald-300 px-3 py-1 rounded-full text-sm font-medium flex items-center gap-2"
                  >
                    {skill}
                    <button
                      type="button"
                      onClick={() => handleRemoveSkill(skill)}
                      className="hover:text-emerald-600 dark:hover:text-emerald-200"
                    >
                      <X size={16} />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* File Attachments */}
          <div>
            <label className="block text-sm font-semibold text-zinc-900 dark:text-white mb-2">
              Attachments (Optional)
            </label>
            <div className="border-2 border-dashed border-zinc-200 dark:border-zinc-700 rounded-lg p-6 text-center cursor-pointer hover:border-emerald-500 dark:hover:border-emerald-500 transition-colors">
              <input
                type="file"
                onChange={handleFileUpload}
                multiple
                className="hidden"
                id="file-upload"
              />
              <label htmlFor="file-upload" className="cursor-pointer">
                <p className="text-zinc-600 dark:text-zinc-400 mb-2">Drag and drop files here or click to browse</p>
              </label>
            </div>
            {formData.attachments.length > 0 && (
              <div className="mt-4 space-y-2">
                {formData.attachments.map((file, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between p-3 bg-zinc-50 dark:bg-zinc-800 rounded-lg border border-zinc-200 dark:border-zinc-700"
                  >
                    <span className="text-sm text-zinc-700 dark:text-zinc-300">{file.name}</span>
                    <button
                      type="button"
                      onClick={() => handleRemoveFile(index)}
                      className="text-zinc-400 hover:text-red-600 dark:hover:text-red-400 transition-colors"
                    >
                      <X size={18} />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Action Buttons */}
          <div className="flex gap-4 pt-6 border-t border-zinc-200 dark:border-zinc-800">
            <button
              type="submit"
              className="flex-1 px-6 py-3 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg font-semibold transition-all active:scale-95"
            >
              Create Task
            </button>
            <button
              type="button"
              onClick={() => onNavigate('tasks')}
              className="flex-1 px-6 py-3 bg-zinc-100 dark:bg-zinc-800 hover:bg-zinc-200 dark:hover:bg-zinc-700 text-zinc-900 dark:text-white rounded-lg font-semibold transition-colors"
            >
              Cancel
            </button>
          </div>
        </form>
      </motion.div>
    </div>
  );
};
