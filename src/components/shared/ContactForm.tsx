import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import emailjs from '@emailjs/browser';
import { Send, Loader2, CheckCircle2, AlertCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { toast } from 'sonner';

const formSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Please enter a valid email address'),
  subject: z.string().min(5, 'Subject must be at least 5 characters'),
  message: z.string().min(10, 'Message must be at least 10 characters'),
});

type FormData = z.infer<typeof formSchema>;

const ContactForm = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<FormData>({
    resolver: zodResolver(formSchema),
  });

  const onSubmit = async (data: FormData) => {
    setIsSubmitting(true);
    setSubmitStatus('idle');

    try {
      // EmailJS credentials
      const serviceId = import.meta.env.VITE_EMAILJS_SERVICE_ID || 'YOUR_SERVICE_ID';
      const templateId = import.meta.env.VITE_EMAILJS_TEMPLATE_ID || 'YOUR_TEMPLATE_ID';
      const autoReplyTemplateId = import.meta.env.VITE_EMAILJS_AUTOREPLY_TEMPLATE_ID || '';
      const publicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY || 'YOUR_PUBLIC_KEY';

      const templateParams = {
        from_name: data.name,
        from_email: data.email,
        subject: data.subject,
        message: data.message,
        to_name: 'Joseph',
      };

      await emailjs.send(serviceId, templateId, templateParams, publicKey);

      if (autoReplyTemplateId) {
        try {
          await emailjs.send(serviceId, autoReplyTemplateId, templateParams, publicKey);
        } catch (autoReplyError) {
          console.warn('Auto-reply failed, but main message was sent:', autoReplyError);
        }
      }

      setSubmitStatus('success');
      toast.success('Message sent successfully! Check your email for confirmation.');
      reset();

      setTimeout(() => {
        setSubmitStatus('idle');
      }, 5000);
    } catch (error) {
      console.error('EmailJS error:', error);
      setSubmitStatus('error');
      toast.error('Failed to send message. Please try again or email me directly.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <motion.div
      className="bg-white/5 backdrop-blur-sm rounded-3xl p-6 sm:p-10 border border-white/10 hover:border-blue-400/30 hover:shadow-2xl hover:shadow-blue-500/10 transition-all duration-500 relative overflow-hidden group/form"
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.2 }}
      viewport={{ once: true }}
    >
      {/* Chibi Character - Floating in the corner */}
      <motion.img
        src="/images/chibis/headphone_joe.PNG"
        alt="Joseph Chibi"
        className="absolute -top-8 -right-8 w-32 h-32 md:w-40 md:h-40 opacity-20 group-hover/form:opacity-30 pointer-events-none transition-opacity duration-500"
        initial={{ rotate: -10, scale: 0.8 }}
        animate={{
          rotate: [0, 10, 0],
          scale: [1, 1.05, 1],
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />

      <div className="relative z-10">
        <h3 className="text-2xl md:text-3xl font-bold mb-6 bg-gradient-to-r from-blue-400 to-red-400 bg-clip-text text-transparent">
          Send me a message
        </h3>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        {/* Name Field */}
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-slate-300 mb-2">
            Name <span className="text-red-400">*</span>
          </label>
          <Input
            id="name"
            type="text"
            placeholder="Your name"
            {...register('name')}
            className={`bg-white/5 border-white/10 text-white placeholder:text-slate-500 focus:border-blue-400 focus:shadow-lg focus:shadow-blue-500/20 transition-all duration-300 ${
              errors.name ? 'border-red-400' : ''
            }`}
          />
          {errors.name && (
            <p className="mt-1 text-sm text-red-400 flex items-center gap-1">
              <AlertCircle className="h-4 w-4" />
              {errors.name.message}
            </p>
          )}
        </div>

        {/* Email Field */}
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-slate-300 mb-2">
            Email <span className="text-red-400">*</span>
          </label>
          <Input
            id="email"
            type="email"
            placeholder="your.email@example.com"
            {...register('email')}
            className={`bg-white/5 border-white/10 text-white placeholder:text-slate-500 focus:border-blue-400 focus:shadow-lg focus:shadow-blue-500/20 transition-all duration-300 ${
              errors.email ? 'border-red-400' : ''
            }`}
          />
          {errors.email && (
            <p className="mt-1 text-sm text-red-400 flex items-center gap-1">
              <AlertCircle className="h-4 w-4" />
              {errors.email.message}
            </p>
          )}
        </div>

        {/* Subject Field */}
        <div>
          <label htmlFor="subject" className="block text-sm font-medium text-slate-300 mb-2">
            Subject <span className="text-red-400">*</span>
          </label>
          <Input
            id="subject"
            type="text"
            placeholder="What's this about?"
            {...register('subject')}
            className={`bg-white/5 border-white/10 text-white placeholder:text-slate-500 focus:border-blue-400 focus:shadow-lg focus:shadow-blue-500/20 transition-all duration-300 ${
              errors.subject ? 'border-red-400' : ''
            }`}
          />
          {errors.subject && (
            <p className="mt-1 text-sm text-red-400 flex items-center gap-1">
              <AlertCircle className="h-4 w-4" />
              {errors.subject.message}
            </p>
          )}
        </div>

        {/* Message Field */}
        <div>
          <label htmlFor="message" className="block text-sm font-medium text-slate-300 mb-2">
            Message <span className="text-red-400">*</span>
          </label>
          <Textarea
            id="message"
            placeholder="Tell me about your project, collaboration idea, or just say hi!"
            rows={6}
            {...register('message')}
            className={`bg-white/5 border-white/10 text-white placeholder:text-slate-500 focus:border-blue-400 focus:shadow-lg focus:shadow-blue-500/20 transition-all duration-300 resize-none ${
              errors.message ? 'border-red-400' : ''
            }`}
          />
          {errors.message && (
            <p className="mt-1 text-sm text-red-400 flex items-center gap-1">
              <AlertCircle className="h-4 w-4" />
              {errors.message.message}
            </p>
          )}
        </div>

        {/* Submit Button */}
        <div className="flex flex-col sm:flex-row items-center gap-4">
          <Button
            type="submit"
            disabled={isSubmitting}
            className="w-full sm:w-auto px-8 py-6 text-lg text-white bg-gradient-to-r from-blue-500 via-purple-500 to-red-500 hover:from-blue-600 hover:via-purple-600 hover:to-red-600 transition-all duration-300 shadow-xl hover:shadow-2xl hover:shadow-purple-500/40 hover:scale-105 hover:-translate-y-1 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 disabled:hover:translate-y-0"
          >
            {isSubmitting ? (
              <>
                <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                Sending...
              </>
            ) : (
              <>
                <Send className="mr-2 h-5 w-5" />
                Send Message
              </>
            )}
          </Button>

          {/* Success/Error Status */}
          {submitStatus === 'success' && (
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="flex items-center gap-2 text-green-400"
            >
              <CheckCircle2 className="h-5 w-5" />
              <span className="text-sm font-medium">Message sent successfully!</span>
            </motion.div>
          )}

          {submitStatus === 'error' && (
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="flex items-center gap-2 text-red-400"
            >
              <AlertCircle className="h-5 w-5" />
              <span className="text-sm font-medium">Failed to send. Please try again.</span>
            </motion.div>
          )}
        </div>
      </form>
      </div>
    </motion.div>
  );
};

export default ContactForm;
