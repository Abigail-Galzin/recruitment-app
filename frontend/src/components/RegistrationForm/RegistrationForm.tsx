import { useState } from 'react';
import styles from './RegistrationForm.module.css';
import { useForm } from '../../hooks/useForm';
import LoadingSpinner from '../Common/LoadingSpinner';
import ErrorAlert from '../Common/ErrorAlert';
import candidateApi from '../../api/candidateApi';
import { ENGLISH_LEVELS, ERROR_MESSAGES, SUCCESS_MESSAGES } from '../../utils/constants';
import { formatFileSize } from '../../utils/validation';
import type { RegistrationFormProps } from './types';
import type { RegistrationFormData } from '../../types';

export default function RegistrationForm({ onSuccess }: RegistrationFormProps) {
  const [successMessage, setSuccessMessage] = useState('');
  const [submitError, setSubmitError] = useState('');

  const handleFormSubmit = async (formData: RegistrationFormData) => {
    setSubmitError('');
    setSuccessMessage('');

    try {
      const response = await candidateApi.submitCandidate(formData);

      if (response.success) {
        setSuccessMessage(SUCCESS_MESSAGES.REGISTRATION_SUCCESS);
        resetForm();
        setTimeout(() => {
          setSuccessMessage('')
        }, 5000)
        if (onSuccess) {
          onSuccess();
        }
        // Scroll to top to show success message
        window.scrollTo({ top: 0, behavior: 'smooth' });
      } else {
        setSubmitError(response.error || ERROR_MESSAGES.SUBMISSION_ERROR);
      }
    } catch (error: any) {
      console.error('Submission error:', error);
      if (error.response?.data?.error) {
        setSubmitError(error.response.data.error);
      } else if (error.message) {
        setSubmitError(error.message);
      } else {
        setSubmitError(ERROR_MESSAGES.NETWORK_ERROR);
      }
    }
  };

  const { formData, errors, isLoading, setFieldValue, handleSubmit, resetForm } = useForm(handleFormSubmit);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    setFieldValue('cv_file', file);
  };

  return (
    <div className={styles.wrapper}>
      <h1>Registration Form</h1>
      <div className={styles.container}>
        {successMessage && (
          <div className={styles.successMessage}>
            <div className={styles.successContent}>
              <div className={styles.successTitle}>Registration Complete</div>
              <div className={styles.successText}>{successMessage}</div>
            </div>
          </div>
        )}

        {submitError && (
          <ErrorAlert
            message={submitError}
            onDismiss={() => setSubmitError('')}
          />
        )}

        <form className={styles.form} onSubmit={handleSubmit} noValidate>
          {/* Name and Email Row */}
          <div className={styles.inputGroup}>
            <div className={styles.formGroup}>
              <label className={styles.label} htmlFor="name">
                Full Name
                <span className={styles.required}>*</span>
              </label>
              <input
                id="name"
                type="text"
                className={`${styles.input} ${errors.name ? styles.error : ''}`}
                placeholder="John Doe"
                value={formData.name}
                onChange={(e) => setFieldValue('name', e.target.value)}
                disabled={isLoading}
                aria-invalid={!!errors.name}
                aria-describedby={errors.name ? 'name-error' : undefined}
              />
              {errors.name && (
                <div className={styles.errorMessage} id="name-error">
                  {errors.name}
                </div>
              )}
            </div>

            <div className={styles.formGroup}>
              <label className={styles.label} htmlFor="email">
                Email
                <span className={styles.required}>*</span>
              </label>
              <input
                id="email"
                type="email"
                className={`${styles.input} ${errors.email ? styles.error : ''}`}
                placeholder="john@example.com"
                value={formData.email}
                onChange={(e) => setFieldValue('email', e.target.value)}
                disabled={isLoading}
                aria-invalid={!!errors.email}
                aria-describedby={errors.email ? 'email-error' : undefined}
              />
              {errors.email && (
                <div className={styles.errorMessage} id="email-error">
                  {errors.email}
                </div>
              )}
            </div>
          </div>

          {/* Phone and Age Row */}
          <div className={styles.inputGroup}>
            <div className={styles.formGroup}>
              <label className={styles.label} htmlFor="phone">
                Phone
                <span className={styles.required}>*</span>
              </label>
              <input
                id="phone"
                type="tel"
                className={`${styles.input} ${errors.phone ? styles.error : ''}`}
                placeholder="+1234567890"
                value={formData.phone}
                onChange={(e) => setFieldValue('phone', e.target.value)}
                disabled={isLoading}
                aria-invalid={!!errors.phone}
                aria-describedby={errors.phone ? 'phone-error' : undefined}
              />
              {errors.phone && (
                <div className={styles.errorMessage} id="phone-error">
                  {errors.phone}
                </div>
              )}
            </div>

            <div className={styles.formGroup}>
              <label className={styles.label} htmlFor="age">
                Age
                <span className={styles.required}>*</span>
              </label>
              <input
                id="age"
                type="number"
                className={`${styles.input} ${errors.age ? styles.error : ''}`}
                placeholder="25"
                value={formData.age || ''}
                onChange={(e) => setFieldValue('age', e.target.value ? parseInt(e.target.value, 10) : 0)}
                disabled={isLoading}
                min="18"
                max="99"
                aria-invalid={!!errors.age}
                aria-describedby={errors.age ? 'age-error' : undefined}
              />
              {errors.age && (
                <div className={styles.errorMessage} id="age-error">
                  {errors.age}
                </div>
              )}
            </div>
          </div>

          {/* Country and City Row */}
          <div className={styles.inputGroup}>
            <div className={styles.formGroup}>
              <label className={styles.label} htmlFor="country">
                Country
                <span className={styles.required}>*</span>
              </label>
              <input
                id="country"
                type="text"
                className={`${styles.input} ${errors.country ? styles.error : ''}`}
                placeholder="United States"
                value={formData.country}
                onChange={(e) => setFieldValue('country', e.target.value)}
                disabled={isLoading}
                aria-invalid={!!errors.country}
                aria-describedby={errors.country ? 'country-error' : undefined}
              />
              {errors.country && (
                <div className={styles.errorMessage} id="country-error">
                  {errors.country}
                </div>
              )}
            </div>

            <div className={styles.formGroup}>
              <label className={styles.label} htmlFor="city">
                City
                <span className={styles.required}>*</span>
              </label>
              <input
                id="city"
                type="text"
                className={`${styles.input} ${errors.city ? styles.error : ''}`}
                placeholder="New York"
                value={formData.city}
                onChange={(e) => setFieldValue('city', e.target.value)}
                disabled={isLoading}
                aria-invalid={!!errors.city}
                aria-describedby={errors.city ? 'city-error' : undefined}
              />
              {errors.city && (
                <div className={styles.errorMessage} id="city-error">
                  {errors.city}
                </div>
              )}
            </div>
          </div>

          <div className={styles.inputGroup}>
            {/* English Level */}
            <div className={styles.formGroup}>
              <label className={styles.label} htmlFor="english_level">
                English Level
                <span className={styles.required}>*</span>
              </label>
              <select
                id="english_level"
                className={`${styles.select} ${errors.english_level ? styles.error : ''}`}
                value={formData.english_level}
                onChange={(e) => setFieldValue('english_level', e.target.value)}
                disabled={isLoading}
                aria-invalid={!!errors.english_level}
                aria-describedby={errors.english_level ? 'english_level-error' : undefined}
              >
                <option value="">Select English Level</option>
                {ENGLISH_LEVELS.map((level) => (
                  <option key={level} value={level}>
                    {level}
                  </option>
                ))}
              </select>
              {errors.english_level && (
                <div className={styles.errorMessage} id="english_level-error">
                  {errors.english_level}
                </div>
              )}
            </div>

            {/* CV File Upload */}
            <div className={styles.formGroup}>
              <label className={styles.label} htmlFor="cv_file">
                CV (PDF)
                <span className={styles.required}>*</span>
              </label>
              <div className={styles.fileInputWrapper}>
                <input
                  id="cv_file"
                  type="file"
                  className={`${styles.fileInput} ${errors.cv_file ? styles.error : ''}`}
                  accept=".pdf,application/pdf"
                  onChange={handleFileChange}
                  disabled={isLoading}
                  aria-invalid={!!errors.cv_file}
                  aria-describedby={errors.cv_file ? 'cv_file-error' : undefined}
                />
              </div>
              {formData.cv_file && (
                <div className={styles.fileInfo}>
                  <div className={styles.fileName}>📄 {formData.cv_file.name}</div>
                  <div className={styles.fileSize}>{formatFileSize(formData.cv_file.size)}</div>
                </div>
              )}
              {errors.cv_file && (
                <div className={styles.errorMessage} id="cv_file-error">
                  {errors.cv_file}
                </div>
              )}
            </div>
          </div>

          {/* Buttons */}
          <div className={styles.buttonGroup}>
            <button
              type="reset"
              className={`${styles.button} ${styles.resetButton}`}
              onClick={resetForm}
              disabled={isLoading}
            >
              Clear Form
            </button>
            <button
              type="submit"
              className={`${styles.button} ${styles.submitButton}`}
              disabled={isLoading}
            >
              {isLoading ? 'Submitting...' : 'Submit Application'}
            </button>
          </div>

          {isLoading && <LoadingSpinner />}
        </form>
      </div>
    </div>
  );
}
