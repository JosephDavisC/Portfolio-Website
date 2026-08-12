import { useState } from 'react';
import { m } from 'framer-motion';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
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
      const response = await fetch('/api/contact.php', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      const result = await response.json();

      if (!response.ok || !result.success) {
        throw new Error(result.message || 'Failed to send message');
      }

      setSubmitStatus('success');
      toast.success('Message sent successfully! Check your email for confirmation.');
      reset();

      setTimeout(() => {
        setSubmitStatus('idle');
      }, 5000);
    } catch (error) {
      console.error('Contact form error:', error);
      setSubmitStatus('error');
      toast.error('Failed to send message. Please try again or email me directly.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <m.div
      className="card-brutal p-6 sm:p-10 relative overflow-hidden group/form"
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.2 }}
      viewport={{ once: true }}
    >
      <m.img
        src="/images/chibis/headphone_joe.webp"
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
        <h3 className="text-2xl md:text-3xl font-heading font-bold mb-6 text-espresso">
          Send me a message
        </h3>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div>
            <label htmlFor="name" className="block text-sm font-mono font-medium text-espresso/80 dark:text-slate-300 mb-2">
              Name <span className="text-court-dark dark:text-[#60A5FA]">*</span>
            </label>
            <Input
              id="name"
              type="text"
              placeholder="Your name"
              {...register('name')}
              className={`bg-paper dark:bg-slate-800 border-2 border-espresso/20 dark:border-slate-600 text-espresso dark:text-slate-200 placeholder:text-espresso/40 dark:placeholder:text-slate-500 focus:border-court dark:focus:border-[#60A5FA] focus-visible:ring-court dark:focus-visible:ring-[#60A5FA] focus:shadow-brutal-sm transition-all duration-300 rounded-lg ${
                errors.name ? 'border-red-500' : ''
              }`}
            />
            {errors.name && (
              <p className="mt-1 text-sm text-red-600 flex items-center gap-1 font-mono">
                <AlertCircle className="h-4 w-4" />
                {errors.name.message}
              </p>
            )}
          </div>

          <div>
            <label htmlFor="email" className="block text-sm font-mono font-medium text-espresso/80 dark:text-slate-300 mb-2">
              Email <span className="text-court-dark dark:text-[#60A5FA]">*</span>
            </label>
            <Input
              id="email"
              type="email"
              placeholder="your.email@example.com"
              {...register('email')}
              className={`bg-paper dark:bg-slate-800 border-2 border-espresso/20 dark:border-slate-600 text-espresso dark:text-slate-200 placeholder:text-espresso/40 dark:placeholder:text-slate-500 focus:border-court dark:focus:border-[#60A5FA] focus-visible:ring-court dark:focus-visible:ring-[#60A5FA] focus:shadow-brutal-sm transition-all duration-300 rounded-lg ${
                errors.email ? 'border-red-500' : ''
              }`}
            />
            {errors.email && (
              <p className="mt-1 text-sm text-red-600 flex items-center gap-1 font-mono">
                <AlertCircle className="h-4 w-4" />
                {errors.email.message}
              </p>
            )}
          </div>

          <div>
            <label htmlFor="subject" className="block text-sm font-mono font-medium text-espresso/80 dark:text-slate-300 mb-2">
              Subject <span className="text-court-dark dark:text-[#60A5FA]">*</span>
            </label>
            <Input
              id="subject"
              type="text"
              placeholder="What's this about?"
              {...register('subject')}
              className={`bg-paper dark:bg-slate-800 border-2 border-espresso/20 dark:border-slate-600 text-espresso dark:text-slate-200 placeholder:text-espresso/40 dark:placeholder:text-slate-500 focus:border-court dark:focus:border-[#60A5FA] focus-visible:ring-court dark:focus-visible:ring-[#60A5FA] focus:shadow-brutal-sm transition-all duration-300 rounded-lg ${
                errors.subject ? 'border-red-500' : ''
              }`}
            />
            {errors.subject && (
              <p className="mt-1 text-sm text-red-600 flex items-center gap-1 font-mono">
                <AlertCircle className="h-4 w-4" />
                {errors.subject.message}
              </p>
            )}
          </div>

          <div>
            <label htmlFor="message" className="block text-sm font-mono font-medium text-espresso/80 dark:text-slate-300 mb-2">
              Message <span className="text-court-dark dark:text-[#60A5FA]">*</span>
            </label>
            <Textarea
              id="message"
              placeholder="Tell me about your project, collaboration idea, or just say hi!"
              rows={6}
              {...register('message')}
              className={`bg-paper dark:bg-slate-800 border-2 border-espresso/20 dark:border-slate-600 text-espresso dark:text-slate-200 placeholder:text-espresso/40 dark:placeholder:text-slate-500 focus:border-court dark:focus:border-[#60A5FA] focus-visible:ring-court dark:focus-visible:ring-[#60A5FA] focus:shadow-brutal-sm transition-all duration-300 resize-none rounded-lg ${
                errors.message ? 'border-red-500' : ''
              }`}
            />
            {errors.message && (
              <p className="mt-1 text-sm text-red-600 flex items-center gap-1 font-mono">
                <AlertCircle className="h-4 w-4" />
                {errors.message.message}
              </p>
            )}
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-4">
            <Button
              type="submit"
              disabled={isSubmitting}
              className="btn-brutal w-full sm:w-auto px-8 py-6 text-lg disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:translate-x-0 disabled:hover:translate-y-0"
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

            {submitStatus === 'success' && (
              <m.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                className="flex items-center gap-2 text-court-dark dark:text-[#60A5FA] font-mono"
              >
                <CheckCircle2 className="h-5 w-5" />
                <span className="text-sm font-medium">Message sent successfully!</span>
              </m.div>
            )}

            {submitStatus === 'error' && (
              <m.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                className="flex items-center gap-2 text-red-600 font-mono"
              >
                <AlertCircle className="h-5 w-5" />
                <span className="text-sm font-medium">Failed to send. Please try again.</span>
              </m.div>
            )}
          </div>
        </form>
      </div>
    </m.div>
  );
};

export default ContactForm;
